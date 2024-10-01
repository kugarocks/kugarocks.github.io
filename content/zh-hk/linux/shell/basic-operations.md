---
title: "Shell 基本操作"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 600
seo:
  title: "Shell 基本操作"
  description: ""
  canonical: ""
  noindex: false
---

## 查看终端默认的 Shell

```bash {frame="none"}
echo $SHELL
```

```bash {frame="none"}
/bin/bash
```

如果你在当前终端中启动了一个新的 Shell（比如从 Bash 切换到 Zsh），
这个命令显示的仍然是默认的登录 Shell，这个配置是存放在 `/etc/passwd` 里面的。

```bash {frame="none"}
grep root /etc/passwd
```

```bash {frame="none"}
root:x:0:0:root:/root:/bin/bash
```

在 macOS 中，默认的 Shell 信息通常是存储在用户账户设置中的，而不是 `/etc/passwd` 文件中。
从 macOS Catalina（10.15）开始，默认的 shell 已更改为 `zsh`，之前的默认 Shell 是 `bash`。
可以通过以下方法查看默认 shell。

```bash {frame="none"}
dscl . -read /Users/$(whoami) UserShell
```

```bash {frame="none"}
UserShell: /bin/zsh
```

## 查看正在运行的 Shell

`$0` 在 Shell 中运行返回 Shell 名称，在脚本中运行返回脚本名称/路径。

```bash {frame="none"}
echo $0
```

```bash {frame="none"}
-bash
```

**前面的连字符 `-` 表示该 Shell 是用户的登录 Shell。**

也可以通过 `ps` 命令查看进程状态。

```bash {frame="none"}
ps -p $$
```

```bash {frame="none"}
    PID TTY          TIME CMD
  17216 pts/0    00:00:00 bash
```

如果你在当前终端中启动了一个新的 Shell（从 Bash 切换到 Sh），上面的两种方法会显示 `sh`。

## 查看支持的 Shell

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

## 修改默认的 Shell

修改成功后，`/etc/passwd` 中的内容会随之更新。

### chsh

修改当前用户的登录 Shell 会要求输入用户密码。

```bash {frame="none"}
chsh -s /bin/bash
```

使用 root 用户或 sudo 还可以修改其它用户的登录 Shell。

```bash {frame="none"}
sudo chsh -s /bin/bash kuga
```

**注意：如果我们输入一个不存在的 Shell。**

```bash {frame="none"}
chsh -s /bin/foo
```

```bash {frame="none"}
chsh: /bin/foo is an invalid shell
```

它会检查输入的 Shell 是否在 `/etc/shells` 文件中，防止因为输入了不合法的 Shell 而导致登录失败。

### usermod

使用这个命令需要 root 用户或拥有 sudo 权限的用户。

```bash {frame="none"}
sudo usermod -s /bin/dash kuga
```

{{< callout context="caution" title="注意" >}}
usermod 不会检查 Shell 的合法性，不建议使用。
{{< /callout >}}

```bash {frame="none"}
sudo usermod -s /bin/notexist kuga
```

上面的命令不会报错，但会导致 kuga 用户无法登录。

### 添加 sudo 权限

查看 sudo 组的成员列表。

```bash {frame="none"}
getent group sudo
```

给用户添加 sudo 组的权限，需要 root 执行。

```bash {frame="none"}
usermod -aG sudo username
```

## 不要直接编辑 passwd

如果不小心写错配置，很有可能会导致整个系统无法登录。

## 尽量不要使用 root

我就是不小心把 root 的登录 Shell 改成了 zsh，
但 Ubuntu 并没有安装 zsh，所以 root 就登不上去了。
还好我另外一个用户有 sudo 权限，还能正常登录，
我才成功把 root 的 Shell 改回来。
如果运气不好，没有 sudo 权限的用户，那就麻烦了。

```bash {frame="none"}
sudo chsh -s /bin/bash root
```
