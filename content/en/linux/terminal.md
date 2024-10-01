---
title: "Chapter 2: Terminal"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 300
seo:
  title: "Terminal"
  description: ""
  canonical: ""
  noindex: false
---

## Early Terminals

![ibm-2260](/images/misc/ibm-2260.png)

Early terminals were standalone hardware devices used to connect to main computers or servers. They typically included:

* **Input Device**: such as a keyboard, used for inputting commands and data.
* **Output Device**: such as a display or printer, used for displaying calculation results and system feedback.

Examples: early Teletype (tty) terminals, DEC VT100 terminals.

## Modern Terminals

![iterm2](/images/misc/iterm2-cover.png)

Modern terminals exist more in software form, i.e., terminal emulators,
running as applications in modern operating systems (such as Linux, macOS, Windows), simulating the functions of early hardware terminals.

## Terminal Emulators

| Terminal | Description |
| --- | --- |
| **iTerm2** | Advanced terminal emulator on macOS systems, offering rich features like split screens, tabs, and search. |
| **GNOME Terminal** | Default terminal emulator commonly found on Linux systems, powerful and easy to use. |
| **PuTTY** | Widely used SSH client on Windows systems, suitable for remote connections and management. |
| **Windows Terminal** | Modern terminal emulator on Windows systems, supporting multiple command-line environments like PowerShell, CMD, WSL. |

## Teletype

![teletype-model-33](/images/misc/teletype-model-33.png)

Although Teletype devices are no longer in use, their concept and functionality are still preserved in Linux.

### /dev/tty

You can see its file type is `c` (character device), representing the terminal device connected to the current process.

```bash {frame="none"}
ls -l /dev/tty
```

```bash {frame="none"}
crw-rw-rw- 1 root tty 5, 0 Aug  7 22:33 /dev/tty
```

Its permission is `666`, major device number is `5`, minor device number is `0`, which is what we commonly see as standard input/output.

```bash {frame="none"}
echo "Hello, World" > /dev/tty
```

```bash {frame="none"}
read -p "Enter your name: " name < /dev/tty
echo "Hello, $name"
```

### /dev/pts

PTS stands for Pseudo-Terminal, `/dev/pts` is a directory for storing pseudo-terminal device files.

```bash {frame="none"}
ls -l /dev/pts/
```

```bash {frame="none"}
crw------- 1 root tty  136, 0 Aug  8 09:52 0
c--------- 1 root root   5, 2 Aug  7 21:30 ptmx
```

Listing the files in the `/dev/pts` directory, you will generally see two types of files.

* ptmx: Master Device, used for creating and managing pseudo-terminal pairs.
* 0/1/2: Slave Device, each corresponding to a number for an `ssh` session.

Entering the `tty` command in the command line can show the pseudo-terminal device file currently connected.

```bash {frame="none"}
tty
```

```bash {frame="none"}
/dev/pts/0
```

***

```bash {frame="none"}
man tty
```

```bash {frame="none"}
tty - print the file name of the terminal connected to standard input
```

### Get Logged-in User

The most common method is the `w` command.

```bash {frame="none"}
w
```

```bash {frame="none"}
 11:18:19 up 15 days, 20:08,  2 users,  load average: 0.00, 0.01, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
root     pts/0    120.231.138.130  10:59    3.00s  0.02s  0.00s w
root     pts/1    120.231.138.130  11:11    6:41   0.01s  0.01s -bash
```

You can also use the `who` command.

```bash {frame="none"}
who
```

```bash {frame="none"}
root     pts/0        2024-08-04 10:59 (120.231.138.130)
root     pts/1        2024-08-04 11:11 (120.231.138.130)
```

Of course, you can directly use `ls` as well.

```bash {frame="none"}
ls -l /dev/pts/
```

```bash {frame="none"}
crw------- 1 root tty  136, 0 Aug  8  2024 0
crw------- 1 root tty  136, 1 Aug  8 09:53 1
c--------- 1 root root   5, 2 Aug  7 21:30 ptmx
```

### Send Msg to PTS

```bash {frame="none"}
echo "hello, world" > /dev/pts/1
```

### Kill a PTS

```bash {frame="none"}
ps -t /dev/pts/1
```

```bash {frame="none"}
kill -9 PID
```
