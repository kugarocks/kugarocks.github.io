---
title: "用戶管理"
description: ""
summary: ""
date: 2024-08-27T20:00:00+08:00
lastmod: 2024-08-28T20:00:00+08:00
weight: 2100
seo:
  title: "用戶管理"
  description: ""
  canonical: ""
  noindex: false
---

## 用戶賬號

### /etc/passwd

Linux 使用 `/etc/passwd` 文件嚟保存用戶賬號信息。
因為好多服務進程需要讀取用戶賬號嘅信息__AB__可以見到呢個文件嘅權限都係可讀嘅。

```bash {frame="none"}
-rw-r--r-- 1 root root 2010 Aug 24 15:12 /etc/passwd
```

查看某個用戶嘅賬號信息。

```bash {frame="none"}
grep kuga /etc/passwd
```

```bash {frame="none"}
kuga:x:1000:1000:,,,:/home/kuga:/bin/bash
```

| KEY | VALUE |
| --- | --- |
| 用戶名 | kuga |
| 用戶密碼 | x |
| 用戶 ID | 1000 |
| 用戶組 ID | 1000 |
| 備註字段 | ,,, |
| 目錄位置 | /home/kuga |
| 默認 Shell | /bin/bash |

系統會預留一定嘅 UID 範圍__AB__Ubuntu 新添加嘅用戶 ID 由 1000 開始。
下面嘅命令會按第 3 個字段 UID 逆序排序__AB__然後輸出前 10 行__AB__只顯示 136 字段（用戶名__AB__UID__AB__目錄位置）。

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

由於歷史原因__AB__早期嘅用戶密碼使用 `/etc/passwd` 存儲__AB__所以文件名係 passwd。
後來因為密碼容易被暴力破解__AB__依家嘅密碼已經搬到新文件 `/etc/shadow`。
**呢個文件只有 root 同 shadow 組可讀**。

```bash {frame="none"}
-rw-r----- 1 root shadow 1255 Aug 24 15:08 /etc/shadow
```

可以粗略睇睇呢個文件嘅內容。

```bash {frame="none"}
root:*:19955:0:99999:7:::
daemon:*:19103:0:99999:7:::
bin:*:19103:0:99999:7:::
sys:*:19103:0:99999:7:::
sync:*:19103:0:99999:7:::
```

呢啲字段一般都係管理密碼嘅（如幾多日後必須更改）__AB__呢度唔展開。

## Useradd

### HOME 目錄

默認唔創建用戶目錄。

```bash {frame="none"}
useradd foo
```

使用 `-m` 參數會創建用戶目錄。

```bash {frame="none"}
useradd -m foo
```

使用 `-M` 參數不會創建用戶目錄。

```bash {frame="none"}
useradd -M foo
```

### 查看默認配置

使用 -D 選項可以查看添加用戶時采用嘅默認配置。

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

* GROUP：用戶默認組 ID。
* HOME：用戶目錄位置。
* INACTIVE：密碼過期後多少天禁用賬號。
* EXPIRE：賬號過期日期。
* SHELL：默認使用嘅登錄 Shell。
* SKEL：Skeletal__AB__該目錄內容會複製到用戶主目錄。
* CREATE_MAIL_SPOOL：是否創建郵件存儲文件。

### /etc/default/useradd

`useradd` 命令嘅默認配置文件。

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

如果把 SHELL 改成 `/bin/bash`__AB__那麼 `useradd -D` 就會自動更新。

### /etc/login.defs

用戶賬號同登錄管理嘅核心配置文件。
功能包括：密碼策略、UID/GID 範圍、HOME 目錄管理、用戶同組管理、登錄設置等等。
文件中嘅設置會影響著如 `useradd`、`usermod`、`passwd` 等命令嘅行為__AB__修改前建議提前備份。

```bash {frame="none"}
-rw-r--r-- 1 root root 10734 Nov 11  2021 /etc/login.defs
```

單獨睇一下 `USERGROUPS_ENAB` 參數。

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

如果 `USERGROUPS_ENAB` 嘅值為 yes：

* `userdel`：刪除用戶嘅時候__AB__會同時刪除空嘅用戶用。
* `useradd`：創建用戶嘅時候__AB__會同時創建同用戶名一樣嘅組。

這就係為咗緊上面創建用戶嘅時候__AB__沒有使用 `GROUP=100` 呢個默認參數。

### 使用命令修改配置

修改默認登錄 Shell。

```bash {frame="none"}
sudo useradd -D -s /bin/bash
```

修改默認組 ID。

```bash {frame="none"}
sudo useradd -D -g 100
```

修改默認嘅 HOME 目錄。

