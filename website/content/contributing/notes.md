+++
title = "Implementation notes"
weight = 3
+++

## HTML checker

Under the hood, most of the HTML checks are powered by [axe](https://github.com/dequelabs/axe-core), an engine for automated testing of HTML from [Deque Systems](https://www.deque.com/).

## Headless browser

During the evaluation of an EPUB, Ace loads each HTML content document in a "headless" web browser window (i.e. invisible from the point of view of the user of the command line tool, but nonetheless using a real rendering engine). Ace was originally based on [Puppeteer](https://github.com/GoogleChrome/puppeteer) but it is now using [Electron](https://github.com/electron/electron) by default. Electron and Puppeteer both use Chromium which is the open source component that powers various web browsers (including Google Chrome and Microsoft Edge). Both Ace (command line) and Ace App (Graphical User Interface) now rely on this Electron runtime to perform the accessibility checks, but the legacy Puppeteer method remains available via the command `ace-puppeteer` (similarly, the default Electron variant can be explicitly invoked with `ace-electron` instead of `ace`).

## Minimum System Requirements

Operating systems: Microsoft Windows 10+, Apple MacOS High Sierra 10.13+, Linux 64-bit Ubuntu 14.04+, Debian 8+, openSUSE 13.3+, or Fedora Linux 24+

Ace is a NodeJS / Javascript program that launches either Electron or Puppeteer to execute the accessibility tests in headless Chromium webviews (see section above). Ace has other software dependencies that require a modern NodeJS runtime, for security and performance reasons. NodeJS version 16+ is required, and NodeJS 18+ is recommended as v16 is scheduled to exit maintenance phase by the end of 2023.

Further information:

* https://github.com/nodejs/release#release-schedule
* https://support.google.com/chrome/answer/95346
* https://support.google.com/chrome/thread/185534985/sunsetting-support-for-windows-7-8-8-1-in-early-2023
* https://support.google.com/chrome/a/thread/185534987
* https://www.electronjs.org/blog/windows-7-to-8-1-deprecation-notice
* https://www.electronjs.org/docs/latest/breaking-changes
* https://developer.chrome.com/docs/puppeteer/get-started/#usage
