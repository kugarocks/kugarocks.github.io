---
title: "Loop"
description: ""
summary: ""
date: 2024-08-30T20:00:00+08:00
lastmod: 2024-08-31T20:00:00+08:00
weight: 3300
seo:
  title: "Loop"
  description: ""
  canonical: ""
  noindex: false
---

## For Statement

```bash {frame="none"}
for var in list
do
    ...
done
```

The `var` variable can be normally used outside the loop body.

```bash {frame="none"}
#!/usr/bin/env bash

for var in apple banana
do
    echo "hello $var"
done
echo "outside $var"
```

```txt {frame="none"}
hello apple
hello banana
outside var
```

Storing a list in a variable.

```bash {frame="none"}
#!/usr/bin/env bash

list="apple banana"
list=$list" orange"
for var in $list
```

Command substitution.

```bash {frame="none"}
for var in $(cat file)
```

Wildcard iteration over a directory.

```bash {frame="none"}
for var in /home/soda/*
```

## IFS - Internal Field Separator

The environment variable IFS (Internal Field Separator) specifies the field separator.

```bash {frame="none"}
echo $IFS
```

The default value is empty, indicating that the following characters are separated.

* Space
* Tab
* Newline

### Separating by Newline

```bash {frame="none"}
IFS=$'\n'
```

### Separating by Multiple Symbols

```bash {frame="none"}
IFS=$'\n:;"'
```

Indicates that newline, colon, semicolon, and double quotes are used as separators.

## For Loop in C Language

The `i` variable can be normally accessed outside.

```bash {frame="none"}
#!/usr/bin/env bash

for (( i = 1; i < 3; i++ ))
do
    echo "index $i"
done
echo "last index $i"
```

```txt {frame="none"}
index 1
index 2
last index 3
```

## While Statement

```bash {frame="none"}
while test command
do
    ...
done
```

```bash {frame="none"}
#!/usr/bin/env bash

i=3
while [ $i -gt 0 ]
do
    echo "index $i"
    i=$[ $i - 1 ]
done
```

```txt {frame="none"}
index 3
index 2
index 1
```

Multiple `while` conditions are judged by the exit code of the last condition.

## Until Statement

```bash {frame="none"}
until test command
do
    ...
done
```

```bash {frame="none"}
#!/usr/bin/env bash

i=3
until [ $i -le 0 ]
do
    echo "index $i"
    i=$[ $i - 1 ]
done
```

```txt {frame="none"}
index 3
index 2
index 1
```

## Break Statement

Supports specifying the number of loop levels to exit.

```bash {frame="none"}
#!/usr/bin/env bash

for (( i = 0; i < 3; i++ )); do
    echo "i=$i"
    for (( j = 0; j < 3; j++ )); do
        echo "  j=$j"
        if [ $j -eq 1 ]; then
            break 2
        fi
    done
done
```

```bash {frame="none"}
i=0
  j=0
  j=1
```

The `break` statement defaults to 1, indicating exit from 1 level of loop.

## Continue Statement

```bash {frame="none"}
#!/usr/bin/env bash

for (( i = 0; i < 3; i++ )); do
    echo "i=$i"
    for (( j = 0; j < 3; j++ )); do
        echo "  j=$j"
        if [ $j -eq 1 ]; then
            continue 2
        fi
    done
done
```

```txt {frame="none"}
i=0
  j=0
  j=1
i=1
  j=0
  j=1
i=2
  j=0
  j=1
```

Like `break`, the default is also 1.

## Loop Output Redirection

The standard output of the loop can be redirected.

```bash {frame="none"}
#!/usr/bin/env bash

for var in apple banana
do
    echo "hello $var"
done > output.txt
```

The output of the loop body will be redirected to `output.txt`.

## Loop Output Pipe

The output of the loop body can also be piped.

```bash {frame="none"}
#!/usr/bin/env bash

for var in apple banana
do
    echo "hello $var"
done | sort
```

## Summary

I surprisingly like the syntax sugar of `break`.
