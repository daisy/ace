+++
title = "How to contribute?"
weight = 1
+++

First, welcome to Ace and thank you so much for being willing to contribute!

## Submitting an issue

You can first check the [issue tracker](https://github.com/daisy/ace/issues) to see if someone already reported the issue. Don’t forget to included the closed issues in your search in case we fixed it already!

If you can’t find any mention of your issue in our tracker, please [file a new issue](https://github.com/daisy/ace/issues/new)!

When filing an issue, please provide the following details:

- the version of Ace impacted by the issue (it can be retrieved by running `ace -v` in a command shell).
- the version of Node used to run Ace (it can be retrieved by running `node -v` in a command shell).
- your operating system and version
- if possible, provide the error details as produced in the [log file]({{<relref "docs/logging.md">}}). Run Ace with the `--verbose` option to produce a detailed log.
- if you are having trouble with the HTML report produced by Ace, please specify the browser(s) and version(s) where you notice the issue

## Contributing code

### Pull requests

We accept changes via GitHub pull requests.

We try to keep a clean and readable commit history, so if we decide to merge your code we will rebase your commits on the `master` branch, and possibly squash them too.

Please make sure your branch is reasonably up-to-date with the `master` branch (by regularly pulling from or rebasing onto the `master` branch).

### Tests

Please make sure to provide tests for any change you’re proposing.

### Code style

We do not yet have formal code style guidelines, so please try to respect the style of the code files you are editing!

We may change your code style when merging a pull request.

### Commit guidelines

We follow a commit message convention (adapted from [Angular’s convention](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)), which allows us to keep a readable history and automatically generate change logs.

Each commit message should consist of a simple header, a body, and an optional footer, each separated with a blank line. The header is a single line consisting of a _type_, an optional _scope_, and a _subject_.

The allowed types are:

- feat (feature)
- fix (bug fix)
- docs (documentation)
- style (formatting, missing semi colons, …)
- refactor
- test (when adding missing tests)
- chore (maintain)

An example of a commit message is

```
feat: enable support for checking EPUB 2.0.1

- Make sure that the parsing doesn’t choke on EPUB 2.0.1
- Warn when checking an EPUB 2.0.1

Closes #21
```
