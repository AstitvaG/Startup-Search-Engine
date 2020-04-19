import scrapy
# from prototype.item import StackItem
import json
from scrapy.item import Item, Field
from scrapy.selector import Selector

class StackItem(Item):
    name = Field()
    website = Field()
    description = Field()
    city = Field()
    country = Field()
    foundingdate = Field()
    # keywords = Field()
    size_employees = Field()
    twitter = Field()
    facebook = Field()
    linkedin = Field()
    alexarank = Field()
    alexaviews = Field()
    founders = Field()
    providers = Field()
class QuotesSpider(scrapy.Spider):
    d = "none"
    def __init__(self,url=None, *args, **kwargs):
        self.url = url
        print("url is ",self.url)
        self.start_urls = [url]
    name = "indstupprototype"

    def parse(self, response):
        # print("huadbcdiuscbhsdiuhcbsudbdcuhdbu  hbduo")
        page = response.url.split("/")[-2]
        item = StackItem()
        # print("+++++++++++++++++++++++++++++++++++++++++++++++++++")
        questions = response.selector.xpath('/html/body/script[2]').get()
        q = questions[30:-10]
        false = False
        null = None
        true = True
        j = eval(q)
        # print("=============================\n\n\n",j)
        # print("-------------------------",type(j))
        # print(j['startupProfile'])
        # print('----------------------------------------------------------------------------------------------\n\n\n')
        # i = j['startupProfile']
        # print(i['data']['info'])
        # print(i['data']['founders'])
        # print("===========\n\n\n\n")
        # yield item
        # item['keywords'] = j['startupProfile']['data']['detailedInfo']['keywords']
       
       
        item['name'] = j['startupProfile']['data']['info']['name']
        item['website'] = j['startupProfile']['data']['info']['website']
        item['description'] = j['startupProfile']['data']['info']['shortDescription']
        item['city'] = j['startupProfile']['data']['info']['city']
        item['country'] = j['startupProfile']['data']['info']['country']
        item['foundingdate'] = j['startupProfile']['data']['info']['foundingDate']
        item['size_employees'] = j['startupProfile']['data']['size']['employees']
        item['twitter'] = j['startupProfile']['data']['size']['twitter']
        item['facebook'] = j['startupProfile']['data']['size']['facebook']
        item['linkedin'] = j['startupProfile']['data']['size']['linkedin']
        item['alexarank'] = j['startupProfile']['data']['size']['alexaRank']
        item['alexaviews'] = j['startupProfile']['data']['size']['alexaPageViews']
        item['founders'] = j['startupProfile']['data']['founders']
        item['providers'] = j['startupProfile']['data']['providers']
        print(item)
        yield item
        
        
