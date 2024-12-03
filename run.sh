#! /bin/bash

cd "./$1"

if [ ! -f "main.ts" ]; then
    node "./main.js"
else
    npx tsx "main.js"
fi

