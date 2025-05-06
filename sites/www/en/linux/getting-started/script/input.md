## Positional Parameters

Positional Parameters, script positional parameters.

* `$0`: script name, including path.
* `$1`: the first argument, and so on.
* `${10}`: arguments greater than 9 need to use curly braces.

```bash
#!/usr/bin/env bash

echo $0
echo $1
```

```bash
./foo a
```

```bash
./foo
a
```

## BASENAME

Can remove the script's path, leaving only the name.

```bash
basename /home/kuga/foo
```

Usage in the script.

```bash
name=$(basename $0)
```

## Special Parameters

[Reference here.](te-shu-can-shu.md)

## Shift Parameters

The `shift` command can shift the positional parameters to the left by one position.

```bash
#!/usr/bin/env bash

i=1
while [ -n "$1" ]
do
    echo "param #$i = $1"
    i=$[ $i + 1 ]
    shift
done
```

```bash
./foo a b
```

```txt
param #1 = a
param #2 = b
```

## Script Options

Options are single letters preceded by a single hyphen, such as `-a`. Since options and arguments are both located after the script, to distinguish them, a double hyphen `--` is usually used, with options on the left and arguments on the right, for example.

```bash
./foo -a -b -- p1 p2
```

To correctly interpret options and arguments in the script is not a trivial task, for which the official provides two tools.

* **`getopt`**
  * External command.
  * Supports long options, such as `--help`.
  * Suitable for complex command-line tools.
* **`getopts`**
  * Internal command.
  * Does not support long options.
  * Suitable for simple option scenarios.

There are also many option interpretation projects on Github.

## Getopt Command

```bash
getopt optstring parameters
```

* `optstring`: the definition of the options.
* `parameters`: the content of the options.

For example, for `optstring=ab:c`.

* Single letters `a` and `c` represent options without values.
* The letter `b` followed by `:` indicates an option with a value.

Let's look at the output of the following example.

```bash
getopt ab:c -a -b bval -c p1 p2
```

```bash
 -a -b bval -c -- p1 p2
```

It can be seen that it uses `--` to separate options and arguments.

## Getopts Command

`getopts` is a built-in command in Bash, which will parse options one by one and store the information of the options in specific variables, making it convenient for scripts to access. This is the command for me, a small potato.

```bash
getopts optstring name
```

* `name`: the name of the current option.
* `OPTIND`: each time an item is processed, this value will increase by 1.
* `OPTARG`: if the option has a value, it will be saved in this variable.

```bash
#!/usr/bin/env bash

while getopts "ab:c:" name; do
  case $name in
    a)
      echo "Option -a"
      ;;
    b)
      echo "Option -b: $OPTARG"
      ;;
    c)
      echo "Option -c: $OPTARG"
      ;;
    \?)
      echo "Invalid option: -$OPTARG"
      exit 1
      ;;
  esac
done

# Display the value of OPTIND
echo "OPTIND: $OPTIND"

# Use shift to remove parsed options and arguments
shift $((OPTIND - 1))

# Remaining non-option arguments
echo "Params: $@"
```

```bash
./foo -a -b v1 -c v2 p1 p2
```

```txt
Option -a
Option -b: v1
Option -c: v2
OPTIND: 6
Params: p1 p2
```
