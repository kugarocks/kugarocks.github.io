---
title: "Shell 嘅啟動過程"
description: ""
summary: ""
date: 2024-08-27T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 1800
seo:
  title: "Shell 嘅啟動過程"
  description: ""
  canonical: ""
  noindex: false
---

## Shell 嘅啟動方式

Shell 嘅啟動方式會影響環境變量嘅加載過程__AB__可以分為以下幾種。

* 互動式（Interactive）
  * 登錄：以登錄方式啟動嘅 Shell 實例__AB__例如 SSH 登錄。
  * 非登錄：
    * 喺 Shell 中輸入 Bash 新建 Shell 實例。
    * 喺 GNOME Terminal 中打開一個新嘅終端會話。
* 非互動式（Non-Interactive）
  * 喺腳本中啟動嘅 Shell 實例。

## 乜嘢係互動式 Shell

{{< link-card
  title="What is an Interactive Shell"
  description="乜嘢係互動式 Shell"
  href="https://www.gnu.org/software/bash/manual/bash.html#What-is-an-Interactive-Shell_003f"
  target="_blank"
>}}

```bash {frame="none" text-wrap="wrap"}
An interactive shell is one started without non-option arguments (unless -s is specified) and without specifying the -c option, whose input and error output are both connected to terminals (as determined by isatty(3)), or one started with the -i option.

An interactive shell generally reads from and writes to a user’s terminal.

The -s invocation option may be used to set the positional parameters when an interactive shell is started.
```

```bash {frame="none" text-wrap="wrap"}
互動式 Shell 係指喺啟動時冇非選項參數（除非指定咗 -s 選項）__AB__並且冇指定 -c 選項__AB__其輸入同錯誤輸出都連接到終端（由 isatty(3) 判斷）__AB__或者係通過 -i 選項啟動嘅 Shell。

互動式 Shell 通常從用戶嘅終端讀取並向終端寫入內容。

當啟動互動式 Shell 時__AB__可以使用 -s 選項嚟設置位置參數。
```

## 互動登錄式

喺 Ubuntu 中__AB__使用 SSH 登錄時__AB__文件嘅加載流程大致如下。

1. `/etc/profile`：**入口文件 - A**__AB__所有用戶都會執行。
2. `/etc/bash.bashrc`：全局環境配置文件__AB__**A** 會加載此文件。
3. `/etc/profile.d`：全局環境配置目錄__AB__**A** 會加載此目錄嘅所有文件。
4. `~/.profile`：用戶環境配置入口文件 - **B**。
5. `~/.bashrc`：用戶環境配置文件__AB__**B** 會加載此文件。

rc（Run Commands）__AB__源於 Unix 傳統。

### /etc/profile

`system-wide`：系統範圍嘅配置文件。

```bash {frame="none"}
# /etc/profile: system-wide .profile file for the Bourne shell (sh(1))
# and Bourne compatible shells (bash(1), ksh(1), ash(1), ...).

# 檢查提示符變量 PS1 是否被設置
if [ "${PS1-}" ]; then
  # 檢查 BASH 變量是否被設置__AB__且佢嘅值是否唔等於 /bin/sh
  if [ "${BASH-}" ] && [ "$BASH" != "/bin/sh" ]; then
    # The file bash.bashrc already sets the default PS1.
    # PS1='\h:\w\$ '
    # 如果 bash.bashrc 文件存在__AB__則加載
    if [ -f /etc/bash.bashrc ]; then
      . /etc/bash.bashrc
    fi
  else
    # 當前用戶嘅 id 是否等於 0 (root)
    if [ "$(id -u)" -eq 0 ]; then
      # root 用戶提示符設為 #
      PS1='# '
    else
      # 普通用戶提示符設為 $
      PS1='$ '
    fi
  fi
fi

# profile.d 目錄是否存在
if [ -d /etc/profile.d ]; then
  # 遍歷目錄下嘅所有 sh 文件
  for i in /etc/profile.d/*.sh; do
    # 如果文件可讀__AB__則加載
    if [ -r $i ]; then
      . $i
    fi
  done
  unset i
fi
```

