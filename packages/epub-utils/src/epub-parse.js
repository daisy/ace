// input: unzipped book directory
// returns: collection of spine items, title, identifier
// caveat: doesn't filter for uniqueness

// uses node libraries:
// https://github.com/goto100/xpath
// https://github.com/jindw/xmldom

// TODO make async

'use strict';

const fileUrl = require('file-url');
const DOMParser = require('xmldom').DOMParser;
const XMLSerializer = require('xmldom').XMLSerializer;
const fs = require('fs');
const path = require('path');
const xpath = require('xpath');
const winston = require('winston');

// Error Handler for DOMParser instances
const errorHandler = {
  warning: w => winston.warn(w),
  error: e => winston.warn(e),
  fatalError: fe => winston.error(fe),
}

function SpineItem() {
  this.filepath = "";
  this.relpath = "";
  this.title = "";
  this.url = ""; // different from filepath: preceeded by "file://". included for convenience.
  this.properties = "";
}

function EpubParser() {
  this.contentDocs = [];
  this.metadata = {};
  this.opfLang = undefined;
  this.contentDocMediaType = "application/xhtml+xml";
}

function parseNavDoc(fullpath, epubDir) {
  const content = fs.readFileSync(fullpath).toString();
  // not application/xhtml+xml because:
  // https://github.com/jindw/xmldom/pull/208
  // https://github.com/jindw/xmldom/pull/242
  // https://github.com/xmldom/xmldom/blob/3db6ccf3f7ecbde73608490d71f96c727abdd69a/lib/dom-parser.js#L12
  const doc = new DOMParser({errorHandler}).parseFromString(content, 'application/xhtml');

  // Select the ToC
  const select = xpath.useNamespaces({
    html: 'http://www.w3.org/1999/xhtml',
    epub: 'http://www.idpf.org/2007/ops',
  });

  const sPageList = select('//html:nav[@epub:type="page-list"]', doc);
  const hasPageList = sPageList.length > 0;

  let pageListHrefs = undefined;
  if (hasPageList) {
    const arr1 = select('descendant::html:a/@href', sPageList[0]);
    pageListHrefs = arr1.map((o) => decodeURIComponent(o.nodeValue));
    // console.log(arr1.length, JSON.stringify(pageListHrefs, null, 4));
  }

  let tocHrefs = undefined;
  const sTOC = select('//html:nav[@epub:type="toc"]/html:ol', doc);
  if (sTOC[0]) {
    const arr2 = select('descendant::html:a/@href', sTOC[0]);
    tocHrefs = arr2.map((o) => decodeURIComponent(o.nodeValue));
    // console.log(arr2.length, JSON.stringify(tocHrefs, null, 4));
  }

  // Remove all links
  const aElems = doc.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'a');
  const len = aElems.length;
  for (let i = 0; i < len; i += 1) {
    const a = aElems[i];
    while (a.firstChild) a.parentNode.insertBefore(a.firstChild, a);
    a.parentNode.removeChild(a);
  }

  const tocHTML = new XMLSerializer().serializeToString(sTOC[0]);
  // console.log(tocHTML);

  return {
    src: path.relative(epubDir, fullpath),
    pageListHrefs,
    tocHrefs,
    tocHTML,
    hasPageList,
  };
}


