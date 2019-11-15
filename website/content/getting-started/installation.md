+++
title = "Installation"
weight = 2
+++

_Note: this documentation applies to the Ace by DAISY command line tool. For more information about the Ace by DAISY "desktop application" (as known as the Ace App), please [visit this page]({{<relref "getting-started/ace-app.md">}})._

## Install Node.JS

* Go to [Node.JS](https://nodejs.org/)
* Download version 6.4.0 or higher
* Double-click to install

## Install (or update) Ace

* After installing Node, open a shell window
  * On Windows: `Windows System->Command Prompt` _or_ `Start->Run->cmd.exe`
  * On Mac: `Applications->Utilities->Terminal`
* Type `npm install @daisy/ace -g` to install or update Ace

If everything went smoothly, you should now be able to run the `ace` command in your shell. You can test it out like this:

```
$ ace --version
1.0.0
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