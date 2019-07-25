+++
title = "Command line interface"
weight = 1
+++

## Overview

The easiest way to run Ace is to type this on the command line:

```
$ ace ~/Documents/book.epub
```

You'll then see a description of Ace's actions as it runs tests on the book. The JSON report is printed to the command line at the end (nothing is saved to disk; you need to specify [`--outdir`](#outdir) for that).

Example:
```
info:    Processing ../epub-a11y-checker/samples/build/epub-a11y-tests-001.epub
info:    Parsing EPUB
info:    Analyzing accessibility metadata
info:    Checking package...
info:    - EPUB/package.opf: 4 issues found
info:    Checking documents...
info:    - xhtml/front.xhtml: No issues found
info:    - xhtml/nav.xhtml: 2 issues found
info:    - xhtml/table-structure.xhtml: 2 issues found
info:    - xhtml/image-desc.xhtml: 4 issues found
info:    - xhtml/heading-order-01.xhtml: No issues found
info:    - xhtml/heading-order-02.xhtml: No issues found
info:    - xhtml/heading-order-03.xhtml: No issues found
info:    - xhtml/color-contrast.xhtml: 2 issues found
info:    - xhtml/epub-type-and-aria.xhtml: 5 issues found
info:    - xhtml/out-of-spine-content.xhtml: 2 issues found
info:    Consolidating results...
{
  "@type": "earl:report",
  "@context": "http://daisy.github.io/ace/ace-report-1.0.jsonld",
  "dct:title": "Ace Report",  
  ...
}
info:   Done
```

Ace will exit with a return code of `0` when complete, or `1` if there was an error that prevented Ace from successfully executing. Note that these return codes do not indicate whether there were violations in the publication; for that, you need to first edit Ace's [configuration]({{< ref "config.md" >}}).

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

    -l, --lang  <language> language code for localized messages (e.g. "fr"), default is "en"
  Examples
    $ ace -o out ~/Documents/book.epub
```

### version

Displays the version of Ace and exits.

Syntax: `--version` or `-v`

Example:
```
$ ace --version
1.0.0
```

### outdir

Specify a path to save Ace's reports to.

Syntax: `--outdir` or `-o`, followed by the path

Example:

```
$ ace --outdir results ~/Documents/book.epub
info:    Processing ~/Documents/book.epub
...
info:    Consolidating results...
info:    Copying data
info:    Saving JSON report
info:    Saving HTML report
info:    Done.
```

This will produce output in a `results` subdirectory of your current working directory instead of printing the JSON report to the command line. If the specified directory does not exist, it will be created.

_Note: If you do not specify an `--outdir` option, Ace outputs the JSON version of the report on the command line and saves nothing to disk._

### tempdir

Specify a custom path to save temporary files in.

Syntax: `--tempdir` or `-t`, followed by the path

Example:

```
$ ace --tempdir acetemp ~/Documents/book.epub
```

This will store temporary files in a `acetemp` subdirectory of your current working directory. If the subdirectory does not exist, it will be created.

### force

Overwrite any files in the directory specified by `--outdir`.

Syntax: `--force` or `-f`

If the output directory is not empty, and you do not specify `--force`, Ace will display a warning and exit:

```
warn:    Output directory is not empty.

  Running Ace would override the following files or directories:

  - ../results/report.json
  - ../results/report.html
  - ../results/data

  Use option --force to override.
```

### subdir

Output reports to a subdirectory named after the input EPUB. To be used in conjunction with [`--outdir`](#outdir).

Syntax: `--subdir`

Example:

```
$ ace --subdir --outdir results ~/Documents/my-book.epub
```

This creates as the output directory a subdirectory named `my-book` within `results`.

### verbose

Output more detail when running Ace. This option is useful to use before sending a bug report as it tells us which version of Ace you're running, as well as your OS and Node versions.

Syntax: `--verbose` or `-V`

Example:
```
$ ace --verbose ../epub-a11y-checker/samples/build/epub-a11y-tests-001.epub

verbose: Ace 1.0.0, Node v9.4.0, Darwin 17.3.0
verbose: Options: cwd=/Users/marisa/dev/ace, outdir=undefined, tmpdir=undefined, verbose=true, silent=false, jobId=
info:    Processing ../epub-a11y-checker/samples/build/epub-a11y-tests-001.epub
verbose: Extracting EPUB
info:    Parsing EPUB
verbose: at location '/var/folders/x0/tvbr6tz54js_7q7gvg9s2g240000gn/T/tmp-55388YEqs0mEKHq3x'
info:    Analyzing accessibility metadata
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

### lang

Use this to set the language used to localize the reports of the accessibility evaluation.
The default is "en" (English). Currently, the only available supplementary locale is "fr" (French).

Syntax: `--lang` or `-l`

Example:
```
$ ace --lang fr ~/Documents/book.epub
$
```
