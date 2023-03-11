#!/usr/bin/env bash

#echo "The script you are running has basename $( basename -- "$0"; ), dirname $( dirname -- "$0"; )";
#echo "The present working directory is $( pwd; )";

MONGODB_DIR=$(dirname -- "$0")
$MONGODB_DIR/mongodb-linux-x86_64-debian92-3.6.23/bin/mongod --config $MONGODB_DIR/mongod.conf
