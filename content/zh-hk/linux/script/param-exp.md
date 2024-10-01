---
title: "參數展開"
description: ""
summary: ""
date: 2024-09-02T20:00:00+08:00
lastmod: 2024-09-03T20:00:00+08:00
weight: 3800
seo:
  title: "參數展開"
  description: ""
  canonical: ""
  noindex: false
---

## Parameter Expansion

喺 Bash 入面__AB__參數展開係一種用嚟操作同處理變量內容嘅機制。
通過參數展開__AB__可以攞變量嘅值__AB__修改變量嘅值__AB__或者為未設置嘅變量提供默認值。

{{< link-card
  title="Shell Parameter Expansion"
  description="Shell 參數展開"
  href="https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion"
  target="_blank"
>}}

## 變量展開

最常見嘅方式。

```bash {frame="none"}
var="Bash"
echo "Hello, ${var}!"
```

## 默認值展開

### 標記 +

```bash {frame="none"}
${var+DEFAULT}
```

* var 未定義：返回空串。
* var 已定義：
  * 係空值：返回 DEFAULT。
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

**可以用呢個標記嚟判斷變量係咪未定義。**

```bash {frame="none"}
#!/usr/bin/env bash

if [ -n "${var+defined}" ]; then
    echo "var already defined"
else
    echo "var not defined"
fi
```

{{< callout context="danger" title="注意" >}}
如果 `${var+defined}` 冇用雙引號__AB__當返回空字符串嘅時候__AB__條件就會變成 `[ -n ]` __AB__
呢個係一個有效嘅條件__AB__唔會產生任何錯誤__AB__且佢嘅返回值為真。顯然呢個係唔合理嘅__AB__所以必須加雙引號。
{{< /callout >}}

### 標記 -

```bash {frame="none"}
${var-DEFAULT}
```

* var 未定義：返回 DEFAULT。
* var 已定義：
  * 係空值：返回 var。
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

var 同 DEFAULT 嘅值有可能相同__AB__所以唔可以用嚟判斷 var 係咪被定義。

### 標記 :+

```bash {frame="none"}
${var:+DEFAULT}
```

* var 未定義：返回空串。
* var 已定義：
  * 係空值：返回空串。
  * 非空值：返回 DEFAULT。

```bash {frame="none"}
var=abc
echo ${var:+foo}
```

```txt {frame="none"}
foo
```

### 標記 :-

```bash {frame="none"}
${var:-DEFAULT}
```

* var 未定義：返回 DEFAULT。
* var 已定義
  * 係空值：返回 DEFAULT。
  * 非空值：返回 var。

```bash {frame="none"}
unset var
echo ${var:-foo}
```

```bash {frame="none"}
var=
echo ${var:-foo}
```

上面嘅兩個例子都會輸出 foo。

### 標記 :=

* var 未定義：var=foo__AB__返回 var。
* var 已定義
  * 係空值：var=foo__AB__返回 var。
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

### 字符串長度

```bash {frame="none"}
var="heybro!"
echo ${#var}
```

```txt {frame="none"}
7
```

### 刪除前綴

刪除最短匹配：用 `#`__AB__模式 `*/`。

```bash {frame="none"}
var="a/b/c"
echo ${var#*/}
```

```txt {frame="none"}
b/c
```

刪除最長匹配：用 `##`__AB__模式 `*/`。

```bash {frame="none"}
var="a/b/c"
echo ${var##*/}
```

```txt {frame="none"}
c
```

### 刪除後綴

刪除最短匹配：用 `%`__AB__模式 `/*`。

```bash {frame="none"}
var="a/b/c"
echo ${var%/*}
```

```txt {frame="none"}
a/b
```

刪除最長匹配：用 `%%`__AB__模式 `/*`。

```bash {frame="none"}
var="a/b/c"
echo ${var%%/*}
```

```txt {frame="none"}
a
```

### 替換第一個子串

```bash {frame="none"}
var="aa bb aa"
echo ${var/aa/cc}
```

```txt {frame="none"}
cc bb aa
```

### 替換所有子串

```bash {frame="none"}
var="aa bb aa"
echo ${var//aa/cc}
```

```txt {frame="none"}
cc bb cc
```
