const kbMap = {
  'baseUrl': 'http://kb.daisy.org/publishing/',
  'map': {

    //   {
    //       "ruleId": "accesskeys",
    //       "description": "Ensures every accesskey attribute value is unique",
    //       "help": "accesskey attribute value must be unique",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/accesskeys?application=axeAPI",
    //       "tags": [
    //           "best-practice",
    //           "cat.keyboard"
    //       ]
    //   },
    'accesskeys': {url: 'docs/html/accesskeys.html', title: localize("kb.accesskeys")},

    //   {
    //       "ruleId": "area-alt",
    //       "description": "Ensures <area> elements of image maps have alternate text",
    //       "help": "Active <area> elements must have alternate text",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/area-alt?application=axeAPI",
    //       "tags": [
    //           "cat.text-alternatives",
    //           "wcag2a",
    //           "wcag111",
    //           "section508",
    //           "section508.22.a"
    //       ]
    //   },
    'area-alt': {url: 'docs/html/maps.html', title: localize("kb.area-alt")},

    //   {
    //       "ruleId": "aria-allowed-attr",
    //       "description": "Ensures ARIA attributes are allowed for an element's role",
    //       "help": "Elements must only use allowed ARIA attributes",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-allowed-attr?application=axeAPI",
    //       "tags": [
    //           "cat.aria",
    //           "wcag2a",
    //           "wcag412"
    //       ]
    //   },
    'aria-allowed-attr': {url: 'docs/script/aria.html', title: localize("kb.aria-allowed-attr")},

    //   {
    //       "ruleId": "aria-allowed-role",
    //       "description": "Ensures role attribute has an appropriate value for the element",
    //       "help": "ARIA role must be appropriate for the element",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-allowed-role?application=axeAPI",
    //       "tags": [
    //           "cat.aria",
    //           "best-practice"
    //       ]
    //   },
    'aria-allowed-role': {url: 'docs/script/aria.html', title: localize("kb.aria-allowed-attr")},

    //   {
    //       "ruleId": "aria-dpub-role-fallback",
    //       "description": "Ensures unsupported DPUB roles are only used on elements with implicit fallback roles",
    //       "help": "Unsupported DPUB ARIA roles should be used on elements with implicit fallback roles",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-dpub-role-fallback?application=axeAPI",
    //       "tags": [
    //           "cat.aria",
    //           "wcag2a",
    //           "wcag131"
    //       ]
    //   },
    'aria-dpub-role-fallback': {url: 'docs/script/aria.html', title: localize("kb.aria-allowed-attr")},

    //   {
    //       "ruleId": "aria-hidden-body",
    //       "description": "Ensures aria-hidden='true' is not present on the document body.",
    //       "help": "aria-hidden='true' must not be present on the document body",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-hidden-body?application=axeAPI",
    //       "tags": [
    //           "cat.aria",
    //           "wcag2a",
    //           "wcag412"
    //       ]
    //   },
    'aria-hidden-body': {url: 'docs/script/aria.html', title: localize("kb.aria-hidden-body")},

    //   {
    //       "ruleId": "aria-hidden-focus",
    //       "description": "Ensures aria-hidden elements do not contain focusable elements",
    //       "help": "ARIA hidden element must not contain focusable elements",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-hidden-focus?application=axeAPI",
    //       "tags": [
    //           "cat.name-role-value",
    //           "wcag2a",
    //           "wcag412",
    //           "wcag131"
    //       ]
    //   },
    'aria-hidden-focus': {url: 'docs/script/aria.html', title: localize("kb.aria-hidden-body")},

    //   {
    //       "ruleId": "aria-input-field-name",
    //       "description": "Ensures every ARIA input field has an accessible name",
    //       "help": "ARIA input fields have an accessible name",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-input-field-name?application=axeAPI",
    //       "tags": [
    //           "wcag2a",
    //           "wcag412"
    //       ]
    //   },
    'aria-input-field-name': {url: 'docs/script/aria.html', title: localize("kb.aria-hidden-body")},

    //   {
    //       "ruleId": "aria-required-attr",
    //       "description": "Ensures elements with ARIA roles have all required ARIA attributes",
    //       "help": "Required ARIA attributes must be provided",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-required-attr?application=axeAPI",
    //       "tags": [
    //           "cat.aria",
    //           "wcag2a",
    //           "wcag412"
    //       ]
    //   },
    'aria-required-attr': {url: 'docs/script/aria.html', title: localize("kb.aria-required-attr")},

    //   {
    //       "ruleId": "aria-required-children",
    //       "description": "Ensures elements with an ARIA role that require child roles contain them",
    //       "help": "Certain ARIA roles must contain particular children",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-required-children?application=axeAPI",
    //       "tags": [
    //           "cat.aria",
    //           "wcag2a",
    //           "wcag131"
    //       ]
    //   },
    'aria-required-children': {url: 'docs/script/aria.html', title: localize("kb.aria-required-children")},

    //   {
    //       "ruleId": "aria-required-parent",
    //       "description": "Ensures elements with an ARIA role that require parent roles are contained by them",
    //       "help": "Certain ARIA roles must be contained by particular parents",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-required-parent?application=axeAPI",
    //       "tags": [
    //           "cat.aria",
    //           "wcag2a",
    //           "wcag131"
    //       ]
    //   },
    'aria-required-parent': {url: 'docs/script/aria.html', title: localize("kb.aria-required-parent")},

    //   {
    //       "ruleId": "aria-roledescription",
    //       "description": "Ensure aria-roledescription is only used on elements with an implicit or explicit role",
    //       "help": "Use aria-roledescription on elements with a semantic role",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-roledescription?application=axeAPI",
    //       "tags": [
    //           "cat.aria",
    //           "wcag2a",
    //           "wcag412"
    //       ]
    //   },
    'aria-roledescription': {url: 'docs/script/aria.html', title: localize("kb.aria-required-parent")},

    //   {
    //       "ruleId": "aria-roles",
    //       "description": "Ensures all elements with a role attribute use a valid value",
    //       "help": "ARIA roles used must conform to valid values",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-roles?application=axeAPI",
    //       "tags": [
    //           "cat.aria",
    //           "wcag2a",
    //           "wcag412"
    //       ]
    //   },
    'aria-roles': {url: 'docs/script/aria.html', title: localize("kb.aria-roles")},

    //   {
    //       "ruleId": "aria-toggle-field-name",
    //       "description": "Ensures every ARIA toggle field has an accessible name",
    //       "help": "ARIA toggle fields have an accessible name",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-toggle-field-name?application=axeAPI",
    //       "tags": [
    //           "wcag2a",
    //           "wcag412"
    //       ]
    //   },
    'aria-toggle-field-name': {url: 'docs/script/aria.html', title: localize("kb.aria-roles")},

    //   {
    //       "ruleId": "aria-valid-attr-value",
    //       "description": "Ensures all ARIA attributes have valid values",
    //       "help": "ARIA attributes must conform to valid values",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-valid-attr-value?application=axeAPI",
    //       "tags": [
    //           "cat.aria",
    //           "wcag2a",
    //           "wcag412"
    //       ]
    //   },
    'aria-valid-attr-value': {url: 'docs/script/aria.html', title: localize("kb.aria-valid-attr-value")},

    //   {
    //       "ruleId": "aria-valid-attr",
    //       "description": "Ensures attributes that begin with aria- are valid ARIA attributes",
    //       "help": "ARIA attributes must conform to valid names",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-valid-attr?application=axeAPI",
    //       "tags": [
    //           "cat.aria",
    //           "wcag2a",
    //           "wcag412"
    //       ]
    //   },
    'aria-valid-attr': {url: 'docs/script/aria.html', title: localize("kb.aria-valid-attr")},

    //   {
    //       "ruleId": "audio-caption",
    //       "description": "Ensures <audio> elements have captions",
    //       "help": "<audio> elements must have a captions track",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/audio-caption?application=axeAPI",
    //       "tags": [
    //           "cat.time-and-media",
    //           "wcag2a",
    //           "wcag121",
    //           "section508",
    //           "section508.22.a"
    //       ]
    //   },
    'audio-caption': {url: 'docs/html/audio.html', title: localize("kb.audio-caption")},

    //   {
    //       "ruleId": "autocomplete-valid",
    //       "description": "Ensure the autocomplete attribute is correct and suitable for the form field",
    //       "help": "autocomplete attribute must be used correctly",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/autocomplete-valid?application=axeAPI",
    //       "tags": [
    //           "cat.forms",
    //           "wcag21aa",
    //           "wcag135"
    //       ]
    //   },
    'autocomplete-valid': {url: 'docs/html/forms.html', title: localize("kb.button-name")},

    //   {
    //       "ruleId": "avoid-inline-spacing",
    //       "description": "Ensure that text spacing set through style attributes can be adjusted with custom stylesheets",
    //       "help": "Inline text spacing must be adjustable with custom stylesheets",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/avoid-inline-spacing?application=axeAPI",
    //       "tags": [
    //           "wcag21aa",
    //           "wcag1412"
    //       ]
    //   },
    'avoid-inline-spacing': {url: 'docs/html/separation.html', title: localize("kb.style")},

    //   {
    //       "ruleId": "blink",
    //       "description": "Ensures <blink> elements are not used",
    //       "help": "<blink> elements are deprecated and must not be used",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/blink?application=axeAPI",
    //       "tags": [
    //           "cat.time-and-media",
    //           "wcag2a",
    //           "wcag222",
    //           "section508",
    //           "section508.22.j"
    //       ]
    //   },
    'blink': {url: 'docs/html/separation.html', title: localize("kb.style")},

    //   {
    //       "ruleId": "input-button-name",
    //       "description": "Ensures input buttons have discernible text",
    //       "help": "Input buttons must have discernible text",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/input-button-name?application=axeAPI",
    //       "tags": [
    //           "cat.name-role-value",
    //           "wcag2a",
    //           "wcag412",
    //           "section508",
    //           "section508.22.a"
    //       ]
    //   },
    'button-name': {url: 'docs/html/forms.html', title: localize("kb.button-name")},

    //   {
    //       "ruleId": "bypass",
    //       "description": "Ensures each page has at least one mechanism for a user to bypass navigation and jump straight to the content",
    //       "help": "Page must have means to bypass repeated blocks",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/bypass?application=axeAPI",
    //       "tags": [
    //           "cat.keyboard",
    //           "wcag2a",
    //           "wcag241",
    //           "section508",
    //           "section508.22.o"
    //       ]
    //   },
    'bypass': {url: 'docs/html/sections.html', title: localize("kb.link-name")},

    //   {
    //       "ruleId": "checkboxgroup",
    //       "description": "Ensures related <input type=\"checkbox\"> elements have a group and that the group designation is consistent",
    //       "help": "Checkbox inputs with the same name attribute value must be part of a group",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/checkboxgroup?application=axeAPI",
    //       "tags": [
    //           "cat.forms",
    //           "best-practice",
    //           "deprecated"
    //       ]
    //   },
    'checkboxgroup': {url: 'docs/html/forms.html', title: localize("kb.checkboxgroup")},

    //   {
    //       "ruleId": "color-contrast",
    //       "description": "Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds",
    //       "help": "Elements must have sufficient color contrast",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/color-contrast?application=axeAPI",
    //       "tags": [
    //           "cat.color",
    //           "wcag2aa",
    //           "wcag143"
    //       ]
    //   },
    'color-contrast': {url: 'docs/css/color.html', title: localize("kb.color-contrast")},

    //   {
    //       "ruleId": "css-orientation-lock",
    //       "description": "Ensures content is not locked to any specific display orientation, and the content is operable in all display orientations",
    //       "help": "CSS Media queries are not used to lock display orientation",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/css-orientation-lock?application=axeAPI",
    //       "tags": [
    //           "cat.structure",
    //           "wcag134",
    //           "wcag21aa",
    //           "experimental"
    //       ]
    //   },
    'css-orientation-lock': {url: 'docs/html/separation.html', title: localize("kb.style")},

    //   {
    //       "ruleId": "definition-list",
    //       "description": "Ensures <dl> elements are structured correctly",
    //       "help": "<dl> elements must only directly contain properly-ordered <dt> and <dd> groups, <script> or <template> elements",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/definition-list?application=axeAPI",
    //       "tags": [
    //           "cat.structure",
    //           "wcag2a",
    //           "wcag131"
    //       ]
    //   },
    'definition-list': {url: 'docs/html/lists.html', title: localize("kb.definition-list")},

    //   {
    //       "ruleId": "dlitem",
    //       "description": "Ensures <dt> and <dd> elements are contained by a <dl>",
    //       "help": "<dt> and <dd> elements must be contained by a <dl>",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/dlitem?application=axeAPI",
    //       "tags": [
    //           "cat.structure",
    //           "wcag2a",
    //           "wcag131"
    //       ]
    //   },
    'dlitem': {url: 'docs/html/lists.html', title: localize("kb.dlitem")},

    //   {
    //       "ruleId": "document-title",
    //       "description": "Ensures each HTML document contains a non-empty <title> element",
    //       "help": "Documents must have <title> element to aid in navigation",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/document-title?application=axeAPI",
    //       "tags": [
    //           "cat.text-alternatives",
    //           "wcag2a",
    //           "wcag242"
    //       ]
    //   },
    'document-title': {url: 'docs/html/title.html', title: localize("kb.document-title")},

    //   {
    //       "ruleId": "duplicate-id-active",
    //       "description": "Ensures every id attribute value of active elements is unique",
    //       "help": "IDs of active elements must be unique",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/duplicate-id-active?application=axeAPI",
    //       "tags": [
    //           "cat.parsing",
    //           "wcag2a",
    //           "wcag411"
    //       ]
    //   },
    'duplicate-id-active': {url: 'docs/html/ids.html', title: localize("kb.duplicate-id")},

    //   {
    //       "ruleId": "duplicate-id-aria",
    //       "description": "Ensures every id attribute value used in ARIA and in labels is unique",
    //       "help": "IDs used in ARIA and labels must be unique",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/duplicate-id-aria?application=axeAPI",
    //       "tags": [
    //           "cat.parsing",
    //           "wcag2a",
    //           "wcag411"
    //       ]
    //   },
    'duplicate-id-aria': {url: 'docs/html/ids.html', title: localize("kb.duplicate-id")},

    //   {
    //       "ruleId": "duplicate-id",
    //       "description": "Ensures every id attribute value is unique",
    //       "help": "id attribute value must be unique",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/duplicate-id?application=axeAPI",
    //       "tags": [
    //           "cat.parsing",
    //           "wcag2a",
    //           "wcag411"
    //       ]
    //   },
    'duplicate-id': {url: 'docs/html/ids.html', title: localize("kb.duplicate-id")},

    //   {
    //       "ruleId": "empty-heading",
    //       "description": "Ensures headings have discernible text",
    //       "help": "Headings must not be empty",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/empty-heading?application=axeAPI",
    //       "tags": [
    //           "cat.name-role-value",
    //           "best-practice"
    //       ]
    //   },
    'empty-heading': {url: 'docs/html/headings.html', title: localize("kb.empty-heading")},

    //   {
    //       "ruleId": "focus-order-semantics",
    //       "description": "Ensures elements in the focus order have an appropriate role",
    //       "help": "Elements in the focus order need a role appropriate for interactive content",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/focus-order-semantics?application=axeAPI",
    //       "tags": [
    //           "cat.keyboard",
    //           "best-practice",
    //           "experimental"
    //       ]
    //   },
    'focus-order-semantics': {url: 'docs/script/aria.html', title: localize("kb.aria-hidden-body")},

    //   {
    //       "ruleId": "form-field-multiple-labels",
    //       "description": "Ensures form field does not have multiple label elements",
    //       "help": "Form field should not have multiple label elements",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/form-field-multiple-labels?application=axeAPI",
    //       "tags": [
    //           "cat.forms",
    //           "wcag2a",
    //           "wcag332"
    //       ]
    //   },
    'form-field-multiple-labels': {url: 'docs/html/forms.html', title: localize("kb.label-title-only")},

    //   {
    //       "ruleId": "frame-tested",
    //       "description": "Ensures <iframe> and <frame> elements contain the axe-core script",
    //       "help": "Frames must be tested with axe-core",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/frame-tested?application=axeAPI",
    //       "tags": [
    //           "cat.structure",
    //           "review-item",
    //           "best-practice"
    //       ]
    //   },
    'frame-tested': {url: 'docs/html/iframes.html', title: localize("kb.frame-title-unique")},

    //   {
    //       "ruleId": "frame-title-unique",
    //       "description": "Ensures <iframe> and <frame> elements contain a unique title attribute",
    //       "help": "Frames must have a unique title attribute",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/frame-title-unique?application=axeAPI",
    //       "tags": [
    //           "cat.text-alternatives",
    //           "best-practice"
    //       ]
    //   },
    'frame-title-unique': {url: 'docs/html/iframes.html', title: localize("kb.frame-title-unique")},

    //   {
    //       "ruleId": "frame-title",
    //       "description": "Ensures <iframe> and <frame> elements contain a non-empty title attribute",
    //       "help": "Frames must have title attribute",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/frame-title?application=axeAPI",
    //       "tags": [
    //           "cat.text-alternatives",
    //           "wcag2a",
    //           "wcag241",
    //           "wcag412",
    //           "section508",
    //           "section508.22.i"
    //       ]
    //   },
    'frame-title': {url: 'docs/html/iframes.html', title: localize("kb.frame-title")},

    //   {
    //       "ruleId": "heading-order",
    //       "description": "Ensures the order of headings is semantically correct",
    //       "help": "Heading levels should only increase by one",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/heading-order?application=axeAPI",
    //       "tags": [
    //           "cat.semantics",
    //           "best-practice"
    //       ]
    //   },
    'heading-order': {url: 'docs/html/headings.html', title: localize("kb.heading-order")},

    //   {
    //       "ruleId": "hidden-content",
    //       "description": "Informs users about hidden content.",
    //       "help": "Hidden content on the page cannot be analyzed",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/hidden-content?application=axeAPI",
    //       "tags": [
    //           "cat.structure",
    //           "experimental",
    //           "review-item",
    //           "best-practice"
    //       ]
    //   },
    'hidden-content': {url: 'docs/html/separation.html', title: localize("kb.style")},

    //   {
    //       "ruleId": "html-has-lang",
    //       "description": "Ensures every HTML document has a lang attribute",
    //       "help": "<html> element must have a lang attribute",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/html-has-lang?application=axeAPI",
    //       "tags": [
    //           "cat.language",
    //           "wcag2a",
    //           "wcag311"
    //       ]
    //   },
    'html-has-lang': {url: 'docs/html/lang.html', title: localize("kb.html-has-lang")},

    //   {
    //       "ruleId": "html-lang-valid",
    //       "description": "Ensures the lang attribute of the <html> element has a valid value",
    //       "help": "<html> element must have a valid value for the lang attribute",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/html-lang-valid?application=axeAPI",
    //       "tags": [
    //           "cat.language",
    //           "wcag2a",
    //           "wcag311"
    //       ]
    //   },
    'html-lang-valid': {url: 'docs/html/lang.html', title: localize("kb.html-lang-valid")},

    //   {
    //       "ruleId": "html-xml-lang-mismatch",
    //       "description": "Ensure that HTML elements with both valid lang and xml:lang attributes agree on the base language of the page",
    //       "help": "HTML elements with lang and xml:lang must have the same base language",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/html-xml-lang-mismatch?application=axeAPI",
    //       "tags": [
    //           "cat.language",
    //           "wcag2a",
    //           "wcag311"
    //       ]
    //   },
    'html-xml-lang-mismatch': {url: 'docs/html/lang.html', title: localize("kb.html-lang-valid")},

    //   {
    //       "ruleId": "image-alt",
    //       "description": "Ensures <img> elements have alternate text or a role of none or presentation",
    //       "help": "Images must have alternate text",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/image-alt?application=axeAPI",
    //       "tags": [
    //           "cat.text-alternatives",
    //           "wcag2a",
    //           "wcag111",
    //           "section508",
    //           "section508.22.a"
    //       ]
    //   },
    'image-alt': {url: 'docs/html/images.html', title: localize("kb.image-alt")},

    //   {
    //       "ruleId": "image-redundant-alt",
    //       "description": "Ensure image alternative is not repeated as text",
    //       "help": "Alternative text of images should not be repeated as text",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/image-redundant-alt?application=axeAPI",
    //       "tags": [
    //           "cat.text-alternatives",
    //           "best-practice"
    //       ]
    //   },
    'image-redundant-alt': {url: 'docs/html/images.html', title: localize("kb.image-redundant-alt")},

    //   {
    //       "ruleId": "input-image-alt",
    //       "description": "Ensures <input type=\"image\"> elements have alternate text",
    //       "help": "Image buttons must have alternate text",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/input-image-alt?application=axeAPI",
    //       "tags": [
    //           "cat.text-alternatives",
    //           "wcag2a",
    //           "wcag111",
    //           "section508",
    //           "section508.22.a"
    //       ]
    //   },
    'input-image-alt': {url: 'docs/html/images.html', title: localize("kb.input-image-alt")},

    //   {
    //       "ruleId": "label-content-name-mismatch",
    //       "description": "Ensures that elements labelled through their content must have their visible text as part of their accessible name",
    //       "help": "Elements must have their visible text as part of their accessible name",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/label-content-name-mismatch?application=axeAPI",
    //       "tags": [
    //           "wcag21a",
    //           "wcag253",
    //           "experimental"
    //       ]
    //   },
    'label-content-name-mismatch': {url: 'docs/html/forms.html', title: localize("kb.label-title-only")},

    //   {
    //       "ruleId": "label-title-only",
    //       "description": "Ensures that every form element is not solely labeled using the title or aria-describedby attributes",
    //       "help": "Form elements should have a visible label",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/label-title-only?application=axeAPI",
    //       "tags": [
    //           "cat.forms",
    //           "best-practice"
    //       ]
    //   },
    'label-title-only': {url: 'docs/html/forms.html', title: localize("kb.label-title-only")},

    //   {
    //       "ruleId": "label",
    //       "description": "Ensures every form element has a label",
    //       "help": "Form elements must have labels",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/label?application=axeAPI",
    //       "tags": [
    //           "cat.forms",
    //           "wcag2a",
    //           "wcag332",
    //           "wcag131",
    //           "section508",
    //           "section508.22.n"
    //       ]
    //   },
    'label': {url: 'docs/html/forms.html', title: localize("kb.label")},

    //   {
    //       "ruleId": "landmark-banner-is-top-level",
    //       "description": "Ensures the banner landmark is at top level",
    //       "help": "Banner landmark must not be contained in another landmark",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/landmark-banner-is-top-level?application=axeAPI",
    //       "tags": [
    //           "cat.semantics",
    //           "best-practice"
    //       ]
    //   },
    'landmark-banner-is-top-level': {url: 'docs/script/aria.html', title: localize("kb.aria-valid-attr")},

    //   {
    //       "ruleId": "landmark-complementary-is-top-level",
    //       "description": "Ensures the complementary landmark or aside is at top level",
    //       "help": "Aside must not be contained in another landmark",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/landmark-complementary-is-top-level?application=axeAPI",
    //       "tags": [
    //           "cat.semantics",
    //           "best-practice"
    //       ]
    //   },
    'landmark-complementary-is-top-level': {url: 'docs/script/aria.html', title: localize("kb.aria-valid-attr")},

    //   {
    //       "ruleId": "landmark-contentinfo-is-top-level",
    //       "description": "Ensures the contentinfo landmark is at top level",
    //       "help": "Contentinfo landmark must not be contained in another landmark",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/landmark-contentinfo-is-top-level?application=axeAPI",
    //       "tags": [
    //           "cat.semantics",
    //           "best-practice"
    //       ]
    //   },
    'landmark-contentinfo-is-top-level': {url: 'docs/script/aria.html', title: localize("kb.aria-valid-attr")},

    //   {
    //       "ruleId": "landmark-main-is-top-level",
    //       "description": "Ensures the main landmark is at top level",
    //       "help": "Main landmark must not be contained in another landmark",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/landmark-main-is-top-level?application=axeAPI",
    //       "tags": [
    //           "cat.semantics",
    //           "best-practice"
    //       ]
    //   },
    'landmark-main-is-top-level': {url: 'docs/script/aria.html', title: localize("kb.aria-valid-attr")},

    //   {
    //       "ruleId": "landmark-no-duplicate-banner",
    //       "description": "Ensures the document has at most one banner landmark",
    //       "help": "Document must not have more than one banner landmark",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/landmark-no-duplicate-banner?application=axeAPI",
    //       "tags": [
    //           "cat.semantics",
    //           "best-practice"
    //       ]
    //   },
    'landmark-no-duplicate-banner': {url: 'docs/script/aria.html', title: localize("kb.aria-valid-attr")},

    //   {
    //       "ruleId": "landmark-no-duplicate-contentinfo",
    //       "description": "Ensures the document has at most one contentinfo landmark",
    //       "help": "Document must not have more than one contentinfo landmark",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/landmark-no-duplicate-contentinfo?application=axeAPI",
    //       "tags": [
    //           "cat.semantics",
    //           "best-practice"
    //       ]
    //   },
    'landmark-no-duplicate-contentinfo': {url: 'docs/script/aria.html', title: localize("kb.aria-valid-attr")},

    //   {
    //       "ruleId": "landmark-one-main",
    //       "description": "Ensures the document has only one main landmark and each iframe in the page has at most one main landmark",
    //       "help": "Document must have one main landmark",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/landmark-one-main?application=axeAPI",
    //       "tags": [
    //           "cat.semantics",
    //           "best-practice"
    //       ]
    //   },
    'landmark-one-main': {url: 'docs/script/aria.html', title: localize("kb.aria-valid-attr")},

    //   {
    //       "ruleId": "landmark-unique",
    //       "description": "Landmarks must have a unique role or role/label/title (i.e. accessible name) combination",
    //       "help": "Ensures landmarks are unique",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/landmark-unique?application=axeAPI",
    //       "tags": [
    //           "cat.semantics",
    //           "best-practice"
    //       ]
    //   },
    'landmark-unique': {url: 'docs/script/aria.html', title: localize("kb.aria-valid-attr")},

    //   {
    //       "ruleId": "layout-table",
    //       "description": "Ensures presentational <table> elements do not use <th>, <caption> elements or the summary attribute",
    //       "help": "Layout tables must not use data table elements",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/layout-table?application=axeAPI",
    //       "tags": [
    //           "cat.semantics",
    //           "wcag2a",
    //           "wcag131"
    //       ]
    //   },
    'layout-table': {url: 'docs/html/tables.html', title: localize("kb.layout-table")},

    //   {
    //       "ruleId": "link-in-text-block",
    //       "description": "Links can be distinguished without relying on color",
    //       "help": "Links must be distinguished from surrounding text in a way that does not rely on color",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/link-in-text-block?application=axeAPI",
    //       "tags": [
    //           "cat.color",
    //           "experimental",
    //           "wcag2a",
    //           "wcag141"
    //       ]
    //   },
    'link-in-text-block': {url: 'docs/html/links.html', title: localize("kb.link-in-text-block")},

    //   {
    //       "ruleId": "link-name",
    //       "description": "Ensures links have discernible text",
    //       "help": "Links must have discernible text",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/link-name?application=axeAPI",
    //       "tags": [
    //           "cat.name-role-value",
    //           "wcag2a",
    //           "wcag412",
    //           "wcag244",
    //           "section508",
    //           "section508.22.a"
    //       ]
    //   },
    'link-name': {url: 'docs/html/links.html', title: localize("kb.link-name")},

    //   {
    //       "ruleId": "list",
    //       "description": "Ensures that lists are structured correctly",
    //       "help": "<ul> and <ol> must only directly contain <li>, <script> or <template> elements",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/list?application=axeAPI",
    //       "tags": [
    //           "cat.structure",
    //           "wcag2a",
    //           "wcag131"
    //       ]
    //   },
    'list': {url: 'docs/html/lists.html', title: localize("kb.list")},

    //   {
    //       "ruleId": "listitem",
    //       "description": "Ensures <li> elements are used semantically",
    //       "help": "<li> elements must be contained in a <ul> or <ol>",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/listitem?application=axeAPI",
    //       "tags": [
    //           "cat.structure",
    //           "wcag2a",
    //           "wcag131"
    //       ]
    //   },
    'listitem': {url: 'docs/html/lists.html', title: localize("kb.listitem")},

    //   {
    //       "ruleId": "marquee",
    //       "description": "Ensures <marquee> elements are not used",
    //       "help": "<marquee> elements are deprecated and must not be used",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/marquee?application=axeAPI",
    //       "tags": [
    //           "cat.parsing",
    //           "wcag2a",
    //           "wcag222"
    //       ]
    //   },
    'marquee': {url: 'docs/html/separation.html', title: localize("kb.style")},

    //   {
    //       "ruleId": "meta-refresh",
    //       "description": "Ensures <meta http-equiv=\"refresh\"> is not used",
    //       "help": "Timed refresh must not exist",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/meta-refresh?application=axeAPI",
    //       "tags": [
    //           "cat.time-and-media",
    //           "wcag2a",
    //           "wcag2aaa",
    //           "wcag221",
    //           "wcag224",
    //           "wcag325"
    //       ]
    //   },
    'meta-refresh': {url: 'docs/html/meta.html', title: localize("kb.meta-refresh")},

    //   {
    //       "ruleId": "meta-viewport-large",
    //       "description": "Ensures <meta name=\"viewport\"> can scale a significant amount",
    //       "help": "Users should be able to zoom and scale the text up to 500%",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/meta-viewport-large?application=axeAPI",
    //       "tags": [
    //           "cat.sensory-and-visual-cues",
    //           "best-practice"
    //       ]
    //   },
    'meta-viewport-large': {url: 'docs/html/meta.html', title: localize("kb.meta-viewport-large")},

    //   {
    //       "ruleId": "meta-viewport",
    //       "description": "Ensures <meta name=\"viewport\"> does not disable text scaling and zooming",
    //       "help": "Zooming and scaling must not be disabled",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/meta-viewport?application=axeAPI",
    //       "tags": [
    //           "cat.sensory-and-visual-cues",
    //           "wcag2aa",
    //           "wcag144"
    //       ]
    //   },
    'meta-viewport': {url: 'docs/html/meta.html', title: localize("kb.meta-viewport")},

    //   {
    //       "ruleId": "object-alt",
    //       "description": "Ensures <object> elements have alternate text",
    //       "help": "<object> elements must have alternate text",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/object-alt?application=axeAPI",
    //       "tags": [
    //           "cat.text-alternatives",
    //           "wcag2a",
    //           "wcag111",
    //           "section508",
    //           "section508.22.a"
    //       ]
    //   },
    'object-alt': {url: 'docs/html/object.html', title: localize("kb.object-alt")},

    //   {
    //       "ruleId": "p-as-heading",
    //       "description": "Ensure p elements are not used to style headings",
    //       "help": "Bold, italic text and font-size are not used to style p elements as a heading",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/p-as-heading?application=axeAPI",
    //       "tags": [
    //           "cat.semantics",
    //           "wcag2a",
    //           "wcag131",
    //           "experimental"
    //       ]
    //   },
    'p-as-heading': {url: 'docs/html/headings.html', title: localize("kb.p-as-heading")},

    //   {
    //       "ruleId": "page-has-heading-one",
    //       "description": "Ensure that the page, or at least one of its frames contains a level-one heading",
    //       "help": "Page must contain a level-one heading",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/page-has-heading-one?application=axeAPI",
    //       "tags": [
    //           "cat.semantics",
    //           "best-practice"
    //       ]
    //   },
    'page-has-heading-one': {url: 'docs/html/headings.html', title: localize("kb.p-as-heading")},

    //   {
    //       "ruleId": "radiogroup",
    //       "description": "Ensures related <input type=\"radio\"> elements have a group and that the group designation is consistent",
    //       "help": "Radio inputs with the same name attribute value must be part of a group",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/radiogroup?application=axeAPI",
    //       "tags": [
    //           "cat.forms",
    //           "best-practice",
    //           "deprecated"
    //       ]
    //   },
    'radiogroup': {url: 'docs/html/forms.html', title: localize("kb.radiogroup")},

    //   {
    //       "ruleId": "region",
    //       "description": "Ensures all page content is contained by landmarks",
    //       "help": "All page content must be contained by landmarks",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/region?application=axeAPI",
    //       "tags": [
    //           "cat.keyboard",
    //           "best-practice"
    //       ]
    //   },
    'region': {url: 'docs/script/aria.html', title: localize("kb.aria-valid-attr")},

    //   {
    //       "ruleId": "role-img-alt",
    //       "description": "Ensures [role='img'] elements have alternate text",
    //       "help": "[role='img'] elements have an alternative text",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/role-img-alt?application=axeAPI",
    //       "tags": [
    //           "cat.text-alternatives",
    //           "wcag2a",
    //           "wcag111",
    //           "section508",
    //           "section508.22.a"
    //       ]
    //   },
    'role-img-alt': {url: 'docs/html/images.html', title: localize("kb.image-alt")},

    //   {
    //       "ruleId": "scope-attr-valid",
    //       "description": "Ensures the scope attribute is used correctly on tables",
    //       "help": "scope attribute should be used correctly",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/scope-attr-valid?application=axeAPI",
    //       "tags": [
    //           "cat.tables",
    //           "best-practice"
    //       ]
    //   },
    'scope-attr-valid': {url: 'docs/html/tables.html', title: localize("kb.scope-attr-valid")},

    //   {
    //       "ruleId": "scrollable-region-focusable",
    //       "description": "Elements that have scrollable content should be accessible by keyboard",
    //       "help": "Ensure that scrollable region has keyboard access",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/scrollable-region-focusable?application=axeAPI",
    //       "tags": [
    //           "wcag2a",
    //           "wcag211"
    //       ]
    //   },
    'scrollable-region-focusable': {url: 'docs/html/accesskeys.html', title: localize("kb.accesskeys")},

    //   {
    //       "ruleId": "server-side-image-map",
    //       "description": "Ensures that server-side image maps are not used",
    //       "help": "Server-side image maps must not be used",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/server-side-image-map?application=axeAPI",
    //       "tags": [
    //           "cat.text-alternatives",
    //           "wcag2a",
    //           "wcag211",
    //           "section508",
    //           "section508.22.f"
    //       ]
    //   },
    'server-side-image-map': {url: 'docs/html/maps.html', title: localize("kb.server-side-image-map")},

    //   {
    //       "ruleId": "skip-link",
    //       "description": "Ensure all skip links have a focusable target",
    //       "help": "The skip-link target should exist and be focusable",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/skip-link?application=axeAPI",
    //       "tags": [
    //           "cat.keyboard",
    //           "best-practice"
    //       ]
    //   },
    'skip-link': {url: 'docs/html/links.html', title: localize("kb.link-name")},

    //   {
    //       "ruleId": "tabindex",
    //       "description": "Ensures tabindex attribute values are not greater than 0",
    //       "help": "Elements should not have tabindex greater than zero",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/tabindex?application=axeAPI",
    //       "tags": [
    //           "cat.keyboard",
    //           "best-practice"
    //       ]
    //   },
    'tabindex': {url: 'docs/html/accesskeys.html', title: localize("kb.accesskeys")},

    //   {
    //       "ruleId": "table-duplicate-name",
    //       "description": "Ensure that tables do not have the same summary and caption",
    //       "help": "The <caption> element should not contain the same text as the summary attribute",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/table-duplicate-name?application=axeAPI",
    //       "tags": [
    //           "cat.tables",
    //           "best-practice"
    //       ]
    //   },
    'table-duplicate-name': {url: 'docs/html/tables.html', title: localize("kb.table-duplicate-name")},

    //   {
    //       "ruleId": "table-fake-caption",
    //       "description": "Ensure that tables with a caption use the <caption> element.",
    //       "help": "Data or header cells should not be used to give caption to a data table.",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/table-fake-caption?application=axeAPI",
    //       "tags": [
    //           "cat.tables",
    //           "experimental",
    //           "wcag2a",
    //           "wcag131",
    //           "section508",
    //           "section508.22.g"
    //       ]
    //   },
    'table-fake-caption': {url: 'docs/html/tables.html', title: localize("kb.table-fake-caption")},

    //   {
    //       "ruleId": "td-has-header",
    //       "description": "Ensure that each non-empty data cell in a large table has one or more table headers",
    //       "help": "All non-empty td element in table larger than 3 by 3 must have an associated table header",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/td-has-header?application=axeAPI",
    //       "tags": [
    //           "cat.tables",
    //           "experimental",
    //           "wcag2a",
    //           "wcag131",
    //           "section508",
    //           "section508.22.g"
    //       ]
    //   },
    'td-has-header': {url: 'docs/html/tables.html', title: localize("kb.td-has-header")},

    //   {
    //       "ruleId": "td-headers-attr",
    //       "description": "Ensure that each cell in a table using the headers refers to another cell in that table",
    //       "help": "All cells in a table element that use the headers attribute must only refer to other cells of that same table",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/td-headers-attr?application=axeAPI",
    //       "tags": [
    //           "cat.tables",
    //           "wcag2a",
    //           "wcag131",
    //           "section508",
    //           "section508.22.g"
    //       ]
    //   },
    'td-headers-attr': {url: 'docs/html/tables.html', title: localize("kb.td-headers-attr")},

    //   {
    //       "ruleId": "th-has-data-cells",
    //       "description": "Ensure that each table header in a data table refers to data cells",
    //       "help": "All th elements and elements with role=columnheader/rowheader must have data cells they describe",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/th-has-data-cells?application=axeAPI",
    //       "tags": [
    //           "cat.tables",
    //           "wcag2a",
    //           "wcag131",
    //           "section508",
    //           "section508.22.g"
    //       ]
    //   },
    'th-has-data-cells': {url: 'docs/html/tables.html', title: localize("kb.th-has-data-cells")},

    //   {
    //       "ruleId": "valid-lang",
    //       "description": "Ensures lang attributes have valid values",
    //       "help": "lang attribute must have a valid value",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/valid-lang?application=axeAPI",
    //       "tags": [
    //           "cat.language",
    //           "wcag2aa",
    //           "wcag312"
    //       ]
    //   },
    'valid-lang': {url: 'docs/html/lang.html', title: localize("kb.valid-lang")},

    //   {
    //       "ruleId": "video-caption",
    //       "description": "Ensures <video> elements have captions",
    //       "help": "<video> elements must have captions",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/video-caption?application=axeAPI",
    //       "tags": [
    //           "cat.text-alternatives",
    //           "wcag2a",
    //           "wcag122",
    //           "section508",
    //           "section508.22.a"
    //       ]
    //   },
    'video-caption': {url: 'docs/html/video.html', title: localize("kb.video-caption")},

    //   {
    //       "ruleId": "video-description",
    //       "description": "Ensures <video> elements have audio descriptions",
    //       "help": "<video> elements must have an audio description track",
    //       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/video-description?application=axeAPI",
    //       "tags": [
    //           "cat.text-alternatives",
    //           "wcag2aa",
    //           "wcag125",
    //           "section508",
    //           "section508.22.b",
    //           "deprecated"
    //       ]
    //   }
    'video-description': {url: 'docs/html/video.html', title: localize("kb.video-description")},

    // FIXME: Axe does not implement this?
    'href-no-hash': {url: 'docs/html/links.html', title: localize("kb.href-no-hash")},

    // Ace-defined rules:
    'pagebreak-label': {url: 'docs/navigation/pagelist.html', title: localize("kb.pagebreak-label")},
    'epub-type-has-matching-role': {url: 'docs/html/roles.html', title: localize("kb.epub-type-has-matching-role")},
  }
};

