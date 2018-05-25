// input: unzipped book directory
// returns: collection of spine items, title, identifier
// caveat: doesn't filter for uniqueness

// uses node libraries:
// https://github.com/goto100/xpath
// https://github.com/jindw/xmldom

// TODO make async

'use strict';

const DOMParser = require('xmldom-alpha').DOMParser;
const XMLSerializer = require('xmldom-alpha').XMLSerializer;
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
  this.contentDocMediaType = "application/xhtml+xml";
}

function parseNavDoc(fullpath, epubDir) {
  const content = fs.readFileSync(fullpath).toString();
  //FIXME hack to workaround xmldom-alpha regex test
  const doc = new DOMParser({errorHandler}).parseFromString(content, 'application/xhtml');

  // Remove all links
  const aElems = doc.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'a');
  const len = aElems.length;
  for (let i = 0; i < len; i += 1) {
    const a = aElems[i];
    while (a.firstChild) a.parentNode.insertBefore(a.firstChild, a);
    a.parentNode.removeChild(a);
  }

  // Select the ToC
  const select = xpath.useNamespaces({
    html: 'http://www.w3.org/1999/xhtml',
    epub: 'http://www.idpf.org/2007/ops',
  });
  const toc = select('//html:nav'
                        + '[@epub:type="toc"]/html:ol', doc);
  const tocHTML = new XMLSerializer().serializeToString(toc[0]);
  const hasPageList = select('//html:nav'
                        + '[@epub:type="page-list"]', doc).length > 0;

  return {
    src: path.relative(epubDir, fullpath),
    tocHTML,
    hasPageList,
  };
}


function addMeta(name, value, meta) {
  if (!meta[name]) {
    meta[name] = value;
  } else if (!(meta[name] instanceof Array)) {
    meta[name] = [meta[name], value];
  } else {
    meta[name].push(value);
  }
}
function parseMetadata(doc, select) {
  const result = {};
  select('//dc:*', doc).forEach((dcElem) => {
    addMeta(`dc:${dcElem.localName}`, dcElem.textContent, result);
  });
  select('//opf:meta[not(@refines)]', doc).forEach((meta) => {
    addMeta(meta.getAttribute('property'), meta.textContent, result);
  });
  return result;
}


function addLink(rel, href, link) {
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
  select('//opf:link[not(@refines)]', doc).forEach((link) => {
    addLink(link.getAttribute('rel'), link.getAttribute('href'), result);
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
    }
    this.packageDoc = {
      src: path.relative(epubDir, packageDocPath),
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
      dc: 'http://purl.org/dc/elements/1.1/'});
  this.metadata = parseMetadata(doc, select);
  this.links = parseLinks(doc, select);

  const spineItemIdrefs = select('//opf:itemref/@idref', doc);
  spineItemIdrefs.forEach((idref) => {
    const manifestItem = select(`//opf:item[@id='${idref.nodeValue}']`, doc);
    if (manifestItem.length > 0) {
      const contentType = (manifestItem[0].getAttribute('media-type')||'').trim();
      if (this.contentDocMediaType === contentType) {
        var spineItem = new SpineItem();
        spineItem.relpath = manifestItem[0].getAttribute('href');
        spineItem.filepath = path.join(path.dirname(packageDocPath), spineItem.relpath);
        spineItem.title = this.parseContentDocTitle(spineItem.filepath);
        spineItem.url = "file://" + spineItem.filepath;
        this.contentDocs.push(spineItem);
      } else if (!this.hasSVGContentDocuments && 'image/svg+xml' === contentType) {
        winston.warn('The SVG Content Documents in this EPUB will be ignored.');
        this.hasSVGContentDocuments = true;
      }
    }
  });

  const navDocRef = select('//opf:item'
                            + '[contains(concat(" ", normalize-space(@properties), " ")," nav ")]'
                            + '/@href', doc);
  if (navDocRef.length > 0) {
    const navDocPath = navDocRef[0].nodeValue;
    const navDocFullPath = path.join(path.dirname(packageDocPath), navDocPath);
    this.navDoc = parseNavDoc(navDocFullPath, epubDir);
  }

  this.hasBindings = select('//opf:bindings', doc).length > 0;
  this.hasManifestFallbacks = select('//opf:item[@fallback]', doc).length > 0;
};

EpubParser.prototype.parseContentDocTitle = function(filepath) {
  const content = fs.readFileSync(filepath).toString();
  //FIXME hack to workaround xmldom-alpha regex test
  const doc = new DOMParser({errorHandler}).parseFromString(content, 'application/xhtml');
  const select = xpath.useNamespaces({html: "http://www.w3.org/1999/xhtml", epub: "http://www.idpf.org/2007/ops"});
  const title = select('//html:title/text()', doc);
  if (title.length > 0) {
    return title[0].nodeValue;
  }
  else {
    return "";
  }
}

EpubParser.prototype.calculatePackageDocPath = function(epubDir) {
  const containerFilePath = `${epubDir}/META-INF/container.xml`;
  const content = fs.readFileSync(containerFilePath).toString();
  const doc = new DOMParser({errorHandler}).parseFromString(content);
  const select = xpath.useNamespaces({ ocf: 'urn:oasis:names:tc:opendocument:xmlns:container' });
  const rootfiles = select('//ocf:rootfile[@media-type="application/oebps-package+xml"]/@full-path', doc);
  // just grab the first one as we're not handling the case of multiple renditions
  if (rootfiles.length > 0) {
    return (path.join(epubDir, rootfiles[0].nodeValue));
  }
  return '';
}


module.exports.SpineItem = SpineItem;
module.exports.EpubParser = EpubParser;
