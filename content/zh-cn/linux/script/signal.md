---
title: "信号处理"
description: ""
summary: ""
date: 2024-09-02T20:00:00+08:00
lastmod: 2024-09-02T20:00:00+08:00
weight: 3600
seo:
  title: "信号处理"
  description: ""
  canonical: ""
  noindex: false
---

## Bash Shell

在默认情况下，Bash Shell 会忽略 `SIGQUIT(3)` 和 `SIGTERM(15)` 信号，
因此执行下面的命令不会有任何反应（`$$` 是当前 Shell 的进程 ID）。

```bash {frame="none"}
kill -3 $$
```

```bash {frame="none"}
kill -15 $$
```

如果收到 `SIGHUP(1)` 信号，Bash Shell 会退出，但在退出前，
它会把 `SIGHUP` 信号传给所有由该 Shell 启动的进程和脚本。

```bash {frame="none"}
kill -1 $$
```

## TRAP

可以使用 `trap` 命令捕获信号。

```bash {frame="none"}
trap commands signals
```

### 捕获信号

键盘 `Ctrl+C` 的信号是 `SIGINT`。

```bash {frame="none"}
#!/usr/bin/env bash

trap "echo ' Trapped Ctrl-C'" SIGINT

count=1
while [ $count -le 5 ]
do
    echo "loop #$count"
    sleep 1
    count=$[ $count + 1 ]
done
```

```txt {frame="none"}
loop #1
loop #2
^C Trapped Ctrl-C
loop #3
loop #4
^C Trapped Ctrl-C
loop #5
```

### 退出信号

可以捕获脚本退出时候的信号。

```bash {frame="none"}
trap "echo ' Trapped Ctrl-C'" EXIT
```

### 移除信号

使用 `--` 即可移除信号。

```bash {frame="none"}
trap -- SIGINT
```

## NOHUP

No Hand Up，由该命令启动的进程或脚本会忽略 SIGHUB 信号。
也就是说，即使终端退出，由该终端启动的进程或脚本不会跟着一起退出。

```txt {frame="none"}
run a command immune to hangups, with output to a non-tty
```

```bash {frame="none"}
nohup ./foo
```

默认会把 `STDOUT` 和 `STDERR` 重定向到 `nohup.out`。

```bash {frame="none"}
-rw------- 1 kuga kuga   40 Sep  2 18:46 nohup.out
```

自己重定向会更好一些。

```bash {frame="none"}
nohup ./foo > out.log 2>&1
```

```bash {frame="none"}
-rw-rw-r-- 1 kuga kuga   62 Sep  2 18:50 out.log
```

## Nice Value

控制进程优先级的参数。`nice` 值越高，进程的优先级越低，分配到的 CPU 资源越少。

### 范围

`nice` 值的范围从 `-20` 到 `19`：

* `-20`：最高优先级。
* `0`：默认优先级。
* `19`：最低优先级。

### 启动进程优先级

```bash {frame="none"}
nice -n VALUE command
```

```bash {frame="none"}
nice -n 10 ./foo
```

### 修改进程优先级

```bash {frame="none"}
renice VALUE -p PID
```

```bash {frame="none"}
renice 5 -p 404
```

### 权限

* 普通用户只能降低进程的优先级。
* root 用户才能提高进程的优先级。
