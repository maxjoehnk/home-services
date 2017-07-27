#!/usr/bin/env sh
root=$(pwd)
for service in services/*/ ; do
    echo "Installing Dependencies of $(basename $service)..."
    cd "$root/$service"
    npm i --ignore-scripts
done
