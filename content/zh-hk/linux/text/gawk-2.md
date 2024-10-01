---
title: "GAWK 命令 - 2"
description: ""
summary: ""
date: 2024-09-05T20:00:00+08:00
lastmod: 2024-09-05T20:00:00+08:00
weight: 4400
seo:
  title: "GAWK 命令 - 2"
  description: ""
  canonical: ""
  noindex: false
---

## 正則匹配

`gawk` 默認使用 ERE 模式。

### 基礎用法

首先創建 `foo` 文本文件。

```bash {frame="none"}
cat <<EOF > foo
a1,a2,a3
b1,b2,b3
EOF
```

```bash {frame="none"}
gawk -F, '/1,a/{ print $1 }' foo
```

```txt {frame="none"}
a1
```

呢度係用**整行**去匹配嘅__AB__等價於 `$0`。

### 指定字段匹配

`$2 ~` 指定咗使用第 2 個字段匹配。

```bash {frame="none"}
gawk 'BEGIN{ FS="," } $2 ~ /^[ab]2/{ print $2 }' foo
```

```txt {frame="none"}
a2
b2
```

## sub

Substitution__AB__替換第一個匹配嘅字符串。

### 基本語法

```bash {frame="none"}
sub(regex, replacement [, target])
```

* `regex`：匹配嘅正則表達式。
* `replacement`：替換匹配嘅字符串。
* `target`：可選__AB__目標字符串__AB__默認 `$0`。

唔提供 `target`__AB__默認係整行匹配。

### 基礎用法

```bash {frame="none"}
echo "aa bb aa" | gawk '{ sub(/aa/, "cc"); print }'
```

```txt {frame="none"}
cc bb aa
```

指定替換第 3 列。

```bash {frame="none"}
echo "aa bb aa" | gawk '{ sub(/aa/, "cc", $3); print }'
```

```txt {frame="none"}
aa bb cc
```

### 特殊符號 &

```bash {frame="none"}
echo "app cat" | gawk '{ sub(/\w+/, "[&]"); print }'
```

```txt {frame="none"}
[app] cat
```

## gsub

Global Substitution__AB__全局替換。

### 基本語法

```bash {frame="none"}
gsub(regex, replacement [, target])
```

* `regex`：匹配嘅正則表達式。
* `replacement`：替換匹配嘅字符串。
* `target`：可選__AB__目標字符串__AB__默認 `$0`。

唔提供 `target`__AB__默認係整行匹配。

### 基礎用法

```bash {frame="none"}
echo 'aa bb aa' | gawk '{ gsub("aa", "cc"); print }'
```

```txt {frame="none"}
cc bb cc
```

指定替換第 3 列。

```bash {frame="none"}
echo 'aa bb aa' | gawk '{ gsub("aa", "cc", $3); print }'
```

```txt {frame="none"}
aa bb cc
```

### 特殊符號 &

```bash {frame="none"}
echo "app cat" | gawk '{ gsub(/\w+/, "[&]"); print }'
```

```txt {frame="none"}
[app] [cat]
```

### 匹配單詞首字符

`\<` 表示單詞嘅開頭。

```bash {frame="none"}
echo 'app cat' | gawk '{ gsub(/\<[a-z]/, "[&]"); print }'
```

```txt {frame="none"}
[a]pp [c]at
```

### 匹配單詞尾字符

`\>` 表示單詞嘅結尾。

```bash {frame="none"}
echo 'app cat' | gawk '{ gsub(/[a-z]\>/, "[&]"); print }'
```

```txt {frame="none"}
ap[p] ca[t]
```

## gensub

General Substitution__AB__通用替換。

* 比 `sub` 同 `gsub` 強大。
* 支持捕獲組（Capture Groups）。
* 可選擇替換特定匹配項。
* 唔原地修改__AB__返回替換後嘅字符串。
* `sub` 同 `gsub` 唔支持捕獲組。

### 基本語法

```bash {frame="none"}
gensub(regex, replacement, how [, target])
```

* `regex`：匹配嘅正則表達式。
* `replacement`：替換字符串__AB__可用捕獲組。
* `how`：可指定全局或第 N 次匹配替換。
* `target`：可選__AB__目標字符串__AB__默認 `$0`。

### 基礎用法

使用 `g` 全局替換。

```bash {frame="none"}
echo "aa aa aa" | gawk '{ print gensub(/aa/, "bb", "g") }'
```

```txt {frame="none"}
bb bb bb
```

替換第 2 個匹配項。

```bash {frame="none"}
echo "aa aa aa" | gawk '{ print gensub(/aa/, "bb", "2") }'
```

```txt {frame="none"}
aa bb aa
```

### 使用捕獲組

`\1` 表示第一個匹配參數。

```bash {frame="none"}
echo "aa-bb" | gawk '{ print gensub(/(\w+)-(\w+)/, "\\2:\\1", "g")}'
```

```txt {frame="none"}
bb:aa
```
