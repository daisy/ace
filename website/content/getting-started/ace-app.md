+++
title = "The Ace App"
weight = 4
+++

## What is the Ace by DAISY App?

Ace by DAISY App is the official graphical user interface for the EPUB accessibility checker developed by the [DAISY Consortium](http://daisy.org). The Ace App is available for the Windows, MacOS and Linux desktop operating systems.

## Where can I download the Ace App?

The latest version of the Ace App is 1.0.0-rc.1 (first "release candidate"). The application installers are distributed via the GitHub development website. Here are convenient download links:

* **MacOS**: download the [DMG file](https://github.com/daisy/ace-gui/releases/download/v1.0.0-rc.1/Ace.by.DAISY-1.0.0-rc.1.dmg), open it, and drag the `Ace by DAISY.app` file into your Applications folder.
* **Windows**: download the [NSIS installer](https://github.com/daisy/ace-gui/releases/download/v1.0.0-rc.1/Ace.by.DAISY.Setup.1.0.0-rc.1.exe), and follow the step-by-step instructions. Please ignore the security warning messages, they are due to the application [not being signed yet](https://github.com/daisy/ace-gui/issues/15).
* **Linux**: download the [AppImage file](https://github.com/daisy/ace-gui/releases/download/v1.0.0-rc.1/Ace.by.DAISY-1.0.0-rc.1.AppImage), and double-click the icon to immediately start using the application. Alternatively, you may download the [Debian package](https://github.com/daisy/ace-gui/releases/download/v1.0.0-rc.1/ace-gui_1.0.0-rc.1_amd64.deb) to install the app via your package manager (e.g. `sudo apt install ace-gui_1.0.0-rc.1_amd64.deb`).

## What are the notable features in the current release?

* Online/Offline integration of the [DAISY Knowledge Base](http://kb.daisy.org/publishing/docs/).
* English and French [localization](https://github.com/daisy/ace-gui/wiki/Localization).
* Latest [Ace](https://github.com/daisy/ace/releases/tag/v1.1.1) and [Axe](https://github.com/dequelabs/axe-core/blob/develop/CHANGELOG.md#331-2019-07-23) libs.
* Reduced application size (Axe now runs via Electron itself, the Puppeteer dependency has been removed)
* Signed and Notarized DMG for MacOS, using the official DAISY Code Signing Certificate (the Windows NSIS installer will be signed at a later stage).
* Software update notifications.

## Are there known limitations?

The most notable caveats in this pre-production release are:

* User documentation: lack of step-by-step instructions, in-depth tutorial (only quick-start guide)
* Visual presentation: sub-optimal user interface layout and report rendering (table view needs more "responsive design")
* Accessibility: less-then-ideal support for keyboard usage, and compatibility with screen readers
* Windows: security warnings due to present lack of code signing certificate, missing permissions to access configuration folder
* Multiple, successive evaluations: the state of the report table view is not reset, drag-and-drop support is limited
* Language localization: some menu items are not translated automatically, the platform language is not taken into account when starting the app, and only English and French are currently supported

Please use the [issue tracker](https://github.com/daisy/ace-gui/issues) to report problems, suggest features, etc.

## How can I obtain further information?

Please read the [full release notes](https://github.com/daisy/ace-gui/releases/tag/v1.0.0-rc.1) at the GitHub development website.

You may also take a look at the project's main [README page](https://github.com/daisy/ace-gui/blob/master/README.md).

Finally, a [quick-start guide](https://github.com/daisy/ace-gui/wiki/Quick-Start) provides essential information to get started, with screenshots for each step of the way.
