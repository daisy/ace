+++
title = "Running Ace"
weight = 3
+++

## Checking an EPUB

You can check an EPUB by running the `ace` command followed by the path to the EPUB document. For example:

```
$ ace ~/Documents/moby-dick.epub
```

The above command will run the automated accessibility tests on the EPUB document and output the results.

## Getting the results

You can specify the directory for Ace to store its output with the `--outputdir` option. For example:

```
$ ace --outputdir ~/Documents/moby-dick-report ~/Documents/moby-dick.epub
```

_Note that if you do not specify a directory with `--outputdir`, no reports get saved. You would only see output in the shell._

If the specified directory does not exist, it will be created. In this example, two versions of the results report will be found under the `~/Documents/moby-dick-report` directory:

* `report.json`: A machine-readable version of the report, in JSON format
* `report.html`: A human-readable version of the report, in HTML format.

To learn more, please read the [reference documentation]({{% relref "docs/cli.md" %}}).

A more detailed step-by-step guide is also available on [InclusivePublishing.org](http://inclusivepublishing.org/ace).
