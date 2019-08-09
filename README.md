# Ace, by DAISY

[![Version](https://img.shields.io/npm/v/@daisy/ace.svg)](https://www.npmjs.com/package/@daisy/ace)
[![License](https://img.shields.io/npm/l/@daisy/ace.svg)](LICENSE)
[![Downloads](https://img.shields.io/npm/dm/@daisy/ace.svg)](https://www.npmjs.com/package/@daisy/ace)  
[![Travis CI](https://img.shields.io/travis/daisy/ace.svg)](https://travis-ci.org/daisy/ace)
[![Open Bugs](https://img.shields.io/github/issues-raw/daisy/ace/bug.svg)](https://github.com/daisy/ace/issues)
[![Dependencies Status](https://img.shields.io/david/daisy/ace.svg)](https://david-dm.org/daisy/ace)
[![Known Vulnerabilities](https://snyk.io/test/github/daisy/ace/badge.svg)](https://snyk.io/test/github/daisy/ace)

Ace, the Accessibility Checker for EPUB, is a tool developed by the [DAISY Consortium](http://daisy.org) to assist with the evaluation of accessibility features of EPUB publications.

## What is Ace?

Ace is a tool to run automated accessibility checks for EPUB Publications, in order to assist in the evaluation of conformance to the [EPUB Accessibility](http://www.idpf.org/epub/latest/accessibility) specification.

It is important to keep in mind that only a limited portion of accessibility checks can be automated, and therefore __Ace is just a helper tool to assist in a broader, human-driven, evaluation process__.

Under the hood, Ace currently runs the [aXe engine for automated testing of HTML](https://github.com/dequelabs/axe-core), developed by the good folks at Deque Systems.

## Getting started

 * Install Node.JS (version 6 or higher).
 * Install Ace with `npm install @daisy/ace -g`

If everything went smoothly, you should now be able to run the `ace` command in your shell.

A detailed getting started guide is also available on [InclusivePublishing.org](https://inclusivepublishing.org/toolbox/accessibility-checker/getting-started/).

## What’s next?

User and developer documentation is available on [Ace’s web site](https://daisy.github.io/ace).

You can also review the current work plan by looking at the [current milestones](https://github.com/daisy/ace/milestones) defined in the issue tracker.

## Who’s using Ace?

Several publishers and service providers have integrated Ace in their production or QA workflows, including:

- Hachette Livre France
- Vital Source

Some tools based on Ace are also well worth checking out:

- [BACC](http://bacc.dzb.de/) – the born accessible content checker – developped by the German Central Library for the Blind in Leipzig (DZB). It is a web application backed by Ace, providing a user-friendly graphical user interface, and allowing batch processing of several EPUB files. Available in German and English.
- [Ace plugin for Sigil](https://www.mobileread.com/forums/showthread.php?t=294678). It allows to run Ace checks directly from the Sigil EPUB editor. Check this [screencast](https://screencast-o-matic.com/watch/cF1hQNb9LX) for a quick demo.
- [Ace plugin for Calibre](https://www.mobileread.com/forums/showthread.php?t=313848), developed by @thiagoeec. It allows to run Ace checks directly from Calibre, the ebook manager.

## Language localizations

Please visit [this wiki page](https://github.com/daisy/ace/wiki/Localization) to learn about translations.

## Developer Workflow

Please visit [this wiki page](https://github.com/daisy/ace/wiki/Developer-Workflow) for detailed developer-oriented information.
