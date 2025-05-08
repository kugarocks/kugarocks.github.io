# PS

PS 全称是 Process Status。

```bash
man ps
```

```bash
ps - report a snapshot of the current processes.
```

| 风格 | 来源 | 前缀 |
| --- | --- | --- |
| Unix | 贝尔实验室的 AT&T 系统 | `-` |
| BSD  | 伯克利软件发行版 | 无 |
| GNU  | GNU 组织的改进版本 | `--` |

因为历史的原因 `ps` 命令混杂着各种不同的风格，有时候确跟 💩 一样。

## 登录信息

```bash
w
```

```bash
 13:46:05 up 3 days, 16:15,  2 users,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
root     pts/0    120.231.138.139  13:43    1.00s  0.00s  0.00s w
kuga     pts/1    120.231.138.139  13:44   53.00s  0.02s  0.02s -bash
```

下面执行的命令都是基于以上的环境配置。

## 不添加任何选项

```bash
ps
```

```bash
    PID TTY          TIME CMD
  20274 pts/0    00:00:00 bash
  20714 pts/0    00:00:00 sleep
  20715 pts/0    00:00:00 ps
```

不添加任何选项时，它会显示所有与**当前终端**相关的进程。
简单来说，如果当前终端的 TTY 是 `pts/0`，那么他会显示所有 TTY 是 `pts/0` 的进程。
通常包括 Shell 进程、从这个终端启动的任何进程（无论是前台还是后台），以及 `ps` 命令本身。
上面的 sleep 进程是我使用后台进程的方式启动的。

```bash
nohup sleep 60 &
```

## 基础选项

### 选项：a

显示与终端相关的所有进程，不仅仅是当前终端或当前用户。

```bash
ps a
```

```bash
    PID TTY      STAT   TIME COMMAND
    821 ttyS0    Ss+    0:00 /sbin/agetty -o -p -- \u --keep-baud 115200,57600,38400,9600 ttyS0 vt220
    845 tty1     Ss+    0:00 /sbin/agetty -o -p -- \u --noclear tty1 linux
  23300 pts/0    Ss     0:00 -bash
  23393 pts/1    Ss+    0:00 -bash
  23475 pts/0    R+     0:00 ps a
```

上面的结果是从 `pts/0` 终端执行的，可以看到，终端为 `ttyS0`、`tty1`、`pts/1` 的进程都显示出来了，
也没有区分用户，`pts/0`、`ttyS0` 、`tty1` 是 root 的，`pts/1` 是 kuga 的。

### 选项：u

以用户友好的格式显示进程信息。

```bash
ps u
```

```bash
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         821  0.0  0.0   5800  1092 ttyS0    Ss+  Aug07   0:00 /sbin/agetty -o -p -- \u --keep-baud 115200,57600,3
root         845  0.0  0.0   6176  1072 tty1     Ss+  Aug07   0:00 /sbin/agetty -o -p -- \u --noclear tty1 linux
root       23300  0.0  0.3   8792  5616 pts/0    Ss   13:43   0:00 -bash
root       23480  0.0  0.0  10072  1588 pts/0    R+   14:01   0:00 ps u
```

如果这个选项只跟显示字段有关，那它的进程集应该和没有添加任何选项的 `ps` 命令一样。
然而上面的结果表明，除了自身终端 `pts/0` 的进程，它也显示了别的终端进程，
但它没有显示 `pts/1` 的终端进程（用户是 kuga）。

可以简单得出结论，**`u` 选项的进程集就是：与当前用户终端相关的所有进程**。
上面就是与 root 用户相关的所有终端进程，如果在 kuga 用户的终端执行 `ps u`，
可以得到下面的结果，完全符合预期。

```bash
ps u
```

```bash
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
kuga       23393  0.0  0.3   8660  5452 pts/1    Ss   13:44   0:00 -bash
kuga       23496  0.0  0.0  10072  1608 pts/1    R+   14:22   0:00 ps u
```

另外这个进程集的定义不是 `u` 选项特有的，它和 BSD 风格有关。

### 选项：x

显示属于当前用户的所有进程。

```bash
ps x
```

```bash
    PID TTY      STAT   TIME COMMAND
  23330 ?        Ss     0:00 /lib/systemd/systemd --user
  23331 ?        S      0:00 (sd-pam)
  23392 ?        R      0:00 sshd: kuga@pts/1
  23393 pts/1    Ss     0:00 -bash
  23719 pts/1    R+     0:00 ps x
```

上面的结果是在 kuga 用户的终端执行的，所以进程数量不会太多。

### 选项：-e

显然所有进程。

```bash
man ps | grep "\-e  "
```

```bash
-e     Select all processes.  Identical to -A.
```

### 选项：-f

以全格式（full-format）显示进程信息，可以与其他 UNIX-style 的选项组合使用。

```bash
man ps | grep "\-f  "
```

```bash
-f     Do full-format listing.  This option can be combined with many other UNIX-style options to add
```

***

```bash
ps -f
```

```bash
UID          PID    PPID  C STIME TTY          TIME CMD
root       23300   23163  0 13:43 pts/0    00:00:00 -bash
root       24317   23300  0 16:53 pts/0    00:00:00 ps -f
```

### 选项：-o

自定义输出字段，不能与 `-f` 和 `u` 选项共用。

```bash
ps -o uid,user,pid,%cpu,%mem,cmd
```

```bash
UID USER   PID %CPU %MEM CMD
  0 root 23300  0.0  0.3 -bash
  0 root 24311  0.0  0.0 ps -o uid,user,pid,%cpu,%mem,cmd
```

注意这里的 uid 和使用 `-f` 选项显示的内容不一样，这里是数字 ID，但 `-f` 会显示用户名。

