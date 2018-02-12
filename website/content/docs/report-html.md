+++
title = "HTML Report"
weight = 2
+++

Ace outputs a human-readable report in HTML format, containing information about which automated tests failed, as well as extracted data visualizations, to highlight potential problem areas and to assist in manual checking.

Note that the report looks best with javascript enabled, though it's not required.

After the header, which contains the Ace version, report date, and publication title, there are four sections, detailed below.

## Violations

### Summary of Violations

This table lists statistics for the violations, in terms of severity: Critical, Serious, Moderate, or Minor; and by ruleset category: WCAG 2.0 A, WCAG 2.0 AA, EPUB, Best Practice, or Other. It's useful for getting a quick overview of the violations.

### All violations

This table details each violation and provides information about:

* `Impact`: the severity of the violation
* `Ruleset`: the category that this rule is in
* `Rule`: identifier for the rule, as well as the underlying engine that checks for it (e.g. _aXe_ or _Ace_)
* `Location`: where in the book the violation occurred, as well as an HTML code snippet of the relevant portion.
* `Details`: suggestions on how to fix the problem, as well as a link to the relevant topic page in our online knowledge base.

If javascript is enabled, there is a set of drop-down filters at the top of the table where you can refine by different properties, for example, to see all violations found in a particular file. Additionally, the table is searchable and sortable.

## Metadata

### All Metadata

All package document metadata is listed in this table, which is searchable and sortable (requires javascript).

### Accessibility Metadata

This section lists accessibility metadata, describing what's present in the publication, and which properties are missing.

## Outlines

The outlines are intended to assist with manual checking. They represent extracted views of different structural aspects of the publication. The outlines are:

* __Table of contents__, taken from the EPUB navigation document
* __Headings__, including indications of missing heading levels (i.e. going from `h1` to `h3` with no `h2` in between)
* __HTML__, which is a view of just the heading content and sectioning content


## Images

This table contains each image in the EPUB and information about it. The table columns are:

* `Image`: the image itself
* `alt attribute`: the contents of the `alt` attribute
* `aria-describedby`: the contents of the element referenced by the `aria-describedby` attribute
* `Associated figcaption`: the `figcaption` for this image
* `Location`: location in the EPUB of this image
* `Role`: the image's `role` attribute value(s)

Please refer to the [images topic](http://kb.daisy.org/publishing/docs/html/images.html) in the Accessible Publishing Knowledge Base for guidance on image accessibility techniques and examples.
