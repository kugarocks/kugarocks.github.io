---
title: "用户管理"
description: ""
summary: ""
date: 2024-08-27T20:00:00+08:00
lastmod: 2024-08-28T20:00:00+08:00
weight: 2100
seo:
  title: "用户管理"
  description: ""
  canonical: ""
  noindex: false
---

## 用户账号

### /etc/passwd

Linux 使用 `/etc/passwd` 文件来保存用户账号信息。
因为许多服务进程需要读取用户账号的信息，可以看到这个文件的权限都是可读的。

```bash {frame="none"}
-rw-r--r-- 1 root root 2010 Aug 24 15:12 /etc/passwd
```

查看某个用户的账号信息。

```bash {frame="none"}
grep kuga /etc/passwd
```

```bash {frame="none"}
kuga:x:1000:1000:,,,:/home/kuga:/bin/bash
```

| KEY | VALUE |
| --- | --- |
| 用户名 | kuga |
| 用户密码 | x |
| 用户 ID | 1000 |
| 用户组 ID | 1000 |
| 备注字段 | ,,, |
| 目录位置 | /home/kuga |
| 默认 Shell | /bin/bash |

系统会预留一定的 UID 范围，Ubuntu 新添加的用户 ID 从 1000 开始。
下面的命令会按第 3 个字段 UID 逆序排序，然后输出前 10 行，只显示 136 字段（用户名，UID，目录位置）。

```bash {frame="none"}
sort -t ':' -k 3 -nr /etc/passwd | cut -d ':' -f1,3,6 | head -n 10
```

```bash {frame="none"}
nobody:65534:/nonexistent
soda:1001:/home/soda
kuga:1000:/home/kuga
lxd:999:/var/snap/lxd/common/lxd
ecs-instance-connect:998:/home/ecs-instance-connect
fwupd-refresh:115:/run/systemd
_chrony:114:/var/lib/chrony
usbmux:112:/var/lib/usbmux
landscape:111:/var/lib/landscape
tss:110:/var/lib/tpm
```

### /etc/shadow

由于历史原因，早期的用户密码使用 `/etc/passwd` 存储，所以文件名是 passwd。
后来因为密码容易被暴力破解，现在的密码已经搬到新文件 `/etc/shadow`。
**这个文件只有 root 和 shadow 组可读**。

```bash {frame="none"}
-rw-r----- 1 root shadow 1255 Aug 24 15:08 /etc/shadow
```

可以粗略看看这个文件的内容。

```bash {frame="none"}
root:*:19955:0:99999:7:::
daemon:*:19103:0:99999:7:::
bin:*:19103:0:99999:7:::
sys:*:19103:0:99999:7:::
sync:*:19103:0:99999:7:::
```

这些字段一般都是管理密码的（如多少天后必须更改），这里不展开。

## Useradd

### HOME 目录

默认不创建用户目录。

```bash {frame="none"}
useradd foo
```

使用 `-m` 参数会创建用户目录。

```bash {frame="none"}
useradd -m foo
```

使用 `-M` 参数不会创建用户目录。

```bash {frame="none"}
useradd -M foo
```

### 查看默认配置

使用 -D 选项可以查看添加用户时采用的默认配置。

```bash {frame="none"}
useradd -D
```

```bash {frame="none"}
GROUP=100
HOME=/home
INACTIVE=-1
EXPIRE=
SHELL=/bin/sh
SKEL=/etc/skel
CREATE_MAIL_SPOOL=no
```

* GROUP：用户默认组 ID。
* HOME：用户目录位置。
* INACTIVE：密码过期后多少天禁用账号。
* EXPIRE：账号过期日期。
* SHELL：默认使用的登录 Shell。
* SKEL：Skeletal，该目录内容会复制到用户主目录。
* CREATE_MAIL_SPOOL：是否创建邮件存储文件。

### /etc/default/useradd

`useradd` 命令的默认配置文件。

```bash {frame="none"}
-rw-r--r-- 1 root root 1118 Aug 28 10:58 /etc/default/useradd
```

```bash {frame="none"}
cat /etc/default/useradd | head -n 20
```

```bash {frame="none"}
# Default values for useradd(8)
#
# The SHELL variable specifies the default login shell on your
# system.
# Similar to DSHELL in adduser. However, we use "sh" here because
# useradd is a low level utility and should be as general
# as possible
SHELL=/bin/sh
#
# The default group for users
# 100=users on Debian systems
# Same as USERS_GID in adduser
# This argument is used when the -n flag is specified.
# The default behavior (when -n and -g are not specified) is to create a
# primary user group with the same name as the user being added to the
# system.
# GROUP=100
#
# The default home directory. Same as DHOME for adduser
# HOME=/home
```

如果把 SHELL 改成 `/bin/bash`，那么 `useradd -D` 就会自动更新。

### /etc/login.defs

用户账号和登录管理的核心配置文件。
功能包括：密码策略、UID/GID 范围、HOME 目录管理、用户和组管理、登录设置等等。
文件中的设置会影响诸如 `useradd`、`usermod`、`passwd` 等命令的行为，修改前建议提前备份。

```bash {frame="none"}
-rw-r--r-- 1 root root 10734 Nov 11  2021 /etc/login.defs
```

单独看一下 `USERGROUPS_ENAB` 参数。

