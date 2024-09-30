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

该指令可以查看手册页中不同的章节（Section）。

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

`fortune` 可以随机的名言警句和笑话。

```bash {frame="none"}
apt install fortune/fortune-mod/fortunes-zh
```

```bash {frame="none"}
man 6 fortune
```

```bash {frame="none"}
fortune - print a random, hopefully interesting, adage
```

可以结合 `cowsay` 和 `lolcat` 一起玩。

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

### 显示行号 - 包括空行

```bash {frame="none"}
cat -n FILE
```

### 显示行号 - 不包括空行

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

### 文件详细信息

```bash {frame="none"}
ls -lh
```

```bash {frame="none"}
drwx------ 9 root root 4.0K   Aug  7 22:38 root
crw-rw-rw- 1 root tty  5,   0 Aug  7 22:33 /dev/tty
brw-rw---- 1 root disk 252, 0 Aug  7 21:30 /dev/vda
```

* 文件类型：`d` 目录，`-` 文件，`l` 链接，`c` 字符设备，`b` 块设备。
* 文件权限：700，Owner: 7，Group: 0, Other: 0
* 硬链接数：9
* 文件属主：root
* 文件组别：root
* 文件大小：4.0K
* 修改时间：Aug 7 22:38
* 文件名称：root
* 主设备号：Major Number，5/252，标识设备驱动程序
* 次设备号：Minor Number，0，标识同一类设备中的某个设备实例

### 只显示目录

```bash {frame="none"}
ls -ld */
```

包括隐藏文件

```bash {frame="none"}
ls -ld .*/ */
```

### 显示特定目录信息

```bash {frame="none"}
ls -ld /usr
```

### 在文件后面添加类型符号

```bash {frame="none"}
ls -lF /
```

* `/`：目录
* `*`：可执行文件
* `@`：符号链接
* `|`：命名管道
* `=`：套接字

### 隐藏字符

```bash {frame="none"}
ls ~ | wc -l
```

`ls` 命令的输出中有隐藏字符 `\n`。

```bash {frame="none"}
ls ~ | od -c
```

```bash {frame="none"}
0000000   f   i   l   e  \n   f   o   o  \n   f   o   o   b   a   r  \n
0000020
```

还可以使用 `cat -A`。

```bash {frame="none"}
ls ~ | cat -A
```

```bash {frame="none"}
file$
foo$
foobar$
```

## FILE

显示文件类型

```bash {frame="none"}
man file
```

```bash {frame="none"}
file — determine file type
```

### 字符/块设备

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

### 链接文件

注意结尾斜杆。

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

`more` 命令只能按回车加载，`less` 命令更强大，因为 less is more。

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

### 禁止账号登录

```bash {frame="none"}
usermod -s /sbin/nologin kuga
```

此命令会在 `/etc/passwd` 中把 `bin/sh` 改为 `/sbin/nologin`

```bash {frame="none"}
kuga:x:1000:1000::/home/kuga:/sbin/nologin
```

### 授权用户组

下面的命令会给 kuga 用户授权 sudo 用户组。

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

### 软链接

go rocks

## DF

```bash {frame="none"}
man df
```

```bash {frame="none"}
df - report file system disk space usage
```

### 以可读格式输出

```bash {frame="none"}
df -h
```

### 指定文件系统类型

```bash {frame="none"}
df -h -t ext4
```

```bash {frame="none"}
df -h -t apfs
```

`ext4` 是 Linux 的文件系统类型，`apfs` 是 macOS 的文件系统类型。

## DU

Disk Usage

```bash {frame="none"}
man du
```

```bash {frame="none"}
du - estimate file space usage
```

### 查看文件/目录总大小

```bash {frame="none"}
du -sh ~/Downloads
```

### 排序文件 - 含子目录

```bash {frame="none"}
du -ah ~/Downloads/* | sort -rh | head -n 5
```

```bash {frame="none"}
du -ah ~/Downloads --max-depth=1 | sort -rh | head -n 10
```

### 排序文件 - 不含子目录

```bash {frame="none"}
du -sh ~/Downloads/* | sort -rh | head -n 5
```
