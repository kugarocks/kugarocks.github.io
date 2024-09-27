---
title: "用 Cursor 写聊天室"
description: ""
summary: ""
date: 2024-09-08T00:00:00+08:00
lastmod: 2024-09-08T00:00:00+08:00
weight: 900
seo:
  title: "用 Cursor 写聊天室"
  description: ""
  canonical: ""
  noindex: false
---

## Prompt

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
