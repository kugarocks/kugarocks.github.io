# 正则表达式

正则表达式（Regular Expressions, regex）根据不同的标准可分为以下几类。

| 类型 | 缩写 | 全称 |
| --- | --- | --- |
| 基本正则表达式 | BRE | BRE，Basic Regular Expressions |
| 扩展正则表达式 | ERE | ERE，Extended Regular Expressions |
| Perl 正则表达式 | PCRE | Perl-Compatible Regular Expressions |
| POSIX 正则表达式 | BRE & ERE | BRE & ERE |

BRE 和 ERE 是 POSIX 标准中的两种正则表达式，
BRE 较为基础，需要对某些元字符转义，ERE 是 BRE 的扩展，提供了更多的元字符和功能。
PCRE 是一种功能更强大、语法更灵活的正则表达式类型，
广泛用于现代编程语言如：Python、Ruby、Javascript。

## SED 命令

支持 BRE 和 ERE，默认使用 BRE。

### BRE 模式

这种模式需要对元字符进行转义，例如：

* `)`：需要使用 `\)` 转义。
* `|`：需要使用 `\|` 转义。

```bash
echo 'abc' | sed 's/\(b\|c\)/p/g'
```

```txt
app
```

### ERE 模式

使用 `-E` 或 `-r` 选项启用 ERE，不需要转义元字符。

```bash
echo 'abc' | sed -E 's/(b|c)/p/g'
```

```txt
app
```

## GAWK

默认使用 ERE 模式。

```bash
echo 'abc' | gawk '{gsub(/(b|c)/, "p"); print }'
```

```txt
app
```

## 特殊字符

有特殊含意的字符，需要转义。

```txt
.*[]^${}\+?|()
```

虽然 `/` 不是正则表达式特殊字符，但在 `sed` 和 `gawk` 中也要转义。

### 行首 ^

匹配行的首部位置。

```bash
echo 'aa bb' | sed -n '/^aa/p'
```

如果 `^` 不是出现在开头，则和普通字符一样，无须转义。

```bash
echo 'aa b^b' | sed -n '/b^/p'
```

### 行尾 $

匹配行的尾部位置。

```bash
echo 'aa bb' | sed -n '/bb$/p'
```

如果 `$` 不是出现在结尾，则和普通字符一样，无须转义。

```bash
echo 'aa b$b' | sed -n '/b$b/p'
```

### 点字符 \.

匹配除换行符外的任意单个字符。

```bash
echo 'abc' | sed -n '/a.c/p'
```

### 字符组 []

Character Class，可匹配组内任一字符。

```bash
echo 'cat' | sed -n '/[ch]at/p'
```

```bash
echo 'yes' | sed -n '/[Yy][Ee][Ss]/p'
```

排除组内字符。

```bash
echo 'bat' | sed -n '/[^ch]at/p'
```

匹配 `c` - `e` 之间的字符。

```bash
echo 'cat' | sed -n '/[c-e]at/p'
```

匹配 `c` - `e` 或 `0` - `9` 之间的字符。

```bash
echo 'cat' | sed -n '/[c-e0-9]at/p'
```

### 星号 *

匹配 `*` 号前面的字符 0 次或多次。

```bash
echo '24' | sed -n '/23*4/p'
```

```bash
echo '234' | sed -n '/23*4/p'
```

```bash
echo '2334' | sed -n '/23*4/p'
```

```bash
echo 'bat' | sed -n '/b[ae]*/p'
```

```bash
echo 'baaeeaet' | sed -n '/b[ae]*/p'
```

以上例子都是可以成功匹配的。

### 问号 ?

匹配 `?` 号前面的字符 0 次或 1 次。

```bash
echo 'at' | sed -En '/c?at/p'
```

```bash
echo 'ccbbat' | sed -En '/c?at/p'
```

上面的例子都是可以匹配的，可以用 ^ 限制。

```bash
echo 'ccbbat' | sed -En '/^c?at/p'
```

上面只能匹配 at 或 cat。

### 加号 +

匹配 `+` 号前面的字符 1 次或多次。

```bash
echo 'at' | sed -En '/c+at/p'
```

### 区间 {}

指定 `{}` 前面字符的匹配次数。

```bash
echo 'cat' | sed -En '/^c{1}at/p'
```

```bash
echo 'ccat' | sed -En '/^c{1,2}at/p'
```

### 竖线 |

表示或逻辑。

```bash
echo 'cat' | sed -En '/cat|hat/p'
```

### 分组 ()

分组可视为一个整体。

```bash
echo 'cat' | sed -En '/(c|h)at/p'
```

```bash
echo 'Sun' | sed -En '/(S|s)un(day)?/p'
```
