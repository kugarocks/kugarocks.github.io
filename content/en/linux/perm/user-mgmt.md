---
title: "User Management"
description: ""
summary: ""
date: 2024-08-27T20:00:00+08:00
lastmod: 2024-08-28T20:00:00+08:00
weight: 2100
seo:
  title: "User Management"
  description: ""
  canonical: ""
  noindex: false
---

## User Account

### /etc/passwd

Linux uses the `/etc/passwd` file to store user account information.
Because many service processes need to read user account information, you can see that the file's permissions are all readable.

```bash {frame="none"}
-rw-r--r-- 1 root root 2010 Aug 24 15:12 /etc/passwd
```

View the account information of a user.

```bash {frame="none"}
grep kuga /etc/passwd
```

```bash {frame="none"}
kuga:x:1000:1000:,,,:/home/kuga:/bin/bash
```

| KEY | VALUE |
| --- | --- |
| Username | kuga |
| User Password | x |
| User ID | 1000 |
| User Group ID | 1000 |
| Remark Field | ,,, |
| Directory Location | /home/kuga |
| Default Shell | /bin/bash |

The system will reserve a certain range of UID, and the new user ID added to Ubuntu starts from 1000.
The following command will sort by the third field UID in reverse order, then output the first 10 lines, and only display 136 fields (username, UID, directory location).

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

For historical reasons, the early user passwords were stored in `/etc/passwd`, so the file name is passwd.
Later, because passwords are easy to crack, the current passwords have been moved to the new file `/etc/shadow`.
**This file is only readable by root and shadow group**.

```bash {frame="none"}
-rw-r----- 1 root shadow 1255 Aug 24 15:08 /etc/shadow
```

You can roughly look at the contents of this file.

```bash {frame="none"}
root:*:19955:0:99999:7:::
daemon:*:19103:0:99999:7:::
bin:*:19103:0:99999:7:::
sys:*:19103:0:99999:7:::
sync:*:19103:0:99999:7:::
```

These fields are generally related to password management (such as how many days must be changed), which is not expanded here.

## Useradd

### HOME Directory

By default, the user directory is not created.

```bash {frame="none"}
useradd foo
```

Use the `-m` parameter to create the user directory.

```bash {frame="none"}
useradd -m foo
```

Use the `-M` parameter to not create the user directory.

```bash {frame="none"}
useradd -M foo
```

### Default Configuration

Use the -D option to view the default configuration used when adding a user.

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

* GROUP: User default group ID.
* HOME: User directory location.
* INACTIVE: Number of days to disable the account after the password expires.
* EXPIRE: Account expiration date.
* SHELL: Default login Shell used.
* SKEL: Skeletal, the contents of this directory will be copied to the user's home directory.
* CREATE_MAIL_SPOOL: Whether to create a mail storage file.

### /etc/default/useradd

The default configuration file for the `useradd` command.

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

If you change the SHELL to `/bin/bash`, then `useradd -D` will be automatically updated.

### /etc/login.defs

The core configuration file for user account and login management.
Functions include: password policy, UID/GID range, HOME directory management, user and group management, login settings, etc.
Settings in the file will affect the behavior of commands such as `useradd`, `usermod`, `passwd`, etc., it is recommended to back up before making changes.

```bash {frame="none"}
-rw-r--r-- 1 root root 10734 Nov 11  2021 /etc/login.defs
```

Take a look at the `USERGROUPS_ENAB` parameter separately.

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

If the value of `USERGROUPS_ENAB` is yes:

* `userdel`: When deleting a user, it will also delete the empty user group.
* `useradd`: When creating a user, it will also create a group with the same name as the user.

This is why the default parameter `GROUP=100` was not used when creating a user.

### Modify Conf By Cmd

Modify the default login Shell.

```bash {frame="none"}
sudo useradd -D -s /bin/bash
```

Modify the default group ID.

```bash {frame="none"}
sudo useradd -D -g 100
```

Modify the default HOME directory.

```bash {frame="none"}
sudo useradd -D -b path
```

