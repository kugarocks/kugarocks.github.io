---
title: "基本语法"
description: ""
summary: ""
date: 2024-08-30T20:00:00+08:00
lastmod: 2024-08-30T20:00:00+08:00
weight: 3100
seo:
  title: "基本语法"
  description: ""
  canonical: ""
  noindex: false
---

## Shebang

```bash {frame="none"}
#!/usr/bin/env bash
```

## 变量赋值

`=` 号两边不能有空格。

```bash {frame="none"}
name=foo
```

## 双引号

可解释变量。

```bash {frame="none"}
name=foo
echo "hello, $name" # hello, foo
echo "hello, \$\$"  # hello, $$
echo "hello, \"\""  # hello, ""
```

## 单引号

不解释变量，只有单引号是特殊字符。

```bash {frame="none"}
name=foo
echo 'hello, $name' # hello, $name
echo 'hello, $$'    # hello, $$
echo 'hello, ""'    # hello, ""
```

要输出单引号，需要先关闭单引号。

```bash {frame="none"}
echo 'I'\''m fine'  # I'm fine
```

## 命令替换

有**反单号**和 **`$()`** 两种用法。

```bash {frame="none"}
result=`date`
```

```bash {frame="none"}
result=$(date)
```

推荐使用 `$()`，可读性更好，更多例子如下：

```bash {frame="none"}
echo "dir is: $(pwd)"
```

```bash {frame="none"}
count=$(ls $(pwd) | wc -l)
```

[在这里 `ls` 没有使用 `-l` 选项，但 count 的值是 4，原因在这。](/zh-cn/linux/cmd/common-1/#隐藏字符)

## 输出重定向

标准输出重定向 `>`，新建/覆盖文件。

```bash {frame="none"}
cmd > file
```

追加输出重定向 `>>`。

```bash {frame="none"}
cmd >> file
```

标准错误重定向 `2>`，新建/覆盖文件。

```bash {frame="none"}
cmd 2> file
```

标准输出和错误重定向到不同文件。

```bash {frame="none"}
cmd > foo.log 2> bar.log
```

标准输出和错误重定向到同一文件。

```bash {frame="none"}
ls 404 > foobar.log 2>&1
```

## 输入重定向

常用方式，使用 `<` 符号。

```bash {frame="none"}
echo "a b c" > foo
```

```bash {frame="none"}
wc < foo
```

```bash {frame="none"}
1 3 6
```

内联重定向，Inline Input Redirection。

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

FOO 为自定义标记，用于多行输入。

## EXPR 命令

反人类的数学运算指令，`+` 号两边的空格不能少。

```bash {frame="none"}
expr 2 + 5
```

`*` 号是通匹符，还得转义。

```bash {frame="none"}
expr 2 \* 5
```

只有整除，不支持浮点数。

```bash {frame="none"}
expr 24 / 10
```

## 方括号

可使用 `[]` 执行数学运算。

```bash {frame="none"}
var1=$[1+5*2]
var2=$[2*(3+2)]
```

## BC 计算器

精确数学运算计算器，全称 **Basic/Bench Calculator。**

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

`-q` 选项不打印上面那串英文欢迎语。

```bash {frame="none"}
bc -q
```

### 浮点数

可以直接使用浮点数计算。

```bash {frame="none"}
2.5*5
12.5
```

除法会用到 `scale` 变量，默认值为 0，表示整除。

```bash {frame="none"}
scale=2
10/3
```

表示保留 2 位小数，**`scale` 变量仅对除法有效**。

### 管道方式

```bash {frame="none"}
foo=$(echo "scale=2; 10/3" | bc)
```

### 内联输入重定向

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

脚本的默认退出码是 0，表示正常退出，可使用 `exit` 改变。

```bash {frame="none"}
exit 5
```

退出码的范围是 0-255，取模（%256）。
