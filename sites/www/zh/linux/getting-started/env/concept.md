# 概念

## 起源

Linux 中的环境变量源自早期 UNIX 系统的设计需求。
通过环境变量，用户和进程能够动态地影响系统行为，而不需要修改系统的核心代码。
这种灵活性和可配置性使环境变量成为 Linux 系统和应用程序配置的关键部分。

在 UNIX 中，每个进程都有自己的环境（即一组环境变量），这些环境变量在进程的启动时由父进程传递给子进程。
最典型的例子是当用户登录系统时，系统启动的 Shell 进程会继承一组默认的环境变量，例如用户的主目录、Shell 类型等。
用户可以在这个基础上修改或添加环境变量，影响自己启动的程序或进程的行为。

## 概念勘误

有些书籍和文章会把环境变量分为~~全局环境变量和局部环境变量~~，但这种分类是不准确的，
因为在官方的文档中，从来没有这两种分类的定义，甚至连英文名称也没有。
因此，为了避免语义上的逻辑问题，本文不会对环境变量进行上述的分类。

> 《Linux 命令行与Shell 脚本编程大全》
>
> 《Linux Command Line and Shell Scripting Bible》

上面这本书关于环境变量的章节是有问题的，不是翻译的问题，原版就有问题。

## 打印环境变量

### 命令：printenv

不带参数会打印所有环境变量。

```bash
printenv | head -n 3
```

```bash
SHELL=/bin/bash
PWD=/home/kuga
LOGNAME=kuga
```

打印指定环境变量。

```bash
printenv PATH
```

```bash
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

### 命令：env

不带参数会打印所有环境变量。

```bash
env | head -n 3
```

```bash
SHELL=/bin/bash
PWD=/home/kuga
LOGNAME=kuga
```

### 命令：echo

打印指定变量，可以是环境变量或 Shell 变量。

```bash
echo $HOME
```

```bash
/home/kuga
```

## 自定义 Shell 变量

定义名为 soda 的 Shell 变量，值为 green。

```bash
soda=green
```

```bash
echo $soda
```

```bash
green
```

### 使用 printenv 访问

```bash
printenv soda
```

输出为空，因为 soda **不是环境变量，它只是一个 Shell 变量**。

### 使用命令分组 () 访问

```bash
(echo $soda)
```

```bash
green
```

### 使用命令分组 () 修改

```bash
(soda=yellow; echo $soda); echo $soda
```

```bash
yellow
green
```

Subshell 内部的修改不会影响外部的数据。

### 创建 Bash 实例访问

```bash
bash
```

```bash
echo $soda
```

输出为空，这就是普通 Shell 变量的基本作用域。

## 自定义环境变量

可以通过 `export` 指令把 Shell 变量转变为环境变量，官方手册的定义如下。

```bash
Mark each name to be passed to child processes in the environment.
```

```bash
翻译：标记变量名称，使其在环境中可以传递给子进程。
```

可以同时定义和导出变量，也可以分开操作。

```bash
export soda=green
```

```bash
soda=green; export soda;
```

### 使用 printenv 访问

转变为环境变量之后，使用 printenv 就能正常打印了。

```bash
printenv soda
```

```bash
green
```

### 使用命令分组 () 访问

```bash
(printenv soda)
```

```bash
green
```

### 使用命令分组 () 修改

```bash
(soda=yellow; echo $soda); echo $soda
```

```bash
yellow
green
```

同样，内部修改环境变量是不会影响外部的数据。

### 创建 Bash 实例访问

```bash
bash -c "printenv soda"
```

```bash
green
```

环境变量在新创建的 Bash 实例中是能访问的。

### 查看所有 export 变量

不带参数，或使用 `-p` 就能打印所有 export 变量。

```bash
export
```

```bash
export | grep soda
```

```bash
declare -x soda="green"
```

### 取消 export 环境变量

使用 `-n` 选项就能取消 export，变回普通的 Shell 变量。

```bash
export -n soda
```

```bash
printenv soda; echo $soda
```

printenv 无输出，echo 正常输出，因为 soda 已经不再是环境变量。

### 删除变量

下面会删除整个变量，无论是环境变量还是 Shell 变量。

```bash
unset soda
```

```bash
echo $soda
```

## 命令：declare

用于声明变量和属性，不带任何参数就输出所有的变量声明和当前值。

```bash
Declare variables and give them attributes. If no names are given, then display the values of variables instead.
```

常用参数：

* `-i`：将变量声明为整数。
* `-r`：将变量声明为只读。
* `-x`：将变量导出为环境变量。
* `-p`：显示变量的声明和当前值。

### 不带参数声明

效果和普通的 Shell 变量一样。

```bash
declare soda="green"
```

```bash
echo $soda
```

### 显示当前变量的声明

```bash
declare -p soda
```

```bash
declare -- soda="green"
```

### 显示所有变量的声明

```bash
declare -p
```

### 声明环境变量

```bash
declare -x soda="green"
```

```bash
printenv soda
```

```bash
green
```

在 `export` 中也能看到 soda 的定义。

```bash
export | grep soda
```

### -x 与 -\- 的区别

不难发现，可以通过声明的符号区分不同的变量类型。

* `-x`：环境变量的声明。
* `--`：普通 Shell 变量的声明。

```bash
declare -p soda
```

```bash
declare -x soda="green"
```

取消 export 后。

```bash
export -n soda
```

```bash
declare -p soda
```

```bash
declare -- soda="green"
```

## 内建命令手册

有些内建命令使用 `man` 是无法查看手册的，但可以使用 `help` 命令，或 `--help` 选项。

### export

```bash
type -a export
```

```bash
export is a shell builtin
```

***

```bash
help export
```

```bash
export --help
```

### declare

同上

### unset

同上
