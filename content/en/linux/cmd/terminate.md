---
title: "Terminate Processes"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 1500
seo:
  title: "Terminate Processes"
  description: ""
  canonical: ""
  noindex: false
---

## Kill Command

It's actually a tool for sending signals to processes, not necessarily killing them.

```bash {frame="none"}
man kill
```

```bash {frame="none"}
kill - send a signal to a process
```

### Default Signal

The default signal for the `kill` command is `SIGTERM`, corresponding to number `15`, for a graceful termination.

### Available Signals

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

### Specify Signal Type

```bash {frame="none"}
kill -s SIGKILL <PID>
```

```bash {frame="none"}
kill -9 <PID>
```

### Multiple Processes

```bash {frame="none"}
kill -15 <PID> <PID> <PID>
```

### Special Process Number

The process number `-1` represents all processes, and the following command will terminate all processes that you (the current user) can terminate.

{{< callout context="danger" title="Danger" >}}
Do not execute in the root user
{{< /callout >}}

```bash {frame="none"}
kill -9 -1
```

If I want to execute as the `kuga` user, I can first view the processes of that user as the `root` user.

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

Then, execute the command `kill -9 -1` in the kuga terminal.

```bash {frame="none"}
Connection to x.x.x.x closed by remote host.
Connection to x.x.x.x closed.
```

This will immediately disconnect, and viewing the `kuga` user processes on `root` will find that they are all gone.

## Pkill Command

It sends signals to processes based on their names.

```bash {frame="none"}
man pkill
```

```bash {frame="none"}
signal for processes based on name and other attributes
```

### Default Signal

The default signal for the `pkill` command is `SIGTERM`, corresponding to number `15`, for a graceful termination.

### Specify Signal Type

```bash {frame="none"}
pkill -SIGKILL bash
```

```bash {frame="none"}
pkill -9 bash
```

### Specify User Processes

```bash {frame="none"}
pkill -u kuga
```

```bash {frame="none"}
pkill -9 -u kuga bash
```

### Precision Process Name

```bash {frame="none"}
pkill -x sshd
```

## Pgrep

It looks up process IDs based on process names.

```bash {frame="none"}
man pgrep
```

```bash {frame="none"}
look up for processes based on name and other attributes 
```

### Ignore Case

```bash {frame="none"}
pgrep -i BASH
```

### Specify User Processes

```bash {frame="none"}
pgrep -u kuga
```

```bash {frame="none"}
44087
44088
44149
44150
```

### Process IDs and Names

Without `-l`, it will only display the process ID.

```bash {frame="none"}
pgrep -l bash
```

```bash {frame="none"}
42977 bash
44150 bash
```

### Number of Matching Processes

```bash {frame="none"}
pgrep -c bash
```

```bash {frame="none"}
2
```

### Specify Parent PID

```bash {frame="none"}
pgrep -P 1729
```

```bash {frame="none"}
42912
44084
```

### Recently Started Processes

```bash {frame="none"}
pgrep -n -l
```

```bash {frame="none"}
pgrep -n bash -l
```

### Earliest Started Processes

```bash {frame="none"}
pgrep -o -l
```

```bash {frame="none"}
1 systemd
```

### Precision Process Name

```bash {frame="none"}
pgrep -x sshd
```

## Common Signals

### SIGTERM - 15

Requests the process to terminate. This signal is "friendly" and allows the process to perform cleanup before exiting.
It is the default signal for `kill` and `pkill` commands.
Usually used for a graceful termination of processes, giving them time to handle unfinished tasks.

### SIGKILL - 9

Forces the process to terminate. This signal cannot be caught, blocked, or ignored, and the process will be immediately terminated.
Sending `SIGKILL` will directly stop the process without allowing it to perform any cleanup operations.
Used for processes that cannot be normally terminated, when `SIGTERM` is ineffective.

### SIGINT - 2

Interrupt signal, usually sent by the user through `Ctrl+C`, used to interrupt foreground running processes.
Used for manually interrupting processes, especially interactive processes.

### SIGQUIT - 3

Quit signal, usually sent by the user through `Ctrl+\`, indicating that the process should generate a core dump and exit.
Used for debugging, when you want the process to generate a core dump for analysis.

### SIGHUP - 1

Hangup signal, usually indicating that the terminal or console connection has been disconnected.
Many daemon processes will reload their configuration files when they receive the `SIGHUP` signal.
Used for reloading the configuration of daemon processes or causing them to restart.
