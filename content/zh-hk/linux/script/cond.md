---
title: "條件結構"
description: ""
summary: ""
date: 2024-08-31T20:00:00+08:00
lastmod: 2024-09-02T20:00:00+08:00
weight: 3200
seo:
  title: "條件結構"
  description: ""
  canonical: ""
  noindex: false
---

## IF 語句

如果 `command` 嘅退出碼係 `0`__AB__咁就執行 `then` 嘅內容。

```bash {frame="none"}
if command
then
    ...
fi
```

另一種格式。

```bash {frame="none"}
if command; then
    ...
fi
```

### ELSE

```bash {frame="none"}
if command; then
    ...
else
    ...
fi
```

### ELIF

```bash {frame="none"}
if command; then
    ...
elif command; then
    ...
fi
```

### 檢查用戶

檢查 soda 用戶係咪存在。

```bash {frame="none"}
#!/usr/bin/env bash

if grep soda /etc/passwd
then
 echo "soda exists"
fi
```

```bash {frame="none"}
soda:x:1001:1001:,,,:/home/soda:/bin/bash
soda exists
```

`grep` 有數據嗰陣__AB__退出碼係 `0`__AB__冇數據嗰陣退出碼係 `1`。

## TEST 命令

測試條件__AB__如果係真__AB__返回碼係 `0`__AB__否則返回碼係 `1`。

```bash {frame="none"}
test - check file types and compare values
```

基本語法。

```bash {frame="none"}
test EXPRESSION
```

簡短語法。

```bash {frame="none"}
[ EXPRESSION ]
```

喺命令行執行完之後__AB__可以用 `echo $?` 睇返嘅返回碼。

### 檢查文件

* `[ -e file ]`：文件係咪存在。
* `[ -d file ]`：係咪存在同埋係目錄。
* `[ -f file ]`：係咪存在同埋係文件。
* `[ -s file ]`：係咪存在同埋唔係空嘅。
* `[ -r file ]`：係咪存在同埋可讀。
* `[ -w file ]`：係咪存在同埋可寫。
* `[ -x file ]`：係咪存在同埋可執行。
* `[ -O file ]`：係咪存在同埋屬於現時嘅用戶。
* `[ -G file ]`：係咪存在同埋屬於用戶組。
* `[ a -nt b ]`：文件 a 係咪比 b 新。
* `[ a -ot b ]`：文件 a 係咪比 b 舊。

如果 `file` 或者 `$file` 變數包含空格__AB__要用雙引號。

```bash {frame="none"}
[ -e "file" ]
```

```bash {frame="none"}
[ -e "$file" ]
```

### 檢查字串

* `[ -z str ]`：字串係咪空（長度為 0）。
* `[ -n str ]`：字串係咪唔空（長度唔為 0）。
* `[ s1 = s2 ]`：字串係咪相等。
* `[ s1 != s2 ]`：字串係咪唔等。

### 檢查數值

* `[ a -eq b ]`：兩個數係咪相等。
* `[ a -ne b ]`：兩個數係咪唔等。
* `[ a -gt b ]`：a 係咪大過 b。
* `[ a -ge b ]`：a 係咪大過或等於 b。
* `[ a -lt b ]`：a 係咪細過 b。
* `[ a -le b ]`：a 係咪細過或等於 b。

## 複合條件

同傳統嘅編程語言一致。

```bash {frame="none"}
[ cond1 ] && [ cond2 ]
```

```bash {frame="none"}
[ cond1 ] || [ cond2 ]
```

## 雙括號

雙括號可以使用高級數學表達式__AB__無需轉義。

```bash {frame="none"}
if (( 2**10 > 1000 ))
then
    ...
fi
```

## 雙方括號

提供字串嘅高級匹配模式。

```bash {frame="none"}
if [[ $BASH_VERSION == 5.* ]]
then
    ...
fi
```

## CASE 語句

```bash {frame="none"}
#!/usr/bin/env bash

# Script 嘅第一個參數
case "$1" in
  start)
    echo "Starting the service..."
    # 喺呢度加入啟動服務嘅指令
    ;;
  stop)
    echo "Stopping the service..."
    # 喺呢度加入停止服務嘅指令
    ;;
  *)
    echo "Usage: $0 {start|stop}"
    exit 1
    ;;
esac
```

* `$0`：腳本名稱。
* `$1`：腳本嘅第一個參數
* `)`：分支條件結束標記。
* `;;`：分支命令結束標記。
* `*)`：默認分支__AB__所有分支唔匹配時執行。
