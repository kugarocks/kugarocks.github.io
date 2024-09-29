---
title: "常用命令-2"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-29T20:00:00+08:00
weight: 1100
seo:
  title: "常用命令-2"
  description: ""
  canonical: ""
  noindex: false
---

## SORT

默认按字符的编码排序，非数值。

```bash {frame="none"}
sort - sort lines of text files
```

### 按逆序排列

```bash {frame="none"}
sort -r file
```

### 按数值排序

```bash {frame="none"}
sort -n file
```

### 按月份排序

月份格式：`Jan`、`Feb`、`Mar`。

```bash {frame="none"}
sort -M file
```

### 指定列

默认按（连续的）空格或制表符分隔。

```bash {frame="none"}
sort -k 1 file
```

### 指定分隔符和列

`-k` 下标从 1 开始，第 3 列为用户 ID。

```bash {frame="none"}
sort -t ':' -k 3 -n /etc/passwd
```

### 忽略大小写

```bash {frame="none"}
sort -f file
```

### 结果去重

```bash {frame="none"}
sort -u file
```

## ALIAS

```bash {frame="none"}
sort - sort lines of text files
```

### 查看可能别名

```bash {frame="none"}
alias -p
```

## TYPE

### 外/内部命令

可查看命令是否内部命令，内部命令与 Shell 编译成一体，与外部命令不同，无须子进程执行。

```bash {frame="none"}
type cd
```

```bash {frame="none"}
cd is a shell builtin
```

***

```bash {frame="none"}
type ps
```

```bash {frame="none"}
ps is hashed (/usr/bin/ps)
```

### 查看所有实现

```bash {frame="none"}
type -a echo
```

```bash {frame="none"}
echo is a shell builtin
echo is /usr/bin/echo
echo is /bin/echo
```

### 查看命令的别名

```bash {frame="none"}
type ll
```

```bash {frame="none"}
ll is aliased to `ls -alF'
```

***

```bash {frame="none"}
type -a ls
```

```bash {frame="none"}
ls is aliased to `ls --color=auto'
ls is /usr/bin/ls
ls is /bin/ls
```

## READLINK

```bash {frame="none"}
readlink - print resolved symbolic links or canonical file names
```

### 查看最后的链接

不用一个一个看了。

```bash {frame="none"}
readlink -f /bin/vim
```

```bash {frame="none"}
/usr/bin/vim.basic
```
