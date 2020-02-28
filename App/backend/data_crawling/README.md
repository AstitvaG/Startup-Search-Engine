# DASS25

Team 25

## Protoype for the phrase "school management system"

### System requirements

* `python3`
* `scrapy` module

### Running

* Go to 'prototype' folder
* Run the command 

    `scrapy crawl prototype`
* To store the result in schools.json run the command 

    `scrapy crawl prototype -o schools.json`
* To view the result from file use the command

    `python3 -m json.tool schools.json`
