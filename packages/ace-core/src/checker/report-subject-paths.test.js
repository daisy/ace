'use strict';

const fs = require('fs');
const path = require('path');
const tmp = require('tmp');
const { EPUB } = require('@daisy/epub-utils');
const { Report, builders } = require('@daisy/ace-report');
const { axe2ace } = require('@daisy/ace-report-axe');
const checker = require('./checker-epub');
const { findAssertionsForDoc } = require('../../../../tests/utils');

// Synthetic, unpacked EPUB: the two chapters deliberately have the same basename.
function makeBook(directory) {
  const files = {
    'mimetype': 'application/epub+zip',
    'META-INF/container.xml': `<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">
      <rootfiles><rootfile full-path="OPS/Book/package.opf" media-type="application/oebps-package+xml"/></rootfiles>
    </container>`,
    'OPS/Book/package.opf': `<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="id">
      <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
        <dc:identifier id="id">synthetic-report-paths</dc:identifier><dc:title>Report paths</dc:title><dc:language>en</dc:language>
        <link rel="alternate" href="https://example.org/catalog#record"/>
      </metadata>
      <manifest>
        <item id="nav" href="../nav%20folder/nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
        <item id="one" href="text/Chapter%20one.xhtml" media-type="application/xhtml+xml"/>
        <item id="two" href="../other/Chapter%20one.xhtml" media-type="application/xhtml+xml"/>
        <item id="pages" href="text/pages.xhtml" media-type="application/xhtml+xml" media-overlay="sync"/>
        <item id="hash" href="text/part%231.xhtml" media-type="application/xhtml+xml"/>
        <item id="percent" href="text/part%25231%20space.xhtml" media-type="application/xhtml+xml"/>
        <item id="sync" href="../overlays/sync.smil" media-type="application/smil+xml"/>
      </manifest><spine><itemref idref="one"/><itemref idref="two"/><itemref idref="pages"/><itemref idref="hash"/><itemref idref="percent"/></spine>
    </package>`,
    'OPS/nav folder/nav.xhtml': `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
      <head><title>Navigation</title></head><body>
        <nav epub:type="toc"><ol>
          <li><a href="../Book/text/Chapter%20one.xhtml#section-1">One</a></li>
          <li><a href="../other/Chapter%20one.xhtml#section-2">Two</a></li>
        </ol></nav>
      </body></html>`,
    'OPS/Book/text/Chapter one.xhtml': `<html xmlns="http://www.w3.org/1999/xhtml">
      <head><title>First chapter</title></head><body><h1 id="section-1">One</h1><span id="page1" role="doc-pagebreak">1</span></body>
    </html>`,
    'OPS/other/Chapter one.xhtml': `<html xmlns="http://www.w3.org/1999/xhtml">
      <head><title>Second chapter</title></head><body><h1 id="section-2">Two</h1></body>
    </html>`,
    'OPS/Book/text/pages.xhtml': `<html xmlns="http://www.w3.org/1999/xhtml">
      <head><title>Pages</title></head><body><span id="page1" role="doc-pagebreak">1</span></body>
    </html>`,
    'OPS/Book/text/part#1.xhtml': `<html xmlns="http://www.w3.org/1999/xhtml">
      <head><title>Hash filename</title></head><body><h1 id="section-hash">Hash</h1></body>
    </html>`,
    'OPS/Book/text/part%231 space.xhtml': `<html xmlns="http://www.w3.org/1999/xhtml">
      <head><title>Percent filename</title></head><body><h1 id="section-percent">Percent</h1></body>
    </html>`,
    'OPS/overlays/sync.smil': `<smil xmlns="http://www.w3.org/ns/SMIL"><body><seq><par>
      <text src="../Book/text/pages.xhtml#page1"/>
    </par></seq></body></smil>`,
  };
  Object.keys(files).forEach((name) => {
    const file = path.join(directory, name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, files[name]);
  });
}

function axeViolation() {
  return { violations: [{
    id: 'document-title', impact: 'serious', description: 'Synthetic title check', help: 'Add a title', tags: ['wcag2a'],
    nodes: [{ failureSummary: 'Fix all of the following:\nSynthetic issue', html: '<h1>One</h1>',
      target: ['#section-1'], targetCFI: ['/4/2[section-1]'], any: [], all: [] }],
  }] };
}

