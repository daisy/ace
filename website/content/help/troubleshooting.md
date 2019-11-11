+++
title = "Troubleshooting"
weight = 1
+++

## Ace fails with "Unexpected error"

Erm… you probably just hit a bug in Ace. Follow the [guidelines for submitting an issue]({{<relref "contributing/contributing.md#submitting-an-issue">}}). You may also [contact us]({{<ref "contact.md">}}).

## I receive an `EACCESS` error when trying to install Ace

You may receive an `EACCESS` error when you try to install Ace, for instance when installing the `puppeteer` dependency. This indicates the you do not have write permissions to the `npm` installation directories. You can fix this by following the [instructions in the `npm` documentation](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

## I receive an `EACCESS` error when trying to install Ace as a super-user with `sudo`

If you tried to install Ace as a super-user with the command `sudo npm install -g @daisy/ace`, you may have received the following error in return:

```
...
> node install.js

fs.js:924
  return binding.mkdir(pathModule._makeLong(path),
                 ^

Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/ace-core/node_modules/puppeteer/.local-chromium'
    at Error (native)
    at Object.fs.mkdirSync (fs.js:924:18)
...
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! puppeteer@0.12.0 install: `node install.js`
npm ERR! Exit status 1
```

You need to tell the installation scripts to enforce the super-user permissions. Try running instead:

```
sudo npm install -g @daisy/ace --unsafe-perm=true --allow-root
```

Note that the extra arguments are required to delegate the root permissions to the `npm` installation scripts of Ace’s dependencies (notably to the Google Chromium headless browser). See also the NPM documentation for the [`unsafe-perm` setting](https://docs.npmjs.com/misc/config#unsafe-perm).

## I receive an `ELIFECYCLE` error when trying to install Ace on Windows version `Windows_NT 10.0.16299`

This seems to be a [bug in `npm`](https://github.com/npm/npm/issues/18979). You can fix it by updating to more recent Node and npm versions.
