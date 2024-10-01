---
title: "Top"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 1400
seo:
  title: "Top"
  description: ""
  canonical: ""
  noindex: false
---

## Introduction

```bash {frame="none"}
man top
```

```bash {frame="none"}
top - display Linux processes
```

The top command defaults to sorting processes by **CPU usage rate** and dynamically displaying the results.

```bash {frame="none"}
top - 09:19:05 up 6 days, 10:02,  2 users,  load average: 0.13, 0.05, 0.01
Tasks: 126 total,   1 running, 125 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.5 us,  0.0 sy,  0.0 ni, 99.5 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   1673.0 total,    252.3 free,    299.5 used,   1121.3 buff/cache
MiB Swap:      0.0 total,      0.0 free,      0.0 used.   1197.7 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
    988 root      20   0   90428  14260  11860 S   0.7   0.8  58:31.33 AliYunDun
   1008 root      20   0  139912  36880  18280 S   0.7   2.2  99:59.21 AliYunDunMonito
  39433 root      20   0   10508   3912   3304 R   0.3   0.2   0:00.03 top
      1 root      20   0  167744  13388   8416 S   0.0   0.8   0:07.59 systemd
```

## Header Information

### System Information

```bash {frame="none"}
top - 09:19:05 up 6 days, 10:02,  2 users,  load average: 0.13, 0.05, 0.01
```

* Current system time: 09:19:05
* System running time: 6 days 10 hours 2 minutes
* Current logged in users: 2
* System average load: 1 minute, 5 minutes, 15 minutes

### Process Summary

```bash {frame="none"}
Tasks: 126 total,   1 running, 125 sleeping,   0 stopped,   0 zombie
```

* Total number of processes: 126
* Number of running processes: 1
* Number of sleeping processes: 125
* Number of stopped processes: 0
* Number of zombie processes: 0

### CPU Usage

```bash {frame="none"}
%Cpu(s):  0.5 us,  0.0 sy,  0.0 ni, 99.5 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
```

* CPU usage of user processes: 0.5, user
* CPU usage of system processes: 0.0, system
* CPU usage of processes with `nice value`: 0.0
* Idle CPU usage: 99.5, idle
* CPU usage of processes waiting for IO: 0.0, wait
* CPU usage of handling hardware interrupts: 0.0, hardware interrupts
* CPU usage of handling software interrupts: 0.0, software interrupts
* CPU usage of CPU stolen by virtualization programs: 0.0, stolen

### Memory Usage

```bash {frame="none"}
MiB Mem :   1673.0 total,    252.3 free,    299.5 used,   1121.3 buff/cache
```

* Unit: MiB, Million Byte
* Total: 1673.0 MB
* Free: 252.3 MB
* Used: 299.5 MB
* Cache: 1121.3 MB

### Swap Usage

```bash {frame="none"}
MiB Swap:      0.0 total,      0.0 free,      0.0 used.   1197.7 avail Mem
```

* Total: 0.0
* Free: 0.0
* Used: 0.0
* Available: 1197.7 MB (buff/cache)

A total of 0 may be due to the lack of swap space. You can use the following command to check.

```bash {frame="none"}
swapon --show
```

If there is no output, it means that no swap space is configured.

## Field Management Mode

Press `f` or `Shift + f` to enter the field management mode.

```bash {frame="none"}
Fields Management for window 1:Def, whose current sort field is %CPU
   Navigate with Up/Dn, Right selects for move then <Enter> or Left commits,
   'd' or <Space> toggles display, 's' sets sort.  Use 'q' or <Esc> to end!
```

### window 1:Def

The window number is 1, and the default (Default) field configuration is used.

### Fields Display Order

Select the field that needs to be moved by pressing the right arrow key, move up and down, and then press Enter or the left arrow key to commit.

### Fields Display Switch

After selecting the field, press `d` or the space key.

### Current Sorting Field

After selecting the field, press the `s` key, which only takes effect in the current session.

### Other Fields

go rocks

## Multi-Window Mode

Press `Shift + A`, and 4 `top` windows will appear. The name of the window will be displayed in the upper left corner. Each window displays different fields and sorts in different ways, and can be modified through the field management mode.

