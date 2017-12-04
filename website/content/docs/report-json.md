+++
title = "JSON Report"
weight = 4
wip = true
+++

Ace's outputs a machine-readable report in JSON format, detailing the automated tests. The vocabulary of this report is a mix of [EARL](https://www.w3.org/TR/EARL10-Schema/) (Evaluation and Reporting Language), basic Dublin Core terms, and custom fields.

## Document structure

Each example chunk of the report shown below appears in order, in one JSON file.

- [Header information](#header-information)
- [Outlines](#outlines)
- [Image list](#image-list)
- [Iframes list](#iframes-list)
- [Properties](#properties)
- [earl:testSubject for this EPUB file](#earltestsubject-for-this-epub-file)
- [Accessibility metadata summary](#accessibility-metadata-summary)
- [Assertions](#assertions)

### Header information
```
{
  "@type": "earl:report",
  "dct:title": "Ace Report",
  "dct:description": "Report on automated accessibility checks for EPUB",
  "dct:date": "10/8/2017, 1:08:03 PM",
  "earl:assertedBy": {
    "@type": "earl:software",
    "doap:name": "DAISY Ace",
    "doap:description": "DAISY Accessibility Checker for EPUB",
    "doap:homepage": "http://ace.daisy.org",
    "doap:created": "2017-07-01",
    "doap:release": {
      "doap:revision": "0.3.2"
    }
  },
```

### Outlines
```
  "outlines": {
    "toc": // HTML fragment representing an extracted view of the table of contents
    ,
    "headings": // HTML fragment representing an extracted view of the headings
    ,
    "html": // outline view of heading and sectioning content
  },
```


### Image list
```
  "data": {
    "images": [
      {
        "alt": "The DAISY Consortium",
        "html": "<img xmlns=\"http://www.w3.org/1999/xhtml\" src=\"../images/daisy.png\" alt=\"The DAISY Consortium\" />",
        "role": null,
        "src": "EPUB/images/daisy.png",
        "location": "xhtml/image-desc.xhtml#epubcfi(/4/4/4)"
      },
      ...
    ],
```

### Iframes list
```
    "iframes": [
      {
        "src": "EPUB/xhtml/out-of-spine-content-embed-01.xhtml",
        "path": "/var/folders/x0/tvbr6tz54js_7q7gvg9s2g240000gn/T/tmp-53884sdqiaos75Cgw/EPUB/xhtml/out-of-spine-content-embed-01.xhtml",
        "location": "xhtml/out-of-spine-content.xhtml#epubcfi(/4/6/6)"
      },
    ]
  },
```

### Properties
```
  "properties": {
    "hasMathML": false,
    "hasPageBreaks": false
  },
```

### earl:testSubject for this EPUB file

This just formally states that the test subject of this report is `epub-a11y-tests-001.epub`.

```
  "earl:testSubject": {
    "url": "/Users/marisa/dev/epub-a11y-checker/samples/build/epub-a11y-tests-001.epub",
    "metadata": {
      "dc:identifier": "com.github.epub-a11y-checker.epub-a11y-tests-001",
      "dc:description": "Samples for EPUB Accessibility Testing",
      "dc:title": "EPUB-A11Y-TESTS-001",
      "dc:creator": [
        "Marisa DeMeglio",
        "Romain Deltour"
      ],
      "dc:language": "en",
      "dcterms:modified": "2017-02-21T13:00:00Z"
    }
  },
```
### Accessibility metadata summary

```
  "a11y-metadata": {
    "missing": [
      "schema:accessMode",
      "schema:accessibilityFeature",
      "schema:accessibilityHazard",
      "schema:accessibilitySummary",
      "schema:accessModeSufficient",
      "schema:accessibilityAPI",
      "schema:accessibilityControl",
      "a11y:certifiedBy"
    ],
    "empty": [],
    "present": []
  },
```
### Assertions

The `assertions` section of the report, found as a top-level term, contains a list of `earl:assertion` items, each for a different document in the EPUB. Those assertion items, in turn, contain assertions for tests that failed

#### Document-level assertions

An `assertion` for a document looks like this. A document may be a package document, content document, or the whole EPUB itself. Note that in this example, `earl:testSubject` points to the package document, and `earl:result` does not include a pointer to a location within the document (as individual test assertions do), because this assertion is for the entire document.

```
{
 "@type": "earl:assertion",
 "assertions": [
   // list of assertions for tests
   ...
 ],
 "earl:testSubject": {
   "url": "EPUB/package.opf",
   "dct:title": "EPUB-A11Y-TESTS-001"
 },
 "earl:result": {
   "earl:outcome": "fail"
 }
}
```
Where `earl:outcome` is based on the results for the individual tests. If any test failed, then the document is given a `fail` outcome. The `earl:result` property belongs to its parent `earl:assertion` and is relevant to that assertion's `earl:testSubject`.

#### Test-level assertions
An example of an assertion for an individual test is shown below. Note that it includes a location reference, a test description, and suggestions for remedying the issue.

```
{
  "@type": "earl:assertion",
  "earl:assertedBy": "aXe",
  "earl:mode": "automatic",
  "earl:test": {
    "earl:impact": "critical",
    "dct:title": "aria-roles",
    "dct:description": "Ensures all elements with a role attribute use a valid value",
    "help": {
      "url": "http://kb.daisy.org/publishing/docs/script/aria.html",
      "title": "ARIA"
    }
  },
  "earl:result": {
    "earl:outcome": "fail",
    "dct:description": "Fix all of the following:\n  Role must be one of the valid ARIA roles",
    "earl:pointer": {
      "cfi": [
        "/4/16/4/2"
      ],
      "css": [
        "p > img[role=\"none\\ presentation\"]"
      ]
    }
  }
}
```


## Caveats

* Ace does not report assertions for tests that passed
* The very last `earl:result` in the report is often for the entire EPUB, though this depends on how the JSON data is serialized.
