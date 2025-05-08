# GAWK 2

## 正则匹配

`gawk` 默认使用 ERE 模式。

### 基础用法

首先创建 `foo` 文本文件。

```bash
cat <<EOF > foo
a1,a2,a3
b1,b2,b3
EOF
```

```bash
gawk -F, '/1,a/{ print $1 }' foo
```

```txt
a1
```

这里是用**整行**去匹配的，等价于 `$0`。

### 指定字段匹配

`$2 ~` 指定了使用第 2 个字段匹配。

```bash
gawk 'BEGIN{ FS="," } $2 ~ /^[ab]2/{ print $2 }' foo
```

```txt
a2
b2
```

## sub

Substitution，替换第一个匹配的字符串。

### 基本语法

```bash
sub(regex, replacement [, target])
```

* `regex`：匹配的正则表达式。
* `replacement`：替换匹配的字符串。
* `target`：可选，目标字符串，默认 `$0`。

不提供 `target`，默认是整行匹配。

### 基础用法

```bash
echo "aa bb aa" | gawk '{ sub(/aa/, "cc"); print }'
```

```txt
cc bb aa
```

指定替换第 3 列。

```bash
echo "aa bb aa" | gawk '{ sub(/aa/, "cc", $3); print }'
```

```txt
aa bb cc
```

### 特殊符号 &

```bash
echo "app cat" | gawk '{ sub(/\w+/, "[&]"); print }'
```

```txt
[app] cat
```

## gsub

Global Substitution，全局替换。

### 基本语法

```bash
gsub(regex, replacement [, target])
```

* `regex`：匹配的正则表达式。
* `replacement`：替换匹配的字符串。
* `target`：可选，目标字符串，默认 `$0`。

不提供 `target`，默认是整行匹配。

### 基础用法

```bash
echo 'aa bb aa' | gawk '{ gsub("aa", "cc"); print }'
```

```txt
cc bb cc
```

指定替换第 3 列。

```bash
echo 'aa bb aa' | gawk '{ gsub("aa", "cc", $3); print }'
```

```txt
aa bb cc
```

### 特殊符号 &

```bash
echo "app cat" | gawk '{ gsub(/\w+/, "[&]"); print }'
```

```txt
[app] [cat]
```

### 匹配单词首字符

`\<` 表示单词的开头。

```bash
echo 'app cat' | gawk '{ gsub(/\<[a-z]/, "[&]"); print }'
```

```txt
[a]pp [c]at
```

### 匹配单词尾字符

`\>` 表示单词的结尾。

```bash
echo 'app cat' | gawk '{ gsub(/[a-z]\>/, "[&]"); print }'
```

```txt
ap[p] ca[t]
```

## gensub

General Substitution，通用替换。

* 比 `sub` 和 `gsub` 强大。
* 支持捕获组（Capture Groups）。
* 可选择替换特定匹配项。
* 不原地修改，返回替换后的字符串。
* `sub` 和 `gsub` 不支持捕获组。

### 基本语法

```bash
gensub(regex, replacement, how [, target])
```

* `regex`：匹配的正则表达式。
* `replacement`：替换字符串，可用捕获组。
* `how`：可指定全局或第 N 次匹配替换。
* `target`：可选，目标字符串，默认 `$0`。

### 基础用法

使用 `g` 全局替换。

```bash
echo "aa aa aa" | gawk '{ print gensub(/aa/, "bb", "g") }'
```

```txt
bb bb bb
```

替换第 2 个匹配项。

```bash
echo "aa aa aa" | gawk '{ print gensub(/aa/, "bb", "2") }'
```

```txt
aa bb aa
```

### 使用捕获组

`\1` 表示第一个匹配参数。

```bash
echo "aa-bb" | gawk '{ print gensub(/(\w+)-(\w+)/, "\\2:\\1", "g")}'
```

```txt
bb:aa
```
