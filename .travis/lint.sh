#!/usr/bin/env sh
root=$(pwd)
for service in services/*/ ; do
    echo "Linting $(basename $service)..."
    cd "$root/$service"
    npm run lint
done
