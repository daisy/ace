#!/bin/sh

echo "ZIPPING: $1"
epub="../$1.epub"
cd "$1"
rm "$epub"
echo "-----"
ls -al1
echo "-----"
zip -X "$epub" mimetype
ls -1 | sed 's/^mimetype$//g' | grep -v "^$" | tr "\n" "\0" | xargs -0 -I{} zip -rg "$epub" "{}" -x \*.DS_Store
echo "-----"
ls -als "$epub"
cd - &> /dev/null
