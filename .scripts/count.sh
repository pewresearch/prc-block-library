#!/bin/bash

# Start at the /blocks directory
cd blocks || exit

# Count the number of directories
ls -l | grep "^d" | wc -l
