# GREP

全称 **Global Regular Expression Print**，来源于一个 Unix 编辑器 `ed` 中的命令 `g/re/p`，
其中 `g`（global）是全局匹配，`re`（regular expression）是正则表达式，`p`（print）是打印。
因此，`grep` 工具本质上就是用来全局匹配正则表达式并打印结果。

```bash
man grep
```

```bash
grep, egrep, fgrep, rgrep - print lines that match patterns
```

另外 `egrep`、`fgrep` 、`rgrep` 分别与 `grep -E`、`grep -F` 、`grep -r` 相同。
这些变体已被弃用，但为了向后兼容仍然提供。
另外如果不使用正则表达式，**使用 `-F` 选项会更快**，
因为默认情况下，即使没有使用正则表达式，`grep`  仍然会将模式视为正则表达式。

## 正则表达式

`grep` 默认使用POSIX的正则表达式，根据不同选项分为以下几种：

1. **基本正则表达式（Basic Regular Expressions，BRE）**：
默认模式，POSIX 标准，某些元字符（如 `?`、`+`、`{}`）需要通过反斜杠 `\` 来转义。

2. **扩展正则表达式（Extended Regular Expressions，ERE）**：
通过 `grep -E` 或 `egrep` 使用，像 `?`、`+`、`{}` 等元字符可以直接使用，无需转义。

3. **Perl 风格的正则表达式（Perl-Compatible Regular Expressions，PCRE）**：
某些 `grep` 实现（如 GNU `grep`）提供了 `-P` 选项，用于启用 Perl 风格的正则表达式。

::: warning
某些 grep 实现（如 GNU grep）提供了 -P 选项，用于启用 Perl 风格的正则表达式。
:::

## 常用例子

### 反向匹配

```bash
grep -v foo file
```

### 忽略大小写

```bash
grep -i Foo file
```

### 统计匹配行数

```bash
grep -c foo file
```

### 固定字符串匹配

```bash
grep -F foo file
```

### 递归搜索目录文件

```bash
grep -r foo /path
```

### 列出匹配的文件名

```bash
grep -l foo *.txt
```

### 列出不匹配的文件名

```bash
grep -rL foo /path
```

### 匹配行及后面 N 行

After

```bash
grep -A 3 foo file
```

### 匹配行及前面 N 行

Before

```bash
grep -B 3 foo file
```

### 匹配行及前后 N 行

Context

```bash
grep -C 3 foo file
```

### 匹配多个单词

```bash
grep -E 'foo|bar' file
```

```bash
grep -e 'foo' -e 'bar' file
```

### 排除目录某些文件

```bash
grep foo --exclude="*.log" /path
```

### 匹配目录某些文件

```bash
grep foo --include="*.txt" /path
```
