---
title: "輸出處理"
description: ""
summary: ""
date: 2024-08-31T20:00:00+08:00
lastmod: 2024-09-03T20:00:00+08:00
weight: 3500
seo:
  title: "輸出處理"
  description: ""
  canonical: ""
  noindex: false
---

## 標準文件描述符

Standard File Descriptors。

| 名稱     | 編號 | 說明   |
| ------ | -- | ---- |
| STDIN  | 0  | 標準輸入 |
| STDOUT | 1  | 標準輸出 |
| STDERR | 2  | 標準錯誤 |

### 標準輸入

命令 `cat` 默認從標準輸入讀取內容，如果直接運行 `cat` 而唔指定文件名，佢會等用戶輸入。

```bash {frame="none"}
cat
```

重定向使用 `<`。

```bash {frame="none"}
cat < foo
```

```bash {frame="none"}
wc < foo
```

### 標準輸出

默認係終端或者屏幕。

```bash {frame="none"}
echo "hello world"
```

重定向使用 `>` 或 `1>`。

```bash {frame="none"}
echo "hello world" > foo
```

### 標準錯誤

默認係終端或者屏幕。

```bash {frame="none"}
ls 404
```

重定向使用 `2>`。

```bash {frame="none"}
ls 404 2> foo
```

使用 `&>` 可以同時重定向標準輸出同錯誤輸出。

```bash {frame="none"}
ls 404 &> foo
```

## EXEC 命令

### 喺命令行中使用

```bash {frame="none"}
exec ls
```

Shell 進程會被新命令嘅進程取代，執行完後唔會返回到原來嘅 Shell 中。

### 喺腳本中使用

```bash {frame="none"}
#!/usr/bin/env bash

exec /bin/date
echo "This will never be executed"
```

腳本進程會被 `date` 命令取代，`echo` 唔會執行。

### 文件描述符重定向

```bash {frame="none"}
#!/usr/bin/env bash

echo "呢個會輸出到終端"
exec 1> output.txt
echo "呢個會寫入到 output.txt"
```

用於修改文件描述符時，唔會替換當前進程，只會影響後續命令嘅輸入輸出。

## 關閉文件描述符

重定向到 `&-` 即可關閉。關閉之後，唔可以再寫數據。

```bash {frame="none"}
#!/usr/bin/env bash

exec 3> testfile
echo "apple" >&3
exec 3>&-
```

## /dev/null

空設備，位桶。

```bash {frame="none"}
crw-rw-rw- 1 root root 1, 3 Aug 14 23:16 /dev/null
```

把標準輸出同標準錯誤重定向到空設備。

```bash {frame="none"}
command > /dev/null 2>&1
```

## MKTEMP 命令

根據文件名模板，創建臨時文件。

```bash {frame="none"}
filename.XXXXXX
```

命令會把 X 代替為隨機字符，模板最少為 6 個 X。

### 創建文件

該命令創建嘅文件**只有 Owner 有權限**。

```bash {frame="none"}
mktemp foo.XXXXXX
```

```bash {frame="none"}
-rw------- 1 kuga kuga 0 Sep  2 17:27 foo.zPtFtG
```

### 創建目錄

```bash {frame="none"}
mktemp -d bar.XXXXXX
```

```bash {frame="none"}
drwx------ 2 kuga kuga 4096 Sep  2 17:29 bar.RQAMzc
```

### 使用 /tmp 目錄

使用 `-t` 選項會喺 /tmp 目錄創建文件。

```bash {frame="none"}
mktemp -t foo.XXXXXX
```

```bash {frame="none"}
/tmp/foo.0IglAI
```

## TEE 命令

同時把數據重定向到標準輸出同文件。

```txt {frame="none"}
tee - read from standard input and write to standard output and files
```

```bash {frame="none"}
date | tee testfile
```

```bash {frame="none"}
Mon Sep  2 05:36:44 PM CST 2024
```

```bash {frame="none"}
cat testfile
```

```bash {frame="none"}
Mon Sep  2 05:36:44 PM CST 2024
```

屏幕同文件都有同一份數據。
