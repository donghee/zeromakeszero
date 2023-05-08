#!/bin/sh

./mongodb-linux-x86_64-debian92-3.6.23/bin/mongorestore --gzip --archive=./backup/zeromakeszero-`date -I -d 'today'`.gz
