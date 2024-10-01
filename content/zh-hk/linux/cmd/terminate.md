---
title: "終止進程"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 1500
seo:
  title: "終止進程"
  description: ""
  canonical: ""
  noindex: false
---

## KILL 命令

其實佢係一個畀進程發信號嘅工具，唔一定係殺進程。

```bash {frame="none"}
man kill
```

```bash {frame="none"}
kill - send a signal to a process
```

### 默認信號

`kill` 命令嘅默認信號係 `SIGTERM`，對應數字 `15`，優雅終止。

### 列出可用信號

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

### 指定信號類型

```bash {frame="none"}
kill -s SIGKILL <PID>
```

```bash {frame="none"}
kill -9 <PID>
```

### 發畀多個進程

```bash {frame="none"}
kill -15 <PID> <PID> <PID>
```

### 特殊進程號 -1

\-1 進程號表示所有進程，以下命令會終止你（當前用戶）能終止嘅所有進程。

{{< callout context="danger" title="危險" >}}
唔好喺 root 用戶執行
{{< /callout >}}

```bash {frame="none"}
kill -9 -1
```

假如我想喺 `kuga` 用戶執行，可以先喺 `root` 用戶睇下該用戶嘅進程。

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

然後再到 kuga 終端執行命令 `kill -9 -1`。

```bash {frame="none"}
Connection to x.x.x.x closed by remote host.
Connection to x.x.x.x closed.
```

會即刻斷開連接，喺 `root` 上睇 `kuga` 用戶進程會發現全冇咗。

## PKILL 命令

通過進程嘅名稱嚟搵並發信號畀匹配嘅進程。

```bash {frame="none"}
man pkill
```

```bash {frame="none"}
signal for processes based on name and other attributes
```

### 默認信號

`pkill` 命令嘅默認信號係 `SIGTERM`，對應數字 `15`，優雅終止。

### 指定信號類型

```bash {frame="none"}
pkill -SIGKILL bash
```

```bash {frame="none"}
pkill -9 bash
```

### 指定用戶進程

```bash {frame="none"}
pkill -u kuga
```

```bash {frame="none"}
pkill -9 -u kuga bash
```

### 精確匹配進程名稱

```bash {frame="none"}
pkill -x sshd
```

## PGREP

通過進程嘅名稱嚟搵進程 ID。

```bash {frame="none"}
man pgrep
```

```bash {frame="none"}
look up for processes based on name and other attributes 
```

### 忽略大小寫

```bash {frame="none"}
pgrep -i BASH
```

### 指定用戶進程

```bash {frame="none"}
pgrep -u kuga
```

```bash {frame="none"}
44087
44088
44149
44150
```

### 列出進程 ID 和名稱

沒有 `-l` 就只會顯示進程 ID。

```bash {frame="none"}
pgrep -l bash
```

```bash {frame="none"}
42977 bash
44150 bash
```

### 列出匹配進程嘅數量

```bash {frame="none"}
pgrep -c bash
```

```bash {frame="none"}
2
```

### 指定父進程 ID

```bash {frame="none"}
pgrep -P 1729
```

```bash {frame="none"}
42912
44084
```

### 最近啟動嘅進程

```bash {frame="none"}
pgrep -n -l
```

```bash {frame="none"}
pgrep -n bash -l
```

### 最早啟動嘅進程

```bash {frame="none"}
pgrep -o -l
```

```bash {frame="none"}
1 systemd
```

### 精確匹配進程名稱

```bash {frame="none"}
pgrep -x sshd
```

## 常用信號

### SIGTERM - 15

請求進程終止。這個信號係「友好」嘅終止請求，進程可以捕捉到這個信號並執行清理工作，然後退出。
它係 `kill` 和 `pkill` 命令嘅默認信號。
通常用於優雅地終止進程，畀進程時間來處理未完成嘅任務。

### SIGKILL - 9

強制終止進程。此信號唔能被進程捕捉、阻塞或忽略，進程會立即被終止。
發送 `SIGKILL` 會直接停止進程，唔允許進程進行任何清理操作。
用於無法正常終止嘅進程，當 `SIGTERM` 無效時使用。

### SIGINT - 2

中斷信號，通常由用戶通過 `Ctrl+C` 發送，用於中斷前台運行嘅進程。
用於手動中斷進程，尤其是交互式進程。

### SIGQUIT - 3

退出信號，通常由用戶通過 `Ctrl+\` 發送，表示希望進程生成核心轉儲（core dump）並退出。
用於調試，當希望進程生成核心轉儲以便分析問題時使用。

### SIGHUP - 1

掛起信號，通常表示終端或控制台斷開連接。
許多守護進程在接收到 `SIGHUP` 信號時，會重新加載其配置文件。
用於重新加載守護進程嘅配置，或讓守護進程重啟。
