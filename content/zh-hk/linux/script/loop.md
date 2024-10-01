---
title: "循環結構"
description: ""
summary: ""
date: 2024-08-30T20:00:00+08:00
lastmod: 2024-08-31T20:00:00+08:00
weight: 3300
seo:
  title: "循環結構"
  description: ""
  canonical: ""
  noindex: false
---

## FOR 語句

```bash {frame="none"}
for var in list
do
    ...
done
```

`var` 變量喺循環體外可以正常使用。

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

變量存儲列表。

```bash {frame="none"}
#!/usr/bin/env bash

list="apple banana"
list=$list" orange"
for var in $list
```

命令替換。

```bash {frame="none"}
for var in $(cat file)
```

通配符遍歷目錄。

```bash {frame="none"}
for var in /home/soda/*
```

## IFS - 字段分隔符

環境變量 IFS（Internal Field Separator）指定咗字段分隔符。

```bash {frame="none"}
echo $IFS
```

默認值係空，表示以下列字符分隔。

* 空格
* 制表符
* 換行符

### 以換行符分隔

```bash {frame="none"}
IFS=$'\n'
```

### 以多個符號分隔

```bash {frame="none"}
IFS=$'\n:;"'
```

表示以換行符、冒號、分號、雙引號作為分隔符。

## C 語言中的 FOR

`i` 變量喺外部正常訪問。

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

## WHILE 語句

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

多個 `while` 條件嘅時候，以最後一個條件嘅退出碼判斷。

## UNTIL 語句

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

## BREAK 語句

支持指定退出循環嘅層數。

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

`break` 默認值係 1，表示退出 1 層循環。

## CONTINUE 語句

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

同 `break` 一樣，默認都係 1。

## 循環輸出重定向

可以對循環中嘅標準輸出重定向。

```bash {frame="none"}
#!/usr/bin/env bash

for var in apple banana
do
    echo "hello $var"
done > output.txt
```

循環體嘅輸出會重定向到 `output.txt`。

## 循環輸出管道

循環體嘅輸出仲可以用管道傳輸。

```bash {frame="none"}
#!/usr/bin/env bash

for var in apple banana
do
    echo "hello $var"
done | sort
```

## 總結

我竟然有啲鍾意 `break` 嘅語法糖。
