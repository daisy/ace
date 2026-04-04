#!/bin/bash

npx --no --offline --include-workspace-root --workspace . taze

# for relativefilepath in packages/*; do
#     filename=`basename "${relativefilepath}"`
#     echo "${filename} (${relativefilepath})"
#     cd "${relativefilepath}"
#     npx --no --offline --include-workspace-root --workspace . taze
#     cd - &> /dev/null
# done
