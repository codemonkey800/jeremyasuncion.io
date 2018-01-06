#!/bin/bash

if [ -e dist ]; then
  rm -rf dist
fi

NODE_ENV=production yarn build
babel-node build-package-config > dist/package.json
pushd dist
  git init
  git add .
  git commit -m 'Deployed app!'
  git push -f dokku@jeremyasuncion.io:projects master
popd
