---
title: "Special Parameters"
description: ""
summary: ""
date: 2024-08-30T20:00:00+08:00
lastmod: 2024-08-30T20:00:00+08:00
weight: 3900
seo:
  title: "Special Parameters"
  description: ""
  canonical: ""
  noindex: false
---

## Parameters: $?

The exit code of the previous command or script, 0 for success, non-0 for failure.

```bash {frame="none"}
ls 404
```

```bash {frame="none"}
echo $?
```

Will output 2, indicating failure. The return code can be specified in scripts using `exit`.

## Parameters: $#

Indicates the number of arguments passed to the script or function.

```bash {frame="none"}
#!/usr/bin/env bash
echo $#
```

```bash {frame="none"}
./foo p1 p2
```

```txt {frame="none"}
2
```

## Parameters: $*

All arguments passed to the script, separated by spaces by default.

```bash {frame="none"}
#!/usr/bin/env bash
echo $*
```

```bash {frame="none"}
./foo p1 p2p3
```

```txt {frame="none"}
p1 p2p3
```

The separator can be modified through the `IFS` variable.

## Parameters: $@

All arguments passed to the script, separated by spaces by default.

```bash {frame="none"}
#!/usr/bin/env bash
echo $@
```

```bash {frame="none"}
./foo p1 p2p3
```

```txt {frame="none"}
p1 p2p3
```

The separator can be modified through the `IFS` variable.

## Difference: $* vs $@

The main difference lies in handling arguments with spaces.

* `$*`: Represents all arguments as a single string, a whole.
* `$@`:
  * Without double quotes: Same as `$*`.
  * With double quotes: `"$@"`, represents an array of arguments, each argument is independent.

```bash {frame="none"}
# Assuming the arguments passed are "arg1" "arg2 with space" "arg3"
for arg in "$@"; do
    echo "Argument: $arg"
done
```

```bash {frame="none"}
# Passing all arguments to another script
another_script "$@"
```

## Parameters: $$

The process ID of the current script.

```bash {frame="none"}
echo $$
```

## Parameters: $!

The process ID of the most recently backgrounded process.

```bash {frame="none"}
echo $!
```

## Parameters: $0

The name of the current script.

```bash {frame="none"}
echo $0
```

```txt {frame="none"}
-bash
```

## Parameters: $n

The nth argument.

```bash {frame="none"}
#!/usr/bin/env bash
echo $1
```

```bash {frame="none"}
./foo a b c
```

```txt {frame="none"}
a
```

## Parameters: $-

The options of the script.

```bash {frame="none"}
echo $-
```

```txt {frame="none"}
himBHs
```

Above are the startup options of the current Shell.
