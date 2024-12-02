'use strict';

const path = require('path');
const builders = require('@daisy/ace-report').builders;
const winston = require('winston');

const { localize, getCurrentLanguage } = require('../l10n/localize').localizer;

const a11yMetadata = require('../core/a11y-metadata');

const ASSERTED_BY = 'Ace';
const MODE = 'automatic';
const KB_BASE = 'http://kb.daisy.org/publishing/';

function asString(arrayOrString) {
  if (Array.isArray(arrayOrString) && arrayOrString.length > 0) {
    return asString(arrayOrString[0]);
  } else if (arrayOrString) {
    return arrayOrString.toString().trim();
  }
  return '';
}

function newViolation({ impact = 'serious', title, testDesc, resDesc, kbPath, kbTitle, ruleDesc }) {
  return new builders.AssertionBuilder()
    .withAssertedBy(ASSERTED_BY)
    .withMode(MODE)
    .withTest(
      new builders.TestBuilder()
        .withImpact(impact)
        .withTitle(title)
        .withDescription(testDesc)
        .withHelp(
          KB_BASE + (getCurrentLanguage() === "ja" ? kbPath.replace(/^docs/, "ja") : kbPath),
          kbTitle,
          resDesc)
        .withRulesetTags(['EPUB'])
        .build())
    .withResult(
      new builders.ResultBuilder('fail')
        .withDescription(ruleDesc)
        .build())
    .build();
}

function newMetadataAssertion(name, impact = 'serious') {
  return newViolation({
    impact,
    title: `metadata-${name.toLowerCase().replace('schema:', '')}`,
    testDesc: localize("checkepub.metadataviolation.testdesc", { name, interpolation: { escapeValue: false } }),
    resDesc: localize("checkepub.metadataviolation.resdesc", { name, interpolation: { escapeValue: false } }),
    kbPath: 'docs/metadata/schema.org/index.html',
    kbTitle: localize("checkepub.metadataviolation.kbtitle"),
    ruleDesc: localize("checkepub.metadataviolation.ruledesc", { name, interpolation: { escapeValue: false } })
  });
}
// newMetadataAssertion =>
// "metadataviolation"
//   "Add a '{{name}}' metadata property to the Package Document",
//   "Publications must declare the '{{name}}' metadata",
//   "Ensures a '{{name}}' metadata is present"

// otherwise custom newViolation() =>
// "metadatainvalid"
//   "Use one of the metadata values defined by schema.org",
//   "'{{name}}' metadata must be set to one of the expected values",
//   "Value '{{value}}' is invalid for '{{name}}' metadata"

