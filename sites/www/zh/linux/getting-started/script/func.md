# 函数

## 创建函数

```bash
function name {
    commands
}
```

或者

```bash
name() {
    commands
}
```

## 函数返回值

返回值有多种形式。

### 使用 $?

表示函数最后一条命令的退出状态码。

```bash
echo $?
```

### 使用 return

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

**本质是退出状态码，范围 [0, 255]，超出会对 256 取模。**

### 使用标准输出

```bash
#!/usr/bin/env bash

function double {
    read -p "Enter a value:" value
    echo $[ $value * 2 ]
}

result=$(double)
echo "Result: $result"
```

`result` 会保存函数中所有的标准输出。

## 函数传参

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

函数里面的 `$#`、`$1` 和外层的参数相互独立。

## 变量的作用域

### 函数外定义

哪里都能访问。

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

### 函数内定义

```bash
#!/usr/bin/env bash

function foo {
    soda=green
}
# 函数没执行前无法访问
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

### 使用 local

`local` 变量只在函数内部生效，和外部重名变量相互独立。

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

## 变量是否被定义

[可以使用参数展开的 + 标记](can-shu-zhan-kai.md#biao-ji)。

## 函数是否被定义

后面定义的同名函数会覆盖前面定义同名函数的，所以在定义函数之前，可以先判断一下。

```bash
declare -f FUNC_NAME
```

例如把函数写在 .bashrc 文件。

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

函数已定义，退出码为 0，未定义，退出码为 1。

```bash
if declare -f sayhello > /dev/null; then
  echo "sayhello is defined"
else
  echo "sayhello not defined"
fi
```
