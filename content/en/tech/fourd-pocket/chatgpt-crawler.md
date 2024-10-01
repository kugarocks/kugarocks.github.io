---
title: "用 ChatGPT 写爬虫"
description: ""
summary: ""
date: 2024-07-24T00:00:00+08:00
lastmod: 2024-09-08T00:00:00+08:00
weight: 500
seo:
  title: "用 ChatGPT 写爬虫"
  description: ""
  canonical: ""
  noindex: false
---

## ChatGPT Conversation

* 🤡：用 Python 写爬虫，可输入 URL
* 🤖：给了一个 Beautiful Soup 的例子
* 🤡：有什么方法可抓取 JS 动态生成的内容
* 🤖：可使用 Selenium、Scrapy + Splash
* 🤡：使用 Scrapy + Splash 的方法
* 🤖：以下是使用 Scrapy 的脚本示例

跑了一下，发现日志全打在屏幕上，于是去官网看了一下配置，发现可以指定日志文件、抓取深度、优先级等等。
再问一下 GPT 让他给一些配置的例子和注释，最后整理优化一下，得出了下面最终的输入。

```txt {frame="none"}
写一个 python 爬虫脚本
- 一共 4 个输入参数
- 第 1 个参数：开始抓取的 URL
- 第 2 个参数：匹配的关键字，支持多个
- 第 3 个参数：设置多个关键字匹配的与或关系
- 第 4 个参数：设置爬虫抓取的深度
- 当一个网页成功匹配多个关键字时，只记录一次
- 把匹配内容的 URL 输出到屏幕，一行一个
- 使用 splash 和 scrapy 技术
- scrapy 项目名称为 mycrawler
- scrapy 的日志级别为 INFO，日志文件为 spider.log
- scrapy 的配置单独放到 settings.py
- settings.py 中添加抓取深度的相关配置
- settings.py 中的每个配置添加中文注释
```

## ChatGPT Answer

下面是 ChatGPT 的回答，但我做了一些修改和优化。

### 安装 Splash

安装 Scrapy-Splash 以及 Splash 服务：

```bash {frame="none"}
pip install scrapy scrapy-splash
```

### 创建 Scrapy 项目

首先，在命令行中创建一个新的 Scrapy 项目：

```bash {frame="none"}
scrapy startproject mycrawler
```

### 在 Docker 运行 Splash

```bash {frame="none"}
docker run -p 8050:8050 scrapinghub/splash
```

### 修改 settings.py

```python {frame="none"}
# -*- coding: utf-8 -*-

# Scrapy settings for mycrawler project

BOT_NAME = 'mycrawler'

SPIDER_MODULES = ['mycrawler.spiders']
NEWSPIDER_MODULE = 'mycrawler.spiders'

# 使用 Splash 渲染 JavaScript 页面
SPLASH_URL = 'http://localhost:8050'

DOWNLOADER_MIDDLEWARES = {
    'scrapy_splash.SplashCookiesMiddleware': 723,
    'scrapy_splash.SplashMiddleware': 725,
    'scrapy.downloadermiddlewares.httpcompression.HttpCompressionMiddleware': 810,
}

SPIDER_MIDDLEWARES = {
    'scrapy_splash.SplashDeduplicateArgsMiddleware': 100,
}

DUPEFILTER_CLASS = 'scrapy_splash.SplashAwareDupeFilter'

# 抓取深度设置
DEPTH_LIMIT = 3  # 设置抓取深度限制
# 每次抓取的深度
DEPTH_STATS = True  # 启用深度统计
# 启用抓取深度统计
DEPTH_PRIORITY = 1  # 启用抓取深度优先级
# 设置抓取深度优先级，1 表示深度优先，-1 表示广度优先

# 日志设置
LOG_LEVEL = 'INFO'  # 日志级别
# 设置日志记录的级别为 INFO
LOG_FILE = 'spider.log'  # 日志文件
# 指定日志文件的路径

# 其他配置
ROBOTSTXT_OBEY = True  # 遵守 robots.txt 规则
# 爬虫是否遵守 robots.txt 规则，默认为 True

# 设置 User-Agent，模拟常见浏览器
#USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
```

### 创建爬虫

在 `mycrawler/spiders` 目录中创建一个新的爬虫文件 `my_spider.py`，内容如下：

```python {frame="none"}
import scrapy
from scrapy_splash import SplashRequest

class MySpider(scrapy.Spider):
    name = "my_spider"  # 定义爬虫的名称

    def __init__(self, start_url, keywords, logic, depth, *args, **kwargs):
        super(MySpider, self).__init__(*args, **kwargs)
        self.start_urls = [start_url]  # 初始化抓取的起始 URL
        self.keywords = keywords.split(',')  # 将关键字字符串拆分为列表
        self.logic = logic  # 设置关键字匹配的逻辑关系（与或关系）
        self.custom_settings = {'DEPTH_LIMIT': int(depth)}  # 设置抓取深度限制

    def start_requests(self):
        # 生成初始请求
        for url in self.start_urls:
            yield SplashRequest(url, self.parse, args={'wait': 1})

    def parse(self, response):
        # 解析响应内容
        # 获取页面文本并转为小写
        page_text = response.text.lower()
        # 检查每个关键字是否在页面文本中出现
        matches = [kw.lower() in page_text for kw in self.keywords]

        # 根据逻辑关系判断是否匹配成功
        if (self.logic == 'and' and all(matches)) or (self.logic == 'or' and any(matches)):
            # 记录匹配的 URL
            self.log(f'Matched URL: {response.url}')  
            print(response.url)

        # 获取页面中的所有链接，并进行递归抓取
        for next_page in response.css('a::attr(href)').getall():
            if next_page:
                yield SplashRequest(response.urljoin(next_page), self.parse, args={'wait': 1})
```

### 运行爬虫

使用命令行运行爬虫：

```bash {frame="none"}
scrapy crawl my_spider -a start_url='http://example.com' -a keywords='keyword1,keyword2' -a logic='and' -a depth=3
```

这个脚本会根据输入参数抓取网页，匹配关键字并输出匹配的 URL。

## 总结

ChatGPT 更像是一个引导的角色。
有时候你需要一个工具，可能你并不知道这个工具最后长什么样子。
但只要通过不断对话，一步步打磨，他总能给出你想要的答案。
这个过程还能学到不少的东西，只要你懂得如何提问。
