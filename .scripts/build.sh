#!/bin/bash

# Start at the /blocks directory
cd blocks || exit

# Find all directories that contain a src/block.json file
for dir in $(find . -type d -name 'src' -exec test -e '{}/block.json' ';' -print -prune | sed 's/\/src//g'); do
    # Go to the directory
    cd $dir || exit
	### Check for package-lock.json and if exists delete it
	if [ -f "package-lock.json" ]; then
		echo "Deleting package-lock.json in $dir"
		rm package-lock.json
	fi
	## Check for node_modules
	if [ ! -d "node_modules" ]; then
		echo "Running npm install in $dir"
		npm install
	fi
    # Run npm build
    echo "Running npm build in $dir"
    npm run build
	# Delete the node_modules directory
	echo "Deleting node_modules in $dir"
	rm -rf node_modules
    # Go back to the /blocks directory
    cd - || exit
done
