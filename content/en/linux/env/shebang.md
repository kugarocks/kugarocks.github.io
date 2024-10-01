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

## 简介

Shebang 是 Unix 和类 Unix 操作系统中的一个特殊符号，由字符 `#!` 组成，
用于指示脚本文件应该由哪个解释器来执行。它通常出现在脚本文件的第一行，后面跟着解释器的路径。
Shebang 使得脚本文件能够像可执行程序一样直接运行，而不必手动调用解释器。

## 名称由来

`#` 在英语中表示 hash 或 sharp，`!` 在编程和命令行中表示 bang，
这两个符号组合在一起就成了 hash-bang 或 sharp-bang。
随着时间的推移，hash-bang 最终简化为 shebang。

## 指定解释器

Shebang 后面指定的路径是解释器的位置，例如：

```bash {frame="none"}
#!/bin/bash
```

系统会使用该路径下的 bash 来执行这个脚本内容。

## 统一执行形式

不同类型的脚本可以统一使用 `./file` 的形式执行，无需显式调用解释器。

```bash {frame="none"}
#!/bin/bash
```

无需使用 `bash file` 执行，直接使用 `./file`。

```bash {frame="none"}
#!/bin/python3
```

无需使用 `python file` 执行，直接使用 `./file`。

## 常见例子

我们在 bash 脚本中常常会看到下面的例子。

```bash {frame="none"}
#!/usr/bin/env bash
```

`env` 是一个与环境变量相关的命令。
当后面跟的参数是 `bash` 时，它会根据环境变量 `PATH` 提供的路径查找 bash 的解释器。
这样做的好处是无须写死 bash 解释器的路径，因为在不同的系统中，bash 解释器可能会在不同的位置。

```bash {frame="none"}
type -a bash
```

```bash {frame="none"}
bash is /usr/bin/bash
bash is /bin/bash
```

对于上面的 python 例子，更好的 Shebang 是使用 env。

```bash {frame="none"}
#!/usr/bin/env python
```

## 手动调用

如果没有 Shebang，可以手动调用解释器。

```bash {frame="none"}
bash script.sh
```