function checkMetadata(assertions, epub) {
  let has_accessibilityFeature_printPageNumbersPageBreakMarkers = false;

  // Check metadata values
  for (const name in a11yMetadata.A11Y_META) {
    const meta = a11yMetadata.A11Y_META[name];
    var values = epub.metadata[name];
    if (!values) {
      // Report missing metadata if it is required or recommended
      if (meta.required) assertions.withAssertions(newMetadataAssertion(name));
      if (meta.recommended) assertions.withAssertions(newMetadataAssertion(name, 'moderate'));
    }
    // This causes a "earl:outcome" FAIL (not PASS), even with MINOR "earl:impact" :(
    // else if (meta.discouraged) {
    //   assertions.withAssertions(newViolation({
    //     impact: 'minor',
    //     title: `metadata-${name.toLowerCase().replace('schema:', '')}-deprecated`,
    //     testDesc: localize("checkepub.metadatadeprecated.testdesc", { name, interpolation: { escapeValue: false } }),
    //     resDesc: localize("checkepub.metadatadeprecated.resdesc", { name, interpolation: { escapeValue: false } }),
    //     kbPath: 'docs/metadata/schema.org/index.html',
    //     kbTitle: localize("checkepub.metadatadeprecated.kbtitle"),
    //     ruleDesc: localize("checkepub.metadatadeprecated.ruledesc", { name, interpolation: { escapeValue: false } })
    //   }));
    // }
    else {
      if (!Array.isArray(values)) {
        values = [values]
      }

      // TODO?
      // "metadatamultiple" would be new localizable label for this kind of error!
      //   "A single occurence of schema.org metadata is expected",
      //   "Metadata '{{name}}' should not appear more than once",
      //   "Metadata '{{name}}' with value '{{value}}' is defined several times"
      // if (name === 'schema:accessibilitySummary' && values.length > 1) {
      //   assertions.withAssertions(newViolation({
      //     impact: 'minor',
      //     title: `metadata-${name.toLowerCase().replace('schema:', '')}-invalid`,
      //     testDesc: lxxocalize("checkepub.metadatamultiple.testdesc", { value, name, interpolation: { escapeValue: false } }),
      //     resDesc: lxxocalize("checkepub.metadatamultiple.resdesc", { name, interpolation: { escapeValue: false } }),
      //     kbPath: 'docs/metadata/schema.org/index.html',
      //     kbTitle: lxxocalize("checkepub.metadatamultiple.kbtitle"),
      //     ruleDesc: lxxocalize("checkepub.metadatamultiple.ruledesc", { name, interpolation: { escapeValue: false } })
      //   }))
      // }

      if (meta.allowedValues // effectively excludes schema:accessibilitySummary
        && !meta.discouraged) {

        if (values.length > 1 && (name === 'schema:accessibilityFeature' || name === 'schema:accessibilityHazard')) {

          if (values.includes('unknown')) {
            assertions.withAssertions(newViolation({
              impact: 'moderate',
              title: `metadata-${name.toLowerCase().replace('schema:', '')}-invalid`,
              testDesc: localize("checkepub.metadatainvalid.testdesc", { value: 'unknown/...', name, interpolation: { escapeValue: false } }),
              resDesc: localize("checkepub.metadatainvalid.resdesc", { name, interpolation: { escapeValue: false } }),
              kbPath: 'docs/metadata/schema.org/index.html',
              kbTitle: localize("checkepub.metadatainvalid.kbtitle"),
              ruleDesc: localize("checkepub.metadatainvalid.ruledesc", { name, interpolation: { escapeValue: false } })
            }))
          }
          if (values.includes('none')) {
            assertions.withAssertions(newViolation({
              impact: 'moderate',
              title: `metadata-${name.toLowerCase().replace('schema:', '')}-invalid`,
              testDesc: localize("checkepub.metadatainvalid.testdesc", { value: 'none/...', name, interpolation: { escapeValue: false } }),
              resDesc: localize("checkepub.metadatainvalid.resdesc", { name, interpolation: { escapeValue: false } }),
              kbPath: 'docs/metadata/schema.org/index.html',
              kbTitle: localize("checkepub.metadatainvalid.kbtitle"),
              ruleDesc: localize("checkepub.metadatainvalid.ruledesc", { name, interpolation: { escapeValue: false } })
            }))
          }
          if (name === 'schema:accessibilityHazard') {
            if (values.includes('flashing') && values.includes('noFlashingHazard')) {
              assertions.withAssertions(newViolation({
                impact: 'moderate',
                title: `metadata-${name.toLowerCase().replace('schema:', '')}-invalid`,
                testDesc: localize("checkepub.metadatainvalid.testdesc", { value: 'flashing/noFlashingHazard', name, interpolation: { escapeValue: false } }),
                resDesc: localize("checkepub.metadatainvalid.resdesc", { name, interpolation: { escapeValue: false } }),
                kbPath: 'docs/metadata/schema.org/index.html',
                kbTitle: localize("checkepub.metadatainvalid.kbtitle"),
                ruleDesc: localize("checkepub.metadatainvalid.ruledesc", { name, interpolation: { escapeValue: false } })
              }))
            }
            if (values.includes('motionSimulation') && values.includes('noMotionSimulationHazard')) {
              assertions.withAssertions(newViolation({
                impact: 'moderate',
                title: `metadata-${name.toLowerCase().replace('schema:', '')}-invalid`,
                testDesc: localize("checkepub.metadatainvalid.testdesc", { value: 'motionSimulation/noMotionSimulationHazard', name, interpolation: { escapeValue: false } }),
                resDesc: localize("checkepub.metadatainvalid.resdesc", { name, interpolation: { escapeValue: false } }),
                kbPath: 'docs/metadata/schema.org/index.html',
                kbTitle: localize("checkepub.metadatainvalid.kbtitle"),
                ruleDesc: localize("checkepub.metadatainvalid.ruledesc", { name, interpolation: { escapeValue: false } })
              }))
            }
            if (values.includes('sound') && values.includes('noSoundHazard')) {
              assertions.withAssertions(newViolation({
                impact: 'moderate',
                title: `metadata-${name.toLowerCase().replace('schema:', '')}-invalid`,
                testDesc: localize("checkepub.metadatainvalid.testdesc", { value: 'sound/noSoundHazard', name, interpolation: { escapeValue: false } }),
                resDesc: localize("checkepub.metadatainvalid.resdesc", { name, interpolation: { escapeValue: false } }),
                kbPath: 'docs/metadata/schema.org/index.html',
                kbTitle: localize("checkepub.metadatainvalid.kbtitle"),
                ruleDesc: localize("checkepub.metadatainvalid.ruledesc", { name, interpolation: { escapeValue: false } })
              }))
            }
          }
        }

        values.forEach(value => {

          // comma-separated only! (not space-separated)
          // regexp note: /\s\s+/g === /\s{2,}/g
          // no whitespace collapsing, individual items can contain (incorrect) whitespaces, which will be reported
          const splitValues =
            name === 'schema:accessModeSufficient' ?
              value.trim().split(',').map(item => item.trim()).filter(item => item.length) :
              [value];

          if (meta.allowedValues) {
            splitValues.filter(splitValue => !meta.allowedValues.includes(splitValue))
            .forEach(splitValue => {
              assertions.withAssertions(newViolation({
                impact: 'minor',
                title: `metadata-${name.toLowerCase().replace('schema:', '')}-invalid`,
                testDesc: localize("checkepub.metadatainvalid.testdesc", { value: splitValue, name, interpolation: { escapeValue: false } }),
                resDesc: localize("checkepub.metadatainvalid.resdesc", { name, interpolation: { escapeValue: false } }),
                kbPath: 'docs/metadata/schema.org/index.html',
                kbTitle: localize("checkepub.metadatainvalid.kbtitle"),
                ruleDesc: localize("checkepub.metadatainvalid.ruledesc", { name, interpolation: { escapeValue: false } })
              }))
            });
          }

          // Check consistency of the printPageNumbers feature
          const has_accessibilityFeature_pageNavigation =
            name === 'schema:accessibilityFeature'
            && splitValues.includes('pageNavigation');

          has_accessibilityFeature_printPageNumbersPageBreakMarkers = has_accessibilityFeature_printPageNumbersPageBreakMarkers ||
            name === 'schema:accessibilityFeature' && (splitValues.includes('printPageNumbers') || splitValues.includes('pageBreakMarkers'));

          if (has_accessibilityFeature_pageNavigation && !epub.navDoc.hasPageList
            // || !has_accessibilityFeature_pageNavigation && epub.navDoc.hasPageList
          ) {
            assertions.withAssertions(newViolation({
              impact: 'moderate',
              title: `metadata-accessibilityFeature-printPageNumbers-nopagelist`,
              testDesc: localize("checkepub.metadataprintpagenumbers.testdesc", {}),
              resDesc: localize("checkepub.metadataprintpagenumbers.resdesc", {}),
              kbPath: 'docs/metadata/schema.org/index.html',
              kbTitle: localize("checkepub.metadataprintpagenumbers.kbtitle"),
              ruleDesc: localize("checkepub.metadataprintpagenumbers.ruledesc", {})
            }));
          }
        });
      }
    }
  }
  return has_accessibilityFeature_printPageNumbersPageBreakMarkers;
}

