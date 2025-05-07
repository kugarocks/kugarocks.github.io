# Loop

## For Statement

```bash
for var in list
do
    ...
done
```

The `var` variable can be normally used outside the loop body.

```bash
#!/usr/bin/env bash

for var in apple banana
do
    echo "hello $var"
done
echo "outside $var"
```

```txt
hello apple
hello banana
outside var
```

Storing a list in a variable.

```bash
#!/usr/bin/env bash

list="apple banana"
list=$list" orange"
for var in $list
```

Command substitution.

```bash
for var in $(cat file)
```

Wildcard iteration over a directory.

```bash
for var in /home/soda/*
```

## IFS - Internal Field Separator

The environment variable IFS (Internal Field Separator) specifies the field separator.

```bash
echo $IFS
```

The default value is empty, indicating that the following characters are separated.

* Space
* Tab
* Newline

### Separating by Newline

```bash
IFS=$'\n'
```

### Separating by Multiple Symbols

```bash
IFS=$'\n:;"'
```

Indicates that newline, colon, semicolon, and double quotes are used as separators.

## For Loop in C Language

The `i` variable can be normally accessed outside.

```bash
#!/usr/bin/env bash

for (( i = 1; i < 3; i++ ))
do
    echo "index $i"
done
echo "last index $i"
```

```txt
index 1
index 2
last index 3
```

## While Statement

```bash
while test command
do
    ...
done
```

```bash
#!/usr/bin/env bash

i=3
while [ $i -gt 0 ]
do
    echo "index $i"
    i=$[ $i - 1 ]
done
```

```txt
index 3
index 2
index 1
```

Multiple `while` conditions are judged by the exit code of the last condition.

## Until Statement

```bash
until test command
do
    ...
done
```

```bash
#!/usr/bin/env bash

i=3
until [ $i -le 0 ]
do
    echo "index $i"
    i=$[ $i - 1 ]
done
```

```txt
index 3
index 2
index 1
```

## Break Statement

Supports specifying the number of loop levels to exit.

```bash
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

```bash
i=0
  j=0
  j=1
```

The `break` statement defaults to 1, indicating exit from 1 level of loop.

## Continue Statement

```bash
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

```txt
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

```bash
#!/usr/bin/env bash

for var in apple banana
do
    echo "hello $var"
done > output.txt
```

The output of the loop body will be redirected to `output.txt`.

## Loop Output Pipe

The output of the loop body can also be piped.

```bash
#!/usr/bin/env bash

for var in apple banana
do
    echo "hello $var"
done | sort
```

## Summary

I surprisingly like the syntax sugar of `break`.
