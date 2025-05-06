# Command History

## The Mysterious ^\[\[A

First, start a new Shell `/bin/sh`.

```bash
/bin/sh
```

Then enter the following command, everything is normal.

```bash
ls -l
```

Press the up arrow key ⬆️ to view the previous command.

```bash
^[[A
```

You will find that you cannot see the previous command, instead, these characters `^[[A` appear.
This is because early sh did not support viewing command history, until bash added this feature.

### ANSI Escape Sequences

`^[[A` is an ANSI escape sequence, indicating the up arrow key.

* `^[`：represents the `Esc` key (ASCII code 27), which is the start of the escape sequence.
* `[A`：represents the specific operation, `[A` indicates the up arrow key.

When you press the up arrow key in the terminal, the terminal sends this character sequence `^[[A` to the program,
usually used to call the previous command in the command history.
Since sh does not support viewing command history, it will output the character sequence of the key directly.

### sh in Ubuntu

In Ubuntu, sh is actually a link to dash.

```bash
file /bin/sh
```

```bash
/bin/sh: symbolic link to dash
```

Therefore, dash also does not support viewing command history.

## History Functionality

### history Command

Without arguments, it outputs all history records.

```bash
history
```

You can also use the short command, with the same effect.

```bash
!!
```

### .bash_history File

The persistent file for command history records.

```bash
-rw------- 1 kuga kuga 5516 Aug 24 08:23 /home/kuga/.bash_history test foofffffffffffffffffffffffffffffffffff
```

During the interaction with the Shell, the history records of the commands are saved in memory.
Using the `history` command can view the changes of the history records in real-time,
but the history records are only written to the `.bash_history` file when you exit the Shell.
If you want to write to the history record file immediately, you can use the following command.

```bash
history -a
```

## Environment Variables

### HISTFILE

The path of the history record file.

```bash
echo $HISTFILE
```

```bash
/home/kuga/.bash_history
```

### HISTFILESIZE

The size of the history record file.

```bash
echo $HISTFILESIZE
```

```txt
2000
```

### HISTSIZE

The size of the history record list in memory.

```bash
echo $HISTSIZE
```

```txt
1000
```
