---
title: "Function"
description: ""
summary: ""
date: 2024-09-02T20:00:00+08:00
lastmod: 2024-09-03T20:00:00+08:00
weight: 3700
seo:
  title: "Function"
  description: ""
  canonical: ""
  noindex: false
---

## Creating a Function

```bash {frame="none"}
function name {
    commands
}
```

or

```bash {frame="none"}
name() {
    commands
}
```

## Function Return Value

There are multiple forms of return values.

### Using $?

Represents the exit status code of the last command in the function.

```bash {frame="none"}
echo $?
```

### Using Return

```bash {frame="none"}
#!/usr/bin/env bash

function double {
    echo "Double value"
    read -p "Enter a value:" value
    return $[ $value * 2 ]
}

double
echo "Result: $?"
```

**Essentially, it's the exit status code, ranging from [0, 255], and exceeding will be modulo 256.**

### Using Standard Output

```bash {frame="none"}
#!/usr/bin/env bash

function double {
    read -p "Enter a value:" value
    echo $[ $value * 2 ]
}

result=$(double)
echo "Result: $result"
```

`result` will save all the standard output from the function.

## Function Parameters

```bash {frame="none"}
#!/usr/bin/env bash

function add {
    if [ $# -lt 2 ]; then
        echo "invalid params"
    else
        echo $[ $1 + $2 ]
    fi
}

result=$(add 1 2)
echo "Result: $result"
```

The `$#`, `$1`, and parameters within the function are independent of the outer parameters.

## Variable Scope

### Outside the Function

Accessible anywhere.

```bash {frame="none"}
#!/usr/bin/env bash

soda=green
function foo {
    echo $soda
    soda=yellow
}
foo
echo $soda
```

```txt {frame="none"}
green
yellow
```

### Inside the Function

```bash {frame="none"}
#!/usr/bin/env bash

function foo {
    soda=green
}
# Cannot access before the function is executed
echo $soda
foo
echo $soda
soda=yellow
echo $soda
```

```txt {frame="none"}

green
yellow
```

### Using Local

`local` variables only take effect within the function and are independent of external variables with the same name.

```bash {frame="none"}
#!/usr/bin/env bash

soda=green
function foo {
    echo $soda
    local soda=yellow
    echo $soda
}
foo
echo $soda
```

```txt {frame="none"}
green
yellow
green
```

## Is a Variable Defined

[Can use parameter expansion's + marker](can-shu-zhan-kai.md#biao-ji).

## Is a Function Defined

Later-defined functions with the same name will override previously defined functions with the same name, so it's a good idea to check before defining a function.

```bash {frame="none"}
declare -f FUNC_NAME
```

For example, writing the function in the .bashrc file.

```bash {frame="none"}
function sayhello() {
    echo "hello"
}
```

```bash {frame="none"}
declare -f sayhello
```

```bash {frame="none"}
echo $?
```

The function is defined, exit code is 0, not defined, exit code is 1.

```bash {frame="none"}
if declare -f sayhello > /dev/null; then
  echo "sayhello is defined"
else
  echo "sayhello not defined"
fi
```