```bash {frame="none"}
grep -B 4 -E "USERGROUPS_ENAB (yes|no)" /etc/login.defs
```

```bash {frame="none"}
# If set to yes, userdel will remove the user's group if it contains no
# more members, and useradd will create by default a group with the name
# of the user.
#
USERGROUPS_ENAB yes
```

如果 `USERGROUPS_ENAB` 的值为 yes：

* `userdel`：删除用户的时候，会同时删除空的用户用。
* `useradd`：创建用户的时候，会同时创建和用户名一样的组。

这就是为什么上面创建用户的时候，没有使用 `GROUP=100` 这个默认参数。

### 使用命令修改配置

修改默认登录 Shell。

```bash {frame="none"}
sudo useradd -D -s /bin/bash
```

修改默认组 ID。

```bash {frame="none"}
sudo useradd -D -g 100
```

修改默认的 HOME 目录。

```bash {frame="none"}
sudo useradd -D -b path
```

执行命令后，你会发现，文件的权限从 `644` -> `600`。

```bash {frame="none"}
-rw------- 1 root root 1195 Aug 28 11:22 /etc/default/useradd
```

权限更正如下。

```bash {frame="none"}
sudo chmod 644 /etc/default/useradd
```

[翻一下源码](https://github.com/shadow-maint/shadow/blob/5c0b99c77e3963cc3d4ee4980b0bb3c9955c032c/src/useradd.c#L525)，在 `set_defaults(void)` 方法中，执行过程大致如下：

```bash {frame="none"}
/*
 * set_defaults - write new defaults file
 *
 * set_defaults() re-writes the defaults file using the values that
 * are currently set. Duplicated lines are pruned, missing lines are
 * added, and unrecognized lines are copied as is.
 */
static int
set_defaults(void)
{
...
}
```

* 使用 `mkstemp` 函数创建临时文件 A。
* 处理 `/etc/default/useradd` 文件并复制到 A 中。
* 备份原来的 `useradd` 文件，**重命名**为 `useradd-`。
* 把 A 文件覆盖原来的 `useradd` 文件。
* **`mkstemp` 函数创建的文件权限是 `0600`**。

查看 `useradd` 和它的备份 `useradd-`。

```bash {frame="none"}
ls -li /etc/default/useradd*
```

```bash {frame="none"}
655124 -rw------- 1 root root 1197 Aug 28 16:28 /etc/default/useradd
655237 -rw------- 1 root root 1197 Aug 28 16:07 /etc/default/useradd-
```

如果使用执行命令修改默认登录 Shell。

```bash {frame="none"}
sudo useradd -D -s /bin/sh
```

再次查看两个文件的 inode。

```bash {frame="none"}
655454 -rw------- 1 root root 1195 Aug 28 17:27 /etc/default/useradd
655124 -rw------- 1 root root 1197 Aug 28 16:28 /etc/default/useradd-
```

不难发现 `useradd-` 的 inode 就是修改前 `useradd` 的 inode。
关于权限被修改的问题，显然是不合理的，命令不应该修改文件的权限。
在 GitHub 上可以查看这个 [pull request](https://github.com/shadow-maint/shadow/pull/1083)。

## Usermod

### 更改用户的登录名

```bash {frame="none"}
sudo usermod -l newuser olduser
```

### 将用户添加到一个组

`-a` 表示追加到组，而不是替换当前组列表。

```bash {frame="none"}
sudo usermod -aG group user
```

### 更改用户的默认 Shell

`usermod` 不会检查 Shell 的合法性，可用 `chsh` 代替。

```bash {frame="none"}
sudo chsh -s /bin/bash user
```

### 更改用户 ID

```bash {frame="none"}
sudo usermod -u newuid user
```

## Passwd

### 修改当前用户的密码

不加参数就是修改当前用户的密码。

```bash {frame="none"}
passwd
```

### 修改指定用户的密码

```bash {frame="none"}
sudo passwd soda
```

## 登录管理

### 禁止密码登录

下面两种方法是一样的，而且**不会禁止 SSH 公钥认证**。

```bash {frame="none"}
sudo usermod -L user
```

```bash {frame="none"}
sudo passwd -l user
```

执行后，`/etc/shadow` 文件的密码字段前面会加 `!` 。

```bash {frame="none"}
sudo grep user /etc/shadow
```

```bash {frame="none"}
user:!$y...:19959:0:99999:7:::
```

### 恢复密码登录

下面两种方法是一样的，可以混着用。

```bash {frame="none"}
sudo usermod -U user
```

```bash {frame="none"}
sudo passwd -u user
```

执行后，`/etc/shadow` 文件的密码字段前面会删除 `!` 。

### 禁止 SSH 公钥认证

没有了登录 Shell，自然密码也是不能登录。

```bash {frame="none"}
sudo usermod -s /usr/sbin/nologin user
```

### 恢复 SSH 公钥认证

```bash {frame="none"}
sudo usermod -s /bin/bash user
```

## Userdel

### 仅删除用户

这种方法只删除用户，保留主目录。

```bash {frame="none"}
sudo userdel user
```

### 主目录和邮件

不但删除用户，还要删除主目录和邮件。

```bash {frame="none"}
sudo userdel -r user
```

如果文件或目录没不存在，会在终端提示。

## Adduser Package

这个包提供两个实用命令，`adduser` 和 `deluser`，属于上层封装好的工具。
