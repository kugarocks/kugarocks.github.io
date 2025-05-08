# 循环结构

## FOR 语句

```bash
for var in list
do
    ...
done
```

`var` 变量的循环体外可以正常使用。

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

变量存储列表。

```bash
#!/usr/bin/env bash

list="apple banana"
list=$list" orange"
for var in $list
```

命令替换。

```bash
for var in $(cat file)
```

通配符遍历目录。

```bash
for var in /home/soda/*
```

## IFS - 字段分隔符

环境变量 IFS（Internal Field Separator）指定了字段分隔符。

```bash
echo $IFS
```

默认值为空，表示以下列字符分隔。

* 空格
* 制表符
* 换行符

### 以换行符分隔

```bash
IFS=$'\n'
```

### 以多个符号分隔

```bash
IFS=$'\n:;"'
```

表示以换行符、冒号、分号、双引号作为分隔符。

## C 语言中的 FOR

`i` 变量在外部正常访问。

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

## WHILE 语句

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

多个 `while` 条件的时候，以最后一个条件的退出码判断。

## UNTIL 语句

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

## BREAK 语句

支持指定退出循环的层数。

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

`break` 默认值是 1，表示退出 1 层循环。

## CONTINUE 语句

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

和 `break` 一样，默认也是 1。

## 循环输出重定向

可以对循环中的标准输出重定向。

```bash
#!/usr/bin/env bash

for var in apple banana
do
    echo "hello $var"
done > output.txt
```

循环体的输出会生定向到 `output.txt`。

## 循环输出管道

循环体的输出还可以使用管道传输。

```bash
#!/usr/bin/env bash

for var in apple banana
do
    echo "hello $var"
done | sort
```

## 总结

我竟然有点喜欢 `break` 的语法糖。
