# 特殊参数

## 参数：$?

上一个命令或脚本的退出码，0 成功，非 0 失败。

```bash
ls 404
```

```bash
echo $?
```

会输出 2，表示失败。脚本中可用 `exit` 指定返回码。

## 参数：$\#

表示传递给脚本或函数的参数个数。

```bash
#!/usr/bin/env bash
echo $#
```

```bash
./foo p1 p2
```

```txt
2
```

## 参数：$*

传递给脚本的所有参数，默认以空格分隔。

```bash
#!/usr/bin/env bash
echo $*
```

```bash
./foo p1 p2p3
```

```txt
p1 p2p3
```

分隔符可以通过 `IFS` 变量修改。

## 参数：$@

传递给脚本的所有参数，默认以空格分隔。

```bash
#!/usr/bin/env bash
echo $@
```

```bash
./foo p1 p2p3
```

```txt
p1 p2p3
```

分隔符可以通过 `IFS` 变量修改。

## 区别：$* 与 $@

主要区别在处理带有空格的参数。

* `$*`：代表的是所有参数的字符串，是一个整体。
* `$@`：
  * 不带双引号：与 `$*` 是一样的。
  * 带上双引号：`"$@"`，表示参数数组，每个参数是独立的。

```bash
# 假设传递的参数是 "arg1" "arg2 with space" "arg3"
for arg in "$@"; do
    echo "Argument: $arg"
done
```

```bash
# 将所有参数传递给另一个脚本
another_script "$@"
```

## 参数：$$

当前脚本的进程 ID。

```bash
echo $$
```

## 参数：$\!

最近在进程后台运行的进程 ID。

```bash
echo $!
```

## 参数：$0

当前脚本名称。

```bash
echo $0
```

```txt
-bash
```

## 参数：$n

第 n 个参数。

```bash
#!/usr/bin/env bash
echo $1
```

```bash
./foo a b c
```

```txt
a
```

## 参数：$-

脚本的选项。

```bash
echo $-
```

```txt
himBHs
```

上面是当前 Shell 的启动选项。
