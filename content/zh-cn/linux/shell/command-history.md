---
title: "命令行历史记录"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 500
seo:
  title: "命令行历史记录"
  description: ""
  canonical: ""
  noindex: false
---
<!--  -->

## 神奇的 ^\[\[A

首先在命令行启动一个新 Shell `/bin/sh`。

```bash {frame="none"}
/bin/sh
```

然后输入以下命令，一切正常。

```bash {frame="none"}
ls -l
```

按一下方向键 ⬆️ 查看上一条命令。

```bash {frame="none"}
^[[A
```

你会发现看不到上一条命令，取而代之的是这几个字符 `^[[A`。
这是因为早期的 sh 并不支持查看命令的历史记录，直到 bash 才把这个功能加了上去。

### ANSI 转义序列

`^[[A` 是一个 ANSI 的转义序列，表示上方向键。

* `^[`：表示 `Esc` 键（ASCII 编码 27），是转义序列的开始。
* `[A`：表示具体的操作，`[A` 表示上方向键。

当在终端中按下上方向键时，终端会发送 `^[[A` 这个字符序列给程序，
通常用于调用命令历史记录中的上一条命令。
由于 sh 并不支持查看命令的历史记录，它会原样输出键位的字符序列。

### Ubuntu 中的 sh

在 Ubuntu 中，sh 其实是一个指向 dash 的链接。

```bash {frame="none"}
file /bin/sh
```

```bash {frame="none"}
/bin/sh: symbolic link to dash
```

因此 dash 也不支持查看命令的历史记录。

## 历史记录功能

### history 命令

不带参数会输出所有历史记录。

```bash {frame="none"}
history
```

也可以使用简短命令，效果一样。

```bash {frame="none"}
!!
```

### .bash\_history 文件

命令历史记录的持久化文件。

```bash {frame="none"}
-rw------- 1 kuga kuga 5516 Aug 24 08:23 /home/kuga/.bash_history
```

在和 Shell 交互的过程中，命令的历史记录会被保存在内存里。
使用 `history` 命令可以实时查看历史记录的变化，
但只有当退出 Shell，历史记录才会被写入到 `.bash_history` 文件中。
如果想立刻写到历史记录的文件中，可以使用以下命令。

```bash {frame="none"}
history -a
```

## 环境变量

### HISTFILE

历史记录文件路径。

```bash {frame="none"}
echo $HISTFILE
```

```bash {frame="none"}
/home/kuga/.bash_history
```

### HISTFILESIZE

历史记录文件大小。

```bash {frame="none"}
echo $HISTFILESIZE
```

```txt {frame="none"}
2000
```

### HISTSIZE

内存中历史记录列表的大小。

```bash {frame="none"}
echo $HISTSIZE
```

```txt {frame="none"}
1000
```
