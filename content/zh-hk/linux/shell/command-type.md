---
title: "内建命令与外部命令"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 700
seo:
  title: "内建命令与外部命令"
  description: ""
  canonical: ""
  noindex: false
---

## 内建命令

Builtin Commands。
内建命令是由 Shell 自身实现的命令，它们在 Shell 内部运行，
**无需启动新进程**或调用外部程序，是 Shell 操作的基本功能。

### 常见的内建命令

* `cd`：更改当前工作目录。
* `echo`：输出字符串到终端。
* `exit`：退出当前 Shell 会话。
* `export`：设置或导出环境变量。
* `alias`：为命令创建别名。
* `set`：设置 Shell 选项和变量。
* `read`：从标准输入读取一行并赋值给变量。

### 完整的内键命令

{{< link-card
  title="Bash Builtin Commands"
  description="Bash 内建命令"
  href="https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html"
  target="_blank"
>}}

## 外部命令

External Commands。
外部命令是指那些不是由 Shell 自身实现的命令，而是系统中的可执行文件。
当你运行一个外部命令时，Shell 会通过查找 `PATH` 环境变量中的目录，
找到对应的可执行文件，并**启动一个新进程**来运行该命令。

### 常见的外部命令

* `/bin/ls`：列出目录内容。
* `/usr/bin/grep`：搜索文件中内容。
* `/bin/cat`：显示文件内容。
* `/bin/mkdir`：创建目录。

## 区分内建命令与外部命令

### 使用 type 命令

```bash {frame="none"}
type cd
```

```bash {frame="none"}
cd is a shell builtin
```

***

```bash {frame="none"}
type cat
```

```bash {frame="none"}
cat is /usr/bin/cat
```

### 列出所有实现

```bash {frame="none"}
type -a pwd
```

```bash {frame="none"}
pwd is a shell builtin
pwd is /usr/bin/pwd
pwd is /bin/pwd
```

上面列出了 pwd 的内建实现和外部实现，如果要使用外部实现，需要使用完整路径。

### 列出命令的别名

```bash {frame="none"}
type -a ls
```

```bash {frame="none"}
ls is aliased to `ls --color=auto'
ls is /usr/bin/ls
ls is /bin/ls
```

另外使用 `which` 命令只会显示外部命令。
