---
title: "Systemd"
description: ""
summary: ""
date: 2024-08-30T20:00:00+08:00
lastmod: 2024-08-30T20:00:00+08:00
weight: 2500
seo:
  title: "Systemd"
  description: ""
  canonical: ""
  noindex: false
---

## Systemd

The first process of the system, with a process ID of 1.

```bash {frame="none"}
ps -p 1
```

```bash {frame="none"}
PID TTY          TIME CMD
  1 ?        00:00:04 systemd
```

However, when we want to display detailed information, the result will be different.

```bash {frame="none"}
ps -p 1 -f
```

```bash {frame="none"}
UID  PID PPID C STIME TTY TIME     CMD
root   1    0 0 Aug07 ?   00:00:04 /sbin/init noibrs
```

In fact, these two processes are the same, because `init` points to `systemd`.

```bash {frame="none"}
file /sbin/init
```

```bash {frame="none"}
/sbin/init: symbolic link to /lib/systemd/systemd
```

`init` is the earliest initialization process in Unix. Since `systemd` has replaced `init`,
for compatibility, `/sbin/init` is usually a symbolic link pointing to `systemd`.
The naming convention of adding `d` after the name is the naming convention of Unix daemon processes, and [System D](https://en.wikipedia.org/wiki/System_D) is a term,
which means the ability to think quickly and solve problems. `systemd` was born in 2010, and before that, SysVinit was used.

## SysVinit

This initialization method of Unix System V is not used much now, but can still be seen in some old distributions.

### runlevel

runlevel is also a product of this SysVinit.

```bash {frame="none"}
runlevel
```

```bash {frame="none"}
N 5
```

5 corresponds to `graphical.target`, and N means the last runlevel was No.

```bash {frame="none"}
who -r
```

```bash {frame="none"}
run-level 5  2024-08-07 21:30
```

The default target for Ubuntu on Alibaba Cloud is `graphical.target`,‌
which is for users to manage the operating system using a graphical interface (VNC),
if not needed, the target can be changed to `multi-user.target`.

```bash {frame="none"}
systemctl set-default multi-user.target
```

### /etc/rcX.d

rc stands for run commands, and `.d` stands for directory, the purpose is to avoid naming conflicts.
This directory contains processes started under a specific runlevel, for example, runlevel 5 corresponds to `/etc/rc5.d`.

```bash {frame="none"}
ls -l /etc/rc5.d
```

```bash {frame="none"}
lrwxrwxrwx 1 root root 13 Jul 10 11:08 K01fio -> ../init.d/fio
lrwxrwxrwx 1 root root 20 Apr 21  2022 K01irqbalance -> ../init.d/irqbalance
lrwxrwxrwx 1 root root 17 Jul 10 11:05 K01sysstat -> ../init.d/sysstat
```

Although `systemd` is now used, for compatibility, these directories and scripts are still retained.

## Unit Files

Unit files are the configuration files of systemd, used to define and manage system services, devices, mount points, sockets, and other system resources.
Each unit file describes how systemd starts, stops, and monitors related resources.

### Basic Categories

| Type | Description | Extension |
| --- | --- | --- |
| Service Unit | System service | `.service` |
| Mount Unit | File system mount point | `.mount` |
| Device Unit | Define device | `.device` |
| Socket Unit | Socket service | `.socket` |
| Timer Unit | Scheduled task | `.timer` |
| Target Unit | System target state | `.target` |

### Location Directories

* `/etc/systemd/system/`: Unit files defined by the system administrator.
* `/usr/lib/systemd/system/`: Unit files provided by the distribution.
* `/run/systemd/system/`: Unit files generated at runtime.

### Nginx Status

You can view the unit file path of the service through the status of Nginx.

```bash {frame="none"}
systemctl status nginx
```

```bash {frame="none"}
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
     Active: active (running) since Thu 2024-08-08 12:43:17 CST; 2h 1min ago
       Docs: man:nginx(8)
   Main PID: 11037 (nginx)
      Tasks: 3 (limit: 1917)
     Memory: 8.6M
        CPU: 29ms
     CGroup: /system.slice/nginx.service
             ├─11037 "nginx: master process /usr/sbin/nginx -g daemon on; master_process on;"
             ├─11039 "nginx: worker process" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" ""
             └─11040 "nginx: worker process" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" "" ""

Aug 08 12:43:17 guitarocks systemd[1]: Starting A high performance web server and a reverse proxy server...
Aug 08 12:43:17 guitarocks systemd[1]: Started A high performance web server and a reverse proxy server.
```

### Nginx Unit Files

```bash {frame="none"}
/etc/systemd/system/multi-user.target.wants/nginx.service
/lib/systemd/system/nginx.service
/usr/lib/systemd/system/nginx.service
```

There are several paths for the unit file of the Nginx service, the first one is a symbolic link.

```bash {frame="none"}
file /etc/systemd/system/multi-user.target.wants/nginx.service
```

```bash {frame="none"}
...: symbolic link to /lib/systemd/system/nginx.service
```

The second and third are hard links, their inodes are the same, and `/lib` is a symbolic link to `/usr/lib`.

```bash {frame="none"}
ls -i /usr/lib/systemd/system/nginx.service
```

```bash {frame="none"}
265498 /usr/lib/systemd/system/nginx.service
```

***

```bash {frame="none"}
ls -i /lib/systemd/system/nginx.service
```

```bash {frame="none"}
265498 /lib/systemd/system/nginx.service
```

***

```bash {frame="none"}
file /lib
```

```bash {frame="none"}
/lib: symbolic link to usr/lib
```

Below is the content of the unit file.

```bash {frame="none"}
cat /lib/systemd/system/nginx.service
```

```bash {frame="none"}
# Stop dance for nginx
# =======================
#
# ExecStop sends SIGSTOP (graceful stop) to the nginx process.
# If, after 5s (--retry QUIT/5) nginx is still running, systemd takes control
# and sends SIGTERM (fast shutdown) to the main process.
# After another 5s (TimeoutStopSec=5), and if nginx is alive, systemd sends
# SIGKILL to all the remaining processes in the process group (KillMode=mixed).
#
# nginx signals reference doc:
# http://nginx.org/en/docs/control.html
#
# Defines the description and dependency of the service
[Unit]
Description=A high performance web server and a reverse proxy server
Documentation=man:nginx(8)
After=network.target nss-lookup.target

[Service]
# forking means that the service will create a child process when starting, and the parent process will exit
Type=forking
# Store the ID of the main process
PIDFile=/run/nginx.pid
# Start preparation, test nginx configuration
ExecStartPre=/usr/sbin/nginx -t -q -g 'daemon on; master_process on;'
# Start command, -g sets the global specification, which will override the options in the Nginx configuration file
ExecStart=/usr/sbin/nginx -g 'daemon on; master_process on;'
# Reload configuration command
ExecReload=/usr/sbin/nginx -g 'daemon on; master_process on;' -s reload
# Terminate process command
ExecStop=-/sbin/start-stop-daemon --quiet --stop --retry QUIT/5 --pidfile /run/nginx.pid
# Terminate service waiting time, force termination if it exceeds 5 seconds
TimeoutStopSec=5
# Terminate process mode, SIGTERM, timeout, SIGKILL, graceful->force
KillMode=mixed

# How to install and enable the service
[Install]
WantedBy=multi-user.target
```

### Common Commands

* `systemctl start [unit]`: Start the unit.
* `systemctl stop [unit]`: Stop the unit.
* `systemctl enable [unit]`: Enable the unit, so that it will start automatically at boot.
* `systemctl disable [unit]`: Disable the unit.
* `systemctl status [unit]`: View the status of the unit.
* `systemctl daemon-reload`: Reload the systemd configuration after modifying or adding unit files.

## Targets

From the above, we can see that a target is a type of unit file. Unlike general unit files, it represents the current running state of the system,
the target defines which processes and services need to be started under that state, so a target can contain multiple unit files.
You can view the current target of the system with the following command.

```bash {frame="none"}
systemctl get-default
```

```bash {frame="none"}
multi-user.target # Multi-user mode, does not include the graphical interface
```

### multi-user.target

Target files are usually stored in the `/usr/lib/systemd/system/` or `/etc/systemd/system/` directory.
Each target file contains information about the dependencies and startup order of that target.
Let's take a look at the content of the `multi-user.target` file.

```bash {frame="none"}
cat /lib/systemd/system/multi-user.target
```

```bash {frame="none"}
#  SPDX-License-Identifier: LGPL-2.1-or-later
#
#  This file is part of systemd.
#
#  systemd is free software; you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as published by
#  the Free Software Foundation; either version 2.1 of the License, or
#  (at your option) any later version.

[Unit]
Description=Multi-User System
Documentation=man:systemd.special(7)
Requires=basic.target
Conflicts=rescue.service rescue.target
After=basic.target rescue.service rescue.target
AllowIsolate=yes
```

The following two directories contain the content needed for the `multi-user.target` state.

```bash {frame="none"}
/etc/systemd/system/multi-user.target.wants/
/lib/systemd/system/multi-user.target.wants/
```

* `/etc` is user-defined configuration, `/lib` is system default configuration.
* User-defined configuration: higher priority, systemd will execute the same service first.
* System default configuration: when the system or software package is updated, it will be updated accordingly.

### Common Commands

Set the default target:

```bash {frame="none"}
systemctl set-default multi-user.target
```

Switch to a specific target:

```bash {frame="none"}
systemctl isolate graphical.target
```

View available targets:

```bash {frame="none"}
systemctl list-units --type=target
```
