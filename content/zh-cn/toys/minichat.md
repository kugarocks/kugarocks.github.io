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

## 简介

有一次我想把一段文本从一台电脑发到另一台电脑上，但发现如此简单的需求却没有直接了当的工具。
问了一下 ChatGPT，总结了一下现有的工具，发现都不太好用。

| 方法 | 缺点 |
| --- | --- |
| Airdrop | 创建文件和搜索设备 |
| iMessage | 登录苹果账号 |
| 通用剪贴板 | 登录苹果账号 |
| 微信/QQ | 登录两个账号 |
| 邮件 | 什么年代了 |

那不如自己写一个聊天室，访问一下网页直接发送就行了，用 Cursor 开发还很快乐。
聊天室对移动端也做了一些简单的适配，服务部署在阿里云广州节点，访问速度嘎嘎快。

{{< link-card
  title="Minichat"
  description="迷你聊天室"
  href="https://minichat.kugarocks.com"
  target="_blank"
>}}

{{< link-card
  title="Github Repository"
  description="GitHub 仓库"
  href="https://github.com/kugarocks/minichat"
  target="_blank"
>}}

## 主题

服务启动的时候可以指定主题，默认是小黄人。

```bash {frame="none"}
go run main.go -theme onepiece
```

### 小黄人主题

| 名称 | 头像 |
| --- | --- |
| Stuart, Kevin | ![Stuart](images/minions/avatar/stuart.jpg) ![Kevin](images/minions/avatar/kevin.jpg) |
| Bob, Dave | ![Bob](images/minions/avatar/bob.jpg) ![Dave](images/minions/avatar/dave.jpg) |
| Jerry, Phil | ![Jerry](images/minions/avatar/jerry.jpg) ![Phil](images/minions/avatar/phil.jpg) |
| Tim, Mark | ![Tim](images/minions/avatar/tim.jpg) ![Mark](images/minions/avatar/mark.jpg) |

### 海贼王主题

| 名称 | 头像 |
| --- | --- |
| Luffy, Zoro | ![Luffy](images/onepiece/avatar/luffy.jpg) ![Zoro](images/onepiece/avatar/zoro.jpg) |
| Nami, Sanji | ![Nami](images/onepiece/avatar/nami.jpg) ![Sanji](images/onepiece/avatar/sanji.jpg) |
| Robin, Franky | ![Robin](images/onepiece/avatar/robin.jpg) ![Franky](images/onepiece/avatar/franky.jpg) |
| Chopper, Usopp | ![Chopper](images/onepiece/avatar/chopper.jpg) ![Usopp](images/onepiece/avatar/usopp.jpg) |
| Brook | ![Brook](images/onepiece/avatar/brook.jpg) |

## 提示词

提示词也很简单，只要定义好使用的技术栈，根据自己的需求一步步修改就行了。
不过下面的提示词只是很小一部份，因为整个过程还包括大量的细节和优化，这里就不展开了。

```txt {frame="none"}
* 实现一个简单的实时聊天室
* 服务端使用 Golang、Websocket
* 客户端使用网页
```

```txt {frame="none"}
* 网页左侧显示在线用户列表
* 当网页打开时自动生成用户名
* 用户名随机从复仇者联盟的角色中选取
* 不能选取重复的用户名
* 用户名的总数为 20 个
```

```txt {frame="none"}
* 网页右侧下方是消息输入框
* 消息输入框支持多行输入
* 消息输入框可以拖动调整大小
```

```txt {frame="none"}
* 聊天消息窗口支持多行显示
* 聊天内容用边框包围
* 用户名放在边框的外面，上方
```

```txt {frame="none"}
* 消息边框的右上方添加复制按钮
* 点击复制按钮后文字改为已复制
* 1 秒之后恢复为原来的文字
```

```txt {frame="none"}
* 消息输入框和聊天消息窗口用一条线分隔
* 可以上下拖动这条线来改变两个窗口大小
* 页面的风格改成终端形式
```

```txt {frame="none"}
* 用户名字的颜色用绿色
* 其它颜色用点黑白灰
```
