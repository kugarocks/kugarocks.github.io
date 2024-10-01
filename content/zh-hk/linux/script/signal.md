---
title: "信號處理"
description: ""
summary: ""
date: 2024-09-02T20:00:00+08:00
lastmod: 2024-09-02T20:00:00+08:00
weight: 3600
seo:
  title: "信號處理"
  description: ""
  canonical: ""
  noindex: false
---

## Bash Shell

喺默認情況下__AB__Bash Shell 會忽略 `SIGQUIT(3)` 同 `SIGTERM(15)` 信號__AB__
所以執行下面嘅命令唔會有任何反應（`$$` 係當前 Shell 嘅進程 ID）。

```bash {frame="none"}
kill -3 $$
```

```bash {frame="none"}
kill -15 $$
```

如果收到 `SIGHUP(1)` 信號__AB__Bash Shell 會退出__AB__但喺退出之前__AB__
佢會把 `SIGHUP` 信號傳畀所有由該 Shell 啟動嘅進程同腳本。

```bash {frame="none"}
kill -1 $$
```

## TRAP

可以用 `trap` 命令捕捉信號。

```bash {frame="none"}
trap commands signals
```

### 捕捉信號

鍵盤 `Ctrl+C` 嘅信號係 `SIGINT`。

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

### 退出信號

可以捕捉腳本退出時候嘅信號。

```bash {frame="none"}
trap "echo ' Trapped Ctrl-C'" EXIT
```

### 移除信號

用 `--` 就可以移除信號。

```bash {frame="none"}
trap -- SIGINT
```

## NOHUP

No Hang Up__AB__由該命令啟動嘅進程或者腳本會忽略 SIGHUP 信號。
即係話__AB__即使終端退出__AB__由該終端啟動嘅進程或者腳本唔會跟住一齊退出。

```txt {frame="none"}
run a command immune to hangups, with output to a non-tty
```

```bash {frame="none"}
nohup ./foo
```

默認會把 `STDOUT` 同 `STDERR` 重定向到 `nohup.out`。

```bash {frame="none"}
-rw------- 1 kuga kuga   40 Sep  2 18:46 nohup.out
```

自己重定向會好啲。

```bash {frame="none"}
nohup ./foo > out.log 2>&1
```

```bash {frame="none"}
-rw-rw-r-- 1 kuga kuga   62 Sep  2 18:50 out.log
```

## Nice Value

控制進程優先級嘅參數。`nice` 值越高__AB__進程嘅優先級越低__AB__分配到嘅 CPU 資源越少。

### 範圍

`nice` 值嘅範圍從 `-20` 到 `19`：

* `-20`：最高優先級。
* `0`：默認優先級。
* `19`：最低優先級。

### 啟動進程優先級

```bash {frame="none"}
nice -n VALUE command
```

```bash {frame="none"}
nice -n 10 ./foo
```

### 修改進程優先級

```bash {frame="none"}
renice VALUE -p PID
```

```bash {frame="none"}
renice 5 -p 404
```

### 權限

* 普通用戶只能降低進程嘅優先級。
* root 用戶先可以提高進程嘅優先級。
