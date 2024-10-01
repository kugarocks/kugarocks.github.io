---
title: "Minichat"
description: ""
summary: ""
date: 2024-09-30T20:00:00+08:00
lastmod: 2024-09-30T20:00:00+08:00
weight: 300
seo:
  title: "Mini ChatRoom"
  description: ""
  canonical: ""
  noindex: false
---

## Introduction

Once I wanted to send a piece of text from one computer to another, but found that such a simple requirement didn't have a straightforward tool.
I asked ChatGPT, summarized the existing tools, and found that none of them were very useful.

| Method | Disadvantages |
| --- | --- |
| Airdrop | Create a file and search for devices |
| iMessage | Log in to Apple account |
| Universal Clipboard | Log in to Apple account |
| WeChat/QQ | Log in to two accounts |
| Email | What era is this? |

So why not write a chat room, and you can send it directly by accessing the webpage, using Cursor to develop is also very enjoyable.
The chat room also made some simple adaptations for mobile devices, and the service is deployed on the Alibaba Cloud Guangzhou node, with a very fast access speed.

{{< link-card
  title="Minichat"
  description="https://minichat.kugarocks.com"
  href="https://minichat.kugarocks.com"
  target="_blank"
>}}

{{< link-card
  title="Github Repository"
  description="kugarocks/minichat"
  href="https://github.com/kugarocks/minichat"
  target="_blank"
>}}

## Themes

When the service starts, you can specify the theme, and the default is Minions.

```bash {frame="none"}
go run main.go -theme minions
```

### Minions

| Name | Avatar |
| --- | --- |
| Stuart, Kevin | ![Stuart](images/minions/avatar/stuart.jpg) ![Kevin](images/minions/avatar/kevin.jpg) |
| Bob, Dave | ![Bob](images/minions/avatar/bob.jpg) ![Dave](images/minions/avatar/dave.jpg) |
| Jerry, Phil | ![Jerry](images/minions/avatar/jerry.jpg) ![Phil](images/minions/avatar/phil.jpg) |
| Tim, Mark | ![Tim](images/minions/avatar/tim.jpg) ![Mark](images/minions/avatar/mark.jpg) |

### One Piece

| Name | Avatar |
| --- | --- |
| Luffy, Zoro | ![Luffy](images/onepiece/avatar/luffy.jpg) ![Zoro](images/onepiece/avatar/zoro.jpg) |
| Nami, Sanji | ![Nami](images/onepiece/avatar/nami.jpg) ![Sanji](images/onepiece/avatar/sanji.jpg) |
| Robin, Franky | ![Robin](images/onepiece/avatar/robin.jpg) ![Franky](images/onepiece/avatar/franky.jpg) |
| Chopper, Usopp | ![Chopper](images/onepiece/avatar/chopper.jpg) ![Usopp](images/onepiece/avatar/usopp.jpg) |
| Brook | ![Brook](images/onepiece/avatar/brook.jpg) |

## Keywords

Keywords are also very simple, just define the technology stack you use, and modify it step by step according to your needs.
However, the keywords below are only a small part, because the entire process also includes a lot of details and optimizations, which are not expanded here.

```txt {frame="none"}
* Implement a simple real-time chat room
* Server-side uses Golang, Websocket
* Client-side uses web pages
```

```txt {frame="none"}
* The left side of the web page displays the list of online users
* Automatically generates a username when the web page is opened
* The username is randomly selected from the roles of the Avengers
* Cannot select duplicate usernames
* The total number of usernames is 20
```

```txt {frame="none"}
* The bottom right of the web page is the message input box
* The message input box supports multi-line input
* The message input box can be resized by dragging
```

```txt {frame="none"}
* The chat message window supports multi-line display
* The chat content is surrounded by a border
* The username is placed outside the border, above
```

```txt {frame="none"}
* A copy button is added to the top right of the message border
* After clicking the copy button, the text changes to "Copied"
* 1 second later, it returns to the original text
```

```txt {frame="none"}
* The message input box and chat message window are separated by a line
* You can drag up and down to change the size of the two windows
* The style of the page is changed to a terminal style
```

```txt {frame="none"}
* The color of the username is green
* Other colors use black, white, and gray
```
