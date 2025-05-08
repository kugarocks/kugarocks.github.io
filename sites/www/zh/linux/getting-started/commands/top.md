# TOP

```bash
man top
```

```bash
top - display Linux processes
```

top 命令默认按进程 **CPU 使用率的倒序**进行排序，并动态展示结果。

```bash
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

## 头部信息

### 系统信息

```bash
top - 09:19:05 up 6 days, 10:02,  2 users,  load average: 0.13, 0.05, 0.01
```

* 当前系统时间：09:19:05
* 系统运行时间：6 天 10 小时 2 分
* 当前登录用户：2 个
* 系统平均负载：1 分钟、5 分钟、15 分钟

### 进程概要

```bash
Tasks: 126 total,   1 running, 125 sleeping,   0 stopped,   0 zombie
```

* 总进程数：126
* 正在运行的进程数：1
* 睡眠状态的进程数：125
* 停止状态的进程数：0
* 僵尸状态的进程数：0

### CPU 使用情况

```bash
%Cpu(s):  0.5 us,  0.0 sy,  0.0 ni, 99.5 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
```

* 用户进程的 CPU 占比：0.5, user
* 系统进程的 CPU 占比：0.0, system
* 包含 `nice value` 进程的 CPU 占比：0.0
* 空闲 CPU 占比：99.5, idle
* 等待 IO 操作的 CPU 占比：0.0, wait
* 处理硬件中断的 CPU 占比：0.0, hardware interrupts
* 处理软件中断的 CPU 占比：0.0, software interrupts
* 被虚拟化程序偷走的 CPU 占比：0.0, stolen

### 内存使用情况

```bash
MiB Mem :   1673.0 total,    252.3 free,    299.5 used,   1121.3 buff/cache
```

* 单位：MiB, Million Byte
* 总数：1673.0 MB
* 空闲：252.3 MB
* 已用：299.5 MB
* 缓存：1121.3 MB

### 交换区使用情况

```bash
MiB Swap:      0.0 total,      0.0 free,      0.0 used.   1197.7 avail Mem
```

* 总数：0.0
* 空闲：0.0
* 已用：0.0
* 可用：1197.7 MB（buff/cache）

总数为 0 有可能是因为没有配置交换区，可以使用以下命令检查。

```bash
swapon --show
```

如果什么也没有输出，就表示没有配置交换区。

## 字段管理模式

按下 `f` 或 `Shift + f` 键，此时会进入字段管理模式。

```bash
Fields Management for window 1:Def, whose current sort field is %CPU
   Navigate with Up/Dn, Right selects for move then <Enter> or Left commits,
   'd' or <Space> toggles display, 's' sets sort.  Use 'q' or <Esc> to end!
```

### window 1:Def

窗口编号是 1，使用默认（Default）的字段配置。

### 修改字段显示顺序

按右方向键选择需要移动的字段，上下移动后，按回车或左方向键提交。

### 设置是否显示字段

选择好字段后，按 `d` 或空格键。

### 设置当前排序字段

选择好字段后，按 `s` 键，只在当前会话生效。

### 其它非常用字段

go rocks

## 多窗口模式

按下 `Shift + A` 键，会出现 4 个 `top` 窗口，左上角会显示窗口的名称，
每个窗口显示的字段和排序的方式不同，都可以通过字段管理模式修改。

### 常用操作

* 返回单窗口模式：`Shift + A`
* 选择下一个窗口：`a`  键。
* 选择上一个窗口：`w`  键。
* 选择指定的窗口：`g`  键，选 `1-4` 。
* 修改窗口的名称：`Shift + G`，输入 1-3 个字符。
* 进入字段管理模式：`Shift + F`。

### 常见窗口

* **1:Def**：编号 1，按 `%CPU` 逆序排序。
* **2:Job**：编号 2，按 `PID` 逆序排序。
* **3:Mem**：编号 3，按 `%Mem` 逆序排序。
* **4:Usr**：编号 4，按 `USER` 逆序排序。

## 个性化窗口颜色

`Shift + Z` 进入颜色配置模式，下面已经写得明明白白了。

```bash
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

1. 可修改不同窗口（1:Def）的配置，按 `a` 或 `w` 选择。
2. 可用开关：`Shift + B`、`z`、`b`。
3. 可修改 4 个部分的颜色，`Shift + S/M/H/T`。
4. 修改的颜色可以输入数字，也可以使用上下键选择。
5. `q`  或 `Esc` 取消配置，`Enter` 提交配置。

退出颜色模式后，如果想**持久化配置**，需要按 `Shift + W`，文件保存路径：

```bash
~/.config/procps/toprc
```

注意，如果保存的时候在多窗口模式，下次打开也会是多窗口模式。

## 常用快捷键

部分快捷键也会修改当前 top 命令会话窗口的属性。

* **`h`**：显示帮助菜单，列出所有可用的命令。
* **`0`**：切换值为 0 的字段显示/隐藏。
* **`1`**：切换显示每个 CPU 核心的使用情况。
* **`k`**：终止进程，输入 PID。
* **`r`**：调整进程的优先级（renice）。
* **`z`**：切换颜色显示模式。
* **`x`**：高亮显示当前排序的列。
* **`c`**：切换命令行显示/隐藏。
* **`n`**：改变显示进程的数量，输入显示的进程数。
* **`Shift + W`**：保存当前配置。
* **`Shift + Z`**：进入颜色模式。
* **`Shift + P`**：按 CPU 使用率排序。
* **`Shift + M`**：按内存使用率排序。
* **`Shift + N`**：按 PID 排序。
* **`Shift + T`**：按进程运行时间排序。

## 特殊字段说明

### PR

优先级。

### NI

Nice Value。

### VIRT

Virtual Image (KiB)。

### RES

Resident Size (KiB)。

### SHR

共享内存大小。

### S

进程状态，参考 PS 命令。

### TIME+

CPU Time, hundredths，进程启动后占用的 CPU 时间总和。
