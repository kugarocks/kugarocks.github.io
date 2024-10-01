---
title: "函數"
description: ""
summary: ""
date: 2024-09-02T20:00:00+08:00
lastmod: 2024-09-03T20:00:00+08:00
weight: 3700
seo:
  title: "函數"
  description: ""
  canonical: ""
  noindex: false
---

## 創建函數

```bash {frame="none"}
function name {
    commands
}
```

或者

```bash {frame="none"}
name() {
    commands
}
```

## 函數返回值

返回值有多種形式。

### 使用 $?

表示函數最後一條命令的退出狀態碼。

```bash {frame="none"}
echo $?
```

### 使用 return

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

**本質係退出狀態碼__AB__範圍 [0, 255]__AB__超出會對 256 取模。**

### 使用標準輸出

```bash {frame="none"}
#!/usr/bin/env bash

function double {
    read -p "Enter a value:" value
    echo $[ $value * 2 ]
}

result=$(double)
echo "Result: $result"
```

`result` 會保存函數中所有的標準輸出。

## 函數傳參

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

函數入面嘅 `$#`、`$1` 同外層嘅參數相互獨立。

## 變量的作用域

### 函數外定義

邊度都可以訪問。

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

### 函數內定義

```bash {frame="none"}
#!/usr/bin/env bash

function foo {
    soda=green
}
# 函數未執行前無法訪問
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

### 使用 local

`local` 變量只喺函數內部生效__AB__同外部重名變量相互獨立。

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

## 變量是否被定義

[可以使用參數展開的 + 標記](can-shu-zhan-kai.md#biao-ji)。

## 函數是否被定義

後面定義的同名函數會覆蓋前面定義同名函數__AB__所以喺定義函數之前__AB__可以先判斷一下。

```bash {frame="none"}
declare -f FUNC_NAME
```

例如把函數寫喺 .bashrc 文件。

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

函數已定義__AB__退出碼為 0__AB__未定義__AB__退出碼為 1。

```bash {frame="none"}
if declare -f sayhello > /dev/null; then
  echo "sayhello is defined"
else
  echo "sayhello not defined"
fi
```
