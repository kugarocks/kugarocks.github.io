---
title: "GREP 命令"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 1200
seo:
  title: "GREP 命令"
  description: ""
  canonical: ""
  noindex: false
---

## 簡介

全稱 **Global Regular Expression Print**，來源於一個 Unix 編輯器 `ed` 中嘅命令 `g/re/p`，
其中 `g`（global）係全局匹配，`re`（regular expression）係正則表達式，`p`（print）係打印。
所以，`grep` 工具本質上就係用嚟全局匹配正則表達式並打印結果。

```bash {frame="none"}
man grep
```

```bash {frame="none"}
grep, egrep, fgrep, rgrep - print lines that match patterns
```

另外 `egrep`、`fgrep` 、`rgrep` 分別同 `grep -E`、`grep -F` 、`grep -r` 一樣。
呢啲變體已經被棄用，但為咗向後兼容仍然提供。
另外如果唔使用正則表達式，**使用 `-F` 選項會快啲**，
因為預設情況下，即使冇使用正則表達式，`grep`  仍然會將模式視為正則表達式。

## 正則表達式

`grep` 預設使用POSIX嘅正則表達式，根據唔同選項分為以下幾種：

1. **基本正則表達式（Basic Regular Expressions，BRE）**：
預設模式，POSIX 標準，某啲元字符（如 `?`、`+`、`{}`）需要通過反斜杠 `\` 嚟轉義。

2. **擴展正則表達式（Extended Regular Expressions，ERE）**：
通過 `grep -E` 或 `egrep` 使用，像 `?`、`+`、`{}` 等元字符可以直接使用，唔使轉義。

3. **Perl 風格嘅正則表達式（Perl-Compatible Regular Expressions，PCRE）**：
某啲 `grep` 實現（如 GNU `grep`）提供咗 `-P` 選項，用於啟用 Perl 風格嘅正則表達式。

{{< callout context="note" title="Note">}}
某啲 grep 實現（如 GNU grep）提供咗 -P 選項，用於啟用 Perl 風格嘅正則表達式。
{{< /callout >}}

## 常用例子

### 反向匹配

```bash {frame="none"}
grep -v foo file
```

### 忽略大小寫

```bash {frame="none"}
grep -i Foo file
```

### 統計匹配行數

```bash {frame="none"}
grep -c foo file
```

### 固定字符串匹配

```bash {frame="none"}
grep -F foo file
```

### 遞歸搜索目錄文件

```bash {frame="none"}
grep -r foo /path
```

### 列出匹配嘅文件名

```bash {frame="none"}
grep -l foo *.txt
```

### 列出唔匹配嘅文件名

```bash {frame="none"}
grep -rL foo /path
```

### 匹配行及後面 N 行

After

```bash {frame="none"}
grep -A 3 foo file
```

### 匹配行及前面 N 行

Before

```bash {frame="none"}
grep -B 3 foo file
```

### 匹配行及前後 N 行

Context

```bash {frame="none"}
grep -C 3 foo file
```

### 匹配多個單詞

```bash {frame="none"}
grep -E 'foo|bar' file
```

```bash {frame="none"}
grep -e 'foo' -e 'bar' file
```

### 排除目錄某啲文件

```bash {frame="none"}
grep foo --exclude="*.log" /path
```

### 匹配目錄某啲文件

```bash {frame="none"}
grep foo --include="*.txt" /path
```
