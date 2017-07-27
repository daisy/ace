var aceReport = {
  "@type": "earl:report",
  "@context": {},
  "earl:assertedBy": {
    "@context": "http://ace.daisy.org/ns/ace-report.jsonld",
    "@type": "earl:software",
    "doap:name": "DAISY Ace",
    "doap:description": "DAISY Accessibility Checker for EPUB",
    "doap:homepage": "http://ace.daisy.org",
    "doap:created": "2017-07-01",
    "doap:release": {
      "doap:revision": "v0.2.0"
    }
  },
  "dct:date": "7/25/2017, 4:47:44 PM",
  "dct:title": "ACE Report",
  "dct:description": "Accessibility Checker Report",
  "earl:testSubject": {
    "url": "/Users/marisa/dev/sample-content/epubs/manga.epub",
    "dct:title": "Japanese FXL Language Lesson iBooks version 2",
    "dct:identifier": "978-1-61150-030-1"
  },
  "assertions": [
    {
      "@type": "earl:assertion",
      "earl:testSubject": {
        "url": "p1.xhtml",
        "dct:title": "Japanese Fixed Layout Example"
      },
      "assertions": [
        {
          "@type": "earl:assertion",
          "earl:assertedBy": "aXe",
          "earl:mode": "automatic",
          "earl:test": {
            "earl:impact": "serious",
            "dct:title": "html-has-lang",
            "dct:description": "Ensures every HTML document has a lang attribute",
            "helpUrl": "https://daisy.github.io/a11y-kb/docs/html/lang.html"
          },
          "earl:result": {
            "earl:outcome": "fail",
            "dct:description": "Fix any of the following:\n  The <html> element does not have a lang attribute",
            "earl:pointer": {
              "cfi": [
                "html"
              ],
              "css": [
                "/2"
              ]
            }
          }
        }
      ],
      "earl:result": {
        "earl:outcome": "fail"
      }
    },
    {
      "@type": "earl:assertion",
      "earl:testSubject": {
        "url": "p2.xhtml",
        "dct:title": "Japanese Fixed Layout Example"
      },
      "assertions": [
        {
          "@type": "earl:assertion",
          "earl:assertedBy": "aXe",
          "earl:mode": "automatic",
          "earl:test": {
            "earl:impact": "serious",
            "dct:title": "html-has-lang",
            "dct:description": "Ensures every HTML document has a lang attribute",
            "helpUrl": "https://daisy.github.io/a11y-kb/docs/html/lang.html"
          },
          "earl:result": {
            "earl:outcome": "fail",
            "dct:description": "Fix any of the following:\n  The <html> element does not have a lang attribute",
            "earl:pointer": {
              "cfi": [
                "html"
              ],
              "css": [
                "/2"
              ]
            }
          }
        }
      ],
      "earl:result": {
        "earl:outcome": "fail"
      }
    },
    {
      "@type": "earl:assertion",
      "earl:testSubject": {
        "url": "p3.xhtml",
        "dct:title": "Japanese Fixed Layout Example"
      },
      "assertions": [
        {
          "@type": "earl:assertion",
          "earl:assertedBy": "aXe",
          "earl:mode": "automatic",
          "earl:test": {
            "earl:impact": "serious",
            "dct:title": "html-has-lang",
            "dct:description": "Ensures every HTML document has a lang attribute",
            "helpUrl": "https://daisy.github.io/a11y-kb/docs/html/lang.html"
          },
          "earl:result": {
            "earl:outcome": "fail",
            "dct:description": "Fix any of the following:\n  The <html> element does not have a lang attribute",
            "earl:pointer": {
              "cfi": [
                "html"
              ],
              "css": [
                "/2"
              ]
            }
          }
        }
      ],
      "earl:result": {
        "earl:outcome": "fail"
      }
    },
    {
      "@type": "earl:assertion",
      "earl:testSubject": {
        "url": "p4.xhtml",
        "dct:title": "Japanese Fixed Layout Example"
      },
      "assertions": [
        {
          "@type": "earl:assertion",
          "earl:assertedBy": "aXe",
          "earl:mode": "automatic",
          "earl:test": {
            "earl:impact": "serious",
            "dct:title": "html-has-lang",
            "dct:description": "Ensures every HTML document has a lang attribute",
            "helpUrl": "https://daisy.github.io/a11y-kb/docs/html/lang.html"
          },
          "earl:result": {
            "earl:outcome": "fail",
            "dct:description": "Fix any of the following:\n  The <html> element does not have a lang attribute",
            "earl:pointer": {
              "cfi": [
                "html"
              ],
              "css": [
                "/2"
              ]
            }
          }
        }
      ],
      "earl:result": {
        "earl:outcome": "fail"
      }
    },
    {
      "@type": "earl:assertion",
      "earl:testSubject": {
        "url": "p5.xhtml",
        "dct:title": "Japanese Fixed Layout Example"
      },
      "assertions": [
        {
          "@type": "earl:assertion",
          "earl:assertedBy": "aXe",
          "earl:mode": "automatic",
          "earl:test": {
            "earl:impact": "serious",
            "dct:title": "html-has-lang",
            "dct:description": "Ensures every HTML document has a lang attribute",
            "helpUrl": "https://daisy.github.io/a11y-kb/docs/html/lang.html"
          },
          "earl:result": {
            "earl:outcome": "fail",
            "dct:description": "Fix any of the following:\n  The <html> element does not have a lang attribute",
            "earl:pointer": {
              "cfi": [
                "html"
              ],
              "css": [
                "/2"
              ]
            }
          }
        }
      ],
      "earl:result": {
        "earl:outcome": "fail"
      }
    },
    {
      "@type": "earl:assertion",
      "earl:testSubject": {
        "url": "p6.xhtml",
        "dct:title": "Japanese Fixed Layout Example"
      },
      "assertions": [
        {
          "@type": "earl:assertion",
          "earl:assertedBy": "aXe",
          "earl:mode": "automatic",
          "earl:test": {
            "earl:impact": "serious",
            "dct:title": "html-has-lang",
            "dct:description": "Ensures every HTML document has a lang attribute",
            "helpUrl": "https://daisy.github.io/a11y-kb/docs/html/lang.html"
          },
          "earl:result": {
            "earl:outcome": "fail",
            "dct:description": "Fix any of the following:\n  The <html> element does not have a lang attribute",
            "earl:pointer": {
              "cfi": [
                "html"
              ],
              "css": [
                "/2"
              ]
            }
          }
        }
      ],
      "earl:result": {
        "earl:outcome": "fail"
      }
    },
    {
      "@type": "earl:assertion",
      "earl:testSubject": {
        "url": "p7.xhtml",
        "dct:title": "Japanese Fixed Layout Example"
      },
      "assertions": [
        {
          "@type": "earl:assertion",
          "earl:assertedBy": "aXe",
          "earl:mode": "automatic",
          "earl:test": {
            "earl:impact": "serious",
            "dct:title": "html-has-lang",
            "dct:description": "Ensures every HTML document has a lang attribute",
            "helpUrl": "https://daisy.github.io/a11y-kb/docs/html/lang.html"
          },
          "earl:result": {
            "earl:outcome": "fail",
            "dct:description": "Fix any of the following:\n  The <html> element does not have a lang attribute",
            "earl:pointer": {
              "cfi": [
                "html"
              ],
              "css": [
                "/2"
              ]
            }
          }
        }
      ],
      "earl:result": {
        "earl:outcome": "fail"
      }
    },
    {
      "@type": "earl:assertion",
      "earl:testSubject": {
        "url": "p8.xhtml",
        "dct:title": "Japanese Fixed Layout Example"
      },
      "assertions": [
        {
          "@type": "earl:assertion",
          "earl:assertedBy": "aXe",
          "earl:mode": "automatic",
          "earl:test": {
            "earl:impact": "serious",
            "dct:title": "html-has-lang",
            "dct:description": "Ensures every HTML document has a lang attribute",
            "helpUrl": "https://daisy.github.io/a11y-kb/docs/html/lang.html"
          },
          "earl:result": {
            "earl:outcome": "fail",
            "dct:description": "Fix any of the following:\n  The <html> element does not have a lang attribute",
            "earl:pointer": {
              "cfi": [
                "html"
              ],
              "css": [
                "/2"
              ]
            }
          }
        }
      ],
      "earl:result": {
        "earl:outcome": "fail"
      }
    }
  ],
  "earl:result": {
    "earl:outcome": "fail"
  }
};
