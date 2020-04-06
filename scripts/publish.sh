#!/bin/bash

for relativefilepath in packages/*; do
    filename=`basename "${relativefilepath}"`
    echo "${filename} (${relativefilepath})"
    cd "${relativefilepath}"
    if [ "${filename}" != "ace-core-legacy" ]; then
        # --dry-run
        npm publish --access public --tag=next .
    fi
    cd - &> /dev/null
done
