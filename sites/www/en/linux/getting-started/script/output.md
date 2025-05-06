## Standard File Descriptors

Standard File Descriptors.

| Name     | Number | Description   |
| ------ | -- | ---- |
| STDIN  | 0  | Standard Input |
| STDOUT | 1  | Standard Output |
| STDERR | 2  | Standard Error |

### Standard Input

The `cat` command reads content from the standard input by default. If you run `cat` without specifying a filename, it will wait for user input.

```bash
cat
```

Redirection is done using `<`.

```bash
cat < foo
```

```bash
wc < foo
```

### Standard Output

The default is the terminal or screen.

```bash
echo "hello world"
```

Redirection is done using `>` or `1>`.

```bash
echo "hello world" > foo
```

### Standard Error

The default is the terminal or screen.

```bash
ls 404
```

Redirection is done using `2>`.

```bash
ls 404 2> foo
```

Using `&>` can redirect both standard output and standard error output simultaneously.

```bash
ls 404 &> foo
```

## EXEC Command

### Using in Command Line

```bash
exec ls
```

The Shell process will be replaced by the new command's process, and after execution, it will not return to the original Shell.

### Using in Script

```bash
#!/usr/bin/env bash

exec /bin/date
echo "This will never be executed"
```

The script process will be replaced by the `date` command, and `echo` will not be executed.

### File Descriptor Redirection

```bash
#!/usr/bin/env bash

echo "This will output to the terminal"
exec 1> output.txt
echo "This will be written to output.txt"
```

When modifying file descriptors, it will not replace the current process, but will affect the input/output of subsequent commands.

## Closing File Descriptors

Redirecting to `&-` will close it. After closing, no more data can be written.

```bash
#!/usr/bin/env bash

exec 3> testfile
echo "apple" >&3
exec 3>&-
```

## /dev/null

The null device, a bit bucket.

```bash
crw-rw-rw- 1 root root 1, 3 Aug 14 23:16 /dev/null
```

Redirecting both standard output and standard error to the null device.

```bash
command > /dev/null 2>&1
```

## MKTEMP Command

Creates a temporary file based on a filename template.

```bash
filename.XXXXXX
```

The command will replace the X with random characters, and the template must have at least 6 X's.

### Creating Files

Files created by this command **only have permissions for the Owner**.

```bash
mktemp foo.XXXXXX
```

```bash
-rw------- 1 kuga kuga 0 Sep  2 17:27 foo.zPtFtG
```

### Creating Directories

```bash
mktemp -d bar.XXXXXX
```

```bash
drwx------ 2 kuga kuga 4096 Sep  2 17:29 bar.RQAMzc
```

### Using the /tmp Directory

Using the `-t` option will create files in the /tmp directory.

```bash
mktemp -t foo.XXXXXX
```

```bash
/tmp/foo.0IglAI
```

## TEE Command

Simultaneously redirects data to standard output and a file.

```txt
tee - read from standard input and write to standard output and files
```

```bash
date | tee testfile
```

```bash
Mon Sep  2 05:36:44 PM CST 2024
```

```bash
cat testfile
```

```bash
Mon Sep  2 05:36:44 PM CST 2024
```

The same data is on both the screen and in the file.
