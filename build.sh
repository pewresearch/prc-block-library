#!/bin/bash

# Start at the /blocks directory
cd /blocks

# Find all directories that contain a src/block.json file
for dir in $(find . -type d -name 'src' -exec test -e '{}/block.json' ';' -print -prune | sed 's/\/src//g'); do
    # Go to the directory
    cd $dir
	## Check for node_modules
	if [ ! -d "node_modules" ]; then
		echo "Running npm install in $dir"
		npm install
	fi
    # Run npm build
    echo "Running npm build in $dir"
    npm run build
    # Go back to the /blocks directory
    cd -
done
