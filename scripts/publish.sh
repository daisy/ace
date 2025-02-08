#!/bin/bash

for relativefilepath in packages/*; do
    filename=`basename "${relativefilepath}"`
    echo "${filename} (${relativefilepath})"
    cd "${relativefilepath}"
    if [ "${filename}" != "ace-core-legacy" ]; then
        # --dry-run
        # npm publish --access public --tag=next .
        npm publish --access public --tag=latest .
    fi
    cd - &> /dev/null
done
