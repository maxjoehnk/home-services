#!/usr/bin/env sh
root=$(pwd)
result=0
for library in shared/*/ ; do
    echo "Testing library $(basename $library)..."
    cd "$root/$library"
    npm test --silent
    if [ $? != 0 ]; then
        result=1
    fi
done

cd $root

for service in services/*/ ; do
    echo "Testing service $(basename $service)..."
    cd "$root/$service"
    npm test --silent
    if [ $? != 0 ]; then
        result=1
    fi
done

cd $root

for frontend in frontends/*/ ; do
    echo "Testing frontend $(basename $frontend)..."
    cd "$root/$frontend"
    npm run test-ci --silent
    if [ $? != 0 ]; then
        result=1
    fi
done

exit $result
