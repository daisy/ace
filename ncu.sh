#!/bin/bash

ncu

for relativefilepath in packages/*; do
    filename=`basename "${relativefilepath}"`
    echo "${filename} (${relativefilepath})"
    cd "${relativefilepath}"
    ncu
    cd - &> /dev/null
done
