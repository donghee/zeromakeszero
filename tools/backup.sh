#!/bin/bash

echo '----'
echo '# zeromakeszero'
echo `date -I -d 'today'`

HOME=/home/donghee
PROJECT=zeromakeszero

# main
cd $HOME/src/github.com/donghee
tar cvfz $HOME/src/github.com/donghee/${PROJECT}_`date -I -d 'today'`.tar.gz --exclude "node_modules" --exclude ".git" $PROJECT
rclone copy -P $HOME/src/github.com/donghee/${PROJECT}_`date -I -d 'today'`.tar.gz gdrive:/backups/$PROJECT/
rm $HOME/src/github.com/donghee/${PROJECT}_`date -I -d 'today'`.tar.gz 

# wiki
WIKI_PROJECT=wiki.0makes0.com
tar cvfz $HOME/src/github.com/donghee/${WIKI_PROJECT}_`date -I -d 'today'`.tar.gz --exclude "node_modules" --exclude ".git" $WIKI_PROJECT
rclone copy -P $HOME/src/github.com/donghee/${WIKI_PROJECT}_`date -I -d 'today'`.tar.gz gdrive:/backups/$PROJECT/
rm $HOME/src/github.com/donghee/${WIKI_PROJECT}_`date -I -d 'today'`.tar.gz 
