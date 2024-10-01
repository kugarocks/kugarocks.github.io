---
title: "正則表達式"
description: ""
summary: ""
date: 2024-09-04T20:00:00+08:00
lastmod: 2024-09-04T20:00:00+08:00
weight: 4100
seo:
  title: "正則表達式"
  description: ""
  canonical: ""
  noindex: false
---

## 簡介

正則表達式（Regular Expressions, regex）根據唔同嘅標準可以分為以下幾類。

| 類型 | 縮寫 | 全稱 |
| --- | --- | --- |
| 基本正則表達式 | BRE | BRE__AB__Basic Regular Expressions |
| 擴展正則表達式 | ERE | ERE__AB__Extended Regular Expressions |
| Perl 正則表達式 | PCRE | Perl-Compatible Regular Expressions |
| POSIX 正則表達式 | BRE & ERE | BRE & ERE |

BRE 同 ERE 係 POSIX 標準入面嘅兩種正則表達式__AB__
BRE 比較基礎__AB__需要對某啲元字符轉義__AB__ERE 係 BRE 嘅擴展__AB__提供咗更多嘅元字符同功能。
PCRE 係一種功能更強大、語法更靈活嘅正則表達式類型__AB__
廣泛用於現代編程語言如：Python、Ruby、Javascript。

## SED 命令

支持 BRE 同 ERE__AB__默認使用 BRE。

### BRE 模式

呢種模式需要對元字符進行轉義__AB__例如：

* `)`：需要使用 `\)` 轉義。
* `|`：需要使用 `\|` 轉義。

```bash {frame="none"}
echo 'abc' | sed 's/\(b\|c\)/p/g'
```

```txt {frame="none"}
app
```

### ERE 模式

使用 `-E` 或 `-r` 選項啟用 ERE__AB__唔需要轉義元字符。

```bash {frame="none"}
echo 'abc' | sed -E 's/(b|c)/p/g'
```

```txt {frame="none"}
app
```

## GAWK

默認使用 ERE 模式。

```bash {frame="none"}
echo 'abc' | gawk '{gsub(/(b|c)/, "p"); print }'
```

```txt {frame="none"}
app
```

## 特殊字符

有特殊含意嘅字符__AB__需要轉義。

```txt {frame="none"}
.*[]^${}\+?|()
```

雖然 `/` 唔係正則表達式特殊字符__AB__但喺 `sed` 同 `gawk` 入面都要轉義。

### 行首 ^

匹配行嘅首部位置。

```bash {frame="none"}
echo 'aa bb' | sed -n '/^aa/p'
```

如果 `^` 唔係出現喺開頭__AB__則同普通字符一樣__AB__無須轉義。

```bash {frame="none"}
echo 'aa b^b' | sed -n '/b^/p'
```

### 行尾 $

匹配行嘅尾部位置。

```bash {frame="none"}
echo 'aa bb' | sed -n '/bb$/p'
```

如果 `$` 唔係出現喺結尾__AB__則同普通字符一樣__AB__無須轉義。

```bash {frame="none"}
echo 'aa b$b' | sed -n '/b$b/p'
```

### 點字符 \.

匹配除換行符外嘅任意單個字符。

```bash {frame="none"}
echo 'abc' | sed -n '/a.c/p'
```

### 字符組 []

Character Class__AB__可以匹配組內任一字符。

```bash {frame="none"}
echo 'cat' | sed -n '/[ch]at/p'
```

```bash {frame="none"}
echo 'yes' | sed -n '/[Yy][Ee][Ss]/p'
```

排除組內字符。

```bash {frame="none"}
echo 'bat' | sed -n '/[^ch]at/p'
```

匹配 `c` - `e` 之間嘅字符。

```bash {frame="none"}
echo 'cat' | sed -n '/[c-e]at/p'
```

匹配 `c` - `e` 或 `0` - `9` 之間嘅字符。

```bash {frame="none"}
echo 'cat' | sed -n '/[c-e0-9]at/p'
```

### 星號 *

匹配 `*` 號前面嘅字符 0 次或多次。

```bash {frame="none"}
echo '24' | sed -n '/23*4/p'
```

```bash {frame="none"}
echo '234' | sed -n '/23*4/p'
```

```bash {frame="none"}
echo '2334' | sed -n '/23*4/p'
```

```bash {frame="none"}
echo 'bat' | sed -n '/b[ae]*/p'
```

```bash {frame="none"}
echo 'baaeeaet' | sed -n '/b[ae]*/p'
```

以上例子都係可以成功匹配嘅。

### 問號 ?

匹配 `?` 號前面嘅字符 0 次或 1 次。

```bash {frame="none"}
echo 'at' | sed -En '/c?at/p'
```

```bash {frame="none"}
echo 'ccbbat' | sed -En '/c?at/p'
```

上面嘅例子都係可以匹配嘅__AB__可以用 ^ 限制。

```bash {frame="none"}
echo 'ccbbat' | sed -En '/^c?at/p'
```

上面只能匹配 at 或 cat。

### 加號 +

匹配 `+` 號前面嘅字符 1 次或多次。

```bash {frame="none"}
echo 'at' | sed -En '/c+at/p'
```

### 區間 {}

指定 `{}` 前面字符嘅匹配次數。

```bash {frame="none"}
echo 'cat' | sed -En '/^c{1}at/p'
```

```bash {frame="none"}
echo 'ccat' | sed -En '/^c{1,2}at/p'
```

### 竪線 |

表示或邏輯。

```bash {frame="none"}
echo 'cat' | sed -En '/cat|hat/p'
```

### 分組 ()

分組可以視為一個整體。

```bash {frame="none"}
echo 'cat' | sed -En '/(c|h)at/p'
```

```bash {frame="none"}
echo 'Sun' | sed -En '/(S|s)un(day)?/p'
```
