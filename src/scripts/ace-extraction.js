/* eslint-disable */
window.daisy =  window.daisy || {};
ace = daisy.ace = daisy.ace || {};

ace.createReport = function(report) {
    report.outlines = report.outlines || {};
    report.outlines.html = ace.getHTMLOutline();
    report.outlines.headings = ace.getHeadings();
    report.data = report.data || {};
    report.data.images = ace.getImages();
};

ace.getHTMLOutline = function() {
  return HTML5Outline(document.body).asHTML();
}

ace.getHeadings = function() {
  let hxElems = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let headings = [];
  // FIXME filter headings in sectioning roots
  // function findSectioningRoot (el, cls) {
  //   while ((el = el.parentElement) && !el.isSectioningRoot());
  //   return el;
  // }

  hxElems.forEach(function(hx) {
    headings.push({
      html: hx.innerHTML,
      level: +hx.localName.slice(1)
    });
  });


  return headings;
}

ace.getImages = function() {
  var findFigure = function(el) {
    while ((el = el.parentElement) && !(el.localName === 'figure'));
    return el;
  }

  let imgElems = document.querySelectorAll('img');
  let images = [];
  imgElems.forEach(function(img) {
    let imageObj = {
      path: img.getAttribute('src'),
      alt: img.getAttribute('alt'),
      role: img.getAttribute('role'),
      cfi: window.daisy.epub.createCFI(img),
      html: img.outerHTML,
    }
    let describedby = img.getAttribute('aria-describedby')
    if (describedby) {
      let elem = document.getElementById(describedby);
      imageObj.describedby = elem.innerText || elem.textContent;
    }
    let figure = findFigure(img);
    if (figure) {
      let figcaption = figure.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "figcaption");
      if (figcaption.length > 0) imageObj.figcaption = figcaption[0].innerText || figcaption[0].textContent;
    }
    images.push(imageObj);
  });
  return images;
}
