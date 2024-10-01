---
title: "Basic Operations"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 600
seo:
  title: "Basic Operations"
  description: ""
  canonical: ""
  noindex: false
---

## Default Shell

```bash {frame="none"}
echo $SHELL
```

```bash {frame="none"}
/bin/bash
```

If you start a new Shell in the current terminal (e.g., switching from Bash to Zsh),
this command still displays the default login Shell, which is configured in `/etc/passwd`.

```bash {frame="none"}
grep root /etc/passwd
```

```bash {frame="none"}
root:x:0:0:root:/root:/bin/bash
```

On macOS, the default Shell information is typically stored in the user account settings,
not in the `/etc/passwd` file. Starting from macOS Catalina (10.15), the default shell has been changed to `zsh`,
previously the default Shell was `bash`. You can view the default shell using the following method.

```bash {frame="none"}
dscl . -read /Users/$(whoami) UserShell
```

```bash {frame="none"}
UserShell: /bin/zsh
```

## Current Shell

`$0` in Shell returns the Shell name when running, and returns the script name/path when running in a script.

```bash {frame="none"}
echo $0
```

```bash {frame="none"}
-bash
```

**The preceding hyphen `-` indicates that this Shell is the user's login Shell.**

You can also use the `ps` command to view the process status.

```bash {frame="none"}
ps -p $$
```

```bash {frame="none"}
    PID TTY          TIME CMD
  17216 pts/0    00:00:00 bash
```

If you start a new Shell in the current terminal (switching from Bash to Sh), the above two methods will display `sh`.

## Supported Shells

```bash {frame="none"}
cat /etc/shells
```

```bash {frame="none"}
# /etc/shells: valid login shells
/bin/sh
/bin/bash
/usr/bin/bash
/bin/rbash
/usr/bin/rbash
/usr/bin/sh
/bin/dash
/usr/bin/dash
/usr/bin/tmux
/usr/bin/screen
```

## Change Default Shell

The content in `/etc/passwd` will be updated after modification.

### chsh

Modifying the login Shell of the current user will require entering the user password.

```bash {frame="none"}
chsh -s /bin/bash
```

Using the root user or sudo can also modify the login Shell of other users.

```bash {frame="none"}
sudo chsh -s /bin/bash kuga
```

**Note: If we enter a non-existent Shell.**

```bash {frame="none"}
chsh -s /bin/foo
```

```bash {frame="none"}
chsh: /bin/foo is an invalid shell
```

It checks whether the entered Shell is in the `/etc/shells` file, preventing login failures due to entering an invalid Shell.

### usermod

Using this command requires the root user or a user with sudo privileges.

```bash {frame="none"}
sudo usermod -s /bin/dash kuga
```

{{< callout context="caution" title="Note" >}}
usermod does not check the validity of the Shell, it is not recommended to use.
{{< /callout >}}

```bash {frame="none"}
sudo usermod -s /bin/notexist kuga
```

The above command will not error, but will cause the kuga user to be unable to log in.

### Add sudo Privileges

View the list of members of the sudo group.

```bash {frame="none"}
getent group sudo
```

Give the user sudo group privileges, which requires root execution.

```bash {frame="none"}
usermod -aG sudo username
```

## Do Not Edit Passwd

If you accidentally write the configuration incorrectly,
it is very likely to cause the entire system to be unable to log in.

## Avoid Using Root

I accidentally changed the login Shell of root to zsh, but Ubuntu did not have zsh installed,
so root could not log in. Fortunately, I had another user with sudo privileges,
so I could log in normally and successfully changed root's Shell back.
If you're unlucky and don't have a user with sudo privileges, it would be troublesome.

```bash {frame="none"}
sudo chsh -s /bin/bash root
```