function addMeta(name, value, meta) {
  name = name.trim();
  value = value.trim();
  if (!name || !value) { // empty strings => bail out
    return;
  }
  if (!meta[name]) {
    meta[name] = value;
  } else if (!(meta[name] instanceof Array)) {
    meta[name] = [meta[name], value];
  } else {
    meta[name].push(value);
  }
}
function parseMetadata(doc, select, epub) {
  const isEPUB3 = epub.version && epub.version.startsWith("3");
  const result = {};
  let dcSourceAdded = false;
  let dcSource = undefined;
  let dcSourceId = undefined;
  select('/opf:package/opf:metadata/dc:*', doc).forEach((dcElem) => {
    if (isEPUB3 && dcElem.localName === "source") {
      // if (!!dcElem.getAttribute("id")) {
        dcSource = dcElem.textContent;
        dcSourceId = dcElem.getAttribute("id");
      // }
      return;
    }
    addMeta(`dc:${dcElem.localName}`, dcElem.textContent, result);
  });
  select('/opf:package/opf:metadata/opf:meta', doc).forEach((meta) => {
    const prop = meta.getAttribute('property');
    const name = meta.getAttribute('name');
    const md = prop || name;

    // implies isEPUB3
    let refines = meta.getAttribute('refines');
    if (refines) {
      refines = refines.trim();
      if (refines.startsWith("#")) {
        refines = refines.substring(1);
      }
      refines = refines.trim();
      if (refines) {
        // isEPUB3 implied
        if (md === "source-of" && meta.textContent === "pagination" && refines === dcSourceId) {
          dcSourceAdded = true;
          addMeta(`dc:source`, dcSource, result);
          return;
        }
        // we exclude most refined metadata such as audio duration for individual spine items, or title-type=subtitle for dc:title, etc.
        // ... but we preserve known global metadata:
        // here, this accessibility metadata can typically associated with a particular dcterms:conformsTo statement
        // (unfortunately in this simplified metadata parsing model, we lose refine semantics completely,
        // so multiple dcterms:conformsTo statements will not be explicitly linked to their associated a11y:cert* declarations)
        if (md !== "a11y:certifiedBy" && md !== "a11y:certifierCredential" && md !== "a11y:certifierReport") {
          return;
        }
      }
    }

    if (prop) {
      if (meta.textContent) {
        addMeta(prop, meta.textContent, result);
      }
    } else {
      const content = meta.getAttribute('content');
      if (name && content) {
        addMeta(name, content, result);
      }
    }
  });

  if (isEPUB3 && dcSource && !dcSourceAdded) {
    // console.log(JSON.stringify(result));
    const confTo = result["dcterms:conformsTo"] || epub.links && epub.links["dcterms:conformsTo"];
    if (confTo && confTo.startsWith("http://www.idpf.org/epub/a11y/")) { // EPUB a11y 1.0
      addMeta(`dc:source`, dcSource, result);
    }
  }

  return result;
}


function addLink(rel, href, link) {
  rel = rel.trim();
  href = href.trim();
  if (!link[rel]) {
    link[rel] = href;
  } else if (!(link[rel] instanceof Array)) {
    link[rel] = [link[rel], href];
  } else {
    link[rel].push(href);
  }
}
function parseLinks(doc, select) {
  const result = {};
  select('/opf:package/opf:metadata/opf:link', doc).forEach((link) => {

    const rel = link.getAttribute('rel');

    let refines = link.getAttribute('refines');
    if (refines) {
      refines = refines.trim();
      if (refines.startsWith("#")) {
        refines = refines.substring(1);
      }
      refines = refines.trim();
      if (refines) {
        // we exclude most refined metadata such as audio duration for individual spine items, or title-type=subtitle for dc:title, etc.
        // ... but we preserve known global metadata:
        // here, this accessibility metadata can typically associated with a particular dcterms:conformsTo statement
        // (unfortunately in this simplified metadata parsing model, we lose refine semantics completely,
        // so multiple dcterms:conformsTo statements will not be explicitly linked to their associated a11y:cert* declarations)
        if ( // rel !== "a11y:certifiedBy" &&
          rel !== "a11y:certifierCredential" && rel !== "a11y:certifierReport") {
          return;
        }
      }
    }

    addLink(rel, decodeURIComponent(link.getAttribute('href')), result);
  });
  return result;
}

// override the default of XHTML
EpubParser.prototype.setContentDocMediaType = function(mediaType) {
  this.contentDocMediaType = mediaType;
}

// returns true or false
EpubParser.prototype.parse = function(epubDir) {
  winston.info("Parsing EPUB");
  winston.verbose(`at location '${epubDir}'`);

  return new Promise((resolve, reject) => {
    const packageDocPath = this.calculatePackageDocPath(epubDir);
    if (packageDocPath === '') {
      winston.error('Package document not found.');
      reject(new Error("Package document not found."));
      return;
    }
    this.packageDoc = {
      src: path.relative(epubDir, packageDocPath),
      path: packageDocPath,
    };
    this.parseData(packageDocPath, epubDir);
    resolve(this);
  });
}

