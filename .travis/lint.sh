#!/usr/bin/env sh
root=$(pwd)
for library in shared/*/ ; do
    echo "Linting library $(basename $library)..."
    cd "$root/$library"
    npm run lint
done

cd $root

for service in services/*/ ; do
    echo "Linting service $(basename $service)..."
    cd "$root/$service"
    npm run lint
done
