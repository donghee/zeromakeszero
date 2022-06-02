#!/bin/sh

mkdir -p backup/zeromakeszero-`date -I -d 'today'`
mongodump --out backup/zeromakeszero-`date -I -d 'today'` --db zeromakeszero
mongoexport --out backup/zeromakeszero-postits-`date -I -d 'today'`.json --db zeromakeszero --collection postits
mongoexport --out backup/zeromakeszero-answers-`date -I -d 'today'`.json --db zeromakeszero --collection answers