EpubParser.prototype.parseData = function(packageDocPath, epubDir) {
  const content = fs.readFileSync(packageDocPath).toString();
  const doc = new DOMParser({errorHandler}).parseFromString(content);
  const select = xpath.useNamespaces(
    { opf: 'http://www.idpf.org/2007/opf',
      dc: 'http://purl.org/dc/elements/1.1/',
      xml: 'http://www.w3.org/XML/1998/namespace'
  });

  const langAttr = select('/opf:package/@xml:lang', doc)[0];
  this.opfLang = langAttr ? langAttr.nodeValue : undefined;

  const versionAttr = select('/opf:package/@version', doc)[0];
  this.version = versionAttr ? versionAttr.nodeValue : undefined;

  this.links = parseLinks(doc, select);
  this.metadata = parseMetadata(doc, select, this);

  var spineContainsNavDoc = undefined;
  const spineItemIdrefs = select('/opf:package/opf:spine/opf:itemref/@idref', doc);
  spineItemIdrefs.forEach((idref) => {
    const manifestItem = select(`/opf:package/opf:manifest/opf:item[@id='${idref.nodeValue}']`, doc);
    if (manifestItem.length > 0) {
      const contentType = (manifestItem[0].getAttribute('media-type')||'').trim();
      if (this.contentDocMediaType === contentType) {

        var spineItem = new SpineItem();
        spineItem.relpath = decodeURIComponent(manifestItem[0].getAttribute('href'));
        // if (manifestItem[0].getAttribute('href').includes("%")) console.log(`${manifestItem[0].getAttribute('href')} ===> ${spineItem.relpath}`);
        spineItem.filepath = path.join(path.dirname(packageDocPath), spineItem.relpath);

        const o = this.parseContentDocTitleAndIds(spineItem.filepath);
        spineItem.title = o.titleText;
        spineItem.targetIDs = o.docIds;

        // does encodeURI() as per https://tools.ietf.org/html/rfc3986#section-3.3 in a nutshell: encodeURI(`file://${tmpFile}`).replace(/[?#]/g, encodeURIComponent)
        spineItem.url = fileUrl(spineItem.filepath);
        // spineItem.url = "file://" + encodeURI(spineItem.filepath);

        this.contentDocs.push(spineItem);

        if (!spineContainsNavDoc) {
          const props = (manifestItem[0].getAttribute('properties')||'').trim().replace(/\s\s+/g, ' ').split(' ');
          if (props.includes('nav')) {
            spineContainsNavDoc = spineItem;
          }
        }

        const moAttr = manifestItem[0].getAttribute('media-overlay');
        const smilManifestItem = select(`/opf:package/opf:manifest/opf:item[@id='${moAttr}']`, doc);
        if (smilManifestItem.length > 0) {
          spineItem.mediaOverlay = {};
          spineItem.mediaOverlay.smilRelPath = decodeURIComponent(smilManifestItem[0].getAttribute('href'));
          spineItem.mediaOverlay.smilFilePath = path.join(path.dirname(packageDocPath), spineItem.mediaOverlay.smilRelPath );
          // spineItem.mediaOverlay.smilUrl = fileUrl(spineItem.mediaOverlay.smilFilePath);
          spineItem.mediaOverlay.smilRefs = this.parseSmilRefs(spineItem.mediaOverlay.smilFilePath);
        }

      } else if (!this.hasSVGContentDocuments && 'image/svg+xml' === contentType) {
        winston.warn('The SVG Content Documents in this EPUB will be ignored.');
        this.hasSVGContentDocuments = true;
      }
    }
  });

  const navDocRef = select('/opf:package/opf:manifest/opf:item'
                            + '[contains(concat(" ", normalize-space(@properties), " ")," nav ")]'
                            + '/@href', doc);
  if (navDocRef.length > 0) {
    const navDocPath = decodeURIComponent(navDocRef[0].nodeValue);
    const navDocFullPath = path.join(path.dirname(packageDocPath), navDocPath);
    this.navDoc = parseNavDoc(navDocFullPath, epubDir);

    this.navDoc.relpath = navDocPath;
    this.navDoc.filepath = navDocFullPath;
    this.navDoc.url = fileUrl(this.navDoc.filepath);

    if (spineContainsNavDoc) {
      if (spineContainsNavDoc.filepath !== navDocFullPath) {
        console.log("Nav Doc Spine DIFF PATHS!?", spineContainsNavDoc.filepath, navDocFullPath);
      }
    } else {
      var spi = new SpineItem();

      spi.relpath = navDocPath;
      spi.filepath = navDocFullPath;

      const o = this.parseContentDocTitleAndIds(spi.filepath);
      spi.title = o.titleText;
      spi.targetIDs = o.docIds;

      spi.url = fileUrl(spi.filepath);

      spi.notInReadingOrder = true;

      this.contentDocs.push(spi);
    }
  }

  this.hasGuide = select('/opf:package/opf:guide', doc).length > 0;
  this.hasBindings = select('/opf:package/opf:bindings', doc).length > 0;
  this.hasManifestFallbacks = select('/opf:package/opf:manifest/opf:item[@fallback]', doc).length > 0;
};

