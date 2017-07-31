#!/usr/bin/env sh
root=$(pwd)
result=0
for library in shared/*/ ; do
    echo "Testing library $(basename $library)..."
    cd "$root/$library"
    npm test
    if [ $? != 0 ]; then
        result=1
    fi
done

cd $root

for service in services/*/ ; do
    echo "Testing service $(basename $service)..."
    cd "$root/$service"
    npm test
    if [ $? != 0 ]; then
        result=1
    fi
done

exit $result
