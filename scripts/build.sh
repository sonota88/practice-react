#!/bin/bash

scripts/clean.sh

node_modules/.bin/babel src -d tmp/babeled
node_modules/.bin/webpack --config webpack.config.js
