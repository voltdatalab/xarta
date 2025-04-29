#!/bin/bash

echo "$@"
echo "CADDY_CONTAINER_NAME: $CADDY_CONTAINER_NAME"
echo "REAL_HOST: $REAL_HOST"
node dist/index.js --internal-container "$CADDY_CONTAINER_NAME" --real-host "$REAL_HOST" $@