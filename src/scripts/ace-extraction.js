/* eslint-disable */
window.daisy =  window.daisy || {};
ace = daisy.ace = daisy.ace || {};

ace.createReport = function(report) {
    report.outlines = report.outlines || {};
    report.outlines.html = ace.getHTMLOutline();
    report.outlines.headings = ace.getHeadings();
    report.extracted = report.extracted || {};
    report.extracted.images = ace.getImages();
};

ace.getHTMLOutline = function() {
  return HTML5Outline(document.body).asHTML();
}

ace.getHeadings = function() {
  let headingElems = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let headings = [];

  headingElems.forEach(function(headingElement) {
    headings.push({
      html: headingElement.innerHTML,
      level: +headingElement.localName.slice(1)
    });
  });


  return headings;
}

ace.getImages = function() {
  return [];
  // // TODO
  // let imagesWithAlt = document.querySelectorAll('img[alt]:not([alt=""])');
  // console.debug(imagesWithAlt);

  // report.imagesWithAlt = [];

  // imagesWithAlt.forEach(function(imageElement) {
  //     console.debug(imageElement);

  //     report.imagesWithAlt.push({
  //         html: imageElement.outerHTML,
  //         alt: imageElement.getAttribute('alt'),
  //         cfi: window.daisy.epub.createCFI(imageElement)
  //     });
  // });

  // let imagesWithEmptyAlt = document.querySelectorAll('img[alt=""]');
  // console.debug(imagesWithEmptyAlt);

  // report.imagesWithEmptyAlt = [];

  // imagesWithEmptyAlt.forEach(function(imageElement) {
  //     console.debug(imageElement);

  //     report.imagesWithEmptyAlt.push({
  //         html: imageElement.outerHTML,
  //         cfi: window.daisy.epub.createCFI(imageElement)
  //     });
  // });

  // let imagesWithNoAlt = document.querySelectorAll('img:not([alt])');
  // console.debug(imagesWithNoAlt);

  // report.imagesWithNoAlt = [];

  // imagesWithNoAlt.forEach(function(imageElement) {
  //     console.debug(imageElement);

  //     report.imagesWithNoAlt.push({
  //         html: imageElement.outerHTML,
  //         cfi: window.daisy.epub.createCFI(imageElement)
  //     });
  // });

  // report.eactListOfImages = ["test1", "test2"];
  }
