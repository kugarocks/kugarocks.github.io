---
title: "输入处理"
description: ""
summary: ""
date: 2024-08-31T20:00:00+08:00
lastmod: 2024-08-31T20:00:00+08:00
weight: 3400
seo:
  title: "输入处理"
  description: ""
  canonical: ""
  noindex: false
---

## 位置参数

Positional Parameters，脚本的位置参数。

* `$0`：脚本名，包含路径。
* `$1`：第一个参数，以此类推。
* `${10}`：大于 9 的参数要用花括号。

```bash {frame="none"}
#!/usr/bin/env bash

echo $0
echo $1
```

```bash {frame="none"}
./foo a
```

```bash {frame="none"}
./foo
a
```

## BASENAME

可以去掉脚本的路径，只保留名称。

```bash {frame="none"}
basename /home/kuga/foo
```

脚本中的用法。

```bash {frame="none"}
name=$(basename $0)
```

## 特殊参数

[参考这里。](te-shu-can-shu.md)

## 移动参数

`shift` 命令可以把位置参数左移一位。

```bash {frame="none"}
#!/usr/bin/env bash

i=1
while [ -n "$1" ]
do
    echo "param #$i = $1"
    i=$[ $i + 1 ]
    shift
done
```

```bash {frame="none"}
./foo a b
```

```txt {frame="none"}
param #1 = a
param #2 = b
```

## 脚本选项

选项就是以在**单个连字符**后跟**单个字母**，如：`-a`。由于选项和参数都是出现在脚本的后面，为了区分开来，一般是用双连字符 `--`，左边是选项，右边是参数，例如。

```bash {frame="none"}
./foo -a -b -- p1 p2
```

要在脚本中正确解释选项和参数，不是一件容量的事情，为此官方提供了两个工具。

* **`getopt`**
  * 外部命令。
  * 支持长选项，如 `--help`。
  * 适合复杂的命令行工具。
* **`getopts`**
  * 内部命令。
  * 不支持长选项。
  * 适合简单的选项场景。

Github 上也有不少选项解释项目。

## getopt 命令

```bash {frame="none"}
getopt optstring parameters
```

* `optstring`：选项的定义。
* `parameters`：选项的内容。

例如对于 `optstring=ab:c`。

* 单字母 `a` 和 `c` 代表无值选项。
* 字母 `b` 后跟 `:` 表示有值选项。

看看下面例子的输出。

```bash {frame="none"}
getopt ab:c -a -b bval -c p1 p2
```

```bash {frame="none"}
 -a -b bval -c -- p1 p2
```

可以看到他使用 `--` 把选项和参数分隔开了。

## getopts 命令

`getopts` 是 Bash 的内置命令，它会逐个解释选项，然后把选项的信息存储在特定变量中，方便脚本访问。这才是给我这种小菜鸡用的命令。

```bash {frame="none"}
getopts optstring name
```

* `name`：当前选项的名称。
* `OPTIND`：每处理一个项目，该值会加 1。
* `OPTARG`：如果选项有值，会保存在这个变量中。

```bash {frame="none"}
#!/usr/bin/env bash

while getopts "ab:c:" name; do
  case $name in
    a)
      echo "Option -a"
      ;;
    b)
      echo "Option -b: $OPTARG"
      ;;
    c)
      echo "Option -c: $OPTARG"
      ;;
    \?)
      echo "Invalid option: -$OPTARG"
      exit 1
      ;;
  esac
done

# 显示 OPTIND 的值
echo "OPTIND: $OPTIND"

# 使用 shift 来移除已解析的选项和参数
shift $((OPTIND - 1))

# 剩余的非选项参数
echo "Params: $@"
```

```bash {frame="none"}
./foo -a -b v1 -c v2 p1 p2
```

```txt {frame="none"}
Option -a
Option -b: v1
Option -c: v2
OPTIND: 6
Params: p1 p2
```
