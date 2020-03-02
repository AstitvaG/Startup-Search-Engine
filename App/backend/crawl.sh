# !/bib/bash

cd data_crawling
rm schools.json 2> /dev/null
scrapy crawl prototype -o schools.json --nolog
cd ..
cat data_crawling/schools.json