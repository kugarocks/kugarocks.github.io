## Regular Expression

`gawk` defaults to using ERE mode.

### Basic Usage

First, create the `foo` text file.

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

Here, the entire line is matched, equivalent to `$0`.

### Field-Specific Matching

`$2 ~` specifies the use of the second field for matching.

```bash
gawk 'BEGIN{ FS="," } $2 ~ /^[ab]2/{ print $2 }' foo
```

```txt
a2
b2
```

## Sub

Substitution, replaces the first matched string.

### Basic Syntax

```bash
sub(regex, replacement [, target])
```

* `regex`：The regular expression to match.
* `replacement`：The string to replace the match.
* `target`：Optional, the target string, defaults to `$0`.

Not providing `target` defaults to whole line matching.

### Basic Usage

```bash
echo "aa bb aa" | gawk '{ sub(/aa/, "cc"); print }'
```

```txt
cc bb aa
```

Specify to replace the third column.

```bash
echo "aa bb aa" | gawk '{ sub(/aa/, "cc", $3); print }'
```

```txt
aa bb cc
```

### Special Symbol &

```bash
echo "app cat" | gawk '{ sub(/\w+/, "[&]"); print }'
```

```txt
[app] cat
```

## Gsub

Global Substitution, globally replaces.

### Basic Syntax

```bash
gsub(regex, replacement [, target])
```

* `regex`：The regular expression to match.
* `replacement`：The string to replace the match.
* `target`：Optional, the target string, defaults to `$0`.

Not providing `target` defaults to whole line matching.

### Basic Usage

```bash
echo 'aa bb aa' | gawk '{ gsub("aa", "cc"); print }'
```

```txt
cc bb cc
```

Specify to replace the third column.

```bash
echo 'aa bb aa' | gawk '{ gsub("aa", "cc", $3); print }'
```

```txt
aa bb cc
```

### Special Symbol &

```bash
echo "app cat" | gawk '{ gsub(/\w+/, "[&]"); print }'
```

```txt
[app] [cat]
```

### First Character of a Word

`\<` indicates the start of a word.

```bash
echo 'app cat' | gawk '{ gsub(/\<[a-z]/, "[&]"); print }'
```

```txt
[a]pp [c]at
```

### Last Character of a Word

`\>` indicates the end of a word.

```bash
echo 'app cat' | gawk '{ gsub(/[a-z]\>/, "[&]"); print }'
```

```txt
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

```bash
gensub(regex, replacement, how [, target])
```

* `regex`：The regular expression to match.
* `replacement`：The replacement string, can use capture groups.
* `how`：Can specify global or the Nth match replacement.
* `target`：Optional, the target string, defaults to `$0`.

### Basic Usage

Using `g` for global replacement.

```bash
echo "aa aa aa" | gawk '{ print gensub(/aa/, "bb", "g") }'
```

```txt
bb bb bb
```

Replace the second match.

```bash
echo "aa aa aa" | gawk '{ print gensub(/aa/, "bb", "2") }'
```

```txt
aa bb aa
```

### Using Capture Groups

`\1` represents the first matched parameter.

```bash
echo "aa-bb" | gawk '{ print gensub(/(\w+)-(\w+)/, "\\2:\\1", "g")}'
```

```txt
bb:aa
```
