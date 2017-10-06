/* eslint-disable */

'use strict';

var daisy = window.daisy =  window.daisy || {};
daisy.ace = daisy.ace || {};
daisy.epub = daisy.epub || {};

daisy.epub.createCFI = function(elem) {

  var cfi_ = undefined;
  var currentElement = elem;

  do {
    var elementIndex = 0;
    var siblingElement = currentElement;
    for (elementIndex = 1; siblingElement = siblingElement.previousElementSibling; elementIndex++);
    elementIndex *= 2; // even CFI element indices

    var IDassertion = "";
    var id = currentElement.getAttribute("id");

    if (id) {
      IDassertion = "[" + id + "]";
    }

    if (cfi_) {
      cfi_ = elementIndex + IDassertion + "/" + cfi_;
    } else {
      cfi_ = elementIndex + IDassertion;
    }

    currentElement = currentElement.parentNode;
  } while (currentElement && currentElement.nodeType && currentElement.nodeType == 1
          && currentElement.parentNode && currentElement.parentNode.nodeType
          && currentElement.parentNode.nodeType == 1);

  return "/" + cfi_;
};


daisy.ace.run = function(done) {

  var addCFIs = function(jsonItem) {

    if (Array.isArray(jsonItem)) {
      for (var i = 0; i < jsonItem.length; i++) {
        addCFIs(jsonItem[i]);
      }
    } else if (typeof jsonItem === 'object') {
      for (var key in jsonItem) {
        if (!jsonItem.hasOwnProperty(key)) continue;
        var val = jsonItem[key];

        if (key !== "target") {
          addCFIs(val);
          continue;
        }

        if (Array.isArray(val)) {
          jsonItem["targetCFI"] = [];

          for (var i = 0; i < val.length; i++) {
            var cssSelector = val[i];
            var domMatch = document.querySelector(cssSelector);

            var cfi = "_CFI_";

            if (domMatch && domMatch instanceof Element) { //domMatch.nodeType == 1
              try {
                cfi = window.daisy.epub.createCFI(domMatch);
              } catch (err) {
                  //noop
              }
            }

            jsonItem.targetCFI.push(cfi);
          }
        } else {
          throw "WTF?!";
        }
      }
    }
  };

  window.axe.run(
    {
      "rules": {
        "bypass": { enabled: false },
      }
    },
    function(axeError, axeResult) {
      if (axeError)  {
        done(axeError, null);
      }

      addCFIs(axeResult);

      var aceResult = {};

      aceResult.axe = axeResult;

      try {
        daisy.ace.createReport(aceResult);
        done(null, aceResult);
      } catch(e) {
        done(e, null);
      }

    }
  );
};
