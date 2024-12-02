+++
title = "EPUB Rules"
weight = 2
+++

In addition to the [HTML rules]({{<ref "html.md">}}), Ace implements EPUB-specific checks. The "impact" property indicates the severity of each violation ("minor", "moderate", "serious", or "critical"), as per Deque axe's definition described in their documentation ( https://github.com/daisy/axe-core/blob/v4.7.2_DAISY/doc/issue_impact.md ).

* Missing metadata (impact = "serious"): `metadata-accessmode`, `metadata-accessibilityfeature`, `metadata-accessibilityhazard`
* Missing metadata (impact = "moderate"): `metadata-accessibilitysummary`, `metadata-accessModesufficient`
* Incorrect metadata values (impact = "moderate"): `metadata-accessibilityfeature-invalid`, `metadata-accessibilityhazard-invalid` (mixed positive and negative terms (e.g. `noFlashingHazard` and `flashing`), `unknown` mixed with `none` or other vocabulary values, or usage of terms not defined by the specification)
* Incorrect metadata values (impact = "minor"): `metadata-accessmode-invalid`, `metadata-accessmodesufficient-invalid` (usage of terms not defined by the specification)
* Missing authored page list when metadata `pageNavigation` is present (impact = "moderate"): `metadata-accessibilityFeature-printPageNumbers-nopagelist`
* Missing page breaks when metadata `printPageNumbers`/`pageBreakMarkers` is present (impact = "moderate"): `metadata-accessibilityFeature-printPageNumbers-nopagebreaks`
* Mismatched page breaks in SMIL and in HTML documents (impact = "serious"): `epub-pagelist-mediaoverlays`
* Authored page list references elements in HTML documents that are not page breaks (impact = "minor") or do not exist (impact = "serious"): `epub-pagelist-broken`
* Authored page list does not reference all elements that are page breaks in HTML documents (impact = serious): `epub-pagelist-missing-pagebreak`
* Mismatched authored table of contents and reading order of elements inside HTML documents (impact = "serious"): `epub-toc-order`
* Missing publication title metadata (impact = "serious"): `epub-title`
* Missing OPF lang attribute (impact = "serious"): `epub-lang`
* Missing `dc:source` / `pageBreakSource` publication metadata when reflowable EPUB has authored page list (impact = "serious"): `epub-pagesource`
