---
title: "参数展开"
description: ""
summary: ""
date: 2024-09-02T20:00:00+08:00
lastmod: 2024-09-03T20:00:00+08:00
weight: 3800
seo:
  title: "参数展开"
  description: ""
  canonical: ""
  noindex: false
---

## Parameter Expansion

在 Bash 中，参数展开是一种用于操作和处理变量内容的机制。
通过参数展开，可以获取变量的值，修改变量的值，或者为未设置的变量提供默认值。

{{< link-card
  title="Shell Parameter Expansion"
  description="Shell 参数展开"
  href="https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion"
  target="_blank"
>}}

## 变量展开

最常见的方式。

```bash {frame="none"}
var="Bash"
echo "Hello, ${var}!"
```

## 默认值展开

### 标记 +

```bash {frame="none"}
${var+DEFAULT}
```

* var 未定义：返回空串。
* var 已定义：
  * 是空值：返回 DEFAULT。
  * 非空值：返回 DEFAULT。

```bash {frame="none"}
unset var
echo ${var+foo}
```

```txt {frame="none"}
 
```

***

```bash {frame="none"}
var=
echo ${var+foo}
```

```txt {frame="none"}
foo
```

**可以用这个标记来判断变量是否未定义。**

```bash {frame="none"}
#!/usr/bin/env bash

if [ -n "${var+defined}" ]; then
    echo "var already defined"
else
    echo "var not defined"
fi
```

{{< callout context="danger" title="注意" >}}
如果 `${var+defined}` 没有使用双引号，当返回空字符串的时候，条件就会变成 `[ -n ]` ，
这是一个有效的条件，不会产生任何错误，且它的返回值为真。显然这是不合理的，因此必须添加双引号。
{{< /callout >}}

### 标记 -

```bash {frame="none"}
${var-DEFAULT}
```

* var 未定义：返回 DEFAULT。
* var 已定义：
  * 是空值：返回 var。
  * 非空值：返回 var。

```bash {frame="none"}
unset var
echo ${var-foo}
```

```txt {frame="none"}
foo
```

***

```bash {frame="none"}
var=
echo ${var-foo}
```

```txt {frame="none"}
 
```

var 和 DEFAULT 的值有可能相同，因此不能用来判断 var 是否被定义。

### 标记 :+

```bash {frame="none"}
${var:+DEFAULT}
```

* var 未定义：返回空串。
* var 已定义：
  * 是空值：返回空串。
  * 非空值：返回 DEFAULT。

```bash {frame="none"}
var=abc
echo ${var:+foo}
```

```txt {frame="none"}
foo
```

### 标记 :-

```bash {frame="none"}
${var:-DEFAULT}
```

* var 未定义：返回 DEFAULT。
* var 已定义
  * 是空值：返回 DEFAULT。
  * 非空值：返回 var。

```bash {frame="none"}
unset var
echo ${var:-foo}
```

```bash {frame="none"}
var=
echo ${var:-foo}
```

上面的两个例子都会输出 foo。

### 标记 :=

* var 未定义：var=foo，返回 var。
* var 已定义
  * 是空值：var=foo，返回 var。
  * 非空值：返回 var。

```bash {frame="none"}
unset var
echo ${var:=foo}
echo $var
```

```txt {frame="none"}
foo
foo
```

## 字符串操作

### 提取子串

```bash {frame="none"}
var="heybro!"
echo ${var:3:4}
```

```txt {frame="none"}
bro!
```

### 字符串长度

```bash {frame="none"}
var="heybro!"
echo ${#var}
```

```txt {frame="none"}
7
```

### 删除前缀

删除最短匹配：用 `#`，模式 `*/`。

```bash {frame="none"}
var="a/b/c"
echo ${var#*/}
```

```txt {frame="none"}
b/c
```

删除最长匹配：用 `##`，模式 `*/`。

```bash {frame="none"}
var="a/b/c"
echo ${var##*/}
```

```txt {frame="none"}
c
```

### 删除后缀

删除最短匹配：用 `%`，模式 `/*`。

```bash {frame="none"}
var="a/b/c"
echo ${var%/*}
```

```txt {frame="none"}
a/b
```

删除最长匹配：用 `%%`，模式 `/*`。

```bash {frame="none"}
var="a/b/c"
echo ${var%%/*}
```

```txt {frame="none"}
a
```

### 替换第一个子串

```bash {frame="none"}
var="aa bb aa"
echo ${var/aa/cc}
```

```txt {frame="none"}
cc bb aa
```

### 替换所有子串

```bash {frame="none"}
var="aa bb aa"
echo ${var//aa/cc}
```

```txt {frame="none"}
cc bb cc
```
