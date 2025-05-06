## Parameter Expansion

In Bash, parameter expansion is a mechanism for manipulating and handling the contents of variables.
Through parameter expansion, you can get the value of a variable, modify the value of a variable, or provide a default value for an unset variable.

::: info Shell Parameter Expansion
<a href="https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion" target="_blank">https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion</a>
:::

## Variable Expansion

The most common way.

```bash
var="Bash"
echo "Hello, ${var}!"
```

## Default Value Expansion

### Mark +

```bash
${var+DEFAULT}
```

* var is undefined: returns an empty string.
* var is defined:
  * is empty: returns DEFAULT.
  * is not empty: returns DEFAULT.

```bash
unset var
echo ${var+foo}
```

```txt
 
```

***

```bash
var=
echo ${var+foo}
```

```txt
foo
```

**This mark can be used to determine whether a variable is undefined.**

```bash
#!/usr/bin/env bash

if [ -n "${var+defined}" ]; then
    echo "var already defined"
else
    echo "var not defined"
fi
```

{{< callout context="danger" title="Note" >}}
If `${var+defined}` is not used with double quotes, when an empty string is returned, the condition will become `[ -n ]`, which is a valid condition, will not produce any errors, and its return value is true. Obviously this is unreasonable, so double quotes must be added.
{{< /callout >}}

### Mark -

```bash
${var-DEFAULT}
```

* var is undefined: returns DEFAULT.
* var is defined:
  * is empty: returns var.
  * is not empty: returns var.

```bash
unset var
echo ${var-foo}
```

```txt
foo
```

***

```bash
var=
echo ${var-foo}
```

```txt
 
```

var and DEFAULT values may be the same, so they cannot be used to determine whether var is defined.

### Mark :+

```bash
${var:+DEFAULT}
```

* var is undefined: returns an empty string.
* var is defined:
  * is empty: returns an empty string.
  * is not empty: returns DEFAULT.

```bash
var=abc
echo ${var:+foo}
```

```txt
foo
```

### Mark :-

```bash
${var:-DEFAULT}
```

* var is undefined: returns DEFAULT.
* var is defined
  * is empty: returns DEFAULT.
  * is not empty: returns var.

```bash
unset var
echo ${var:-foo}
```

```bash
var=
echo ${var:-foo}
```

Both of the above two examples will output foo.

### Mark :=

* var is undefined: var=foo, returns var.
* var is defined
  * is empty: var=foo, returns var.
  * is not empty: returns var.

```bash
unset var
echo ${var:=foo}
echo $var
```

```txt
foo
foo
```

## String Operations

### Extract Substring

```bash
var="heybro!"
echo ${var:3:4}
```

```txt
bro!
```

### String Length

```bash
var="heybro!"
echo ${#var}
```

```txt
7
```

### Remove Prefix

Remove the shortest match: use `#`, pattern `*/`.

```bash
var="a/b/c"
echo ${var#*/}
```

```txt
b/c
```

Remove the longest match: use `##`, pattern `*/`.

```bash
var="a/b/c"
echo ${var##*/}
```

```txt
c
```

### Remove Suffix

Remove the shortest match: use `%`, pattern `/*`.

```bash
var="a/b/c"
echo ${var%/*}
```

```txt
a/b
```

Remove the longest match: use `%%`, pattern `/*`.

```bash
var="a/b/c"
echo ${var%%/*}
```

```txt
a
```

### Replace First Substring

```bash
var="aa bb aa"
echo ${var/aa/cc}
```

```txt
cc bb aa
```

### Replace All Substrings

```bash
var="aa bb aa"
echo ${var//aa/cc}
```

```txt
cc bb cc
```
