+++
title = "Why Ace?"
weight = 1
+++

## What is Ace?

Ace is a tool to run automated accessibility checks for EPUB Publications, in order to assist in the evaluation of conformance to the [EPUB Accessibility](http://www.idpf.org/epub/latest/accessibility) specification.

## What does Ace do?

Specifically, Ace:

- runs automated accessibility tests on EPUB content documents
- extracts the publication metadata, and checks accessibility-related metadata
- extracts various document outlines (the ToC, headings, and HTML structure) for side-by-side comparison
- extracts all the EPUBs images and graphics and their associated accessibility descriptions in a consolidated table, for easier review
- extracts other various content features to facilitate human-driven accessibility audits
- can be run as a command line tool, or integrated as a Javascript node module, or driven by an HTTP API

Under the hood, Ace currently runs [aXe](https://github.com/dequelabs/axe-core), an engine for automated testing of HTML developed by the good folks at Deque Systems.


## What Ace doesn’t do?

It is important to keep in mind that only a limited portion of accessibility checks can be automated, and therefore, __Ace is not a complete accessibility conformance evaluation tool; instead, it is an aid for a broader, human driven evaluation process.__.
