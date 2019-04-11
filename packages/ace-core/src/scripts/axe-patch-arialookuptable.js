'use strict';

(function axePatch(window) {
  const axe = window.axe;
  const dpubRoles = {
    // ROMAIN DELTOUR original PR:
    // https://github.com/dequelabs/axe-core/pull/584
    // (now in axe-core, but with some changes ... see details below)
    //
    // ==================================
    // 'doc-abstract': {
    //   type: 'section',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-abstract': {
    //   type: 'section',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   nameFrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-acknowledgments': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-acknowledgments': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   nameFrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-afterword': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-afterword': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   nameFrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-appendix': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-appendix': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   nameFrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-backlink': {
    //   type: 'link',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author', 'contents'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-backlink': {
    //   type: 'link',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   nameFrom: [ 'author', 'contents' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ {
    //     nodeName: 'a',
    //     attributes: {
    //       href: isNotNull
    //     }
    //   } ]
    // },
    // ==================================
    // 'doc-biblioentry': {
    //   type: 'listitem',
    //   attributes: {
    //     allowed: ['aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: ['doc-bibliography'],
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-biblioentry': {
    //   type: 'listitem',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   nameFrom: [ 'author' ],
    //   context: [ 'doc-bibliography' ],
    //   unsupported: false,
    //   allowedElements: [ 'li' ]
    // },
    // ==================================
    // 'doc-bibliography': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-bibliography': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   nameFrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-biblioref': {
    //   type: 'link',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author', 'contents'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-biblioref': {
    //   type: 'link',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   nameFrom: [ 'author', 'contents' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ {
    //     nodeName: 'a',
    //     attributes: {
    //       href: isNotNull
    //     }
    //   } ]
    // },
    // ==================================
    // 'doc-chapter': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-chapter': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-colophon': {
    //   type: 'section',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-colophon': {
    //   type: 'section',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-conclusion': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-conclusion': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-cover': {
    //   type: 'img',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-cover': {
    //   type: 'img',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false
    // },
    // ==================================
    // 'doc-credit': {
    //   type: 'section',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-credit': {
    //   type: 'section',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-credits': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-credits': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-dedication': {
    //   type: 'section',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-dedication': {
    //   type: 'section',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-endnote': {
    //   type: 'listitem',
    //   attributes: {
    //     allowed: ['aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: ['doc-endnotes'],
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-endnote': {
    //   type: 'listitem',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-level', 'aria-posinset', 'aria-setsize', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: [ 'doc-endnotes' ],
    //   unsupported: false,
    //   allowedElements: [ 'li' ]
    // },
    // ==================================
    // 'doc-endnotes': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: ['doc-endnote'],
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-endnotes': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: [ 'doc-endnote' ],
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-epigraph': {
    //   type: 'section',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-epigraph': {
    //   type: 'section',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false
    // },
    // ==================================
    // 'doc-epilogue': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-epilogue': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-errata': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-errata': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-example': {
    //   type: 'section',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-example': {
    //   type: 'section',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'aside', 'section' ]
    // },
    // ==================================
    // 'doc-footnote': {
    //   type: 'section',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-footnote': {
    //   type: 'section',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'aside', 'footer', 'header' ]
    // },
    // ==================================
    // 'doc-foreword': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-foreword': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-glossary': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: ['term', 'definition'],
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-glossary': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: [ 'term', 'definition' ],
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'dl' ]
    // },
    // ==================================
    // 'doc-glossref': {
    //   type: 'link',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author', 'contents'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-glossref': {
    //   type: 'link',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author', 'contents' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ {
    //     nodeName: 'a',
    //     attributes: {
    //       href: isNotNull
    //     }
    //   } ]
    // },
    // ==================================
    // 'doc-index': {
    //   type: 'navigation',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-index': {
    //   type: 'navigation',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'nav', 'section' ]
    // },
    // ==================================
    // 'doc-introduction': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-introduction': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-noteref': {
    //   type: 'link',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author', 'contents'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-noteref': {
    //   type: 'link',
    //   attributes: {
    //     allowed: [ 'aria-expanded' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author', 'contents' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ {
    //     nodeName: 'a',
    //     attributes: {
    //       href: isNotNull
    //     }
    //   } ]
    // },
    // ==================================
    // 'doc-notice': {
    //   type: 'note',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-notice': {
    //   type: 'note',
    //   attributes: {
    //     allowed: [ 'aria-expanded' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-pagebreak': {
    //   type: 'separator',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-pagebreak': {
    //   type: 'separator',
    //   attributes: {
    //     allowed: [ 'aria-expanded' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'hr' ]
    // },
    // ==================================
    // 'doc-pagelist': {
    //   type: 'navigation',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-pagelist': {
    //   type: 'navigation',
    //   attributes: {
    //     allowed: [ 'aria-expanded' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'nav', 'section' ]
    // },
    // ==================================
    // 'doc-part': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-part': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: [ 'aria-expanded' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-preface': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-preface': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: [ 'aria-expanded' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-prologue': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-prologue': {
    //   type: 'landmark',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-pullquote': {
    //   type: 'none',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-pullquote': {
    //   type: 'none',
    //   attributes: {
    //     allowed: [ 'aria-expanded' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'aside', 'section' ]
    // },
    // ==================================
    // 'doc-qna': {
    //   type: 'section',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-qna': {
    //   type: 'section',
    //   attributes: {
    //     allowed: [ 'aria-expanded' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'section' ]
    // },
    // ==================================
    // 'doc-subtitle': {
    //   type: 'sectionhead',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author', 'contents'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-subtitle': {
    //   type: 'sectionhead',
    //   attributes: {
    //     allowed: [ 'aria-expanded' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: {
    //     nodeName: [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ]
    //   }
    // },
    // ==================================
    // 'doc-tip': {
    //   type: 'note',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-tip': {
    //   type: 'note',
    //   attributes: {
    //     allowed: [ 'aria-expanded' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'aside' ]
    // },
    // ==================================
    // 'doc-toc': {
    //   type: 'navigation',
    //   attributes: {
    //     allowed: ['aria-expanded'],
    //   },
    //   owned: null,
    //   nameFrom: ['author'],
    //   context: null,
    // },
    // -----------------------
    // NOW IN AXE CORE:
    // -----------------------
    // 'doc-toc': {
    //   type: 'navigation',
    //   attributes: {
    //     allowed: [ 'aria-expanded', 'aria-errormessage' ]
    //   },
    //   owned: null,
    //   namefrom: [ 'author' ],
    //   context: null,
    //   unsupported: false,
    //   allowedElements: [ 'nav', 'section' ]
    // },
    // ==================================
  };

  Object.assign(axe.commons.aria.lookupTable.role, dpubRoles);
}(window));
