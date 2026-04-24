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
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#accessMode
    // https://www.w3.org/TR/epub-a11y-tech-11/#meta-001
    "schema:accessMode", // required

    // http://kb.daisy.org/publishing/docs/metadata/schema.org/accessibilityFeature.html
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#accessibilityFeature
    // https://www.w3.org/TR/epub-a11y-tech-11/#meta-003
    "schema:accessibilityFeature", // required

    // http://kb.daisy.org/publishing/docs/metadata/schema.org/accessibilityHazard.html
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#accessibilityHazard
    // https://www.w3.org/TR/epub-a11y-tech-11/#meta-004
    "schema:accessibilityHazard", // required

    // http://kb.daisy.org/publishing/docs/metadata/schema.org/accessibilitySummary.html
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#accessibilitySummary
    // https://www.w3.org/TR/epub-a11y-tech-11/#meta-005
    "schema:accessibilitySummary", // recommended

    // http://kb.daisy.org/publishing/docs/metadata/schema.org/accessModeSufficient.html
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#accessModeSufficient
    // https://www.w3.org/TR/epub-a11y-tech-11/#meta-002
    "schema:accessModeSufficient", // recommended

    // http://kb.daisy.org/publishing/docs/metadata/schema.org/accessibilityAPI
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#accessibilityAPI
    "schema:accessibilityAPI", // discouraged

    // http://kb.daisy.org/publishing/docs/metadata/schema.org/accessibilityControl
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#accessibilityControl
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
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#accessibilityAPI-vocabulary
    'schema:accessibilityAPI': {
        discouraged: true,
        allowedValues: [
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

    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#accessibilityControl-vocabulary
    'schema:accessibilityControl': {
        discouraged: true,
        allowedValues: [
            'fullKeyboardControl',
            'fullMouseControl',
            'fullSwitchControl',
            'fullTouchControl',
            'fullVideoControl',
            'fullVoiceControl',
            // 'fullAudioControl',
        ]
    },

    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#accessibilityFeature-vocabulary
    'schema:accessibilityFeature': {
        required: true,
        allowedValues: [
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#structure-and-navigation-terms
            'annotations', // deprecated
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
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#adaptation-terms
            'alternativeText',
            'audioDescription',
            'captions', // deprecated => closedCaptions, openCaptions
            'closedCaptions',
            'describedMath',
            'longDescription',
            'openCaptions',
            // 'rubyAnnotations', ==> internationalization-terms
            'signLanguage',
            'transcript',
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#rendering-control-terms
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
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#specialized-markup-terms
            'ChemML',
            'latex',
            'latex-chemistry',
            'MathML',
            'MathML-chemistry',
            'ttsMarkup',
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#clarity-terms
            'highContrastAudio',
            'highContrastAudio/noBackground',
            'highContrastAudio/reducedBackground',
            'highContrastAudio/switchableBackground',
            'highContrastDisplay',
            'largePrint',
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#tactile-terms
            'braille',
            'tactileGraphic',
            'tactileObject',
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#internationalization-terms
            'fullRubyAnnotations',
            'horizontalWriting',
            'rubyAnnotations',
            'verticalWriting',
            'withAdditionalWordSegmentation',
            'withoutAdditionalWordSegmentation',
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#feature-none
            'none',
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#feature-unknown
            'unknown'
        ],
    },

    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#accessibilityHazard-vocabulary
    'schema:accessibilityHazard': {
        required: true,
        allowedValues: [
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#hazards
            'flashing',
            'motionSimulation',
            'sound',
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#no-hazards
            'none',
            'noFlashingHazard',
            'noMotionSimulationHazard',
            'noSoundHazard',
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#unknown-hazards
            'unknown',
            'unknownFlashingHazard',
            'unknownMotionSimultationHazard',
            'unknownSoundHazard'
        ]
    },
    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#accessibilitySummary
    'schema:accessibilitySummary': {
        // required: true,
        recommended: true, // https://github.com/daisy/ace/issues/378
    },

    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#accessMode-vocabulary
    'schema:accessMode': {
        required: true,
        allowedValues: [
            'auditory',
            'tactile',
            'textual',
            'visual',
            // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#accessMode-visuals
            'chartOnVisual',
            'chemOnVisual',
            'colorDependent',
            'diagramOnVisual',
            'mathOnVisual',
            'musicOnVisual',
            'textOnVisual'
        ]
    },

    // https://www.w3.org/community/reports/a11y-discov-vocab/CG-FINAL-vocabulary-20260326/#accessModeSufficient-vocabulary
    'schema:accessModeSufficient': {
        recommended: true,
        allowedValues: [
            'auditory',
            'tactile',
            'textual',
            'visual'
        ]
    },
};

module.exports = {
    conformsToStrings,
    conformsToURLs,
    a11yMeta_links,
    a11yMeta,
    A11Y_META,
};
