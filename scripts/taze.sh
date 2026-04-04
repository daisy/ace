#!/bin/bash

# rm -rf node_modules/ && rm yarn.lock && sfw yarn

# npx --no --offline --include-workspace-root --workspace . taze
# npx --no --offline --include-workspace-root --workspace $PWD taze
# ===>
# npm error code ERR_INVALID_ARG_TYPE
# npm error The "paths[1]" argument must be of type string. Received undefined

(npm exec --no --offline -- taze --fail-on-outdated --all --force --recursive --include-locked --concurrency 10 --loglevel debug --cwd . && npm exec --no --offline -- taze major --fail-on-outdated --all --force --recursive --include-locked --concurrency 10 --loglevel debug --cwd .) || echo OK

# for relativefilepath in packages/*; do
#     filename=`basename "${relativefilepath}"`
#     echo "${filename} (${relativefilepath})"
#     #cd "${relativefilepath}"
#     npm exec --no --offline -- taze --force --cwd "${relativefilepath}" --all
#     #cd - &> /dev/null
# done
