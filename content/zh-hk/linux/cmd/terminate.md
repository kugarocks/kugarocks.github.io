---
title: "终止进程"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 1500
seo:
  title: "终止进程"
  description: ""
  canonical: ""
  noindex: false
---

## KILL 命令

其实它是一个给进程发信号的工具，不一定是杀进程。

```bash {frame="none"}
man kill
```

```bash {frame="none"}
kill - send a signal to a process
```

### 默认信号

`kill` 命令的默认信号是 `SIGTERM`，对应数字 `15`，优雅终止。

### 列出可用信号

```bash {frame="none"}
kill -l
```

```bash {frame="none"}
 1) SIGHUP    2) SIGINT    3) SIGQUIT   4) SIGILL    5) SIGTRAP
 6) SIGABRT   7) SIGBUS    8) SIGFPE    9) SIGKILL  10) SIGUSR1
11) SIGSEGV  12) SIGUSR2  13) SIGPIPE  14) SIGALRM  15) SIGTERM
......
```

***

```bash {frame="none"}
kill -l 9 15
```

```bash {frame="none"}
KILL
TERM
```

### 指定信号类型

```bash {frame="none"}
kill -s SIGKILL <PID>
```

```bash {frame="none"}
kill -9 <PID>
```

### 发给多个进程

```bash {frame="none"}
kill -15 <PID> <PID> <PID>
```

### 特殊进程号 -1

\-1 进程号表示所有进程，以下命令会终止你（当前用户）能终止的所有进程。

{{< callout context="danger" title="危险" >}}
不要在 root 用户执行
{{< /callout >}}

```bash {frame="none"}
kill -9 -1
```

假如我想在 `kuga` 用户执行，可先在 `root` 用户查看该用户的进程。

```bash {frame="none"}
ps -fu kuga
```

```bash {frame="none"}
UID          PID    PPID  C STIME TTY          TIME CMD
kuga       42994       1  0 14:13 ?        00:00:00 /lib/systemd/systemd --user
kuga       42995   42994  0 14:13 ?        00:00:00 (sd-pam)
kuga       43056   42991  0 14:13 ?        00:00:00 sshd: kuga@pts/0
kuga       43057   43056  0 14:13 pts/0    00:00:00 -bash
```

然后再到 kuga 终端执行命令 `kill -9 -1`。

```bash {frame="none"}
Connection to x.x.x.x closed by remote host.
Connection to x.x.x.x closed.
```

会立刻断开连接，在 `root` 上查看 `kuga` 用户进程会发现全没了。

## PKILL 命令

通过进程的名称来查找并发送信号给匹配的进程。

```bash {frame="none"}
man pkill
```

```bash {frame="none"}
signal for processes based on name and other attributes
```

### 默认信号

`pkill` 命令的默认信号是 `SIGTERM`，对应数字 `15`，优雅终止。

### 指定信号类型

```bash {frame="none"}
pkill -SIGKILL bash
```

```bash {frame="none"}
pkill -9 bash
```

### 指定用户进程

```bash {frame="none"}
pkill -u kuga
```

```bash {frame="none"}
pkill -9 -u kuga bash
```

### 精确匹配进程名称

```bash {frame="none"}
pkill -x sshd
```

## PGREP

通过进程的名称来查找进程 ID。

```bash {frame="none"}
man pgrep
```

```bash {frame="none"}
look up for processes based on name and other attributes 
```

### 忽略大小写

```bash {frame="none"}
pgrep -i BASH
```

### 指定用户进程

```bash {frame="none"}
pgrep -u kuga
```

```bash {frame="none"}
44087
44088
44149
44150
```

### 列出进程 ID 和名称

没有 `-l` 就只会显示进程 ID。

```bash {frame="none"}
pgrep -l bash
```

```bash {frame="none"}
42977 bash
44150 bash
```

### 列出匹配进程的数量

```bash {frame="none"}
pgrep -c bash
```

```bash {frame="none"}
2
```

### 指定父进程 ID

```bash {frame="none"}
pgrep -P 1729
```

```bash {frame="none"}
42912
44084
```

### 最近启动的进程

```bash {frame="none"}
pgrep -n -l
```

```bash {frame="none"}
pgrep -n bash -l
```

### 最早启动的进程

```bash {frame="none"}
pgrep -o -l
```

```bash {frame="none"}
1 systemd
```

### 精确匹配进程名称

```bash {frame="none"}
pgrep -x sshd
```

## 常用信号

### SIGTERM - 15

请求进程终止。这个信号是“友好”的终止请求，进程可以捕捉到这个信号并执行清理工作，然后退出。
它是 `kill` 和 `pkill` 命令的默认信号。
通常用于优雅地终止进程，给进程时间来处理未完成的任务。

### SIGKILL - 9

强制终止进程。此信号不能被进程捕捉、阻塞或忽略，进程会立即被终止。
发送 `SIGKILL` 会直接停止进程，不允许进程进行任何清理操作。
用于无法正常终止的进程，当 `SIGTERM` 无效时使用。

### SIGINT - 2

中断信号，通常由用户通过 `Ctrl+C` 发送，用于中断前台运行的进程。
用于手动中断进程，尤其是交互式进程。

### SIGQUIT - 3

退出信号，通常由用户通过 `Ctrl+\` 发送，表示希望进程生成核心转储（core dump）并退出。
用于调试，当希望进程生成核心转储以便分析问题时使用。

### SIGHUP - 1

挂起信号，通常表示终端或控制台断开连接。
许多守护进程在接收到 `SIGHUP` 信号时，会重新加载其配置文件。
用于重新加载守护进程的配置，或让守护进程重启。
