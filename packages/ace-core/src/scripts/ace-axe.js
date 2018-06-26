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

  window.axe.configure({
    checks: [
      {
        id: "matching-aria-role",
        evaluate: function evaluate(node, options) {
          var mappings = new Map([
            ['abstract', 'doc-abstract'],
            ['acknowledgments', 'doc-acknowledgments'],
            ['afterword', 'doc-afterword'],
            ['appendix', 'doc-appendix'],
            ['backlink', 'doc-backlink'],
            ['biblioentry', 'doc-biblioentry'],
            ['bibliography', 'doc-bibliography'],
            ['biblioref', 'doc-biblioref'],
            ['chapter', 'doc-chapter'],
            ['colophon', 'doc-colophon'],
            ['conclusion', 'doc-conclusion'],
            ['cover', 'doc-cover'],
            ['credit', 'doc-credit'],
            ['credits', 'doc-credits'],
            ['dedication', 'doc-dedication'],
            ['endnote', 'doc-endnote'],
            ['endnotes', 'doc-endnotes'],
            ['epigraph', 'doc-epigraph'],
            ['epilogue', 'doc-epilogue'],
            ['errata', 'doc-errata'],
            ['footnote', 'doc-footnote'],
            ['foreword', 'doc-foreword'],
            ['glossary', 'doc-glossary'],
            ['glossdef', 'definition'],
            ['glossref', 'doc-glossref'],
            ['glossterm', 'term'],
            ['help', 'doc-tip'],
            ['index', 'doc-index'],
            ['introduction', 'doc-introduction'],
            ['noteref', 'doc-noteref'],
            ['notice', 'doc-notice'],
            ['pagebreak', 'doc-pagebreak'],
            ['page-list', 'doc-pagelist'],
            ['part', 'doc-part'],
            ['preface', 'doc-preface'],
            ['prologue', 'doc-prologue'],
            ['pullquote', 'doc-pullquote'],
            ['qna', 'doc-qna'],
            ['referrer', 'doc-backlink'],
            ['subtitle', 'doc-subtitle'],
            ['tip', 'doc-tip'],
            ['toc', 'doc-toc']
          ]);
          if (node.hasAttributeNS('http://www.idpf.org/2007/ops', 'type')) {
            var type = node.getAttributeNS('http://www.idpf.org/2007/ops', 'type').trim();
            if (mappings.has(type)) {
              if (!node.hasAttribute('role')) {
                return false;
              } else {
                var role = node.getAttribute('role').trim();
                return role == mappings.get(type);
              }
            }
          }
          return true;
        },
        metadata: {
          impact: 'minor',
          messages: {
            pass: function anonymous(it) {
              var out = 'Element has an ARIA role matching its epub:type';
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element has no ARIA role matching its epub:type';
              return out;
            }
          }
        }
      }
    ],
    rules: [
      {
        id: 'pagebreak-label',
        selector: '[*|type~="pagebreak"], [role~="doc-pagebreak"]',
        any: ['aria-label', 'non-empty-title'],
        metadata: {
          help: "Page markers should have an accessible label",
          description: "Ensure page markers have an accessible label",
        },
        tags: ['cat.epub']
      },
      {
        id: 'epub-type-has-matching-role',
        selector: '[*|type]',
        any: ['matching-aria-role'],
        metadata: {
          help: "ARIA role should be used in addition to epub:type",
          description: "Ensure the element has an ARIA role matching its epub:type",
        },
        tags: ['best-practice']
      },
      {
        id: 'landmark-one-main',
        all: [
          "has-no-more-than-one-main"
          ],
      }
    ]
  });

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
