---
title: "命令行歷史記錄"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 500
seo:
  title: "命令行歷史記錄"
  description: ""
  canonical: ""
  noindex: false
---

## 神奇嘅 ^\[\[A

首先喺命令行啟動一個新嘅 Shell `/bin/sh`。

```bash {frame="none"}
/bin/sh
```

然後輸入以下命令，一切正常。

```bash {frame="none"}
ls -l
```

按一下方向鍵 ⬆️ 睇下上一條命令。

```bash {frame="none"}
^[[A
```

你會發現睇唔到上一條命令，取而代之嘅係呢幾個字符 `^[[A`。
呢個係因為早期嘅 sh 並唔支持睇命令嘅歷史記錄，直到 bash 先加咗呢個功能。

### ANSI 轉義序列

`^[[A` 係一個 ANSI 嘅轉義序列，表示上方向鍵。

* `^[`：表示 `Esc` 鍵（ASCII 編碼 27），係轉義序列嘅開始。
* `[A`：表示具體嘅操作，`[A` 表示上方向鍵。

當喺終端中按下上方向鍵時，終端會發送 `^[[A` 呢個字符序列畀程序，
通常用於調用命令歷史記錄中嘅上一條命令。
由於 sh 並唔支持睇命令嘅歷史記錄，佢會原樣輸出鍵位嘅字符序列。

### Ubuntu 中嘅 sh

喺 Ubuntu 中，sh 其實係一個指向 dash 嘅鏈接。

```bash {frame="none"}
file /bin/sh
```

```bash {frame="none"}
/bin/sh: symbolic link to dash
```

所以 dash 都唔支持睇命令嘅歷史記錄。

## 歷史記錄功能

### history 命令

唔帶參數會輸出所有歷史記錄。

```bash {frame="none"}
history
```

亦可以使用簡短命令，效果一樣。

```bash {frame="none"}
!!
```

### .bash\_history 文件

命令歷史記錄嘅持久化文件。

```bash {frame="none"}
-rw------- 1 kuga kuga 5516 Aug 24 08:23 /home/kuga/.bash_history
```

喺同 Shell 交互嘅過程中，命令嘅歷史記錄會被保存在內存入面。
使用 `history` 命令可以實時睇歷史記錄嘅變化，
但係只有當退出 Shell，歷史記錄先會被寫入到 `.bash_history` 文件中。
如果想即刻寫到歷史記錄嘅文件中，可以使用以下命令。

```bash {frame="none"}
history -a
```

## 環境變量

### HISTFILE

歷史記錄文件路徑。

```bash {frame="none"}
echo $HISTFILE
```

```bash {frame="none"}
/home/kuga/.bash_history
```

### HISTFILESIZE

歷史記錄文件大小。

```bash {frame="none"}
echo $HISTFILESIZE
```

```txt {frame="none"}
2000
```

### HISTSIZE

內存中歷史記錄列表嘅大小。

```bash {frame="none"}
echo $HISTSIZE
```

```txt {frame="none"}
1000
```
