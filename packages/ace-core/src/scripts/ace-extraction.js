/* eslint-disable */

'use strict';

var daisy = window.daisy =  window.daisy || {};
var ace = daisy.ace = daisy.ace || {};

ace.createReport = function(report) {
    let reportData = function(field, array) {
      if (array.length > 0) report.data[field] = array;
    }
    report.outlines = report.outlines || {};
    report.outlines.html = ace.getHTMLOutline();
    report.outlines.headings = ace.getHeadings();
    report.data = report.data || {};
    reportData('images', ace.getImages());
    reportData('audios', ace.getAudios());
    reportData('canvases', ace.getCanvases());
    reportData('embeds', ace.getEmbeds());
    reportData('epub-triggers', ace.getEPUBTriggers());
    reportData('epub-switches', ace.getEPUBSwitches());
    reportData('iframes', ace.getIframes());
    reportData('maps', ace.getMaps());
    reportData('scripts', ace.getScripts());
    reportData('videos', ace.getVideos());
    report.properties = report.properties || {};
    report.properties.hasFormElements = ace.hasFormElements();
    report.properties.hasMathML = ace.hasMathML();
    report.properties.hasPageBreaks = ace.hasPageBreaks();
};

ace.getAudios = function() {
  let audioElems = document.querySelectorAll('audio');
  let audios = [];
  audioElems.forEach(function(audio) {
    let audioObj = {
      controls: audio.hasAttribute('controls'),
      cfi: window.daisy.epub.createCFI(audio),
      html: audio.outerHTML,
      tracks: [],
    }
    if (audio.hasAttribute('id')) audioObj.id = audio.getAttribute('id');
    if (audio.hasAttribute('src')) {
      audioObj.src = audio.getAttribute('src');
    } else {
      audioObj.src = [];
      audio.querySelectorAll('source').forEach(function(source) {
        audioObj.src.push({
          src: source.getAttribute('src'),
          type: source.getAttribute('type'),
        });
      });
    }
    audio.querySelectorAll('track').forEach(function(track) {
      let trackObj = {};
      if (track.hasAttribute('label')) trackObj.label = track.getAttribute('label');
      if (track.hasAttribute('kind')) trackObj.kind = track.getAttribute('kind');
      if (track.hasAttribute('src')) trackObj.src = track.getAttribute('src');
      if (track.hasAttribute('srclang')) trackObj.srclang = track.getAttribute('srclang');
      audioObj.tracks.push(trackObj);
    });
    audios.push(audioObj);
  });
  return audios;
}

ace.getCanvases = function() {
  let canvasElems = document.querySelectorAll('canvas');
  let canvass = [];
  canvasElems.forEach(function(canvas) {
    let canvasObj = {
      cfi: window.daisy.epub.createCFI(canvas),
    }
    if (canvas.hasAttribute('id')) canvasObj.id = canvas.getAttribute('id');
    canvass.push(canvasObj);
  });
  return canvass;
}

ace.getEmbeds = function() {
  let embedElems = document.querySelectorAll('embed');
  let embeds = [];
  embedElems.forEach(function(embed) {
    let embedObj = {
      cfi: window.daisy.epub.createCFI(embed),
    }
    if (embed.hasAttribute('id')) embedObj.id = embed.getAttribute('id');
    if (embed.hasAttribute('src')) embedObj.src = embed.getAttribute('src');
    if (embed.hasAttribute('type')) embedObj.type = embed.getAttribute('type');
    embeds.push(embedObj);
  });
  return embeds;
}

ace.getEPUBSwitches = function() {
  let switchElems = document.querySelectorAll('*|switch');
  let switches = [];
  switchElems.forEach(function(elem) {
    if (elem.namespaceURI === 'http://www.idpf.org/2007/ops') {
      let obj = {
        cfi: window.daisy.epub.createCFI(elem),
      }
      if (elem.hasAttribute('id')) obj.id = elem.getAttribute('id');
      switches.push(obj);
    }
  });
  return switches;
}

ace.getEPUBTriggers = function() {
  let triggerElems = document.querySelectorAll('*|trigger');
  let triggers = [];
  triggerElems.forEach(function(elem) {
    if (elem.namespaceURI === 'http://www.idpf.org/2007/ops') {
      let obj = {
        cfi: window.daisy.epub.createCFI(elem),
      }
      if (elem.hasAttribute('id')) obj.id = elem.getAttribute('id');
      triggers.push(obj);
    }
  });
  return triggers;
}

ace.getHTMLOutline = function() {
  return HTML5Outline(document.body).asHTML();
}

