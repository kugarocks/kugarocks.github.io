# 常用命令 2

## SORT

默认按字符的编码排序，非数值。

```bash
sort - sort lines of text files
```

### 按逆序排列

```bash
sort -r file
```

### 按数值排序

```bash
sort -n file
```

### 按月份排序

月份格式：`Jan`、`Feb`、`Mar`。

```bash
sort -M file
```

### 指定列

默认按（连续的）空格或制表符分隔。

```bash
sort -k 1 file
```

### 指定分隔符和列

`-k` 下标从 1 开始，第 3 列为用户 ID。

```bash
sort -t ':' -k 3 -n /etc/passwd
```

### 忽略大小写

```bash
sort -f file
```

### 结果去重

```bash
sort -u file
```

## ALIAS

```bash
sort - sort lines of text files
```

### 查看可能别名

```bash
alias -p
```

## TYPE

### 外/内部命令

可查看命令是否内部命令，内部命令与 Shell 编译成一体，与外部命令不同，无须子进程执行。

```bash
type cd
```

```bash
cd is a shell builtin
```

***

```bash
type ps
```

```bash
ps is hashed (/usr/bin/ps)
```

### 查看所有实现

```bash
type -a echo
```

```bash
echo is a shell builtin
echo is /usr/bin/echo
echo is /bin/echo
```

### 查看命令的别名

```bash
type ll
```

```bash
ll is aliased to `ls -alF'
```

***

```bash
type -a ls
```

```bash
ls is aliased to `ls --color=auto'
ls is /usr/bin/ls
ls is /bin/ls
```

## READLINK

```bash
readlink - print resolved symbolic links or canonical file names
```

### 查看最后的链接

不用一个一个看了。

```bash
readlink -f /bin/vim
```

```bash
/usr/bin/vim.basic
```
