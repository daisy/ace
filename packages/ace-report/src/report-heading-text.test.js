'use strict';

const Report = require('./report.js');

describe('headings outline text (#132, #381)', () => {
  const t = (hx) => Report.headingOutlineText(hx);

  test('plain text is kept and whitespace collapsed', () => {
    expect(t({ html: '  Chapter\n  One ' })).toBe('Chapter One');
  });
  test('text is HTML-escaped', () => {
    expect(t({ html: '<b> & co' })).toBe('&lt;b&gt; &amp; co');
  });
  test('long text is truncated', () => {
    const out = t({ html: 'x'.repeat(300) });
    expect(out.length).toBe(151);
    expect(out.endsWith('…')).toBe(true);
  });
  test('image-only heading shows the alt text', () => {
    expect(t({ html: '', images: ['Chapter 1'] })).toBe('<span class="toc-image">(image: "Chapter 1")</span>');
  });
  test('image without alt is flagged', () => {
    expect(t({ html: '', images: [null] })).toContain('no alt text');
  });
  test('empty heading gets a marker', () => {
    expect(t({ html: '   ' })).toBe('<span class="toc-empty">Empty heading</span>');
  });
  test('aria-label is shown as a note after the visible text', () => {
    expect(t({ html: 'p. 12 Intro', ariaLabel: 'Introduction' }))
      .toBe('p. 12 Intro <span class="toc-label">(aria-label: "Introduction")</span>');
  });
  test('aria-labelledby wins over aria-label', () => {
    expect(t({ html: 'Intro', ariaLabel: 'Ignored', labelledBy: 'Part 1 Introduction' }))
      .toBe('Intro <span class="toc-label">(aria-labelledby: "Part 1 Introduction")</span>');
  });
  test('no note when the label equals the visible text', () => {
    expect(t({ html: ' Intro ', ariaLabel: 'Intro' })).toBe('Intro');
  });
  test('empty heading with a label keeps the empty marker and shows the label', () => {
    expect(t({ html: '', ariaLabel: 'Chapter 2' }))
      .toBe('<span class="toc-empty">Empty heading</span> <span class="toc-label">(aria-label: "Chapter 2")</span>');
  });
  test('image heading with a label shows both notes', () => {
    expect(t({ html: '', images: ['logo'], ariaLabel: 'Chapter 3' }))
      .toBe('<span class="toc-image">(image: "logo")</span> <span class="toc-label">(aria-label: "Chapter 3")</span>');
  });
  test('label text is escaped', () => {
    expect(t({ html: 'x', labelledBy: '<i>y</i>' })).toContain('(aria-labelledby: "&lt;i&gt;y&lt;/i&gt;")');
  });
});
