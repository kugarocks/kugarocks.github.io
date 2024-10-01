---
title: "Environment Variables"
description: ""
summary: ""
date: 2024-08-27T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 1900
seo:
  title: "Environment Variables"
  description: ""
  canonical: ""
  noindex: false
---

## SHELL

The current shell in use.

```bash {frame="none"}
printenv SHELL
```

```bash {frame="none"}
/bin/bash
```

## HOME

The path to the user's home directory.

```bash {frame="none"}
printenv HOME
```

```bash {frame="none"}
/home/kuga
```

## PWD

The path to the current directory.

```bash {frame="none"}
printenv PWD
```

```bash {frame="none"}
/home/kuga
```

## USER

The current user.

```bash {frame="none"}
printenv USER
```

```bash {frame="none"}
kuga
```

## PATH

The path where executable programs are searched, separated by colons.

```bash {frame="none"}}
printenv PATH
```

```bash {frame="none"}}
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

## SHLVL

The level of the shell, starting from 1.

```bash {frame="none"}}
printenv SHLVL
```

```bash {frame="none"}}
1
```
