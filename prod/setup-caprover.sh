#!/bin/bash

set -e

# Force the script to use project's root directory instead of the current working directory
# See: https://stackoverflow.com/a/24114056
scriptDir=$(dirname -- "$(readlink -f -- "$BASH_SOURCE")")
echo "Script dir: ${scriptDir}"
pushd $scriptDir/..


# Configure sudo if required, verify docker is running
. ./tools/scripts/utils.sh

# Source .env to get variables like $PROJECT_NAME
source .env

echo "Initializing ${PROJECT_NAME}"

# TODO: Change this to production and dev
$sudo_cmd docker compose up ghost caddy -d --build

clear

$sudo_cmd docker compose run --build setup-helper --cap-rover

popd