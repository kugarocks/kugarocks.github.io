# Shell 变量

Shell 变量是一个统称，如果用的是某个特定的 Shell，例如 Bash，那么可以称它为 Bash 变量。
但这里必须要注意，Shell 变量不是环境变量，不要被它的大写迷惑了，以下是相关的官方文档。

::: info Shell Variables
https://www.gnu.org/software/bash/manual/html_node/Shell-Variables.html
:::

::: info Bash Variables
https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html
:::

使用 man 指令，然后搜索 `Shell Variables` 也能查看。

```bash
man bash
```

```bash
/Shell Variables
```

## 常见 Shell 变量

### PS1

Shell 命令提示符。

```bash
echo $PS1
```

```bash
\[\e]0;\u@\h: \w\a\]${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$
```

### UID

当前用户 ID。

```bash
echo $UID
```

```bash
1000
```

### PPID

```bash
ps -fp $PPID
```

```bash
UID          PID    PPID  C STIME TTY          TIME CMD
kuga       46635   46570  0 10:56 ?        00:00:00 sshd: kuga@pts/0
```

可以看到 bash 的父进程是 sshd。

### BASH\_VERSION

```bash
echo $BASH_VERSION
```

```bash
5.1.16(1)-release
```

### BASH\_SUBSHELL

&#x20;Subshell 的嵌套级别，从 0 开始。

```bash
echo $BASH_SUBSHELL
```

```bash
0
```

### SECONDS

Shell 启动到现在的秒数。

```bash
echo $SECONDS
```

```bash
13963
```

### RANDOM

0 \~ 32767 随机数。

```bash
echo $RANDOM
```

```bash
1024
```

## 自定义 Shell 变量

[参考后面环境变量的章节](/zh/linux/getting-started/env/concept#自定义-shell-变量)
