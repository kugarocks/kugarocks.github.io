---
title: "创建多行文本"
description: ""
summary: ""
date: 2024-09-04T20:00:00+08:00
lastmod: 2024-09-04T20:00:00+08:00
weight: 4000
seo:
  title: "创建多行文本"
  description: ""
  canonical: ""
  noindex: false
---

## ECHO 命令

使用 `-e` 选项可以创建简单的多行文本。

```bash {frame="none"}
echo -e 'aa\nbb'
```

```txt {frame="none"}
aa
bb
```

## Here Document

Here Document（缩写为 Heredoc）是 Shell 中的一种输入重定向方式，
允许在脚本或命令中嵌入多行文本并传递给命令或文件。

### 基本语法

```bash {frame="none"}
command <<EOF
多行文本内容
EOF
```

* `command`：如 `cat`、`sed`、`gawk`。
* `<<EOF`：标记文档的开始并定义结束标记。
* `EOF`：标记文档结束位置。

这里的 `EOF` 只是一个例子，可用任意标记。

### 创建多行文本文件

多行文本可重定向到 `foo.txt` 文件。

```bash {frame="none"}
cat <<EOF > foo.txt
apple
banana
EOF
```

```txt {frame="none"}
cat foo.txt
```

```txt {frame="none"}
apple
banana
```

### 作为命令的输入

```bash {frame="none"}
grep 'app' <<EOF
apple
banana
EOF
```

### 引号的区别

如果 EOF 标记使用引号，功能会有所不同。

| 引号类型 | 变量/特殊字符 |
| --- | --- |
| `EOF` | 解释 |
| `'EOF'` | 不解释 |
| `"EOF"` | 不解释 |

如果内容只是纯文档，尽量使用引号，减少特殊字符的影响。

### 使用引号

单/双引号是一样的，都不会解释 `$` 符号。

```bash {frame="none"}
cat <<'EOF'
$HOME
EOF
```

```txt {frame="none"}
$HOME
```

### 不使用引号

和不使用引号是一样的，会解释 `$` 符号。

```bash {frame="none"}
cat <<EOF
$HOME
EOF
```

```txt {frame="none"}
/home/kuga
```
