---
title: "用 ChatGPT 寫爬蟲"
description: ""
summary: ""
date: 2024-07-24T00:00:00+08:00
lastmod: 2024-09-08T00:00:00+08:00
weight: 500
seo:
  title: "用 ChatGPT 寫爬蟲"
  description: ""
  canonical: ""
  noindex: false
---

## ChatGPT 對話

* 🤡：用 Python 寫爬蟲__AB__可輸入 URL
* 🤖：畀咗一個 Beautiful Soup 嘅例子
* 🤡：有咩方法可抓取 JS 動態生成嘅內容
* 🤖：可使用 Selenium、Scrapy + Splash
* 🤡：使用 Scrapy + Splash 嘅方法
* 🤖：以下係使用 Scrapy 嘅腳本示例

跑咗一下__AB__發現日誌全打喺屏幕上__AB__於是去官網睇咗一下配置__AB__發現可以指定日誌文件、抓取深度、優先級等等。
再問一下 GPT 讓佢畀啲配置嘅例子同註釋__AB__最後整理優化一下__AB__得出咗下面最終嘅輸入。

```txt {frame="none"}
寫一個 python 爬蟲腳本
- 一共 4 個輸入參數
- 第 1 個參數：開始抓取嘅 URL
- 第 2 個參數：匹配嘅關鍵字__AB__支持多個
- 第 3 個參數：設置多個關鍵字匹配嘅與或關係
- 第 4 個參數：設置爬蟲抓取嘅深度
- 當一個網頁成功匹配多個關鍵字時__AB__只記錄一次
- 把匹配內容嘅 URL 輸出到屏幕__AB__一行一個
- 使用 splash 同 scrapy 技術
- scrapy 項目名稱為 mycrawler
- scrapy 嘅日誌級別為 INFO__AB__日誌文件為 spider.log
- scrapy 嘅配置單獨放到 settings.py
- settings.py 中添加抓取深度嘅相關配置
- settings.py 中嘅每個配置添加中文註釋
```

## ChatGPT 回答

下面係 ChatGPT 嘅回答__AB__但我做咗啲修改同優化。

### 安裝 Splash

安裝 Scrapy-Splash 以及 Splash 服務：

```bash {frame="none"}
pip install scrapy scrapy-splash
```

### 創建 Scrapy 項目

首先__AB__喺命令行中創建一個新嘅 Scrapy 項目：

```bash {frame="none"}
scrapy startproject mycrawler
```

### 喺 Docker 運行 Splash

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

# 使用 Splash 渲染 JavaScript 頁面
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

# 抓取深度設置
DEPTH_LIMIT = 3  # 設置抓取深度限制
# 每次抓取嘅深度
DEPTH_STATS = True  # 啟用深度統計
# 啟用抓取深度統計
DEPTH_PRIORITY = 1  # 啟用抓取深度優先級
# 設置抓取深度優先級__AB__1 表示深度優先__AB__-1 表示廣度優先

# 日誌設置
LOG_LEVEL = 'INFO'  # 日誌級別
# 設置日誌記錄嘅級別為 INFO
LOG_FILE = 'spider.log'  # 日誌文件
# 指定日誌文件嘅路徑

# 其他配置
ROBOTSTXT_OBEY = True  # 遵守 robots.txt 規則
# 爬蟲是否遵守 robots.txt 規則__AB__默認為 True

# 設置 User-Agent__AB__模擬常見瀏覽器
#USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
```

### 創建爬蟲

喺 `mycrawler/spiders` 目錄中創建一個新嘅爬蟲文件 `my_spider.py`__AB__內容如下：

```python {frame="none"}
import scrapy
from scrapy_splash import SplashRequest

class MySpider(scrapy.Spider):
    name = "my_spider"  # 定義爬蟲嘅名稱

    def __init__(self, start_url, keywords, logic, depth, *args, **kwargs):
        super(MySpider, self).__init__(*args, **kwargs)
        self.start_urls = [start_url]  # 初始化抓取嘅起始 URL
        self.keywords = keywords.split(',')  # 將關鍵字字符串拆分為列表
        self.logic = logic  # 設置關鍵字匹配嘅邏輯關係（與或關係）
        self.custom_settings = {'DEPTH_LIMIT': int(depth)}  # 設置抓取深度限制

    def start_requests(self):
        # 生成初始請求
        for url in self.start_urls:
            yield SplashRequest(url, self.parse, args={'wait': 1})

    def parse(self, response):
        # 解析響應內容
        # 獲取頁面文本並轉為小寫
        page_text = response.text.lower()
        # 檢查每個關鍵字是否喺頁面文本中出現
        matches = [kw.lower() in page_text for kw in self.keywords]

        # 根據邏輯關係判斷是否匹配成功
        if (self.logic == 'and' and all(matches)) or (self.logic == 'or' and any(matches)):
            # 記錄匹配嘅 URL
            self.log(f'Matched URL: {response.url}')  
            print(response.url)

        # 獲取頁面中嘅所有鏈接__AB__並進行遞歸抓取
        for next_page in response.css('a::attr(href)').getall():
            if next_page:
                yield SplashRequest(response.urljoin(next_page), self.parse, args={'wait': 1})
```

### 運行爬蟲

使用命令行運行爬蟲：

```bash {frame="none"}
scrapy crawl my_spider -a start_url='http://example.com' -a keywords='keyword1,keyword2' -a logic='and' -a depth=3
```

呢個腳本會根據輸入參數抓取網頁__AB__匹配關鍵字並輸出匹配嘅 URL。

## 總結

ChatGPT 更似係一個引導嘅角色。
有時你需要一個工具__AB__可能你並唔知道呢個工具最後長咩樣。
但只要通過不斷對話__AB__一步步打磨__AB__佢總能畀出你想要嘅答案。
呢個過程仲可以學到唔少嘢__AB__只要你懂得點樣提問。
