---
title: "文件描述符"
description: ""
summary: ""
date: 2024-08-30T20:00:00+08:00
lastmod: 2024-09-01T20:00:00+08:00
weight: 2600
seo:
  title: "文件描述符"
  description: ""
  canonical: ""
  noindex: false
---

## 基本概念

文件描述符（File Descriptor，FD） 是在操作系统中，
用来表示已打开的文件或其他输入/输出资源的**整数标识符**。
它是操作系统与应用程序之间进行文件操作的桥梁。

在 Linux 中，文件描述符是一个非负整数，
操作系统为每个打开的文件或输入/输出（I/O）资源（如管道、网络套接字等）分配一个文件描述符。
每当进程请求打开一个文件或资源时，操作系统会返回一个文件描述符，
以后进程就可以通过这个描述符来访问该文件或资源。

## 常见的文件描述符

所有进程都会自动打开下面 3 个文件描述符。

| 描述符 | 名称 | 描述 |
| --- | --- | --- |
| `0` | STDIN | 标准输入 |
| `1` | STDOUT | 标准输出 |
| `2` | STDERR | 标准错误 |

例如：命令的重定向就直接使用了上面的文件描述符。

```bash {frame="none"}
cmd > foo.log 2> err.log
```

上面的 `>` 和 `1>` 是一样的。

## 代码中的文件描述符

操作系统通过文件描述符来管理文件操作。
常见的文件操作（如读取、写入、关闭）通常都需要文件描述符。
下面是一些常见的操作及其文件描述符的使用：

### 打开文件

&#x20;`open()` 系统调用会返回一个文件描述符。

```c {frame="none"}
int fd = open("example.txt", O_RDONLY);
```

### 读取文件

通过文件描述符读取内容。

```c {frame="none"}
char buffer[100];
read(fd, buffer, sizeof(buffer));
```

### 写入文件

通过文件描述符将数据写入文件。

```c {frame="none"}
write(fd, "Hello, World!", 13);
```

### 关闭文件

关闭文件描述符，以释放系统资源。

```c {frame="none"}
close(fd);
```

## 进程中的文件描述符

每个进程都有一个对应的 `/proc/PID/fd/` 目录，其中包含了所有该进程打开的文件描述符的符号链接。

```bash {frame="none"}
ls -l /proc/NGINX_PID/fd
```

```bash {frame="none"}
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

## 总结

文件描述符为进程提供了一种抽象。
程序可以使用统一的接口进行各种 I/O 操作，而不必关心底层的物理设备细节。
例如，读取文件、从网络套接字接收数据以及从管道中读取数据，
都可以使用相同的 `read()` 函数来实现，这都是通过文件描述符来统一管理的。
