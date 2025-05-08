# SED

Stream Editor, a stream text processor, authored by **Lee E. McMahon**.

### Basic Syntax

```bash
sed [OPTIONS] 'command' file
```

* `OPTIONS`: Command options.
* `command`: Print, replace, delete, etc.
* `file`: The file to process; if omitted, reads from STDIN.

Omitting `file` enters interactive mode, executing one line at a time.

### Execution Process

* Reading a line of data:
  * With a match rule:
    * Match successful: Executes related operations.
    * Match failed: Prints data as is.
  * Without a match rule: Executes related operations.

### Command Quotes

* Single quotes: Reduces the impact of escape characters, **preferably used**.
* Double quotes: Can use variable parameters, requires handling special characters.

## Common Examples

### Replace First Occurrence

Replace the first occurrence of 'a' with 'b'.

```bash
echo 'aba' | sed 's/a/b/'
```

```bash
bba
```

### Replace Nth Occurrence

Replace the Nth occurrence of 'a' with 'b'.

```bash
echo 'aba' | sed 's/a/b/2'
```

```bash
abb
```

### Replace All Occurrences

```bash
echo 'aba' | sed 's/a/b/g'
```

```bash
bbb
```

### Execute Mult Commands

Can use `;` to separate, or use the `-e` option.

```bash
echo 'aba' | sed 's/a/b/; s/a/c/'
```

```bash
echo 'aba' | sed -e 's/a/b/' -e 's/a/c/'
```

```bash
bbc
```

### Using Command File

The `cmd.sed` file content is as follows.

```bash
s/a/b/
s/a/c/
```

```bash
echo 'aba' | sed -f cmd.sed
```

```bash
bbc
```

### Print Only Replaced Lines

`-n` indicates suppressing output, `p` indicates only outputting matched lines.

```bash
echo '
aa bb
cc dd
' | sed -n 's/aa/bb/p'
```

```bash
bb bb
```

### Write Result to File

```bash
echo '
aa bb
cc dd
' | sed 's/aa/bb/w out.txt'
```

```bash
cat out.txt
```

```bash
bb bb
```

### Modify Delimiter

Can use another symbol to replace the command delimiter `/`.

```bash
echo '/bin/sh' | sed 's#/sh#/bash#'
```

```bash
/bin/bash
```

### Specify Line Match

Match the 2nd line.

```bash
sed '2s/aa/bb/'
```

Match lines 2-4.

```bash
sed '2,4s/aa/bb/'
```

Match lines 2 to the last.

```bash
sed '2,$s/aa/bb/'
```

### Specify Command Group

```bash
sed '2{s/cc/aa/; s/dd/bb/}'
```

```bash
sed '2,4{
s/cc/aa/
s/dd/bb/
}'
```

### Delete All Lines

```bash
sed 'd'
```

### Delete Specific Lines

```bash
sed '1d'
```

```bash
sed '2,4d'
```

```bash
sed '2,$d'
```

### Delete Matched Lines

```bash
sed '/aa bb/d'
```

### Insert a Line Before

```bash
echo "hello" | sed 'i\New Line'
```

### Insert a Line After

```bash
echo "hello" | sed 'a\New Line'
```

### Specify Line Insert

```bash
sed '3i\New Line'
```

### Matched Line Insert

```bash
sed '/cc/i\New Line'
```

### Insert Multiple Lines

Must use `\`.

```bash
sed '2i\
New Line 1\
New Line 2
'
```

### Modify Line

```bash
sed '2c\
Change Line 1\
Change Line 2
'
```

```bash
sed '/aa/c\
Change Line 1
'
```

### Single Char Replace

```bash
echo 'aabbcc' | sed 'y/ac/ca/'
```

```txt
ccbbaa
```

### Print Specific Lines

```bash
sed -n '2,5p'
```

### Print Before/After Replacement

```bash
sed -n '/aa/{p; s/aa/cc/p}'
```

### Print Line Number

```bash
sed -n '/bb/{=; p}'
```

### Reading from File

Create foo and bar files.

```bash
echo -e 'aa\nbb' > foo
echo -e '11\n22' > bar
```

Read from the foo file and insert after the first line of bar.

```bash
sed '1r foo' bar
```

```txt
11
aa
bb
22
```

Match string then insert.

```bash
sed '/22/r foo' bar
```

```txt
11
22
aa
bb
```

Match string, insert, and use `d` to delete the matched line.

```bash
sed '/22/{
r foo
d
}' bar
```

```txt
11
aa
bb
```

The following will report a syntax error.

```bash
# Will error
sed '/22/{r foo; d}' bar
```

It's not impossible to do it in one line.

```bash
sed '/22/r foo' bar | sed '/22/d'
```
