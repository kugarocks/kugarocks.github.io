# Function

## Creating a Function

```bash
function name {
    commands
}
```

or

```bash
name() {
    commands
}
```

## Function Return Value

There are multiple forms of return values.

### Using $?

Represents the exit status code of the last command in the function.

```bash
echo $?
```

### Using Return

```bash
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

```bash
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

```bash
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

```bash
#!/usr/bin/env bash

soda=green
function foo {
    echo $soda
    soda=yellow
}
foo
echo $soda
```

```txt
green
yellow
```

### Inside the Function

```bash
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

```txt

green
yellow
```

### Using Local

`local` variables only take effect within the function and are independent of external variables with the same name.

```bash
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

```txt
green
yellow
green
```

## Is a Variable Defined

[Can use parameter expansion's + marker](/linux/getting-started/script/param-exp#mark).

## Is a Function Defined

Later-defined functions with the same name will override previously defined functions with the same name, so it's a good idea to check before defining a function.

```bash
declare -f FUNC_NAME
```

For example, writing the function in the .bashrc file.

```bash
function sayhello() {
    echo "hello"
}
```

```bash
declare -f sayhello
```

```bash
echo $?
```

The function is defined, exit code is 0, not defined, exit code is 1.

```bash
if declare -f sayhello > /dev/null; then
  echo "sayhello is defined"
else
  echo "sayhello not defined"
fi
```
