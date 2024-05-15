#!/bin/bash

# Start at the /blocks directory
cd blocks || exit

# Find all directories that contain a src/block.json file
for dir in $(find . -type d -name 'src' -exec test -e '{}/block.json' ';' -print -prune | sed 's/\/src//g'); do
    # Go to the directory
    cd $dir || exit
	## Check for node_modules
	# Delete the node_modules directory
	if [ ! -d "node_modules" ]; then
		echo "Deleting node_modules in $dir"
	rm -rf node_modules
	fi
    # Go back to the /blocks directory
    cd - || exit
done
