// input: unzipped book directory
// returns: paths for spine items with given media type
// caveat: doesn't filter for uniqueness

// uses node libraries:
// https://github.com/goto100/xpath
// https://github.com/jindw/xmldom

'use strict';

const DOMParser = require('xmldom').DOMParser;
const fs = require('fs');
const path = require('path');
const xpath = require('xpath');


function getPackageDocPath(epubDir) {
  const containerFilePath = `${epubDir}/META-INF/container.xml`;
  // console.log(`Reading container file:\n${containerFilePath}\n`);
  const content = fs.readFileSync(containerFilePath).toString();
  const doc = new DOMParser().parseFromString(content);
  const select = xpath.useNamespaces({ ocf: 'urn:oasis:names:tc:opendocument:xmlns:container' });
  const rootfiles = select('//ocf:rootfile[@media-type="application/oebps-package+xml"]/@full-path', doc);
  // just grab the first one
  if (rootfiles.length > 0) {
    return (path.join(epubDir, rootfiles[0].nodeValue));
  }
  return '';
}

module.exports.getSpinePaths = (epubDir, mediaType) => {
  console.log(`Parsing EPUB...`);
  const packageDocPath = getPackageDocPath(epubDir);
  if (packageDocPath === '') {
    console.log('Package document not found.');
    return [];
  }

  // console.log(`Reading package file:\n${packageDocPath}\n`);
  const content = fs.readFileSync(packageDocPath).toString();
  const doc = new DOMParser().parseFromString(content);
  const select = xpath.useNamespaces({ opf: 'http://www.idpf.org/2007/opf' });
  const spineItemIdrefs = select('//opf:itemref/@idref', doc);

  const spineItemPaths = [];
  spineItemIdrefs.forEach((idref) => {
    const manifestItem = select(`//opf:item[@id='${idref.nodeValue}'][@media-type='${mediaType}']/@href`, doc);
    if (manifestItem.length > 0) {
      const manifestItemPath = path.join(
        path.dirname(packageDocPath), manifestItem[0].nodeValue);
      spineItemPaths.push(manifestItemPath);
    }
  });

  return spineItemPaths;
};
