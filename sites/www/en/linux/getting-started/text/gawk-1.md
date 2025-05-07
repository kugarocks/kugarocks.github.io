# GAWK 1

## Gnu Awk

`Gawk` is the GNU version of the text processing tool.
In most GNU/Linux distributions, `Gawk` is the default `awk` implementation, so there is usually no difference in daily use.

```bash
readlink -f /usr/bin/awk
```

```txt
/usr/bin/gawk
```

The `Gawk` command defaults to using ERE mode.

### Basic Syntax

```bash
gawk [OPTIONS] program file
```

* `OPTIONS`: command options.
* `program`: there is a program in this damn command.
* `file`: the file being processed, if omitted, read from STDIN.

Omitting `file` enters interactive mode, where one line is executed at a time.

### Execution Process

* Read a line of data:
  * If there is a matching rule:
    * If the match is successful: perform the corresponding operation.
    * If the match fails: do not perform the operation.
  * If there is no matching rule: perform the corresponding operation.

### Basic Usage

Create the foo file.

```bash
echo -e 'aa 11\nbb 22' > foo
```

For each line of data, `Gawk` defaults to using space/tab to separate fields.

* `$N`: represents the Nth field.
* `$0`: represents the entire line of data.

```bash
gawk '{print $1}' foo
```

```txt
aa
bb
```

### BEGIN/END Structure

* BEGIN: initialization, executed before interpretation.
* BODY: executed once for each record.
* END: end of processing.

Note the use of single quotes `'EOF'` to create the file, so that special characters `$` are not processed.

```bash
cat <<'EOF' > foo.gawk
BEGIN {
    FS=":"
    print "User\tShell"
    print "-------\t-------"
}
{
    print $1 "\t" $6
}
END {
    print "-------\t-------"
}
EOF
```

```bash
head -n 3 /etc/passwd | gawk -f foo.gawk
```

```txt
User    Shell
------- -------
root    /root
daemon  /usr/sbin
bin     /bin
------- -------
```

## Common Options

### Specify Separator

The `-F` option can modify the line separator.

```bash
gawk -F: '{print $1}' /etc/passwd | head -n 1
```

### Specify File

The `-f` option can specify a file.

```bash
echo '{print $1 "-dir:" $6}' > foo.gawk
```

```bash
gawk -F: -f foo.gawk /etc/passwd | head -n 1
```

```txt
root-dir:/root
```

### Assign Variable Parameters

The `-v` option can assign values to variables before BEGIN.

```bash
gawk -v n=2 'BEGIN{print 2*n}'
```

```txt
4
```

If you don't need to use it in BEGIN, you can omit the `-v` parameter.

```bash
echo 'a b c' | gawk '{print $n}' n=2
```

```txt
b
```

## Built-in Variables

### Variable $N

`$N` can also be assigned, and double quotes for strings cannot be omitted.

```bash
echo 'hey man' | gawk '{$2="bro"; print $0}'
```

```txt
hey bro
```

### Variable FS

Field Separator, field separator.

```bash
gawk 'BEGIN{FS=":"} {print $1}' /etc/passwd | head -n 1
```

### Variable NF

Number of Fields, represents the number of fields in the record.

```bash
gawk -F: '$1=="root"{print $1":"$NF}' /etc/passwd
```

```txt
root:/bin/bash
```

### Variable NR

Number of Records, represents the current record number being processed, the default value is 1, and 1 is added after processing each line.
Can be used to skip the first line of text, the `NR` value of the first line is 1.

```bash
cat <<EOF > foo
name score
foo  90
bar  80
EOF
```

```bash
gawk '{if (NR>1) {if ($2>85) {print $1,$2}}' foo
```

```txt
foo 90
```

### Variable RS

Record Separator, input record separator, the default value is `\n`, which means that each record is separated by a newline.
Setting `RS` to `""` means that an empty line is used as the record separator. For the following text, it will be divided into two records, upper and lower.

```bash
cat <<EOF > foo
apple
sweet
red

banana
sweet
yellow
EOF
```

Set `FS="\n"`, then you can get each line of record through `$N`. `RS` and `FS` are usually used together.

```bash
gawk 'BEGIN{RS=""; FS="\n"} {print $1"\t"$3}' foo
```

```txt
apple  red
banana yellow
```

### Variable OFS

Output Field Separator, output field separator.

