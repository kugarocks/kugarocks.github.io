---
title: "迷你聊天室"
description: ""
summary: ""
date: 2024-09-30T20:00:00+08:00
lastmod: 2024-09-30T20:00:00+08:00
weight: 300
seo:
  title: "迷你聊天室"
  description: ""
  canonical: ""
  noindex: false
---

## 簡介

有一次我想把一段文本從一台電腦發到另一台電腦上，但發現如此簡單的需求卻冇直接了當嘅工具。
問咗一下 ChatGPT，總結咗一下現有嘅工具，發現都唔太好用。

| 方法 | 缺點 |
| --- | --- |
| Airdrop | 創建文件同搜索設備 |
| iMessage | 登錄蘋果賬號 |
| 通用剪貼板 | 登錄蘋果賬號 |
| 微信/QQ | 登錄兩個賬號 |
| 電郵 | 乜年代啦 |

咁不如自己寫一個聊天室，訪問一下網頁直接發送就得啦，用 Cursor 開發仲好開心。
聊天室對移動端都做咗啲簡單嘅適配，服務部署喺阿里雲廣州節點，訪問速度嘎嘎快。

{{< link-card
  title="Minichat"
  description="迷你聊天室"
  href="https://minichat.kugarocks.com"
  target="_blank"
>}}

{{< link-card
  title="Github Repository"
  description="kugarocks/minichat"
  href="https://github.com/kugarocks/minichat"
  target="_blank"
>}}

## 主題

服務啟動嘅時候可以指定主題，默認係小黃人。

```bash {frame="none"}
go run main.go -theme onepiece
```

### 小黃人

| 名稱 | 頭像 |
| --- | --- |
| Stuart, Kevin | ![Stuart](images/minions/avatar/stuart.jpg) ![Kevin](images/minions/avatar/kevin.jpg) |
| Bob, Dave | ![Bob](images/minions/avatar/bob.jpg) ![Dave](images/minions/avatar/dave.jpg) |
| Jerry, Phil | ![Jerry](images/minions/avatar/jerry.jpg) ![Phil](images/minions/avatar/phil.jpg) |
| Tim, Mark | ![Tim](images/minions/avatar/tim.jpg) ![Mark](images/minions/avatar/mark.jpg) |

### 海賊王

| 名稱 | 頭像 |
| --- | --- |
| Luffy, Zoro | ![Luffy](images/onepiece/avatar/luffy.jpg) ![Zoro](images/onepiece/avatar/zoro.jpg) |
| Nami, Sanji | ![Nami](images/onepiece/avatar/nami.jpg) ![Sanji](images/onepiece/avatar/sanji.jpg) |
| Robin, Franky | ![Robin](images/onepiece/avatar/robin.jpg) ![Franky](images/onepiece/avatar/franky.jpg) |
| Chopper, Usopp | ![Chopper](images/onepiece/avatar/chopper.jpg) ![Usopp](images/onepiece/avatar/usopp.jpg) |
| Brook | ![Brook](images/onepiece/avatar/brook.jpg) |

## 提示詞

提示詞都好簡單，只要定義好使用嘅技術棧，根據自己嘅需求一步步修改就得啦。
不過下面嘅提示詞只係好少一部分，因為成個過程仲包括大量嘅細節同優化，呢度就唔展開講啦。

```txt {frame="none"}
* 實現一個簡單嘅實時聊天室
* 服務端使用 Golang、Websocket
* 客戶端使用網頁
```

```txt {frame="none"}
* 網頁左側顯示在線用戶列表
* 當網頁打開時自動生成用戶名
* 用戶名隨機從復仇者聯盟嘅角色中選取
* 唔可以選取重複嘅用戶名
* 用戶名嘅總數為 20 個
```

```txt {frame="none"}
* 網頁右側下方係消息輸入框
* 消息輸入框支持多行輸入
* 消息輸入框可以拖動調整大小
```

```txt {frame="none"}
* 聊天消息窗口支持多行顯示
* 聊天內容用邊框包圍
* 用戶名放喺邊框嘅外面，上方
```

```txt {frame="none"}
* 消息邊框嘅右上方添加複製按鈕
* 點擊複製按鈕後文字改為已複製
* 1 秒之後恢復為原來嘅文字
```

```txt {frame="none"}
* 消息輸入框同聊天消息窗口用一條線分隔
* 可以上下拖動呢條線嚟改變兩個窗口大小
* 頁面嘅風格改成終端形式
```

```txt {frame="none"}
* 用戶名嘅顏色用綠色
* 其他顏色用啲黑白灰
```
