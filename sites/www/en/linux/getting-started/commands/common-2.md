# Common Commands 2

## Sort

Sorts lines of text files by default, non-numeric.

```bash
sort - sort lines of text files
```

### Reverse Order

```bash
sort -r file
```

### Numeric Sort

```bash
sort -n file
```

### Sort By Month

Month format: `Jan`, `Feb`, `Mar`.

```bash
sort -M file
```

### Specify Column

Default is separated by (consecutive) spaces or tabs.

```bash
sort -k 1 file
```

### Specify Delimiter And Column

`-k` index starts from 1, the 3rd column is the user ID.

```bash
sort -t ':' -k 3 -n /etc/passwd
```

### Ignore Case

```bash
sort -f file
```

### Remove Duplicates

```bash
sort -u file
```

## Alias

### Possible Aliases

```bash
alias -p
```

## Type

### External/Internal Command

Can view if a command is an internal command, internal commands are compiled into the shell, different from external commands, no subprocess execution is required.

```bash
type cd
```

```bash
cd is a shell builtin
```

***

```bash
type ps
```

```bash
ps is hashed (/usr/bin/ps)
```

### All Implementations

```bash
type -a echo
```

```bash
echo is a shell builtin
echo is /usr/bin/echo
echo is /bin/echo
```

### Command Aliases

```bash
type ll
```

```bash
ll is aliased to `ls -alF'
```

***

```bash
type -a ls
```

```bash
ls is aliased to `ls --color=auto'
ls is /usr/bin/ls
ls is /bin/ls
```

## Readlink

```bash
readlink - print resolved symbolic links or canonical file names
```

### Final Link

No need to look one by one.

```bash
readlink -f /bin/vim
```

```bash
/usr/bin/vim.basic
```
