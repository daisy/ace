+++
title = "JSON Report"
weight = 3
+++

Ace's outputs a machine-readable report in JSON format, detailing the automated tests. The vocabulary of this report is a mix of [EARL](https://www.w3.org/TR/EARL10-Schema/) (Evaluation and Reporting Language), Dublin Core, and custom terms.

## Document structure

Each example piece of the report shown below appears in order, in one JSON file.

- [Header information](#header-information)
- [Outlines](#outlines)
- [Data](#data)
- [Properties](#properties)
- [earl:testSubject for this EPUB file](#earltestsubject-for-this-epub-file)
- [Accessibility metadata summary](#accessibility-metadata-summary)
- [Assertions](#assertions)

### Header information

This gives basic information about Ace and when the report was created.

```
{
  "@type": "earl:report",
  "@context": "http://daisy.github.io/ace/ace-report-1.0.jsonld",
  "dct:title": "Ace Report",
  "dct:description": "Report on automated accessibility checks for EPUB",
  "dct:date": "1/26/2018, 4:29:25 PM",
  "earl:assertedBy": {
    "@type": "earl:software",
    "doap:name": "DAISY Ace",
    "doap:description": "DAISY Accessibility Checker for EPUB",
    "doap:homepage": "http://ace.daisy.org",
    "doap:created": "2017-07-01",
    "doap:release": {
      "doap:revision": "1.0.0"
    }
  },
```

### Outlines

This is the structural data that Ace extracts.

```
  "outlines": {
    "toc": // HTML fragment representing an extracted view of the table of contents
    ,
    "headings": // HTML fragment representing an extracted view of the headings
    ,
    "html": // outline view of heading and sectioning content
  },
```


### Data

The fields under `data` contain extracted `images`, `audios`, `canvases`, `embeds`, `epub-triggers`, `epub-switches`, `iframes`, `maps`, `scripts`, and `videos`. The example here shows information about the publication's `images` and `iframes`:

```
  "data": {
    "images": [
      {
        "src": "EPUB/images/daisy.png",
        "alt": "DAISY Consortium",
        "role": "presentation",
        "html": "<img xmlns=\"http://www.w3.org/1999/xhtml\" src=\"../images/daisy.png\" alt=\"DAISY Consortium\" role=\"presentation\" />",
        "location": "xhtml/image-desc.xhtml#epubcfi(/4/18/4/2)"
      },
      ...
    ],
    "iframes": [
      {
        "src": "EPUB/xhtml/out-of-spine-content-embed-01.xhtml",
        "location": "xhtml/out-of-spine-content.xhtml#epubcfi(/4/6/6)"
      },
      ...
    ]
  },
```

### Properties

These publication-wide properties describe different aspects of the EPUB as being present or absent.

```
  "properties": {
    "hasManifestFallbacks": false,
    "hasBindings": false,
    "hasSVGContentDocuments": false,
    "hasFormElements": false,
    "hasMathML": false,
    "hasPageBreaks": false
  },
```

### earl:testSubject for this EPUB file

This formally states that the test subject of this report is the given publication, and includes some basic metadata.

```
"earl:testSubject": {
  "url": "../epub-a11y-checker/samples/build/epub-a11y-tests-001.epub",
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
  },
  "links": {}
},
```
### Accessibility metadata summary

The accessibility metadata properties are organized by whether they are `missing`, `empty` (blank), or `present` in the publication.

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

The `assertions` section of the report, found as a top-level term, contains a list of `earl:assertion` items, each for a different document in the EPUB. Those assertion items, in turn, contain assertions for tests that failed.

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
An example of an assertion for an individual test is shown below. Note that it includes a location reference, a test description, and suggestions for remedying the issue (including a link to the relevant section of the [Accessible Publishing Knowledge Base](http://kb.daisy.org/publishing)).

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
      "dct:title": "ARIA",
      "dct:description": "ARIA roles used must conform to valid values"
    }
  },
  "earl:result": {
    "earl:outcome": "fail",
    "dct:description": "Role must be one of the valid ARIA roles",
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
* Paths in this report are relative or absolute as specified in Ace's [configuration]({{< ref "config.md" >}}).
