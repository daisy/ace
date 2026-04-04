#!/bin/bash

taze

for relativefilepath in packages/*; do
    filename=`basename "${relativefilepath}"`
    echo "${filename} (${relativefilepath})"
    cd "${relativefilepath}"
    taze
    cd - &> /dev/null
done
