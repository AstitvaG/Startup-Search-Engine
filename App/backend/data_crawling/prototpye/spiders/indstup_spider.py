import scrapy
# from prototype.item import StackItem
import json
from scrapy.item import Item, Field
from scrapy.selector import Selector
import time
class StackItem(Item):
    name = Field()
    website = Field()
    description = Field()
    city = Field()
    country = Field()
    domains = Field()
    funding_raised = Field()
    funding_rounds = Field()
    image = Field()
    foundingdate = Field()
    keywords = Field()
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
        try:
            item['image'] = j['startupProfile']['data']['image']['url']
        except:
            item['image'] = null
        try:
            item['domains'] = j['startupProfile']['data']['detailedInfo']['keywords']
        except:
            item['domains'] = null
        try:
            item['funding_raised'] = j['startupProfile']['data']['size']['fundingRaised']
        except:
            item['funding_raised'] = null
        try:
            item['funding_rounds'] = j['startupProfile']['data']['size']['fundingRounds']
        except:
            item['funding_rounds'] = null
        try:
            item['name'] = j['startupProfile']['data']['info']['name']
        except:
            item['name'] = null
        try:
            item['website'] = j['startupProfile']['data']['info']['website']
        except:
            item['website'] = null
        try:
            item['description'] = j['startupProfile']['data']['info']['shortDescription']
        except:
            item['description'] = null
        try:
            item['city'] = j['startupProfile']['data']['info']['city']
        except:
            item['city'] = null
        try:
            item['country'] = j['startupProfile']['data']['info']['country']
        except:
            item['country'] = null
        try:
            item['foundingdate'] = time.strftime('%Y-%m-%d', time.localtime(j['startupProfile']['data']['info']['foundingDate']))
        except:
            item['foundingdate'] = null
        try:
            item['size_employees'] = j['startupProfile']['data']['size']['employees']
        except:
            item['size_employees'] = null
        try:
            item['twitter'] = j['startupProfile']['data']['size']['twitter']
        except:
            item['twitter'] = null
        try:
            item['facebook'] = j['startupProfile']['data']['size']['facebook']
        except:
            item['facebook'] = null
        try:
            item['linkedin'] = j['startupProfile']['data']['size']['linkedin']
        except:
            item['linkedin'] = null
        try:
            item['alexarank'] = j['startupProfile']['data']['size']['alexaRank']
        except:
            item['alexarank'] = null
        try:
            item['alexaviews'] = j['startupProfile']['data']['size']['alexaPageViews']
        except:
            item['alexaviews'] = null
        try:
            item['founders'] = j['startupProfile']['data']['founders']
        except:
            item['founders'] = null
        try:
            item['providers'] = j['startupProfile']['data']['providers']
        except:
            item['providers'] = null
        print(item)
        yield item
        
        
