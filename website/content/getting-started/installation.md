+++
title = "Installation"
weight = 2
+++

_Note: this documentation applies to the Ace by DAISY command line tool. For more information about the Ace by DAISY "desktop application" (as known as the Ace App), please [visit this page]({{<relref "getting-started/ace-app.md">}})._


## Minimum System Requirements

Operating systems: Microsoft Windows 10+, Apple MacOS High Sierra 10.13+, Linux 64-bit Ubuntu 14.04+, Debian 8+, openSUSE 13.3+, or Fedora Linux 24+

Ace is a NodeJS / Javascript program that launches either Electron or Puppeteer to execute the accessibility tests in headless Chromium webviews, see
[implementation notes]({{<relref "contributing/notes.md">}}). Ace has other software dependencies that require a modern NodeJS runtime, for security and performance reasons. NodeJS version 20 is required, and NodeJS 22 is recommended.

Further information:

* https://github.com/nodejs/release#release-schedule
* https://support.google.com/chrome/answer/95346
* https://support.google.com/chrome/thread/185534985/sunsetting-support-for-windows-7-8-8-1-in-early-2023
* https://support.google.com/chrome/a/thread/185534987
* https://www.electronjs.org/blog/windows-7-to-8-1-deprecation-notice
* https://www.electronjs.org/docs/latest/breaking-changes
* https://developer.chrome.com/docs/puppeteer/get-started/#usage

## Install Node.JS

* Go to [Node.JS](https://nodejs.org/)
* Download version 16+
* Double-click to install

## Install (or update) Ace

* After installing Node, open a shell window
  * On Windows: `Windows System->Command Prompt` _or_ `Start->Run->cmd.exe`
  * On Mac: `Applications->Utilities->Terminal`
* Type `npm install @daisy/ace -g` to install or update Ace

If everything went smoothly, you should now be able to run the `ace` command in your shell. You can test it out like this:

```
$ ace --version
1.3.6
```

{{% note %}}
The installation process will write various files on your computer, notably to the Node modules repository (typically located in `/usr/local/lib/node_modules` on macOS and Unix). Depending on your operating system configuration, you may or may not have the permissions to write files to these locations.

We recommend that you first try to run the installation command with the default permissions (i.e., as it is written in the previous instructions). If it fails, you may need to run the installation command as a super-user, with the following command:

```
sudo npm install -g @daisy/ace --unsafe-perm=true --allow-root
```

Note that the extra arguments are required to delegate the super-user permissions to the bundled Chromium installer.

Please refer to the [troubleshooting section]({{<relref "help/troubleshooting.md">}}) if you face any issues during the installation. As always, [we welcome any feedback or suggestion]({{<relref "help/troubleshooting.md">}}) to improve our tool or its documentation!
{{% /note %}}

Note that the 'beta' version is published with the ["next" NPM tag](https://www.npmjs.com/package/@daisy/ace/v/next), so can be installed with `npm install @daisy/ace@next -g`.
