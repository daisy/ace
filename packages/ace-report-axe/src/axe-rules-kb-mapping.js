const { localize } = require('./l10n/localize').localizer;

const kbMap = {
  'baseUrl': 'http://kb.daisy.org/publishing/',
  'map': {
    // {
    //   "ruleId": "accesskeys",
    //   "description": "Ensure every accesskey attribute value is unique",
    //   "help": "accesskey attribute value should be unique",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/accesskeys?application=axeAPI",
    //   "tags": [
    //     "cat.keyboard",
    //     "best-practice"
    //   ]
    // }
    'accesskeys': {url: 'docs/html/accesskeys.html', title: localize("kb.accesskeys")},

    // {
    //   "ruleId": "area-alt",
    //   "description": "Ensure <area> elements of image maps have alternative text",
    //   "help": "Active <area> elements must have alternative text",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/area-alt?application=axeAPI",
    //   "tags": [
    //     "cat.text-alternatives",
    //     "wcag2a",
    //     "wcag244",
    //     "wcag412",
    //     "section508",
    //     "section508.22.a",
    //     "TTv5",
    //     "TT6.a",
    //     "EN-301-549",
    //     "EN-9.2.4.4",
    //     "EN-9.4.1.2",
    //     "ACT"
    //   ],
    //   "actIds": [
    //     "c487ae"
    //   ]
    // },
    'area-alt': {url: 'docs/html/maps.html', title: localize("kb.area-alt")},

    // {
    //   "ruleId": "aria-allowed-attr",
    //   "description": "Ensure an element's role supports its ARIA attributes",
    //   "help": "Elements must only use supported ARIA attributes",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-allowed-attr?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "wcag2a",
    //     "wcag412",
    //     "EN-301-549",
    //     "EN-9.4.1.2"
    //   ],
    //   "actIds": [
    //     "5c01ea"
    //   ]
    // },
    'aria-allowed-attr': {url: 'docs/html/roles.html', title: localize("kb.aria-allowed-attr")},

    // {
    //   "ruleId": "aria-allowed-role",
    //   "description": "Ensure role attribute has an appropriate value for the element",
    //   "help": "ARIA role should be appropriate for the element",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-allowed-role?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "best-practice"
    //   ]
    // },
    'aria-allowed-role': {url: 'docs/html/roles.html', title: localize("kb.aria-allowed-attr")},

    // {
    //   "ruleId": "aria-braille-equivalent",
    //   "description": "Ensure aria-braillelabel and aria-brailleroledescription have a non-braille equivalent",
    //   "help": "aria-braille attributes must have a non-braille equivalent",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-braille-equivalent?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "wcag2a",
    //     "wcag412",
    //     "EN-301-549",
    //     "EN-9.4.1.2"
    //   ]
    // },
    'aria-braille-equivalent': {url: 'docs/script/aria.html', title: localize("kb.button-name")},

    // {
    //   "ruleId": "aria-command-name",
    //   "description": "Ensure every ARIA button, link and menuitem has an accessible name",
    //   "help": "ARIA commands must have an accessible name",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-command-name?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "wcag2a",
    //     "wcag412",
    //     "TTv5",
    //     "TT6.a",
    //     "EN-301-549",
    //     "EN-9.4.1.2",
    //     "ACT"
    //   ],
    //   "actIds": [
    //     "97a4e1"
    //   ]
    // },
    'aria-command-name': {url: 'docs/script/aria.html', title: localize("kb.button-name")},

    // {
    //   "ruleId": "aria-conditional-attr",
    //   "description": "Ensure ARIA attributes are used as described in the specification of the element's role",
    //   "help": "ARIA attributes must be used as specified for the element's role",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-conditional-attr?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "wcag2a",
    //     "wcag412",
    //     "EN-301-549",
    //     "EN-9.4.1.2"
    //   ],
    //   "actIds": [
    //     "5c01ea"
    //   ]
    // },
    'aria-conditional-attr': {url: 'docs/script/aria.html', title: localize("kb.button-name")},

    // {
    //   "ruleId": "aria-deprecated-role",
    //   "description": "Ensure elements do not use deprecated roles",
    //   "help": "Deprecated ARIA roles must not be used",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-deprecated-role?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "wcag2a",
    //     "wcag412",
    //     "EN-301-549",
    //     "EN-9.4.1.2"
    //   ],
    //   "actIds": [
    //     "674b10"
    //   ]
    // },
    'aria-deprecated-role': {url: 'docs/script/aria.html', title: localize("kb.button-name")},

    // {
    //   "ruleId": "aria-dialog-name",
    //   "description": "Ensure every ARIA dialog and alertdialog node has an accessible name",
    //   "help": "ARIA dialog and alertdialog nodes should have an accessible name",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-dialog-name?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "best-practice"
    //   ]
    // },
    'aria-dialog-name': {url: 'docs/script/aria.html', title: localize("kb.button-name")},

    // {
    //     "ruleId": "aria-hidden-body",
    //     "description": "Ensure aria-hidden=\"true\" is not present on the document body.",
    //     "help": "aria-hidden=\"true\" must not be present on the document body",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-hidden-body?application=axeAPI",
    //     "tags": [
    //       "cat.aria",
    //       "wcag2a",
    //       "wcag131",
    //       "wcag412",
    //       "EN-301-549",
    //       "EN-9.1.3.1",
    //       "EN-9.4.1.2"
    //     ]
    //   },
    'aria-hidden-body': {url: 'docs/script/aria.html', title: localize("kb.aria-hidden-body")},

    // {
    //     "ruleId": "aria-hidden-focus",
    //     "description": "Ensure aria-hidden elements are not focusable nor contain focusable elements",
    //     "help": "ARIA hidden element must not be focusable or contain focusable elements",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-hidden-focus?application=axeAPI",
    //     "tags": [
    //       "cat.name-role-value",
    //       "wcag2a",
    //       "wcag412",
    //       "TTv5",
    //       "TT6.a",
    //       "EN-301-549",
    //       "EN-9.4.1.2"
    //     ],
    //     "actIds": [
    //       "6cfa84"
    //     ]
    //   },
    'aria-hidden-focus': {url: 'docs/script/aria.html', title: localize("kb.aria-hidden-body")},

    // {
    //     "ruleId": "aria-input-field-name",
    //     "description": "Ensure every ARIA input field has an accessible name",
    //     "help": "ARIA input fields must have an accessible name",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-input-field-name?application=axeAPI",
    //     "tags": [
    //       "cat.aria",
    //       "wcag2a",
    //       "wcag412",
    //       "TTv5",
    //       "TT5.c",
    //       "EN-301-549",
    //       "EN-9.4.1.2",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "e086e5"
    //     ]
    //   },
    'aria-input-field-name': {url: 'docs/script/aria.html', title: localize("kb.aria-hidden-body")},

    // {
    //     "ruleId": "aria-meter-name",
    //     "description": "Ensure every ARIA meter node has an accessible name",
    //     "help": "ARIA meter nodes must have an accessible name",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-meter-name?application=axeAPI",
    //     "tags": [
    //       "cat.aria",
    //       "wcag2a",
    //       "wcag111",
    //       "EN-301-549",
    //       "EN-9.1.1.1"
    //     ]
    //   },
    'aria-meter-name': {url: 'docs/script/aria.html', title: localize("kb.button-name")},

    // {
    //     "ruleId": "aria-progressbar-name",
    //     "description": "Ensure every ARIA progressbar node has an accessible name",
    //     "help": "ARIA progressbar nodes must have an accessible name",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-progressbar-name?application=axeAPI",
    //     "tags": [
    //       "cat.aria",
    //       "wcag2a",
    //       "wcag111",
    //       "EN-301-549",
    //       "EN-9.1.1.1"
    //     ]
    //   },
    'aria-progressbar-name': {url: 'docs/script/aria.html', title: localize("kb.button-name")},

    // {
    //   "ruleId": "aria-prohibited-attr",
    //   "description": "Ensure ARIA attributes are not prohibited for an element's role",
    //   "help": "Elements must only use permitted ARIA attributes",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-prohibited-attr?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "wcag2a",
    //     "wcag412",
    //     "EN-301-549",
    //     "EN-9.4.1.2"
    //   ],
    //   "actIds": [
    //     "5c01ea"
    //   ]
    // },
    'aria-prohibited-attr': {url: 'docs/html/roles.html', title: localize("kb.aria-required-attr")},

    // {
    //   "ruleId": "aria-required-attr",
    //   "description": "Ensure elements with ARIA roles have all required ARIA attributes",
    //   "help": "Required ARIA attributes must be provided",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-required-attr?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "wcag2a",
    //     "wcag412",
    //     "EN-301-549",
    //     "EN-9.4.1.2"
    //   ],
    //   "actIds": [
    //     "4e8ab6"
    //   ]
    // },
    'aria-required-attr': {url: 'docs/html/roles.html', title: localize("kb.aria-required-attr")},

    // {
    //   "ruleId": "aria-required-children",
    //   "description": "Ensure elements with an ARIA role that require child roles contain them",
    //   "help": "Certain ARIA roles must contain particular children",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-required-children?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "wcag2a",
    //     "wcag131",
    //     "EN-301-549",
    //     "EN-9.1.3.1"
    //   ],
    //   "actIds": [
    //     "bc4a75",
    //     "ff89c9"
    //   ]
    // },
    'aria-required-children': {url: 'docs/html/roles.html', title: localize("kb.aria-required-children")},

    // {
    //   "ruleId": "aria-required-parent",
    //   "description": "Ensure elements with an ARIA role that require parent roles are contained by them",
    //   "help": "Certain ARIA roles must be contained by particular parents",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-required-parent?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "wcag2a",
    //     "wcag131",
    //     "EN-301-549",
    //     "EN-9.1.3.1"
    //   ],
    //   "actIds": [
    //     "ff89c9"
    //   ]
    // },
    'aria-required-parent': {url: 'docs/html/roles.html', title: localize("kb.aria-required-parent")},

    // {
    //   "ruleId": "aria-roledescription",
    //   "description": "Ensure aria-roledescription is only used on elements with an implicit or explicit role",
    //   "help": "aria-roledescription must be on elements with a semantic role",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-roledescription?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "wcag2a",
    //     "wcag412",
    //     "EN-301-549",
    //     "EN-9.4.1.2",
    //     "deprecated"
    //   ]
    // },
    'aria-roledescription': {url: 'docs/html/roles.html', title: localize("kb.aria-required-parent")},

    // {
    //   "ruleId": "aria-roles",
    //   "description": "Ensure all elements with a role attribute use a valid value",
    //   "help": "ARIA roles used must conform to valid values",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-roles?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "wcag2a",
    //     "wcag412",
    //     "EN-301-549",
    //     "EN-9.4.1.2"
    //   ],
    //   "actIds": [
    //     "674b10"
    //   ]
    // },
    'aria-roles': {url: 'docs/html/roles.html', title: localize("kb.aria-roles")},

    // {
    //   "ruleId": "aria-text",
    //   "description": "Ensure role=\"text\" is used on elements with no focusable descendants",
    //   "help": "\"role=text\" should have no focusable descendants",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-text?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "best-practice"
    //   ]
    // },
    'aria-roles': {url: 'docs/html/roles.html', title: localize("kb.aria-roles")},

    // {
    //   "ruleId": "aria-toggle-field-name",
    //   "description": "Ensure every ARIA toggle field has an accessible name",
    //   "help": "ARIA toggle fields must have an accessible name",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-toggle-field-name?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "wcag2a",
    //     "wcag412",
    //     "TTv5",
    //     "TT5.c",
    //     "EN-301-549",
    //     "EN-9.4.1.2",
    //     "ACT"
    //   ],
    //   "actIds": [
    //     "e086e5"
    //   ]
    // },
    'aria-toggle-field-name': {url: 'docs/script/aria.html', title: localize("kb.aria-roles")},

    // {
    //   "ruleId": "aria-tooltip-name",
    //   "description": "Ensure every ARIA tooltip node has an accessible name",
    //   "help": "ARIA tooltip nodes must have an accessible name",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-tooltip-name?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "wcag2a",
    //     "wcag412",
    //     "EN-301-549",
    //     "EN-9.4.1.2"
    //   ]
    // },
    'aria-tooltip-name': {url: 'docs/script/aria.html', title: localize("kb.button-name")},

    // {
    //     "ruleId": "aria-treeitem-name",
    //     "description": "Ensure every ARIA treeitem node has an accessible name",
    //     "help": "ARIA treeitem nodes should have an accessible name",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-treeitem-name?application=axeAPI",
    //     "tags": [
    //       "cat.aria",
    //       "best-practice"
    //     ]
    //   },
    'aria-treeitem-name': {url: 'docs/script/aria.html', title: localize("kb.button-name")},

    // {
    //   "ruleId": "aria-valid-attr-value",
    //   "description": "Ensure all ARIA attributes have valid values",
    //   "help": "ARIA attributes must conform to valid values",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr-value?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "wcag2a",
    //     "wcag412",
    //     "EN-301-549",
    //     "EN-9.4.1.2"
    //   ],
    //   "actIds": [
    //     "6a7281"
    //   ]
    // },
    'aria-valid-attr-value': {url: 'docs/script/aria.html', title: localize("kb.aria-valid-attr-value")},

    // {
    //     "ruleId": "aria-valid-attr",
    //     "description": "Ensure attributes that begin with aria- are valid ARIA attributes",
    //     "help": "ARIA attributes must conform to valid names",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr?application=axeAPI",
    //     "tags": [
    //       "cat.aria",
    //       "wcag2a",
    //       "wcag412",
    //       "EN-301-549",
    //       "EN-9.4.1.2"
    //     ],
    //     "actIds": [
    //       "5f99a7"
    //     ]
    //   },
    'aria-valid-attr': {url: 'docs/script/aria.html', title: localize("kb.aria-valid-attr")},

    // {
    //     "ruleId": "audio-caption",
    //     "description": "Ensure <audio> elements have captions",
    //     "help": "<audio> elements must have a captions track",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/audio-caption?application=axeAPI",
    //     "tags": [
    //       "cat.time-and-media",
    //       "wcag2a",
    //       "wcag121",
    //       "EN-301-549",
    //       "EN-9.1.2.1",
    //       "section508",
    //       "section508.22.a",
    //       "deprecated"
    //     ],
    //     "actIds": [
    //       "2eb176",
    //       "afb423"
    //     ]
    //   },
    'audio-caption': {url: 'docs/html/audio.html', title: localize("kb.audio-caption")},

    // {
    //     "ruleId": "autocomplete-valid",
    //     "description": "Ensure the autocomplete attribute is correct and suitable for the form field",
    //     "help": "autocomplete attribute must be used correctly",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/autocomplete-valid?application=axeAPI",
    //     "tags": [
    //       "cat.forms",
    //       "wcag21aa",
    //       "wcag135",
    //       "EN-301-549",
    //       "EN-9.1.3.5",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "73f2c2"
    //     ]
    //   },
    'autocomplete-valid': {url: 'docs/html/forms.html', title: localize("kb.button-name")},

    // {
    //   "ruleId": "avoid-inline-spacing",
    //   "description": "Ensure that text spacing set through style attributes can be adjusted with custom stylesheets",
    //   "help": "Inline text spacing must be adjustable with custom stylesheets",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/avoid-inline-spacing?application=axeAPI",
    //   "tags": [
    //     "cat.structure",
    //     "wcag21aa",
    //     "wcag1412",
    //     "EN-301-549",
    //     "EN-9.1.4.12",
    //     "ACT"
    //   ],
    //   "actIds": [
    //     "24afc2",
    //     "9e45ec",
    //     "78fd32"
    //   ]
    // },
    'avoid-inline-spacing': {url: 'docs/html/separation.html', title: localize("kb.style")},

    // {
    //   "ruleId": "blink",
    //   "description": "Ensure <blink> elements are not used",
    //   "help": "<blink> elements are deprecated and must not be used",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/blink?application=axeAPI",
    //   "tags": [
    //     "cat.time-and-media",
    //     "wcag2a",
    //     "wcag222",
    //     "section508",
    //     "section508.22.j",
    //     "TTv5",
    //     "TT2.b",
    //     "EN-301-549",
    //     "EN-9.2.2.2"
    //   ]
    // },
    'blink': {url: 'docs/html/separation.html', title: localize("kb.style")},

    // {
    //     "ruleId": "button-name",
    //     "description": "Ensure buttons have discernible text",
    //     "help": "Buttons must have discernible text",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/button-name?application=axeAPI",
    //     "tags": [
    //       "cat.name-role-value",
    //       "wcag2a",
    //       "wcag412",
    //       "section508",
    //       "section508.22.a",
    //       "TTv5",
    //       "TT6.a",
    //       "EN-301-549",
    //       "EN-9.4.1.2",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "97a4e1",
    //       "m6b1q3"
    //     ]
    //   },
    'button-name': {url: 'docs/html/forms.html', title: localize("kb.button-name")},

    // {
    //     "ruleId": "bypass",
    //     "description": "Ensure each page has at least one mechanism for a user to bypass navigation and jump straight to the content",
    //     "help": "Page must have means to bypass repeated blocks",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/bypass?application=axeAPI",
    //     "tags": [
    //       "cat.keyboard",
    //       "wcag2a",
    //       "wcag241",
    //       "section508",
    //       "section508.22.o",
    //       "TTv5",
    //       "TT9.a",
    //       "EN-301-549",
    //       "EN-9.2.4.1"
    //     ],
    //     "actIds": [
    //       "cf77f2",
    //       "047fe0",
    //       "b40fd1",
    //       "3e12e1",
    //       "ye5d6e"
    //     ]
    //   },
    'bypass': {url: 'docs/html/sections.html', title: localize("kb.link-name")},

    // {
    //     "ruleId": "color-contrast-enhanced",
    //     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AAA enhanced contrast ratio thresholds",
    //     "help": "Elements must meet enhanced color contrast ratio thresholds",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/color-contrast-enhanced?application=axeAPI",
    //     "tags": [
    //       "cat.color",
    //       "wcag2aaa",
    //       "wcag146",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "09o5cg"
    //     ]
    //   },
    'color-contrast-enhanced': {url: 'docs/css/color.html', title: localize("kb.color-contrast")},

    // {
    //   "ruleId": "color-contrast",
    //   "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
    //   "help": "Elements must meet minimum color contrast ratio thresholds",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/color-contrast?application=axeAPI",
    //   "tags": [
    //     "cat.color",
    //     "wcag2aa",
    //     "wcag143",
    //     "TTv5",
    //     "TT13.c",
    //     "EN-301-549",
    //     "EN-9.1.4.3",
    //     "ACT"
    //   ],
    //   "actIds": [
    //     "afw4f7",
    //     "09o5cg"
    //   ]
    // },
    'color-contrast': {url: 'docs/css/color.html', title: localize("kb.color-contrast")},

    // {
    //     "ruleId": "css-orientation-lock",
    //     "description": "Ensure content is not locked to any specific display orientation, and the content is operable in all display orientations",
    //     "help": "CSS Media queries must not lock display orientation",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/css-orientation-lock?application=axeAPI",
    //     "tags": [
    //       "cat.structure",
    //       "wcag134",
    //       "wcag21aa",
    //       "EN-301-549",
    //       "EN-9.1.3.4",
    //       "experimental"
    //     ],
    //     "actIds": [
    //       "b33eff"
    //     ]
    //   },
    'css-orientation-lock': {url: 'docs/html/separation.html', title: localize("kb.style")},

    // {
    //     "ruleId": "definition-list",
    //     "description": "Ensure <dl> elements are structured correctly",
    //     "help": "<dl> elements must only directly contain properly-ordered <dt> and <dd> groups, <script>, <template> or <div> elements",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/definition-list?application=axeAPI",
    //     "tags": [
    //       "cat.structure",
    //       "wcag2a",
    //       "wcag131",
    //       "EN-301-549",
    //       "EN-9.1.3.1"
    //     ]
    //   },
    'definition-list': {url: 'docs/html/lists.html', title: localize("kb.definition-list")},

    // {
    //     "ruleId": "dlitem",
    //     "description": "Ensure <dt> and <dd> elements are contained by a <dl>",
    //     "help": "<dt> and <dd> elements must be contained by a <dl>",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/dlitem?application=axeAPI",
    //     "tags": [
    //       "cat.structure",
    //       "wcag2a",
    //       "wcag131",
    //       "EN-301-549",
    //       "EN-9.1.3.1"
    //     ]
    //   },
    'dlitem': {url: 'docs/html/lists.html', title: localize("kb.dlitem")},

    // {
    //     "ruleId": "document-title",
    //     "description": "Ensure each HTML document contains a non-empty <title> element",
    //     "help": "Documents must have <title> element to aid in navigation",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/document-title?application=axeAPI",
    //     "tags": [
    //       "cat.text-alternatives",
    //       "wcag2a",
    //       "wcag242",
    //       "TTv5",
    //       "TT12.a",
    //       "EN-301-549",
    //       "EN-9.2.4.2",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "2779a5"
    //     ]
    //   },
    'document-title': {url: 'docs/html/title.html', title: localize("kb.document-title")},

    // {
    //     "ruleId": "duplicate-id-active",
    //     "description": "Ensure every id attribute value of active elements is unique",
    //     "help": "IDs of active elements must be unique",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/duplicate-id-active?application=axeAPI",
    //     "tags": [
    //       "cat.parsing",
    //       "wcag2a-obsolete",
    //       "wcag411",
    //       "deprecated"
    //     ],
    //     "actIds": [
    //       "3ea0c8"
    //     ]
    //   },
    'duplicate-id-active': {url: 'docs/html/ids.html', title: localize("kb.duplicate-id")},

    // {
    //     "ruleId": "duplicate-id-aria",
    //     "description": "Ensure every id attribute value used in ARIA and in labels is unique",
    //     "help": "IDs used in ARIA and labels must be unique",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/duplicate-id-aria?application=axeAPI",
    //     "tags": [
    //       "cat.parsing",
    //       "wcag2a",
    //       "wcag412",
    //       "EN-301-549",
    //       "EN-9.4.1.2"
    //     ],
    //     "actIds": [
    //       "3ea0c8"
    //     ]
    //   },
    'duplicate-id-aria': {url: 'docs/html/ids.html', title: localize("kb.duplicate-id")},

    // {
    //     "ruleId": "duplicate-id",
    //     "description": "Ensure every id attribute value is unique",
    //     "help": "id attribute value must be unique",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/duplicate-id?application=axeAPI",
    //     "tags": [
    //       "cat.parsing",
    //       "wcag2a-obsolete",
    //       "wcag411",
    //       "deprecated"
    //     ],
    //     "actIds": [
    //       "3ea0c8"
    //     ]
    //   },
    'duplicate-id': {url: 'docs/html/ids.html', title: localize("kb.duplicate-id")},

    // {
    //     "ruleId": "empty-heading",
    //     "description": "Ensure headings have discernible text",
    //     "help": "Headings should not be empty",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/empty-heading?application=axeAPI",
    //     "tags": [
    //       "cat.name-role-value",
    //       "best-practice"
    //     ],
    //     "actIds": [
    //       "ffd0e9"
    //     ]
    //   },
    'empty-heading': {url: 'docs/html/headings.html', title: localize("kb.empty-heading")},

    // {
    //     "ruleId": "empty-table-header",
    //     "description": "Ensure table headers have discernible text",
    //     "help": "Table header text should not be empty",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/empty-table-header?application=axeAPI",
    //     "tags": [
    //       "cat.name-role-value",
    //       "best-practice"
    //     ]
    //   },
    'empty-heading': {url: 'docs/html/headings.html', title: localize("kb.empty-heading")},

    // {
    //   "ruleId": "epub-type-has-matching-role",
    //   "description": "Ensure the element has an ARIA role matching its epub:type",
    //   "help": "ARIA role should be used in addition to epub:type",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/epub-type-has-matching-role?application=axeAPI",
    //   "tags": [
    //     "cat.aria",
    //     "best-practice"
    //   ]
    // },
    'epub-type-has-matching-role': {url: 'docs/html/roles.html', title: localize("kb.epub-type-has-matching-role")},

    // {
    //   "ruleId": "focus-order-semantics",
    //   "description": "Ensure elements in the focus order have a role appropriate for interactive content",
    //   "help": "Elements in the focus order should have an appropriate role",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/focus-order-semantics?application=axeAPI",
    //   "tags": [
    //     "cat.keyboard",
    //     "best-practice",
    //     "experimental"
    //   ]
    // },
    'focus-order-semantics': {url: 'docs/script/aria.html', title: localize("kb.aria-hidden-body")},

    // {
    //     "ruleId": "form-field-multiple-labels",
    //     "description": "Ensure form field does not have multiple label elements",
    //     "help": "Form field must not have multiple label elements",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/form-field-multiple-labels?application=axeAPI",
    //     "tags": [
    //       "cat.forms",
    //       "wcag2a",
    //       "wcag332",
    //       "TTv5",
    //       "TT5.c",
    //       "EN-301-549",
    //       "EN-9.3.3.2"
    //     ]
    //   },
    'form-field-multiple-labels': {url: 'docs/html/forms.html', title: localize("kb.label-title-only")},

    // {
    //   "ruleId": "frame-focusable-content",
    //   "description": "Ensure <frame> and <iframe> elements with focusable content do not have tabindex=-1",
    //   "help": "Frames with focusable content must not have tabindex=-1",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/frame-focusable-content?application=axeAPI",
    //   "tags": [
    //     "cat.keyboard",
    //     "wcag2a",
    //     "wcag211",
    //     "TTv5",
    //     "TT4.a",
    //     "EN-301-549",
    //     "EN-9.2.1.1"
    //   ],
    //   "actIds": [
    //     "akn7bn"
    //   ]
    // },
    'frame-focusable-content': {url: 'docs/html/iframes.html', title: localize("kb.frame-title-unique")},

    // {
    //   "ruleId": "frame-tested",
    //   "description": "Ensure <iframe> and <frame> elements contain the axe-core script",
    //   "help": "Frames should be tested with axe-core",
    //   "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/frame-tested?application=axeAPI",
    //   "tags": [
    //     "cat.structure",
    //     "best-practice",
    //     "review-item"
    //   ]
    // },
    'frame-tested': {url: 'docs/html/iframes.html', title: localize("kb.frame-title-unique")},

    // {
    //     "ruleId": "frame-title-unique",
    //     "description": "Ensure <iframe> and <frame> elements contain a unique title attribute",
    //     "help": "Frames must have a unique title attribute",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/frame-title-unique?application=axeAPI",
    //     "tags": [
    //       "cat.text-alternatives",
    //       "wcag2a",
    //       "wcag412",
    //       "TTv5",
    //       "TT12.d",
    //       "EN-301-549",
    //       "EN-9.4.1.2"
    //     ],
    //     "actIds": [
    //       "4b1c6c"
    //     ]
    //   },
    'frame-title-unique': {url: 'docs/html/iframes.html', title: localize("kb.frame-title-unique")},

    // {
    //     "ruleId": "frame-title",
    //     "description": "Ensure <iframe> and <frame> elements have an accessible name",
    //     "help": "Frames must have an accessible name",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/frame-title?application=axeAPI",
    //     "tags": [
    //       "cat.text-alternatives",
    //       "wcag2a",
    //       "wcag412",
    //       "section508",
    //       "section508.22.i",
    //       "TTv5",
    //       "TT12.d",
    //       "EN-301-549",
    //       "EN-9.4.1.2"
    //     ],
    //     "actIds": [
    //       "cae760"
    //     ]
    //   },
    'frame-title': {url: 'docs/html/iframes.html', title: localize("kb.frame-title")},

    // {
    //     "ruleId": "heading-order",
    //     "description": "Ensure the order of headings is semantically correct",
    //     "help": "Heading levels should only increase by one",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/heading-order?application=axeAPI",
    //     "tags": [
    //       "cat.semantics",
    //       "best-practice"
    //     ]
    //   },
    'heading-order': {url: 'docs/html/headings.html', title: localize("kb.heading-order")},

    // {
    //     "ruleId": "hidden-content",
    //     "description": "Informs users about hidden content.",
    //     "help": "Hidden content on the page should be analyzed",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/hidden-content?application=axeAPI",
    //     "tags": [
    //       "cat.structure",
    //       "best-practice",
    //       "experimental",
    //       "review-item"
    //     ]
    //   },
    'hidden-content': {url: 'docs/html/separation.html', title: localize("kb.style")},

    // {
    //     "ruleId": "html-has-lang",
    //     "description": "Ensure every HTML document has a lang attribute",
    //     "help": "<html> element must have a lang attribute",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/html-has-lang?application=axeAPI",
    //     "tags": [
    //       "cat.language",
    //       "wcag2a",
    //       "wcag311",
    //       "TTv5",
    //       "TT11.a",
    //       "EN-301-549",
    //       "EN-9.3.1.1",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "b5c3f8"
    //     ]
    //   },
    'html-has-lang': {url: 'docs/html/lang.html', title: localize("kb.html-has-lang")},

    // {
    //     "ruleId": "html-lang-valid",
    //     "description": "Ensure the lang attribute of the <html> element has a valid value",
    //     "help": "<html> element must have a valid value for the lang attribute",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/html-lang-valid?application=axeAPI",
    //     "tags": [
    //       "cat.language",
    //       "wcag2a",
    //       "wcag311",
    //       "TTv5",
    //       "TT11.a",
    //       "EN-301-549",
    //       "EN-9.3.1.1",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "bf051a"
    //     ]
    //   },
    'html-lang-valid': {url: 'docs/html/lang.html', title: localize("kb.html-lang-valid")},

    // {
    //     "ruleId": "html-xml-lang-mismatch",
    //     "description": "Ensure that HTML elements with both valid lang and xml:lang attributes agree on the base language of the page",
    //     "help": "HTML elements with lang and xml:lang must have the same base language",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/html-xml-lang-mismatch?application=axeAPI",
    //     "tags": [
    //       "cat.language",
    //       "wcag2a",
    //       "wcag311",
    //       "EN-301-549",
    //       "EN-9.3.1.1",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "5b7ae0"
    //     ]
    //   },
    'html-xml-lang-mismatch': {url: 'docs/html/lang.html', title: localize("kb.html-lang-valid")},

    // {
    //     "ruleId": "identical-links-same-purpose",
    //     "description": "Ensure that links with the same accessible name serve a similar purpose",
    //     "help": "Links with the same name must have a similar purpose",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/identical-links-same-purpose?application=axeAPI",
    //     "tags": [
    //       "cat.semantics",
    //       "wcag2aaa",
    //       "wcag249"
    //     ],
    //     "actIds": [
    //       "b20e66"
    //     ]
    //   },
    'identical-links-same-purpose': {url: 'docs/html/links.html', title: localize("kb.link-name")},

    // {
    //     "ruleId": "image-alt",
    //     "description": "Ensure <img> elements have alternative text or a role of none or presentation",
    //     "help": "Images must have alternative text",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/image-alt?application=axeAPI",
    //     "tags": [
    //       "cat.text-alternatives",
    //       "wcag2a",
    //       "wcag111",
    //       "section508",
    //       "section508.22.a",
    //       "TTv5",
    //       "TT7.a",
    //       "TT7.b",
    //       "EN-301-549",
    //       "EN-9.1.1.1",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "23a2a8"
    //     ]
    //   },
    'image-alt': {url: 'docs/html/images.html', title: localize("kb.image-alt")},

    // {
    //     "ruleId": "image-redundant-alt",
    //     "description": "Ensure image alternative is not repeated as text",
    //     "help": "Alternative text of images should not be repeated as text",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/image-redundant-alt?application=axeAPI",
    //     "tags": [
    //       "cat.text-alternatives",
    //       "best-practice"
    //     ]
    //   },
    'image-redundant-alt': {url: 'docs/html/images.html', title: localize("kb.image-redundant-alt")},

    // {
    //     "ruleId": "input-button-name",
    //     "description": "Ensure input buttons have discernible text",
    //     "help": "Input buttons must have discernible text",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/input-button-name?application=axeAPI",
    //     "tags": [
    //       "cat.name-role-value",
    //       "wcag2a",
    //       "wcag412",
    //       "section508",
    //       "section508.22.a",
    //       "TTv5",
    //       "TT5.c",
    //       "EN-301-549",
    //       "EN-9.4.1.2",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "97a4e1"
    //     ]
    //   },
    'input-button-name': {url: 'docs/html/forms.html', title: localize("kb.button-name")},

    // {
    //     "ruleId": "input-image-alt",
    //     "description": "Ensure <input type=\"image\"> elements have alternative text",
    //     "help": "Image buttons must have alternative text",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/input-image-alt?application=axeAPI",
    //     "tags": [
    //       "cat.text-alternatives",
    //       "wcag2a",
    //       "wcag111",
    //       "wcag412",
    //       "section508",
    //       "section508.22.a",
    //       "TTv5",
    //       "TT7.a",
    //       "EN-301-549",
    //       "EN-9.1.1.1",
    //       "EN-9.4.1.2",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "59796f"
    //     ]
    //   },
    'input-image-alt': {url: 'docs/html/images.html', title: localize("kb.input-image-alt")},

    // {
    //     "ruleId": "label-content-name-mismatch",
    //     "description": "Ensure that elements labelled through their content must have their visible text as part of their accessible name",
    //     "help": "Elements must have their visible text as part of their accessible name",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/label-content-name-mismatch?application=axeAPI",
    //     "tags": [
    //       "cat.semantics",
    //       "wcag21a",
    //       "wcag253",
    //       "EN-301-549",
    //       "EN-9.2.5.3",
    //       "experimental"
    //     ],
    //     "actIds": [
    //       "2ee8b8"
    //     ]
    //   },
    'label-content-name-mismatch': {url: 'docs/html/forms.html', title: localize("kb.label-title-only")},

    // {
    //     "ruleId": "label-title-only",
    //     "description": "Ensure that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes",
    //     "help": "Form elements should have a visible label",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/label-title-only?application=axeAPI",
    //     "tags": [
    //       "cat.forms",
    //       "best-practice"
    //     ]
    //   },
    'label-title-only': {url: 'docs/html/forms.html', title: localize("kb.label-title-only")},

    // {
    //     "ruleId": "label",
    //     "description": "Ensure every form element has a label",
    //     "help": "Form elements must have labels",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/label?application=axeAPI",
    //     "tags": [
    //       "cat.forms",
    //       "wcag2a",
    //       "wcag412",
    //       "section508",
    //       "section508.22.n",
    //       "TTv5",
    //       "TT5.c",
    //       "EN-301-549",
    //       "EN-9.4.1.2",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "e086e5"
    //     ]
    //   },
    'label': {url: 'docs/html/forms.html', title: localize("kb.label")},

    // {
    //     "ruleId": "landmark-banner-is-top-level",
    //     "description": "Ensure the banner landmark is at top level",
    //     "help": "Banner landmark should not be contained in another landmark",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-banner-is-top-level?application=axeAPI",
    //     "tags": [
    //       "cat.semantics",
    //       "best-practice"
    //     ]
    //   },
    'landmark-banner-is-top-level': {url: 'docs/html/landmarks.html', title: localize("kb.aria-valid-attr")},

    // {
    //     "ruleId": "landmark-complementary-is-top-level",
    //     "description": "Ensure the complementary landmark or aside is at top level",
    //     "help": "Aside should not be contained in another landmark",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-complementary-is-top-level?application=axeAPI",
    //     "tags": [
    //       "cat.semantics",
    //       "best-practice"
    //     ]
    //   },
    'landmark-complementary-is-top-level': {url: 'docs/html/landmarks.html', title: localize("kb.aria-valid-attr")},

    // {
    //     "ruleId": "landmark-contentinfo-is-top-level",
    //     "description": "Ensure the contentinfo landmark is at top level",
    //     "help": "Contentinfo landmark should not be contained in another landmark",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-contentinfo-is-top-level?application=axeAPI",
    //     "tags": [
    //       "cat.semantics",
    //       "best-practice"
    //     ]
    //   },
    'landmark-contentinfo-is-top-level': {url: 'docs/html/landmarks.html', title: localize("kb.aria-valid-attr")},

    // {
    //     "ruleId": "landmark-main-is-top-level",
    //     "description": "Ensure the main landmark is at top level",
    //     "help": "Main landmark should not be contained in another landmark",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-main-is-top-level?application=axeAPI",
    //     "tags": [
    //       "cat.semantics",
    //       "best-practice"
    //     ]
    //   },
    'landmark-main-is-top-level': {url: 'docs/html/landmarks.html', title: localize("kb.aria-valid-attr")},

    // {
    //     "ruleId": "landmark-no-duplicate-banner",
    //     "description": "Ensure the document has at most one banner landmark",
    //     "help": "Document should not have more than one banner landmark",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-no-duplicate-banner?application=axeAPI",
    //     "tags": [
    //       "cat.semantics",
    //       "best-practice"
    //     ]
    //   },
    'landmark-no-duplicate-banner': {url: 'docs/html/landmarks.html', title: localize("kb.aria-valid-attr")},

    // {
    //     "ruleId": "landmark-no-duplicate-contentinfo",
    //     "description": "Ensure the document has at most one contentinfo landmark",
    //     "help": "Document should not have more than one contentinfo landmark",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-no-duplicate-contentinfo?application=axeAPI",
    //     "tags": [
    //       "cat.semantics",
    //       "best-practice"
    //     ]
    //   },
    'landmark-no-duplicate-contentinfo': {url: 'docs/html/landmarks.html', title: localize("kb.aria-valid-attr")},

    // {
    //     "ruleId": "landmark-no-duplicate-main",
    //     "description": "Ensure the document has at most one main landmark",
    //     "help": "Document should not have more than one main landmark",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-no-duplicate-main?application=axeAPI",
    //     "tags": [
    //       "cat.semantics",
    //       "best-practice"
    //     ]
    //   },
    'landmark-no-duplicate-main': {url: 'docs/html/landmarks.html', title: localize("kb.aria-valid-attr")},

    // {
    //     "ruleId": "landmark-one-main",
    //     "description": "Ensure the document has a main landmark",
    //     "help": "Document should have one main landmark",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-one-main?application=axeAPI",
    //     "tags": [
    //       "cat.semantics",
    //       "best-practice"
    //     ]
    //   },
    'landmark-one-main': {url: 'docs/html/landmarks.html', title: localize("kb.aria-valid-attr")},

    // {
    //     "ruleId": "landmark-unique",
    //     "description": "Ensure landmarks are unique",
    //     "help": "Landmarks should have a unique role or role/label/title (i.e. accessible name) combination",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-unique?application=axeAPI",
    //     "tags": [
    //       "cat.semantics",
    //       "best-practice"
    //     ]
    //   },
    'landmark-unique': {url: 'docs/html/landmarks.html', title: localize("kb.aria-valid-attr")},

    // {
    //     "ruleId": "link-in-text-block",
    //     "description": "Ensure links are distinguished from surrounding text in a way that does not rely on color",
    //     "help": "Links must be distinguishable without relying on color",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/link-in-text-block?application=axeAPI",
    //     "tags": [
    //       "cat.color",
    //       "wcag2a",
    //       "wcag141",
    //       "TTv5",
    //       "TT13.a",
    //       "EN-301-549",
    //       "EN-9.1.4.1"
    //     ]
    //   },
    'link-in-text-block': {url: 'docs/html/links.html', title: localize("kb.link-in-text-block")},

    // {
    //     "ruleId": "link-name",
    //     "description": "Ensure links have discernible text",
    //     "help": "Links must have discernible text",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/link-name?application=axeAPI",
    //     "tags": [
    //       "cat.name-role-value",
    //       "wcag2a",
    //       "wcag244",
    //       "wcag412",
    //       "section508",
    //       "section508.22.a",
    //       "TTv5",
    //       "TT6.a",
    //       "EN-301-549",
    //       "EN-9.2.4.4",
    //       "EN-9.4.1.2",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "c487ae"
    //     ]
    //   },
    'link-name': {url: 'docs/html/links.html', title: localize("kb.link-name")},

    // {
    //     "ruleId": "list",
    //     "description": "Ensure that lists are structured correctly",
    //     "help": "<ul> and <ol> must only directly contain <li>, <script> or <template> elements",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/list?application=axeAPI",
    //     "tags": [
    //       "cat.structure",
    //       "wcag2a",
    //       "wcag131",
    //       "EN-301-549",
    //       "EN-9.1.3.1"
    //     ]
    //   },
    'list': {url: 'docs/html/lists.html', title: localize("kb.list")},

    // {
    //     "ruleId": "listitem",
    //     "description": "Ensure <li> elements are used semantically",
    //     "help": "<li> elements must be contained in a <ul> or <ol>",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/listitem?application=axeAPI",
    //     "tags": [
    //       "cat.structure",
    //       "wcag2a",
    //       "wcag131",
    //       "EN-301-549",
    //       "EN-9.1.3.1"
    //     ]
    //   },
    'listitem': {url: 'docs/html/lists.html', title: localize("kb.listitem")},

    // {
    //     "ruleId": "marquee",
    //     "description": "Ensure <marquee> elements are not used",
    //     "help": "<marquee> elements are deprecated and must not be used",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/marquee?application=axeAPI",
    //     "tags": [
    //       "cat.parsing",
    //       "wcag2a",
    //       "wcag222",
    //       "TTv5",
    //       "TT2.b",
    //       "EN-301-549",
    //       "EN-9.2.2.2"
    //     ]
    //   },
    'marquee': {url: 'docs/html/separation.html', title: localize("kb.style")},

    // {
    //     "ruleId": "meta-refresh-no-exceptions",
    //     "description": "Ensure <meta http-equiv=\"refresh\"> is not used for delayed refresh",
    //     "help": "Delayed refresh must not be used",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/meta-refresh-no-exceptions?application=axeAPI",
    //     "tags": [
    //       "cat.time-and-media",
    //       "wcag2aaa",
    //       "wcag224",
    //       "wcag325"
    //     ],
    //     "actIds": [
    //       "bisz58"
    //     ]
    //   },
    'meta-refresh-no-exceptions': {url: 'docs/html/meta.html', title: localize("kb.meta-refresh")},

    //   {
    //     "ruleId": "meta-refresh",
    //     "description": "Ensure <meta http-equiv=\"refresh\"> is not used for delayed refresh",
    //     "help": "Delayed refresh under 20 hours must not be used",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/meta-refresh?application=axeAPI",
    //     "tags": [
    //       "cat.time-and-media",
    //       "wcag2a",
    //       "wcag221",
    //       "TTv5",
    //       "TT8.a",
    //       "EN-301-549",
    //       "EN-9.2.2.1"
    //     ],
    //     "actIds": [
    //       "bc659a",
    //       "bisz58"
    //     ]
    //   },
    'meta-refresh': {url: 'docs/html/meta.html', title: localize("kb.meta-refresh")},

    // {
    //     "ruleId": "meta-viewport-large",
    //     "description": "Ensure <meta name=\"viewport\"> can scale a significant amount",
    //     "help": "Users should be able to zoom and scale the text up to 500%",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/meta-viewport-large?application=axeAPI",
    //     "tags": [
    //       "cat.sensory-and-visual-cues",
    //       "best-practice"
    //     ]
    //   },
    'meta-viewport-large': {url: 'docs/html/meta.html', title: localize("kb.meta-viewport-large")},

    // {
    //     "ruleId": "meta-viewport",
    //     "description": "Ensure <meta name=\"viewport\"> does not disable text scaling and zooming",
    //     "help": "Zooming and scaling must not be disabled",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/meta-viewport?application=axeAPI",
    //     "tags": [
    //       "cat.sensory-and-visual-cues",
    //       "wcag2aa",
    //       "wcag144",
    //       "EN-301-549",
    //       "EN-9.1.4.4",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "b4f0c3"
    //     ]
    //   },
    'meta-viewport': {url: 'docs/html/meta.html', title: localize("kb.meta-viewport")},

    // {
    //     "ruleId": "nested-interactive",
    //     "description": "Ensure interactive controls are not nested as they are not always announced by screen readers or can cause focus problems for assistive technologies",
    //     "help": "Interactive controls must not be nested",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/nested-interactive?application=axeAPI",
    //     "tags": [
    //       "cat.keyboard",
    //       "wcag2a",
    //       "wcag412",
    //       "TTv5",
    //       "TT6.a",
    //       "EN-301-549",
    //       "EN-9.4.1.2"
    //     ],
    //     "actIds": [
    //       "307n5z"
    //     ]
    //   },
    'nested-interactive': {url: 'docs/html/audio.html', title: localize("kb.audio-caption")},

    //   {
    //     "ruleId": "no-autoplay-audio",
    //     "description": "Ensure <video> or <audio> elements do not autoplay audio for more than 3 seconds without a control mechanism to stop or mute the audio",
    //     "help": "<video> or <audio> elements must not play automatically",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/no-autoplay-audio?application=axeAPI",
    //     "tags": [
    //       "cat.time-and-media",
    //       "wcag2a",
    //       "wcag142",
    //       "TTv5",
    //       "TT2.a",
    //       "EN-301-549",
    //       "EN-9.1.4.2",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "80f0bf"
    //     ]
    //   },
    'no-autoplay-audio': {url: 'docs/html/audio.html', title: localize("kb.audio-caption")},

    // {
    //     "ruleId": "object-alt",
    //     "description": "Ensure <object> elements have alternative text",
    //     "help": "<object> elements must have alternative text",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/object-alt?application=axeAPI",
    //     "tags": [
    //       "cat.text-alternatives",
    //       "wcag2a",
    //       "wcag111",
    //       "section508",
    //       "section508.22.a",
    //       "EN-301-549",
    //       "EN-9.1.1.1"
    //     ],
    //     "actIds": [
    //       "8fc3b6"
    //     ]
    //   },
    'object-alt': {url: 'docs/html/object.html', title: localize("kb.object-alt")},

    // {
    //     "ruleId": "p-as-heading",
    //     "description": "Ensure bold, italic text and font-size is not used to style <p> elements as a heading",
    //     "help": "Styled <p> elements must not be used as headings",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/p-as-heading?application=axeAPI",
    //     "tags": [
    //       "cat.semantics",
    //       "wcag2a",
    //       "wcag131",
    //       "EN-301-549",
    //       "EN-9.1.3.1",
    //       "experimental"
    //     ]
    //   },
    'p-as-heading': {url: 'docs/html/headings.html', title: localize("kb.p-as-heading")},

    // {
    //     "ruleId": "page-has-heading-one",
    //     "description": "Ensure that the page, or at least one of its frames contains a level-one heading",
    //     "help": "Page should contain a level-one heading",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/page-has-heading-one?application=axeAPI",
    //     "tags": [
    //       "cat.semantics",
    //       "best-practice"
    //     ]
    //   },
    'page-has-heading-one': {url: 'docs/html/headings.html', title: localize("kb.p-as-heading")},

    // {
    //     "ruleId": "pagebreak-label",
    //     "description": "Ensure page markers have an accessible label",
    //     "help": "Page markers must have an accessible label",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/pagebreak-label?application=axeAPI",
    //     "tags": [
    //       "cat.epub"
    //     ]
    //   },
    'pagebreak-label': {url: 'docs/navigation/pagelist.html', title: localize("kb.pagebreak-label")},

    //   {
    //     "ruleId": "presentation-role-conflict",
    //     "description": "Elements marked as presentational should not have global ARIA or tabindex to ensure all screen readers ignore them",
    //     "help": "Ensure elements marked as presentational are consistently ignored",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/presentation-role-conflict?application=axeAPI",
    //     "tags": [
    //       "cat.aria",
    //       "best-practice",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "46ca7f"
    //     ]
    //   },
    'presentation-role-conflict': {url: 'docs/html/roles.html', title: localize("kb.aria-allowed-attr")},

    // {
    //     "ruleId": "region",
    //     "description": "Ensure all page content is contained by landmarks",
    //     "help": "All page content should be contained by landmarks",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/region?application=axeAPI",
    //     "tags": [
    //       "cat.keyboard",
    //       "best-practice"
    //     ]
    //   },
    'region': {url: 'docs/html/roles.html', title: localize("kb.aria-valid-attr")},

    // {
    //     "ruleId": "role-img-alt",
    //     "description": "Ensure [role=\"img\"] elements have alternative text",
    //     "help": "[role=\"img\"] elements must have an alternative text",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/role-img-alt?application=axeAPI",
    //     "tags": [
    //       "cat.text-alternatives",
    //       "wcag2a",
    //       "wcag111",
    //       "section508",
    //       "section508.22.a",
    //       "TTv5",
    //       "TT7.a",
    //       "EN-301-549",
    //       "EN-9.1.1.1",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "23a2a8"
    //     ]
    //   },
    'role-img-alt': {url: 'docs/html/images.html', title: localize("kb.image-alt")},

    // {
    //     "ruleId": "scope-attr-valid",
    //     "description": "Ensure the scope attribute is used correctly on tables",
    //     "help": "scope attribute should be used correctly",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/scope-attr-valid?application=axeAPI",
    //     "tags": [
    //       "cat.tables",
    //       "best-practice"
    //     ]
    //   },
    'scope-attr-valid': {url: 'docs/html/tables.html', title: localize("kb.scope-attr-valid")},

    // {
    //     "ruleId": "scrollable-region-focusable",
    //     "description": "Ensure elements that have scrollable content are accessible by keyboard",
    //     "help": "Scrollable region must have keyboard access",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/scrollable-region-focusable?application=axeAPI",
    //     "tags": [
    //       "cat.keyboard",
    //       "wcag2a",
    //       "wcag211",
    //       "wcag213",
    //       "TTv5",
    //       "TT4.a",
    //       "EN-301-549",
    //       "EN-9.2.1.1",
    //       "EN-9.2.1.3"
    //     ],
    //     "actIds": [
    //       "0ssw9k"
    //     ]
    //   },
    'scrollable-region-focusable': {url: 'docs/html/accesskeys.html', title: localize("kb.accesskeys")},

    // {
    //     "ruleId": "select-name",
    //     "description": "Ensure select element has an accessible name",
    //     "help": "Select element must have an accessible name",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/select-name?application=axeAPI",
    //     "tags": [
    //       "cat.forms",
    //       "wcag2a",
    //       "wcag412",
    //       "section508",
    //       "section508.22.n",
    //       "TTv5",
    //       "TT5.c",
    //       "EN-301-549",
    //       "EN-9.4.1.2",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "e086e5"
    //     ]
    //   },
    'select-name': {url: 'docs/script/aria.html', title: localize("kb.button-name")},

    // {
    //     "ruleId": "server-side-image-map",
    //     "description": "Ensure that server-side image maps are not used",
    //     "help": "Server-side image maps must not be used",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/server-side-image-map?application=axeAPI",
    //     "tags": [
    //       "cat.text-alternatives",
    //       "wcag2a",
    //       "wcag211",
    //       "section508",
    //       "section508.22.f",
    //       "TTv5",
    //       "TT4.a",
    //       "EN-301-549",
    //       "EN-9.2.1.1"
    //     ]
    //   },
    'server-side-image-map': {url: 'docs/html/maps.html', title: localize("kb.server-side-image-map")},

    // {
    //     "ruleId": "skip-link",
    //     "description": "Ensure all skip links have a focusable target",
    //     "help": "The skip-link target should exist and be focusable",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/skip-link?application=axeAPI",
    //     "tags": [
    //       "cat.keyboard",
    //       "best-practice"
    //     ]
    //   },
    'skip-link': {url: 'docs/html/links.html', title: localize("kb.link-name")},

    // {
    //     "ruleId": "summary-name",
    //     "description": "Ensure summary elements have discernible text",
    //     "help": "Summary elements must have discernible text",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/summary-name?application=axeAPI",
    //     "tags": [
    //       "cat.name-role-value",
    //       "wcag2a",
    //       "wcag412",
    //       "section508",
    //       "section508.22.a",
    //       "TTv5",
    //       "TT6.a",
    //       "EN-301-549",
    //       "EN-9.4.1.2"
    //     ]
    //   },
    'summary-name': {url: 'docs/html/images.html', title: localize("kb.image-alt")},

    //   {
    //     "ruleId": "svg-img-alt",
    //     "description": "Ensure <svg> elements with an img, graphics-document or graphics-symbol role have an accessible text",
    //     "help": "<svg> elements with an img role must have an alternative text",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/svg-img-alt?application=axeAPI",
    //     "tags": [
    //       "cat.text-alternatives",
    //       "wcag2a",
    //       "wcag111",
    //       "section508",
    //       "section508.22.a",
    //       "TTv5",
    //       "TT7.a",
    //       "EN-301-549",
    //       "EN-9.1.1.1",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "7d6734"
    //     ]
    //   },
    'svg-img-alt': {url: 'docs/html/images.html', title: localize("kb.image-alt")},

    // {
    //     "ruleId": "tabindex",
    //     "description": "Ensure tabindex attribute values are not greater than 0",
    //     "help": "Elements should not have tabindex greater than zero",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/tabindex?application=axeAPI",
    //     "tags": [
    //       "cat.keyboard",
    //       "best-practice"
    //     ]
    //   },
    'tabindex': {url: 'docs/html/accesskeys.html', title: localize("kb.accesskeys")},

    // {
    //     "ruleId": "table-duplicate-name",
    //     "description": "Ensure the <caption> element does not contain the same text as the summary attribute",
    //     "help": "Tables should not have the same summary and caption",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/table-duplicate-name?application=axeAPI",
    //     "tags": [
    //       "cat.tables",
    //       "best-practice"
    //     ]
    //   },
    'table-duplicate-name': {url: 'docs/html/tables.html', title: localize("kb.table-duplicate-name")},

    // {
    //     "ruleId": "table-fake-caption",
    //     "description": "Ensure that tables with a caption use the <caption> element.",
    //     "help": "Data or header cells must not be used to give caption to a data table.",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/table-fake-caption?application=axeAPI",
    //     "tags": [
    //       "cat.tables",
    //       "experimental",
    //       "wcag2a",
    //       "wcag131",
    //       "section508",
    //       "section508.22.g",
    //       "EN-301-549",
    //       "EN-9.1.3.1"
    //     ]
    //   },
    'table-fake-caption': {url: 'docs/html/tables.html', title: localize("kb.table-fake-caption")},

    // {
    //     "ruleId": "target-size",
    //     "description": "Ensure touch targets have sufficient size and space",
    //     "help": "All touch targets must be 24px large, or leave sufficient space",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/target-size?application=axeAPI",
    //     "tags": [
    //       "cat.sensory-and-visual-cues",
    //       "wcag22aa",
    //       "wcag258"
    //     ]
    //   },
    'target-size': {url: 'docs/html/tables.html', title: localize("kb.td-has-header")},

    //   {
    //     "ruleId": "td-has-header",
    //     "description": "Ensure that each non-empty data cell in a <table> larger than 3 by 3  has one or more table headers",
    //     "help": "Non-empty <td> elements in larger <table> must have an associated table header",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/td-has-header?application=axeAPI",
    //     "tags": [
    //       "cat.tables",
    //       "experimental",
    //       "wcag2a",
    //       "wcag131",
    //       "section508",
    //       "section508.22.g",
    //       "TTv5",
    //       "TT14.b",
    //       "EN-301-549",
    //       "EN-9.1.3.1"
    //     ]
    //   },
    'td-has-header': {url: 'docs/html/tables.html', title: localize("kb.td-has-header")},

    // {
    //     "ruleId": "td-headers-attr",
    //     "description": "Ensure that each cell in a table that uses the headers attribute refers only to other cells in that table",
    //     "help": "Table cells that use the headers attribute must only refer to cells in the same table",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/td-headers-attr?application=axeAPI",
    //     "tags": [
    //       "cat.tables",
    //       "wcag2a",
    //       "wcag131",
    //       "section508",
    //       "section508.22.g",
    //       "TTv5",
    //       "TT14.b",
    //       "EN-301-549",
    //       "EN-9.1.3.1"
    //     ],
    //     "actIds": [
    //       "a25f45"
    //     ]
    //   },
    'td-headers-attr': {url: 'docs/html/tables.html', title: localize("kb.td-headers-attr")},

    // {
    //     "ruleId": "th-has-data-cells",
    //     "description": "Ensure that <th> elements and elements with role=columnheader/rowheader have data cells they describe",
    //     "help": "Table headers in a data table must refer to data cells",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/th-has-data-cells?application=axeAPI",
    //     "tags": [
    //       "cat.tables",
    //       "wcag2a",
    //       "wcag131",
    //       "section508",
    //       "section508.22.g",
    //       "TTv5",
    //       "TT14.b",
    //       "EN-301-549",
    //       "EN-9.1.3.1"
    //     ],
    //     "actIds": [
    //       "d0f69e"
    //     ]
    //   },
    'th-has-data-cells': {url: 'docs/html/tables.html', title: localize("kb.th-has-data-cells")},

    // {
    //     "ruleId": "valid-lang",
    //     "description": "Ensure lang attributes have valid values",
    //     "help": "lang attribute must have a valid value",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/valid-lang?application=axeAPI",
    //     "tags": [
    //       "cat.language",
    //       "wcag2aa",
    //       "wcag312",
    //       "TTv5",
    //       "TT11.b",
    //       "EN-301-549",
    //       "EN-9.3.1.2",
    //       "ACT"
    //     ],
    //     "actIds": [
    //       "de46e4"
    //     ]
    //   },
    'valid-lang': {url: 'docs/html/lang.html', title: localize("kb.valid-lang")},

    // {
    //     "ruleId": "video-caption",
    //     "description": "Ensure <video> elements have captions",
    //     "help": "<video> elements must have captions",
    //     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/video-caption?application=axeAPI",
    //     "tags": [
    //       "cat.text-alternatives",
    //       "wcag2a",
    //       "wcag122",
    //       "section508",
    //       "section508.22.a",
    //       "TTv5",
    //       "TT17.a",
    //       "EN-301-549",
    //       "EN-9.1.2.2"
    //     ],
    //     "actIds": [
    //       "eac66b"
    //     ]
    //   }
    'video-caption': {url: 'docs/html/video.html', title: localize("kb.video-caption")},

    // FIXME: Axe does not implement this?
    'href-no-hash': {url: 'docs/html/links.html', title: localize("kb.href-no-hash")},
  }
};

