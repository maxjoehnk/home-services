#!/usr/bin/env sh
root=$(pwd)

for library in shared/*/ ; do
    echo "Installing dependencies of library $(basename $library)..."
    cd "$root/$library"
    npm i --ignore-scripts
done

cd $root

for service in services/*/ ; do
    echo "Installing Dependencies of service $(basename $service)..."
    cd "$root/$service"
    npm i --ignore-scripts
done

cd $root

for frontend in frontends/*/ ; do
    echo "Installing dependencies of Frontend $(basename $frontend)..."
    cd "$root/$frontend"
    npm i
done
