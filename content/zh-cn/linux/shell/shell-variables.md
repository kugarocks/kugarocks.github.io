---
title: "Shell 变量"
description: ""
summary: ""
date: 2024-08-26T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 800
seo:
  title: "Shell 变量"
  description: ""
  canonical: ""
  noindex: false
---

## Shell Variables

Shell 变量是一个统称，如果用的是某个特定的 Shell，例如 Bash，那么可以称它为 Bash 变量。
但这里必须要注意，Shell 变量不是环境变量，不要被它的大写迷惑了，以下是相关的官方文档。

{{< link-card
  title="Shell Variables"
  description="Shell 变量"
  href="https://www.gnu.org/software/bash/manual/html_node/Shell-Variables.html"
  target="_blank"
>}}

{{< link-card
  title="Bash Variables"
  description="Bash 变量"
  href="https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html"
  target="_blank"
>}}

使用 man 指令，然后搜索 `Shell Variables` 也能查看。

```bash {frame="none"}
man bash
```

```bash {frame="none"}
/Shell Variables
```

## 常见 Shell 变量

### PS1

Shell 命令提示符。

```bash {frame="none"}
echo $PS1
```

```bash {frame="none"}
\[\e]0;\u@\h: \w\a\]${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$
```

### UID

当前用户 ID。

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

可以看到 bash 的父进程是 sshd。

### BASH\_VERSION

```bash {frame="none"}
echo $BASH_VERSION
```

```bash {frame="none"}
5.1.16(1)-release
```

### BASH\_SUBSHELL

&#x20;Subshell 的嵌套级别，从 0 开始。

```bash {frame="none"}
echo $BASH_SUBSHELL
```

```bash {frame="none"}
0
```

### SECONDS

Shell 启动到现在的秒数。

```bash {frame="none"}
echo $SECONDS
```

```bash {frame="none"}
13963
```

### RANDOM

0 \~ 32767 随机数。

```bash {frame="none"}
echo $RANDOM
```

```bash {frame="none"}
1024
```

## 自定义 Shell 变量

todo：参考后面环境变量的章节。