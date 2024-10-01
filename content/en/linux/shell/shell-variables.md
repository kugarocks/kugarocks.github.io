---
title: "Shell Variables"
description: ""
summary: ""
date: 2024-08-26T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 800
seo:
  title: "Shell Variables"
  description: ""
  canonical: ""
  noindex: false
---

## Shell Variables

Shell variables are a general term. If you are using a specific shell, such as Bash, you can call it a Bash variable.
But it is important to note that shell variables are not environment variables, do not be confused by their capitalization, here are the relevant official documents.

{{< link-card
  title="Shell Variables"
  description="gun.org"
  href="https://www.gnu.org/software/bash/manual/html_node/Shell-Variables.html"
  target="_blank"
>}}

{{< link-card
  title="Bash Variables"
  description="gun.org"
  href="https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html"
  target="_blank"
>}}

You can also view it by using the man command and searching for `Shell Variables`.

```bash {frame="none"}
man bash
```

```bash {frame="none"}
/Shell Variables
```

## Common Shell Variables

### PS1

Shell command prompt.

```bash {frame="none"}
echo $PS1
```

```bash {frame="none"}
\[\e]0;\u@\h: \w\a\]${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$
```

### UID

Current user ID.

```bash {frame="none"}
echo $UID
```

```bash {frame="none"}
1000
```

### PPID

```bash {frame="none"}
ps -fp $PPID
```

```bash {frame="none"}
UID          PID    PPID  C STIME TTY          TIME CMD
kuga       46635   46570  0 10:56 ?        00:00:00 sshd: kuga@pts/0
```

You can see that the parent process of bash is sshd.

### BASH\_VERSION

```bash {frame="none"}
echo $BASH_VERSION
```

```bash {frame="none"}
5.1.16(1)-release
```

### BASH\_SUBSHELL

&#x20;Subshell nesting level, starting from 0.

```bash {frame="none"}
echo $BASH_SUBSHELL
```

```bash {frame="none"}
0
```

### SECONDS

Seconds since the shell started.

```bash {frame="none"}
echo $SECONDS
```

```bash {frame="none"}
13963
```

### RANDOM

0 \~ 32767 random number.

```bash {frame="none"}
echo $RANDOM
```

```bash {frame="none"}
1024
```

## Custom Shell Variables

[Refer to the later chapter on environment variables](/en/linux/env/concept/#custom-shell-variables)
