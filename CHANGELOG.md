<a name="1.3.5"></a>
## [1.3.5](https://github.com/daisy/ace/compare/v1.3.4...v1.3.5) (2025-02-06)

### Updates:

* Electron version increment

<a name="1.3.4"></a>
## [1.3.4](https://github.com/daisy/ace/compare/v1.3.3...v1.3.4) (2025-02-05)

### Updates:

* Electron GPU headless command line tweaks (removed previous hacks that were necessary due to Electron bugs)

<a name="1.3.3"></a>
## [1.3.3](https://github.com/daisy/ace/compare/v1.3.2...v1.3.3) (2025-02-04)

### Updates:

* Deque Axe: latest version 4.10.2
* Upgraded both Axe runners (Electron and legacy Puppeteer) to latest versions
* WCAG versions and levels fully enumerated (2.0, 2.1, 2.2 and A-AA-AAA)
* Translations: added Chinese and German locales, updated Japanese and Danish and Portuguese (Brazil)
* DAISY Knowledge Base Japanese redirection
* Website fixes and updates
* Feature: added Docker script to launch Ace Electron in "headless" mode (via virtual buffer)
* Feature: command line flag for process exit code 2 instead of 0 when successful evaluation failure
* Feature: command line flag for evaluation timeout (was only environment variable before)
* Feature: EPUB version now reported
* Feature: sponsorship banner link
* Feature: aria-details reporting on images (alongside alt, figcaption, describedBy)
* Feature(dev): Flox/Nix dependency management for project environment isolation
* Feature(dev): GitHub Actions continuous integration
* Feature(dev): updated the Deque Axe test harness to dump ruleset (DAISY KB mapping) and run single-HTML evaluation
* Feature(dev): tool to analyse dependency tree and prune unused packages that are needlessly included in the project
* Fix: metadata accessibility printPageNumbers/pageBreakMarkers (missing page breaks in publication content documents) VERSUS pageNavigation (missing navigation document page list)
* Fix: EPUB metadata pageBreakSource in addition to dc:source (and optionally the associated refines / source-of / pagination)
* Fix: added support for unknownXXXHazard
* Fix: EPUB pagebreak in addition to title and ARIA-label now allows ARIA-labelledBy and element content text
* Fix: page breaks role does not require epub:type
* Fix: navigation document page list can reference non-pagebreaks
* Fix: removed useless HTML outline
* Fix: added unit tests for image role separator
* Fix: report description was incorrectly checked
* Fix: some URL percent encoding parsing / escaping
* Fix: images with incorrect SVG xlink:href fallback cascade to non-namespaced href attribute (workaround for broken publications)

<a name="1.3.2"></a>
## [1.3.2](https://github.com/daisy/ace/compare/v1.3.1...v1.3.2) (2023-07-11)

### Updates:

* Fix: aligned with the metadata properties defined in the W3C Community Report, notably missing schema accessibility features pageNavigation, printPageNumbers synonym pageBreakMarkers.
* Feature: added timeout configuration via environment variables, to override the Electron Axe runner processing logic: `ACE_TIMEOUT_INITIAL` (default `10000`, which provides a 10s time allowance for the web window to load its document and contents) and `ACE_TIMEOUT_EXTENSION` (default `480000` which provides a 480s / 8mn time allowance for the Axe checkers to execute inside the loaded document).

<a name="1.3.1"></a>
## [1.3.1](https://github.com/daisy/ace/compare/v1.3.0...v1.3.1) (2023-06-05)

### Updates:

* Hotfix for Ace App (GUI): moved Electron NPM package to devDependencies

<a name="1.3.0"></a>
## [1.3.0](https://github.com/daisy/ace/compare/v1.2.7...v1.3.0) (2023-06-05)

### Updates:

* Support for the EPUB Accessibility 1.1 specification "Conformance and Discoverability Requirements for EPUB publications" (W3C Recommendation dated 25 May 2023)
* Fixed ordering rule/check in page list.
* accessibilitySummary metadata is now recommended (SHOULD), not required (MUST). The impact/severity is downgraded from serious to moderate.
* conformsTo metadata is a link in the a11y spec. 1.0 (IDPF WCAG URLs), but can be string label in 1.1
* metadata "refines" is not filtered out for a11y properties that are globally hoisted to the level of the publication (unlike say, media overlays duration for individual spine items, or dc:title subtitle title-type refine)
* Updated Electron Axe "runner" to latest version, includes recent Chromium browser engine revision (matches Ace App GUI 1.1.6).
* Deprecated Puppeteer Axe "runner" in favour of the Electron one, which runs faster and is overall a better option as it delivers an experience consistent with Ace App (GUI). The Chromium version is now the same between Ace and Ace App. This alignment of technologies eliminates incorrectly-reported colour contrast violations (this was a notable discrepancy).
* Upgraded the DAISY fork of Deque Axe to latest version 4.7.2 (this brings many fixes and alignments with the latest ARIA specifications) See https://github.com/daisy/axe-core/pull/11

