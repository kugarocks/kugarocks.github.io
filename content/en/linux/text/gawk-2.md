---
title: "GAWK-2"
description: ""
summary: ""
date: 2024-09-05T20:00:00+08:00
lastmod: 2024-09-05T20:00:00+08:00
weight: 4400
seo:
  title: "GAWK-2"
  description: ""
  canonical: ""
  noindex: false
---

## Regular Expression

`gawk` defaults to using ERE mode.

### Basic Usage

First, create the `foo` text file.

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

Here, the entire line is matched, equivalent to `$0`.

### Field-Specific Matching

`$2 ~` specifies the use of the second field for matching.

```bash {frame="none"}
gawk 'BEGIN{ FS="," } $2 ~ /^[ab]2/{ print $2 }' foo
```

```txt {frame="none"}
a2
b2
```

## Sub

Substitution, replaces the first matched string.

### Basic Syntax

```bash {frame="none"}
sub(regex, replacement [, target])
```

* `regex`：The regular expression to match.
* `replacement`：The string to replace the match.
* `target`：Optional, the target string, defaults to `$0`.

Not providing `target` defaults to whole line matching.

### Basic Usage

```bash {frame="none"}
echo "aa bb aa" | gawk '{ sub(/aa/, "cc"); print }'
```

```txt {frame="none"}
cc bb aa
```

Specify to replace the third column.

```bash {frame="none"}
echo "aa bb aa" | gawk '{ sub(/aa/, "cc", $3); print }'
```

```txt {frame="none"}
aa bb cc
```

### Special Symbol &

```bash {frame="none"}
echo "app cat" | gawk '{ sub(/\w+/, "[&]"); print }'
```

```txt {frame="none"}
[app] cat
```

## Gsub

Global Substitution, globally replaces.

### Basic Syntax

```bash {frame="none"}
gsub(regex, replacement [, target])
```

* `regex`：The regular expression to match.
* `replacement`：The string to replace the match.
* `target`：Optional, the target string, defaults to `$0`.

Not providing `target` defaults to whole line matching.

### Basic Usage

```bash {frame="none"}
echo 'aa bb aa' | gawk '{ gsub("aa", "cc"); print }'
```

```txt {frame="none"}
cc bb cc
```

Specify to replace the third column.

```bash {frame="none"}
echo 'aa bb aa' | gawk '{ gsub("aa", "cc", $3); print }'
```

```txt {frame="none"}
aa bb cc
```

### Special Symbol &

```bash {frame="none"}
echo "app cat" | gawk '{ gsub(/\w+/, "[&]"); print }'
```

```txt {frame="none"}
[app] [cat]
```

### First Character of a Word

`\<` indicates the start of a word.

```bash {frame="none"}
echo 'app cat' | gawk '{ gsub(/\<[a-z]/, "[&]"); print }'
```

```txt {frame="none"}
[a]pp [c]at
```

### Last Character of a Word

`\>` indicates the end of a word.

```bash {frame="none"}
echo 'app cat' | gawk '{ gsub(/[a-z]\>/, "[&]"); print }'
```

```txt {frame="none"}
ap[p] ca[t]
```

## Gensub

General Substitution, general replacement.

* More powerful than `sub` and `gsub`.
* Supports capture groups.
* Can choose to replace specific matches.
* Does not modify the original, returns the replaced string.
* `sub` and `gsub` do not support capture groups.

### Basic Syntax

```bash {frame="none"}
gensub(regex, replacement, how [, target])
```

* `regex`：The regular expression to match.
* `replacement`：The replacement string, can use capture groups.
* `how`：Can specify global or the Nth match replacement.
* `target`：Optional, the target string, defaults to `$0`.

### Basic Usage

Using `g` for global replacement.

```bash {frame="none"}
echo "aa aa aa" | gawk '{ print gensub(/aa/, "bb", "g") }'
```

```txt {frame="none"}
bb bb bb
```

Replace the second match.

```bash {frame="none"}
echo "aa aa aa" | gawk '{ print gensub(/aa/, "bb", "2") }'
```

```txt {frame="none"}
aa bb aa
```

### Using Capture Groups

`\1` represents the first matched parameter.

```bash {frame="none"}
echo "aa-bb" | gawk '{ print gensub(/(\w+)-(\w+)/, "\\2:\\1", "g")}'
```

```txt {frame="none"}
bb:aa
```
