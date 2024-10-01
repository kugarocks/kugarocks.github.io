---
title: "TOP 命令"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 1400
seo:
  title: "TOP 命令"
  description: ""
  canonical: ""
  noindex: false
---

## 簡介

```bash {frame="none"}
man top
```

```bash {frame="none"}
top - display Linux processes
```

top 命令預設按進程 **CPU 使用率嘅倒序**嚟排序，並動態展示結果。

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

## 頭部信息

### 系統信息

```bash {frame="none"}
top - 09:19:05 up 6 days, 10:02,  2 users,  load average: 0.13, 0.05, 0.01
```

* 當前系統時間：09:19:05
* 系統運行時間：6 日 10 小時 2 分鐘
* 當前登入用戶：2 個
* 系統平均負載：1 分鐘、5 分鐘、15 分鐘

### 進程概要

```bash {frame="none"}
Tasks: 126 total,   1 running, 125 sleeping,   0 stopped,   0 zombie
```

* 總進程數：126
* 正在運行嘅進程數：1
* 睡眠狀態嘅進程數：125
* 停止狀態嘅進程數：0
* 僵屍狀態嘅進程數：0

### CPU 使用情況

```bash {frame="none"}
%Cpu(s):  0.5 us,  0.0 sy,  0.0 ni, 99.5 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
```

* 用戶進程嘅 CPU 佔比：0.5, user
* 系統進程嘅 CPU 佔比：0.0, system
* 包含 `nice value` 進程嘅 CPU 佔比：0.0
* 空閒 CPU 佔比：99.5, idle
* 等待 IO 操作嘅 CPU 佔比：0.0, wait
* 處理硬件中斷嘅 CPU 佔比：0.0, hardware interrupts
* 處理軟件中斷嘅 CPU 佔比：0.0, software interrupts
* 被虛擬化程序偷走嘅 CPU 佔比：0.0, stolen

### 記憶體使用情況

```bash {frame="none"}
MiB Mem :   1673.0 total,    252.3 free,    299.5 used,   1121.3 buff/cache
```

* 單位：MiB, Million Byte
* 總數：1673.0 MB
* 空閒：252.3 MB
* 已用：299.5 MB
* 緩存：1121.3 MB

### 交換區使用情況

```bash {frame="none"}
MiB Swap:      0.0 total,      0.0 free,      0.0 used.   1197.7 avail Mem
```

* 總數：0.0
* 空閒：0.0
* 已用：0.0
* 可用：1197.7 MB（buff/cache）

總數為 0 有可能係因為冇配置交換區，可以使用以下命令檢查。

```bash {frame="none"}
swapon --show
```

如果乜都冇輸出，就表示冇配置交換區。

## 字段管理模式

按下 `f` 或 `Shift + f` 鍵，此時會進入字段管理模式。

```bash {frame="none"}
Fields Management for window 1:Def, whose current sort field is %CPU
   Navigate with Up/Dn, Right selects for move then <Enter> or Left commits,
   'd' or <Space> toggles display, 's' sets sort.  Use 'q' or <Esc> to end!
```

### window 1:Def

窗口編號係 1，使用默認（Default）嘅字段配置。

### 修改字段顯示順序

按右方向鍵選擇需要移動嘅字段，上下移動後，按回車或左方向鍵提交。

### 設定是否顯示字段

選擇好字段後，按 `d` 或空格鍵。

### 設定當前排序字段

選擇好字段後，按 `s` 鍵，只喺當前會話生效。

### 其他非常用字段

go rocks

## 多窗口模式

按下 `Shift + A` 鍵，會出現 4 個 `top` 窗口，左上角會顯示窗口嘅名稱，
每個窗口顯示嘅字段同排序嘅方式唔同，都可以通過字段管理模式修改。

### 常用操作

* 返回單窗口模式：`Shift + A`
* 選擇下一個窗口：`a` 鍵。
* 選擇上一個窗口：`w` 鍵。
* 選擇指定嘅窗口：`g` 鍵，選 `1-4` 。
* 修改窗口嘅名稱：`Shift + G`，輸入 1-3 個字符。
* 進入字段管理模式：`Shift + F`。

### 常見窗口

* **1:Def**：編號 1，按 `%CPU` 逆序排序。
* **2:Job**：編號 2，按 `PID` 逆序排序。
* **3:Mem**：編號 3，按 `%Mem` 逆序排序。
* **4:Usr**：編號 4，按 `USER` 逆序排序。

## 個性化窗口顏色

`Shift + Z` 進入顏色配置模式，下面已經寫得明明白白了。

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

1. 可修改不同窗口（1:Def）的配置，按 `a` 或 `w` 選擇。
2. 可用開關：`Shift + B`、`z`、`b`。
3. 可修改 4 個部分的顏色，`Shift + S/M/H/T`。
4. 修改的顏色可以輸入數字，也可以使用上下鍵選擇。
5. `q`  或 `Esc` 取消配置，`Enter` 提交配置。

退出顏色模式後，如果想**持久化配置**，需要按 `Shift + W`，文件保存路徑：

```bash {frame="none"}
~/.config/procps/toprc
```

注意，如果保存的時候在多窗口模式，下次打開也會是多窗口模式。

## 常用快捷鍵

部分快捷鍵也會修改當前 top 命令會話窗口嘅屬性。

* **`h`**：顯示幫助菜單，列出所有可用嘅命令。
* **`0`**：切換值為 0 嘅字段顯示/隱藏。
* **`1`**：切換顯示每個 CPU 核心嘅使用情況。
* **`k`**：終止進程，輸入 PID。
* **`r`**：調整進程嘅優先級（renice）。
* **`z`**：切換顏色顯示模式。
* **`x`**：高亮顯示當前排序嘅列。
* **`c`**：切換命令行顯示/隱藏。
* **`n`**：改變顯示進程嘅數量，輸入顯示嘅進程數。
* **`Shift + W`**：保存當前配置。
* **`Shift + Z`**：進入顏色模式。
* **`Shift + P`**：按 CPU 使用率排序。
* **`Shift + M`**：按內存使用率排序。
* **`Shift + N`**：按 PID 排序。
* **`Shift + T`**：按進程運行時間排序。

## 特殊字段說明

### PR

優先級。

### NI

Nice Value。

### VIRT

Virtual Image (KiB)。

### RES

Resident Size (KiB)。

### SHR

共享內存大小。

### S

進程狀態，參考 PS 命令。

### TIME+

CPU Time, hundredths，進程啟動後佔用嘅 CPU 時間總和。