function checkMediaOverlays(epub) {
  if (!epub.contentDocs) {
    return undefined;
  }
  // console.log("EPUB", JSON.stringify(epub, null, 4));

  const docs = [];
  for (const doc of epub.contentDocs) {
    if (doc.notInReadingOrder) { // NavDoc artificially appended
      continue;
    }
    // docs.push({
    //   full: doc.filepath,
    //   relative: doc.relpath
    // });
    if (!doc.targetIDs) {
      continue;
    }
    for (const o of doc.targetIDs) {
      const epubType = o.epubType;
      const role = o.role;
      const isPageBreak = epubType && epubType.includes("pagebreak") || role && role.includes("doc-pagebreak");
      if (!isPageBreak) {
        continue;
      }
      docs.push({
        full: doc.filepath + "#" + o.id,
        relative: doc.relpath + "#" + o.id,
        epubType,
        role
      });
    }
  }
  // console.log("SPINE", JSON.stringify(docs, null, 4));

  let assertions = undefined;
  const assertionMap = {};

  for (const doc of epub.contentDocs) {
    if (doc.notInReadingOrder) { // NavDoc artificially appended
      continue;
    }
    if (!doc.mediaOverlay || !doc.mediaOverlay.smilRefs) {
      continue;
    }
    for (const smilRef of doc.mediaOverlay.smilRefs) {
      const isPageBreak = smilRef.epubType && smilRef.epubType.includes("pagebreak");
      if (isPageBreak) {
        continue;
      }
      const found = docs.find((d) => d.full === smilRef.full);
      if (found) {
        const resPath = doc.mediaOverlay.smilRelPath;
        let assertion = assertionMap[resPath];
        if (!assertion) {
          // console.log("ASS", resPath);
          assertion = new builders.AssertionBuilder()
            .withSubAssertions()
            .withTestSubject(resPath, "");
          assertionMap[resPath] = assertion;

          if (!assertions) {
            assertions = [];
          }
          assertions.push(assertion);
        }
        const ref = smilRef.src;
        assertion.withAssertions(newViolation({
          title: 'epub-pagelist-mediaoverlays',
          testDesc: localize("checkepub.mediaoverlaypagebreakviolation.testdesc", { ref, interpolation: { escapeValue: false } }),
          resDesc: localize("checkepub.mediaoverlaypagebreakviolation.resdesc", { ref, interpolation: { escapeValue: false } }),
          kbPath: 'docs/sync-media/index.html',
          kbTitle: localize("checkepub.mediaoverlaypagebreakviolation.kbtitle"),
          ruleDesc: localize("checkepub.mediaoverlaypagebreakviolation.ruledesc", { ref, interpolation: { escapeValue: false } })
        }));
      }
    }
  }

  return assertions;
}