```bash
echo 'aa,bb' | gawk 'BEGIN{FS=","; OFS="-"} {print $1,$2}'
```

```txt
aa-bb
```

### Variable FIELDWIDTHS

Specify character width for separation.

```bash
echo 'abbc' | gawk 'BEGIN{FIELDWIDTHS="1 2 1"} {print $1,$2,$3}'
```

```txt
a bb c
```

## Conditional and Structure

### Conditional Expression

`==`, `<`, `<=`, `>`, `>=`.

```bash
gawk -F: '$7=="/bin/bash"{print $1}' /etc/passwd
```

Output all users who start with bash.

### Conditional Statement

A single statement inside `if` does not need `{}`.

```bash
echo -e '10\n20' | gawk '{if ($1>15) print $1}'
```

Multiple statements inside `if` need `{}`.

```bash
echo -e '10\n20' | gawk '{if ($1>15) {x=2*$i; print x}'
```

For a single line `else` statement, the previous statement needs a `;`.

```bash
echo -e '10\n20' | gawk '{if ($1>15) print $1; else print "no"}'
```

Multiple lines do not need a semicolon.

```bash
echo -e '10\n20' | gawk '{
if ($i>15) {
    x=2*$i
    print x
} else {
    print "no"
}
}'
```

### FOR Statement

Calculate the sum of each field for each line, both `+=` and `++` are supported.

```bash
echo '1 2 3' | gawk '{
total=0
for (i=1; i<=NF; i++) {
    total += $i
}
print total
}'
```

### WHILE Statement

Calculate the sum of each field for each line.

```bash
echo '1 2 3' | gawk '{
i=1
total=0
while (i<=NF) {
    total += $i
    i++
}
print total
}'
```

### DO-WHILE Statement

Calculate the sum of each field for each line

```bash
echo '1 2 3' | gawk '{
i=1
total=0
do {
    total += $i
    i++
} while(i<=NF)
print total
}'
```

## Function Related

### Built-in Functions

* `int(x)`: take the integer part of x.
* `exp(x)`: x to the power.
* `sqrt(x)`: square root of x.
* `rand()`: a random number greater than 0 and less than 1.
* `length(x)`: length of string x.
* `tolower(x)`: convert x to lowercase.
* `toupper(x)`: convert x to uppercase.

There are many more, such as `gensub`, `gsub`.

### Custom Functions

Custom functions must appear before `BEGIN` block.

```bash
gawk '
function random(ts, num) {
    srand(ts)
    return int(num * rand())
}
BEGIN {
    ts=systime()
    print ts
    print random(ts, 10)
}'
```

You can use function library files and then reference them.

```bash
cat <<'EOF' > funclib.gawk
function random(ts, num) {
    srand(ts)
    return int(num * rand())
}
EOF
```

The gawk program file is as follows.

```bash
cat <<'EOF' > test.gawk
BEGIN {
    ts=systime()
    print ts
    print random(ts, 10)
}
EOF
```

Use the -f option to reference two files.

```bash
gawk -f funclib.gawk -f test.gawk
```

You cannot use inline program mode when referencing function libraries, you need to reference both.

## Other Examples

### Custom Variables

Support mathematical operations and floating point numbers, not stronger than bash 🤪.

```bash
gawk 'BEGIN{a=2; a=a*2/3; print a}'
```

```txt
1.33333
```

### Array Operations

Features: associative arrays, similar to dictionaries, unordered.

```bash
gawk 'BEGIN{arr["name"]="foo"; print arr["name"]}'
```

You can use numeric subscripts, which are actually dictionaries.

```bash
gawk 'BEGIN{arr[3]="foo"; print arr[3]}'
```

Traverse the array, delete elements.

```bash
gawk 'BEGIN{
arr["a"]=1
arr[2]=2
arr["c"]="cat"
delete arr[2]
for (k in arr) {
    print "key:",k," val:", arr[k]
}
}
'
```

```txt
key: a  val: 1
key: c  val: cat
```

### Formatted Printing

Processing floating point numbers.

```bash
gawk 'BEGIN{printf "%.2f\n", 2/3}'
```

```txt
0.67
```

Specify width.

```bash
echo -e 'foo\nfoobar' | gawk '{printf "%8s\n", $1}'
```

Left alignment.

```bash
echo -e 'foo\nfoobar' | gawk '{printf "%-8s\n", $1}'
```
