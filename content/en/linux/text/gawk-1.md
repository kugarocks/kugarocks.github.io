---
title: "GAWK 命令 - 1"
description: ""
summary: ""
date: 2024-09-05T20:00:00+08:00
lastmod: 2024-09-05T20:00:00+08:00
weight: 4300
seo:
  title: "GAWK 命令 - 1"
  description: ""
  canonical: ""
  noindex: false
---

## GNU AWK

`gawk` 是 GNU 版本的文本处理工具。
在大多数 GNU/Linux 发行版中，`gawk` 是默认的 `awk` 实现，因此在日常使用中通常没有区别。

```bash {frame="none"}
readlink -f /usr/bin/awk
```

```txt {frame="none"}
/usr/bin/gawk
```

`gawk` 命令默认使用 ERE 模式。

### 基本语法

```bash {frame="none"}
gawk [OPTIONS] program file
```

* `OPTIONS`：命令选项。
* `program`：这尼玛命令里面还有个程序。
* `file`：处理的文件，如果省略，读取 STDIN。

省略 `file` 为交互模式，输入一行执行一次。

### 运行过程

* 读入一行数据：
  * 有匹配规则：
    * 匹配成功：执行相关操作。
    * 匹配失败：不执行操作。
  * 无匹配规则：执行相关操作。

### 基础用法

创建 foo 文件。

```bash {frame="none"}
echo -e 'aa 11\nbb 22' > foo
```

对于每行数据，`gawk` 默认使用空格/制表符分隔字段。

* `$N`：表示第 N 个字段。
* `$0`：表示整行数据。

```bash {frame="none"}
gawk '{print $1}' foo
```

```txt {frame="none"}
aa
bb
```

### BEGIN/END 结构

* BEGIN：初始化，在解释前执行。
* BODY：对每个记录执行一次。
* END：结束处理。

注意使用引号 `'EOF'` 创建文件，这样不会处理特殊字符 `$`。

```bash {frame="none"}
cat <<'EOF' > foo.gawk
BEGIN {
    FS=":"
    print "User\tShell"
    print "-------\t-------"
}
{
    print $1 "\t" $6
}
END {
    print "-------\t-------"
}
EOF
```

```bash {frame="none"}
head -n 3 /etc/passwd | gawk -f foo.gawk
```

```txt {frame="none"}
User    Shell
------- -------
root    /root
daemon  /usr/sbin
bin     /bin
------- -------
```

## 常用选项

### 指定分隔符

`-F` 选项可以修改行的分隔符。

```bash {frame="none"}
gawk -F: '{print $1}' /etc/passwd | head -n 1
```

### 指定文件

`-f` 选项可以指定文件。

```bash {frame="none"}
echo '{print $1 "-dir:" $6}' > foo.gawk
```

```bash {frame="none"}
gawk -F: -f foo.gawk /etc/passwd | head -n 1
```

```txt {frame="none"}
root-dir:/root
```

### 变量参数赋值

`-v` 选项可以在 BEGIN 之前给变量赋值。

```bash {frame="none"}
gawk -v n=2 'BEGIN{print 2*n}'
```

```txt {frame="none"}
4
```

如果不需要在 BEGIN 中使用，可以不用 `-v` 参数。

```bash {frame="none"}
echo 'a b c' | gawk '{print $n}' n=2
```

```txt {frame="none"}
b
```

## 内置变量

### 变量 $N

`$N` 还可以赋值，字符串的双引号不能省略。

```bash {frame="none"}
echo 'hey man' | gawk '{$2="bro"; print $0}'
```

```txt {frame="none"}
hey bro
```

### 变量 FS

Field Separator，字段分隔符。

```bash {frame="none"}
gawk 'BEGIN{FS=":"} {print $1}' /etc/passwd | head -n 1
```

### 变量 NF

Number of Fields，表示记录中的字段的数量。

```bash {frame="none"}
gawk -F: '$1=="root"{print $1":"$NF}' /etc/passwd
```

```txt {frame="none"}
root:/bin/bash
```

### 变量 NR

Number of Records，表示当前处理的记录编号，默认值为 1，处理一行后会加 1。
可用于跳过文本的第一行，第一行的 `NR` 值为 1。

```bash {frame="none"}
cat <<EOF > foo
name score
foo  90
bar  80
EOF
```

```bash {frame="none"}
gawk '{if (NR>1) {if ($2>85) {print $1,$2}}}' foo
```

```txt {frame="none"}
foo 90
```

### 变量 RS

Record Separator，输入记录分隔符，默认值为 `\n`，表示以换行符分隔每条记录。
将 `RS` 设置为 `""` 表示以空行作为记录分隔符，对于下面的文本，会分为上下 2 个记录。

```bash {frame="none"}
cat <<EOF > foo
apple
sweet
red

banana
sweet
yellow
EOF
```

设置 `FS="\n"`，则可通过 `$N` 获取每行记录。`RS` 和 `FS` 通常结合使用。