After executing the command, you will find that the file permissions have changed from `644` to `600`.

```bash {frame="none"}
-rw------- 1 root root 1195 Aug 28 11:22 /etc/default/useradd
```

The corrected permissions are as follows.

```bash {frame="none"}
sudo chmod 644 /etc/default/useradd
```

[Look at the source code](https://github.com/shadow-maint/shadow/blob/5c0b99c77e3963cc3d4ee4980b0bb3c9955c032c/src/useradd.c#L525), the execution process in the `set_defaults(void)` method is roughly as follows:

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

* Use the `mkstemp` function to create a temporary file A.
* Process the `/etc/default/useradd` file and copy it to A.
* Backup the original `useradd` file, **rename** it to `useradd-`.
* Overwrite the A file with the original `useradd` file.
* **The file created by the `mkstemp` function has permissions of `0600`**.

Check the `useradd` and its backup `useradd-` files.

```bash {frame="none"}
ls -li /etc/default/useradd*
```

```bash {frame="none"}
655124 -rw------- 1 root root 1197 Aug 28 16:28 /etc/default/useradd
655237 -rw------- 1 root root 1197 Aug 28 16:07 /etc/default/useradd-
```

If you use the command to modify the default login Shell.

```bash {frame="none"}
sudo useradd -D -s /bin/sh
```

Check the inode of the two files again.

```bash {frame="none"}
655454 -rw------- 1 root root 1195 Aug 28 17:27 /etc/default/useradd
655124 -rw------- 1 root root 1197 Aug 28 16:28 /etc/default/useradd-
```

It is not difficult to find that the inode of `useradd-` is the same as the inode of `useradd` before the modification.
The issue of permissions being modified is obviously unreasonable, the command should not modify the file permissions.
You can check this [pull request](https://github.com/shadow-maint/shadow/pull/1083) on GitHub.

## Usermod

### Modify User Login Name

```bash {frame="none"}
sudo usermod -l newuser olduser
```

### Add User to a Group

The `-a` means to append to the group, not to replace the current group list.

```bash {frame="none"}
sudo usermod -aG group user
```

### Modify User Default Shell

`usermod` does not check the legality of the Shell, you can use `chsh` instead.

```bash {frame="none"}
sudo chsh -s /bin/bash user
```

### Modify User ID

```bash {frame="none"}
sudo usermod -u newuid user
```

## Passwd

### Modify Current User PWD

Without parameters, it is to change the password of the current user.

```bash {frame="none"}
passwd
```

### Modify User PWD

```bash {frame="none"}
sudo passwd soda
```

## Login Management

### Disable PWD Login

The following two methods are the same, and **will not disable SSH public key authentication**.

```bash {frame="none"}
sudo usermod -L user
```

```bash {frame="none"}
sudo passwd -l user
```

After execution, the password field in the `/etc/shadow` file will be prefixed with `!`.

```bash {frame="none"}
sudo grep user /etc/shadow
```

```bash {frame="none"}
user:!$y...:19959:0:99999:7:::
```

### Enable PWD Login

The following two methods are the same, and can be used together.

```bash {frame="none"}
sudo usermod -U user
```

```bash {frame="none"}
sudo passwd -u user
```

After execution, the password field in the `/etc/shadow` file will delete the `!` prefix.

### Disable SSH Auth

Without a login Shell, naturally the password cannot be used for login.

```bash {frame="none"}
sudo usermod -s /usr/sbin/nologin user
```

### Enable SSH Auth

```bash {frame="none"}
sudo usermod -s /bin/bash user
```

## Userdel

### Delete User Only

This method only deletes the user and keeps the main directory.

```bash {frame="none"}
sudo userdel user
```

### With Home and Mail

Not only delete the user, but also delete the main directory and mail.

```bash {frame="none"}
sudo userdel -r user
```

If a file or directory does not exist, a prompt will appear in the terminal.

## Adduser Package

This package provides two useful commands, `adduser` and `deluser`, which are high-level encapsulated tools.
