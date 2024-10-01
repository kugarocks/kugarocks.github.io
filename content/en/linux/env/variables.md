---
title: "常见环境变量"
description: ""
summary: ""
date: 2024-08-27T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 1900
seo:
  title: "常见环境变量"
  description: ""
  canonical: ""
  noindex: false
---

## SHELL

当前使用的 Shell。

```bash {frame="none"}
printenv SHELL
```

```bash {frame="none"}
/bin/bash
```

## HOME

用户主目录路径。

```bash {frame="none"}
printenv HOME
```

```bash {frame="none"}
/home/kuga
```

## PWD

当前目录的路径。

```bash {frame="none"}
printenv PWD
```

```bash {frame="none"}
/home/kuga
```

## USER

当前用户。

```bash {frame="none"}
printenv USER
```

```bash {frame="none"}
kuga
```

## PATH

可执行程序搜索的路径，以冒号分隔。

```bash {frame="none"}
printenv PATH
```

```bash {frame="none"}
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

## SHLVL

Shell 的层级，从 1 开始。

```bash {frame="none"}
printenv SHLVL
```

```bash {frame="none"}
1
```
