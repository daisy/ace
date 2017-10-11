+++
title = "JSON Report"
weight = 4
wip = true
+++

Ace produces a JSON report based on the JSON-LD format and using the EARL vocabulary.

Example report:

```json
{
  "@type": "earl:report",
  "@context": "http://ace.daisy.org/ns/ace-report.jsonld",
  "dct:title": "Ace Report",
  "dct:description": "Report on automated accessibility checks for EPUB",
  "dct:date": "10/10/2017, 12:00:00 PM",
  "earl:assertedBy": {
    "@type": "earl:software",
    "doap:name": "DAISY Ace",
    "doap:description": "DAISY Accessibility Checker for EPUB",
    "doap:homepage": "http://ace.daisy.org",
    "doap:created": "2017-07-01",
    "doap:release": {
      "doap:revision": "0.3.4"
    }
  },
  "outlines": {
    "toc": "...",
    "headings": "...",
    "html": "..."
  },
  "data": {
    "images": [ ... ]
  },
  "properties": {
    "hasMathML": false,
    "hasPageBreaks": false
  },
  "earl:testSubject": {
    "url": "/data/epub/",
    "metadata": {
      "dc:title": "Minimal EPUB 3.0",
      "dc:language": "en",
      "dc:identifier": "NOID",
      "dcterms:modified": [
        "2017-01-01T00:00:01Z",
        "2017-01-01T00:00:01Z"
      ],
      "schema:accessibilityFeature": "structuralNavigation",
      "schema:accessibilitySummary": "everything OK!",
      "schema:accessibilityHazard": [
        "noFlashingHazard",
        "noSoundHazard",
        "noMotionSimulationHazard"
      ],
      "schema:accessMode": "textual",
      "schema:accessModeSufficient": "textual"
    }
  },
  "a11y-metadata": { ... },
  "assertions": [
    {
      "@type": "earl:assertion",
      "assertions": [],
      "earl:testSubject": {
        "url": "EPUB/package.opf",
        "dct:title": "Minimal EPUB 3.0"
      }
    },
    {
      "@type": "earl:assertion",
      "assertions": [],
      "earl:testSubject": {
        "url": "content_001.xhtml",
        "dct:title": "Minimal EPUB"
      }
    }
  ],
  "earl:result": {
    "earl:outcome": "pass"
  }
}
```
