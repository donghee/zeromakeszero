#!/bin/sh

ls {*.JPG,*.jpg} | awk '{print "convert "$1" -resize 1500x -quality 75 "NR".jpg;rm "$1}' | /bin/sh
