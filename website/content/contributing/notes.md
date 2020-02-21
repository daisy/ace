+++
title = "Implementation notes"
weight = 3
+++

## HTML checker

Under the hood, most of the HTML checks are powered by [axe](https://github.com/dequelabs/axe-core), an engine for automated testing of HTML from [Deque Systems](https://www.deque.com/).

## Headless browser

During the evaluation of an EPUB, Ace loads each HTML content document in a headless browser, using headless Chrome via [Puppeteer](https://github.com/GoogleChrome/puppeteer).
