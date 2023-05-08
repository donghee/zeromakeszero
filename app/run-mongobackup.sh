#!/bin/sh

mkdir -p backup/zeromakeszero-`date -I -d 'today'`
./mongodb-linux-x86_64-debian92-3.6.23/bin/mongodump --db zeromakeszero --gzip --archive=./backup/zeromakeszero-`date -I -d 'today'`.gz
./mongodb-linux-x86_64-debian92-3.6.23/bin/mongoexport --out backup/zeromakeszero-postits-`date -I -d 'today'`.json --db zeromakeszero --collection postits
./mongodb-linux-x86_64-debian92-3.6.23/bin/mongoexport --out backup/zeromakeszero-answers-`date -I -d 'today'`.json --db zeromakeszero --collection answers
