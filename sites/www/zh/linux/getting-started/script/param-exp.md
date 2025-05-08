# 参数展开

在 Bash 中，参数展开是一种用于操作和处理变量内容的机制。
通过参数展开，可以获取变量的值，修改变量的值，或者为未设置的变量提供默认值。

::: info Shell Parameter Expansion
https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion
:::

## 变量展开

最常见的方式。

```bash
var="Bash"
echo "Hello, ${var}!"
```

## 默认值展开

### 标记 +

```bash
${var+DEFAULT}
```

* var 未定义：返回空串。
* var 已定义：
  * 是空值：返回 DEFAULT。
  * 非空值：返回 DEFAULT。

```bash
unset var
echo ${var+foo}
```

```txt
 
```

***

```bash
var=
echo ${var+foo}
```

```txt
foo
```

**可以用这个标记来判断变量是否未定义。**

```bash
#!/usr/bin/env bash

if [ -n "${var+defined}" ]; then
    echo "var already defined"
else
    echo "var not defined"
fi
```

::: danger
如果 `${var+defined}` 没有使用双引号，当返回空字符串的时候，条件就会变成 `[ -n ]` ，
这是一个有效的条件，不会产生任何错误，且它的返回值为真。显然这是不合理的，因此必须添加双引号。
:::

### 标记 -

```bash
${var-DEFAULT}
```

* var 未定义：返回 DEFAULT。
* var 已定义：
  * 是空值：返回 var。
  * 非空值：返回 var。

```bash
unset var
echo ${var-foo}
```

```txt
foo
```

***

```bash
var=
echo ${var-foo}
```

```txt
 
```

var 和 DEFAULT 的值有可能相同，因此不能用来判断 var 是否被定义。

### 标记 :+

```bash
${var:+DEFAULT}
```

* var 未定义：返回空串。
* var 已定义：
  * 是空值：返回空串。
  * 非空值：返回 DEFAULT。

```bash
var=abc
echo ${var:+foo}
```

```txt
foo
```

### 标记 :-

```bash
${var:-DEFAULT}
```

* var 未定义：返回 DEFAULT。
* var 已定义
  * 是空值：返回 DEFAULT。
  * 非空值：返回 var。

```bash
unset var
echo ${var:-foo}
```

```bash
var=
echo ${var:-foo}
```

上面的两个例子都会输出 foo。

### 标记 :=

* var 未定义：var=foo，返回 var。
* var 已定义
  * 是空值：var=foo，返回 var。
  * 非空值：返回 var。

```bash
unset var
echo ${var:=foo}
echo $var
```

```txt
foo
foo
```

## 字符串操作

### 提取子串

```bash
var="heybro!"
echo ${var:3:4}
```

```txt
bro!
```

### 字符串长度

```bash
var="heybro!"
echo ${#var}
```

```txt
7
```

### 删除前缀

删除最短匹配：用 `#`，模式 `*/`。

```bash
var="a/b/c"
echo ${var#*/}
```

```txt
b/c
```

删除最长匹配：用 `##`，模式 `*/`。

```bash
var="a/b/c"
echo ${var##*/}
```

```txt
c
```

### 删除后缀

删除最短匹配：用 `%`，模式 `/*`。

```bash
var="a/b/c"
echo ${var%/*}
```

```txt
a/b
```

删除最长匹配：用 `%%`，模式 `/*`。

```bash
var="a/b/c"
echo ${var%%/*}
```

```txt
a
```

### 替换第一个子串

```bash
var="aa bb aa"
echo ${var/aa/cc}
```

```txt
cc bb aa
```

### 替换所有子串

```bash
var="aa bb aa"
echo ${var//aa/cc}
```

```txt
cc bb cc
```
