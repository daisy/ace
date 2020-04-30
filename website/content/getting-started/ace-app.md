+++
title = "The Ace App"
weight = 4
+++

## What is the Ace by DAISY App?

Ace by DAISY App is the official graphical user interface for the EPUB accessibility checker developed by the [DAISY Consortium](http://daisy.org). The Ace App is available for the Windows, MacOS and Linux desktop operating systems.

## Where can I download the Ace App?

The latest version of the Ace App is 1.1.1. The application installers are distributed via the GitHub development website. Here are convenient download links:

* **MacOS**: download the [DMG file](https://github.com/daisy/ace-gui/releases/download/v1.1.1/Ace.by.DAISY-1.1.1.dmg), open it, and drag the `Ace by DAISY.app` file into your Applications folder.
* **Windows**: download the [NSIS installer](https://github.com/daisy/ace-gui/releases/download/v1.1.1/Ace.by.DAISY.Setup.1.1.1.exe), and follow the step-by-step instructions.
* **Linux**: download the [AppImage file](https://github.com/daisy/ace-gui/releases/download/v1.1.1/Ace.by.DAISY-1.1.1.AppImage), and double-click the icon to immediately start using the application. Alternatively, you may download the [Debian package](https://github.com/daisy/ace-gui/releases/download/v1.1.1/ace-gui_1.1.1_amd64.deb) to install the app via your package manager (e.g. `sudo apt install ace-gui_1.1.1_amd64.deb`).

## How can I obtain further information?

Please read the [full release notes](https://github.com/daisy/ace-gui/releases/tag/v1.1.1) at the GitHub development website.

You may also take a look at the project's main [README page](https://github.com/daisy/ace-gui/blob/master/README.md).

## "Quick Start" User Guide

### Install

_Please [read this section]({{<relref "#where-can-i-download-the-ace-app">}}) for more information on how to download the latest version of Ace App._

The following screenshots illustrate the process of installing Ace App on MacOS:

![screenshot 1](https://raw.githubusercontent.com/daisy/ace-gui/master/doc/AceApp1.png)

![screenshot 2](https://raw.githubusercontent.com/daisy/ace-gui/master/doc/AceApp2.png)

![screenshot 3](https://raw.githubusercontent.com/daisy/ace-gui/master/doc/AceApp3.png)

### First Launch

EPUB files can be drag-and-dropped onto the main logo area of the user interface, or onto the "Check EPUB" menu item inside the panel on the left.

Alternatively, a "file chooser" can be opened by using the top-level system menu bar "File" -> "Check EPUB..." (CMD/CTRL-O keyboard shortcut), or by clicking on the underlined "click to browse" link below the logo in the main area of the user interface.

![screenshot 4](https://raw.githubusercontent.com/daisy/ace-gui/master/doc/AceApp4.png)

### Running an Accessibility Evaluation

For this demonstration, let's use the file named `accessible_epub_3.epub` downloaded from the IDPF's [EPUB3 samples website](http://idpf.github.io/epub3-samples/30/samples.html).

The accessibility evaluation process may take some time (usually, no more than a few seconds), as shown by a "spinner" progress indicator, and as specified in the logging area at the bottom of the window.

![screenshot 5](https://raw.githubusercontent.com/daisy/ace-gui/master/doc/AceApp5.png)

### Using the Report

Once the process is completed, the Ace report is presented using multiple section tabs. The default section shows a summary of all information, including statistics about accessibility violations.

![screenshot 6](https://raw.githubusercontent.com/daisy/ace-gui/master/doc/AceApp6.png)

The "violations" tab displays an interactive table where columns can be sorted alphabetically:

![screenshot 7](https://raw.githubusercontent.com/daisy/ace-gui/master/doc/AceApp7.png)

The report data can be filtered for each possible field and values:

![screenshot 8](https://raw.githubusercontent.com/daisy/ace-gui/master/doc/AceApp8.png)

The report data is paginated to limit the amount of vertical scrolling, and the maximum number of rows displayed in any given page can be configured:

![screenshot 9](https://raw.githubusercontent.com/daisy/ace-gui/master/doc/AceApp9.png)

The other section tabs "metadata", "outlines" and "images" function in exactly the same manner.

The report can be exported as a zip archive, using the "Export" menu item in the panel on the left. The report can be re-generated using the "Rerun" menu item. These commands are also available in the top-level system menu bar, inside the "File" submenu.

### Using the DAISY Knowledge Base

Note the [DAISY Knowledge Base](http://kb.daisy.org/publishing/docs/) ("KB") links in the right-most "Details" column. When clicked, these links open a separate window loaded with the local offline version of the "KB" documentation, from which the online web version can be reach too (see the red "GO ONLINE" link in the upper right corner of the window, which opens the default web browser to the corresponding "KB" URL):

![screenshot 10](https://raw.githubusercontent.com/daisy/ace-gui/master/doc/AceApp10.png)

The DAISY Knowledge Base can also be opened directly from the top-level system menu bar, "Help" -> "Knowledge Base" (Local/Offline, Web/Online).

### Configuring User Preferences

The "Settings" menu item in the panel on the left opens a modal popup dialog where user preferences can be set. This includes the language selection (currently French and English), as well as advanced parameters for the underlying Ace tool (these normally do not need customizing):

![screenshot 11](https://raw.githubusercontent.com/daisy/ace-gui/master/doc/AceApp11.png)

The top-level system menu bar "View" -> "Show in Finder" (note that the actual Windows, Linux and MacOS naming may differ) opens a filesystem explorer pointing to the location of the Ace report, as per the default path specified in the settings dialog.
