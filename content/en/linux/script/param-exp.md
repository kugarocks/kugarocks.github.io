---
title: "Parameter Expansion"
description: ""
summary: ""
date: 2024-09-02T20:00:00+08:00
lastmod: 2024-09-03T20:00:00+08:00
weight: 3800
seo:
  title: "Parameter Expansion"
  description: ""
  canonical: ""
  noindex: false
---

## Parameter Expansion

In Bash, parameter expansion is a mechanism for manipulating and handling the contents of variables.
Through parameter expansion, you can get the value of a variable, modify the value of a variable, or provide a default value for an unset variable.

{{< link-card
  title="Shell Parameter Expansion"
  description="gnu.org"
  href="https://www.gnu.org/software/bash/manual/bash.html#Shell-Parameter-Expansion"
  target="_blank"
>}}

## Variable Expansion

The most common way.

```bash {frame="none"}
var="Bash"
echo "Hello, ${var}!"
```

## Default Value Expansion

### Mark +

```bash {frame="none"}
${var+DEFAULT}
```

* var is undefined: returns an empty string.
* var is defined:
  * is empty: returns DEFAULT.
  * is not empty: returns DEFAULT.

```bash {frame="none"}
unset var
echo ${var+foo}
```

```txt {frame="none"}
 
```

***

```bash {frame="none"}
var=
echo ${var+foo}
```

```txt {frame="none"}
foo
```

**This mark can be used to determine whether a variable is undefined.**

```bash {frame="none"}
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

```bash {frame="none"}
${var-DEFAULT}
```

* var is undefined: returns DEFAULT.
* var is defined:
  * is empty: returns var.
  * is not empty: returns var.

```bash {frame="none"}
unset var
echo ${var-foo}
```

```txt {frame="none"}
foo
```

***

```bash {frame="none"}
var=
echo ${var-foo}
```

```txt {frame="none"}
 
```

var and DEFAULT values may be the same, so they cannot be used to determine whether var is defined.

### Mark :+

```bash {frame="none"}
${var:+DEFAULT}
```

* var is undefined: returns an empty string.
* var is defined:
  * is empty: returns an empty string.
  * is not empty: returns DEFAULT.

```bash {frame="none"}
var=abc
echo ${var:+foo}
```

```txt {frame="none"}
foo
```

### Mark :-

```bash {frame="none"}
${var:-DEFAULT}
```

* var is undefined: returns DEFAULT.
* var is defined
  * is empty: returns DEFAULT.
  * is not empty: returns var.

```bash {frame="none"}
unset var
echo ${var:-foo}
```

```bash {frame="none"}
var=
echo ${var:-foo}
```

Both of the above two examples will output foo.

### Mark :=

* var is undefined: var=foo, returns var.
* var is defined
  * is empty: var=foo, returns var.
  * is not empty: returns var.

```bash {frame="none"}
unset var
echo ${var:=foo}
echo $var
```

```txt {frame="none"}
foo
foo
```

## String Operations

### Extract Substring

```bash {frame="none"}
var="heybro!"
echo ${var:3:4}
```

```txt {frame="none"}
bro!
```

### String Length

```bash {frame="none"}
var="heybro!"
echo ${#var}
```

```txt {frame="none"}
7
```

### Remove Prefix

Remove the shortest match: use `#`, pattern `*/`.

```bash {frame="none"}
var="a/b/c"
echo ${var#*/}
```

```txt {frame="none"}
b/c
```

Remove the longest match: use `##`, pattern `*/`.

```bash {frame="none"}
var="a/b/c"
echo ${var##*/}
```

```txt {frame="none"}
c
```

### Remove Suffix

Remove the shortest match: use `%`, pattern `/*`.

```bash {frame="none"}
var="a/b/c"
echo ${var%/*}
```

```txt {frame="none"}
a/b
```

Remove the longest match: use `%%`, pattern `/*`.

```bash {frame="none"}
var="a/b/c"
echo ${var%%/*}
```

```txt {frame="none"}
a
```

### Replace First Substring

```bash {frame="none"}
var="aa bb aa"
echo ${var/aa/cc}
```

```txt {frame="none"}
cc bb aa
```

### Replace All Substrings

```bash {frame="none"}
var="aa bb aa"
echo ${var//aa/cc}
```

```txt {frame="none"}
cc bb cc
```
