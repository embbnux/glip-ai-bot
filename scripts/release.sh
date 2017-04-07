#!/bin/bash

workingBranch=$(git rev-parse --abbrev-ref HEAD)
git fetch heroku
git checkout heroku/master
git merge $workingBranch --no-edit
git push heroku HEAD:master
git checkout $workingBranch