```bash {frame="none"}
gawk 'BEGIN{RS=""; FS="\n"} {print $1"\t"$3}' foo
```

```txt {frame="none"}
apple  red
banana yellow
```

### 变量 OFS

Output Field Separator，输出字段分隔符。

```bash {frame="none"}
echo 'aa,bb' | gawk 'BEGIN{FS=","; OFS="-"} {print $1,$2}'
```

```txt {frame="none"}
aa-bb
```

### 变量 FIELDWIDTHS

指定字符宽度进行分隔。

```bash {frame="none"}
echo 'abbc' | gawk 'BEGIN{FIELDWIDTHS="1 2 1"} {print $1,$2,$3}'
```

```txt {frame="none"}
a bb c
```

## 条件与结构

### 条件表达式

`==`、`<`，`<=`，`>`，`>=`。

```bash {frame="none"}
gawk -F: '$7=="/bin/bash"{print $1}' /etc/passwd
```

输出所有以 bash 启动的用户。

### 条件语句

`if` 里面单条语句可不加 `{}`。

```bash {frame="none"}
echo -e '10\n20' | gawk '{if ($1>15) print $1}'
```

`if` 里面多条语句要加 `{}`。

```bash {frame="none"}
echo -e '10\n20' | gawk '{if ($1>15) {x=2*$i; print x}}'
```

单行的 `else` 语句，前面的语句要加 `;` 号。

```bash {frame="none"}
echo -e '10\n20' | gawk '{if ($1>15) print $1; else print "no"}'
```

多行不需要加分号。

```bash {frame="none"}
echo -e '10\n20' | gawk '{
if ($i>15) {
    x=2*$i
    print x
} else {
    print "no"
}
}'
```

### FOR 语句

对每一行的字段求和，`+=` 和 `++` 都支持。

```bash {frame="none"}  
echo '1 2 3' | gawk '{
total=0
for (i=1; i<=NF; i++) {
    total += $i
}
print total
}'
```

### WHILE 语句

对每一行的字段求和。

```bash {frame="none"}
echo '1 2 3' | gawk '{
i=1
total=0
while (i<=NF) {
    total += $i
    i++
}
print total
}'
```

### DO-WHILE 语句

对每一行的字段求和

```bash {frame="none"}
echo '1 2 3' | gawk '{
i=1
total=0
do {
    total += $i
    i++
} while(i<=NF)
print total
}'
```

## 函数相关

### 内建函数

* `int(x)`：取 x 的整数部分。
* `exp(x)`：x 的指数。
* `sqrt(x)`：x 的平方根。
* `rand()`：比 0 大且小于 1 的随机数。
* `length(x)`：x 的字符串长度。
* `tolower(x)`：x 转小写。
* `toupper(x)`：x 转大写。

还有很多，如 `gensub`，`gsub`。

### 自定义函数

自定义函数必须出现在 `BEGIN` 块之前。

```bash {frame="none"}
gawk '
function random(ts, num) {
    srand(ts)
    return int(num * rand())
}
BEGIN {
    ts=systime()
    print ts
    print random(ts, 10)
}'
```

可以使用函数库文件，再引用。

```bash {frame="none"}  
cat <<'EOF' > funclib.gawk
function random(ts, num) {
    srand(ts)
    return int(num * rand())
}
EOF
```

gawk 程序文件如下。

```bash {frame="none"}
cat <<'EOF' > test.gawk
BEGIN {
    ts=systime()
    print ts
    print random(ts, 10)
}
EOF
```

使用 -f 选项引用两个文件。

```bash {frame="none"}
gawk -f funclib.gawk -f test.gawk
```

引用函数库就不能使用内联程序模式，都需要引用。

## 其它例子

### 自定义变量

支持数学运算和浮点数，这不比 bash 强 🤪。

```bash {frame="none"}
gawk 'BEGIN{a=2; a=a*2/3; print a}'
```

```txt {frame="none"}
1.33333
```

### 数组操作

特点：关联数组，类似字典，无序。

```bash {frame="none"}
gawk 'BEGIN{arr["name"]="foo"; print arr["name"]}'
```

可以使用数字下标，其实也是字典。

```bash {frame="none"}
gawk 'BEGIN{arr[3]="foo"; print arr[3]}'
```

遍历数组，删除元素。

```bash {frame="none"}
gawk 'BEGIN{
arr["a"]=1
arr[2]=2
arr["c"]="cat"
delete arr[2]
for (k in arr) {
    print "key:",k," val:", arr[k]
}
}
'
```

```txt {frame="none"}
key: a  val: 1
key: c  val: cat
```

### 格式化打印

处理浮点数。

```bash {frame="none"}
gawk 'BEGIN{printf "%.2f\n", 2/3}'
```

```txt {frame="none"}
0.67
```

指定宽度。

```bash {frame="none"}
echo -e 'foo\nfoobar' | gawk '{printf "%8s\n", $1}'
```

左对齐。

```bash {frame="none"}
echo -e 'foo\nfoobar' | gawk '{printf "%-8s\n", $1}'
```
