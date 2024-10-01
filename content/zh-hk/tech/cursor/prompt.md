---
title: "常用提示詞"
alias: "Cursor 常用提示詞"
description: ""
summary: ""
date: 2024-09-08T00:00:00+08:00
lastmod: 2024-09-08T00:00:00+08:00
weight: 100
seo:
  title: "Cursor 常用提示詞"
  description: ""
  canonical: ""
  noindex: false
---

## Prompt

### 修改代碼類型

修改 markdown 嘅代碼框類型。

```txt {frame="none"}
把 markdown 嘅代碼框類型全部改成 bash {frame="none"}
```

* 我使用嘅模型係 `cursor-small`。
* 呢度加咗全部範圍，所以會修改所有代碼框類型。
* 如果唔加全部，會檢測代碼框類型係咪 `bash`。
  * 係：修改。
  * 唔係：唔修改。

### 中文翻譯英文

```txt {frame="none"}
翻譯成英文，如果係標題，則每個單詞嘅首字母大寫。
```

### 中文翻譯繁體-HK

```txt {frame="none"}
把中文翻譯成香港嘅粵語繁體中文。
```
