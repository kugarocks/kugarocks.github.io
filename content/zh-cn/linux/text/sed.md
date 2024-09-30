---
title: "SED 命令"
description: ""
summary: ""
date: 2024-09-04T20:00:00+08:00
lastmod: 2024-09-05T20:00:00+08:00
weight: 4200
seo:
  title: "SED 命令"
  description: ""
  canonical: ""
  noindex: false
---

## Stream Editor

流式文本处理器，作者是 **Lee E. McMahon**。

### 基本语法

```bash {frame="none"}
sed [OPTIONS] 'command' file
```

* `OPTIONS`：命令选项。
* `command`：打印、替换、删除等。
* `file`：处理的文件，如果省略，读取 STDIN。

省略 `file` 为交互模式，输入一行执行一次。

### 运行过程

* 读入一行数据：
  * 有匹配规则：
    * 匹配成功：执行相关操作。
    * 匹配失败：原样打印数据。
  * 无匹配规则：执行相关操作。

### 命令引号

* 单引号：可减少转义字符的影响，**优先使用**。
* 双引号：可使用变量参数，需处理特殊字符。

## 常用例子

### 替换第一处

把第一处出现的 a 替换成 b。

```bash {frame="none"}
echo 'aba' | sed 's/a/b/'
```

```bash {frame="none"}
bba
```

### 替换第 N 处

把第 N 处出现的 a 替换成 b。

```bash {frame="none"}
echo 'aba' | sed 's/a/b/2'
```

```bash {frame="none"}
abb
```

### 替换所有出处

```bash {frame="none"}
echo 'aba' | sed 's/a/b/g'
```

```bash {frame="none"}
bbb
```

### 执行多条命令

可以用 `;` 分隔，也可以使用 `-e` 选项。

```bash {frame="none"}
echo 'aba' | sed 's/a/b/; s/a/c/'
```

```bash {frame="none"}
echo 'aba' | sed -e 's/a/b/' -e 's/a/c/'
```

```bash {frame="none"}
bbc
```

### 使用命令文件

`cmd.sed` 文件内容如下。

```bash {frame="none"}
s/a/b/
s/a/c/
```

```bash {frame="none"}
echo 'aba' | sed -f cmd.sed
```

```bash {frame="none"}
bbc
```

### 只打印替换行

`-n` 表示抑制输出，`p` 表示只输出匹配行。

```bash {frame="none"}
echo '
aa bb
cc dd
' | sed -n 's/aa/bb/p'
```

```bash {frame="none"}
bb bb
```

### 替换结果写文件

```bash {frame="none"}
echo '
aa bb
cc dd
' | sed 's/aa/bb/w out.txt'
```

```bash {frame="none"}
cat out.txt
```

```bash {frame="none"}
bb bb
```

### 修改命令分隔符

可以使用别的符号替换命令分隔符 `/`。

```bash {frame="none"}
echo '/bin/sh' | sed 's#/sh#/bash#'
```

```bash {frame="none"}
/bin/bash
```

### 指定行匹配

匹配第 2 行。

```bash {frame="none"}
sed '2s/aa/bb/'
```

匹配 2-4 行。

```bash {frame="none"}
sed '2,4s/aa/bb/'
```

匹配 2 到最后一行。

```bash {frame="none"}
sed '2,$s/aa/bb/'
```

### 指定行命令组

```bash {frame="none"}
sed '2{s/cc/aa/; s/dd/bb/}'
```

```bash {frame="none"}
sed '2,4{
s/cc/aa/
s/dd/bb/
}'
```

### 删除所有行

```bash {frame="none"}
sed 'd'
```

### 删除指定行

```bash {frame="none"}
sed '1d'
```

```bash {frame="none"}
sed '2,4d'
```

```bash {frame="none"}
sed '2,$d'
```

### 删除匹配行

```bash {frame="none"}
sed '/aa bb/d'
```

### 前插一行

```bash {frame="none"}
echo "hello" | sed 'i\New Line'
```

### 后插一行

```bash {frame="none"}
echo "hello" | sed 'a\New Line'
```

### 指定行插入

```bash {frame="none"}
sed '3i\New Line'
```

### 匹配行插入

```bash {frame="none"}
sed '/cc/i\New Line'
```

### 插入多行

必须使用 `\`。

```bash {frame="none"}
sed '2i\
New Line 1\
New Line 2
'
```

### 修改行

```bash {frame="none"}
sed '2c\
Change Line 1\
Change Line 2
'
```

```bash {frame="none"}
sed '/aa/c\
Change Line 1
'
```

### 单字符替换

```bash {frame="none"}
echo 'aabbcc' | sed 'y/ac/ca/'
```

```txt {frame="none"}
ccbbaa
```

### 打印特定行

```bash {frame="none"}
sed -n '2,5p'
```

### 打印替换前后

```bash {frame="none"}
sed -n '/aa/{p; s/aa/cc/p}'
```

### 打印行号

```bash {frame="none"}
sed -n '/bb/{=; p}'
```

### 从文件读取

创建 foo 和 bar 文件。

```bash {frame="none"}
echo -e 'aa\nbb' > foo
echo -e '11\n22' > bar
```

读取 foo 文件，并插入到 bar 的第一行以后。

```bash {frame="none"}
sed '1r foo' bar
```

```txt {frame="none"}
11
aa
bb
22
```

匹配字符串再插入。

```bash {frame="none"}
sed '/22/r foo' bar
```

```txt {frame="none"}
11
22
aa
bb
```

匹配字符串插入，使用 `d` 删除匹配行。

```bash {frame="none"}
sed '/22/{
r foo
d
}' bar
```

```txt {frame="none"}
11
aa
bb
```

下面会报语法错误。

```bash {frame="none"}
# 会报错
sed '/22/{r foo; d}' bar
```

硬是要一行也不是不行。

```bash {frame="none"}
sed '/22/r foo' bar | sed '/22/d'
```
