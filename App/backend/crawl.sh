# !/bib/bash

cd data_crawling
rm schools.json
scrapy crawl prototype -o schools.json --nolog
cd ..