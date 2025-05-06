## Introduction

Full name **Global Regular Expression Print**, originated from a Unix editor `ed` command `g/re/p`,
where `g` (global) is global matching, `re` (regular expression) is regular expression, `p` (print) is print.
Therefore, the `grep` tool is essentially used to globally match regular expressions and print the results.

```bash
man grep
```

```bash
grep, egrep, fgrep, rgrep - print lines that match patterns
```

Additionally, `egrep`, `fgrep`, and `rgrep` are respectively equivalent to `grep -E`, `grep -F`, and `grep -r`.
These variants have been deprecated, but are still provided for backward compatibility.
Moreover, if regular expressions are not used, **using the `-F` option will be faster**,
because by default, even if no regular expression is used, `grep` will still treat the pattern as a regular expression.

## Regular Expressions

`grep` defaults to using POSIX regular expressions, divided into the following types based on different options:

1. **Basic Regular Expressions (BRE)**:
Default mode, POSIX standard, some metacharacters (such as `?`, `+`, `{}`) require escaping with a backslash `\`.

2. **Extended Regular Expressions (ERE)**:
Used with `grep -E` or `egrep`, metacharacters like `?`, `+`, `{}` can be used directly without escaping.

3. **Perl-Style Regular Expressions (PCRE)**:
Some `grep` implementations (such as GNU `grep`) provide the `-P` option to enable Perl-style regular expressions.

{{< callout context="note" title="Note">}}
Some grep implementations (such as GNU grep) provide the -P option to enable Perl-style regular expressions.
{{< /callout >}}

## Common Examples

### Reverse Matching

```bash
grep -v foo file
```

### Ignore Case

```bash
grep -i Foo file
```

### Count Matching Lines

```bash
grep -c foo file
```

### Fixed String Matching

```bash
grep -F foo file
```

### Recursive Dir Search

```bash
grep -r foo /path
```

### Matching File Names

```bash
grep -l foo *.txt
```

### Non-Matching File Names

```bash
grep -rL foo /path
```

### With Next N Lines

After

```bash
grep -A 3 foo file
```

### With Previous N Lines

Before

```bash
grep -B 3 foo file
```

### With Context N Lines

Context

```bash
grep -C 3 foo file
```

### Match Multiple Words

```bash
grep -E 'foo|bar' file
```

```bash
grep -e 'foo' -e 'bar' file
```

### Exclude Files in Dir

```bash
grep foo --exclude="*.log" /path
```

### Match Files in Dir

```bash
grep foo --include="*.txt" /path
```