<a name="1.2.7"></a>
## [1.2.7](https://github.com/daisy/ace/compare/v1.2.6...v1.2.7) (2022-07-10)

### Updates:

* Support for the EPUB Accessibility 1.1 specification "Conformance and Discoverability Requirements for EPUB publications" (W3C Candidate Recommendation Draft dated 07 June 2022)
* Upgraded the DAISY fork of Deque Axe to latest version 4.4.2
* Fixed links to the DAISY Knowledge Base
* Other internal maintenance items, upgraded various NPM package dependencies (notably the latest versions of Electron and Puppeteer which run the in-webview tests under the hood)

<a name="1.2.6"></a>
## [1.2.6](https://github.com/daisy/ace/compare/v1.2.5...v1.2.6) (2022-02-03)

### Updates:

* Removed the HTTP server which could cause firewall issues (this does not affect the Ace command line which uses Puppeteer, it affects Ace App which uses Electron to run Deque Axe under the hood)
* Upgraded the DAISY fork of Deque Axe, version 4.4.0 which includes DPUB ARIA 1.1 updates, as well as many other improved checker rules ( https://github.com/daisy/axe-core/pull/8 )
* The Ace evaluation report (JSON and HTML) now contains information about Ace App (GUI) in addition to the version of the core / command line tool.
* The metadata properties accessibilityControl and accessibilityAPI are now discouraged. Ace reports them as "present", but not as "missing", and does not check their values syntax.
* The HTML report now references local JS and CSS dependencies (they were external links before)
* Added Japanese localisation (many thanks to the translators!)
* Updated several key NPM package dependencies, notably Electron v17 and Puppeteer v13 (both major increments, but non-breaking)

<a name="1.2.5"></a>
## [1.2.5](https://github.com/daisy/ace/compare/v1.2.4...v1.2.5) (2021-11-04)

### Updates:

* NPM package updates, notably Electron v15 and Puppeteer v11 (both major increments, non-breaking)
* Also updated the DAISY fork of Deque Axe v4.3.5 ( https://github.com/daisy/axe-core/pull/7 )

<a name="1.2.4"></a>
## [1.2.4](https://github.com/daisy/ace/compare/v1.2.3...v1.2.4) (2021-09-14)

### Updates:

* NPM package updates, minor non-breaking semantic version increments + Electron v14 (was v13)
* Also updated the DAISY fork of Deque Axe v4.3.3 ( https://github.com/daisy/axe-core/pull/6 ) to include a bugfix for https://github.com/daisy/ace/issues/358 (null origin with file:// in Puppeteer, did not affect Ace's Electron Axe "runner")

<a name="1.2.3"></a>
## [1.2.3](https://github.com/daisy/ace/compare/v1.2.2...v1.2.3) (2021-08-30)

### Updates:

* NodeJS v12+ requirement (LTS Long Term Support version is v14, v12 is now in maintenance mode, see https://nodejs.org/en/about/releases/ )
* NPM package updates (minor non-breaking semantic version increments)
* Notably: Deque Axe v4.3.3 (DAISY fork: https://github.com/daisy/axe-core/pull/6 )
* Migrated Continuous Integration runtime (automated tests) to new Travis service

<a name="1.2.2"></a>
## [1.2.2](https://github.com/daisy/ace/compare/v1.2.1...v1.2.2) (2021-04-13)

### Bugfixes:

* Fixed layout EPUB publications can have `pagelist` in Navigation Document without `dc:source` metadata in OPF package.
* Increase tolerance for Ace + Axe script loading lag (longer time window)
* SVG images are now reported
* NPM package updates (minor semantic version increments)

<a name="1.2.1"></a>
## [1.2.1](https://github.com/daisy/ace/compare/v1.2.0...v1.2.1) (2021-04-09)

### Bugfixes:

* The Puppeteer Axe "runner" wasn't handling XML / XHTML correctly with `.html` or `.htm` file extensions (the Electron runner was ok already)
* The HTTPS self-signed certificate validation procedure for the DAISY Knowledge Base was colliding with the HTTP server used in Ace with the Electron Axe runner.
* There was a random possibility of the Axe script not being ready in time for Ace.
* In case a single publication document causes a fatal error, the whole pool of concurrent validation windows is torn down, which caused timers to fire after disposal and attempt to reload now-defunct windows.

<a name="1.2.0"></a>
## [1.2.0](https://github.com/daisy/ace/compare/v1.1.1...v1.2.0) (2021-04-08)

Major internal update (see https://github.com/daisy/ace/pull/314 ).

### Summary:

* Based on DAISY's own fork of Deque's Axe (latest v4 version), instead of patching Axe's distributed Javascript bundles (see https://github.com/daisy/axe-core/pull/4 )
* Better localization tooling for Axe, integration of Axe translations
* Two Axe "runners": Puppeteer (default for Ace CLI), and Electron (can be used in CLI, and used by Ace App), Chromium web browser engine is used in both cases, but Electron runner uses a HTTP server to simulate a typical reading system environment. Unit tests plumbing for both platforms (Continuous Integration server only executes the Puppeteer ones, for faster builds). Runtime performance is near-identical (there is a developer script to check this).
* NodeJS >=10 requirement
* NPM package dependencies updated to latest versions (except where NodeJS requirement is higher). Added developer scripts to facilitate version checking and incremental updates at regular intervals (i.e. `package.json` exact references and `yarn.lock` maintenance)
* All Ace sub-packages (`@daisy/` organisation scope on NPM) have exact same semantic version (easier deployment with developer script that automates NPM publish)
* Fixes bugs that couldn't easily be fixed in Ace 1.1.1 (the last of v1), due to older Axe (v3 instead of v4) and due to older NPM package dependencies that were necessary for compatibility with legacy NodeJS requirement (now deprecated / deemed unsecure).

<a name="1.1.1"></a>
## [1.1.1](https://github.com/daisy/ace/compare/v1.1.0...v1.1.1) (2019-07-08)


### Bug Fixes

* allow list items as children of roles inheriting from 'list' ([a362050](https://github.com/daisy/ace/commit/a362050)), closes [#239](https://github.com/daisy/ace/issues/239)
* allow list of values for 'accessModeSufficient' ([6cb5402](https://github.com/daisy/ace/commit/6cb5402)), closes [#238](https://github.com/daisy/ace/issues/238)
* remove trailing whitespace after 'unlocked' value ([0f9e656](https://github.com/daisy/ace/commit/0f9e656))
* when img copy fails, keep going ([#215](https://github.com/daisy/ace/issues/215)) ([f769b49](https://github.com/daisy/ace/commit/f769b49))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/daisy/ace/compare/v1.0.2...v1.1.0) (2019-07-04)


### Bug Fixes

* `aria-describedby` can be a list of IDs ([f0aef4c](https://github.com/daisy/ace/commit/f0aef4c)), closes [#209](https://github.com/daisy/ace/issues/209)
* correct global Ace version ([#226](https://github.com/daisy/ace/issues/226)) ([822469f](https://github.com/daisy/ace/commit/822469f)), closes [#198](https://github.com/daisy/ace/issues/198)


### Features

* **new rule:** check expected values of schema.org a11y metadata ([a5452c3](https://github.com/daisy/ace/commit/a5452c3)), closes [#202](https://github.com/daisy/ace/issues/202)
* **new rule:** check the presence of a page list when 'printPageNumbers' is declared ([6e33dbb](https://github.com/daisy/ace/commit/6e33dbb)), closes [#203](https://github.com/daisy/ace/issues/203)
* improve epub:type / DPUB ARIA role mapping ([df3c666](https://github.com/daisy/ace/commit/df3c666)), closes [#201](https://github.com/daisy/ace/issues/201) [#214](https://github.com/daisy/ace/issues/214) [#220](https://github.com/daisy/ace/issues/220)
* Localization, English + French ([#223](https://github.com/daisy/ace/issues/223)) ([bf8b374](https://github.com/daisy/ace/commit/bf8b374))
* Puppeteer-based Ace Axe "runner" (AceGUI uses Electron instead) ([#227](https://github.com/daisy/ace/issues/227)) ([34c6e47](https://github.com/daisy/ace/commit/34c6e47))
* update Axe to v3.2.2 ([#228](https://github.com/daisy/ace/issues/228)) ([acf95da](https://github.com/daisy/ace/commit/acf95da)), closes [#225](https://github.com/daisy/ace/issues/225)



<a name="1.0.2"></a>
## [1.0.2](https://github.com/daisy/ace/compare/v1.0.1...v1.0.2) (2018-05-25)


### Bug Fixes

* revert to the official xmldom-alpha depdency ([c2eafb5](https://github.com/daisy/ace/commit/c2eafb5))



<a name="1.0.1"></a>
## [1.0.1](https://github.com/daisy/ace/compare/v1.0.0...v1.0.1) (2018-05-25)


### Bug Fixes

* fix `fs.promises` `ExperimentalWarning` on Node v10.1.0 ([4a7d88f](https://github.com/daisy/ace/commit/4a7d88f))
* **core:** headings with role `doc-subtitle` reported empty ([7ad1373](https://github.com/daisy/ace/commit/7ad1373))
* **parser:** parse HTML named character references ([1e83bf7](https://github.com/daisy/ace/commit/1e83bf7)), closes [#182](https://github.com/daisy/ace/issues/182)
* **report:** add dcterms:conformsTo, fix HTML entities ([9e00a51](https://github.com/daisy/ace/commit/9e00a51)), closes [#161](https://github.com/daisy/ace/issues/161) [#171](https://github.com/daisy/ace/issues/171)



<a name="1.0.0"></a>
## [1.0.0](https://github.com/daisy/ace/compare/v1.0.0-RC.1...v1.0.0) (2018-01-29)


### Bug Fixes

* **http-api:** fix a bug causing a job status to not be updated ([5247750](https://github.com/daisy/ace/commit/5247750))

### Features

* **logging:** verbose output includes Ace, NodeJS and OS versions ([229d4d1](https://github.com/daisy/ace/commit/229d4d1))


<a name="1.0.0-RC.1"></a>
## [1.0.0-RC.1](https://github.com/daisy/ace/compare/v0.9.0...v1.0.0-RC.1) (2018-01-22)


### Bug Fixes

* **core:** properly check Content Documents extensions ([8641c36](https://github.com/daisy/ace/commit/8641c36)), closes [#157](https://github.com/daisy/ace/issues/157)
* **report:** correct table column ordering ([f93111f](https://github.com/daisy/ace/commit/f93111f))
* **rules:** add help title and description to `epub-type-has-matching-role` ([a2506e4](https://github.com/daisy/ace/commit/a2506e4)), closes [#156](https://github.com/daisy/ace/issues/156)


### Features

* **data:** report the presence of SVG Content Documents ([659e189](https://github.com/daisy/ace/commit/659e189)), closes [#94](https://github.com/daisy/ace/issues/94)



<a name="0.9.0"></a>
## [0.9.0](https://github.com/daisy/ace/compare/v0.8.0...v0.9.0) (2018-01-19)


### Bug Fixes

* **core:** don't crash if a content document has an '.xml' extension ([181bea6](https://github.com/daisy/ace/commit/181bea6)), closes [#122](https://github.com/daisy/ace/issues/122)
* **core:** fix Puppeteer launching issue on Linux ([bd95b20](https://github.com/daisy/ace/commit/bd95b20))
* **report:** do not relativize paths if outdir was not set ([57b05d9](https://github.com/daisy/ace/commit/57b05d9))
* **report:** epub url is given as relative by default ([c7bfe03](https://github.com/daisy/ace/commit/c7bfe03)), closes [#64](https://github.com/daisy/ace/issues/64)
* **report:** remove [@path](https://github.com/path) property from iframes and images ([0ea5ca9](https://github.com/daisy/ace/commit/0ea5ca9)), closes [#64](https://github.com/daisy/ace/issues/64)
* **report:** report looks ok even if javascript is disabled ([ac945f2](https://github.com/daisy/ace/commit/ac945f2)), closes [#119](https://github.com/daisy/ace/issues/119)
* **report:** style fix for table pagination controls ([472e75c](https://github.com/daisy/ace/commit/472e75c)), closes [#147](https://github.com/daisy/ace/issues/147)
* **rule:** disable aXe check requiring at least one `main` ([eb79b2b](https://github.com/daisy/ace/commit/eb79b2b)), closes [#139](https://github.com/daisy/ace/issues/139)
* **rule:** ensure DPUB ARIA roles are accepted by aXe 2.6 ([508f6b4](https://github.com/daisy/ace/commit/508f6b4)), closes [#140](https://github.com/daisy/ace/issues/140)


### Features

* **cli:** optionally return error code 2 when violations are found ([136e3b2](https://github.com/daisy/ace/commit/136e3b2)), closes [#113](https://github.com/daisy/ace/issues/113)
* **dependencies:** update aXe version to 2.6.1 ([f382b3c](https://github.com/daisy/ace/commit/f382b3c)), closes [#148](https://github.com/daisy/ace/issues/148)
* **dependencies:** update Google Puppeteer to v1.0.0 ([942a8f2](https://github.com/daisy/ace/commit/942a8f2))
* **report:** add rules descriptions to the report ([63cc88b](https://github.com/daisy/ace/commit/63cc88b)), closes [#146](https://github.com/daisy/ace/issues/146)
* **report:** images table has role column ([0240800](https://github.com/daisy/ace/commit/0240800))



<a name="0.8.0"></a>
## [0.8.0](https://github.com/daisy/ace/compare/v0.7.0...v0.8.0) (2017-12-24)


### Bug Fixes

* **cli:** print the JSON report even when `--silent` is enabled ([e108d4d](https://github.com/daisy/ace/commit/e108d4d)), closes [#112](https://github.com/daisy/ace/issues/112)
* **outlines:** only use headings text content in the outline ([084fe4a](https://github.com/daisy/ace/commit/084fe4a)), closes [#129](https://github.com/daisy/ace/issues/129)
* **report:** limit the width of images ([fd80592](https://github.com/daisy/ace/commit/fd80592)), closes [#126](https://github.com/daisy/ace/issues/126)
* **unzip:** try to repair ZIP archives with extra comment length ([#138](https://github.com/daisy/ace/issues/138)) ([4c8b532](https://github.com/daisy/ace/commit/4c8b532)), closes [#121](https://github.com/daisy/ace/issues/121)
* **unzip:** tweak error message to indicate possible ZIP corruption ([434d9c2](https://github.com/daisy/ace/commit/434d9c2))


### Features

* **data:** extract and report link info from the Package Document ([#130](https://github.com/daisy/ace/issues/130)) ([a010744](https://github.com/daisy/ace/commit/a010744)), closes [#96](https://github.com/daisy/ace/issues/96)
* **report:** add a 'Best Practice' rule category ([b5ed308](https://github.com/daisy/ace/commit/b5ed308))
* **report:** show source code snippets for violations ([#134](https://github.com/daisy/ace/issues/134)) ([5e053fa](https://github.com/daisy/ace/commit/5e053fa)), closes [#82](https://github.com/daisy/ace/issues/82)
* **rule:** check that epub:type have matching ARIA roles ([85ffb96](https://github.com/daisy/ace/commit/85ffb96)), closes [#70](https://github.com/daisy/ace/issues/70)



<a name="0.7.0"></a>
## [0.7.0](https://github.com/daisy/ace/compare/v0.6.0...v0.7.0) (2017-12-13)


### Bug Fixes

* **core** error when running HTML checks ('HTML5Outline is not defined') ([03e3a3e](https://github.com/daisy/ace/commit/03e3a3e)), closes [#108](https://github.com/daisy/ace/issues/108)
* **aXe:** description list item does not have a `<dl>` parent ([4c0afdd](https://github.com/daisy/ace/commit/4c0afdd)), closes [dequelabs/axe-core#581](https://github.com/dequelabs/axe-core/issues/581) [#114](https://github.com/daisy/ace/issues/114)
* **report:** await for resources to be copied over to return ([b00b95b](https://github.com/daisy/ace/commit/b00b95b))
* **report:** include earl:result for documents that have no assertions ([d131450](https://github.com/daisy/ace/commit/d131450)), closes [#120](https://github.com/daisy/ace/issues/120)


### Features

* modularize the source code into individual Node packages ([76d49ce](https://github.com/daisy/ace/commit/76d49ce))
* **config:** enable configurability with a config file ([f63e1a5](https://github.com/daisy/ace/commit/f63e1a5)), closes [#63](https://github.com/daisy/ace/issues/63) [#77](https://github.com/daisy/ace/issues/77)
* **config:** make the logging configurable ([5a3e4a4](https://github.com/daisy/ace/commit/5a3e4a4))
* **core:** report the name of the Content Document where an unexpected error occurred ([ae1d814](https://github.com/daisy/ace/commit/ae1d814))


<a name="0.6.0"></a>
## [0.6.0](https://github.com/daisy/ace/compare/v0.5.0...v0.6.0) (2017-11-01)


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
## [0.5.0](https://github.com/daisy/ace/compare/v0.3.4...v0.5.0) (2017-10-11)

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
## [0.3.0](https://github.com/daisy/ace/compare/v0.2.0...v0.3.0) (2017-10-04)


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
## [0.2.0](https://github.com/daisy/ace/compare/v0.1.1...v0.2.0) (2017-08-07)

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
