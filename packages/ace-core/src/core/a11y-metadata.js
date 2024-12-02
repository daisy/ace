'use strict';

// http://kb.daisy.org/publishing/docs/metadata/schema.org/index.html
// http://kb.daisy.org/publishing/docs/metadata/evaluation.html
// https://www.w3.org/wiki/WebSchemas/Accessibility

// https://www.w3.org/TR/epub-a11y-11/#sec-disc-package

// https://www.w3.org/TR/epub-a11y-11/#sec-conf-reporting-pub
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
    "EPUB Accessibility 1.1 - WCAG 2.2 Level A",
    "EPUB Accessibility 1.1 - WCAG 2.2 Level AA",
    "EPUB Accessibility 1.1 - WCAG 2.2 Level AAA",
];

const a11yMeta_links = [
    // https://www.w3.org/TR/epub-a11y-11/#sec-evaluator-report
    // https://www.w3.org/TR/epub-a11y-11/#certifierReport
    "a11y:certifierReport", //(link in EPUB3)
];
const a11yMeta = [
    // http://kb.daisy.org/publishing/docs/metadata/schema.org/accessMode.html
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#accessMode
    // https://www.w3.org/TR/epub-a11y-tech-11/#meta-001
    "schema:accessMode", // required

    // http://kb.daisy.org/publishing/docs/metadata/schema.org/accessibilityFeature.html
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#accessibilityFeature
    // https://www.w3.org/TR/epub-a11y-tech-11/#meta-003
    "schema:accessibilityFeature", // required

    // http://kb.daisy.org/publishing/docs/metadata/schema.org/accessibilityHazard.html
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#accessibilityHazard
    // https://www.w3.org/TR/epub-a11y-tech-11/#meta-004
    "schema:accessibilityHazard", // required

    // http://kb.daisy.org/publishing/docs/metadata/schema.org/accessibilitySummary.html
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#accessibilitySummary
    // https://www.w3.org/TR/epub-a11y-tech-11/#meta-005
    "schema:accessibilitySummary", // recommended

    // http://kb.daisy.org/publishing/docs/metadata/schema.org/accessModeSufficient.html
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#accessModeSufficient
    // https://www.w3.org/TR/epub-a11y-tech-11/#meta-002
    "schema:accessModeSufficient", // recommended

    // http://kb.daisy.org/publishing/docs/metadata/schema.org/accessibilityAPI
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#accessibilityAPI
    "schema:accessibilityAPI", // discouraged

    // http://kb.daisy.org/publishing/docs/metadata/schema.org/accessibilityControl
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#accessibilityControl
    "schema:accessibilityControl", // discouraged

    // https://www.w3.org/TR/epub-a11y-11/#sec-evaluator-name
    // https://www.w3.org/TR/epub-a11y-11/#certifiedBy
    "a11y:certifiedBy",

    // https://www.w3.org/TR/epub-a11y-11/#sec-evaluator-credentials
    // https://www.w3.org/TR/epub-a11y-11/#certifierCredential
    "a11y:certifierCredential", //(MAY BE link in EPUB3)

    // https://www.w3.org/TR/epub-a11y-11/#sec-conf-reporting-pub
    "dcterms:conformsTo", //(MAY BE link in EPUB3)
].concat(a11yMeta_links);

const A11Y_META = {
    'schema:accessMode': {
        required: true,
        allowedValues: [
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#accessMode-vocabulary
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
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#accessModeSufficient-vocabulary
            'auditory',
            'tactile',
            'textual',
            'visual',

            // 'chartOnVisual',
            // 'chemOnVisual',
            // 'colorDependent',
            // 'diagramOnVisual',
            // 'mathOnVisual',
            // 'musicOnVisual',
            // 'textOnVisual',
        ]
    },

    'schema:accessibilityAPI': {
        discouraged: true,
        allowedValues: [
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#accessibilityAPI-vocabulary
            'AndroidAccessibility',
            'ARIA', // deprecated => accessibilityFeature
            'ATK',
            'AT-SPI',
            // 'BlackberryAccessibility', // obsolete
            'FuchsiaAccessibility',
            'iAccessible2',
            'iOSAccessibility', // deprecated => NSAccessibility
            'JavaAccessibility',
            'MacOSXAccessibility', // deprecated => UIAccessibility
            'MSAA',
            'NSAccessibility',
            'UIAccessibility',
            'UIAutomation'
        ]
    },
    'schema:accessibilityControl': {
        discouraged: true,
        allowedValues: [
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#accessibilityControl-vocabulary
            'fullKeyboardControl',
            'fullMouseControl',
            'fullSwitchControl',
            'fullTouchControl',
            'fullVideoControl',
            'fullVoiceControl',
            // 'fullAudioControl',
        ]
    },

    'schema:accessibilityFeature': {
        required: true,
        allowedValues: [
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#accessibilityFeature-vocabulary
            // ----
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#structure-and-navigation-terms
            'annotations',
            'ARIA',
            'bookmarks', // deprecated
            'index',
            'printPageNumbers', // not deprecated (yet), synonym to pageBreakMarkers
            'pageBreakMarkers',
            'pageNavigation',
            'readingOrder',
            'structuralNavigation',
            'tableOfContents',
            'taggedPDF',
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#adaptation-terms
            'alternativeText',
            'audioDescription',
            'captions', // deprecated => closedCaptions, openCaptions
            'closedCaptions',
            'describedMath',
            'longDescription',
            'openCaptions',
            'rubyAnnotations',
            'signLanguage',
            'transcript',
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#rendering-control-terms
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
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#specialized-markup-terms
            'ChemML',
            'latex',
            'MathML',
            'ttsMarkup',
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#clarity-terms
            'highContrastAudio',
            'highContrastAudio/noBackground',
            'highContrastAudio/reducedBackground',
            'highContrastAudio/switchableBackground',
            'highContrastDisplay',
            'largePrint',
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#tactile-terms
            'braille',
            'tactileGraphic',
            'tactileObject',
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#feature-none
            'none',
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#feature-unknown
            'unknown'
        ],
    },
    'schema:accessibilityHazard': {
        required: true,
        allowedValues: [
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#accessibilityHazard-vocabulary
            'flashing',
            'noFlashingHazard', 'unknownFlashingHazard',
            'motionSimulation',
            'noMotionSimulationHazard', 'unknownMotionSimultationHazard',
            'sound',
            'noSoundHazard', 'unknownSoundHazard',
            'unknown',
            'none',
        ]
    },
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20230523/#accessibilitySummary
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
