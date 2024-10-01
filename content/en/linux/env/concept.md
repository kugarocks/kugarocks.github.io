---
title: "Concept"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 1700
seo:
  title: "Concept"
  description: ""
  canonical: ""
  noindex: false
---

## Origins

The environment variables in Linux originated from the design requirements of early UNIX systems.
Through environment variables, users and processes can dynamically influence system behavior without modifying the system's core code.
This flexibility and configurability make environment variables a key part of Linux system and application configurations.

In UNIX, each process has its own environment (i.e., a set of environment variables), which are passed from the parent process to the child process at startup.
The most typical example is when a user logs into the system, the Shell process started by the system inherits a set of default environment variables, such as the user's home directory, Shell type, etc.
Users can modify or add environment variables based on this, affecting the behavior of programs or processes they start.

## Concept Corrections

Some books and articles may divide environment variables into ~~global environment variables and local environment variables~~, but this classification is inaccurate,
because there is no definition of these two categories in official documentation, not even in English names.
Therefore, to avoid logical problems in semantics, this article will not classify environment variables as above.

> 《Linux Command Line and Shell Scripting Bible》

The section on environment variables in this book is problematic, not a translation issue, but the original version has problems.

## Printing Env Vars

### Command: printenv

Without arguments, it prints all environment variables.

```bash {frame="none"}
printenv | head -n 3
```

```bash {frame="none"}
SHELL=/bin/bash
PWD=/home/kuga
LOGNAME=kuga
```

Prints a specific environment variable.

```bash {frame="none"}
printenv PATH
```

```bash {frame="none"}
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

### Command: env

Without arguments, it prints all environment variables.

```bash {frame="none"}
env | head -n 3
```

```bash {frame="none"}
SHELL=/bin/bash
PWD=/home/kuga
LOGNAME=kuga
```

### Command: echo

Prints a specified variable, which can be an environment variable or a Shell variable.

```bash {frame="none"}
echo $HOME
```

```bash {frame="none"}
/home/kuga
```

## Customizing Shell Vars

Defines a Shell variable named soda with the value green.

```bash {frame="none"}
soda=green
```

```bash {frame="none"}
echo $soda
```

```bash {frame="none"}
green
```

### printenv

```bash {frame="none"}
printenv soda
```

Outputs nothing, because soda **is not an environment variable, it's just a Shell variable**.

### Command Group

```bash {frame="none"}
(echo $soda)
```

```bash {frame="none"}
green
```

### Modify in Command Group

```bash {frame="none"}
(soda=yellow; echo $soda); echo $soda
```

```bash {frame="none"}
yellow
green
```

Subshell modifications do not affect external data.

### Creating a Bash Instance

```bash {frame="none"}
bash
```

```bash {frame="none"}
echo $soda
```

Outputs nothing, which is the basic scope of a regular Shell variable.

## Customizing Env Vars

Environment variables can be created by exporting Shell variables using the `export` command, as defined in the official manual.

```bash {frame="none" text-wrap="wrap"}
Mark each name to be passed to child processes in the environment.
```

```bash {frame="none"}
Translation: Mark the variable name to be passed to child processes in the environment.
```

Variables can be defined and exported simultaneously, or separately.

```bash {frame="none"}
export soda=green
```

```bash {frame="none"}
soda=green; export soda;
```

### printenv

After being converted to an environment variable, printenv can normally print it.

```bash {frame="none"}
printenv soda
```

```bash {frame="none"}
green
```

### Command Group

```bash {frame="none"}
(printenv soda)
```

```bash {frame="none"}
green
```

### Modify in Command Group

```bash {frame="none"}
(soda=yellow; echo $soda); echo $soda
```

```bash {frame="none"}
yellow
green
```

Similarly, modifying environment variables within a subshell does not affect external data.

### Creating a Bash Instance

```bash {frame="none"}
bash -c "printenv soda"
```

```bash {frame="none"}
green
```

Environment variables are accessible in a new Bash instance.

### Get All Export Variables

Without arguments, or using `-p`, all export variables can be printed.

```bash {frame="none"}
export
```

```bash {frame="none"}
export | grep soda
```

```bash {frame="none"}
declare -x soda="green"
```

### Cancel Export Env Vars

Using the `-n` option can cancel export, making it a regular Shell variable again.

```bash {frame="none"}
export -n soda
```

```bash {frame="none"}
printenv soda; echo $soda
```

printenv has no output, echo outputs normally, because soda is no longer an environment variable.

### Deleting Variables

Below will delete the entire variable, whether it's an environment variable or a Shell variable.

```bash {frame="none"}
unset soda
```

```bash {frame="none"}
echo $soda
```

## Command: declare

Used to declare variables and attributes. If no names are given, then display the values of variables instead.

```bash {frame="none" text-wrap="wrap"}
Declare variables and give them attributes. If no names are given, then display the values of variables instead.
```

Common parameters:

* `-i`：Declares the variable as an integer.
* `-r`：Declares the variable as read-only.
* `-x`：Exports the variable as an environment variable.
* `-p`：Displays the declaration and current value of the variable.

### Without Arguments

The effect is the same as a regular Shell variable.

```bash {frame="none"}
declare soda="green"
```

```bash {frame="none"}
echo $soda
```

### Display Var Declaration

```bash {frame="none"}
declare -p soda
```

```bash {frame="none"}
declare -- soda="green"
```

### Display All Vars Declaration

```bash {frame="none"}
declare -p
```

### Declare Env Vars

```bash {frame="none"}
declare -x soda="green"
```

```bash {frame="none"}
printenv soda
```

```bash {frame="none"}
green
```

The definition of soda can also be seen in `export`.

```bash {frame="none"}
export | grep soda
```

### Diff Between -x and --

It's not hard to see that the declaration symbols can be used to distinguish different types of variables.

* `-x`：Declaration of environment variables.
* `--`：Declaration of regular Shell variables.

```bash {frame="none"}
declare -p soda
```

```bash {frame="none"}
declare -x soda="green"
```

After canceling export.

```bash {frame="none"}
export -n soda
```

```bash {frame="none"}
declare -p soda
```

```bash {frame="none"}
declare -- soda="green"
```

## Built-in Cmd Manual

Some built-in commands cannot be viewed using `man`, but can be viewed using the `help` command or the `--help` option.

### export

```bash {frame="none"}
type -a export
```

```bash {frame="none"}
export is a shell builtin
```

***

```bash {frame="none"}
help export
```

```bash {frame="none"}
export --help
```

### declare

Same as above

### unset

Same as above
