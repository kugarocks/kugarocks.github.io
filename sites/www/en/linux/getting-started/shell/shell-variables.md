# Shell Variables

Shell variables are a general term. If you are using a specific shell, such as Bash, you can call it a Bash variable.
But it is important to note that shell variables are not environment variables, do not be confused by their capitalization, here are the relevant official documents.

::: info Shell Variables
<a href="https://www.gnu.org/software/bash/manual/html_node/Shell-Variables.html" target="_blank">https://www.gnu.org/software/bash/manual/html_node/Shell-Variables.html</a>
:::

::: info Bash Variables
<a href="https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html" target="_blank">https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html</a>
:::

You can also view it by using the man command and searching for `Shell Variables`.

```bash
man bash
```

```bash
/Shell Variables
```

## Common Variables

### PS1

Shell command prompt.

```bash
echo $PS1
```

```bash
\[\e]0;\u@\h: \w\a\]${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$
```

### UID

Current user ID.

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

You can see that the parent process of bash is sshd.

### BASH\_VERSION

```bash
echo $BASH_VERSION
```

```bash
5.1.16(1)-release
```

### BASH\_SUBSHELL

&#x20;Subshell nesting level, starting from 0.

```bash
echo $BASH_SUBSHELL
```

```bash
0
```

### SECONDS

Seconds since the shell started.

```bash
echo $SECONDS
```

```bash
13963
```

### RANDOM

0 \~ 32767 random number.

```bash
echo $RANDOM
```

```bash
1024
```

## Custom Variables

[Refer to the later chapter on environment variables](/en/linux/env/concept/#custom-shell-variables)
