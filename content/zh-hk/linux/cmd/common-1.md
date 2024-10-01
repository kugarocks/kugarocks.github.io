---
title: "常用命令-1"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-09-04T20:00:00+08:00
weight: 1000
seo:
  title: "常用命令-1"
  description: ""
  canonical: ""
  noindex: false
---

## MAN

呢個指令可以睇手冊頁中唔同嘅章節（Section）。

```bash {frame="none"}
man man
```

```bash {frame="none" text-wrap="wrap"}
man - an interface to the system reference manuals

The table below shows the section numbers of the manual followed by the types of pages they contain.

1 Executable programs or shell commands
2 System calls (functions provided by the kernel)
3 Library calls (functions within program libraries)
4 Special files (usually found in /dev)
5 File formats and conventions, e.g. /etc/passwd
6 Games
7 Miscellaneous (including macro packages and conventions), e.g. man(7), groff(7)
8 System administration commands (usually only for root)
9 Kernel routines [Non standard]
```

### Section

```bash {frame="none"}
man 1 ls/cp/mv
man 2 write/open/close
man 3 printf/malloc/free
man 4 tty/null/random
man 5 passwd/fstab
man 7 man
man 8 ifconfig/iptables/mount
man 9 fork # not work
```

### Games

`fortune` 可以隨機嘅名言警句同笑話。

```bash {frame="none"}
apt install fortune/fortune-mod/fortunes-zh
```

```bash {frame="none"}
man 6 fortune
```

```bash {frame="none"}
fortune - print a random, hopefully interesting, adage
```

可以結合 `cowsay` 同 `lolcat` 一齊玩。

```bash {frame="none"}
fortune | cowsay | lolcat
```

## PWD

Print Working Directory。

```bash {frame="none"}
man pwd
```

```bash {frame="none"}
pwd - print name of current/working directory
```

## CAT

```bash {frame="none"}
man cat
```

```bash {frame="none"}
cat - concatenate files and print on the standard output
```

### 顯示行號 - 包括空行

```bash {frame="none"}
cat -n FILE
```

### 顯示行號 - 唔包括空行

```bash {frame="none"}
cat -b FILE
```

## LS

```bash {frame="none"}
man ls
```

```bash {frame="none"}
ls - list directory contents
```

### 文件詳細信息

```bash {frame="none"}
ls -lh
```

```bash {frame="none"}
drwx------ 9 root root 4.0K   Aug  7 22:38 root
crw-rw-rw- 1 root tty  5,   0 Aug  7 22:33 /dev/tty
brw-rw---- 1 root disk 252, 0 Aug  7 21:30 /dev/vda
```

* 文件類型：`d` 目錄，`-` 文件，`l` 鏈接，`c` 字符設備，`b` 塊設備。
* 文件權限：700，Owner: 7，Group: 0, Other: 0
* 硬鏈接數：9
* 文件屬主：root
* 文件組別：root
* 文件大小：4.0K
* 修改時間：Aug 7 22:38
* 文件名稱：root
* 主設備號：Major Number，5/252，標識設備驅動程序
* 次設備號：Minor Number，0，標識同一類設備中嘅某個設備實例

### 只顯示目錄

```bash {frame="none"}
ls -ld */
```

包括隱藏文件

```bash {frame="none"}
ls -ld .*/ */
```

### 顯示特定目錄信息

```bash {frame="none"}
ls -ld /usr
```

### 喺文件後面添加類型符號

```bash {frame="none"}
ls -lF /
```

* `/`：目錄
* `*`：可執行文件
* `@`：符號鏈接
* `|`：命名管道
* `=`：套接字

### 隱藏字符

```bash {frame="none"}
ls ~ | wc -l
```

`ls` 命令嘅輸出中有隱藏字符 `\n`。

```bash {frame="none"}
ls ~ | od -c
```

```bash {frame="none"}
0000000   f   i   l   e  \n   f   o   o  \n   f   o   o   b   a   r  \n
0000020
```

仲可以用 `cat -A`。

```bash {frame="none"}
ls ~ | cat -A
```

```bash {frame="none"}
file$
foo$
foobar$
```

## FILE

顯示文件類型

```bash {frame="none"}
man file
```

```bash {frame="none"}
file — determine file type
```

### 字符/塊設備

```bash {frame="none"}
file /dev/tty
```

```bash {frame="none"}
/dev/tty: character special (5/0)
```

***

```bash {frame="none"}
file /dev/vda
```

```bash {frame="none"}
/dev/vda: block special (252/0)
```

### 鏈接文件

注意結尾斜杆。

```bash {frame="none"}
file /bin
```

```bash {frame="none"}
/bin: symbolic link to usr/bin
```

***

```bash {frame="none"}
file /bin/
```

```bash {frame="none"}
/bin/: directory
```

## LESS

`more` 命令只能按回車加載，`less` 命令更強大，因為 less is more。

```bash {frame="none"}
man less
```

```bash {frame="none"}
less - opposite of more
```

## USERMOD

```bash {frame="none"}
man usermod
```

```bash {frame="none"}
usermod - modify a user account
```

### 禁止賬號登錄

```bash {frame="none"}
usermod -s /sbin/nologin kuga
```

呢個命令會喺 `/etc/passwd` 中把 `bin/sh` 改為 `/sbin/nologin`

```bash {frame="none"}
kuga:x:1000:1000::/home/kuga:/sbin/nologin
```

### 授權用戶組

下面嘅命令會俾 kuga 用戶授權 sudo 用戶組。

```bash {frame="none"}
usermod -aG sudo kuga
```

## LN

```bash {frame="none"}
man ln
```

```bash {frame="none"}
ln - make links between files
```

### 軟鏈接

go rocks

## DF

```bash {frame="none"}
man df
```

```bash {frame="none"}
df - report file system disk space usage
```

### 以可讀格式輸出

```bash {frame="none"}
df -h
```

### 指定文件系統類型

```bash {frame="none"}
df -h -t ext4
```

```bash {frame="none"}
df -h -t apfs
```

`ext4` 係 Linux 嘅文件系統類型，`apfs` 係 macOS 嘅文件系統類型。

## DU

Disk Usage

```bash {frame="none"}
man du
```

```bash {frame="none"}
du - estimate file space usage
```

### 睇文件/目錄總大小

```bash {frame="none"}
du -sh ~/Downloads
```

### 排序文件 - 含子目錄

```bash {frame="none"}
du -ah ~/Downloads/* | sort -rh | head -n 5
```

```bash {frame="none"}
du -ah ~/Downloads --max-depth=1 | sort -rh | head -n 10
```

### 排序文件 - 唔含子目錄

```bash {frame="none"}
du -sh ~/Downloads/* | sort -rh | head -n 5
```
