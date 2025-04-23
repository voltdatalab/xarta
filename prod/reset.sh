#!/bin/bash

# Force the script to use project's root directory instead of the current working directory
# See: https://stackoverflow.com/a/24114056
scriptDir=$(dirname -- "$(readlink -f -- "$BASH_SOURCE")")
echo "Script dir: ${scriptDir}"
pushd $scriptDir/..

. ./tools/scripts/utils.sh

# Function to perform cleanup
echo "Exiting the script. Cleaning up..."
# Run docker compose down to stop and remove the containers
$sudo_cmd docker compose --profile setup down --volumes --remove-orphans

popd