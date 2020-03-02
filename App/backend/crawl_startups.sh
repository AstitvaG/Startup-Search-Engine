# !/bib/bash

cd data_crawling
rm items.json 2> /dev/null
scrapy crawl startupprototype -o items.json -t json -a domain="https://startuptracker.io/discover?filters%5B0%5D%5Bcc%5D%5Bq%5D=IN" --nolog
cd ..