### Common Operations

* Return to single window mode: `Shift + A`
* Select the next window: `a`  key.
* Select the previous window: `w`  key.
* Select a specific window: `g`  key, select `1-4`  .
* Modify the window name: `Shift + G`, enter 1-3 characters.
* Enter the field management mode: `Shift + F`.

### Common Windows

* **1:Def**：Number 1, sorted in reverse order by `%CPU`.
* **2:Job**：Number 2, sorted in reverse order by `PID`.
* **3:Mem**：Number 3, sorted in reverse order by `%Mem`.
* **4:Usr**：Number 4, sorted in reverse order by `USER`.

## Personalized Window Color

Press `Shift + Z` to enter the color configuration mode. The following is written clearly.

```bash {frame="none"}
Help for color mapping - "Current Window" =  1:Def

   color - 04:25:44 up 8 days, 50 min,  7 users,  load average:
   Tasks:  64 total,   2 running,  62 sleeping,   0 stopped,
   %Cpu(s):  76.5 user,  11.2 system,   0.0 nice,  12.3 idle
    Nasty Message!   -or-  Input Prompt
     PID TTY     PR  NI %CPU    TIME+   VIRT SWAP S COMMAND
   17284 pts/2    8   0  0.0   0:00.75  1380    0 S /bin/bash
    8601 pts/1    7 -10  0.4   0:00.03   916    0 R color -b -z
   11005 ?        9   0  0.0   0:02.50  2852 1008 S amor -sessi
   available toggles: B =disable bold globally (Off),
       z =color/mono (On), b =tasks "bold"/reverse (On)

1) Select a target as an upper case letter, current target is  T :
   S = Summary Data,  M = Messages/Prompts,
   H = Column Heads,  T = Task Information
2) Select a color as a number or use the up/down arrow keys
   to raise/lower the 256 colors value, current color is  1 :
   0 = black,  1 = red,      2 = green,  3 = yellow,
   4 = blue,   5 = magenta,  6 = cyan,   7 = white

3) Then use these keys when finished:
   'q' or <Esc> to abort changes to window '1:Def'
   'a' or 'w' to commit & change another, <Enter> to commit and end
```

1. You can modify the configuration of different windows (1:Def) by pressing `a` or `w` to select.
2. Available switches: `Shift + B`, `z`, `b`.
3. You can modify the colors of 4 parts, `Shift + S/M/H/T`.
4. The modified color can be entered as a number or selected using the up and down keys.
5. Press `q`  or `Esc` to cancel the configuration, and `Enter` to submit the configuration.

After exiting the color mode, if you want to **persist the configuration**, you need to press `Shift + W`, and the file save path is:

```bash {frame="none"}
~/.config/procps/toprc
```

Note that if you save in multi-window mode, it will also be in multi-window mode when you open it next time.

## Common Shortcuts

Some shortcuts will also modify the properties of the current top command session window.

* **`h`**：Display the help menu, listing all available commands.
* **`0`**：Toggle display/hide of fields with a value of 0.
* **`1`**：Toggle display of CPU core usage.
* **`k`**：Terminate a process, enter the PID.
* **`r`**：Adjust the priority of the process (renice).
* **`z`**：Toggle color display mode.
* **`x`**：Highlight the column currently sorted.
* **`c`**：Toggle display/hide of the command line.
* **`n`**：Change the number of processes displayed, enter the number of processes to display.
* **`Shift + W`**：Save the current configuration.
* **`Shift + Z`**：Enter the color mode.
* **`Shift + P`**：Sort by CPU usage rate.
* **`Shift + M`**：Sort by memory usage rate.
* **`Shift + N`**：Sort by PID.
* **`Shift + T`**：Sort by process running time.

## Special Fields

### PR

Priority.

### NI

Nice Value.

### VIRT

Virtual Image (KiB).

### RES

Resident Size (KiB).

### SHR

Shared memory size.

### S

Process status, refer to PS command.

### TIME+

CPU Time, hundredths, the total CPU time occupied by the process after startup.
