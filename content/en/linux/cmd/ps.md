---
title: "PS"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 1300
seo:
  title: "PS"
  description: ""
  canonical: ""
  noindex: false
---

## Login Information

```bash {frame="none"}
w
```

```bash {frame="none"}
 13:46:05 up 3 days, 16:15,  2 users,  load average: 0.00, 0.00, 0.00
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
root     pts/0    120.231.138.139  13:43    1.00s  0.00s  0.00s w
kuga     pts/1    120.231.138.139  13:44   53.00s  0.02s  0.02s -bash
```

The commands executed below are all based on the above environment configuration.

## Process Status

PS stands for Process Status.

```bash {frame="none"}
man ps
```

```bash {frame="none"}
ps - report a snapshot of the current processes.
```

| Style | Source | Prefix |
| --- | --- | --- |
| Unix | AT&T System of Bell Labs | `-` |
| BSD  | Berkeley Software Distribution | None |
| GNU  | Improved version by GNU Project | `--` |

Due to historical reasons, the `ps` command is mixed with various styles, and sometimes it looks like 💩.

## Without Any Options

```bash {frame="none"}
ps
```

```bash {frame="none"}
    PID TTY          TIME CMD
  20274 pts/0    00:00:00 bash
  20714 pts/0    00:00:00 sleep
  20715 pts/0    00:00:00 ps
```

When no options are added, it will display all processes related to the **current terminal**.
In simple terms, if the TTY of the current terminal is `pts/0`, it will display all processes with TTY as `pts/0`.
This usually includes Shell processes, any processes started from this terminal (whether in the foreground or background), and the `ps` command itself.
The sleep process above is started by me using the background process method.

```bash {frame="none"}
nohup sleep 60 &
```

## Basic Options

### Option: a

Display all processes related to the terminal, not just the current terminal or current user.

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

The above result is executed from the `pts/0` terminal. You can see that the processes of the terminals `ttyS0`, `tty1`, `pts/1` associated with the root user are all displayed,
and there is no distinction between users. The terminals `pts/0`, `ttyS0`, `tty1` are all associated with the root user, and the terminal `pts/1` is associated with the kuga user.

### Option: u

Display process information in a user-friendly format.

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

If this option is only related to the display fields, then its process set should be the same as the `ps` command without any options.
However, the above result shows that, in addition to the processes of the self terminal `pts/0`, it also displays the processes of other terminals,
but it does not display the terminal process of `pts/1` (user is kuga).

It can be concluded simply that the process set of the **`u` option is: all processes related to the current user terminal**.
The above is all the terminal processes related to the root user. If you execute `ps u` in the kuga user's terminal,
you can get the following result, which is completely in line with expectations.

```bash {frame="none"}
ps u
```

```bash {frame="none"}
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
kuga       23393  0.0  0.3   8660  5452 pts/1    Ss   13:44   0:00 -bash
kuga       23496  0.0  0.0  10072  1608 pts/1    R+   14:22   0:00 ps u
```

In addition, the definition of this process set is not unique to the `u` option, it is related to the BSD style.

### Option: x

Display all processes belonging to the current user.

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

The above result is executed in the kuga user's terminal, so the number of processes will not be too many.

### Option: -e

Obviously all processes.

```bash {frame="none"}
man ps | grep "\-e  "
```

```bash {frame="none"}
-e     Select all processes.  Identical to -A.
```

### Option: -f

Display process information in full format, can be used in combination with other UNIX-style options.

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

### Option: -o

Customize the output fields, cannot be used in combination with the `-f` and `u` options.

```bash {frame="none"}
ps -o uid,user,pid,%cpu,%mem,cmd
```

```bash {frame="none"}
UID USER   PID %CPU %MEM CMD
  0 root 23300  0.0  0.3 -bash
  0 root 24311  0.0  0.0 ps -o uid,user,pid,%cpu,%mem,cmd
```

Note that the uid here is different from the one displayed using the `-f` option, here it is a numeric ID, but the `-f` option will display the username.

### Option: -p

Specify the process PID.

```bash {frame="none"}
ps up 1
```