function checkReadingOrder(epub) {

  if (!epub.navDoc || !epub.contentDocs) {
    return undefined;
  }

  const isFXL = epub.metadata['rendition:layout'] === "pre-paginated";

  const resPath = "/" + epub.navDoc.src;
  // Axe generates its own assertions for individual HTML files, including the NavDoc,
  // but the subject filepath is only the filename, not the complete relative path inside the EPUB,
  // so to ensure no collision we use a slash prefix (hacky! :( )
  // TODO: merge assertions?
  // const i = epub.navDoc.src.lastIndexOf("/");
  // if (i >= 0) {
  //   resPath = epub.navDoc.src.substring(i+1);
  // } else {
  //   resPath = epub.navDoc.src;
  // }

  const assertions = new builders.AssertionBuilder()
    .withSubAssertions()
    .withTestSubject(resPath, "");

  // console.log("EPUB", JSON.stringify(epub, null, 4));

  const docs = [];
  for (const doc of epub.contentDocs) {
    if (doc.notInReadingOrder) { // NavDoc artificially appended
      continue;
    }
    docs.push({
      full: doc.filepath,
      relative: doc.relpath
    });
    if (!doc.targetIDs) {
      continue;
    }
    for (const o of doc.targetIDs) {
      docs.push({
        full: doc.filepath + "#" + o.id,
        relative: doc.relpath + "#" + o.id,
        epubType: o.epubType,
        role: o.role
      });
    }
  }
  // console.log("SPINE", JSON.stringify(docs, null, 4));

  const pageListHrefs = epub.navDoc.pageListHrefs ? epub.navDoc.pageListHrefs : []; // triggers the "missing page break" error for completely absent navdoc/pagelist
  if (pageListHrefs) { // always truthy (empty array included)
    const pageListFilePathsAndTargetIDs = pageListHrefs.map((href) => {
      const arr = href.split("#");
      const filePath = path.join(path.dirname(epub.navDoc.filepath), arr[0]);
      const targetID = arr[1];
      const full = filePath + (!!targetID ? "#" + targetID : "");
      return {
        full,
        relative: href,
        hasID: !!targetID,
      };
    });
    // console.log("PAGES", JSON.stringify(pageListFilePathsAndTargetIDs, null, 4));

    // we ignore order! (unlike table of contents check)
    // let pos = -1;
    let failed = undefined;
    for (const page of pageListFilePathsAndTargetIDs) {
      const found = docs.findIndex((doc) => page.full === doc.full);
      if (found === -1) {
        failed = page;
        failed.noTargetID = true;
        // console.log("PAGE FAIL 1", JSON.stringify(failed, null, 4));
      } else {
        const epubType = docs[found].epubType;
        const role = docs[found].role;
        const notPageBreak = !(epubType && epubType.includes("pagebreak") || role && role.includes("doc-pagebreak"));
        if (notPageBreak && !isFXL && page.hasID
          // || pos >= 0 && found < pos
          ) {
          failed = page;
          failed.notPageBreak = notPageBreak;
          // console.log("PAGE FAIL 2", found, pos, JSON.stringify(failed, null, 4));
        }
        // pos = found;
      }

      if (failed) {
        const ref = failed.relative + (failed.notPageBreak ? " [epub:type=\"pagebreak\"!?]" : (failed.noTargetID ? " [id!?]" : ""));
        assertions.withAssertions(newViolation({
          impact: failed.notPageBreak ? 'minor' : 'serious',
          title: 'epub-pagelist-broken',
          testDesc: localize("checkepub.pagelistbrokenviolation.testdesc", { ref, interpolation: { escapeValue: false } }),
          resDesc: localize("checkepub.pagelistbrokenviolation.resdesc", { ref, interpolation: { escapeValue: false } }),
          kbPath: 'docs/navigation/pagelist.html',
          kbTitle: localize("checkepub.pagelistbrokenviolation.kbtitle"),
          ruleDesc: localize("checkepub.pagelistbrokenviolation.ruledesc", { ref, interpolation: { escapeValue: false } })
        }));
        // break;
      }
    }
    if (!isFXL) {
      for (const doc of docs) {
        const epubType = doc.epubType;
        const role = doc.role;
        const isPageBreak = epubType && epubType.includes("pagebreak") || role && role.includes("doc-pagebreak");
        if (!isPageBreak) {
          continue;
        }
        const foundPage = pageListFilePathsAndTargetIDs.find((p) => p.full === doc.full);
        if (!foundPage) {
          const ref = doc.relative;
          assertions.withAssertions(newViolation({
            title: 'epub-pagelist-missing-pagebreak',
            testDesc: localize("checkepub.missingpagebreakviolation.testdesc", { ref, interpolation: { escapeValue: false } }),
            resDesc: localize("checkepub.missingpagebreakviolation.resdesc", { ref, interpolation: { escapeValue: false } }),
            kbPath: 'docs/navigation/pagelist.html',
            kbTitle: localize("checkepub.missingpagebreakviolation.kbtitle"),
            ruleDesc: localize("checkepub.missingpagebreakviolation.ruledesc", { ref, interpolation: { escapeValue: false } })
          }));
        }
      }
    }
  }
  if (epub.navDoc.tocHrefs) {
    const tocFilePathsAndTargetIDs = epub.navDoc.tocHrefs.map((href) => {
      const arr = href.split("#");
      const filePath = path.join(path.dirname(epub.navDoc.filepath), arr[0]);
      const targetID = arr[1];
      const full = filePath + (targetID ? "#" + targetID : "");
      return {
        full,
        relative: href
      };
    });
    // console.log("TOC", JSON.stringify(tocFilePathsAndTargetIDs, null, 4));

    let pos = -1;
    let failed = undefined;
    for (const toc of tocFilePathsAndTargetIDs) {
      const found = docs.findIndex((doc) => toc.full === doc.full);
      if (found === -1) {
        failed = toc;
        failed.noTargetID = true;
        // console.log("TOC FAIL 1", JSON.stringify(failed, null, 4));
      } else {
        if (pos >= 0 && found < pos) {
          failed = toc;
          // console.log("TOC FAIL 2", found, pos, JSON.stringify(failed, null, 4));
        }
        pos = found;
      }

      if (failed) {
        const ref = failed.relative + (failed.noTargetID ? " [id!?]" : "");
        assertions.withAssertions(newViolation({
          title: 'epub-toc-order',
          testDesc: localize("checkepub.ordertocviolation.testdesc", { ref, interpolation: { escapeValue: false } }),
          resDesc: localize("checkepub.ordertocviolation.resdesc", { ref, interpolation: { escapeValue: false } }),
          kbPath: 'docs/navigation/toc.html',
          kbTitle: localize("checkepub.ordertocviolation.kbtitle"),
          ruleDesc: localize("checkepub.ordertocviolation.ruledesc", { ref, interpolation: { escapeValue: false } })
        }));
        break;
      }
    }
  }

  return assertions;
}

