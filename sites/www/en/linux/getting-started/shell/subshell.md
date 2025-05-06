# Subshell

The definition of Subshell in some books or materials is unclear, and the explanations often contradict each other, making it difficult to understand.
Therefore, to avoid this semantic and logical problem, we will not provide its definition (it is recommended to refer to the official BASH manual),
nor will we use the translation "sub Shell", but rather understand its definition from its actual behavior.
The variables listed below are closely related to the concept of Subshell.

::: info Bash Reference Manual
https://www.gnu.org/software/bash/manual/bash.html
:::

## BASH_SUBSHELL

Shell variable, **not an environment variable**, as explained in the official manual.

```bash {frame="none" text-wrap="wrap"}
Incremented by one within each subshell or subshell environment when the shell begins executing in that environment. The initial value is 0. If BASH_SUBSHELL is unset, it loses its special properties, even if it is subsequently reset.
```

You can also use the man command, which may have some differences in content.

```bash
man bash | grep -A 3 'BASH_SUBSHELL' | head -n 4
```

***

```bash
echo $BASH_SUBSHELL
```

```bash
0
```

## SHLVL

**Environment variable**, as explained in the official manual.

```bash {frame="none" text-wrap="wrap"}
Incremented by one each time a new instance of Bash is started. This is intended to be a count of how deeply your Bash shells are nested.
```

Using the man command.

```bash
man bash | grep 'SHLVL'
```

This value starts from 1.

```bash
echo $SHLVL
```

```bash
1
```

## Command Grouping

Full name Command Grouping, Bash provides two methods for creating command grouping.

### Parentheses: ()

This method creates a Subshell environment to handle command grouping.

```bash
(pwd; echo $BASH_SUBSHELL)
```

```bash
/home/kuga
1
```

***

```bash
(pwd; (echo $BASH_SUBSHELL))
```

```bash
/home/kuga
2 
```

***

```bash
(pwd; (echo $SHLVL))
```

```bash
1
```

We can draw the following conclusions.

* BASH_SUBSHELL: Increases by 1 for each Subshell created.
* SHLVL: Does not change regardless of how many Subshells are created.

### Braces: {}

This method does not create a Subshell, and command grouping is processed in the context of the current Shell.
In syntax, the space between the braces and the command cannot be omitted, and the semicolon at the end of each command is also required.

```bash
{ pwd; { echo $BASH_SUBSHELL; } }
```

```bash
/home/kuga
0
```

***

```bash
{ pwd; { echo $SHLVL; } }
```

```bash
/home/kuga
1
```

## Shell PID

You can view the Shell's PID through BASHPID or `$$`, but they are different.

### BASHPID

Shell variable, **not an environment variable**, as explained in the official manual.

```bash {frame="none" text-wrap="wrap"}
Expands to the process ID of the current Bash process. This differs from $$ under certain circumstances, such as subshells that do not require Bash to be re-initialized. Assignments to BASHPID have no effect. If BASHPID is unset, it loses its special properties, even if it is subsequently reset.
```

```bash
echo $BASHPID
```

```bash
56414
```

Using `()` to view BASHPID.

```bash
(ps -f --forest; echo $BASHPID)
```

```bash
UID          PID    PPID  C STIME TTY          TIME CMD
kuga       56414   56412  0 10:11 pts/0    00:00:00 -bash
kuga       57325   56414  0 15:13 pts/0    00:00:00  \_ -bash
kuga       57326   57325  0 15:13 pts/0    00:00:00      \_ ps -f --forest
57325
```

It can be seen that BASHPID outputs the PID of the Subshell.

### Special Parameter $$

Official explanation.

```bash {frame="none" text-wrap="wrap"}
($$) Expands to the process ID of the shell. In a subshell, it expands to the process ID of the invoking shell, not the subshell.
```

In a Subshell, `$$` represents the PID of the invoking shell.

```bash
(pwd; (ps -f --forest; echo $$))
```

```bash
/home/kuga
UID          PID    PPID  C STIME TTY          TIME CMD
kuga       56414   56412  0 10:11 pts/0    00:00:00 -bash
kuga       57347   56414  0 15:20 pts/0    00:00:00  \_ -bash
kuga       57348   57347  0 15:20 pts/0    00:00:00      \_ -bash
kuga       57349   57348  0 15:20 pts/0    00:00:00          \_ ps -f --forest
56414
```

It can be seen that, regardless of how many Subshells there are, `$$` always represents the PID of the top-level Bash.

## Creating a Bash Instance

In Bash, typing `bash` creates a brand new Bash instance.

```bash
bash
```

```bash
ps -f --forest
```

```bash
UID          PID    PPID  C STIME TTY          TIME CMD
kuga       56414   56412  0 10:11 pts/0     00:00:00 -bash
kuga       57359   56414  0 15:29 pts/0     00:00:00  \_ bash
kuga       57402   57359  0 15:30 pts/0     00:00:00      \_ ps -f --forest
```

At this point, let's observe the variables mentioned above again.

```bash
echo $BASH_SUBSHELL $SHLVL $BASHPID $$
```

```bash
0 2 57359 57359
```

* BASH_SUBSHELL: No change.
* SHLVL: From 1 -> 2.
* BASHPID: The PID of the new Bash instance.
* \$\$: The PID of the new Bash instance.

If we say that this way of creating Bash is also a Subshell, the semantics and behavior would be contradictory.
