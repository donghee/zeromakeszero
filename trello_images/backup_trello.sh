rg trello * > ../trello_list.txt
sed -n -r '/<img/s/.*src="([^"]*)".*/\1/p' ../trello_list.txt  |sort|uniq > ../trello_urls.txt
rm ../trello_list.txt
#sed -i.bak '/ alt=\"/d' ../trello_urls.txt
mkdir ../trello_images
cd ../trello_images
cat ../trello_urls.txt | xargs -n 1 wget -nc
rm ../trello_urls.txt
