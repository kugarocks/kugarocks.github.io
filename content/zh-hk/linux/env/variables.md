---
title: "常見環境變量"
description: ""
summary: ""
date: 2024-08-27T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 1900
seo:
  title: "常見環境變量"
  description: ""
  canonical: ""
  noindex: false
---

## SHELL

當前使用嘅 Shell。

```bash {frame="none"}
printenv SHELL
```

```bash {frame="none"}
/bin/bash
```

## HOME

用戶主目錄路徑。

```bash {frame="none"}
printenv HOME
```

```bash {frame="none"}
/home/kuga
```

## PWD

當前目錄嘅路徑。

```bash {frame="none"}
printenv PWD
```

```bash {frame="none"}
/home/kuga
```

## USER

當前用戶。

```bash {frame="none"}
printenv USER
```

```bash {frame="none"}
kuga
```

## PATH

可執行程序搜索嘅路徑__AB__以冒號分隔。

```bash {frame="none"}
printenv PATH
```

```bash {frame="none"}
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

## SHLVL

Shell 嘅層級__AB__從 1 開始。

```bash {frame="none"}
printenv SHLVL
```

```bash {frame="none"}
1
```
