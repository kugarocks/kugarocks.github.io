---
title: "PS 命令"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 1300
seo:
  title: "PS 命令"
  description: ""
  canonical: ""
  noindex: false
---

## 登錄信息

```bash {frame="none"}
w
```

```bash {frame="none"}
 13:46:05 up 3 days, 16:15,  2 users,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
root     pts/0    120.231.138.139  13:43    1.00s  0.00s  0.00s w
kuga     pts/1    120.231.138.139  13:44   53.00s  0.02s  0.02s -bash
```

下面執行的命令都是基於以上的環境配置。

## 進程狀態

PS 全稱是 Process Status。

```bash {frame="none"}
man ps
```

```bash {frame="none"}
ps - report a snapshot of the current processes.
```

| 風格 | 來源 | 前綴 |
| --- | --- | --- |
| Unix | 貝爾實驗室的 AT&T 系統 | `-` |
| BSD  | 伯克利軟件發行版 | 無 |
| GNU  | GNU 組織的改進版本 | `--` |

因為歷史的原因 `ps` 命令混雜著各種不同的風格__AB__有時候確跟 💩 一樣。

## 不添加任何選項

```bash {frame="none"}
ps
```

```bash {frame="none"}
    PID TTY          TIME CMD
  20274 pts/0    00:00:00 bash
  20714 pts/0    00:00:00 sleep
  20715 pts/0    00:00:00 ps
```

不添加任何選項時__AB__它會顯示所有與**當前終端**相關的進程。
簡單來說__AB__如果當前終端的 TTY 是 `pts/0`__AB__那麼他會顯示所有 TTY 是 `pts/0` 的進程。
通常包括 Shell 進程、從這個終端啟動的任何進程（無論是前台還是後台）__AB__以及 `ps` 命令本身。
上面的 sleep 進程是我使用後台進程的方式啟動的。

```bash {frame="none"}
nohup sleep 60 &
```

## 基礎選項

### 選項：a

顯示與終端相關的所有進程__AB__不僅僅是當前終端或當前用戶。

```bash {frame="none"}
ps a
```

```bash {frame="none"}
    PID TTY      STAT   TIME COMMAND
    821 ttyS0    Ss+    0:00 /sbin/agetty -o -p -- \u --keep-baud 115200,57600,38400,9600 ttyS0 vt220
    845 tty1     Ss+    0:00 /sbin/agetty -o -p -- \u --noclear tty1 linux
  23300 pts/0    Ss     0:00 -bash
  23393 pts/1    Ss+    0:00 -bash
  23475 pts/0    R+     0:00 ps a
```

上面的結果是從 `pts/0` 終端執行的__AB__可以看到__AB__終端為 `ttyS0`、`tty1`、`pts/1` 的進程都顯示出來了__AB__
也沒有區分用戶__AB__`pts/0`、`ttyS0` 、`tty1` 是 root 的__AB__`pts/1` 是 kuga 的。

### 選項：u

以用戶友好的格式顯示進程信息。

```bash {frame="none"}
ps u
```

```bash {frame="none"}
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         821  0.0  0.0   5800  1092 ttyS0    Ss+  Aug07   0:00 /sbin/agetty -o -p -- \u --keep-baud 115200,57600,3
root         845  0.0  0.0   6176  1072 tty1     Ss+  Aug07   0:00 /sbin/agetty -o -p -- \u --noclear tty1 linux
root       23300  0.0  0.3   8792  5616 pts/0    Ss   13:43   0:00 -bash
root       23480  0.0  0.0  10072  1588 pts/0    R+   14:01   0:00 ps u
```

如果這個選項只跟顯示字段有關__AB__那它的進程集應該和沒有添加任何選項的 `ps` 命令一樣。
然而上面的結果表明__AB__除了自身終端 `pts/0` 的進程__AB__它也顯示了別的終端進程__AB__
但它沒有顯示 `pts/1` 的終端進程（用戶是 kuga）。

可以簡單得出結論__AB__**`u` 選項的進程集就是：與當前用戶終端相關的所有進程**。
上面就是與 root 用戶相關的所有終端進程__AB__如果在 kuga 用戶的終端執行 `ps u`__AB__
可以得到下面的結果__AB__完全符合預期。

```bash {frame="none"}
ps u
```

