+++
title = "Command line interface"
weight = 1
+++

## Overview

The easiest way to run Ace is to type this on the command line:

```
$ ace ~/Documents/book.epub
```

You'll then see a decription of Ace's actions as it runs tests on the book. The JSON report is printed to the command line at the end (nothing is saved to disk; you need to specify [`--outdir`](#outdir) for that).

Example:
```
info:    Processing /Users/marisa/dev/epub-a11y-checker/samples/build/epub-a11y-tests-001.epub
info:    Parsing EPUB
info:    Analyzing accessibility metadata
info:    Checking package...
info:    Checking documents...
info:    - xhtml/front.xhtml
info:    - 0 issues found
info:    - xhtml/nav.xhtml
info:    - 1 issues found
info:    - xhtml/image-desc.xhtml
info:    - 4 issues found
info:    - xhtml/table-structure.xhtml
info:    - 2 issues found
info:    - xhtml/heading-order-01.xhtml
info:    - 0 issues found
info:    - xhtml/heading-order-02.xhtml
info:    - 0 issues found
info:    - xhtml/heading-order-03.xhtml
info:    - 0 issues found
info:    - xhtml/color-contrast.xhtml
info:    - 2 issues found
info:    - xhtml/epub-type-and-aria.xhtml
info:    - 3 issues found
info:    - xhtml/out-of-spine-content.xhtml
info:    - 2 issues found
info:    Consolidating results...
info:    {
  "@type": "earl:report",
  "@context": "http://ace.daisy.org/ns/ace-report.jsonld",
  "dct:title": "Ace Report",
  ...
info:   Done
```

## Options
Ace includes a simple set of options, detailed below.

### help

Displays the usage information and exits.

Syntax: `--help` or `-h`

Example:
```
$ ace --help

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

### version

Displays the version of Ace and exits.

Syntax: `--version` or `-v`

Example:
```
$ ace --version
0.3.2
```

### outdir

Specify a path to save Ace's reports to.

Syntax: `--outdir` or `-o`, followed by the path

Example:

```
$ ace --outdir results ~/Documents/book.epub
```

This will produce output in a `results` subdirectory of your current working directory. If that directory does not exist, it will be created.

_Note: If you do not specify an `--outdir` option, Ace outputs the JSON version of the report on the command line and saves nothing to disk._

### tempdir

Specify a custom path to save temporary reports to.

Syntax: `--tempdir` or `-t`, followed by the path

Example:

```
$ ace --tempdir acetemp ~/Documents/book.epub
```

This will produce output in a `acetemp` subdirectory of your current working directory. If that directory does not exist, it will be created.

### force

Overwrite any files in the directory specified by `--outdir`.

Syntax: `--force` or `-f`

If the output directory is not empty, and you do not specify `--force`, Ace will display a warning and exit:

```
warn:    Output directory is not empty.

Running Ace would override the following files or directories:

  - /Users/marisa/dev/out/report.json
  - /Users/marisa/dev/out/report.html
  - /Users/marisa/dev/out/data
  - /Users/marisa/dev/out/js

Use option --force to override.
```

### subdir

Output reports to a subdirectory named after the input EPUB. To be used in conjunction with [`--outdir`](#outdir).

Syntax: `--subdir`

Example:

```
$ ace --subdir --outdir results ~/Documents/my-book.epub
```

This creates a subdirectory named `my-book` within `results`.

### verbose

Output more detail when running Ace. This option is useful to use before sending a bug report as it tells us which version you're running.

Syntax: `--verbose` or `-V`

Example:
```
$ ace --verbose ~/Documents/book.epub

verbose: ACE cwd=/Users/marisa/dev/ace, outdir=/Users/marisa/dev/out/epub-a11y-tests-001, tmpdir=undefined, verbose=true, silent=false, jobId=
info:    Processing /Users/marisa/dev/epub-a11y-checker/samples/build/epub-a11y-tests-001.epub
verbose: Extracting EPUB
info:    Parsing EPUB
verbose: at location '/var/folders/x0/tvbr6tz54js_7q7gvg9s2g240000gn/T/tmp-42912vXel2GvQJ2Q6'
info:    Analyzing accessibility metadata
debug:    dc:identifier=com.github.epub-a11y-checker.epub-a11y-tests-001, dc:description=Samples for EPUB Accessibility Testing, dc:title=EPUB-A11Y-TESTS-001, dc:creator=[Marisa DeMeglio, Romain Deltour], dc:language=en, dcterms:modified=2017-02-21T13:00:00Z

```

Note that running Ace with `--verbose` enabled also creates verbose output in the log file.

### silent

This produces no output on the command line.

Syntax: `--silent` or `-s`

Example:
```
$ ace --silent ~/Documents/book.epub
$
```

Note that the log file is not 'silent'; it contains the default level of detail about Ace's operation.
