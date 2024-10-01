---
title: "Shebang"
description: ""
summary: ""
date: 2024-08-27T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 2000
seo:
  title: "Shebang"
  description: ""
  canonical: ""
  noindex: false
---

## Introduction

Shebang is a special symbol in Unix and Unix-like operating systems, composed of the characters `#!`, used to indicate which interpreter should execute a script file. It usually appears at the beginning of a script file, followed by the path of the interpreter.
Shebang allows script files to be run directly like executable programs, without manually calling the interpreter.

## Origin of the Name

`#` in English represents hash or sharp, `!` in programming and command lines represents bang, and the combination of these two symbols is called hash-bang or sharp-bang. Over time, hash-bang was simplified to shebang.

## Specifying the Interpreter

The path specified after Shebang is the location of the interpreter, such as:

```bash {frame="none"}
#!/bin/bash
```

The system will use the bash under this path to execute the script content.

## Unified Execution Form

Scripts of different types can be uniformly executed using the form `./file`, without explicitly calling the interpreter.

```bash {frame="none"}
#!/bin/bash
```

No need to use `bash file` to execute, directly use `./file`.

```bash {frame="none"}
#!/bin/python3
```

No need to use `python file` to execute, directly use `./file`.

## Common Examples

We often see the following examples in bash scripts.

```bash {frame="none"}
#!/usr/bin/env bash
```

`env` is a command related to environment variables.
When the argument following it is `bash`, it will search for the bash interpreter based on the path provided by the environment variable `PATH`.
The advantage of doing this is that there is no need to hard-code the path of the bash interpreter, because the bash interpreter may be in different locations in different systems.

```bash {frame="none"}
type -a bash
```

```bash {frame="none"}
bash is /usr/bin/bash
bash is /bin/bash
```

For the above python example, a better Shebang is to use env.

```bash {frame="none"}
#!/usr/bin/env python
```

## Manual Invocation

If there is no Shebang, the interpreter can be manually called.

```bash {frame="none"}
bash script.sh
```
