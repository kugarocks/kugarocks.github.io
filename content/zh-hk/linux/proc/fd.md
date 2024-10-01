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

文件描述符（File Descriptor，FD）係喺操作系統中，用嚟表示已打開嘅文件或其他輸入/輸出資源嘅**整數標識符**。
佢係操作系統同應用程序之間進行文件操作嘅橋樑。

喺 Linux 中，文件描述符係一個非負整數，操作系統為每個打開嘅文件或輸入/輸出（I/O）資源（如管道、網絡套接字等）分配一個文件描述符。
每當進程請求打開一個文件或資源時，操作系統會返回一個文件描述符，以後進程就可以通過呢個描述符嚟訪問該文件或資源。

## 常見嘅文件描述符

所有進程都會自動打開下面 3 個文件描述符。

| 描述符 | 名稱 | 描述 |
| --- | --- | --- |
| `0` | STDIN | 標準輸入 |
| `1` | STDOUT | 標準輸出 |
| `2` | STDERR | 標準錯誤 |

例如：命令嘅重定向就直接使用咗上面嘅文件描述符。

```bash {frame="none"}
cmd > foo.log 2> err.log
```

上面嘅 `>` 同 `1>` 係一樣嘅。

## 代碼中嘅文件描述符

操作系統通過文件描述符嚟管理文件操作。常見嘅文件操作（如讀取、寫入、關閉）通常都需要文件描述符。
下面係一啲常見嘅操作及其文件描述符嘅使用：

### 打開文件

`open()` 系統調用會返回一個文件描述符。

```c {frame="none"}
int fd = open("example.txt", O_RDONLY);
```

### 讀取文件

通過文件描述符讀取內容。

```c {frame="none"}
char buffer[100];
read(fd, buffer, sizeof(buffer));
```

### 寫入文件

通過文件描述符將數據寫入文件。

```c {frame="none"}
write(fd, "Hello, World!", 13);
```

### 關閉文件

關閉文件描述符，以釋放系統資源。

```c {frame="none"}
close(fd);
```

## 進程中嘅文件描述符

每個進程都有一個對應嘅 `/proc/PID/fd/` 目錄，其中包含咗所有該進程打開嘅文件描述符嘅符號鏈接。

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

## 總結

文件描述符為進程提供咗一種抽象。程序可以使用統一嘅接口進行各種 I/O 操作，而唔使關心底層嘅物理設備細節。
例如，讀取文件、從網絡套接字接收數據以及從管道中讀取數據，都可以使用相同嘅 `read()` 函數嚟實現，呢啲都係通過文件描述符嚟統一管理嘅。