EpubParser.prototype.parseSmilRefs = function(filepath) {
  const content = fs.readFileSync(filepath).toString();
  const doc = new DOMParser({errorHandler}).parseFromString(content, 'application/xml');
  const select = xpath.useNamespaces({smil: "http://www.w3.org/ns/SMIL", epub: "http://www.idpf.org/2007/ops"});

  const arr = select('//smil:text[@src]', doc);
  let smilRefs = arr.map((o) => {
    let epubType = o.parentNode ? o.parentNode.getAttributeNS('http://www.idpf.org/2007/ops', 'type') : undefined;
    if (epubType) {
      epubType = epubType.trim();
    }
    if (!epubType) {
      epubType = undefined;
    }

    const src = o.getAttribute("src");
    return {
      src,
      full: path.join(path.dirname(filepath), src),
      epubType
    };
  });
  // console.log(arr.length, JSON.stringify(smilRefs, null, 4));

  return smilRefs;
}
EpubParser.prototype.parseContentDocTitleAndIds = function(filepath) {
  const content = fs.readFileSync(filepath).toString();
  // not application/xhtml+xml because:
  // https://github.com/jindw/xmldom/pull/208
  // https://github.com/jindw/xmldom/pull/242
  // https://github.com/xmldom/xmldom/blob/3db6ccf3f7ecbde73608490d71f96c727abdd69a/lib/dom-parser.js#L12
  const doc = new DOMParser({errorHandler}).parseFromString(content, 'application/xhtml');
  const select = xpath.useNamespaces({html: "http://www.w3.org/1999/xhtml", epub: "http://www.idpf.org/2007/ops"});
  const title = select('/html:html/html:head/html:title/text()', doc);
  let titleText = title.length > 0 ? title[0].nodeValue : "";

  const arr = select('//*[@id]', doc);
  let docIds = arr.map((o) => {
    let epubType = o.getAttributeNS('http://www.idpf.org/2007/ops', 'type');
    if (epubType) {
      epubType = epubType.trim();
    }
    if (!epubType) {
      epubType = undefined;
    }

    let role = o.getAttribute('role');
    if (role) {
      role = role.trim();
    }
    if (!role) {
      role = undefined;
    }
   return {
    id: o.getAttribute("id"),
    epubType,
    role
   };
  });
  // console.log(arr.length, JSON.stringify(docIds, null, 4));

  return {
    titleText, docIds
  };
}

EpubParser.prototype.calculatePackageDocPath = function(epubDir) {
  const containerFilePath = `${epubDir}/META-INF/container.xml`;
  const content = fs.readFileSync(containerFilePath).toString();
  const doc = new DOMParser({errorHandler}).parseFromString(content);
  const select = xpath.useNamespaces({ ocf: 'urn:oasis:names:tc:opendocument:xmlns:container' });
  const rootfiles = select('/ocf:container/ocf:rootfiles/ocf:rootfile[@media-type="application/oebps-package+xml"]/@full-path', doc);
  // just grab the first one as we're not handling the case of multiple renditions
  if (rootfiles.length > 0) {
    return (path.join(epubDir, decodeURIComponent(rootfiles[0].nodeValue)));
  }
  return '';
}

function encodeURIComponent_RFC3986(str) {
    return encodeURIComponent(str)
        .replace(/[!'()*]/g, (c) => {
            return "%" + c.charCodeAt(0).toString(16);
        });
}

module.exports.SpineItem = SpineItem;
module.exports.EpubParser = EpubParser;

module.exports.encodeURIComponent_RFC3986 = encodeURIComponent_RFC3986;
