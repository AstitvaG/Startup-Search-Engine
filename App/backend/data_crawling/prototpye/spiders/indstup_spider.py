import scrapy
# from prototype.items import StackItem
import json
from scrapy.item import Item, Field
from scrapy.selector import Selector

class StackItem(Item):
    # year = Field()
    # date = Field()
    # city = Field()
    country = Field()
    # team_size = Field()
class QuotesSpider(scrapy.Spider):
    d = "none"
    def __init__(self,url=None, *args, **kwargs):
        self.url = url
        print("url is ",self.url)
        self.start_urls = [url]
    name = "indstupprototype"

    def parse(self, response):
        print("huadbcdiuscbhsdiuhcbsudbdcuhdbu  hbduo")
        page = response.url.split("/")[-2]
        item = StackItem()
        print("+++++++++++++++++++++++++++++++++++++++++++++++++++")
        questions = response.selector.xpath('/html/body/script[2]').get()
        q = questions[30:-10]
        item['country'] = q
        false = False
        null = None
        true = True
        j = eval(q)
        print("=============================\n\n\n",j)
        print("-------------------------",type(j))
        print(j['startupProfile'])
        print('----------------------------------------------------------------------------------------------\n\n\n')
        i = j['startupProfile']
        print(i['data']['info'])
        print(i['data']['founders'])
        print("===========\n\n\n\n")
        # yield item
        
