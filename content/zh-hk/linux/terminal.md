---
title: "第二章：終端"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 300
seo:
  title: "終端"
  description: ""
  canonical: ""
  noindex: false
---

## 早期終端

![ibm-2260](/images/misc/ibm-2260.png)

早期嘅終端係一種獨立嘅硬件設備，用嚟連接到主計算機或者伺服器。佢哋通常包括：

* **輸入設備**：例如鍵盤，用嚟輸入命令同數據。
* **輸出設備**：例如顯示器或者打印機，用嚟顯示計算結果同系統反饋。

例如：早期嘅 Teletype (tty) 終端、DEC VT100 終端。

## 現代終端

![iterm2](/images/misc/iterm2-cover.png)

現代終端更多係以軟件形式存在，即係終端模擬器（Terminal Emulator），
佢哋喺現代操作系統中（例如 Linux、macOS、Windows）作為應用程序運行，模擬早期硬件終端嘅功能。

## 常見嘅終端模擬器

| 終端模擬器 | 描述 |
| --- | --- |
| **iTerm2** | macOS 系統上嘅高級終端模擬器，提供咗豐富嘅功能，例如分屏、標籤頁、搜索等。 |
| **GNOME Terminal** | 常見於 Linux 系統嘅默認終端模擬器，功能強大且易於使用。 |
| **PuTTY** | Windows 系統上廣泛使用嘅 SSH 客戶端，適用於遠程連接同管理。 |
| **Windows Terminal** | Windows 系統上嘅現代終端模擬器，支持多個命令行環境，例如 PowerShell、CMD、WSL。 |

## Teletype

![teletype-model-33](/images/misc/teletype-model-33.png)

雖然 Teletype 設備而家已經唔再使用，但佢嘅概念同功能依然保留喺 Linux 中。

### /dev/tty

可以睇到佢嘅文件類型係 `c`（字符設備），代表當前進程所連接嘅終端設備。

```bash {frame="none"}
ls -l /dev/tty
```

```bash {frame="none"}
crw-rw-rw- 1 root tty 5, 0 Aug  7 22:33 /dev/tty
```

佢嘅權限係 `666`，主設備號係 `5`，次設備號係 `0`，呢個就係我哋常常睇到嘅標準輸入/輸出。

```bash {frame="none"}
echo "Hello, World" > /dev/tty
```

```bash {frame="none"}
read -p "Enter your name: " name < /dev/tty
echo "Hello, $name"
```

### /dev/pts

PTS 係偽終端嘅簡寫（Pseudo-Terminal），`/dev/pts` 係一個目錄，用嚟存放偽終端設備文件。

```bash {frame="none"}
ls -l /dev/pts/
```

```bash {frame="none"}
crw------- 1 root tty  136, 0 Aug  8 09:52 0
c--------- 1 root root   5, 2 Aug  7 21:30 ptmx
```

列出 `/dev/pts` 目錄嘅文件，一般情況下會睇到兩類文件。

* ptmx：Master Device，主設備，用嚟創建同管理偽終端對。
* 0/1/2：Slave Device，從設備，每一個 `ssh` 會話對應一個數字。

喺命令行輸入 tty 命令可以睇到當前連接嘅偽終端設備文件。

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

### 睇當前登錄嘅用戶

最常用嘅方法係 `w` 命令。

```bash {frame="none"}
w
```

```bash {frame="none"}
 11:18:19 up 15 days, 20:08,  2 users,  load average: 0.00, 0.01, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
root     pts/0    120.231.138.130  10:59    3.00s  0.02s  0.00s w
root     pts/1    120.231.138.130  11:11    6:41   0.01s  0.01s -bash
```

仲可以使用 `who` 命令。

```bash {frame="none"}
who
```

```bash {frame="none"}
root     pts/0        2024-08-04 10:59 (120.231.138.130)
root     pts/1        2024-08-04 11:11 (120.231.138.130)
```

當然你要直接用 `ls` 都得。

```bash {frame="none"}
ls -l /dev/pts/
```

```bash {frame="none"}
crw------- 1 root tty  136, 0 Aug  8  2024 0
crw------- 1 root tty  136, 1 Aug  8 09:53 1
c--------- 1 root root   5, 2 Aug  7 21:30 ptmx
```

### 俾特定 PTS 發送消息

```bash {frame="none"}
echo "hello, world" > /dev/pts/1
```

### 強制退出特定 PTS

```bash {frame="none"}
ps -t /dev/pts/1
```

```bash {frame="none"}
kill -9 PID
```
