+++
title = "HTML Report"
weight = 3
wip = true
+++

Ace's outputs a human-readable report in HTML format, detailing the automated tests. You can see which tests failed and why; and also see extracted data, such as a list of images, along with accessibility information for each, to highlight potential problem areas and to assist in manual checking.

## The header

Includes the version of Ace, the report date, and some basic metadata extracted from the book, for identifying the publication.

## Violations table

The report contains a table listing the violations found in the EPUB. The table columns are:

* `Impact`: the severity of the violation
* `Rule`: identifier for the rule that was violated
* `Location`: where in the book the violation occurred
* `Details`: suggestions on how to fix the problem, as well as a link to the relevant topic page in our online knowledge base.

There is a set of drop-down filters at the top of the table where you can refine by Impact, File, and Rule.

## Outlines

The outlines are intended to assist with manual checking. They represent extracted views of different aspects of the EPUB. The outlines are:

* __Table of contents__, taken from the EPUB navigation document
* __Headings__, including indications of missing heading levels (i.e. going from `h1` to `h3` with no `h2` in between)
* __HTML__, which is a view of just the heading content and sectioning content

## Accessibility metadata summary

This section lists both present accessibility metadata, summarized in a table, as well as a list of what's missing or empty.

## Images

This table contains each image in the EPUB and information about it. The table columns are:

* `Image`: the image itself
* `alt attribute`: the contents of the `alt` attribute
* `aria-describedby`: the contents of the element referenced by the `aria-describedby` attribute
* `Associated figcaption`: the `figcaption` for this image
* `Location`: location in the EPUB of this image
