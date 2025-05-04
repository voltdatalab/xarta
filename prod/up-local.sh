#!/bin/bash

set -e

# Force the script to use project's root directory instead of the current working directory
# See: https://stackoverflow.com/a/24114056
scriptDir=$(dirname -- "$(readlink -f -- "$BASH_SOURCE")")
echo "Script dir: ${scriptDir}/.."
pushd $scriptDir/..

. ./tools/scripts/utils.sh

# Source .env to get variables like $PROJECT_NAME
source .env

echo "Current directory: $(pwd)"
echo "Initializing ${PROJECT_NAME}"

# Build and start containers
$sudo_cmd docker compose -f docker-compose.yml -f docker-compose.local.yml up --build -d

popd