```bash {frame="none"}
sudo useradd -D -b path
```

執行命令後__AB__你會發現__AB__文件嘅權限由 `644` -> `600`。

```bash {frame="none"}
-rw------- 1 root root 1195 Aug 28 11:22 /etc/default/useradd
```

權限更正如下。

```bash {frame="none"}
sudo chmod 644 /etc/default/useradd
```

[翻一下源碼](https://github.com/shadow-maint/shadow/blob/5c0b99c77e3963cc3d4ee4980b0bb3c9955c032c/src/useradd.c#L525)__AB__在 `set_defaults(void)` 方法中__AB__執行過程大致如下：

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

* 使用 `mkstemp` 函數創建臨時文件 A。
* 處理 `/etc/default/useradd` 文件並複製到 A 中。
* 備份原來嘅 `useradd` 文件__AB__**重命名**為 `useradd-`。
* 把 A 文件覆蓋原來嘅 `useradd` 文件。
* **`mkstemp` 函數創建嘅文件權限係 `0600`**。

查看 `useradd` 同它嘅備份 `useradd-`。

```bash {frame="none"}
ls -li /etc/default/useradd*
```

```bash {frame="none"}
655124 -rw------- 1 root root 1197 Aug 28 16:28 /etc/default/useradd
655237 -rw------- 1 root root 1197 Aug 28 16:07 /etc/default/useradd-
```

如果使用執行命令修改默認登錄 Shell。

```bash {frame="none"}
sudo useradd -D -s /bin/sh
```

再次查看兩個文件嘅 inode。

```bash {frame="none"}
655454 -rw------- 1 root root 1195 Aug 28 17:27 /etc/default/useradd
655124 -rw------- 1 root root 1197 Aug 28 16:28 /etc/default/useradd-
```

不難發現 `useradd-` 嘅 inode 就係修改前 `useradd` 嘅 inode。
關於權限被修改嘅問題__AB__顯然係唔合理嘅__AB__命令唔應該修改文件嘅權限。
在 GitHub 上可以查看這個 [pull request](https://github.com/shadow-maint/shadow/pull/1083)。

## Usermod

### 更改用戶嘅登錄名

```bash {frame="none"}
sudo usermod -l newuser olduser
```

### 將用戶添加到一個組

`-a` 表示追加到組__AB__而唔係替換當前組列表。

```bash {frame="none"}
sudo usermod -aG group user
```

### 更改用戶嘅默認 Shell

`usermod` 唔會檢查 Shell 嘅合法性__AB__可用 `chsh` 代替。

```bash {frame="none"}
sudo chsh -s /bin/bash user
```

### 更改用戶 ID

```bash {frame="none"}
sudo usermod -u newuid user
```

## Passwd

### 修改當前用戶嘅密碼

唔加參數就係修改當前用戶嘅密碼。

```bash {frame="none"}
passwd
```

### 修改指定用戶嘅密碼

```bash {frame="none"}
sudo passwd soda
```

## 登錄管理

### 禁止密碼登錄

下面兩種方法係一樣嘅__AB__而且**唔會禁止 SSH 公鑰認證**。

```bash {frame="none"}
sudo usermod -L user
```

```bash {frame="none"}
sudo passwd -l user
```

執行後__AB__`/etc/shadow` 文件嘅密碼字段前面會加 `!` 。

```bash {frame="none"}
sudo grep user /etc/shadow
```

```bash {frame="none"}
user:!$y...:19959:0:99999:7:::
```

### 恢復密碼登錄

下面兩種方法係一樣嘅__AB__可以混著用。

```bash {frame="none"}
sudo usermod -U user
```

```bash {frame="none"}
sudo passwd -u user
```

執行後__AB__`/etc/shadow` 文件嘅密碼字段前面會刪除 `!` 。

### 禁止 SSH 公鑰認證

沒有了登錄 Shell__AB__自然密碼也係唔能登錄。

```bash {frame="none"}
sudo usermod -s /usr/sbin/nologin user
```

### 恢復 SSH 公鑰認證

```bash {frame="none"}
sudo usermod -s /bin/bash user
```

## Userdel

### 僅刪除用戶

呢種方法只刪除用戶__AB__保留主目錄。

```bash {frame="none"}
sudo userdel user
```

### 主目錄同郵件

不但刪除用戶__AB__還要刪除主目錄同郵件。

```bash {frame="none"}
sudo userdel -r user
```

如果文件或目錄沒不存在__AB__會在終端提示。

## Adduser Package

呢個包提供兩個實用命令__AB__`adduser` 同 `deluser`__AB__屬於上層封裝好嘅工具。
