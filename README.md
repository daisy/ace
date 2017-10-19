# Ace, by DAISY

[![Version](https://img.shields.io/npm/v/ace-core.svg)](https://www.npmjs.com/package/ace-core)
[![License](https://img.shields.io/npm/l/ace-core.svg)](LICENSE)
[![Downloads](https://img.shields.io/npm/dt/ace-core.svg)](https://www.npmjs.com/package/ace-core)  
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
 * Install Ace with `npm install ace-core -g`

If everything went smoothly, you should now be able to run the `ace` command in your shell.

## Usage

The following help message is displayed when running `ace --help`:

```
Ace by DAISY, an Accessibility Checker for EPUB

  Usage: ace [options] <input>

  Options:

    -h, --help             output usage information
    -v, --version          output the version number

    -o, --outdir  <path>   save final reports to the specified directory
    -t, --tempdir <path>   specify a custom directory to store the temporary reports
    -f, --force            override any existing output file or directory
        --subdir           output reports to a sub-directory named after the input EPUB

    -V, --verbose          display verbose output
    -s, --silent           do not display any output

  Examples
    $ ace -o out ~/Documents/book.epub
```

### Checking an EPUB

You can check an EPUB by running the `ace` command followed by the path to the EPUB document. For example:

```
$ ace ~/Documents/moby-dick.epub
```

The above command will extract the EPUB to a temporary cache directory, then run the test rules against every Content Document in the EPUB.

When ran with no further options, the tool will produce a JSON report to the standard output.

### Saving the reports on disk

You can specify a directory where to store the JSON report along with a human-readable HTML report, with the `--outdir` option. For example:

```
$ ace --outdir results ~/Documents/moby-dick.epub
```

The above command will run the test rules and store both a JSON report (`report.json`) and an HTML report (`report.html`) under the `results` directory of your current working directory.

## What’s next?

Feel free to read the [project requirements](https://github.com/daisy/ace-core/wiki/Requirements) to have a better idea of where we’re heading to.

You can also review the current work plan by looking at the [current milestones](https://github.com/daisy/ace-core/milestones) defined in the issue tracker.