module.exports.kbMap = kbMap;

// AXE CORE 3.4.0
// console.log(JSON.stringify(axe.getRules(), null, 4));
// =>
// [
//   {
//       "ruleId": "accesskeys",
//       "description": "Ensures every accesskey attribute value is unique",
//       "help": "accesskey attribute value must be unique",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/accesskeys?application=axeAPI",
//       "tags": [
//           "best-practice",
//           "cat.keyboard"
//       ]
//   },
//   {
//       "ruleId": "area-alt",
//       "description": "Ensures <area> elements of image maps have alternate text",
//       "help": "Active <area> elements must have alternate text",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/area-alt?application=axeAPI",
//       "tags": [
//           "cat.text-alternatives",
//           "wcag2a",
//           "wcag111",
//           "section508",
//           "section508.22.a"
//       ]
//   },
//   {
//       "ruleId": "aria-allowed-attr",
//       "description": "Ensures ARIA attributes are allowed for an element's role",
//       "help": "Elements must only use allowed ARIA attributes",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-allowed-attr?application=axeAPI",
//       "tags": [
//           "cat.aria",
//           "wcag2a",
//           "wcag412"
//       ]
//   },
//   {
//       "ruleId": "aria-allowed-role",
//       "description": "Ensures role attribute has an appropriate value for the element",
//       "help": "ARIA role must be appropriate for the element",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-allowed-role?application=axeAPI",
//       "tags": [
//           "cat.aria",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "aria-dpub-role-fallback",
//       "description": "Ensures unsupported DPUB roles are only used on elements with implicit fallback roles",
//       "help": "Unsupported DPUB ARIA roles should be used on elements with implicit fallback roles",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-dpub-role-fallback?application=axeAPI",
//       "tags": [
//           "cat.aria",
//           "wcag2a",
//           "wcag131"
//       ]
//   },
//   {
//       "ruleId": "aria-hidden-body",
//       "description": "Ensures aria-hidden='true' is not present on the document body.",
//       "help": "aria-hidden='true' must not be present on the document body",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-hidden-body?application=axeAPI",
//       "tags": [
//           "cat.aria",
//           "wcag2a",
//           "wcag412"
//       ]
//   },
//   {
//       "ruleId": "aria-hidden-focus",
//       "description": "Ensures aria-hidden elements do not contain focusable elements",
//       "help": "ARIA hidden element must not contain focusable elements",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-hidden-focus?application=axeAPI",
//       "tags": [
//           "cat.name-role-value",
//           "wcag2a",
//           "wcag412",
//           "wcag131"
//       ]
//   },
//   {
//       "ruleId": "aria-input-field-name",
//       "description": "Ensures every ARIA input field has an accessible name",
//       "help": "ARIA input fields have an accessible name",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-input-field-name?application=axeAPI",
//       "tags": [
//           "wcag2a",
//           "wcag412"
//       ]
//   },
//   {
//       "ruleId": "aria-required-attr",
//       "description": "Ensures elements with ARIA roles have all required ARIA attributes",
//       "help": "Required ARIA attributes must be provided",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-required-attr?application=axeAPI",
//       "tags": [
//           "cat.aria",
//           "wcag2a",
//           "wcag412"
//       ]
//   },
//   {
//       "ruleId": "aria-required-children",
//       "description": "Ensures elements with an ARIA role that require child roles contain them",
//       "help": "Certain ARIA roles must contain particular children",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-required-children?application=axeAPI",
//       "tags": [
//           "cat.aria",
//           "wcag2a",
//           "wcag131"
//       ]
//   },
//   {
//       "ruleId": "aria-required-parent",
//       "description": "Ensures elements with an ARIA role that require parent roles are contained by them",
//       "help": "Certain ARIA roles must be contained by particular parents",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-required-parent?application=axeAPI",
//       "tags": [
//           "cat.aria",
//           "wcag2a",
//           "wcag131"
//       ]
//   },
//   {
//       "ruleId": "aria-roledescription",
//       "description": "Ensure aria-roledescription is only used on elements with an implicit or explicit role",
//       "help": "Use aria-roledescription on elements with a semantic role",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-roledescription?application=axeAPI",
//       "tags": [
//           "cat.aria",
//           "wcag2a",
//           "wcag412"
//       ]
//   },
//   {
//       "ruleId": "aria-roles",
//       "description": "Ensures all elements with a role attribute use a valid value",
//       "help": "ARIA roles used must conform to valid values",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-roles?application=axeAPI",
//       "tags": [
//           "cat.aria",
//           "wcag2a",
//           "wcag412"
//       ]
//   },
//   {
//       "ruleId": "aria-toggle-field-name",
//       "description": "Ensures every ARIA toggle field has an accessible name",
//       "help": "ARIA toggle fields have an accessible name",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-toggle-field-name?application=axeAPI",
//       "tags": [
//           "wcag2a",
//           "wcag412"
//       ]
//   },
//   {
//       "ruleId": "aria-valid-attr-value",
//       "description": "Ensures all ARIA attributes have valid values",
//       "help": "ARIA attributes must conform to valid values",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-valid-attr-value?application=axeAPI",
//       "tags": [
//           "cat.aria",
//           "wcag2a",
//           "wcag412"
//       ]
//   },
//   {
//       "ruleId": "aria-valid-attr",
//       "description": "Ensures attributes that begin with aria- are valid ARIA attributes",
//       "help": "ARIA attributes must conform to valid names",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/aria-valid-attr?application=axeAPI",
//       "tags": [
//           "cat.aria",
//           "wcag2a",
//           "wcag412"
//       ]
//   },
//   {
//       "ruleId": "audio-caption",
//       "description": "Ensures <audio> elements have captions",
//       "help": "<audio> elements must have a captions track",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/audio-caption?application=axeAPI",
//       "tags": [
//           "cat.time-and-media",
//           "wcag2a",
//           "wcag121",
//           "section508",
//           "section508.22.a"
//       ]
//   },
//   {
//       "ruleId": "autocomplete-valid",
//       "description": "Ensure the autocomplete attribute is correct and suitable for the form field",
//       "help": "autocomplete attribute must be used correctly",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/autocomplete-valid?application=axeAPI",
//       "tags": [
//           "cat.forms",
//           "wcag21aa",
//           "wcag135"
//       ]
//   },
//   {
//       "ruleId": "avoid-inline-spacing",
//       "description": "Ensure that text spacing set through style attributes can be adjusted with custom stylesheets",
//       "help": "Inline text spacing must be adjustable with custom stylesheets",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/avoid-inline-spacing?application=axeAPI",
//       "tags": [
//           "wcag21aa",
//           "wcag1412"
//       ]
//   },
//   {
//       "ruleId": "blink",
//       "description": "Ensures <blink> elements are not used",
//       "help": "<blink> elements are deprecated and must not be used",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/blink?application=axeAPI",
//       "tags": [
//           "cat.time-and-media",
//           "wcag2a",
//           "wcag222",
//           "section508",
//           "section508.22.j"
//       ]
//   },
//   {
//       "ruleId": "button-name",
//       "description": "Ensures buttons have discernible text",
//       "help": "Buttons must have discernible text",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/button-name?application=axeAPI",
//       "tags": [
//           "cat.name-role-value",
//           "wcag2a",
//           "wcag412",
//           "section508",
//           "section508.22.a"
//       ]
//   },
//   {
//       "ruleId": "bypass",
//       "description": "Ensures each page has at least one mechanism for a user to bypass navigation and jump straight to the content",
//       "help": "Page must have means to bypass repeated blocks",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/bypass?application=axeAPI",
//       "tags": [
//           "cat.keyboard",
//           "wcag2a",
//           "wcag241",
//           "section508",
//           "section508.22.o"
//       ]
//   },
//   {
//       "ruleId": "checkboxgroup",
//       "description": "Ensures related <input type=\"checkbox\"> elements have a group and that the group designation is consistent",
//       "help": "Checkbox inputs with the same name attribute value must be part of a group",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/checkboxgroup?application=axeAPI",
//       "tags": [
//           "cat.forms",
//           "best-practice",
//           "deprecated"
//       ]
//   },
//   {
//       "ruleId": "color-contrast",
//       "description": "Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds",
//       "help": "Elements must have sufficient color contrast",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/color-contrast?application=axeAPI",
//       "tags": [
//           "cat.color",
//           "wcag2aa",
//           "wcag143"
//       ]
//   },
//   {
//       "ruleId": "css-orientation-lock",
//       "description": "Ensures content is not locked to any specific display orientation, and the content is operable in all display orientations",
//       "help": "CSS Media queries are not used to lock display orientation",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/css-orientation-lock?application=axeAPI",
//       "tags": [
//           "cat.structure",
//           "wcag134",
//           "wcag21aa",
//           "experimental"
//       ]
//   },
//   {
//       "ruleId": "definition-list",
//       "description": "Ensures <dl> elements are structured correctly",
//       "help": "<dl> elements must only directly contain properly-ordered <dt> and <dd> groups, <script> or <template> elements",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/definition-list?application=axeAPI",
//       "tags": [
//           "cat.structure",
//           "wcag2a",
//           "wcag131"
//       ]
//   },
//   {
//       "ruleId": "dlitem",
//       "description": "Ensures <dt> and <dd> elements are contained by a <dl>",
//       "help": "<dt> and <dd> elements must be contained by a <dl>",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/dlitem?application=axeAPI",
//       "tags": [
//           "cat.structure",
//           "wcag2a",
//           "wcag131"
//       ]
//   },
//   {
//       "ruleId": "document-title",
//       "description": "Ensures each HTML document contains a non-empty <title> element",
//       "help": "Documents must have <title> element to aid in navigation",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/document-title?application=axeAPI",
//       "tags": [
//           "cat.text-alternatives",
//           "wcag2a",
//           "wcag242"
//       ]
//   },
//   {
//       "ruleId": "duplicate-id-active",
//       "description": "Ensures every id attribute value of active elements is unique",
//       "help": "IDs of active elements must be unique",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/duplicate-id-active?application=axeAPI",
//       "tags": [
//           "cat.parsing",
//           "wcag2a",
//           "wcag411"
//       ]
//   },
//   {
//       "ruleId": "duplicate-id-aria",
//       "description": "Ensures every id attribute value used in ARIA and in labels is unique",
//       "help": "IDs used in ARIA and labels must be unique",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/duplicate-id-aria?application=axeAPI",
//       "tags": [
//           "cat.parsing",
//           "wcag2a",
//           "wcag411"
//       ]
//   },
//   {
//       "ruleId": "duplicate-id",
//       "description": "Ensures every id attribute value is unique",
//       "help": "id attribute value must be unique",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/duplicate-id?application=axeAPI",
//       "tags": [
//           "cat.parsing",
//           "wcag2a",
//           "wcag411"
//       ]
//   },
//   {
//       "ruleId": "empty-heading",
//       "description": "Ensures headings have discernible text",
//       "help": "Headings must not be empty",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/empty-heading?application=axeAPI",
//       "tags": [
//           "cat.name-role-value",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "focus-order-semantics",
//       "description": "Ensures elements in the focus order have an appropriate role",
//       "help": "Elements in the focus order need a role appropriate for interactive content",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/focus-order-semantics?application=axeAPI",
//       "tags": [
//           "cat.keyboard",
//           "best-practice",
//           "experimental"
//       ]
//   },
//   {
//       "ruleId": "form-field-multiple-labels",
//       "description": "Ensures form field does not have multiple label elements",
//       "help": "Form field should not have multiple label elements",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/form-field-multiple-labels?application=axeAPI",
//       "tags": [
//           "cat.forms",
//           "wcag2a",
//           "wcag332"
//       ]
//   },
//   {
//       "ruleId": "frame-tested",
//       "description": "Ensures <iframe> and <frame> elements contain the axe-core script",
//       "help": "Frames must be tested with axe-core",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/frame-tested?application=axeAPI",
//       "tags": [
//           "cat.structure",
//           "review-item",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "frame-title-unique",
//       "description": "Ensures <iframe> and <frame> elements contain a unique title attribute",
//       "help": "Frames must have a unique title attribute",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/frame-title-unique?application=axeAPI",
//       "tags": [
//           "cat.text-alternatives",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "frame-title",
//       "description": "Ensures <iframe> and <frame> elements contain a non-empty title attribute",
//       "help": "Frames must have title attribute",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/frame-title?application=axeAPI",
//       "tags": [
//           "cat.text-alternatives",
//           "wcag2a",
//           "wcag241",
//           "wcag412",
//           "section508",
//           "section508.22.i"
//       ]
//   },
//   {
//       "ruleId": "heading-order",
//       "description": "Ensures the order of headings is semantically correct",
//       "help": "Heading levels should only increase by one",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/heading-order?application=axeAPI",
//       "tags": [
//           "cat.semantics",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "hidden-content",
//       "description": "Informs users about hidden content.",
//       "help": "Hidden content on the page cannot be analyzed",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/hidden-content?application=axeAPI",
//       "tags": [
//           "cat.structure",
//           "experimental",
//           "review-item",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "html-has-lang",
//       "description": "Ensures every HTML document has a lang attribute",
//       "help": "<html> element must have a lang attribute",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/html-has-lang?application=axeAPI",
//       "tags": [
//           "cat.language",
//           "wcag2a",
//           "wcag311"
//       ]
//   },
//   {
//       "ruleId": "html-lang-valid",
//       "description": "Ensures the lang attribute of the <html> element has a valid value",
//       "help": "<html> element must have a valid value for the lang attribute",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/html-lang-valid?application=axeAPI",
//       "tags": [
//           "cat.language",
//           "wcag2a",
//           "wcag311"
//       ]
//   },
//   {
//       "ruleId": "html-xml-lang-mismatch",
//       "description": "Ensure that HTML elements with both valid lang and xml:lang attributes agree on the base language of the page",
//       "help": "HTML elements with lang and xml:lang must have the same base language",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/html-xml-lang-mismatch?application=axeAPI",
//       "tags": [
//           "cat.language",
//           "wcag2a",
//           "wcag311"
//       ]
//   },
//   {
//       "ruleId": "image-alt",
//       "description": "Ensures <img> elements have alternate text or a role of none or presentation",
//       "help": "Images must have alternate text",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/image-alt?application=axeAPI",
//       "tags": [
//           "cat.text-alternatives",
//           "wcag2a",
//           "wcag111",
//           "section508",
//           "section508.22.a"
//       ]
//   },
//   {
//       "ruleId": "image-redundant-alt",
//       "description": "Ensure image alternative is not repeated as text",
//       "help": "Alternative text of images should not be repeated as text",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/image-redundant-alt?application=axeAPI",
//       "tags": [
//           "cat.text-alternatives",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "input-button-name",
//       "description": "Ensures input buttons have discernible text",
//       "help": "Input buttons must have discernible text",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/input-button-name?application=axeAPI",
//       "tags": [
//           "cat.name-role-value",
//           "wcag2a",
//           "wcag412",
//           "section508",
//           "section508.22.a"
//       ]
//   },
//   {
//       "ruleId": "input-image-alt",
//       "description": "Ensures <input type=\"image\"> elements have alternate text",
//       "help": "Image buttons must have alternate text",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/input-image-alt?application=axeAPI",
//       "tags": [
//           "cat.text-alternatives",
//           "wcag2a",
//           "wcag111",
//           "section508",
//           "section508.22.a"
//       ]
//   },
//   {
//       "ruleId": "label-content-name-mismatch",
//       "description": "Ensures that elements labelled through their content must have their visible text as part of their accessible name",
//       "help": "Elements must have their visible text as part of their accessible name",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/label-content-name-mismatch?application=axeAPI",
//       "tags": [
//           "wcag21a",
//           "wcag253",
//           "experimental"
//       ]
//   },
//   {
//       "ruleId": "label-title-only",
//       "description": "Ensures that every form element is not solely labeled using the title or aria-describedby attributes",
//       "help": "Form elements should have a visible label",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/label-title-only?application=axeAPI",
//       "tags": [
//           "cat.forms",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "label",
//       "description": "Ensures every form element has a label",
//       "help": "Form elements must have labels",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/label?application=axeAPI",
//       "tags": [
//           "cat.forms",
//           "wcag2a",
//           "wcag332",
//           "wcag131",
//           "section508",
//           "section508.22.n"
//       ]
//   },
//   {
//       "ruleId": "landmark-banner-is-top-level",
//       "description": "Ensures the banner landmark is at top level",
//       "help": "Banner landmark must not be contained in another landmark",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/landmark-banner-is-top-level?application=axeAPI",
//       "tags": [
//           "cat.semantics",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "landmark-complementary-is-top-level",
//       "description": "Ensures the complementary landmark or aside is at top level",
//       "help": "Aside must not be contained in another landmark",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/landmark-complementary-is-top-level?application=axeAPI",
//       "tags": [
//           "cat.semantics",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "landmark-contentinfo-is-top-level",
//       "description": "Ensures the contentinfo landmark is at top level",
//       "help": "Contentinfo landmark must not be contained in another landmark",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/landmark-contentinfo-is-top-level?application=axeAPI",
//       "tags": [
//           "cat.semantics",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "landmark-main-is-top-level",
//       "description": "Ensures the main landmark is at top level",
//       "help": "Main landmark must not be contained in another landmark",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/landmark-main-is-top-level?application=axeAPI",
//       "tags": [
//           "cat.semantics",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "landmark-no-duplicate-banner",
//       "description": "Ensures the document has at most one banner landmark",
//       "help": "Document must not have more than one banner landmark",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/landmark-no-duplicate-banner?application=axeAPI",
//       "tags": [
//           "cat.semantics",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "landmark-no-duplicate-contentinfo",
//       "description": "Ensures the document has at most one contentinfo landmark",
//       "help": "Document must not have more than one contentinfo landmark",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/landmark-no-duplicate-contentinfo?application=axeAPI",
//       "tags": [
//           "cat.semantics",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "landmark-one-main",
//       "description": "Ensures the document has only one main landmark and each iframe in the page has at most one main landmark",
//       "help": "Document must have one main landmark",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/landmark-one-main?application=axeAPI",
//       "tags": [
//           "cat.semantics",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "landmark-unique",
//       "description": "Landmarks must have a unique role or role/label/title (i.e. accessible name) combination",
//       "help": "Ensures landmarks are unique",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/landmark-unique?application=axeAPI",
//       "tags": [
//           "cat.semantics",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "layout-table",
//       "description": "Ensures presentational <table> elements do not use <th>, <caption> elements or the summary attribute",
//       "help": "Layout tables must not use data table elements",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/layout-table?application=axeAPI",
//       "tags": [
//           "cat.semantics",
//           "wcag2a",
//           "wcag131"
//       ]
//   },
//   {
//       "ruleId": "link-in-text-block",
//       "description": "Links can be distinguished without relying on color",
//       "help": "Links must be distinguished from surrounding text in a way that does not rely on color",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/link-in-text-block?application=axeAPI",
//       "tags": [
//           "cat.color",
//           "experimental",
//           "wcag2a",
//           "wcag141"
//       ]
//   },
//   {
//       "ruleId": "link-name",
//       "description": "Ensures links have discernible text",
//       "help": "Links must have discernible text",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/link-name?application=axeAPI",
//       "tags": [
//           "cat.name-role-value",
//           "wcag2a",
//           "wcag412",
//           "wcag244",
//           "section508",
//           "section508.22.a"
//       ]
//   },
//   {
//       "ruleId": "list",
//       "description": "Ensures that lists are structured correctly",
//       "help": "<ul> and <ol> must only directly contain <li>, <script> or <template> elements",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/list?application=axeAPI",
//       "tags": [
//           "cat.structure",
//           "wcag2a",
//           "wcag131"
//       ]
//   },
//   {
//       "ruleId": "listitem",
//       "description": "Ensures <li> elements are used semantically",
//       "help": "<li> elements must be contained in a <ul> or <ol>",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/listitem?application=axeAPI",
//       "tags": [
//           "cat.structure",
//           "wcag2a",
//           "wcag131"
//       ]
//   },
//   {
//       "ruleId": "marquee",
//       "description": "Ensures <marquee> elements are not used",
//       "help": "<marquee> elements are deprecated and must not be used",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/marquee?application=axeAPI",
//       "tags": [
//           "cat.parsing",
//           "wcag2a",
//           "wcag222"
//       ]
//   },
//   {
//       "ruleId": "meta-refresh",
//       "description": "Ensures <meta http-equiv=\"refresh\"> is not used",
//       "help": "Timed refresh must not exist",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/meta-refresh?application=axeAPI",
//       "tags": [
//           "cat.time-and-media",
//           "wcag2a",
//           "wcag2aaa",
//           "wcag221",
//           "wcag224",
//           "wcag325"
//       ]
//   },
//   {
//       "ruleId": "meta-viewport-large",
//       "description": "Ensures <meta name=\"viewport\"> can scale a significant amount",
//       "help": "Users should be able to zoom and scale the text up to 500%",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/meta-viewport-large?application=axeAPI",
//       "tags": [
//           "cat.sensory-and-visual-cues",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "meta-viewport",
//       "description": "Ensures <meta name=\"viewport\"> does not disable text scaling and zooming",
//       "help": "Zooming and scaling must not be disabled",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/meta-viewport?application=axeAPI",
//       "tags": [
//           "cat.sensory-and-visual-cues",
//           "wcag2aa",
//           "wcag144"
//       ]
//   },
//   {
//       "ruleId": "object-alt",
//       "description": "Ensures <object> elements have alternate text",
//       "help": "<object> elements must have alternate text",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/object-alt?application=axeAPI",
//       "tags": [
//           "cat.text-alternatives",
//           "wcag2a",
//           "wcag111",
//           "section508",
//           "section508.22.a"
//       ]
//   },
//   {
//       "ruleId": "p-as-heading",
//       "description": "Ensure p elements are not used to style headings",
//       "help": "Bold, italic text and font-size are not used to style p elements as a heading",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/p-as-heading?application=axeAPI",
//       "tags": [
//           "cat.semantics",
//           "wcag2a",
//           "wcag131",
//           "experimental"
//       ]
//   },
//   {
//       "ruleId": "page-has-heading-one",
//       "description": "Ensure that the page, or at least one of its frames contains a level-one heading",
//       "help": "Page must contain a level-one heading",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/page-has-heading-one?application=axeAPI",
//       "tags": [
//           "cat.semantics",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "radiogroup",
//       "description": "Ensures related <input type=\"radio\"> elements have a group and that the group designation is consistent",
//       "help": "Radio inputs with the same name attribute value must be part of a group",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/radiogroup?application=axeAPI",
//       "tags": [
//           "cat.forms",
//           "best-practice",
//           "deprecated"
//       ]
//   },
//   {
//       "ruleId": "region",
//       "description": "Ensures all page content is contained by landmarks",
//       "help": "All page content must be contained by landmarks",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/region?application=axeAPI",
//       "tags": [
//           "cat.keyboard",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "role-img-alt",
//       "description": "Ensures [role='img'] elements have alternate text",
//       "help": "[role='img'] elements have an alternative text",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/role-img-alt?application=axeAPI",
//       "tags": [
//           "cat.text-alternatives",
//           "wcag2a",
//           "wcag111",
//           "section508",
//           "section508.22.a"
//       ]
//   },
//   {
//       "ruleId": "scope-attr-valid",
//       "description": "Ensures the scope attribute is used correctly on tables",
//       "help": "scope attribute should be used correctly",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/scope-attr-valid?application=axeAPI",
//       "tags": [
//           "cat.tables",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "scrollable-region-focusable",
//       "description": "Elements that have scrollable content should be accessible by keyboard",
//       "help": "Ensure that scrollable region has keyboard access",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/scrollable-region-focusable?application=axeAPI",
//       "tags": [
//           "wcag2a",
//           "wcag211"
//       ]
//   },
//   {
//       "ruleId": "server-side-image-map",
//       "description": "Ensures that server-side image maps are not used",
//       "help": "Server-side image maps must not be used",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/server-side-image-map?application=axeAPI",
//       "tags": [
//           "cat.text-alternatives",
//           "wcag2a",
//           "wcag211",
//           "section508",
//           "section508.22.f"
//       ]
//   },
//   {
//       "ruleId": "skip-link",
//       "description": "Ensure all skip links have a focusable target",
//       "help": "The skip-link target should exist and be focusable",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/skip-link?application=axeAPI",
//       "tags": [
//           "cat.keyboard",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "tabindex",
//       "description": "Ensures tabindex attribute values are not greater than 0",
//       "help": "Elements should not have tabindex greater than zero",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/tabindex?application=axeAPI",
//       "tags": [
//           "cat.keyboard",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "table-duplicate-name",
//       "description": "Ensure that tables do not have the same summary and caption",
//       "help": "The <caption> element should not contain the same text as the summary attribute",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/table-duplicate-name?application=axeAPI",
//       "tags": [
//           "cat.tables",
//           "best-practice"
//       ]
//   },
//   {
//       "ruleId": "table-fake-caption",
//       "description": "Ensure that tables with a caption use the <caption> element.",
//       "help": "Data or header cells should not be used to give caption to a data table.",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/table-fake-caption?application=axeAPI",
//       "tags": [
//           "cat.tables",
//           "experimental",
//           "wcag2a",
//           "wcag131",
//           "section508",
//           "section508.22.g"
//       ]
//   },
//   {
//       "ruleId": "td-has-header",
//       "description": "Ensure that each non-empty data cell in a large table has one or more table headers",
//       "help": "All non-empty td element in table larger than 3 by 3 must have an associated table header",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/td-has-header?application=axeAPI",
//       "tags": [
//           "cat.tables",
//           "experimental",
//           "wcag2a",
//           "wcag131",
//           "section508",
//           "section508.22.g"
//       ]
//   },
//   {
//       "ruleId": "td-headers-attr",
//       "description": "Ensure that each cell in a table using the headers refers to another cell in that table",
//       "help": "All cells in a table element that use the headers attribute must only refer to other cells of that same table",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/td-headers-attr?application=axeAPI",
//       "tags": [
//           "cat.tables",
//           "wcag2a",
//           "wcag131",
//           "section508",
//           "section508.22.g"
//       ]
//   },
//   {
//       "ruleId": "th-has-data-cells",
//       "description": "Ensure that each table header in a data table refers to data cells",
//       "help": "All th elements and elements with role=columnheader/rowheader must have data cells they describe",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/th-has-data-cells?application=axeAPI",
//       "tags": [
//           "cat.tables",
//           "wcag2a",
//           "wcag131",
//           "section508",
//           "section508.22.g"
//       ]
//   },
//   {
//       "ruleId": "valid-lang",
//       "description": "Ensures lang attributes have valid values",
//       "help": "lang attribute must have a valid value",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/valid-lang?application=axeAPI",
//       "tags": [
//           "cat.language",
//           "wcag2aa",
//           "wcag312"
//       ]
//   },
//   {
//       "ruleId": "video-caption",
//       "description": "Ensures <video> elements have captions",
//       "help": "<video> elements must have captions",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/video-caption?application=axeAPI",
//       "tags": [
//           "cat.text-alternatives",
//           "wcag2a",
//           "wcag122",
//           "section508",
//           "section508.22.a"
//       ]
//   },
//   {
//       "ruleId": "video-description",
//       "description": "Ensures <video> elements have audio descriptions",
//       "help": "<video> elements must have an audio description track",
//       "helpUrl": "https://dequeuniversity.com/rules/axe/3.4/video-description?application=axeAPI",
//       "tags": [
//           "cat.text-alternatives",
//           "wcag2aa",
//           "wcag125",
//           "section508",
//           "section508.22.b",
//           "deprecated"
//       ]
//   }
// ]