function checkTitle(assertions, epub) {
  const title = asString(epub.metadata['dc:title']);
  if (title === '') {
    assertions.withAssertions(newViolation({
      title: 'epub-title',
      testDesc: localize("checkepub.titleviolation.testdesc"),
      resDesc: localize("checkepub.titleviolation.resdesc"),
      kbPath: '',
      kbTitle: localize("checkepub.titleviolation.kbtitle"),
      ruleDesc: localize("checkepub.titleviolation.ruledesc")
    }));
  }
}

function checkPageSource(assertion, epub) {
  if (epub.navDoc.hasPageList
    && (
      (!epub.metadata['dc:source'] || epub.metadata['dc:source'].toString() === '')
      &&
      // https://www.w3.org/publishing/a11y/page-source-id/
      (!epub.metadata['pageBreakSource'] || epub.metadata['pageBreakSource'].toString() === '')
      &&
      (!epub.metadata['rendition:layout'] || epub.metadata['rendition:layout'].toString() !== "pre-paginated")
    )
  ) {
    assertion.withAssertions(newViolation({
      title: 'epub-pagesource',
      testDesc: localize("checkepub.pagesourceviolation.testdesc"),
      resDesc: localize("checkepub.pagesourceviolation.resdesc"),
      kbPath: 'docs/navigation/pagelist.html',
      kbTitle: localize("checkepub.pagesourceviolation.kbtitle"),
      ruleDesc: localize("checkepub.pagesourceviolation.ruledesc")
    }));
  }
}