### 选项：-p

指定进程 PID。

```bash
ps up 1
```

```bash
USER  PID %CPU %MEM    VSZ   RSS TTY  STAT START   TIME COMMAND
root    1  0.0  0.7 167696 13328 ?    Ss   Aug07   0:08 /lib/systemd/systemd --system --deserialize 36 noib
```

### 选项：-\-forest

以 ASCII 显示进程与子进程的树状结构。

```bash
man ps | grep -A 1 "\--forest"
```

```bash
--forest
       ASCII art process tree.
```

***

```bash
ps -o pid,ppid,cmd --forest
```

```bash
    PID    PPID CMD
  23300   23163 -bash
  24537   23300  \_ ps -o pid,ppid,cmd --forest
```

## 不同风格的进程集

不同风格的选项进程集是不一样的，但只要细心观察，还是能发现一些规律。

**`ps`**：不添加任何选项

```bash
ps
```

```bash
    PID TTY          TIME CMD
   2090 pts/0    00:00:00 bash
   2261 pts/0    00:00:00 ps
```

**`ps -l`**：Unix 风格，`-l` 表示以长格式显示。

```bash
ps -l
```

```bash
F S   UID     PID    PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
4 S     0    2090    2034  0  80   0 -  2198 do_wai pts/0    00:00:00 bash
4 R     0    2262    2090  0  80   0 -  2518 -      pts/0    00:00:00 ps
```

**`ps l`**：BSD 风格，`l` 表示以 BSD 长格式显示。

```bash
ps l
```

```bash
F   UID     PID    PPID PRI  NI    VSZ   RSS WCHAN  STAT TTY        TIME COMMAND
4     0     760       1  20   0   5800  1160 do_sel Ss+  ttyS0      0:00 /sbin/agetty -o -p -- \u --keep-baud 115200,57600,38400,9600 ttyS0 vt220
4     0     779       1  20   0   6176  1108 do_sel Ss+  tty1       0:00 /sbin/agetty -o -p -- \u --noclear tty1 linux
4     0    2090    2034  20   0   8792  5492 do_wai Ss   pts/0      0:00 -bash
4     0    2298    2090  20   0  10072  1608 -      R+   pts/0      0:00 ps l
```

**`ps --forest`**：GNU 风格，`--forest` 表示以进程树的方式显示。

```bash
ps --forest
```

```bash
    PID TTY          TIME CMD
   2090 pts/0    00:00:00 bash
   2316 pts/0    00:00:00  \_ ps
```

上面的例子中，所用的选项都是和进程集无关的，可以总结出如下规律：

| 风格 | 进程集 |
| --- | --- |
| 无选项 | 显示所有与当前终端相关的进程 |
| Unix | 与不添加选项一致 |
| BSD | 显示与当前用户终端相关的所有进程 |
| GNU | 与不添加选项一致 |

显然，Unix 和 GNU 风格看上去更符合逻辑，因为它们的进程集和不添加选项时的进程集是一样的，
但 BSD 风格就自己加戏了，把当前用户其他终端相关的进程也包含进来了。
不同风格的选项可以一起使用，但如果两个选项都是指定显示格式，会无法执行。
另外，如果多个风格中包含了 BSD 风格，但选项中又没有指定进程集，那么默认会使用 BSD 的进程集。

## 常用功能

### 列出用户进程

```bash
ps -fu kuga
```

### 列出所有进程

```bash
ps -ef
```

`-e` 显示所有进程，`-f` 以全格式显示，这没什么好说的。

```bash
ps aux
```

奇怪的是 `aux` 的进程集，从上面的分析可以知道：

* `a`：显示与终端相关的所有进程，不仅仅是当前终端或当前用户。
* `x`：显示属于当前用户的所有进程。

显然 `ax` 加起来也只是当前用户的所有进程和不区分用户的所有终端进程，但如果再看一下官方的文档。

```bash
a ... or to list all processes when used together with the x option.
x ... or to list all processes when used together with the a option.
```

`ax` 一起用的时候代表所有进程，我们也可以验证一下进程数。

```bash
ps aux | wc -l
```

```bash
ps -ef | ec -l
```

可以看到 `aux` 和 `-ef` 的进程集数量是一样的，我很细节的，我说的是数量🤪。

### 占用内存排名

go rocks

## 特殊字段说明

### VSZ

Virtual Memory Size，虚拟内存大小，以 KB 为单位。

### RSS

Resident Set Size，常驻内存大小，以 KB 为单位。

### TTY

进程关联的终端。如果进程与某个终端关联，它会显示终端的名称；如果未关联终端，则显示 `?`。

### STAT

进程的状态码。常见的状态码包括：

* **`R`**: 运行中（Running）。
* **`S`**: 睡眠中（Sleeping），等待某个事件完成。
* **`D`**: 不可中断的睡眠状态（Uninterruptible Sleep），通常是等待 I/O。
* **`T`**: 暂停或跟踪中（Stopped or Traced）。
* **`Z`**: 僵尸进程（Zombie），进程已经终止，但未被父进程清理。
* **`I`**: 空闲内核线程（Idle Kernel Thread）。
* **`Ss`**: 主进程处于睡眠状态。
* **`R+`**: 运行中的进程，并且在前台显示。

go rocks 需要深入理解不同的进程状态

### START

进程启动的时间或日期。对于新进程，显示的是时间，对于旧进程，显示的是日期。

### TIME

进程使用 CPU 的累计时间，表示该进程总共占用了多少 CPU 时间。

### C

进程的 CPU 使用率。这个字段显示的是自进程启动以来，CPU 时间的累积使用百分比。
