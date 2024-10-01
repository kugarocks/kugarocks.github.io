---
title: "常用提示词"
alias: "Cursor 常用提示词"
description: ""
summary: ""
date: 2024-09-08T00:00:00+08:00
lastmod: 2024-09-08T00:00:00+08:00
weight: 100
seo:
  title: "Cursor 常用提示词"
  description: ""
  canonical: ""
  noindex: false
---

## Prompt

修改 markdown 的代码框类型。

```txt {frame="none"}
把 markdown 的代码框类型全部改成 bash {frame="none"}
```

* 我使用的模型是 `cursor-small`。
* 这里加了全部范围，所以会修改所有代码框类型。
* 如果不加全部，会检测代码框类型是否为 `bash`。
  * 是：修改。
  * 否：不修改。
