#!/bin/bash

workingBranch=$(git rev-parse --abbrev-ref HEAD)
echo Your branch:$workingBranch
git checkout heroku
git merge $workingBranch
git push heroku heroku:master
git checkout $workingBranch