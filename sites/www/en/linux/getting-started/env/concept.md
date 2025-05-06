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

```bash
printenv | head -n 3
```

```bash
SHELL=/bin/bash
PWD=/home/kuga
LOGNAME=kuga
```

Prints a specific environment variable.

```bash
printenv PATH
```

```bash
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

### Command: env

Without arguments, it prints all environment variables.

```bash
env | head -n 3
```

```bash
SHELL=/bin/bash
PWD=/home/kuga
LOGNAME=kuga
```

### Command: echo

Prints a specified variable, which can be an environment variable or a Shell variable.

```bash
echo $HOME
```

```bash
/home/kuga
```

## Customizing Shell Vars

Defines a Shell variable named soda with the value green.

```bash
soda=green
```

```bash
echo $soda
```

```bash
green
```

### printenv

```bash
printenv soda
```

Outputs nothing, because soda **is not an environment variable, it's just a Shell variable**.

### Command Group

```bash
(echo $soda)
```

```bash
green
```

### Modify in Command Group

```bash
(soda=yellow; echo $soda); echo $soda
```

```bash
yellow
green
```

Subshell modifications do not affect external data.

### Creating a Bash Instance

```bash
bash
```

```bash
echo $soda
```

Outputs nothing, which is the basic scope of a regular Shell variable.

## Customizing Env Vars

Environment variables can be created by exporting Shell variables using the `export` command, as defined in the official manual.

```bash {frame="none" text-wrap="wrap"}
Mark each name to be passed to child processes in the environment.
```

```bash
Translation: Mark the variable name to be passed to child processes in the environment.
```

Variables can be defined and exported simultaneously, or separately.

```bash
export soda=green
```

```bash
soda=green; export soda;
```

### printenv

After being converted to an environment variable, printenv can normally print it.

```bash
printenv soda
```

```bash
green
```

### Command Group

```bash
(printenv soda)
```

```bash
green
```

### Modify in Command Group

```bash
(soda=yellow; echo $soda); echo $soda
```

```bash
yellow
green
```

Similarly, modifying environment variables within a subshell does not affect external data.

### Creating a Bash Instance

```bash
bash -c "printenv soda"
```

```bash
green
```

Environment variables are accessible in a new Bash instance.

### Get All Export Variables

Without arguments, or using `-p`, all export variables can be printed.

```bash
export
```

```bash
export | grep soda
```

```bash
declare -x soda="green"
```

### Cancel Export Env Vars

Using the `-n` option can cancel export, making it a regular Shell variable again.

```bash
export -n soda
```

```bash
printenv soda; echo $soda
```

printenv has no output, echo outputs normally, because soda is no longer an environment variable.

### Deleting Variables

Below will delete the entire variable, whether it's an environment variable or a Shell variable.

```bash
unset soda
```

```bash
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

```bash
declare soda="green"
```

```bash
echo $soda
```

### Display Var Declaration

```bash
declare -p soda
```

```bash
declare -- soda="green"
```

### Display All Vars Declaration

```bash
declare -p
```

### Declare Env Vars

```bash
declare -x soda="green"
```

```bash
printenv soda
```

```bash
green
```

The definition of soda can also be seen in `export`.

```bash
export | grep soda
```

### Diff Between -x and --

It's not hard to see that the declaration symbols can be used to distinguish different types of variables.

* `-x`：Declaration of environment variables.
* `--`：Declaration of regular Shell variables.

```bash
declare -p soda
```

```bash
declare -x soda="green"
```

After canceling export.

```bash
export -n soda
```

```bash
declare -p soda
```

```bash
declare -- soda="green"
```

## Built-in Cmd Manual

Some built-in commands cannot be viewed using `man`, but can be viewed using the `help` command or the `--help` option.

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

Same as above

### unset

Same as above
