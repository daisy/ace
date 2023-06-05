+++
title = "Implementation notes"
weight = 3
+++

## HTML checker

Under the hood, most of the HTML checks are powered by [axe](https://github.com/dequelabs/axe-core), an engine for automated testing of HTML from [Deque Systems](https://www.deque.com/).

## Headless browser

During the evaluation of an EPUB, Ace loads each HTML content document in a "headless" web browser window (i.e. invisible from the point of view of the user of the command line tool, but nonetheless using a real rendering engine). Ace was originally based on [Puppeteer](https://github.com/GoogleChrome/puppeteer) but it is now using [Electron](https://github.com/electron/electron) by default. Electron and Puppeteer both use Chromium which is the open source component that powers various web browsers (including Google Chrome and Microsoft Edge). Both Ace (command line) and Ace App (Graphical User Interface) now rely on this Electron runtime to perform the accessibility checks, but the legacy Puppeteer method remains available via the command `ace-puppeteer` (similarly, the default Electron variant can be explicitly invoked with `ace-electron` instead of `ace`).
