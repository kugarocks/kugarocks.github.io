## Parameters: $?

The exit code of the previous command or script, 0 for success, non-0 for failure.

```bash
ls 404
```

```bash
echo $?
```

Will output 2, indicating failure. The return code can be specified in scripts using `exit`.

## Parameters: $#

Indicates the number of arguments passed to the script or function.

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

## Parameters: $*

All arguments passed to the script, separated by spaces by default.

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

The separator can be modified through the `IFS` variable.

## Parameters: $@

All arguments passed to the script, separated by spaces by default.

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

The separator can be modified through the `IFS` variable.

## Difference: $* vs $@

The main difference lies in handling arguments with spaces.

* `$*`: Represents all arguments as a single string, a whole.
* `$@`:
  * Without double quotes: Same as `$*`.
  * With double quotes: `"$@"`, represents an array of arguments, each argument is independent.

```bash
# Assuming the arguments passed are "arg1" "arg2 with space" "arg3"
for arg in "$@"; do
    echo "Argument: $arg"
done
```

```bash
# Passing all arguments to another script
another_script "$@"
```

## Parameters: $$

The process ID of the current script.

```bash
echo $$
```

## Parameters: $!

The process ID of the most recently backgrounded process.

```bash
echo $!
```

## Parameters: $0

The name of the current script.

```bash
echo $0
```

```txt
-bash
```

## Parameters: $n

The nth argument.

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

## Parameters: $-

The options of the script.

```bash
echo $-
```

```txt
himBHs
```

Above are the startup options of the current Shell.
