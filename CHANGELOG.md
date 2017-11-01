# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.6.1"></a>
## [0.6.1](https://github.com/daisy/ace/compare/v0.6.0...v0.6.1) (2017-11-01)



<a name="0.6.0"></a>
# [0.6.0](https://github.com/daisy/ace/compare/v0.5.0...v0.6.0) (2017-11-01)


### Bug Fixes

* **report:** Better usability for report ([56e1222](https://github.com/daisy/ace/commit/56e1222)), closes [#31](https://github.com/daisy/ace/issues/31) [#19](https://github.com/daisy/ace/issues/19)
* **report:** EPUB title is a top-level item ([5f210d4](https://github.com/daisy/ace/commit/5f210d4)), closes [#62](https://github.com/daisy/ace/issues/62)
* **report:** report name is report.json ([84ddf2f](https://github.com/daisy/ace/commit/84ddf2f)), closes [#66](https://github.com/daisy/ace/issues/66)
* **report:** States that no <x> was found ([c6b3b9a](https://github.com/daisy/ace/commit/c6b3b9a)), closes [#61](https://github.com/daisy/ace/issues/61)
* **rules:** properly detect page markers using `epub:type="pagebreak"` ([72e5bd5](https://github.com/daisy/ace/commit/72e5bd5)), closes [#85](https://github.com/daisy/ace/issues/85)


### Features

* **core:** run HTML checks in headless Chrome ([b150b83](https://github.com/daisy/ace/commit/b150b83)), closes [#23](https://github.com/daisy/ace/issues/23)
* **report:** report includes summary of violations ([8ce05b7](https://github.com/daisy/ace/commit/8ce05b7)), closes [#30](https://github.com/daisy/ace/issues/30)
* **rules:** allow DPUB ARIA roles ([32cdacf](https://github.com/daisy/ace/commit/32cdacf)), closes [#65](https://github.com/daisy/ace/issues/65)
* **rules:** ensure that page break markers have an accessible label ([a078739](https://github.com/daisy/ace/commit/a078739)), closes [#71](https://github.com/daisy/ace/issues/71)
* **rules:** report data on fallback mechanisms with no a11y support ([b18740a](https://github.com/daisy/ace/commit/b18740a)), closes [#76](https://github.com/daisy/ace/issues/76)
* **rules:** report the presence of interactive form content ([5680386](https://github.com/daisy/ace/commit/5680386)), closes [#75](https://github.com/daisy/ace/issues/75)


### Performance Improvements

* run HTML checks concurrently ([fb91a69](https://github.com/daisy/ace/commit/fb91a69))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/daisy/ace/compare/v0.3.4...v0.5.0) (2017-10-11)

### Bug Fixes

* use the proper URL to Ace’s website in the report ([9c5c62a](https://github.com/daisy/ace/commit/9c5c62a))



<a name="0.3.4"></a>
## [0.3.4](https://github.com/daisy/ace/compare/v0.3.3...v0.3.4) (2017-10-10)


### Bug Fixes

* create subdirectories when creating a new directory ([ceed934](https://github.com/daisy/ace/commit/ceed934))


### Features

* use the new URL for DAISY’s KB ([a659a9c](https://github.com/daisy/ace/commit/a659a9c)), closes [#58](https://github.com/daisy/ace/issues/58)



<a name="0.3.3"></a>
## [0.3.3](https://github.com/daisy/ace/compare/v0.3.2...v0.3.3) (2017-10-09)


### Bug Fixes

* patch aXe to support namespaced element names ([9e945b9](https://github.com/daisy/ace/commit/9e945b9)), closes [#57](https://github.com/daisy/ace/issues/57)
* use javascript strict mode everywhere to prevent errors ([b41e77b](https://github.com/daisy/ace/commit/b41e77b))
* wrong image paths in HTML report ([1ecf40f](https://github.com/daisy/ace/commit/1ecf40f)), closes [#56](https://github.com/daisy/ace/issues/56)


### Features

* use Babel to make Ace compatible with Node v6 and later ([89cb1d7](https://github.com/daisy/ace/commit/89cb1d7)), closes [#45](https://github.com/daisy/ace/issues/45)
* write logs to a user directory ([97d2dc9](https://github.com/daisy/ace/commit/97d2dc9)), closes [#50](https://github.com/daisy/ace/issues/50)



<a name="0.3.2"></a>
## [0.3.2](https://github.com/daisy/ace/compare/v0.3.1...v0.3.2) (2017-10-05)

### Changes

* correctly publish the fixes from v0.3.1 to npm.

<a name="0.3.1"></a>
## [0.3.1](https://github.com/daisy/ace/compare/v0.3.0...v0.3.1) (2017-10-05)


### Bug Fixes

* **http:** make ace-http command executable ([564f695](https://github.com/daisy/ace/commit/564f695))
* don’t crash when an image is missing in the EPUB ([cec84b1](https://github.com/daisy/ace/commit/cec84b1)), closes [#44](https://github.com/daisy/ace/issues/44)
* end the JSON-LD context URL by `.json` ([999ebe8](https://github.com/daisy/ace/commit/999ebe8))
* JS error in the report when assertions don’t have a pointer ([e3b6917](https://github.com/daisy/ace/commit/e3b6917)), closes [#54](https://github.com/daisy/ace/issues/54)
* multiple `dc:source` caused an unexpected error ([c719977](https://github.com/daisy/ace/commit/c719977)), closes [#49](https://github.com/daisy/ace/issues/49)
* properly set paths to media elems with sources children ([4d816fe](https://github.com/daisy/ace/commit/4d816fe)), closes [#48](https://github.com/daisy/ace/issues/48)
* various bugs in the report builder ([4db2bd2](https://github.com/daisy/ace/commit/4db2bd2)), closes [#53](https://github.com/daisy/ace/issues/53)



<a name="0.3.0"></a>
# [0.3.0](https://github.com/daisy/ace/compare/v0.2.0...v0.3.0) (2017-10-04)


### Bug Fixes

* **cli:** fix broken dependency ([1b6893b](https://github.com/daisy/ace/commit/1b6893b))
* add the correct version of Ace to the report ([7b855df](https://github.com/daisy/ace/commit/7b855df))
* allow the doc checker to be called concurrently ([af2ce2a](https://github.com/daisy/ace/commit/af2ce2a))
* **cli:** correct file location ([f295c6f](https://github.com/daisy/ace/commit/f295c6f))
* disable aXe’s `bypass` rule ([e3215ff](https://github.com/daisy/ace/commit/e3215ff)), closes [#40](https://github.com/daisy/ace/issues/40)
* do not hang on errors during HTML checking ([54ebf5b](https://github.com/daisy/ace/commit/54ebf5b)), closes [#39](https://github.com/daisy/ace/issues/39)
* don’t choke on –and report– missing KB links ([2bc94ab](https://github.com/daisy/ace/commit/2bc94ab))
* enable successive calls in the same process ([7461fec](https://github.com/daisy/ace/commit/7461fec))
* improve error handling ([8591a08](https://github.com/daisy/ace/commit/8591a08))
* prevent data to leak outside the report dir ([a86fddc](https://github.com/daisy/ace/commit/a86fddc)), closes [#18](https://github.com/daisy/ace/issues/18) [#33](https://github.com/daisy/ace/issues/33)
* support checking unpackaged EPUB passed as relative paths ([2268ba5](https://github.com/daisy/ace/commit/2268ba5))
* wait for reports to be written before returning ([bd7d6cb](https://github.com/daisy/ace/commit/bd7d6cb))


### Features

* **CLI:** improve handling of report directory overrides ([e4ab069](https://github.com/daisy/ace/commit/e4ab069)), closes [#17](https://github.com/daisy/ace/issues/17) [#28](https://github.com/daisy/ace/issues/28)
* **http:** completed initial http api ([19f5c70](https://github.com/daisy/ace/commit/19f5c70)), closes [#9](https://github.com/daisy/ace/issues/9)
* **tests:** add minimal integration tests ([7d087cd](https://github.com/daisy/ace/commit/7d087cd))
* extract more info from the HTML content ([6134f6d](https://github.com/daisy/ace/commit/6134f6d)), closes [#26](https://github.com/daisy/ace/issues/26)
* report EPUB-specific violations ([ab4d34b](https://github.com/daisy/ace/commit/ab4d34b)), closes [#10](https://github.com/daisy/ace/issues/10)
* various improvements to the HTML report’s UX
* add a summary of accessibility metadata
* support checking of unpackaged EPUBs
* add integration tests


<a name="0.2.0"></a>
# [0.2.0](https://github.com/daisy/ace/compare/v0.1.1...v0.2.0) (2017-08-07)

### Features

* New JSON-LD report format, using properties from W3C's Evaluation and Report Language
* New HTML report
* Include link to DAISY's accessibility knowledge base (work in progress)
* Include a visualization of various EPUB outlines (Navigation Document's ToC, headings hiererachy, and HTML outline)
* Include a list of the EPUB's images and associated descriptive text
* Include the full publication metadata set


<a name="0.1.1"></a>
## [0.1.1](https://github.com/daisy/ace/compare/v0.1.0...v0.1.1) (2017-06-26)

### Bug Fixes

* Fix a bug which caused file name conflicts when creating temporary directories for Content Documents (closes [#12](https://github.com/daisy/ace/issues/12))


<a name="0.1.0"></a>
# 0.1.0 (2017-06-02)

### Features

* includes a basic CLI app
* extracts and parses an EPUB to load content docs
* runs aXe on the content docs (on the DOM rendered in NightmareJS/Electron)
* aggregates the results
* produces a report on the standard output or
* store it in a specified directory
