+++
title = "HTML Rules"
weight = 1
+++

Under the hood, most of the accessibility checks ran by Ace are powered by [Deque axe](https://github.com/dequelabs/axe-core), an engine for automated testing of HTML.

Deque axe defines over 100 rules (including a few experimental and deprecated ones): https://github.com/daisy/axe-core/blob/v4.10.2_DAISY/doc/rule-descriptions.md

Note that the link above references the DAISY fork of Axe which adds a few EPUB-specific rules not present in Deque's original ruleset (`epub-type-has-matching-role` and `pagebreak-label`). Also note that Ace defines additional [EPUB rules]({{<ref "epub.md">}}) related to publication package metadata, etc. (in other words, accessibility checks that require analysing other files than the publication's HTML documents)
