# !/bib/bash
cd data_crawling
rm items_ind.json 2> /dev/null
scrapy crawl indstupprototype -o items_ind.json -t json -a url=$1 --nolog > /dev/null
cd ..
cat data_crawling/items_ind.json