---
title: "Commands-2"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-29T20:00:00+08:00
weight: 1100
seo:
  title: "Commands-2"
  description: ""
  canonical: ""
  noindex: false
---

## Sort

Sorts lines of text files by default, non-numeric.

```bash {frame="none"}
sort - sort lines of text files
```

### Reverse Order

```bash {frame="none"}
sort -r file
```

### Numeric Sort

```bash {frame="none"}
sort -n file
```

### Sort By Month

Month format: `Jan`, `Feb`, `Mar`.

```bash {frame="none"}
sort -M file
```

### Specify Column

Default is separated by (consecutive) spaces or tabs.

```bash {frame="none"}
sort -k 1 file
```

### Specify Delimiter And Column

`-k` index starts from 1, the 3rd column is the user ID.

```bash {frame="none"}
sort -t ':' -k 3 -n /etc/passwd
```

### Ignore Case

```bash {frame="none"}
sort -f file
```

### Remove Duplicates

```bash {frame="none"}
sort -u file
```

## Alias

```bash {frame="none"}
sort - sort lines of text files
```

### Possible Aliases

```bash {frame="none"}
alias -p
```

## Type

### External/Internal Command

Can view if a command is an internal command, internal commands are compiled into the shell, different from external commands, no subprocess execution is required.

```bash {frame="none"}
type cd
```

```bash {frame="none"}
cd is a shell builtin
```

***

```bash {frame="none"}
type ps
```

```bash {frame="none"}
ps is hashed (/usr/bin/ps)
```

### All Implementations

```bash {frame="none"}
type -a echo
```

```bash {frame="none"}
echo is a shell builtin
echo is /usr/bin/echo
echo is /bin/echo
```

### Command Aliases

```bash {frame="none"}
type ll
```

```bash {frame="none"}
ll is aliased to `ls -alF'
```

***

```bash {frame="none"}
type -a ls
```

```bash {frame="none"}
ls is aliased to `ls --color=auto'
ls is /usr/bin/ls
ls is /bin/ls
```

## Readlink

```bash {frame="none"}
readlink - print resolved symbolic links or canonical file names
```

### Final Link

No need to look one by one.

```bash {frame="none"}
readlink -f /bin/vim
```

```bash {frame="none"}
/usr/bin/vim.basic
```
