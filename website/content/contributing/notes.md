+++
title = "Implementation notes"
weight = 3
wip = true
+++

## Design principles

TBD.

## HTML checker

Under the hood, most of the HTML checks are powered by [aXe](https://github.com/dequelabs/axe-core), an engine for automated testing of HTML from [Deque Systems](https://www.deque.com/).

## Headless browser

During the evaluation of an EPUB, Ace loads each HTML content documeent in a headless browser using [Nightmare.js](https://github.com/segmentio/nightmare), a high-level browser automatiom library from [Segment](https://segment.com/).
