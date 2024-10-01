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

系統嘅第一個進程__AB__進程號為 1。

```bash {frame="none"}
ps -p 1
```

```bash {frame="none"}
PID TTY          TIME CMD
  1 ?        00:00:04 systemd
```

但當我哋想顯示詳細信息嘅時候__AB__結果會有啲唔同。

```bash {frame="none"}
ps -p 1 -f
```

```bash {frame="none"}
UID  PID PPID C STIME TTY TIME     CMD
root   1    0 0 Aug07 ?   00:00:04 /sbin/init noibrs
```

其實呢兩個進程係一樣嘅__AB__因為 `init` 指向嘅係 `systemd`。

```bash {frame="none"}
file /sbin/init
```

```bash {frame="none"}
/sbin/init: symbolic link to /lib/systemd/systemd
```

`init` 係 Unix 最早嘅初始化進程__AB__由於 `systemd` 取代咗 `init`__AB__
為咗兼容性__AB__`/sbin/init` 通常係一個指向 `systemd` 嘅軟鏈接。
名稱後面加 `d` 係 Unix 守護進程嘅命名規範__AB__[System D](https://en.wikipedia.org/wiki/System_D) 係一個術語__AB__
表示快速思考同解決問題嘅能力。`systemd` 誕生於 2010 年__AB__之前用嘅係 SysVinit。

## SysVinit

Unix System V 呢種初始化方法依家已經唔多用__AB__但喺一啲舊嘅發行版中仲可以見到。

### runlevel

runlevel 亦係呢個 SysVinit 嘅產物。

```bash {frame="none"}
runlevel
```

```bash {frame="none"}
N 5
```

5 對應 `graphical.target`__AB__N 表示上一次嘅 runlevel 為 No。

```bash {frame="none"}
who -r
```

```bash {frame="none"}
run-level 5  2024-08-07 21:30
```

阿里雲嘅 Ubuntu 默認目標為 `graphical.target`__AB__
呢個係為咗方便用戶使用圖形界面（VNC）嚟管理操作系統__AB__
唔需要嘅話可以把目標換成 `multi-user.target`。

```bash {frame="none"}
systemctl set-default multi-user.target
```

### /etc/rcX.d

rc 係 run commands 嘅縮寫__AB__`.d` 係目錄嘅意思__AB__目的是為咗避免命名衝突。
呢個目錄包含咗特定運行級下啟動嘅進程__AB__例如運行級 5 對應 `/etc/rc5.d`。

```bash {frame="none"}
ls -l /etc/rc5.d
```

```bash {frame="none"}
lrwxrwxrwx 1 root root 13 Jul 10 11:08 K01fio -> ../init.d/fio
lrwxrwxrwx 1 root root 20 Apr 21  2022 K01irqbalance -> ../init.d/irqbalance
lrwxrwxrwx 1 root root 17 Jul 10 11:05 K01sysstat -> ../init.d/sysstat
```

雖然依家使用嘅係 `systemd`__AB__但為咗兼容性__AB__呢啲目錄同腳本仍然保留住。

## Unit Files

單元文件係 systemd 嘅配置文件__AB__用嚟定義同管理系統服務、設備、掛載點、套接字同其他系統資源。
每個單元文件都描述咗 systemd 點樣啟動、停止同監視相關資源。

### 基本分類

| 類型 | 描述 | 擴展名 |
| --- | --- | --- |
| 服務單元 | 系統服務 | `.service` |
| 掛載單元 | 文件系統掛載點 | `.mount` |
| 設備單元 | 定義設備 | `.device` |
| 套接字單元 | 套接字服務 | `.socket` |
| 計時器單元 | 定時任務 | `.timer` |
| 目標單元 | 系統目標狀態 | `.target` |

### 所在目錄

* `/etc/systemd/system/`：系統管理員定義嘅單元文件。
* `/usr/lib/systemd/system/`：發行版提供嘅單元文件。
* `/run/systemd/system/`：運行時生成嘅單元文件。

### Nginx 狀態

可以透過 Nginx 嘅狀態查看服務嘅單元文件路徑。

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

### Nginx 單元文件

```bash {frame="none"}
/etc/systemd/system/multi-user.target.wants/nginx.service
/lib/systemd/system/nginx.service
/usr/lib/systemd/system/nginx.service
```

Nginx 服務嘅單元文件有好幾個路徑__AB__第一個係軟鏈接。

```bash {frame="none"}
file /etc/systemd/system/multi-user.target.wants/nginx.service
```

```bash {frame="none"}
...: symbolic link to /lib/systemd/system/nginx.service
```

第二第三個係硬鏈接__AB__佢哋嘅 inode 係一樣嘅__AB__並且 `/lib` 係指向 `/usr/lib` 嘅軟鏈接。

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

下面係單元文件嘅內容。

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
# 定義咗服務嘅描述同依賴關系
[Unit]
Description=A high performance web server and a reverse proxy server
Documentation=man:nginx(8)
After=network.target nss-lookup.target

[Service]
# forking 表示服務喺啟動時會創建子進程__AB__父進程會退出
Type=forking
# 存儲主進程嘅 ID
PIDFile=/run/nginx.pid
# 啟動準備__AB__測試 nginx 配置
ExecStartPre=/usr/sbin/nginx -t -q -g 'daemon on; master_process on;'
# 啟動命令__AB__-g 設置全局指定__AB__會覆蓋Nginx配置文件嘅選項
ExecStart=/usr/sbin/nginx -g 'daemon on; master_process on;'
# 重載配置命令
ExecReload=/usr/sbin/nginx -g 'daemon on; master_process on;' -s reload
# 終止進程嘅命令
ExecStop=-/sbin/start-stop-daemon --quiet --stop --retry QUIT/5 --pidfile /run/nginx.pid
# 終止服務嘅等待時間__AB__超過 5 秒則強制終止
TimeoutStopSec=5
# 終止進程嘅方式__AB__SIGTERM__AB__超時__AB__SIGKILL__AB__優雅->強制
KillMode=mixed

# 如何安裝同啟用服務
[Install]
WantedBy=multi-user.target
```

### 常用命令

* `systemctl start [unit]`：啟動單元。
* `systemctl stop [unit]`：停止單元。
* `systemctl enable [unit]`：啟用單元__AB__使其喺引導時自動啟動。
* `systemctl disable [unit]`：禁用單元。
* `systemctl status [unit]`：查看單元狀態。
* `systemctl daemon-reload`：喺修改或添加單元文件後重新加載 systemd 配置。

## Targets

從上面可以看到__AB__target 係一種單元文件嘅類型__AB__同一般單元文件不同__AB__佢代表嘅係系統當前嘅運行狀態__AB__
target 定義咗該狀態下需要啟動哪些進程同服務__AB__所以 target 可以包含多個單元文件。
用下面嘅命令可以查看當前系統嘅 target。

```bash {frame="none"}
systemctl get-default
```

```bash {frame="none"}
multi-user.target # 多用戶模式__AB__唔包含圖形界面
```

### multi-user.target

target 文件通常存儲喺 `/usr/lib/systemd/system/` 或 `/etc/systemd/system/` 目錄中。
每個 target 文件都包含關於該 target 嘅依賴關系同啟動順序嘅信息。
我哋可以睇下 `multi-user.target` 呢個文件內容。

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

下面兩個目錄包含咗 `multi-user.target` 狀態所需要嘅內容。

```bash {frame="none"}
/etc/systemd/system/multi-user.target.wants/
/lib/systemd/system/multi-user.target.wants/
```

* `/etc` 係用戶定義配置__AB__`/lib` 係系統默認配置。
* 用戶定義配置：優先級更高__AB__同一服務 systemd 會優先執行。
* 系統默認配置：系統或軟件包更新時__AB__會隨之更新。

### 常用命令

設置默認 target：

```bash {frame="none"}
systemctl set-default multi-user.target
```

切換到指定 target：

```bash {frame="none"}
systemctl isolate graphical.target
```

查看可用 targets：

```bash {frame="none"}
systemctl list-units --type=target
```
