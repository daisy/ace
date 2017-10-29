+++
title = "Troubleshooting"
weight = 1
wip = true
+++

## Ace fails with "Unexpected error"

Erm… you probably just hit a bug in Ace.

You can first check the [issue tracker](https://github.com/daisy/ace/issues) to see if some already reported the issue. Don’t forget to included the closed issues in your search in case we fixed it already!

If you can’t find any mention of your issue in our tracker, please [file a new issue](https://github.com/daisy/ace/issues/new)!

You can run Ace with verbose logging (by using the command line option `--verbose`) to provide us with debugging information.

## I have a permission error when trying to install Ace as a super-user with `sudo`

If you tried to install Ace as a super-user with the command `sudo npm install -g ace-core`, you may have received the following error in return:

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
sudo npm install -g ace-core --unsafe-perm=true --allow-root
```
