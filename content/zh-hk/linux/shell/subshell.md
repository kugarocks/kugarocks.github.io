---
title: "Subshell"
description: ""
summary: ""
date: 2024-08-27T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 900
seo:
  title: "Subshell"
  description: ""
  canonical: ""
  noindex: false
---

## Subshell

Subshell 嘅定義喺一啲書本或者資料中模糊唔清__AB__畀出嘅解釋往往同某啲例子自相矛盾__AB__令人捉摸唔透。
所以__AB__為咗避免呢種語義同邏輯上嘅問題__AB__呢度唔會畀出佢嘅定義（建議參考官方 BASH 手冊）__AB__
亦唔會用 “子 Shell” 呢個翻譯__AB__只係從佢嘅實際表現去理解佢嘅定義。
下面列舉嘅變量同 Subshell 概念有密切嘅關係。

{{< link-card
  title="Bash Reference Manual"
  description="Bash 參考手冊"
  href="https://www.gnu.org/software/bash/manual/bash.html"
  target="_blank"
>}}

### BASH_SUBSHELL

Shell 變量__AB__**非環境變量**__AB__官方手冊解釋。

```bash {frame="none" text-wrap="wrap"}
Incremented by one within each subshell or subshell environment when the shell begins executing in that environment. The initial value is 0. If BASH_SUBSHELL is unset, it loses its special properties, even if it is subsequently reset.
```

亦可以用 man 命令__AB__內容可能會有啲唔同。

```bash {frame="none"}
man bash | grep -A 3 'BASH_SUBSHELL' | head -n 4
```

***

```bash {frame="none"}
echo $BASH_SUBSHELL
```

```bash {frame="none"}
0
```

### SHLVL

**環境變量**__AB__官方手冊解釋。

```bash {frame="none" text-wrap="wrap"}
Incremented by one each time a new instance of Bash is started. This is intended to be a count of how deeply your Bash shells are nested.
```

用 man 命令。

```bash {frame="none"}
man bash | grep 'SHLVL'
```

呢個值係從 1 開始嘅。

```bash {frame="none"}
echo $SHLVL
```

```bash {frame="none"}
1
```

## 命令分組

全稱 Command Grouping__AB__Bash 提供兩種方法創建命令分組。

### 括號：()

呢個方法會創建一個 Subshell 環境去處理命令分組。

```bash {frame="none"}
(pwd; echo $BASH_SUBSHELL)
```

```bash {frame="none"}
/home/kuga
1
```

***

```bash {frame="none"}
(pwd; (echo $BASH_SUBSHELL))
```

```bash {frame="none"}
/home/kuga
2 
```

***

```bash {frame="none"}
(pwd; (echo $SHLVL))
```

```bash {frame="none"}
1
```

可以得出以下結論。

* BASH_SUBSHELL：每創建一個 Subshell 就加 1。
* SHLVL：無論創建幾多個 Subshell__AB__都唔變。

### 花括號：\{\}

呢個方法唔會創建 Subshell__AB__命令分組係喺當前 Shell 嘅上下文中處理嘅。
喺語法上__AB__花括號同命令之間嘅空格唔可以省略__AB__每個命令結尾嘅分號亦係必須嘅。

```bash {frame="none"}
{ pwd; { echo $BASH_SUBSHELL; } }
```

```bash {frame="none"}
/home/kuga
0
```

***

```bash {frame="none"}
{ pwd; { echo $SHLVL; } }
```

```bash {frame="none"}
/home/kuga
1
```

## Shell PID

可以通過 BASHPID 或者 `$$` 睇 Shell 嘅 PID__AB__但佢哋係有區別嘅。

### BASHPID

Shell 變量__AB__**非環境變量**__AB__官方解釋。

```bash {frame="none" text-wrap="wrap"}
Expands to the process ID of the current Bash process. This differs from $$ under certain circumstances, such as subshells that do not require Bash to be re-initialized. Assignments to BASHPID have no effect. If BASHPID is unset, it loses its special properties, even if it is subsequently reset.
```

```bash {frame="none"}
echo $BASHPID
```

```bash {frame="none"}
56414
```

用 `()` 睇 BASHPID。

```bash {frame="none"}
(ps -f --forest; echo $BASHPID)
```

```bash {frame="none"}
UID          PID    PPID  C STIME TTY          TIME CMD
kuga       56414   56412  0 10:11 pts/0    00:00:00 -bash
kuga       57325   56414  0 15:13 pts/0    00:00:00  \_ -bash
kuga       57326   57325  0 15:13 pts/0    00:00:00      \_ ps -f --forest
57325
```

可以睇到__AB__BASHPID 輸出咗 Subshell 嘅 PID。

### 特殊參數 $$

官方解釋。

```bash {frame="none" text-wrap="wrap"}
($$) Expands to the process ID of the shell. In a subshell, it expands to the process ID of the invoking shell, not the subshell.
```

喺 Subshell 中__AB__`$$` 表示嘅係 invoking shell 嘅 PID。

```bash {frame="none"}
(pwd; (ps -f --forest; echo $$))
```

```bash {frame="none"}
/home/kuga
UID          PID    PPID  C STIME TTY          TIME CMD
kuga       56414   56412  0 10:11 pts/0    00:00:00 -bash
kuga       57347   56414  0 15:20 pts/0    00:00:00  \_ -bash
kuga       57348   57347  0 15:20 pts/0    00:00:00      \_ -bash
kuga       57349   57348  0 15:20 pts/0    00:00:00          \_ ps -f --forest
56414
```

可以睇到__AB__無論有幾多個 Subshells__AB__`$$` 始終表示頂層 Bash 嘅 PID。

## 創建 Bash 實例

喺 Bash 中輸入 `bash` 就可以創建一個全新嘅 Bash 實例。

```bash {frame="none"}
bash
```

```bash {frame="none"}
ps -f --forest
```

```bash {frame="none"}
UID          PID    PPID  C STIME TTY          TIME CMD
kuga       56414   56412  0 10:11 pts/0     00:00:00 -bash
kuga       57359   56414  0 15:29 pts/0     00:00:00  \_ bash
kuga       57402   57359  0 15:30 pts/0     00:00:00      \_ ps -f --forest
```

呢個時候再觀察一下上面提到嘅變量。

```bash {frame="none"}
echo $BASH_SUBSHELL $SHLVL $BASHPID $$
```

```bash {frame="none"}
0 2 57359 57359
```

* BASH_SUBSHELL：冇變。
* SHLVL：從 1 -> 2。
* BASHPID：新 Bash 實例嘅 PID。
* $$：新 Bash 實例嘅 PID。

如果話呢種創建 Bash 嘅方式都係 Subshell 嘅話__AB__語義同表現上就會自相矛盾。