### /etc/bash.bashrc

文件內容有啲多__AB__就睇幾行註釋吧。

```bash {frame="none"}
# System-wide .bashrc file for interactive bash(1) shells.

# To enable the settings / commands in this file for login shells as well,
# this file has to be sourced in /etc/profile.

# If not running interactively, don't do anything
[ -z "$PS1" ] && return
```

如果唔係互動式（PS1 變量冇設置）__AB__則直接退出。

### /etc/profile.d

睇一睇目錄嘅文件就好啦。

```bash {frame="none"}
ls -l /etc/profile.d
```

```bash {frame="none"}
total 24
-rw-r--r-- 1 root root   96 Oct 15  2021 01-locale-fix.sh
-rw-r--r-- 1 root root  835 Apr  8  2022 apps-bin-path.sh
-rw-r--r-- 1 root root  726 Nov 16  2021 bash_completion.sh
-rw-r--r-- 1 root root 1107 Mar 23  2022 gawk.csh
-rw-r--r-- 1 root root  757 Mar 23  2022 gawk.sh
-rw-r--r-- 1 root root 1557 Feb 17  2020 Z97-byobu.sh
```

### \~/.profile

呢個文件會去加載我哋常常用到嘅 `~/.bashrc` 文件。

```bash {frame="none"}
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

看頭部註釋可以得知__AB__如果 `~/.bash_profile` 同 `~/.bash_login` 存在咗話__AB__`~/.profile` 係唔會被加載嘅__AB__文件加載順序如下。

```bash {frame="none"}
bash_profile > bash_login > profile
```

### \~/.bashrc

下面分析一下頭部就差不多啦。

```bash {frame="none"}
# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac
```

看第一行註釋__AB__呢個文件會被非登錄 Shell 執行。
前面講到 `~/.profile` 文件亦會加載呢個文件__AB__也就係講登錄式 Shell 同非登錄式 Shell 都會用到呢個文件。

再來分析一下呢啲魔法代碼（真係天才設計🤪）：

```bash {frame="none"}
# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac
```

`$-` 係一個特殊變量__AB__表示當前 Shell 運行時啟用嘅選項__AB__可以打印出來。

```bash {frame="none"}
echo $-
```

```bash {frame="none"}
himBHs
```

* `*i*` 係一個匹配條件： `$-` 中是否包含 `i`。
* `i` 選項表示當前 Shell 係互動式嘅。
* 如果匹配成功__AB__會退出 case。
* 如果匹配失敗__AB__會執行 return__AB__退出當前腳本。

總結：如果唔係喺互動式中運行__AB__直接退出__AB__唔做咩。

## 互動非登錄式

呢度討論嘅係非登錄嘅情況。例如：

* 喺 Shell 中輸入 Bash 新建一個 Shell 實例。
* 使用 `()` 執行命令分組時生成嘅 Subshell。
* 喺 GNOME Terminal 中打開一個新嘅終端會話。

一句話總結：唔加載 `/etc/profile`__AB__只加載 `~/.bashrc`。

## 非互動式

呢種方式冇命令行提示符__AB__唔會加載任可配置文件__AB__即使手動加載 `~/.bashrc`__AB__亦唔會生效。
因為上面嘅分析裡提到__AB__喺非互動式中__AB__會直接退出__AB__唔做咩。

```bash {frame="none"}
# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac
```

當然__AB__你可以使用 BASH\_ENV 變量嚟設置加載嘅文件__AB__解釋如下。

```bash {frame="none" text-wrap="wrap"}
If this variable is set when Bash is invoked to execute a shell script, its value is expanded and used as the name of a startup file to read before executing the script. See Bash Startup Files.
```

## 環境變量嘅持久化

只需把環境變量寫喺對應嘅文件中__AB__如：`~/.bashrc`。

```bash {frame="none"}
echo 'export MY_VARIABLE="my_value"' >> ~/.bashrc
```

```bash {frame="none"}
source ~/.bashrc
```