ace.getHeadings = function() {
  let hxElems = document.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]');
  let headings = [];
  // FIXME filter headings in sectioning roots
  // function findSectioningRoot (el, cls) {
  //   while ((el = el.parentElement) && !el.isSectioningRoot());
  //   return el;
  // }

  hxElems.forEach(function(hx) {
    let level = +hx.localName.slice(1);
    if (Number.isNaN(level)) level = +hx.getAttribute('aria-level');
    if (!Number.isInteger(level) || level < 1) level = 2; // NOTE aria-level fallback value per ARIA spec is 2 (and avoid Infinity)
    headings.push({
      html: hx.textContent,
      level: level
    });
  });


  return headings;
}

ace.getIframes = function() {
  let iframeElems = document.querySelectorAll('iframe');
  let iframes = [];
  iframeElems.forEach(function(iframe) {
    let iframeObj = {
      cfi: window.daisy.epub.createCFI(iframe),
    }
    if (iframe.hasAttribute('id')) iframeObj.id = iframe.getAttribute('id');
    if (iframe.hasAttribute('src')) iframeObj.src = iframe.getAttribute('src');
    iframes.push(iframeObj);
  });
  return iframes;
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
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt'),
      role: img.getAttribute('role'),
      cfi: window.daisy.epub.createCFI(img),
      html: img.outerHTML,
    }
    let describedby = img.getAttribute('aria-describedby')
    if (describedby) {
      var describedbyID = describedby.trim().replace(/\s{2,}/g, ' ').split(' ').shift();
      let elem = document.getElementById(describedbyID);
      if (elem) imageObj.describedby = elem.innerText || elem.textContent;
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

ace.getMaps = function() {
  let mapElems = document.querySelectorAll('map');
  let maps = [];
  mapElems.forEach(function(map) {
    let mapObj = {
      cfi: window.daisy.epub.createCFI(map),
      name: map.getAttribute('name'),
    }
    if (map.hasAttribute('id')) mapObj.id = map.getAttribute('id');
    maps.push(mapObj);
  });
  return maps;
}

ace.getObjects = function() {
  let objectElems = document.querySelectorAll('object');
  let objects = [];
  objectElems.forEach(function(object) {
    let objectObj = {
      cfi: window.daisy.epub.createCFI(object),
    }
    if (object.hasAttribute('id')) objectObj.id = object.getAttribute('id');
    if (object.hasAttribute('data')) objectObj.data = object.getAttribute('data');
    if (object.hasAttribute('type')) objectObj.type = object.getAttribute('type');
    objects.push(objectObj);
  });
  return objects;
}

ace.getScripts = function() {
  let scriptElems = document.querySelectorAll('script:not([data-ace])');
  let scripts = [];
  scriptElems.forEach(function(script) {
    let scriptObj = {
      cfi: window.daisy.epub.createCFI(script),
    }
    scriptObj.type = (script.hasAttribute('type'))?script.getAttribute('type'):'text/javascript';
    if (script.hasAttribute('id')) scriptObj.id = script.getAttribute('id');
    if (script.hasAttribute('src')) scriptObj.src = script.getAttribute('src');
    scripts.push(scriptObj);
  });
  return scripts;
}

ace.getVideos = function() {
  let videoElems = document.querySelectorAll('video');
  let videos = [];
  videoElems.forEach(function(video) {
    let videoObj = {
      controls: video.hasAttribute('controls'),
      cfi: window.daisy.epub.createCFI(video),
      html: video.outerHTML,
      tracks: [],
    }
    if (video.hasAttribute('id')) videoObj.id = video.getAttribute('id');
    if (video.hasAttribute('src')) {
      videoObj.src = video.getAttribute('src');
    } else {
      videoObj.src = [];
      video.querySelectorAll('source').forEach(function(source) {
        videoObj.src.push({
          src: source.getAttribute('src'),
          type: source.getAttribute('type'),
        });
      });
    }
    video.querySelectorAll('track').forEach(function(track) {
      let trackObj = {};
      if (track.hasAttribute('label')) trackObj.label = track.getAttribute('label');
      if (track.hasAttribute('kind')) trackObj.kind = track.getAttribute('kind');
      if (track.hasAttribute('src')) trackObj.src = track.getAttribute('src');
      if (track.hasAttribute('srclang')) trackObj.srclang = track.getAttribute('srclang');
      videoObj.tracks.push(trackObj);
    });
    videos.push(videoObj);
  });
  return videos;
}

ace.hasFormElements = function() {
  return document.querySelectorAll('form, input, button, select, datalist, textarea, option, output, progress, meter').length > 0;
}

ace.hasMathML = function() {
  return document.querySelectorAll('math').length > 0;
}

ace.hasPageBreaks = function() {
  return document.querySelectorAll('[*|type~="pagebreak"], [role~="doc-pagebreak"]').length > 0;
}
