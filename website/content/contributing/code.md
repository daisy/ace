+++
title = "Code base overview"
weight = 2
+++

Ace consists of the following packages:

- **ace-cli**: the command line interface
- **ace-config**: unifies the per-package configuration files into a global config file
- **ace-core**: the core checker’s logic, and the code responsible for running the underlying Web checker
- **ace-core/scripts**: the Javascript files injected in the headless browser to run Ace’s checks
- **ace-http**: the Http API
- **ace-logger**: logging
- **ace-report** and **ace-report-axe**: utils for building Ace’s reports
- **epub-utils**: utils for parsing EPUBs
- **jest-env-puppeteer**, **jest-puppeteer**, and **puppeteer-utils**: for working with the headless browser
