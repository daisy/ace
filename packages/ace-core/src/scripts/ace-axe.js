/* eslint-disable */

'use strict';

var daisy = window.daisy =  window.daisy || {};
daisy.ace = daisy.ace || {};
daisy.epub = daisy.epub || {};

daisy.epub.createCFI = function(elem) {

  if (elem && elem.parentNode && elem.parentNode.nodeType && elem.parentNode.nodeType !== 1) {
    return "/"; // HTML root element (not "/2"!)
  }

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
          throw "Not ARRAY?!";
        }
      }
    }
  };

  window.axe.configure({
    locale: window.__axeLocale__, // configured from host bootstrapper page (checker-chromium) can be undefined
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
            ['credit', 'doc-credit'],
            ['credits', 'doc-credits'],
            ['dedication', 'doc-dedication'],
            ['endnote', 'doc-endnote'],
            ['endnotes', 'doc-endnotes'],
            ['epigraph', 'doc-epigraph'],
            ['epilogue', 'doc-epilogue'],
            ['errata', 'doc-errata'],
            ['figure', 'figure'],
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
            ['page-list', 'doc-pagelist'],
            ['pagebreak', 'doc-pagebreak'],
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
            // abort if descendant of landmarks nav (nav with epub:type=landmarks)
            if (axe.utils.matchesSelector(node, 'nav[*|type~="landmarks"] *')) {
              return true;
            }

            // iterate for each epub:type value
            var types = axe.utils.tokenList(node.getAttributeNS('http://www.idpf.org/2007/ops', 'type'));
            for (const type of types) {
                // If there is a 1-1 mapping, check that the role is set (best practice)
                if (mappings.has(type)) {
                  // Note: using axe’s `getRole` util returns the effective role of the element
                  // (either explicitly set with the role attribute or implicit)
                  // So this works for types mapping to core ARIA roles (eg. glossref/glossterm).
                  return mappings.get(type) == axe.commons.aria.getRole(node,{dpub: true});
                }
              }
          }
          return true;
        },
        metadata: {
          impact: 'minor',
          messages: {
            pass: function anonymous(it) {
              // configured from host bootstrapper page (checker-chromium)
              const k = "__aceLocalize__axecheck_matching-aria-role_pass";
              return window[k] || k;
            },
            fail: function anonymous(it) {
              // configured from host bootstrapper page (checker-chromium)
              const k = "__aceLocalize__axecheck_matching-aria-role_fail";
              return window[k] || k;
            }
          }
        }
      }
    ],
    rules: [
      {
        id: 'pagebreak-label',
        // selector: '[*|type~="pagebreak"], [role~="doc-pagebreak"]',
        matches: function matches(node, virtualNode, context) {
          return node.hasAttribute('role')
              && node.getAttribute('role').match(/\S+/g).includes('doc-pagebreak')
              || node.hasAttributeNS('http://www.idpf.org/2007/ops', 'type')
              && node.getAttributeNS('http://www.idpf.org/2007/ops', 'type').match(/\S+/g).includes('pagebreak')
        },
        any: ['aria-label', 'non-empty-title'],
        metadata: {
          // configured from host bootstrapper page (checker-chromium)
          description: (() => { const k = "__aceLocalize__axerule_pagebreak-label_desc"; return window[k] || k; })()
        },
        tags: ['cat.epub']
      },
      {
        id: 'epub-type-has-matching-role',
        // selector: '[*|type]',
        matches: function matches(node, virtualNode, context) {
          return node.hasAttributeNS('http://www.idpf.org/2007/ops', 'type')
        },        
        any: ['matching-aria-role'],
        metadata: {
          // configured from host bootstrapper page (checker-chromium)
          help: (() => { const k = "__aceLocalize__axerule_epub-type-has-matching-role_help"; return window[k] || k; })(),
          description: (() => { const k = "__aceLocalize__axerule_epub-type-has-matching-role_desc"; return window[k] || k; })()
        },
        tags: ['best-practice']
      },
      {
        id: 'landmark-one-main',
        all: [
          "page-no-duplicate-main"
          ],
      }
    ]
  });

  window.axe.run(
    {
      "rules": {
        "bypass": { enabled: false },
        "region": { enabled: false },
        "page-has-heading-one": { enabled: false },
        // The following newer Axe rules need to be further reviewed
        // to see if they're useful in an EPUB context
        "landmark-complementary-is-top-level": { enabled: false },
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