function check(epub, report) {
  winston.info('Checking package...');
  const assertion = new builders.AssertionBuilder()
    .withSubAssertions()
    .withTestSubject(epub.packageDoc.src, asString(epub.metadata['dc:title']));

  if (!epub.opfLang) {
    assertion.withAssertions(newViolation({
      // impact: 'serious', DEFAULT
      title: 'epub-lang',
      testDesc: localize("checkepub.langmissing.testdesc"),
      resDesc: localize("checkepub.langmissing.resdesc"),
      kbPath: 'docs/epub/language.html',
      kbTitle: localize("checkepub.langmissing.kbtitle"),
      ruleDesc: localize("checkepub.langmissing.ruledesc")
    }));
  }

  const assertionRO = checkReadingOrder(epub);

  const assertionsMO = checkMediaOverlays(epub);

  // Check a11y metadata
  const has_accessibilityFeature_printPageNumbersPageBreakMarkers = checkMetadata(assertion, epub);

  // Check presence of a title
  checkTitle(assertion, epub);

  // Check page list is sourced
  checkPageSource(assertion, epub);

  if (assertionRO) {
    const builtAssertionsRO = assertionRO.build();
    report.addAssertions(builtAssertionsRO);
  }

  if (assertionsMO) {
    for (const ass of assertionsMO) {
      const builtAssertionsMO = ass.build();
      report.addAssertions(builtAssertionsMO);
    }
  }

  // const builtAssertions = assertion.build();
  // report.addAssertions(builtAssertions);

  // Report the Nav Doc
  report.addEPUBNav(epub.navDoc);

  // Report package properties
  report.addProperties({
    hasManifestFallbacks: epub.hasManifestFallbacks,
    hasBindings: epub.hasBindings,
    hasSVGContentDocuments: epub.hasSVGContentDocuments,
  });

  // winston.info(`- ${epub.packageDoc.src}: ${
  //   (builtAssertions.assertions && builtAssertions.assertions.length > 0)
  //     ? builtAssertions.assertions.length
  //     : 'No'} issues found`);

  return Promise.resolve({
    assertion,
    has_accessibilityFeature_printPageNumbersPageBreakMarkers,
  });
}

module.exports.check = check;
module.exports.newViolation = newViolation;
