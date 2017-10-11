const aceReportData = {
  "@type": "earl:report",
  "@context": "http://ace.daisy.org/ns/ace-report.jsonld",
  "earl:assertedBy": {
    "@type": "earl:software",
    "doap:name": "DAISY Ace",
    "doap:description": "DAISY Accessibility Checker for EPUB",
    "doap:homepage": "http://daisy.github.io/ace",
    "doap:created": "2017-07-01",
    "doap:release": {
      "doap:revision": "v0.2.0"
    }
  },
  "dct:date": "9/28/2017, 3:02:56 PM",
  "dct:title": "ACE Report",
  "dct:description": "Accessibility Checker Report",
  "earl:testSubject": {
    "url": "base-epub-30.epub",
    "metadata": {
      "dc:title": "Minimal EPUB 3.0",
      "dc:language": "en",
      "dc:identifier": "NOID",
      "dcterms:modified": "2017-01-01T00:00:01Z"
    }
  },
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
  "outlines": {
    "toc": "<ol xmlns=\"http://www.w3.org/1999/xhtml\">\n<li>content 001</li>\n</ol>",
    "headings": "<ul><li><span class=\"toc-h1\">Loomings</span></li></ul>",
    "html": "<ol><li><ol><li>Loomings</li></ol></li></ol>"
  },
  "assertions": [
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
  },
  "data": {
    "images": []
  }
};
