---
title: "基本語法"
description: ""
summary: ""
date: 2024-08-30T20:00:00+08:00
lastmod: 2024-08-30T20:00:00+08:00
weight: 3100
seo:
  title: "基本語法"
  description: ""
  canonical: ""
  noindex: false
---

## Shebang

```bash {frame="none"}
#!/usr/bin/env bash
```

## 變量賦值

`=` 號兩邊唔可以有空格。

```bash {frame="none"}
name=foo
```

## 雙引號

可以解釋變量。

```bash {frame="none"}
name=foo
echo "hello, $name" # hello, foo
echo "hello, \$\$"  # hello, $$
echo "hello, \"\""  # hello, ""
```

## 單引號

唔解釋變量，只有單引號係特殊字符。

```bash {frame="none"}
name=foo
echo 'hello, $name' # hello, $name
echo 'hello, $$'    # hello, $$
echo 'hello, ""'    # hello, ""
```

要輸出單引號，需要先關閉單引號。

```bash {frame="none"}
echo 'I'\''m fine'  # I'm fine
```

## 命令替換

有**反單號**同 **`$()`** 兩種用法。

```bash {frame="none"}
result=`date`
```

```bash {frame="none"}
result=$(date)
```

推薦使用 `$()`，可讀性更好，更多例子如下：

```bash {frame="none"}
echo "dir is: $(pwd)"
```

```bash {frame="none"}
count=$(ls $(pwd) | wc -l)
```

[喺呢度 `ls` 冇使用 `-l` 選項，但 count 嘅值係 4，原因喺呢度。](/zh-cn/linux/cmd/common-1/#隱藏字符)

## 輸出重定向

標準輸出重定向 `>`，新建/覆蓋文件。

```bash {frame="none"}
cmd > file
```

追加輸出重定向 `>>`。

```bash {frame="none"}
cmd >> file
```

標準錯誤重定向 `2>`，新建/覆蓋文件。

```bash {frame="none"}
cmd 2> file
```

標準輸出同錯誤重定向到唔同文件。

```bash {frame="none"}
cmd > foo.log 2> bar.log
```

標準輸出同錯誤重定向到同一文件。

```bash {frame="none"}
ls 404 > foobar.log 2>&1
```

## 輸入重定向

常用方式，使用 `<` 符號。

```bash {frame="none"}
echo "a b c" > foo
```

```bash {frame="none"}
wc < foo
```

```bash {frame="none"}
1 3 6
```

內聯重定向，Inline Input Redirection。

```bash {frame="none"}
wc << FOO
apple
banana
cat
FOO
```

```bash {frame="none"}
3       3      17
```

FOO 為自定義標記，用於多行輸入。

## EXPR 命令

反人類嘅數學運算指令，`+` 號兩邊嘅空格唔可以少。

```bash {frame="none"}
expr 2 + 5
```

`*` 號係通配符，仲要轉義。

```bash {frame="none"}
expr 2 \* 5
```

只有整除，唔支持浮點數。

```bash {frame="none"}
expr 24 / 10
```

## 方括號

可以使用 `[]` 執行數學運算。

```bash {frame="none"}
var1=$[1+5*2]
var2=$[2*(3+2)]
```

## BC 計算器

精確數學運算計算器，全稱 **Basic/Bench Calculator。**

### 交互模式

```bash {frame="none"}
bc
```

```bash {frame="none"}
Copyright 1991-1994, 1997, 1998, 2000, 2004, 2006, 2008, 2012-2017 Free Software Foundation, Inc.
This is free software with ABSOLUTELY NO WARRANTY.
For details type `warranty'.
```

```bash {frame="none"}
4*2.5
10.0
quit
```

`-q` 選項唔會打印上面嗰串英文歡迎語。

```bash {frame="none"}
bc -q
```

### 浮點數

可以直接使用浮點數計算。

```bash {frame="none"}
2.5*5
12.5
```

除法會用到 `scale` 變量，默認值為 0，表示整除。

```bash {frame="none"}
scale=2
10/3
```

表示保留 2 位小數，**`scale` 變量僅對除法有效**。

### 管道方式

```bash {frame="none"}
foo=$(echo "scale=2; 10/3" | bc)
```

### 內聯輸入重定向

```bash {frame="none"}
var1=10.24

foo=$(bc << EOF
scale=2
a=2
$var1/a
EOF
)
```

## EXIT 命令

腳本嘅默認退出碼係 0，表示正常退出，可以使用 `exit` 改變。

```bash {frame="none"}
exit 5
```

退出碼嘅範圍係 0-255，取模（%256）。
