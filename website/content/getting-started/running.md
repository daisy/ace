+++
title = "Running Ace"
weight = 3
+++

_Note: this documentation applies to the Ace by DAISY command line tool. For more information about the Ace by DAISY "desktop application" (as known as the Ace App), please [visit this page]({{<relref "getting-started/ace-app.md">}})._

## Checking an EPUB

You can check an EPUB by running the `ace` command followed by the path to the EPUB document (if the file name includes spaces, place it inside `"` marks). For example:

```
$ ace ~/Documents/moby-dick.epub
```

The above command will run the automated accessibility tests on the EPUB document and output the results.

## Getting the results

You can specify the directory for Ace to store its output with the `--outdir` option. For example:

```
$ ace --outdir ~/Documents/moby-dick-report ~/Documents/moby-dick.epub
```

_Note that if you do not specify a directory with `--outdir`, no reports get saved. You would only see output in the shell._

If the specified directory does not exist, it will be created. In this example, two versions of the results report will be found under the `~/Documents/moby-dick-report` directory:

* `report.json`: A machine-readable version of the report, in JSON format
* `report.html`: A human-readable version of the report, in HTML format.

To learn more, please read the [reference documentation]({{< relref "docs/cli.md" >}}).

A more detailed step-by-step guide is also available on [InclusivePublishing.org](http://inclusivepublishing.org/ace).
