---
title: "Regular Expression"
description: ""
summary: ""
date: 2024-09-04T20:00:00+08:00
lastmod: 2024-09-04T20:00:00+08:00
weight: 4100
seo:
  title: "Regular Expression"
  description: ""
  canonical: ""
  noindex: false
---

## Introduction

Regular Expressions (regex) can be divided into the following categories based on different standards.

| Type | Abbr | Full Name |
| --- | --- | --- |
| Basic Regular Expressions | BRE | Basic Regular Expressions |
| Extended Regular Expressions | ERE | Extended Regular Expressions |
| Perl Regular Expressions | PCRE | Perl-Compatible Regular Expressions |
| POSIX Regular Expressions | BRE & ERE | BRE & ERE |

BRE and ERE are two types of regular expressions in the POSIX standard,
BRE is more basic and requires escaping certain metacharacters, ERE is an extension of BRE, providing more metacharacters and functions.
PCRE is a more powerful and flexible type of regular expression,
widely used in modern programming languages such as: Python, Ruby, Javascript.

## SED Command

Supports BRE and ERE, defaults to BRE.

### BRE Pattern

This pattern requires escaping metacharacters, for example:

* `)`：needs to be escaped with `\)`。
* `|`：needs to be escaped with `\|`。

```bash {frame="none"}
echo 'abc' | sed 's/\(b\|c\)/p/g'
```

```txt {frame="none"}
app
```

### ERE Pattern

Enables ERE using the `-E` or `-r` option, no need to escape metacharacters.

```bash {frame="none"}
echo 'abc' | sed -E 's/(b|c)/p/g'
```

```txt {frame="none"}
app
```

## GAWK

Defaults to ERE mode.

```bash {frame="none"}
echo 'abc' | gawk '{gsub(/(b|c)/, "p"); print }'
```

```txt {frame="none"}
app
```

## Special Characters

Characters with special meanings, need to be escaped.

```txt {frame="none"}
.*[]^${}\+?|()
```

Although `/` is not a special character in regular expressions, it also needs to be escaped in `sed` and `gawk`.

### Line Start ^

Matches the start position of a line.

```bash {frame="none"}
echo 'aa bb' | sed -n '/^aa/p'
```

If `^` is not at the beginning, it is treated as a normal character, no need to escape.

```bash {frame="none"}
echo 'aa b^b' | sed -n '/b^/p'
```

### Line End $

Matches the end position of a line.

```bash {frame="none"}
echo 'aa bb' | sed -n '/bb$/p'
```

If `$` is not at the end, it is treated as a normal character, no need to escape.

```bash {frame="none"}
echo 'aa b$b' | sed -n '/b$b/p'
```

### Dot Character \.

Matches any single character except newline.

```bash {frame="none"}
echo 'abc' | sed -n '/a.c/p'
```

### Character Group []

Character Class, can match any character within the group.

```bash {frame="none"}
echo 'cat' | sed -n '/[ch]at/p'
```

```bash {frame="none"}
echo 'yes' | sed -n '/[Yy][Ee][Ss]/p'
```

Excludes characters within the group.

```bash {frame="none"}
echo 'bat' | sed -n '/[^ch]at/p'
```

Matches characters between `c` and `e`.

```bash {frame="none"}
echo 'cat' | sed -n '/[c-e]at/p'
```

Matches characters between `c` and `e` or `0` and `9`.

```bash {frame="none"}
echo 'cat' | sed -n '/[c-e0-9]at/p'
```

### Asterisk *

Matches the character before the `*` 0 or more times.

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

All the above examples can be successfully matched.

### Question Mark ?

Matches the character before the `?` 0 or 1 time.

```bash {frame="none"}
echo 'at' | sed -En '/c?at/p'
```

```bash {frame="none"}
echo 'ccbbat' | sed -En '/c?at/p'
```

The above examples can be matched, can be limited with ^.

```bash {frame="none"}
echo 'ccbbat' | sed -En '/^c?at/p'
```

Above can only match at or cat.

### Plus +

Matches the character before the `+` 1 or more times.

```bash {frame="none"}
echo 'at' | sed -En '/c+at/p'
```

### Interval {}

Specifies the number of matches for the character before `{}`.

```bash {frame="none"}
echo 'cat' | sed -En '/^c{1}at/p'
```

```bash {frame="none"}
echo 'ccat' | sed -En '/^c{1,2}at/p'
```

### Vertical Line |

Represents the OR logic.

```bash {frame="none"}
echo 'cat' | sed -En '/cat|hat/p'
```

### Grouping ()

Grouping can be viewed as a whole.

```bash {frame="none"}
echo 'cat' | sed -En '/(c|h)at/p'
```

```bash {frame="none"}
echo 'Sun' | sed -En '/(S|s)un(day)?/p'
```