```bash {frame="none"}
USER  PID %CPU %MEM    VSZ   RSS TTY  STAT START   TIME COMMAND
root    1  0.0  0.7 167696 13328 ?    Ss   Aug07   0:08 /lib/systemd/systemd --system --deserialize 36 noib
```

### Option: --forest

Display the tree structure of processes and child processes in ASCII.

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

## Process Sets

Different styles of options have different process sets, but as long as you observe carefully, you can still find some rules.

**`ps`**: Without adding any options

```bash {frame="none"}
ps
```

```bash {frame="none"}
    PID TTY          TIME CMD
   2090 pts/0    00:00:00 bash
   2261 pts/0    00:00:00 ps
```

**`ps -l`**: Unix style, `-l` means to display in long format.

```bash {frame="none"}
ps -l
```

```bash {frame="none"}
F S   UID     PID    PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
4 S     0    2090    2034  0  80   0 -  2198 do_wai pts/0    00:00:00 bash
4 R     0    2262    2090  0  80   0 -  2518 -      pts/0    00:00:00 ps
```

**`ps l`**: BSD style, `l` means to display in BSD long format.

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

**`ps --forest`**: GNU style, `--forest` means to display in process tree.

```bash {frame="none"}
ps --forest
```

```bash {frame="none"}
    PID TTY          TIME CMD
   2090 pts/0    00:00:00 bash
   2316 pts/0    00:00:00  \_ ps
```

In the above example, the options used are not related to the process set, and you can summarize the following rules:

| Style | Process Set |
| --- | --- |
| None | Display all processes related to the current terminal |
| Unix | Consistent with not adding options |
| BSD | Display all processes related to the current user terminal |
| GNU | Consistent with not adding options |

Obviously, Unix and GNU styles seem more logical, because their process sets are the same as when no options are added to the `ps` command,
but the BSD style is playing its own game, including all processes related to the other terminals of the current user.
Different styles of options can be used together, but if two options both specify the display format, the execution will fail.
In addition, if multiple styles contain BSD style, but the process set is not specified in the options, then the BSD process set will be used by default.

## Common Functions

### List User Processes

```bash {frame="none"}
ps -fu kuga
```

### List All Processes

```bash {frame="none"}
ps -ef
```

The `-e` option displays all processes, and the `-f` option displays in full format, there is nothing special to say.

```bash {frame="none"}
ps aux
```

Strangely, the process set of `aux` is different from the above analysis. From the above analysis, we know:

* `a`: Display all processes related to the terminal, not just the current terminal or current user.
* `x`: Display all processes belonging to the current user.

Obviously, the sum of `ax` is only all processes of the current user and all processes of the other terminals of the current user, but if you look at the official documentation.

```bash {frame="none"}
a ... or to list all processes when used together with the x option.
x ... or to list all processes when used together with the a option.
```

When `ax` is used together, it represents all processes, and we can also verify the number of processes.

```bash {frame="none"}
ps aux | wc -l
```

```bash {frame="none"}
ps -ef | ec -l
```

You can see that the number of process sets of `aux` and `-ef` is the same, I am very detailed, I am talking about the number 🤪.

### Rank by Memory Usage

go rocks

## Special Fields

### VSZ

Virtual Memory Size, in KB.

### RSS

Resident Set Size, in KB.

### TTY

The terminal associated with the process. If the process is associated with a certain terminal, it will display the name of the terminal; if it is not associated with a terminal, it will display `?`.

### STAT

The process status code. Common status codes include:

* **`R`**: Running.
* **`S`**: Sleeping, waiting for an event to complete.
* **`D`**: Uninterruptible sleep, usually waiting for I/O.
* **`T`**: Stopped or traced.
* **`Z`**: Zombie process, the process has terminated but has not been cleaned up by the parent process.
* **`I`**: Idle kernel thread.
* **`Ss`**: The main process is in sleep state.
* **`R+`**: Running process, and displayed in the foreground.

go rocks, need to understand different process states in depth

### START

The time or date the process started. For a new process, it displays the time, and for an old process, it displays the date.

### TIME

The cumulative CPU time the process has used, indicating how much CPU time the process has occupied in total.

### C

The CPU usage of the process. This field displays the cumulative usage percentage of CPU time since the process started.
