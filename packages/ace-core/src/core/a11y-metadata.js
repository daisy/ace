'use strict';

// http://kb.daisy.org/publishing/docs/metadata/schema.org/index.html
// http://kb.daisy.org/publishing/docs/metadata/evaluation.html
// https://www.w3.org/wiki/WebSchemas/Accessibility

// https://www.w3.org/TR/2022/CRD-epub-a11y-11-20220607/#sec-disc-package

// https://www.w3.org/TR/2022/CRD-epub-a11y-11-20220607/#sec-conf-reporting-pub
// also "EPUB-A11Y-11_WCAG-20-A" or "EPUB-A11Y-11_WCAG-21-AA" etc.
const conformsToURLs = [
    "http://www.idpf.org/epub/a11y/accessibility-20170105.html#wcag-a",
    "http://www.idpf.org/epub/a11y/accessibility-20170105.html#wcag-aa",
    "http://www.idpf.org/epub/a11y/accessibility-20170105.html#wcag-aaa",
];
const conformsToStrings = [
    "EPUB Accessibility 1.1 - WCAG 2.0 Level A",
    "EPUB Accessibility 1.1 - WCAG 2.0 Level AA",
    "EPUB Accessibility 1.1 - WCAG 2.0 Level AAA",
    "EPUB Accessibility 1.1 - WCAG 2.1 Level A",
    "EPUB Accessibility 1.1 - WCAG 2.1 Level AA",
    "EPUB Accessibility 1.1 - WCAG 2.1 Level AAA",
];

const a11yMeta_links = [
    // https://www.w3.org/TR/2022/CRD-epub-a11y-11-20220607/#sec-evaluator-report
    "a11y:certifierReport", //(link in EPUB3)
];
const a11yMeta = [
    // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#accessMode
    // https://www.w3.org/TR/2022/NOTE-epub-a11y-tech-11-20220610/#meta-001
    "schema:accessMode", // required

    // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#accessibilityFeature
    // https://www.w3.org/TR/2022/NOTE-epub-a11y-tech-11-20220610/#meta-003
    "schema:accessibilityFeature", // required

    // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#accessibilityHazard
    // https://www.w3.org/TR/2022/NOTE-epub-a11y-tech-11-20220610/#meta-004
    "schema:accessibilityHazard", // required

    // https://www.w3.org/TR/2022/CRD-epub-a11y-11-20220908/#sec-disc-package
    // https://www.w3.org/TR/2022/NOTE-epub-a11y-tech-11-20220827/#meta-005
    "schema:accessibilitySummary", // recommended

    // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#accessModeSufficient
    // https://www.w3.org/TR/2022/NOTE-epub-a11y-tech-11-20220610/#meta-002
    "schema:accessModeSufficient", // recommended

    // http://kb.daisy.org/publishing/docs/metadata/schema.org/accessibilityAPI
    // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#accessibilityAPI
    // https://www.w3.org/TR/2022/NOTE-epub-a11y-tech-11-20220610/#meta-006
    "schema:accessibilityAPI", // discouraged

    // http://kb.daisy.org/publishing/docs/metadata/schema.org/accessibilityControl
    // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#accessibilityControl
    // https://www.w3.org/TR/2022/NOTE-epub-a11y-tech-11-20220610/#meta-007
    "schema:accessibilityControl", // discouraged

    // https://www.w3.org/TR/2022/CRD-epub-a11y-11-20220607/#sec-conf-reporting-eval
    "a11y:certifiedBy",

    // https://www.w3.org/TR/2022/CRD-epub-a11y-11-20220607/#sec-evaluator-credentials
    "a11y:certifierCredential", //(MAY BE link in EPUB3)

    // https://www.w3.org/TR/2022/CRD-epub-a11y-11-20220607/#sec-conf-reporting-pub
    "dcterms:conformsTo", //(MAY BE link in EPUB3)
].concat(a11yMeta_links);

const A11Y_META = {
    'schema:accessMode': {
        required: true,
        allowedValues: [
            // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#accessMode-vocabulary
            'auditory',
            'chartOnVisual',
            'chemOnVisual',
            'colorDependent',
            'diagramOnVisual',
            'mathOnVisual',
            'musicOnVisual',
            'tactile',
            'textOnVisual',
            'textual',
            'visual',
        ]
    },
    'schema:accessModeSufficient': {
        recommended: true,
        allowedValues: [
            // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#accessModeSufficient-vocabulary
            'auditory',
            'tactile',
            'textual',
            'visual',

            'chartOnVisual',
            'chemOnVisual',
            'colorDependent',
            'diagramOnVisual',
            'mathOnVisual',
            'musicOnVisual',
            'textOnVisual',
        ]
    },

    'schema:accessibilityAPI': {
        discouraged: true,
        allowedValues: [
            // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#accessibilityAPI-vocabulary
            'ARIA'
        ]
    },
    'schema:accessibilityControl': {
        discouraged: true,
        allowedValues: [
            // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#accessibilityControl-vocabulary
            'fullKeyboardControl',
            'fullMouseControl',
            'fullSwitchControl',
            'fullTouchControl',
            'fullVideoControl',            
            'fullVoiceControl',

            'fullAudioControl',
        ]
    },

    'schema:accessibilityFeature': {
        required: true,
        allowedValues: [
            // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#structure-and-navigation-terms
            'annotations',
            'ARIA',
            'bookmarks', // deprecated
            'index',
            'printPageNumbers',
            'readingOrder',
            'structuralNavigation',
            'tableOfContents',
            'taggedPDF',
            // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#adaptation-terms
            'alternativeText',            
            'audioDescription',
            'captions',
            'describedMath',
            'longDescription',
            'rubyAnnotations',
            'signLanguage',
            'transcript',
            // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#rendering-control-terms
            'displayTransformability',
            'displayTransformability/font-size',
            'displayTransformability/font-family',
            'displayTransformability/line-height',
            'displayTransformability/word-spacing',
            'displayTransformability/letter-spacing',
            'displayTransformability/color',
            'displayTransformability/background-color',
            'synchronizedAudioText',
            'timingControl',
            'unlocked',
            // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#specialized-markup-terms
            'ChemML',
            'latex',
            'MathML',
            'ttsMarkup',
            // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#clarity-terms
            'highContrastAudio',
            'highContrastAudio/noBackground',
            'highContrastAudio/reducedBackground',
            'highContrastAudio/switchableBackground',
            'highContrastDisplay',
            'largePrint',
            // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#tactile-terms
            'braille',
            'tactileGraphic',
            'tactileObject',
            // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#feature-none
            'none',
        ],
    },
    'schema:accessibilityHazard': {
        required: true,
        allowedValues: [
            // https://www.w3.org/2021/a11y-discov-vocab/latest/CG-FINAL-a11y-discov-vocab-20220610.html#accessibilityHazard-vocabulary
            'flashing',
            'noFlashingHazard',
            'motionSimulation',
            'noMotionSimulationHazard',
            'sound',
            'noSoundHazard',
            'unknown',
            'none',
        ]
    },
    'schema:accessibilitySummary': {
        // required: true,
        recommended: true, // https://github.com/daisy/ace/issues/378
    }
};

module.exports = {
    conformsToStrings,
    conformsToURLs,
    a11yMeta_links,
    a11yMeta,
    A11Y_META,
};