```bash {frame="none"}
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
kuga       23393  0.0  0.3   8660  5452 pts/1    Ss   13:44   0:00 -bash
kuga       23496  0.0  0.0  10072  1608 pts/1    R+   14:22   0:00 ps u
```

另外這個進程集的定義不是 `u` 選項特有的__AB__它和 BSD 風格有關。

### 選項：x

顯示屬於當前用戶的所有進程。

```bash {frame="none"}
ps x
```

```bash {frame="none"}
    PID TTY      STAT   TIME COMMAND
  23330 ?        Ss     0:00 /lib/systemd/systemd --user
  23331 ?        S      0:00 (sd-pam)
  23392 ?        R      0:00 sshd: kuga@pts/1
  23393 pts/1    Ss     0:00 -bash
  23719 pts/1    R+     0:00 ps x
```

上面的結果是在 kuga 用戶的終端執行的__AB__所以進程數量不會太多。

### 選項：-e

顯然所有進程。

```bash {frame="none"}
man ps | grep "\-e  "
```

```bash {frame="none"}
-e     Select all processes.  Identical to -A.
```

### 選項：-f

以全格式（full-format）顯示進程信息__AB__可以與其他 UNIX-style 的選項組合使用。

```bash {frame="none"}
man ps | grep "\-f  "
```

```bash {frame="none"}
-f     Do full-format listing.  This option can be combined with many other UNIX-style options to add
```

***

```bash {frame="none"}
ps -f
```

```bash {frame="none"}
UID          PID    PPID  C STIME TTY          TIME CMD
root       23300   23163  0 13:43 pts/0    00:00:00 -bash
root       24317   23300  0 16:53 pts/0    00:00:00 ps -f
```

### 選項：-o

自定義輸出字段__AB__不能與 `-f` 和 `u` 選項共用。

```bash {frame="none"}
ps -o uid,user,pid,%cpu,%mem,cmd
```

```bash {frame="none"}
UID USER   PID %CPU %MEM CMD
  0 root 23300  0.0  0.3 -bash
  0 root 24311  0.0  0.0 ps -o uid,user,pid,%cpu,%mem,cmd
```

注意這裡的 uid 和使用 `-f` 選項顯示的內容不一樣__AB__這裡是數字 ID__AB__但 `-f` 會顯示用戶名。

### 選項：-p

指定進程 PID。

```bash {frame="none"}
ps up 1
```

```bash {frame="none"}
USER  PID %CPU %MEM    VSZ   RSS TTY  STAT START   TIME COMMAND
root    1  0.0  0.7 167696 13328 ?    Ss   Aug07   0:08 /lib/systemd/systemd --system --deserialize 36 noib
```

### 選項：-\-forest

以 ASCII 顯示進程與子進程的樹狀結構。

```bash {frame="none"}
man ps | grep -A 1 "\--forest"
```

```bash {frame="none"}
--forest
       ASCII art process tree.
```

***

```bash {frame="none"}
ps -o pid,ppid,cmd --forest
```

```bash {frame="none"}
    PID    PPID CMD
  23300   23163 -bash
  24537   23300  \_ ps -o pid,ppid,cmd --forest
```

## 不同風格的進程集

不同風格的選項進程集是不一樣的__AB__但只要細心觀察__AB__還是能發現一些規律。

**`ps`**：不添加任何選項

```bash {frame="none"}
ps
```

```bash {frame="none"}
    PID TTY          TIME CMD
   2090 pts/0    00:00:00 bash
   2261 pts/0    00:00:00 ps
```

**`ps -l`**：Unix 風格__AB__`-l` 表示以長格式顯示。

```bash {frame="none"}
ps -l
```

```bash {frame="none"}
F S   UID     PID    PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
4 S     0    2090    2034  0  80   0 -  2198 do_wai pts/0    00:00:00 bash
4 R     0    2262    2090  0  80   0 -  2518 -      pts/0    00:00:00 ps
```

**`ps l`**：BSD 風格__AB__`l` 表示以 BSD 長格式顯示。

```bash {frame="none"}
ps l
```

