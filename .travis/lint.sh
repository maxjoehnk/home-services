#!/usr/bin/env sh
root=$(pwd)
result=0
for library in shared/*/ ; do
    echo "Linting library $(basename $library)..."
    cd "$root/$library"
    npm run lint --silent
    if [ $? != 0 ]; then
        result=1
    fi
done

cd $root

for service in services/*/ ; do
    echo "Linting service $(basename $service)..."
    cd "$root/$service"
    npm run lint --silent
    if [ $? != 0 ]; then
        result=1
    fi
done

cd $root

for frontend in frontends/*/ ; do
    echo "Linting frontend $(basename $frontend)..."
    cd "$root/$frontend"
    npm run lint --silent
    if [ $? != 0 ]; then
        result=1
    fi
done

exit $result
