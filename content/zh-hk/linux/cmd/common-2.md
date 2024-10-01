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

預設按字符嘅編碼排序，唔係數值。

```bash {frame="none"}
sort - sort lines of text files
```

### 按逆序排列

```bash {frame="none"}
sort -r file
```

### 按數值排序

```bash {frame="none"}
sort -n file
```

### 按月份排序

月份格式：`Jan`、`Feb`、`Mar`。

```bash {frame="none"}
sort -M file
```

### 指定列

預設按（連續嘅）空格或者制表符分隔。

```bash {frame="none"}
sort -k 1 file
```

### 指定分隔符同列

`-k` 下標由 1 開始，第 3 列係用戶 ID。

```bash {frame="none"}
sort -t ':' -k 3 -n /etc/passwd
```

### 忽略大小寫

```bash {frame="none"}
sort -f file
```

### 結果去重

```bash {frame="none"}
sort -u file
```

## ALIAS

```bash {frame="none"}
sort - sort lines of text files
```

### 睇可能嘅別名

```bash {frame="none"}
alias -p
```

## TYPE

### 外/內部命令

可以睇命令係咪內部命令，內部命令同 Shell 編譯成一體，同外部命令唔同，唔使子進程執行。

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

### 睇所有實現

```bash {frame="none"}
type -a echo
```

```bash {frame="none"}
echo is a shell builtin
echo is /usr/bin/echo
echo is /bin/echo
```

### 睇命令嘅別名

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

### 睇最後嘅鏈接

唔使一個一個睇。

```bash {frame="none"}
readlink -f /bin/vim
```

```bash {frame="none"}
/usr/bin/vim.basic
```
