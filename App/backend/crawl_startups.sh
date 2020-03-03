# !/bib/bash
cd data_crawling
rm items.json 2> /dev/null
if test -z "$2"
then
    scrapy crawl startupprototype -o items.json -t json -a domain="https://startuptracker.io/discover?filters[0][bm][o]=inc&filters[0][bm][q]=$1" --nolog >/dev/null
else
    scrapy crawl startupprototype -o items.json -t json -a domain="https://startuptracker.io/discover?filters[0][bm][o]=inc&filters[0][bm][q]=$1&filters[1][cc][q]=$2" --nolog >/dev/null
fi
cd ..
cat data_crawling/items.json