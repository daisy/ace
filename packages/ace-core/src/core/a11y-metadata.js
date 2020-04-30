'use strict';

// http://kb.daisy.org/publishing/docs/metadata/schema-org.html
// http://kb.daisy.org/publishing/docs/metadata/evaluation.html
// https://www.w3.org/wiki/WebSchemas/Accessibility

const conformsToURLs = [
    "http://www.idpf.org/epub/a11y/accessibility-20170105.html#wcag-a",
    "http://www.idpf.org/epub/a11y/accessibility-20170105.html#wcag-aa",
    "http://www.idpf.org/epub/a11y/accessibility-20170105.html#wcag-aaa",
];

const a11yMeta_links = [
    "a11y:certifierReport", //(link in EPUB3)
    "dcterms:conformsTo", //(link in EPUB3)
];
const a11yMeta = [
    "schema:accessMode", // required
    "schema:accessibilityFeature", // required
    "schema:accessibilityHazard", // required
    "schema:accessibilitySummary", // required
    "schema:accessModeSufficient", // recommended
    "schema:accessibilityAPI", // optional
    "schema:accessibilityControl", // optional

    "a11y:certifiedBy",
    "a11y:certifierCredential", //(MAY BE link in EPUB3)
].concat(a11yMeta_links);

const A11Y_META = {
    'schema:accessMode': {
        required: true,
        allowedValues: [
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
    'schema:accessModeSufficient': {
        recommended: true,
        allowedValues: [
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
        allowedValues: [
            'ARIA'
        ]
    },
    'schema:accessibilityControl': {
        allowedValues: [
            'fullKeyboardControl',
            'fullMouseControl',
            'fullSwitchControl',
            'fullTouchControl',
            'fullVideoControl',
            'fullAudioControl',
            'fullVoiceControl',
        ]
    },
    'schema:accessibilityFeature': {
        required: true,
        allowedValues: [
            'alternativeText',
            'annotations',
            'audioDescription',
            'bookmarks',
            'braille',
            'captions',
            'ChemML',
            'describedMath',
            'displayTransformability',
            'displayTransformability/font-size',
            'displayTransformability/font-family',
            'displayTransformability/line-height',
            'displayTransformability/word-spacing',
            'displayTransformability/letter-spacing',
            'displayTransformability/color',
            'displayTransformability/background-color',
            'highContrastAudio',
            'highContrastAudio/noBackground',
            'highContrastAudio/reducedBackground',
            'highContrastAudio/switchableBackground',
            'highContrastDisplay',
            'index',
            'largePrint',
            'latex',
            'longDescription',
            'MathML',
            'none',
            'printPageNumbers',
            'readingOrder',
            'rubyAnnotations',
            'signLanguage',
            'structuralNavigation',
            'synchronizedAudioText',
            'tableOfContents',
            'taggedPDF',
            'tactileGraphic',
            'tactileObject',
            'timingControl',
            'transcript',
            'ttsMarkup',
            'unlocked',
        ],
    },
    'schema:accessibilityHazard': {
        required: true,
        allowedValues: [
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
        required: true,
    }
};

module.exports = {
    conformsToURLs,
    a11yMeta_links,
    a11yMeta,
    A11Y_META,
};
