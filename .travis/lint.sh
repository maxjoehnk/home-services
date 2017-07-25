#!/usr/bin/env sh
root=$(pwd)
for service in services/*/ ; do
    cd "$root/$service"
    npm run lint
done