```bash {frame="none"}
F   UID     PID    PPID PRI  NI    VSZ   RSS WCHAN  STAT TTY        TIME COMMAND
4     0     760       1  20   0   5800  1160 do_sel Ss+  ttyS0      0:00 /sbin/agetty -o -p -- \u --keep-baud 115200,57600,38400,9600 ttyS0 vt220
4     0     779       1  20   0   6176  1108 do_sel Ss+  tty1       0:00 /sbin/agetty -o -p -- \u --noclear tty1 linux
4     0    2090    2034  20   0   8792  5492 do_wai Ss   pts/0      0:00 -bash
4     0    2298    2090  20   0  10072  1608 -      R+   pts/0      0:00 ps l
```

**`ps --forest`**：GNU 風格__AB__`--forest` 表示以進程樹的方式顯示。

```bash {frame="none"}
ps --forest
```

```bash {frame="none"}
    PID TTY          TIME CMD
   2090 pts/0    00:00:00 bash
   2316 pts/0    00:00:00  \_ ps
```

上面的例子中__AB__所用的選項都是和進程集無關的__AB__可以總結出如下規律：

| 風格 | 進程集 |
| --- | --- |
| 無選項 | 顯示所有與當前終端相關的進程 |
| Unix | 與不添加選項一致 |
| BSD | 顯示與當前用戶終端相關的所有進程 |
| GNU | 與不添加選項一致 |

顯然__AB__Unix 和 GNU 風格看上去更符合邏輯__AB__因為它們的進程集和不添加選項時的進程集是一樣的__AB__
但 BSD 風格就自己加戲了__AB__把當前用戶其他終端相關的進程也包含進來了。
不同風格的選項可以一起使用__AB__但如果兩個選項都是指定顯示格式__AB__會無法執行。
另外__AB__如果多個風格中包含了 BSD 風格__AB__但選項中又沒有指定進程集__AB__那麼默認會使用 BSD 的進程集。

## 常用功能

### 列出用戶進程

```bash {frame="none"}
ps -fu kuga
```

### 列出所有進程

```bash {frame="none"}
ps -ef
```

`-e` 顯示所有進程__AB__`-f` 以全格式顯示__AB__這沒什麼好說的。

```bash {frame="none"}
ps aux
```

奇怪的是 `aux` 的進程集__AB__從上面的分析可以知道：

* `a`：顯示與終端相關的所有進程__AB__不僅僅是當前終端或當前用戶。
* `x`：顯示屬於當前用戶的所有進程。

顯然 `ax` 加起來也只是當前用戶的所有進程和不區分用戶的所有終端進程__AB__但如果再看一下官方的文檔。

```bash {frame="none"}
a ... or to list all processes when used together with the x option.
x ... or to list all processes when used together with the a option.
```

`ax` 一起用的時候代表所有進程__AB__我們也可以驗證一下進程數。

```bash {frame="none"}
ps aux | wc -l
```

```bash {frame="none"}
ps -ef | ec -l
```

可以看到 `aux` 和 `-ef` 的進程集數量是一樣的__AB__我很細節的__AB__我說的是數量🤪。

### 占用內存排名

go rocks

## 特殊字段說明

### VSZ

Virtual Memory Size__AB__虛擬內存大小__AB__以 KB 為單位。

### RSS

Resident Set Size__AB__常駐內存大小__AB__以 KB 為單位。

### TTY

進程關聯的終端。如果進程與某個終端關聯__AB__它會顯示終端的名稱；如果未關聯終端__AB__則顯示 `?`。

### STAT

進程的狀態碼。常見的狀態碼包括：

* **`R`**: 運行中（Running）。
* **`S`**: 睡眠中（Sleeping）__AB__等待某個事件完成。
* **`D`**: 不可中斷的睡眠狀態（Uninterruptible Sleep）__AB__通常是等待 I/O。
* **`T`**: 暫停或跟踪中（Stopped or Traced）。
* **`Z`**: 僵尸進程（Zombie）__AB__進程已經終止__AB__但未被父進程清理。
* **`I`**: 空閒內核線程（Idle Kernel Thread）。
* **`Ss`**: 主進程處於睡眠狀態。
* **`R+`**: 運行中的進程__AB__並且在前台顯示。

go rocks 需要深入理解不同的進程狀態

### START

進程啟動的時間或日期。對於新進程__AB__顯示的是時間__AB__對於舊進程__AB__顯示的是日期。

### TIME

進程使用 CPU 的累計時間__AB__表示該進程總共占用了多少 CPU 時間。

### C

進程的 CPU 使用率。這個字段顯示的是自進程啟動以來__AB__CPU 時間的累積使用百分比。
