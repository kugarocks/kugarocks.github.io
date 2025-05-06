## Echo Command

Using the `-e` option can create simple multi-line text.

```bash
echo -e 'aa\nbb'
```

```txt
aa
bb
```

## Here Document

Here Document (abbreviated as Heredoc) is a way of input redirection in Shell,
allowing you to embed multi-line text within scripts or commands and pass it to commands or files.

### Basic Syntax

```bash
command <<EOF
Multi-line text content
EOF
```

* `command`：such as `cat`, `sed`, `gawk`.
* `<<EOF`：marks the beginning of the document and defines the end marker.
* `EOF`：marks the end position of the document.

Here, `EOF` is just an example, and any marker can be used.

### Multi-Line Text File

Multi-line text can be redirected to the `foo.txt` file.

```bash
cat <<EOF > foo.txt
apple
banana
EOF
```

```txt
cat foo.txt
```

```txt
apple
banana
```

### As Input to a Command

```bash
grep 'app' <<EOF
apple
banana
EOF
```

### Difference of Quotes

If the EOF marker is used with quotes, the function will be different.

| Quote Type | Variable/Special Character |
| --- | --- |
| `EOF` | Interpret |
| `'EOF'` | Do Not Interpret |
| `"EOF"` | Do Not Interpret |

If the content is just a pure document, try to use quotes to reduce the impact of special characters.

### Using Quotes

Single/double quotes are the same, and neither will interpret the `$` symbol.

```bash
cat <<'EOF'
$HOME
EOF
```

```txt
$HOME
```

### Not Using Quotes

And not using quotes is the same, and will interpret the `$` symbol.

```bash
cat <<EOF
$HOME
EOF
```

```txt
/home/kuga
```
