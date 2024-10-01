---
title: "Output"
description: ""
summary: ""
date: 2024-08-31T20:00:00+08:00
lastmod: 2024-09-03T20:00:00+08:00
weight: 3500
seo:
  title: "Output"
  description: ""
  canonical: ""
  noindex: false
---

## Standard File Descriptors

Standard File Descriptors.

| Name     | Number | Description   |
| ------ | -- | ---- |
| STDIN  | 0  | Standard Input |
| STDOUT | 1  | Standard Output |
| STDERR | 2  | Standard Error |

### Standard Input

The `cat` command reads content from the standard input by default. If you run `cat` without specifying a filename, it will wait for user input.

```bash {frame="none"}
cat
```

Redirection is done using `<`.

```bash {frame="none"}
cat < foo
```

```bash {frame="none"}
wc < foo
```

### Standard Output

The default is the terminal or screen.

```bash {frame="none"}
echo "hello world"
```

Redirection is done using `>` or `1>`.

```bash {frame="none"}
echo "hello world" > foo
```

### Standard Error

The default is the terminal or screen.

```bash {frame="none"}
ls 404
```

Redirection is done using `2>`.

```bash {frame="none"}
ls 404 2> foo
```

Using `&>` can redirect both standard output and standard error output simultaneously.

```bash {frame="none"}
ls 404 &> foo
```

## EXEC Command

### Using in Command Line

```bash {frame="none"}
exec ls
```

The Shell process will be replaced by the new command's process, and after execution, it will not return to the original Shell.

### Using in Script

```bash {frame="none"}
#!/usr/bin/env bash

exec /bin/date
echo "This will never be executed"
```

The script process will be replaced by the `date` command, and `echo` will not be executed.

### File Descriptor Redirection

```bash {frame="none"}
#!/usr/bin/env bash

echo "This will output to the terminal"
exec 1> output.txt
echo "This will be written to output.txt"
```

When modifying file descriptors, it will not replace the current process, but will affect the input/output of subsequent commands.

## Closing File Descriptors

Redirecting to `&-` will close it. After closing, no more data can be written.

```bash {frame="none"}
#!/usr/bin/env bash

exec 3> testfile
echo "apple" >&3
exec 3>&-
```

## /dev/null

The null device, a bit bucket.

```bash {frame="none"}
crw-rw-rw- 1 root root 1, 3 Aug 14 23:16 /dev/null
```

Redirecting both standard output and standard error to the null device.

```bash {frame="none"}
command > /dev/null 2>&1
```

## MKTEMP Command

Creates a temporary file based on a filename template.

```bash {frame="none"}
filename.XXXXXX
```

The command will replace the X with random characters, and the template must have at least 6 X's.

### Creating Files

Files created by this command **only have permissions for the Owner**.

```bash {frame="none"}
mktemp foo.XXXXXX
```

```bash {frame="none"}
-rw------- 1 kuga kuga 0 Sep  2 17:27 foo.zPtFtG
```

### Creating Directories

```bash {frame="none"}
mktemp -d bar.XXXXXX
```

```bash {frame="none"}
drwx------ 2 kuga kuga 4096 Sep  2 17:29 bar.RQAMzc
```

### Using the /tmp Directory

Using the `-t` option will create files in the /tmp directory.

```bash {frame="none"}
mktemp -t foo.XXXXXX
```

```bash {frame="none"}
/tmp/foo.0IglAI
```

## TEE Command

Simultaneously redirects data to standard output and a file.

```txt {frame="none"}
tee - read from standard input and write to standard output and files
```

```bash {frame="none"}
date | tee testfile
```

```bash {frame="none"}
Mon Sep  2 05:36:44 PM CST 2024
```

```bash {frame="none"}
cat testfile
```

```bash {frame="none"}
Mon Sep  2 05:36:44 PM CST 2024
```

The same data is on both the screen and in the file.
