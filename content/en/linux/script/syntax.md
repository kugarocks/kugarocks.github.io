---
title: "Basic Syntax"
description: ""
summary: ""
date: 2024-08-30T20:00:00+08:00
lastmod: 2024-08-30T20:00:00+08:00
weight: 3100
seo:
  title: "Basic Syntax"
  description: ""
  canonical: ""
  noindex: false
---

## Shebang

```bash {frame="none"}
#!/usr/bin/env bash
```

## Variable Assignment

No spaces are allowed around the `=` sign.

```bash {frame="none"}
name=foo
```

## Double Quotes

Can interpret variables.

```bash {frame="none"}
name=foo
echo "hello, $name" # hello, foo
echo "hello, \$\$"  # hello, $$
echo "hello, \"\""  # hello, ""
```

## Single Quotes

Do not interpret variables, except for single quotes as special characters.

```bash {frame="none"}
name=foo
echo 'hello, $name' # hello, $name
echo 'hello, $$'    # hello, $$
echo 'hello, ""'    # hello, ""
```

To output single quotes, you need to close single quotes first.

```bash {frame="none"}
echo 'I'\''m fine'  # I'm fine
```

## Command Substitution

There are two ways to use **backticks** and **`$()`**.

```bash {frame="none"}
result=`date`
```

```bash {frame="none"}
result=$(date)
```

It is recommended to use `$()`, which is more readable, with more examples as follows:

```bash {frame="none"}
echo "dir is: $(pwd)"
```

```bash {frame="none"}
count=$(ls $(pwd) | wc -l)
```

[Here, `ls` did not use the `-l` option, but the value of count is 4, the reason is here.](/en/linux/cmd/common-1/#hidden-character)

## Output Redirection

Standard output redirection `>`, creates a new file or overwrites an existing one.

```bash {frame="none"}
cmd > file
```

Append output redirection `>>`.

```bash {frame="none"}
cmd >> file
```

Standard error redirection `2>`, creates a new file or overwrites an existing one.

```bash {frame="none"}
cmd 2> file
```

Standard output and error redirection to different files.

```bash {frame="none"}
cmd > foo.log 2> bar.log
```

Standard output and error redirection to the same file.

```bash {frame="none"}
ls 404 > foobar.log 2>&1
```

## Input Redirection

Common way, using `<` symbol.

```bash {frame="none"}
echo "a b c" > foo
```

```bash {frame="none"}
wc < foo
```

```bash {frame="none"}
1 3 6
```

Inline redirection, Inline Input Redirection.

```bash {frame="none"}
wc << FOO
apple
banana
cat
FOO
```

```bash {frame="none"}
3       3      17
```

FOO is a custom marker, used for multi-line input.

## EXPR Command

The inhumane math operation command, spaces around the `+` sign cannot be less.

```bash {frame="none"}
expr 2 + 5
```

The `*` sign is a wildcard, and it needs to be escaped.

```bash {frame="none"}
expr 2 \* 5
```

Only integer division is supported, no floating-point numbers.

```bash {frame="none"}
expr 24 / 10
```

## Brackets

You can use `[]` to perform mathematical operations.

```bash {frame="none"}
var1=$[1+5*2]
var2=$[2*(3+2)]
```

## BC Calculator

A precise math operation calculator, full name **Basic/Bench Calculator.**

### Interactive Mode

```bash {frame="none"}
bc
```

```bash {frame="none"}
Copyright 1991-1994, 1997, 1998, 2000, 2004, 2006, 2008, 2012-2017 Free Software Foundation, Inc.
This is free software with ABSOLUTELY NO WARRANTY.
For details type `warranty'.
```

```bash {frame="none"}
4*2.5
10.0
quit
```

The `-q` option does not print the above English welcome message.

```bash {frame="none"}
bc -q
```

### Floating Point

You can directly use floating-point numbers for calculations.

```bash {frame="none"}
2.5*5
12.5
```

Division uses the `scale` variable, default value is 0, indicating integer division.

```bash {frame="none"}
scale=2
10/3
```

Indicates to keep 2 decimal places, **`scale` variable only applies to division**.

### Pipeline Method

```bash {frame="none"}
foo=$(echo "scale=2; 10/3" | bc)
```

### Inline Input Redirection

```bash {frame="none"}
var1=10.24

foo=$(bc << EOF
scale=2
a=2
$var1/a
EOF
)
```

## EXIT Command

The default exit code of the script is 0, indicating normal exit, and can be changed using `exit`.

```bash {frame="none"}
exit 5
```

The exit code range is 0-255, mod (%256).
