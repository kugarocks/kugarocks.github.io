---
title: "Subshell"
description: ""
summary: ""
date: 2024-08-27T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 900
seo:
  title: "Subshell"
  description: ""
  canonical: ""
  noindex: false
---

## Subshell

Subshell 的定义在一些书本或资料中模糊不清，给出的解释往往和某些例子自相矛盾，让人捉摸不透。
因此，为了避免这种语义与逻辑上的问题，这里不会给出它的定义（建议参考官方 BASH 手册），
也不会使用 “子 Shell” 这个翻译，仅仅从它的实际表现去理解它的定义。
下面列举的变量和 Subshell 概念有着密切的联系。

{{< link-card
  title="Bash Reference Manual"
  description="Bash 参考手册"
  href="https://www.gnu.org/software/bash/manual/bash.html"
  target="_blank"
>}}

### BASH_SUBSHELL

Shell 变量，**非环境变量**，官方手册解释。

```bash {frame="none" text-wrap="wrap"}
Incremented by one within each subshell or subshell environment when the shell begins executing in that environment. The initial value is 0. If BASH_SUBSHELL is unset, it loses its special properties, even if it is subsequently reset.
```

也可以使用 man 命令，内容可能会有一点差别。

```bash {frame="none"}
man bash | grep -A 3 'BASH_SUBSHELL' | head -n 4
```

***

```bash {frame="none"}
echo $BASH_SUBSHELL
```

```bash {frame="none"}
0
```

### SHLVL

**环境变量**，官方手册解释。

```bash {frame="none" text-wrap="wrap"}
Incremented by one each time a new instance of Bash is started. This is intended to be a count of how deeply your Bash shells are nested.
```

使用 man 命令。

```bash {frame="none"}
man bash | grep 'SHLVL'
```

这个值是从 1 开始的。

```bash {frame="none"}
echo $SHLVL
```

```bash {frame="none"}
1
```

## 命令分组

全称 Command Grouping，Bash 提供两种方法创建命令分组。

### 括号：()

该方法会创建一个 Subshell 环境去处理命令分组。

```bash {frame="none"}
(pwd; echo $BASH_SUBSHELL)
```

```bash {frame="none"}
/home/kuga
1
```

***

```bash {frame="none"}
(pwd; (echo $BASH_SUBSHELL))
```

```bash {frame="none"}
/home/kuga
2 
```

***

```bash {frame="none"}
(pwd; (echo $SHLVL))
```

```bash {frame="none"}
1
```

可以得出以下结论。

* BASH_SUBSHELL：每创建一个 Subshell 就加 1。
* SHLVL：无论创建多少个 Subshell，都不变。

### 花括号：\{\}

这种方法不会创建 Subshell，命令分组是在当前 Shell 的上下文中处理的。
在语法上，花括号与命令之间的空格不能省略，每个命令结尾的分号也是必须的。

```bash {frame="none"}
{ pwd; { echo $BASH_SUBSHELL; } }
```

```bash {frame="none"}
/home/kuga
0
```

***

```bash {frame="none"}
{ pwd; { echo $SHLVL; } }
```

```bash {frame="none"}
/home/kuga
1
```

## Shell  PID

可通过 BASHPID 或 `$$` 查看 Shell 的 PID，但它们是有区别的。

### BASHPID

Shell 变量，**非环境变量**，官方解释。

```bash {frame="none" text-wrap="wrap"}
Expands to the process ID of the current Bash process. This differs from $$ under certain circumstances, such as subshells that do not require Bash to be re-initialized. Assignments to BASHPID have no effect. If BASHPID is unset, it loses its special properties, even if it is subsequently reset.
```

```bash {frame="none"}
echo $BASHPID
```

```bash {frame="none"}
56414
```

使用 `()` 查看 BASHPID。

```bash {frame="none"}
(ps -f --forest; echo $BASHPID)
```

```bash {frame="none"}
UID          PID    PPID  C STIME TTY          TIME CMD
kuga       56414   56412  0 10:11 pts/0    00:00:00 -bash
kuga       57325   56414  0 15:13 pts/0    00:00:00  \_ -bash
kuga       57326   57325  0 15:13 pts/0    00:00:00      \_ ps -f --forest
57325
```

可以看到，BASHPID 输出了 Subshell 的 PID。

### 特殊参数 $$

官方解释。

```bash {frame="none" text-wrap="wrap"}
($$) Expands to the process ID of the shell. In a subshell, it expands to the process ID of the invoking shell, not the subshell.
```

在 Subshell 中，`$$` 表示的是 invoking shell 的 PID。

```bash {frame="none"}
(pwd; (ps -f --forest; echo $$))
```

```bash {frame="none"}
/home/kuga
UID          PID    PPID  C STIME TTY          TIME CMD
kuga       56414   56412  0 10:11 pts/0    00:00:00 -bash
kuga       57347   56414  0 15:20 pts/0    00:00:00  \_ -bash
kuga       57348   57347  0 15:20 pts/0    00:00:00      \_ -bash
kuga       57349   57348  0 15:20 pts/0    00:00:00          \_ ps -f --forest
56414
```

可以看到，无论有多少个 Subshells，`$$` 始终表示顶层 Bash 的 PID。

## 创建 Bash 实例

在 Bash 中输入 `bash` 就可以创建一个全新的 Bash 实例。

```bash {frame="none"}
bash
```

```bash {frame="none"}
ps -f --forest
```

```bash {frame="none"}
UID          PID    PPID  C STIME TTY          TIME CMD
kuga       56414   56412  0 10:11 pts/0     00:00:00 -bash
kuga       57359   56414  0 15:29 pts/0     00:00:00  \_ bash
kuga       57402   57359  0 15:30 pts/0     00:00:00      \_ ps -f --forest
```

这时候再观察一下上面提到的变量。

```bash {frame="none"}
echo $BASH_SUBSHELL $SHLVL $BASHPID $$
```

```bash {frame="none"}
0 2 57359 57359
```

* BASH_SUBSHELL：没有变化。
* SHLVL：从 1 -> 2。
* BASHPID：新 Bash 实例的 PID。
* $$：新 Bash 实例的 PID。

如果说这种创建 Bash 的方式也是 Subshell 的话，语义和表现上就会自相矛盾。
