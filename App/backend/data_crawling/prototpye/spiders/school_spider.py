import scrapy
# from prototype.items import StackItem
from scrapy.item import Item, Field
from scrapy.selector import Selector

class StackItem(Item):
    title = Field()
    address = Field()
class QuotesSpider(scrapy.Spider):
    name = "prototype"
    start_urls = [
        'https://study4sure.com/institutes/schools/telangana/hyderabad/',
        'https://study4sure.com/institutes/schools/telangana/hyderabad/school.php?place=Musheerbad',
    ]

    def parse(self, response):
        page = response.url.split("/")[-2]
        for quote in response.css('div.main_part_content_mar_bottom'):
            item = StackItem()
            # item[quote.css('h3::text').get()] = quote.css('p::text').getall()
            item['title'] = quote.css('h3::text').get()
            item['address'] = quote.css('p::text').getall()
            # yield {
            #     quote.css('h3::text').get(): quote.css('p::text').getall(),
            # }
            yield item
        next_page = response.css('li a::attr(href)').get()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)
    # def parse(self, response):
    #     questions = Selector(response).xpath('//div[@class="main_part_content_mar_bottom"]/h3')
        
    #     for question in questions:
    #         item = StackItem()
    #         item['title'] = question.xpath(
    #             'a[@class="main_part_content_mar_bottom"]/h3').extract()[0]
    #         item['url'] = question.xpath(
    #             'a[@class="main_part_content_mar_bottom"]/text()').extract()[0]
    #         yield item