describe('EPUB-internal report subjects', () => {
  let directory;
  let epub;

  beforeAll(async () => {
    directory = tmp.dirSync({ prefix: 'ace_report_paths_', unsafeCleanup: true });
    makeBook(directory.name);
    epub = new EPUB(directory.name);
    await epub.extract();
    await epub.parse();
  });

  afterAll(() => directory.removeCallback());

  test('uses archive-root paths consistently across EPUB and aXe assertions', async () => {
    const report = await new Report(epub).init();
    const checked = await checker.check(epub, report);
    report.addAssertions(checked.assertion.build());
    for (const doc of epub.contentDocs) {
      report.addAssertions(await axe2ace(doc, axeViolation()));
    }

    const urls = report.json.assertions.map((assertion) => assertion['earl:testSubject'].url);
    expect(urls).toEqual([
      'OPS/nav%20folder/nav.xhtml', 'OPS/overlays/sync.smil', 'OPS/Book/package.opf',
      'OPS/Book/text/Chapter%20one.xhtml', 'OPS/other/Chapter%20one.xhtml', 'OPS/Book/text/pages.xhtml',
      'OPS/Book/text/part%231.xhtml', 'OPS/Book/text/part%25231%20space.xhtml', 'OPS/nav%20folder/nav.xhtml',
    ]);
    for (const url of urls) {
      expect(url).not.toMatch(/^(\/|[a-z]+:)|\\/i);
      const resolved = new URL(url, 'https://archive.invalid/');
      expect(resolved.origin).toBe('https://archive.invalid');
      expect(resolved.hash).toBe(''); // A literal # in a filename is not a URI fragment.
      expect(fs.statSync(path.join(epub.basedir, decodeURIComponent(resolved.pathname))).isFile()).toBe(true);
    }
    // OPF-relative addressing remains available for navigation checks and diagnostics.
    expect(epub.contentDocs[0].relpath).toBe('text/Chapter one.xhtml');
    expect(epub.navDoc.tocHrefs).toEqual([
      '../Book/text/Chapter one.xhtml#section-1', '../other/Chapter one.xhtml#section-2',
    ]);
    expect(report.json['earl:testSubject'].links.alternate).toBe('https://example.org/catalog#record');
    const navAssertions = findAssertionsForDoc(report.json, 'OPS/nav%20folder/nav.xhtml');
    expect(navAssertions.map((assertion) => assertion['earl:test']['dct:title'])).toContain('document-title');
    expect(epub.contentDocs[3].src).toBe('OPS/Book/text/part#1.xhtml');
    expect(epub.contentDocs[4].src).toBe('OPS/Book/text/part%231 space.xhtml');
    const withFragment = new URL(urls[6] + '#section-hash', 'https://archive.invalid/');
    expect(withFragment.hash).toBe('#section-hash');
    expect(decodeURIComponent(withFragment.pathname)).toBe('/OPS/Book/text/part#1.xhtml');
  });

  test.each([['hash', 3], ['literal percent escape and space', 4]])(
    'resolves a filename containing %s to the actual EPUB entry', async (name, index) => {
      const doc = epub.contentDocs[index];
      const assertion = await axe2ace(doc, axeViolation());
      const resolved = new URL(assertion['earl:testSubject'].url, 'https://archive.invalid/');
      expect(resolved.hash).toBe('');
      const file = path.join(epub.basedir, decodeURIComponent(resolved.pathname));
      expect(file).toBe(doc.filepath);
      expect(fs.statSync(file).isFile()).toBe(true);
    });

  test('leaves external subjects and aXe pointer information unchanged', async () => {
    const url = 'https://example.org/chapter%20one.xhtml#section-1';
    expect(new builders.AssertionBuilder().withTestSubject(url).build()['earl:testSubject'].url).toBe(url);
    for (const reference of [url, 'text/chapter%20one.xhtml#section-1']) {
      const legacy = await axe2ace({ relpath: reference, title: '' }, axeViolation());
      expect(legacy['earl:testSubject'].url).toBe(reference);
    }
    const assertion = await axe2ace(epub.contentDocs[0], axeViolation());
    expect(assertion.assertions[0]['earl:result']['earl:pointer']).toEqual({
      css: ['#section-1'], cfi: ['/4/2[section-1]'],
    });
  });
});
