---
title: "Shebang"
description: ""
summary: ""
date: 2024-08-27T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 2000
seo:
  title: "Shebang"
  description: ""
  canonical: ""
  noindex: false
---

## 簡介

Shebang 係 Unix 同類 Unix 操作系統中嘅一個特殊符號__AB__由字符 `#!` 組成__AB__
用嚟指示腳本文件應該由邊個解釋器嚟執行。佢通常出喺腳本文件嘅第一行__AB__後面跟住解釋器嘅路徑。
Shebang 使得腳本文件能夠好似可執行程序一樣直接運行__AB__而唔使手動調用解釋器。

## 名稱由來

`#` 喺英文中表示 hash 或 sharp__AB__`!` 喺編程同命令行中表示 bang__AB__
呢兩個符號組合埋一齊就成咗 hash-bang 或 sharp-bang。
隨住時間嘅推移__AB__hash-bang 最終簡化為 shebang。

## 指定解釋器

Shebang 後面指定嘅路徑係解釋器嘅位置__AB__例如：

```bash {frame="none"}
#!/bin/bash
```

系統會使用該路徑下嘅 bash 嚟執行呢個腳本內容。

## 統一執行形式

唔同類型嘅腳本可以統一使用 `./file` 嘅形式執行__AB__無需顯式調用解釋器。

```bash {frame="none"}
#!/bin/bash
```

無需使用 `bash file` 執行__AB__直接使用 `./file`。

```bash {frame="none"}
#!/bin/python3
```

無需使用 `python file` 執行__AB__直接使用 `./file`。

## 常見例子

我哋喺 bash 腳本中常常會見到下面嘅例子。

```bash {frame="none"}
#!/usr/bin/env bash
```

`env` 係一個與環境變量相關嘅命令。
當後面跟嘅參數係 `bash` 時__AB__佢會根據環境變量 `PATH` 提供嘅路徑查找 bash 嘅解釋器。
咁樣做嘅好處係無需寫死 bash 解釋器嘅路徑__AB__因為喺唔同嘅系統中__AB__bash 解釋器可能會喺唔同嘅位置。

```bash {frame="none"}
type -a bash
```

```bash {frame="none"}
bash is /usr/bin/bash
bash is /bin/bash
```

對於上面嘅 python 例子__AB__更好嘅 Shebang 係使用 env。

```bash {frame="none"}
#!/usr/bin/env python
```

## 手動調用

如果冇 Shebang__AB__可以手動調用解釋器。

```bash {frame="none"}
bash script.sh
```
