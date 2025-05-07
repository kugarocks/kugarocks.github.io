# File Descriptor

## Basic Concepts

A file descriptor (FD) is an **integer identifier** used to represent an open file or other input/output resources in an operating system.
It serves as a bridge between the operating system and applications for file operations.

In Linux, a file descriptor is a non-negative integer,
and the operating system assigns a file descriptor to each open file or input/output (I/O) resource (such as pipes, network sockets, etc.).
Whenever a process requests to open a file or resource, the operating system returns a file descriptor,
and the process can then access that file or resource through this descriptor.

## Common File Descriptors

All processes automatically open the following 3 file descriptors.

| Descriptor | Name | Description |
| --- | --- | --- |
| `0` | STDIN | Standard Input |
| `1` | STDOUT | Standard Output |
| `2` | STDERR | Standard Error |

For example, command redirection directly uses the above file descriptors.

```bash
cmd > foo.log 2> err.log
```

The above `>` and `1>` are the same.

## File Descriptors in Code

The operating system manages file operations through file descriptors.
Common file operations (such as reading, writing, closing) usually require file descriptors.
Below are some common operations and their use of file descriptors:

### Opening a File

The `open()` system call returns a file descriptor.

```c
int fd = open("example.txt", O_RDONLY);
```

### Reading a File

Read content through the file descriptor.

```c
char buffer[100];
read(fd, buffer, sizeof(buffer));
```

### Writing to a File

Write data to a file through the file descriptor.

```c
write(fd, "Hello, World!", 13);
```

### Closing a File

Close the file descriptor to release system resources.

```c
close(fd);
```

## File Descriptors in Process

Each process has a corresponding `/proc/PID/fd/` directory, which contains symbolic links to all file descriptors opened by that process.

```bash
ls -l /proc/NGINX_PID/fd
```

```bash
lrwx------ 1 ... 0 -> /dev/null
lrwx------ 1 ... 1 -> /dev/null
lrwx------ 1 ... 10 -> 'socket:[21631]'
l-wx------ 1 ... 2 -> /var/log/nginx/error.log
lrwx------ 1 ... 3 -> 'socket:[21628]'
l-wx------ 1 ... 4 -> /var/log/nginx/access.log
l-wx------ 1 ... 5 -> /var/log/nginx/error.log
lrwx------ 1 ... 6 -> 'socket:[21614]'
lrwx------ 1 ... 7 -> 'socket:[21615]'
lrwx------ 1 ... 8 -> 'socket:[21629]'
lrwx------ 1 ... 9 -> 'socket:[21630]'
```

## Summary

File descriptors provide an abstraction for processes.
Programs can use a unified interface for various I/O operations without worrying about the underlying physical device details.
For example, reading a file, receiving data from a network socket, and reading from a pipe,
can all be implemented using the same `read()` function, which is all managed uniformly through file descriptors.
