#!/bin/bash

echo "Install server's dependences - BEGIN"

cd server

cp ./package.server.json ./package.json

npm i

rm ./package.json

echo "Install server's dependences - END"
