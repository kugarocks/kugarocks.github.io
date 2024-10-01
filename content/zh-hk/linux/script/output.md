---
title: "输出处理"
description: ""
summary: ""
date: 2024-08-31T20:00:00+08:00
lastmod: 2024-09-03T20:00:00+08:00
weight: 3500
seo:
  title: "输出处理"
  description: ""
  canonical: ""
  noindex: false
---

## 标准文件描述符

Standard File Descriptors。

| 名称     | 编号 | 说明   |
| ------ | -- | ---- |
| STDIN  | 0  | 标准输入 |
| STDOUT | 1  | 标准输出 |
| STDERR | 2  | 标准错误 |

### 标准输入

命令 `cat` 默认从标准输入读取内容，如果直接运行 `cat` 而不指定文件名，它会等待用户输入。

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

### 标准输出

默认是终端或屏幕。

```bash {frame="none"}
echo "hello world"
```

重定向使用 `>` 或 `1>`。

```bash {frame="none"}
echo "hello world" > foo
```

### 标准错误

默认是终端或屏幕。

```bash {frame="none"}
ls 404
```

重定向使用 `2>`。

```bash {frame="none"}
ls 404 2> foo
```

使用 `&>` 可以同时重定向标准输出和错误输出。

```bash {frame="none"}
ls 404 &> foo
```

## EXEC 命令

### 在命令行中使用

```bash {frame="none"}
exec ls
```

Shell 进程会被新命令的进程取代，执行完后不会返回到原来的 Shell 中。

### 在脚本中使用

```bash {frame="none"}
#!/usr/bin/env bash

exec /bin/date
echo "This will never be executed"
```

脚本进程会被 `date` 命令替代，`echo` 不会执行。

### 文件描述符重定向

```bash {frame="none"}
#!/usr/bin/env bash

echo "这将输出到终端"
exec 1> output.txt
echo "这将被写入到 output.txt"
```

用于修改文件描述符时，不会替换当前进程，只会影响后续命令的输入输出。

## 关闭文件描述符

重定向到 `&-` 即可关闭。关闭之后，不能再写数据。

```bash {frame="none"}
#!/usr/bin/env bash

exec 3> testfile
echo "apple" >&3
exec 3>&-
```

## /dev/null

空设备，位桶。

```bash {frame="none"}
crw-rw-rw- 1 root root 1, 3 Aug 14 23:16 /dev/null
```

把标准输出和标准错误重定向到空设备。

```bash {frame="none"}
command > /dev/null 2>&1
```

## MKTEMP 命令

根据文件名模板，创建临时文件。

```bash {frame="none"}
filename.XXXXXX
```

命令会把 X 代替为随机字符，模板最少为 6 个 X。

### 创建文件

该命令创建的文件**只有 Owner 有权限**。

```bash {frame="none"}
mktemp foo.XXXXXX
```

```bash {frame="none"}
-rw------- 1 kuga kuga 0 Sep  2 17:27 foo.zPtFtG
```

### 创建目录

```bash {frame="none"}
mktemp -d bar.XXXXXX
```

```bash {frame="none"}
drwx------ 2 kuga kuga 4096 Sep  2 17:29 bar.RQAMzc
```

### 使用 /tmp 目录

使用 `-t` 选项会在 /tmp 目录创建文件。

```bash {frame="none"}
mktemp -t foo.XXXXXX
```

```bash {frame="none"}
/tmp/foo.0IglAI
```

## TEE 命令

同时把数据重定向到标准输出和文件。

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

屏幕和文件都有同一份数据。