module.exports.kbMap = kbMap;

// AXE CORE 4.10.2
// open ace/scripts/axe-rules.html
// console.log(JSON.stringify(axe.getRules(), null, 2));
// =>
// [
//   {
//     "ruleId": "accesskeys",
//     "description": "Ensure every accesskey attribute value is unique",
//     "help": "accesskey attribute value should be unique",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/accesskeys?application=axeAPI",
//     "tags": [
//       "cat.keyboard",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "area-alt",
//     "description": "Ensure <area> elements of image maps have alternative text",
//     "help": "Active <area> elements must have alternative text",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/area-alt?application=axeAPI",
//     "tags": [
//       "cat.text-alternatives",
//       "wcag2a",
//       "wcag244",
//       "wcag412",
//       "section508",
//       "section508.22.a",
//       "TTv5",
//       "TT6.a",
//       "EN-301-549",
//       "EN-9.2.4.4",
//       "EN-9.4.1.2",
//       "ACT"
//     ],
//     "actIds": [
//       "c487ae"
//     ]
//   },
//   {
//     "ruleId": "aria-allowed-attr",
//     "description": "Ensure an element's role supports its ARIA attributes",
//     "help": "Elements must only use supported ARIA attributes",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-allowed-attr?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag412",
//       "EN-301-549",
//       "EN-9.4.1.2"
//     ],
//     "actIds": [
//       "5c01ea"
//     ]
//   },
//   {
//     "ruleId": "aria-allowed-role",
//     "description": "Ensure role attribute has an appropriate value for the element",
//     "help": "ARIA role should be appropriate for the element",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-allowed-role?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "aria-braille-equivalent",
//     "description": "Ensure aria-braillelabel and aria-brailleroledescription have a non-braille equivalent",
//     "help": "aria-braille attributes must have a non-braille equivalent",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-braille-equivalent?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag412",
//       "EN-301-549",
//       "EN-9.4.1.2"
//     ]
//   },
//   {
//     "ruleId": "aria-command-name",
//     "description": "Ensure every ARIA button, link and menuitem has an accessible name",
//     "help": "ARIA commands must have an accessible name",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-command-name?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag412",
//       "TTv5",
//       "TT6.a",
//       "EN-301-549",
//       "EN-9.4.1.2",
//       "ACT"
//     ],
//     "actIds": [
//       "97a4e1"
//     ]
//   },
//   {
//     "ruleId": "aria-conditional-attr",
//     "description": "Ensure ARIA attributes are used as described in the specification of the element's role",
//     "help": "ARIA attributes must be used as specified for the element's role",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-conditional-attr?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag412",
//       "EN-301-549",
//       "EN-9.4.1.2"
//     ],
//     "actIds": [
//       "5c01ea"
//     ]
//   },
//   {
//     "ruleId": "aria-deprecated-role",
//     "description": "Ensure elements do not use deprecated roles",
//     "help": "Deprecated ARIA roles must not be used",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-deprecated-role?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag412",
//       "EN-301-549",
//       "EN-9.4.1.2"
//     ],
//     "actIds": [
//       "674b10"
//     ]
//   },
//   {
//     "ruleId": "aria-dialog-name",
//     "description": "Ensure every ARIA dialog and alertdialog node has an accessible name",
//     "help": "ARIA dialog and alertdialog nodes should have an accessible name",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-dialog-name?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "aria-hidden-body",
//     "description": "Ensure aria-hidden=\"true\" is not present on the document body.",
//     "help": "aria-hidden=\"true\" must not be present on the document body",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-hidden-body?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag131",
//       "wcag412",
//       "EN-301-549",
//       "EN-9.1.3.1",
//       "EN-9.4.1.2"
//     ]
//   },
//   {
//     "ruleId": "aria-hidden-focus",
//     "description": "Ensure aria-hidden elements are not focusable nor contain focusable elements",
//     "help": "ARIA hidden element must not be focusable or contain focusable elements",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-hidden-focus?application=axeAPI",
//     "tags": [
//       "cat.name-role-value",
//       "wcag2a",
//       "wcag412",
//       "TTv5",
//       "TT6.a",
//       "EN-301-549",
//       "EN-9.4.1.2"
//     ],
//     "actIds": [
//       "6cfa84"
//     ]
//   },
//   {
//     "ruleId": "aria-input-field-name",
//     "description": "Ensure every ARIA input field has an accessible name",
//     "help": "ARIA input fields must have an accessible name",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-input-field-name?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag412",
//       "TTv5",
//       "TT5.c",
//       "EN-301-549",
//       "EN-9.4.1.2",
//       "ACT"
//     ],
//     "actIds": [
//       "e086e5"
//     ]
//   },
//   {
//     "ruleId": "aria-meter-name",
//     "description": "Ensure every ARIA meter node has an accessible name",
//     "help": "ARIA meter nodes must have an accessible name",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-meter-name?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag111",
//       "EN-301-549",
//       "EN-9.1.1.1"
//     ]
//   },
//   {
//     "ruleId": "aria-progressbar-name",
//     "description": "Ensure every ARIA progressbar node has an accessible name",
//     "help": "ARIA progressbar nodes must have an accessible name",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-progressbar-name?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag111",
//       "EN-301-549",
//       "EN-9.1.1.1"
//     ]
//   },
//   {
//     "ruleId": "aria-prohibited-attr",
//     "description": "Ensure ARIA attributes are not prohibited for an element's role",
//     "help": "Elements must only use permitted ARIA attributes",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-prohibited-attr?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag412",
//       "EN-301-549",
//       "EN-9.4.1.2"
//     ],
//     "actIds": [
//       "5c01ea"
//     ]
//   },
//   {
//     "ruleId": "aria-required-attr",
//     "description": "Ensure elements with ARIA roles have all required ARIA attributes",
//     "help": "Required ARIA attributes must be provided",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-required-attr?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag412",
//       "EN-301-549",
//       "EN-9.4.1.2"
//     ],
//     "actIds": [
//       "4e8ab6"
//     ]
//   },
//   {
//     "ruleId": "aria-required-children",
//     "description": "Ensure elements with an ARIA role that require child roles contain them",
//     "help": "Certain ARIA roles must contain particular children",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-required-children?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag131",
//       "EN-301-549",
//       "EN-9.1.3.1"
//     ],
//     "actIds": [
//       "bc4a75",
//       "ff89c9"
//     ]
//   },
//   {
//     "ruleId": "aria-required-parent",
//     "description": "Ensure elements with an ARIA role that require parent roles are contained by them",
//     "help": "Certain ARIA roles must be contained by particular parents",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-required-parent?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag131",
//       "EN-301-549",
//       "EN-9.1.3.1"
//     ],
//     "actIds": [
//       "ff89c9"
//     ]
//   },
//   {
//     "ruleId": "aria-roledescription",
//     "description": "Ensure aria-roledescription is only used on elements with an implicit or explicit role",
//     "help": "aria-roledescription must be on elements with a semantic role",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-roledescription?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag412",
//       "EN-301-549",
//       "EN-9.4.1.2",
//       "deprecated"
//     ]
//   },
//   {
//     "ruleId": "aria-roles",
//     "description": "Ensure all elements with a role attribute use a valid value",
//     "help": "ARIA roles used must conform to valid values",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-roles?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag412",
//       "EN-301-549",
//       "EN-9.4.1.2"
//     ],
//     "actIds": [
//       "674b10"
//     ]
//   },
//   {
//     "ruleId": "aria-text",
//     "description": "Ensure role=\"text\" is used on elements with no focusable descendants",
//     "help": "\"role=text\" should have no focusable descendants",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-text?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "aria-toggle-field-name",
//     "description": "Ensure every ARIA toggle field has an accessible name",
//     "help": "ARIA toggle fields must have an accessible name",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-toggle-field-name?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag412",
//       "TTv5",
//       "TT5.c",
//       "EN-301-549",
//       "EN-9.4.1.2",
//       "ACT"
//     ],
//     "actIds": [
//       "e086e5"
//     ]
//   },
//   {
//     "ruleId": "aria-tooltip-name",
//     "description": "Ensure every ARIA tooltip node has an accessible name",
//     "help": "ARIA tooltip nodes must have an accessible name",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-tooltip-name?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag412",
//       "EN-301-549",
//       "EN-9.4.1.2"
//     ]
//   },
//   {
//     "ruleId": "aria-treeitem-name",
//     "description": "Ensure every ARIA treeitem node has an accessible name",
//     "help": "ARIA treeitem nodes should have an accessible name",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-treeitem-name?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "aria-valid-attr-value",
//     "description": "Ensure all ARIA attributes have valid values",
//     "help": "ARIA attributes must conform to valid values",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr-value?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag412",
//       "EN-301-549",
//       "EN-9.4.1.2"
//     ],
//     "actIds": [
//       "6a7281"
//     ]
//   },
//   {
//     "ruleId": "aria-valid-attr",
//     "description": "Ensure attributes that begin with aria- are valid ARIA attributes",
//     "help": "ARIA attributes must conform to valid names",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/aria-valid-attr?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "wcag2a",
//       "wcag412",
//       "EN-301-549",
//       "EN-9.4.1.2"
//     ],
//     "actIds": [
//       "5f99a7"
//     ]
//   },
//   {
//     "ruleId": "audio-caption",
//     "description": "Ensure <audio> elements have captions",
//     "help": "<audio> elements must have a captions track",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/audio-caption?application=axeAPI",
//     "tags": [
//       "cat.time-and-media",
//       "wcag2a",
//       "wcag121",
//       "EN-301-549",
//       "EN-9.1.2.1",
//       "section508",
//       "section508.22.a",
//       "deprecated"
//     ],
//     "actIds": [
//       "2eb176",
//       "afb423"
//     ]
//   },
//   {
//     "ruleId": "autocomplete-valid",
//     "description": "Ensure the autocomplete attribute is correct and suitable for the form field",
//     "help": "autocomplete attribute must be used correctly",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/autocomplete-valid?application=axeAPI",
//     "tags": [
//       "cat.forms",
//       "wcag21aa",
//       "wcag135",
//       "EN-301-549",
//       "EN-9.1.3.5",
//       "ACT"
//     ],
//     "actIds": [
//       "73f2c2"
//     ]
//   },
//   {
//     "ruleId": "avoid-inline-spacing",
//     "description": "Ensure that text spacing set through style attributes can be adjusted with custom stylesheets",
//     "help": "Inline text spacing must be adjustable with custom stylesheets",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/avoid-inline-spacing?application=axeAPI",
//     "tags": [
//       "cat.structure",
//       "wcag21aa",
//       "wcag1412",
//       "EN-301-549",
//       "EN-9.1.4.12",
//       "ACT"
//     ],
//     "actIds": [
//       "24afc2",
//       "9e45ec",
//       "78fd32"
//     ]
//   },
//   {
//     "ruleId": "blink",
//     "description": "Ensure <blink> elements are not used",
//     "help": "<blink> elements are deprecated and must not be used",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/blink?application=axeAPI",
//     "tags": [
//       "cat.time-and-media",
//       "wcag2a",
//       "wcag222",
//       "section508",
//       "section508.22.j",
//       "TTv5",
//       "TT2.b",
//       "EN-301-549",
//       "EN-9.2.2.2"
//     ]
//   },
//   {
//     "ruleId": "button-name",
//     "description": "Ensure buttons have discernible text",
//     "help": "Buttons must have discernible text",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/button-name?application=axeAPI",
//     "tags": [
//       "cat.name-role-value",
//       "wcag2a",
//       "wcag412",
//       "section508",
//       "section508.22.a",
//       "TTv5",
//       "TT6.a",
//       "EN-301-549",
//       "EN-9.4.1.2",
//       "ACT"
//     ],
//     "actIds": [
//       "97a4e1",
//       "m6b1q3"
//     ]
//   },
//   {
//     "ruleId": "bypass",
//     "description": "Ensure each page has at least one mechanism for a user to bypass navigation and jump straight to the content",
//     "help": "Page must have means to bypass repeated blocks",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/bypass?application=axeAPI",
//     "tags": [
//       "cat.keyboard",
//       "wcag2a",
//       "wcag241",
//       "section508",
//       "section508.22.o",
//       "TTv5",
//       "TT9.a",
//       "EN-301-549",
//       "EN-9.2.4.1"
//     ],
//     "actIds": [
//       "cf77f2",
//       "047fe0",
//       "b40fd1",
//       "3e12e1",
//       "ye5d6e"
//     ]
//   },
//   {
//     "ruleId": "color-contrast-enhanced",
//     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AAA enhanced contrast ratio thresholds",
//     "help": "Elements must meet enhanced color contrast ratio thresholds",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/color-contrast-enhanced?application=axeAPI",
//     "tags": [
//       "cat.color",
//       "wcag2aaa",
//       "wcag146",
//       "ACT"
//     ],
//     "actIds": [
//       "09o5cg"
//     ]
//   },
//   {
//     "ruleId": "color-contrast",
//     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
//     "help": "Elements must meet minimum color contrast ratio thresholds",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/color-contrast?application=axeAPI",
//     "tags": [
//       "cat.color",
//       "wcag2aa",
//       "wcag143",
//       "TTv5",
//       "TT13.c",
//       "EN-301-549",
//       "EN-9.1.4.3",
//       "ACT"
//     ],
//     "actIds": [
//       "afw4f7",
//       "09o5cg"
//     ]
//   },
//   {
//     "ruleId": "css-orientation-lock",
//     "description": "Ensure content is not locked to any specific display orientation, and the content is operable in all display orientations",
//     "help": "CSS Media queries must not lock display orientation",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/css-orientation-lock?application=axeAPI",
//     "tags": [
//       "cat.structure",
//       "wcag134",
//       "wcag21aa",
//       "EN-301-549",
//       "EN-9.1.3.4",
//       "experimental"
//     ],
//     "actIds": [
//       "b33eff"
//     ]
//   },
//   {
//     "ruleId": "definition-list",
//     "description": "Ensure <dl> elements are structured correctly",
//     "help": "<dl> elements must only directly contain properly-ordered <dt> and <dd> groups, <script>, <template> or <div> elements",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/definition-list?application=axeAPI",
//     "tags": [
//       "cat.structure",
//       "wcag2a",
//       "wcag131",
//       "EN-301-549",
//       "EN-9.1.3.1"
//     ]
//   },
//   {
//     "ruleId": "dlitem",
//     "description": "Ensure <dt> and <dd> elements are contained by a <dl>",
//     "help": "<dt> and <dd> elements must be contained by a <dl>",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/dlitem?application=axeAPI",
//     "tags": [
//       "cat.structure",
//       "wcag2a",
//       "wcag131",
//       "EN-301-549",
//       "EN-9.1.3.1"
//     ]
//   },
//   {
//     "ruleId": "document-title",
//     "description": "Ensure each HTML document contains a non-empty <title> element",
//     "help": "Documents must have <title> element to aid in navigation",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/document-title?application=axeAPI",
//     "tags": [
//       "cat.text-alternatives",
//       "wcag2a",
//       "wcag242",
//       "TTv5",
//       "TT12.a",
//       "EN-301-549",
//       "EN-9.2.4.2",
//       "ACT"
//     ],
//     "actIds": [
//       "2779a5"
//     ]
//   },
//   {
//     "ruleId": "duplicate-id-active",
//     "description": "Ensure every id attribute value of active elements is unique",
//     "help": "IDs of active elements must be unique",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/duplicate-id-active?application=axeAPI",
//     "tags": [
//       "cat.parsing",
//       "wcag2a-obsolete",
//       "wcag411",
//       "deprecated"
//     ],
//     "actIds": [
//       "3ea0c8"
//     ]
//   },
//   {
//     "ruleId": "duplicate-id-aria",
//     "description": "Ensure every id attribute value used in ARIA and in labels is unique",
//     "help": "IDs used in ARIA and labels must be unique",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/duplicate-id-aria?application=axeAPI",
//     "tags": [
//       "cat.parsing",
//       "wcag2a",
//       "wcag412",
//       "EN-301-549",
//       "EN-9.4.1.2"
//     ],
//     "actIds": [
//       "3ea0c8"
//     ]
//   },
//   {
//     "ruleId": "duplicate-id",
//     "description": "Ensure every id attribute value is unique",
//     "help": "id attribute value must be unique",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/duplicate-id?application=axeAPI",
//     "tags": [
//       "cat.parsing",
//       "wcag2a-obsolete",
//       "wcag411",
//       "deprecated"
//     ],
//     "actIds": [
//       "3ea0c8"
//     ]
//   },
//   {
//     "ruleId": "empty-heading",
//     "description": "Ensure headings have discernible text",
//     "help": "Headings should not be empty",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/empty-heading?application=axeAPI",
//     "tags": [
//       "cat.name-role-value",
//       "best-practice"
//     ],
//     "actIds": [
//       "ffd0e9"
//     ]
//   },
//   {
//     "ruleId": "empty-table-header",
//     "description": "Ensure table headers have discernible text",
//     "help": "Table header text should not be empty",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/empty-table-header?application=axeAPI",
//     "tags": [
//       "cat.name-role-value",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "epub-type-has-matching-role",
//     "description": "Ensure the element has an ARIA role matching its epub:type",
//     "help": "ARIA role should be used in addition to epub:type",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/epub-type-has-matching-role?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "focus-order-semantics",
//     "description": "Ensure elements in the focus order have a role appropriate for interactive content",
//     "help": "Elements in the focus order should have an appropriate role",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/focus-order-semantics?application=axeAPI",
//     "tags": [
//       "cat.keyboard",
//       "best-practice",
//       "experimental"
//     ]
//   },
//   {
//     "ruleId": "form-field-multiple-labels",
//     "description": "Ensure form field does not have multiple label elements",
//     "help": "Form field must not have multiple label elements",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/form-field-multiple-labels?application=axeAPI",
//     "tags": [
//       "cat.forms",
//       "wcag2a",
//       "wcag332",
//       "TTv5",
//       "TT5.c",
//       "EN-301-549",
//       "EN-9.3.3.2"
//     ]
//   },
//   {
//     "ruleId": "frame-focusable-content",
//     "description": "Ensure <frame> and <iframe> elements with focusable content do not have tabindex=-1",
//     "help": "Frames with focusable content must not have tabindex=-1",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/frame-focusable-content?application=axeAPI",
//     "tags": [
//       "cat.keyboard",
//       "wcag2a",
//       "wcag211",
//       "TTv5",
//       "TT4.a",
//       "EN-301-549",
//       "EN-9.2.1.1"
//     ],
//     "actIds": [
//       "akn7bn"
//     ]
//   },
//   {
//     "ruleId": "frame-tested",
//     "description": "Ensure <iframe> and <frame> elements contain the axe-core script",
//     "help": "Frames should be tested with axe-core",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/frame-tested?application=axeAPI",
//     "tags": [
//       "cat.structure",
//       "best-practice",
//       "review-item"
//     ]
//   },
//   {
//     "ruleId": "frame-title-unique",
//     "description": "Ensure <iframe> and <frame> elements contain a unique title attribute",
//     "help": "Frames must have a unique title attribute",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/frame-title-unique?application=axeAPI",
//     "tags": [
//       "cat.text-alternatives",
//       "wcag2a",
//       "wcag412",
//       "TTv5",
//       "TT12.d",
//       "EN-301-549",
//       "EN-9.4.1.2"
//     ],
//     "actIds": [
//       "4b1c6c"
//     ]
//   },
//   {
//     "ruleId": "frame-title",
//     "description": "Ensure <iframe> and <frame> elements have an accessible name",
//     "help": "Frames must have an accessible name",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/frame-title?application=axeAPI",
//     "tags": [
//       "cat.text-alternatives",
//       "wcag2a",
//       "wcag412",
//       "section508",
//       "section508.22.i",
//       "TTv5",
//       "TT12.d",
//       "EN-301-549",
//       "EN-9.4.1.2"
//     ],
//     "actIds": [
//       "cae760"
//     ]
//   },
//   {
//     "ruleId": "heading-order",
//     "description": "Ensure the order of headings is semantically correct",
//     "help": "Heading levels should only increase by one",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/heading-order?application=axeAPI",
//     "tags": [
//       "cat.semantics",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "hidden-content",
//     "description": "Informs users about hidden content.",
//     "help": "Hidden content on the page should be analyzed",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/hidden-content?application=axeAPI",
//     "tags": [
//       "cat.structure",
//       "best-practice",
//       "experimental",
//       "review-item"
//     ]
//   },
//   {
//     "ruleId": "html-has-lang",
//     "description": "Ensure every HTML document has a lang attribute",
//     "help": "<html> element must have a lang attribute",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/html-has-lang?application=axeAPI",
//     "tags": [
//       "cat.language",
//       "wcag2a",
//       "wcag311",
//       "TTv5",
//       "TT11.a",
//       "EN-301-549",
//       "EN-9.3.1.1",
//       "ACT"
//     ],
//     "actIds": [
//       "b5c3f8"
//     ]
//   },
//   {
//     "ruleId": "html-lang-valid",
//     "description": "Ensure the lang attribute of the <html> element has a valid value",
//     "help": "<html> element must have a valid value for the lang attribute",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/html-lang-valid?application=axeAPI",
//     "tags": [
//       "cat.language",
//       "wcag2a",
//       "wcag311",
//       "TTv5",
//       "TT11.a",
//       "EN-301-549",
//       "EN-9.3.1.1",
//       "ACT"
//     ],
//     "actIds": [
//       "bf051a"
//     ]
//   },
//   {
//     "ruleId": "html-xml-lang-mismatch",
//     "description": "Ensure that HTML elements with both valid lang and xml:lang attributes agree on the base language of the page",
//     "help": "HTML elements with lang and xml:lang must have the same base language",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/html-xml-lang-mismatch?application=axeAPI",
//     "tags": [
//       "cat.language",
//       "wcag2a",
//       "wcag311",
//       "EN-301-549",
//       "EN-9.3.1.1",
//       "ACT"
//     ],
//     "actIds": [
//       "5b7ae0"
//     ]
//   },
//   {
//     "ruleId": "identical-links-same-purpose",
//     "description": "Ensure that links with the same accessible name serve a similar purpose",
//     "help": "Links with the same name must have a similar purpose",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/identical-links-same-purpose?application=axeAPI",
//     "tags": [
//       "cat.semantics",
//       "wcag2aaa",
//       "wcag249"
//     ],
//     "actIds": [
//       "b20e66"
//     ]
//   },
//   {
//     "ruleId": "image-alt",
//     "description": "Ensure <img> elements have alternative text or a role of none or presentation",
//     "help": "Images must have alternative text",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/image-alt?application=axeAPI",
//     "tags": [
//       "cat.text-alternatives",
//       "wcag2a",
//       "wcag111",
//       "section508",
//       "section508.22.a",
//       "TTv5",
//       "TT7.a",
//       "TT7.b",
//       "EN-301-549",
//       "EN-9.1.1.1",
//       "ACT"
//     ],
//     "actIds": [
//       "23a2a8"
//     ]
//   },
//   {
//     "ruleId": "image-redundant-alt",
//     "description": "Ensure image alternative is not repeated as text",
//     "help": "Alternative text of images should not be repeated as text",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/image-redundant-alt?application=axeAPI",
//     "tags": [
//       "cat.text-alternatives",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "input-button-name",
//     "description": "Ensure input buttons have discernible text",
//     "help": "Input buttons must have discernible text",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/input-button-name?application=axeAPI",
//     "tags": [
//       "cat.name-role-value",
//       "wcag2a",
//       "wcag412",
//       "section508",
//       "section508.22.a",
//       "TTv5",
//       "TT5.c",
//       "EN-301-549",
//       "EN-9.4.1.2",
//       "ACT"
//     ],
//     "actIds": [
//       "97a4e1"
//     ]
//   },
//   {
//     "ruleId": "input-image-alt",
//     "description": "Ensure <input type=\"image\"> elements have alternative text",
//     "help": "Image buttons must have alternative text",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/input-image-alt?application=axeAPI",
//     "tags": [
//       "cat.text-alternatives",
//       "wcag2a",
//       "wcag111",
//       "wcag412",
//       "section508",
//       "section508.22.a",
//       "TTv5",
//       "TT7.a",
//       "EN-301-549",
//       "EN-9.1.1.1",
//       "EN-9.4.1.2",
//       "ACT"
//     ],
//     "actIds": [
//       "59796f"
//     ]
//   },
//   {
//     "ruleId": "label-content-name-mismatch",
//     "description": "Ensure that elements labelled through their content must have their visible text as part of their accessible name",
//     "help": "Elements must have their visible text as part of their accessible name",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/label-content-name-mismatch?application=axeAPI",
//     "tags": [
//       "cat.semantics",
//       "wcag21a",
//       "wcag253",
//       "EN-301-549",
//       "EN-9.2.5.3",
//       "experimental"
//     ],
//     "actIds": [
//       "2ee8b8"
//     ]
//   },
//   {
//     "ruleId": "label-title-only",
//     "description": "Ensure that every form element has a visible label and is not solely labeled using hidden labels, or the title or aria-describedby attributes",
//     "help": "Form elements should have a visible label",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/label-title-only?application=axeAPI",
//     "tags": [
//       "cat.forms",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "label",
//     "description": "Ensure every form element has a label",
//     "help": "Form elements must have labels",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/label?application=axeAPI",
//     "tags": [
//       "cat.forms",
//       "wcag2a",
//       "wcag412",
//       "section508",
//       "section508.22.n",
//       "TTv5",
//       "TT5.c",
//       "EN-301-549",
//       "EN-9.4.1.2",
//       "ACT"
//     ],
//     "actIds": [
//       "e086e5"
//     ]
//   },
//   {
//     "ruleId": "landmark-banner-is-top-level",
//     "description": "Ensure the banner landmark is at top level",
//     "help": "Banner landmark should not be contained in another landmark",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-banner-is-top-level?application=axeAPI",
//     "tags": [
//       "cat.semantics",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "landmark-complementary-is-top-level",
//     "description": "Ensure the complementary landmark or aside is at top level",
//     "help": "Aside should not be contained in another landmark",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-complementary-is-top-level?application=axeAPI",
//     "tags": [
//       "cat.semantics",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "landmark-contentinfo-is-top-level",
//     "description": "Ensure the contentinfo landmark is at top level",
//     "help": "Contentinfo landmark should not be contained in another landmark",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-contentinfo-is-top-level?application=axeAPI",
//     "tags": [
//       "cat.semantics",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "landmark-main-is-top-level",
//     "description": "Ensure the main landmark is at top level",
//     "help": "Main landmark should not be contained in another landmark",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-main-is-top-level?application=axeAPI",
//     "tags": [
//       "cat.semantics",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "landmark-no-duplicate-banner",
//     "description": "Ensure the document has at most one banner landmark",
//     "help": "Document should not have more than one banner landmark",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-no-duplicate-banner?application=axeAPI",
//     "tags": [
//       "cat.semantics",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "landmark-no-duplicate-contentinfo",
//     "description": "Ensure the document has at most one contentinfo landmark",
//     "help": "Document should not have more than one contentinfo landmark",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-no-duplicate-contentinfo?application=axeAPI",
//     "tags": [
//       "cat.semantics",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "landmark-no-duplicate-main",
//     "description": "Ensure the document has at most one main landmark",
//     "help": "Document should not have more than one main landmark",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-no-duplicate-main?application=axeAPI",
//     "tags": [
//       "cat.semantics",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "landmark-one-main",
//     "description": "Ensure the document has a main landmark",
//     "help": "Document should have one main landmark",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-one-main?application=axeAPI",
//     "tags": [
//       "cat.semantics",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "landmark-unique",
//     "description": "Ensure landmarks are unique",
//     "help": "Landmarks should have a unique role or role/label/title (i.e. accessible name) combination",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/landmark-unique?application=axeAPI",
//     "tags": [
//       "cat.semantics",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "link-in-text-block",
//     "description": "Ensure links are distinguished from surrounding text in a way that does not rely on color",
//     "help": "Links must be distinguishable without relying on color",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/link-in-text-block?application=axeAPI",
//     "tags": [
//       "cat.color",
//       "wcag2a",
//       "wcag141",
//       "TTv5",
//       "TT13.a",
//       "EN-301-549",
//       "EN-9.1.4.1"
//     ]
//   },
//   {
//     "ruleId": "link-name",
//     "description": "Ensure links have discernible text",
//     "help": "Links must have discernible text",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/link-name?application=axeAPI",
//     "tags": [
//       "cat.name-role-value",
//       "wcag2a",
//       "wcag244",
//       "wcag412",
//       "section508",
//       "section508.22.a",
//       "TTv5",
//       "TT6.a",
//       "EN-301-549",
//       "EN-9.2.4.4",
//       "EN-9.4.1.2",
//       "ACT"
//     ],
//     "actIds": [
//       "c487ae"
//     ]
//   },
//   {
//     "ruleId": "list",
//     "description": "Ensure that lists are structured correctly",
//     "help": "<ul> and <ol> must only directly contain <li>, <script> or <template> elements",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/list?application=axeAPI",
//     "tags": [
//       "cat.structure",
//       "wcag2a",
//       "wcag131",
//       "EN-301-549",
//       "EN-9.1.3.1"
//     ]
//   },
//   {
//     "ruleId": "listitem",
//     "description": "Ensure <li> elements are used semantically",
//     "help": "<li> elements must be contained in a <ul> or <ol>",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/listitem?application=axeAPI",
//     "tags": [
//       "cat.structure",
//       "wcag2a",
//       "wcag131",
//       "EN-301-549",
//       "EN-9.1.3.1"
//     ]
//   },
//   {
//     "ruleId": "marquee",
//     "description": "Ensure <marquee> elements are not used",
//     "help": "<marquee> elements are deprecated and must not be used",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/marquee?application=axeAPI",
//     "tags": [
//       "cat.parsing",
//       "wcag2a",
//       "wcag222",
//       "TTv5",
//       "TT2.b",
//       "EN-301-549",
//       "EN-9.2.2.2"
//     ]
//   },
//   {
//     "ruleId": "meta-refresh-no-exceptions",
//     "description": "Ensure <meta http-equiv=\"refresh\"> is not used for delayed refresh",
//     "help": "Delayed refresh must not be used",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/meta-refresh-no-exceptions?application=axeAPI",
//     "tags": [
//       "cat.time-and-media",
//       "wcag2aaa",
//       "wcag224",
//       "wcag325"
//     ],
//     "actIds": [
//       "bisz58"
//     ]
//   },
//   {
//     "ruleId": "meta-refresh",
//     "description": "Ensure <meta http-equiv=\"refresh\"> is not used for delayed refresh",
//     "help": "Delayed refresh under 20 hours must not be used",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/meta-refresh?application=axeAPI",
//     "tags": [
//       "cat.time-and-media",
//       "wcag2a",
//       "wcag221",
//       "TTv5",
//       "TT8.a",
//       "EN-301-549",
//       "EN-9.2.2.1"
//     ],
//     "actIds": [
//       "bc659a",
//       "bisz58"
//     ]
//   },
//   {
//     "ruleId": "meta-viewport-large",
//     "description": "Ensure <meta name=\"viewport\"> can scale a significant amount",
//     "help": "Users should be able to zoom and scale the text up to 500%",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/meta-viewport-large?application=axeAPI",
//     "tags": [
//       "cat.sensory-and-visual-cues",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "meta-viewport",
//     "description": "Ensure <meta name=\"viewport\"> does not disable text scaling and zooming",
//     "help": "Zooming and scaling must not be disabled",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/meta-viewport?application=axeAPI",
//     "tags": [
//       "cat.sensory-and-visual-cues",
//       "wcag2aa",
//       "wcag144",
//       "EN-301-549",
//       "EN-9.1.4.4",
//       "ACT"
//     ],
//     "actIds": [
//       "b4f0c3"
//     ]
//   },
//   {
//     "ruleId": "nested-interactive",
//     "description": "Ensure interactive controls are not nested as they are not always announced by screen readers or can cause focus problems for assistive technologies",
//     "help": "Interactive controls must not be nested",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/nested-interactive?application=axeAPI",
//     "tags": [
//       "cat.keyboard",
//       "wcag2a",
//       "wcag412",
//       "TTv5",
//       "TT6.a",
//       "EN-301-549",
//       "EN-9.4.1.2"
//     ],
//     "actIds": [
//       "307n5z"
//     ]
//   },
//   {
//     "ruleId": "no-autoplay-audio",
//     "description": "Ensure <video> or <audio> elements do not autoplay audio for more than 3 seconds without a control mechanism to stop or mute the audio",
//     "help": "<video> or <audio> elements must not play automatically",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/no-autoplay-audio?application=axeAPI",
//     "tags": [
//       "cat.time-and-media",
//       "wcag2a",
//       "wcag142",
//       "TTv5",
//       "TT2.a",
//       "EN-301-549",
//       "EN-9.1.4.2",
//       "ACT"
//     ],
//     "actIds": [
//       "80f0bf"
//     ]
//   },
//   {
//     "ruleId": "object-alt",
//     "description": "Ensure <object> elements have alternative text",
//     "help": "<object> elements must have alternative text",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/object-alt?application=axeAPI",
//     "tags": [
//       "cat.text-alternatives",
//       "wcag2a",
//       "wcag111",
//       "section508",
//       "section508.22.a",
//       "EN-301-549",
//       "EN-9.1.1.1"
//     ],
//     "actIds": [
//       "8fc3b6"
//     ]
//   },
//   {
//     "ruleId": "p-as-heading",
//     "description": "Ensure bold, italic text and font-size is not used to style <p> elements as a heading",
//     "help": "Styled <p> elements must not be used as headings",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/p-as-heading?application=axeAPI",
//     "tags": [
//       "cat.semantics",
//       "wcag2a",
//       "wcag131",
//       "EN-301-549",
//       "EN-9.1.3.1",
//       "experimental"
//     ]
//   },
//   {
//     "ruleId": "page-has-heading-one",
//     "description": "Ensure that the page, or at least one of its frames contains a level-one heading",
//     "help": "Page should contain a level-one heading",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/page-has-heading-one?application=axeAPI",
//     "tags": [
//       "cat.semantics",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "pagebreak-label",
//     "description": "Ensure page markers have an accessible label",
//     "help": "Page markers must have an accessible label",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/pagebreak-label?application=axeAPI",
//     "tags": [
//       "cat.epub"
//     ]
//   },
//   {
//     "ruleId": "presentation-role-conflict",
//     "description": "Elements marked as presentational should not have global ARIA or tabindex to ensure all screen readers ignore them",
//     "help": "Ensure elements marked as presentational are consistently ignored",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/presentation-role-conflict?application=axeAPI",
//     "tags": [
//       "cat.aria",
//       "best-practice",
//       "ACT"
//     ],
//     "actIds": [
//       "46ca7f"
//     ]
//   },
//   {
//     "ruleId": "region",
//     "description": "Ensure all page content is contained by landmarks",
//     "help": "All page content should be contained by landmarks",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/region?application=axeAPI",
//     "tags": [
//       "cat.keyboard",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "role-img-alt",
//     "description": "Ensure [role=\"img\"] elements have alternative text",
//     "help": "[role=\"img\"] elements must have an alternative text",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/role-img-alt?application=axeAPI",
//     "tags": [
//       "cat.text-alternatives",
//       "wcag2a",
//       "wcag111",
//       "section508",
//       "section508.22.a",
//       "TTv5",
//       "TT7.a",
//       "EN-301-549",
//       "EN-9.1.1.1",
//       "ACT"
//     ],
//     "actIds": [
//       "23a2a8"
//     ]
//   },
//   {
//     "ruleId": "scope-attr-valid",
//     "description": "Ensure the scope attribute is used correctly on tables",
//     "help": "scope attribute should be used correctly",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/scope-attr-valid?application=axeAPI",
//     "tags": [
//       "cat.tables",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "scrollable-region-focusable",
//     "description": "Ensure elements that have scrollable content are accessible by keyboard",
//     "help": "Scrollable region must have keyboard access",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/scrollable-region-focusable?application=axeAPI",
//     "tags": [
//       "cat.keyboard",
//       "wcag2a",
//       "wcag211",
//       "wcag213",
//       "TTv5",
//       "TT4.a",
//       "EN-301-549",
//       "EN-9.2.1.1",
//       "EN-9.2.1.3"
//     ],
//     "actIds": [
//       "0ssw9k"
//     ]
//   },
//   {
//     "ruleId": "select-name",
//     "description": "Ensure select element has an accessible name",
//     "help": "Select element must have an accessible name",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/select-name?application=axeAPI",
//     "tags": [
//       "cat.forms",
//       "wcag2a",
//       "wcag412",
//       "section508",
//       "section508.22.n",
//       "TTv5",
//       "TT5.c",
//       "EN-301-549",
//       "EN-9.4.1.2",
//       "ACT"
//     ],
//     "actIds": [
//       "e086e5"
//     ]
//   },
//   {
//     "ruleId": "server-side-image-map",
//     "description": "Ensure that server-side image maps are not used",
//     "help": "Server-side image maps must not be used",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/server-side-image-map?application=axeAPI",
//     "tags": [
//       "cat.text-alternatives",
//       "wcag2a",
//       "wcag211",
//       "section508",
//       "section508.22.f",
//       "TTv5",
//       "TT4.a",
//       "EN-301-549",
//       "EN-9.2.1.1"
//     ]
//   },
//   {
//     "ruleId": "skip-link",
//     "description": "Ensure all skip links have a focusable target",
//     "help": "The skip-link target should exist and be focusable",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/skip-link?application=axeAPI",
//     "tags": [
//       "cat.keyboard",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "summary-name",
//     "description": "Ensure summary elements have discernible text",
//     "help": "Summary elements must have discernible text",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/summary-name?application=axeAPI",
//     "tags": [
//       "cat.name-role-value",
//       "wcag2a",
//       "wcag412",
//       "section508",
//       "section508.22.a",
//       "TTv5",
//       "TT6.a",
//       "EN-301-549",
//       "EN-9.4.1.2"
//     ]
//   },
//   {
//     "ruleId": "svg-img-alt",
//     "description": "Ensure <svg> elements with an img, graphics-document or graphics-symbol role have an accessible text",
//     "help": "<svg> elements with an img role must have an alternative text",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/svg-img-alt?application=axeAPI",
//     "tags": [
//       "cat.text-alternatives",
//       "wcag2a",
//       "wcag111",
//       "section508",
//       "section508.22.a",
//       "TTv5",
//       "TT7.a",
//       "EN-301-549",
//       "EN-9.1.1.1",
//       "ACT"
//     ],
//     "actIds": [
//       "7d6734"
//     ]
//   },
//   {
//     "ruleId": "tabindex",
//     "description": "Ensure tabindex attribute values are not greater than 0",
//     "help": "Elements should not have tabindex greater than zero",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/tabindex?application=axeAPI",
//     "tags": [
//       "cat.keyboard",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "table-duplicate-name",
//     "description": "Ensure the <caption> element does not contain the same text as the summary attribute",
//     "help": "Tables should not have the same summary and caption",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/table-duplicate-name?application=axeAPI",
//     "tags": [
//       "cat.tables",
//       "best-practice"
//     ]
//   },
//   {
//     "ruleId": "table-fake-caption",
//     "description": "Ensure that tables with a caption use the <caption> element.",
//     "help": "Data or header cells must not be used to give caption to a data table.",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/table-fake-caption?application=axeAPI",
//     "tags": [
//       "cat.tables",
//       "experimental",
//       "wcag2a",
//       "wcag131",
//       "section508",
//       "section508.22.g",
//       "EN-301-549",
//       "EN-9.1.3.1"
//     ]
//   },
//   {
//     "ruleId": "target-size",
//     "description": "Ensure touch targets have sufficient size and space",
//     "help": "All touch targets must be 24px large, or leave sufficient space",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/target-size?application=axeAPI",
//     "tags": [
//       "cat.sensory-and-visual-cues",
//       "wcag22aa",
//       "wcag258"
//     ]
//   },
//   {
//     "ruleId": "td-has-header",
//     "description": "Ensure that each non-empty data cell in a <table> larger than 3 by 3  has one or more table headers",
//     "help": "Non-empty <td> elements in larger <table> must have an associated table header",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/td-has-header?application=axeAPI",
//     "tags": [
//       "cat.tables",
//       "experimental",
//       "wcag2a",
//       "wcag131",
//       "section508",
//       "section508.22.g",
//       "TTv5",
//       "TT14.b",
//       "EN-301-549",
//       "EN-9.1.3.1"
//     ]
//   },
//   {
//     "ruleId": "td-headers-attr",
//     "description": "Ensure that each cell in a table that uses the headers attribute refers only to other cells in that table",
//     "help": "Table cells that use the headers attribute must only refer to cells in the same table",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/td-headers-attr?application=axeAPI",
//     "tags": [
//       "cat.tables",
//       "wcag2a",
//       "wcag131",
//       "section508",
//       "section508.22.g",
//       "TTv5",
//       "TT14.b",
//       "EN-301-549",
//       "EN-9.1.3.1"
//     ],
//     "actIds": [
//       "a25f45"
//     ]
//   },
//   {
//     "ruleId": "th-has-data-cells",
//     "description": "Ensure that <th> elements and elements with role=columnheader/rowheader have data cells they describe",
//     "help": "Table headers in a data table must refer to data cells",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/th-has-data-cells?application=axeAPI",
//     "tags": [
//       "cat.tables",
//       "wcag2a",
//       "wcag131",
//       "section508",
//       "section508.22.g",
//       "TTv5",
//       "TT14.b",
//       "EN-301-549",
//       "EN-9.1.3.1"
//     ],
//     "actIds": [
//       "d0f69e"
//     ]
//   },
//   {
//     "ruleId": "valid-lang",
//     "description": "Ensure lang attributes have valid values",
//     "help": "lang attribute must have a valid value",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/valid-lang?application=axeAPI",
//     "tags": [
//       "cat.language",
//       "wcag2aa",
//       "wcag312",
//       "TTv5",
//       "TT11.b",
//       "EN-301-549",
//       "EN-9.3.1.2",
//       "ACT"
//     ],
//     "actIds": [
//       "de46e4"
//     ]
//   },
//   {
//     "ruleId": "video-caption",
//     "description": "Ensure <video> elements have captions",
//     "help": "<video> elements must have captions",
//     "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/video-caption?application=axeAPI",
//     "tags": [
//       "cat.text-alternatives",
//       "wcag2a",
//       "wcag122",
//       "section508",
//       "section508.22.a",
//       "TTv5",
//       "TT17.a",
//       "EN-301-549",
//       "EN-9.1.2.2"
//     ],
//     "actIds": [
//       "eac66b"
//     ]
//   }
// ]
