import scrapy
# from prototype.items import StackItem
from scrapy.item import Item, Field
from scrapy.selector import Selector

class StackItem(Item):
    title = Field()
    description = Field()
    domains = Field()
    url = Field()
    image = Field()
class QuotesSpider(scrapy.Spider):
    d = "none"
    def __init__(self,domain=None, *args, **kwargs):
        self.domain = domain
        print("domain is ",self.domain)
        self.start_urls = [domain+"&page=0"]
        self.p = 1
    name = "startupprototype"
    # start_urls = [
    #     # 'https://study4sure.com/institutes/schools/telangana/hyderabad/',
    #     # 'https://study4sure.com/institutes/schools/telangana/hyderabad/school.php?place=Musheerbad',
    #     'https://startuptracker.io/discover?filters%5B0%5D%5Bce%5D%5Bq%5D=101-250&filters%5B1%5D%5Bcc%5D%5Bq%5D=IN&page=0',
    #     # 'https://startuptracker.io/discover?filters%5B0%5D%5Bcc%5D%5Bq%5D=IN&page=0',
    #     # domain
    # ]
    # def __init__(self, category=None):
    #     self.start_urls = ['https://startuptracker.io/discover?filters%5B0%5D%5Bcc%5D%5Bq%5D=IN&page=%s' % category]

    def parse(self, response):
        # print("d is",d)
        page = response.url.split("/")[-2]
        for quote in response.css('div._jmleooi'):
            item = StackItem()
            # item[quote.css('h3::text').get()] = quote.css('p::text').getall()
            # item['title'] = quote.css('h3::text').get()
            # item['address'] = quote.css('p::text').getall()
            item['title'] = quote.css('p._cty35ls::text').get()
            item['description'] = quote.css('p._1ygjwwud::text').get()
            item['domains'] = quote.css('span._1yjc2n9b::text').getall()
            item['url'] = quote.css('a::attr(href)').get()
            item['image'] = quote.css('div._1765bnk::attr(style)').get()
            yield item
        for quote in response.css('div._bnto90'):
            item = StackItem()
            item['title'] = quote.css('p._cty35ls::text').get()
            item['description'] = quote.css('p._1ygjwwud::text').get()
            item['domains'] = quote.css('span._1yjc2n9b::text').getall()
            item['url'] = quote.css('a::attr(href)').get()
            item['image'] = quote.css('div._1765bnk::attr(style)').get()
            yield item
        next_page = self.domain+"&page=0"
        l = response.selector.xpath('/html/body/div[1]/div/div[5]/div/div/div[5]/span[3]').get()
        # print("hello ",l)
        if(l):
            if (l.find("_1db1909") == -1): 
                print("NO") 
            else: 
                print("YES") 
                # next_page = response.urljoin(next_page)
                next_page = self.domain+"&page="+str(self.p)
                print("next page is ",next_page)
                yield scrapy.Request(next_page, callback=self.parse)
                self.p = self.p + 1
        # if next_page is not None:
    # def parse(self, response):
    #     questions = Selector(response).xpath('//div[@class="main_part_content_mar_bottom"]/h3')
        
    #     for question in questions:
    #         item = StackItem()
    #         item['title'] = question.xpath(
    #             'a[@class="main_part_content_mar_bottom"]/h3').extract()[0]
    #         item['url'] = question.xpath(
    #             'a[@class="main_part_content_mar_bottom"]/text()').extract()[0]
    #         yield item
