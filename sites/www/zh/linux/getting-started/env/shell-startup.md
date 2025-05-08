# Shell 的启动过程

## Shell 的启动方式

Shell 的启动方式会影响环境变量的加载过程，可分为以下几种。

* 交互式（Interactive）
  * 登录：以登录方式启动的 Shell 实例，如 SSH 登录。
  * 非登录：
    * 在 Shell 中输入 Bash 新建 Shell 实例。
    * 在 GNOME Terminal 中打开一个新的终端会话。
* 非交互式（Non-Interactive）
  * 在脚本中启动的 Shell 实例。

## 什么是交互式 Shell

::: info What is an Interactive Shell
https://www.gnu.org/software/bash/manual/bash.html#What-is-an-Interactive-Shell_003f
:::

```bash
An interactive shell is one started without non-option arguments (unless -s is specified) and without specifying the -c option, whose input and error output are both connected to terminals (as determined by isatty(3)), or one started with the -i option.

An interactive shell generally reads from and writes to a user’s terminal.

The -s invocation option may be used to set the positional parameters when an interactive shell is started.
```

```bash
交互式 Shell 是指在启动时没有非选项参数（除非指定了 -s 选项），并且没有指定 -c 选项，其输入和错误输出都连接到终端（由 isatty(3) 判断），或者是通过 -i 选项启动的 Shell。

交互式 Shell 通常从用户的终端读取并向终端写入内容。

当启动交互式 Shell 时，可以使用 -s 选项来设置位置参数。
```

## 交互登录式

在 Ubuntu 中，使用 SSH 登录时，文件的加载流程大致如下。

1. `/etc/profile`：**入口文件 - A**，所有用户都会执行。
2. `/etc/bash.bashrc`：全局环境配置文件，**A** 会加载此文件。
3. `/etc/profile.d`：全局环境配置目录，**A** 会加载此目录的所有文件。
4. `~/.profile`：用户环境配置入口件文 - **B。**
5. `~/.bashrc`：用户环境配置文件，**B** 会加载此文件。

rc(Run Commands)，源于 Unix 传统。

### /etc/profile

`system-wide`：系统范围的配置文件。

```bash
# /etc/profile: system-wide .profile file for the Bourne shell (sh(1))
# and Bourne compatible shells (bash(1), ksh(1), ash(1), ...).

# 检查提示符变量 PS1 是否被设置
if [ "${PS1-}" ]; then
  # 检查 BASH 变量是否被设置，且它的值是否不等于 /bin/sh
  if [ "${BASH-}" ] && [ "$BASH" != "/bin/sh" ]; then
    # The file bash.bashrc already sets the default PS1.
    # PS1='\h:\w\$ '
    # 如果 bash.bashrc 文件存在，则加载
    if [ -f /etc/bash.bashrc ]; then
      . /etc/bash.bashrc
    fi
  else
    # 当前用户的 id 是否等于 0 (root)
    if [ "$(id -u)" -eq 0 ]; then
      # root 用户提示符设为 #
      PS1='# '
    else
      # 普通用户提示符设为 $
      PS1='$ '
    fi
  fi
fi

# profile.d 目录是否存在
if [ -d /etc/profile.d ]; then
  # 遍历目录下的所有 sh 文件
  for i in /etc/profile.d/*.sh; do
    # 如果文件可读，则加载
    if [ -r $i ]; then
      . $i
    fi
  done
  unset i
fi
```

### /etc/bash.bashrc

文件内容有点多，就看几行注释吧。

```bash
# System-wide .bashrc file for interactive bash(1) shells.

# To enable the settings / commands in this file for login shells as well,
# this file has to be sourced in /etc/profile.

# If not running interactively, don't do anything
[ -z "$PS1" ] && return
```

如果不是交互式（PS1 变量没有设置），则直接退出。

### /etc/profile.d

看一看目录的文件就好了。

```bash
ls -l /etc/profile.d
```

```bash
total 24
-rw-r--r-- 1 root root   96 Oct 15  2021 01-locale-fix.sh
-rw-r--r-- 1 root root  835 Apr  8  2022 apps-bin-path.sh
-rw-r--r-- 1 root root  726 Nov 16  2021 bash_completion.sh
-rw-r--r-- 1 root root 1107 Mar 23  2022 gawk.csh
-rw-r--r-- 1 root root  757 Mar 23  2022 gawk.sh
-rw-r--r-- 1 root root 1557 Feb 17  2020 Z97-byobu.sh
```

### \~/.profile

这个文件会去加载我们常常用到的 `~/.bashrc` 文件。

```bash
# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
# see /usr/share/doc/bash/examples/startup-files for examples.
# the files are located in the bash-doc package.

# the default umask is set in /etc/profile; for setting the umask
# for ssh logins, install and configure the libpam-umask package.
#umask 022

# if running bash
if [ -n "$BASH_VERSION" ]; then
    # include .bashrc if it exists
    if [ -f "$HOME/.bashrc" ]; then
      . "$HOME/.bashrc"
    fi
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/.local/bin" ] ; then
    PATH="$HOME/.local/bin:$PATH"
fi
```

看头部注释可以得知，如果 `~/.bash_profile` 和 `~/.bash_login` 存在的话，`~/.profile` 是不会被加载的，文件加载顺序如下。

```bash
bash_profile > bash_login > profile
```

### \~/.bashrc

下面分析一下头部就差不多了。

```bash
# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac
```

看第一行注释，这个文件会被非登录 Shell 执行。
前面说到 `~/.profile` 文件也会加载此文件，也就是说登录式 Shell 和非登录式 Shell 都会用到这个文件。

再来分析一下这些魔法代码（真的是天才设计🤪）：

```bash
# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac
```

`$-` 是一个特殊变量，表示当前 Shell 运行时启用的选项，可以打印出来。

```bash
echo $-
```

```bash
himBHs
```

* `*i*` 是一个匹配条件： `$-` 中是否包含 `i`。
* `i` 选项表示当前 Shell 是交互式的。
* 如果匹配成功，会退出 case。
* 如果匹配失败，会执行 return，退出当前脚本。

总结：如果不是在交互式中运行，直接退出，什么都不做。

## 交互非登录式

这里讨论的是非登录的情况。例如：

* 在 Shell 中输入 Bash 新建一个 Shell 实例。
* 使用 `()` 执行命令分组时生成的 Subshell。
* 在 GNOME Terminal 中打开一个新的终端会话。

一句话总结：不加载 `/etc/profile`，只加载 `~/.bashrc`。

## 非交互式

这种方式没有命令行提示符，不会加载任可配置文件，即使手动加载 `~/.bashrc`，也不会生效。
因为上面的分析里提到，在非交互式中，会直接退出，什么都不做。

```bash
# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac
```

当然，你可以使用 BASH\_ENV 变量来设置加载的文件，解释如下。

```bash
If this variable is set when Bash is invoked to execute a shell script, its value is expanded and used as the name of a startup file to read before executing the script. See Bash Startup Files.
```

## 环境变量的持久化

只需把环境变量写在对应的文件中，如：`~/.bashrc`。

```bash
echo 'export MY_VARIABLE="my_value"' >> ~/.bashrc
```

```bash
source ~/.bashrc
```
