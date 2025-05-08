# 条件结构

## IF 语句

如果 `command` 的退出码为 `0`，则执行 `then` 的内容。

```bash
if command
then
    ...
fi
```

另一种形式。

```bash
if command; then
    ...
fi
```

### ELSE

```bash
if command; then
    ...
else
    ...
fi
```

### ELIF

```bash
if command; then
    ...
elif command; then
    ...
fi
```

### 检查用户

检查 soda 用户是否存在。

```bash
#!/usr/bin/env bash

if grep soda /etc/passwd
then
 echo "soda exists"
fi
```

```bash
soda:x:1001:1001:,,,:/home/soda:/bin/bash
soda exists
```

`grep` 有数据时，退出码为 `0`，没数据退出码为 `1`。

## TEST 命令

测试条件，如果为真，返回码为 `0`，否则返回码为 `1`。

```bash
test - check file types and compare values
```

基本语法。

```bash
test EXPRESSION
```

简短语法。

```bash
[ EXPRESSION ]
```

在命令行执行后，可以用 `echo $?` 看返回码。

### 检查文件

* `[ -e file ]`：文件是否存在。
* `[ -d file ]`：是否存在且为目录。
* `[ -f file ]`：是否存在且为文件。
* `[ -s file ]`：是否存在且为不为空。
* `[ -r file ]`：是否存在且可读。
* `[ -w file ]`：是否存在且可写。
* `[ -x file ]`：是否存在且可执行。
* `[ -O file ]`：是否存在且属于当前用户。
* `[ -G file ]`：是否存在且属于用户组。
* `[ a -nt b ]`：文件 a 是否比 b 新。
* `[ a -ot b ]`：文件 a 是否比 b 旧。

如果 `file` 或 `$file` 变量包含空格，要使用双引号。

```bash
[ -e "file" ]
```

```bash
[ -e "$file" ]
```

### 检查字符串

* `[ -z str ]`：字符串是否为空（长度为 0）。
* `[ -n str ]`：字符串是否不为空（长度不为 0）。
* `[ s1 = s2 ]`：字符串是否相等。
* `[ s1 != s2 ]`：字符串是否不等。

### 检查数值

* `[ a -eq b ]`：两个数是否相等。
* `[ a -ne b ]`：两个数是否不等。
* `[ a -gt b ]`：a 是否大于 b。
* `[ a -ge b ]`：a 是否大于或等于 b。
* `[ a -lt b ]`：a 是否小于 b。
* `[ a -le b ]`：a 是否小于或等于 b。

## 复合条件

和传统的编程语言一致。

```bash
[ cond1 ] && [ cond2 ]
```

```bash
[ cond1 ] || [ cond2 ]
```

## 双括号

双括号可以使用高级数学表达式，无需转义。

```bash
if (( 2**10 > 1000 ))
then
    ...
fi
```

## 双方括号

提供字符串的高级匹配模式。

```bash
if [[ $BASH_VERSION == 5.* ]]
then
    ...
fi
```

## CASE 语句

```bash
#!/usr/bin/env bash

# 脚本的第一个参数
case "$1" in
  start)
    echo "Starting the service..."
    # 在这里添加启动服务的命令
    ;;
  stop)
    echo "Stopping the service..."
    # 在这里添加停止服务的命令
    ;;
  *)
    echo "Usage: $0 {start|stop}"
    exit 1
    ;;
esac
```

* `$0`：脚本名称。
* `$1`：脚本的第一个参数
* `)`：分支条件结束标记。
* `;;`：分支命令结束标记。
* `*)`：默认分支，所有分支不匹配时执行。
