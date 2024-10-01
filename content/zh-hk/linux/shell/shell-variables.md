---
title: "Shell 變量"
description: ""
summary: ""
date: 2024-08-26T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 800
seo:
  title: "Shell 變量"
  description: ""
  canonical: ""
  noindex: false
---

## Shell 變量

Shell 變量係一個統稱__AB__如果用嘅係某個特定嘅 Shell__AB__例如 Bash__AB__咁可以稱佢為 Bash 變量。
但係呢度必須要注意__AB__Shell 變量唔係環境變量__AB__唔好畀佢嘅大寫迷惑咗__AB__以下係相關嘅官方文檔。

{{< link-card
  title="Shell Variables"
  description="Shell 變量"
  href="https://www.gnu.org/software/bash/manual/html_node/Shell-Variables.html"
  target="_blank"
>}}

{{< link-card
  title="Bash Variables"
  description="Bash 變量"
  href="https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html"
  target="_blank"
>}}

使用 man 指令__AB__然後搜索 `Shell Variables` 都可以睇到。

```bash {frame="none"}
man bash
```

```bash {frame="none"}
/Shell Variables
```

## 常見 Shell 變量

### PS1

Shell 命令提示符。

```bash {frame="none"}
echo $PS1
```

```bash {frame="none"}
\[\e]0;\u@\h: \w\a\]${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$
```

### UID

當前用戶 ID。

```bash {frame="none"}
echo $UID
```

```bash {frame="none"}
1000
```

### PPID

```bash {frame="none"}
ps -fp $PPID
```

```bash {frame="none"}
UID          PID    PPID  C STIME TTY          TIME CMD
kuga       46635   46570  0 10:56 ?        00:00:00 sshd: kuga@pts/0
```

可以睇到 bash 嘅父進程係 sshd。

### BASH\_VERSION

```bash {frame="none"}
echo $BASH_VERSION
```

```bash {frame="none"}
5.1.16(1)-release
```

### BASH\_SUBSHELL

Subshell 嘅嵌套級別__AB__從 0 開始。

```bash {frame="none"}
echo $BASH_SUBSHELL
```

```bash {frame="none"}
0
```

### SECONDS

Shell 啟動到而家嘅秒數。

```bash {frame="none"}
echo $SECONDS
```

```bash {frame="none"}
13963
```

### RANDOM

0 到 32767 嘅隨機數。

```bash {frame="none"}
echo $RANDOM
```

```bash {frame="none"}
1024
```

## 自定義 Shell 變量

[參考後面環境變量嘅章節](/zh-cn/linux/env/concept/#自定義-shell-變量)
