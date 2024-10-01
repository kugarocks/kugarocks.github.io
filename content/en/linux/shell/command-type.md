---
title: "Command Type"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 700
seo:
  title: "Command Type"
  description: ""
  canonical: ""
  noindex: false
---

## Builtin Commands

Builtin commands are implemented by the Shell itself, they run
**without starting a new process** or calling an external program, which is the basic functionality of Shell operations.

### Builtin Commands Ex

* `cd`：Change the current working directory.
* `echo`：Output a string to the terminal.
* `exit`：Exit the current Shell session.
* `export`：Set or export environment variables.
* `alias`：Create an alias for a command.
* `set`：Set Shell options and variables.
* `read`：Read a line from standard input and assign it to a variable.

### Builtin Commands Ref

{{< link-card
  title="Bash Built-In Commands"
  description="gnu.org"
  href="https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html"
  target="_blank"
>}}

## External Commands

External Commands.
External commands refer to those that are not implemented by the Shell itself, but are executable files in the system.
When you run an external command, the Shell will find the corresponding executable file by searching the directories in the `PATH` environment variable,
and **start a new process** to run the command.

### External Commands Ex

* `/bin/ls`：List directory contents.
* `/usr/bin/grep`：Search for content in files.
* `/bin/cat`：Display file contents.
* `/bin/mkdir`：Create a directory.

## Distinguish Builtin/External

### Using the Type Command

```bash {frame="none"}
type cd
```

```bash {frame="none"}
cd is a shell builtin
```

***

```bash {frame="none"}
type cat
```

```bash {frame="none"}
cat is /usr/bin/cat
```

### Listing All Implementations

```bash {frame="none"}
type -a pwd
```

```bash {frame="none"}
pwd is a shell builtin
pwd is /usr/bin/pwd
pwd is /bin/pwd
```

Above, we listed the built-in and external implementations of pwd. If you want to use the external implementation, you need to use the full path.

### Listing Command Aliases

```bash {frame="none"}
type -a ls
```

```bash {frame="none"}
ls is aliased to `ls --color=auto'
ls is /usr/bin/ls
ls is /bin/ls
```

Additionally, using the `which` command will only show external commands.
