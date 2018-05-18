'use strict';

(function axePatch(window) {
  const axe = window.axe;
  const dpubRoles = {
    'doc-abstract': {
      type: 'section',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-acknowledgments': {
      type: 'landmark',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-afterword': {
      type: 'landmark',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-appendix': {
      type: 'landmark',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-backlink': {
      type: 'link',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author', 'contents'],
      context: null,
    },
    'doc-biblioentry': {
      type: 'listitem',
      attributes: {
        allowed: ['aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize'],
      },
      owned: null,
      nameFrom: ['author'],
      context: ['doc-bibliography'],
    },
    'doc-bibliography': {
      type: 'landmark',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-biblioref': {
      type: 'link',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author', 'contents'],
      context: null,
    },
    'doc-chapter': {
      type: 'landmark',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-colophon': {
      type: 'section',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-conclusion': {
      type: 'landmark',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-cover': {
      type: 'img',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-credit': {
      type: 'section',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-credits': {
      type: 'landmark',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-dedication': {
      type: 'section',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-endnote': {
      type: 'listitem',
      attributes: {
        allowed: ['aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize'],
      },
      owned: null,
      nameFrom: ['author'],
      context: ['doc-endnotes'],
    },
    'doc-endnotes': {
      type: 'landmark',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: ['doc-endnote'],
      nameFrom: ['author'],
      context: null,
    },
    'doc-epigraph': {
      type: 'section',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-epilogue': {
      type: 'landmark',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-errata': {
      type: 'landmark',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-example': {
      type: 'section',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-footnote': {
      type: 'section',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-foreword': {
      type: 'landmark',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-glossary': {
      type: 'landmark',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: ['term', 'definition'],
      nameFrom: ['author'],
      context: null,
    },
    'doc-glossref': {
      type: 'link',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author', 'contents'],
      context: null,
    },
    'doc-index': {
      type: 'navigation',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-introduction': {
      type: 'landmark',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-noteref': {
      type: 'link',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author', 'contents'],
      context: null,
    },
    'doc-notice': {
      type: 'note',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-pagebreak': {
      type: 'separator',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-pagelist': {
      type: 'navigation',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-part': {
      type: 'landmark',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-preface': {
      type: 'landmark',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-prologue': {
      type: 'landmark',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-pullquote': {
      type: 'none',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-qna': {
      type: 'section',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-subtitle': {
      type: 'sectionhead',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author', 'contents'],
      context: null,
    },
    'doc-tip': {
      type: 'note',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
    'doc-toc': {
      type: 'navigation',
      attributes: {
        allowed: ['aria-expanded'],
      },
      owned: null,
      nameFrom: ['author'],
      context: null,
    },
  };

  Object.assign(axe.commons.aria.lookupTable.role, dpubRoles);
}(window));
