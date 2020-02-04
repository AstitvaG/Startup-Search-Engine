import scrapy


class QuotesSpider(scrapy.Spider):
    name = "prototype"
    start_urls = [
        'https://study4sure.com/institutes/schools/telangana/hyderabad/',
    ]

    def parse(self, response):
        page = response.url.split("/")[-2]
        for quote in response.css('div.main_part_content_mar_bottom'):
            yield {
                quote.css('h3::text').get(): quote.css('p::text').getall(),
            }
        next_page = response.css('li a::attr(href)').get()
        if next_page is not None:
            next_page = response.urljoin(next_page)
            yield scrapy.Request(next_page, callback=self.parse)