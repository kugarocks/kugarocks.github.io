# Condition

## If Statement

If the exit code of `command` is `0`, then execute the content of `then`.

```bash
if command
then
    ...
fi
```

Another form.

```bash
if command; then
    ...
fi
```

### Else

```bash
if command; then
    ...
else
    ...
fi
```

### Elif

```bash
if command; then
    ...
elif command; then
    ...
fi
```

### Check User

Check if the soda user exists.

```bash
#!/usr/bin/env bash

if grep soda /etc/passwd
then
 echo "soda exists"
fi
```

```bash
soda:x:1001:1001:,,,:/home/soda:/bin/bash
soda exists
```

`grep` has an exit code of `0` when there is data, and `1` when there is no data.

## Test Command

Test conditions, if true, the return code is `0`, otherwise the return code is `1`.

```bash
test - check file types and compare values
```

Basic syntax.

```bash
test EXPRESSION
```

Short syntax.

```bash
[ EXPRESSION ]
```

After executing on the command line, you can use `echo $?` to see the return code.

### Check File

* `[ -e file ]`：Check if the file exists.
* `[ -d file ]`：Check if the file exists and is a directory.
* `[ -f file ]`：Check if the file exists and is a file.
* `[ -s file ]`：Check if the file exists and is not empty.
* `[ -r file ]`：Check if the file exists and is readable.
* `[ -w file ]`：Check if the file exists and is writable.
* `[ -x file ]`：Check if the file exists and is executable.
* `[ -O file ]`：Check if the file exists and belongs to the current user.
* `[ -G file ]`：Check if the file exists and belongs to the user group.
* `[ a -nt b ]`：Check if file a is newer than file b.
* `[ a -ot b ]`：Check if file a is older than file b.

If `file` or `$file` variable contains spaces, use double quotes.

```bash
[ -e "file" ]
```

```bash
[ -e "$file" ]
```

### Check String

* `[ -z str ]`：Check if the string is empty (length is 0).
* `[ -n str ]`：Check if the string is not empty (length is not 0).
* `[ s1 = s2 ]`：Check if the strings are equal.
* `[ s1 != s2 ]`：Check if the strings are not equal.

### Check Number

* `[ a -eq b ]`：Check if the two numbers are equal.
* `[ a -ne b ]`：Check if the two numbers are not equal.
* `[ a -gt b ]`：Check if a is greater than b.
* `[ a -ge b ]`：Check if a is greater than or equal to b.
* `[ a -lt b ]`：Check if a is less than b.
* `[ a -le b ]`：Check if a is less than or equal to b.

## Compound Conditions

Consistent with traditional programming languages.

```bash
[ cond1 ] && [ cond2 ]
```

```bash
[ cond1 ] || [ cond2 ]
```

## Double Parentheses

Double parentheses can be used for advanced mathematical expressions without escaping.

```bash
if (( 2**10 > 1000 ))
then
    ...
fi
```

## Double Square Brackets

Provide advanced matching patterns for strings.

```bash
if [[ $BASH_VERSION == 5.* ]]
then
    ...
fi
```

## Case Statement

```bash
#!/usr/bin/env bash

# The first parameter of the script
case "$1" in
  start)
    echo "Starting the service..."
    # Add the command to start the service here
    ;;
  stop)
    echo "Stopping the service..."
    # Add the command to stop the service here
    ;;
  *)
    echo "Usage: $0 {start|stop}"
    exit 1
    ;;
esac
```

* `$0`：The name of the script.
* `$1`：The first parameter of the script
* `)`：Branch condition end tag.
* `;;`：Branch command end tag.
* `*)`：Default branch, executed when no branch matches.
