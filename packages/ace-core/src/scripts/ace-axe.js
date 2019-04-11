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
          throw "WTF?!"; // TODO translate / localize / l10n ;)
        }
      }
    }
  };

  window.axe.configure({
    locale: window.__axeLocale__, // configured from host bootstrapper page (checker-chromium)
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
              var out = 'Element has an ARIA role matching its epub:type'; // TODO translate / localize / l10n
              return out;
            },
            fail: function anonymous(it) {
              var out = 'Element has no ARIA role matching its epub:type'; // TODO translate / localize / l10n
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
          description: "Ensure page markers have an accessible label", // TODO translate / localize / l10n
        },
        tags: ['cat.epub']
      },
      {
        id: 'epub-type-has-matching-role',
        selector: '[*|type]',
        any: ['matching-aria-role'],
        metadata: {
          help: "ARIA role should be used in addition to epub:type", // TODO translate / localize / l10n
          description: "Ensure the element has an ARIA role matching its epub:type", // TODO translate / localize / l10n
        },
        tags: ['best-practice']
      },
      {
        id: 'landmark-one-main',
        all: [
          "page-no-duplicate-main" // Was `has-no-more-than-one-main`, see https://github.com/dequelabs/axe-core/blob/develop/CHANGELOG.md#300-2018-03-19
          ],
      }
    ]
  });

  window.axe.run(
    {
      "rules": {
        "bypass": { enabled: false },

        // https://github.com/dequelabs/axe-core/blob/develop/CHANGELOG.md
        // https://github.com/dequelabs/axe-core/compare/v2.6.1...v3.2.2#diff-666edcd06e006682440ca9e74470a171
        // https://github.com/dequelabs/axe-core/commits/v3.2.2/doc/rule-descriptions.md
        // https://github.com/dequelabs/axe-core/blob/v2.6.1/doc/rule-descriptions.md
        "label-content-name-mismatch": { enabled: false },
        "aria-hidden-focus": { enabled: false },
        "landmark-complementary-is-top-level": { enabled: false },
        "form-field-multiple-labels": { enabled: false },
        "duplicate-id-active": { enabled: false },
        "duplicate-id-aria": { enabled: false },
        "css-orientation-lock": { enabled: false },
        "aria-allowed-role": { enabled: false },
        "html-xml-lang-mismatch": { enabled: false },
        "autocomplete-valid": { enabled: false },
        "landmark-banner-is-top-level": { enabled: false },
        "landmark-contentinfo-is-top-level": { enabled: false },
        "frame-tested": { enabled: false },
        "landmark-no-duplicate-banner": { enabled: false }, // landmark-no-more-than-one-banner
        "landmark-no-duplicate-contentinfo": { enabled: false }, // landmark-no-more-than-one-contentinfo
        "page-has-heading-one": { enabled: false },
        "aria-dpub-role-fallback": { enabled: false },
        "focus-order-semantics": { enabled: false },
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
