## Composition Structure

```bash
-rwxr-xr--
```

The first character indicates the file type:

* **`-`**：File, such as text files, binary files, etc.
* **`d`**：Directory.
* **`l`**：Symbolic link, Symbolic link (Soft link).
* **`b`**：Block device, such as hard disk, CD-ROM, etc.
* **`c`**：Character device, such as terminal device, keyboard, etc.
* **`p`**：Pipe, inter-process communication.
* **`s`**：Socket, network communication, data exchange between processes.

The following characters are grouped into 3 (r=read, w=write, x=execute), corresponding to:

| Category | Permission | Description |
| --- | --- | --- |
| Owner | `rwx` | Read/Write/Execute |
| Group | `r-x` | Read/No Write/Execute |
| Others | `r--` | Read/No Write/No Execute |

## Directory Exec Perm

Like file execution permission, if you want to operate on a directory, the directory must also have execution permission.

```bash
cd /home
```

```bash
ls /home
```

If there is no execution permission, the above commands will fail.

## Umask

When creating a file or directory, the system uses the value of `umask` to calculate the file's permissions.

```bash
umask
```

```bash
0002
```

* The first bit: special mode, not expanded here.
* The second bit: Owner, owner.
* The third bit: Group, group.
* The fourth bit: Others, others.

### Full Permissions

* New file: `666` (default does not require execution permission).
* New directory: `777` (directories all require execution permission).

### Permission Calculation

Permission = Full Permission - umask

* File: `666` - `002` = `664`
* Directory: `777` - `002` = `775`

umask is a mask, representing the permissions that are not intended to be granted.

## chmod

The command to modify file permissions.

```bash
chmod - change file mode bits
```

### Octal Mode

```bash
chmod 755 file
```

```bash
-rwxr-xr-x 1 kuga kuga   16 Aug 23 11:08 file
```

### Symbolic Mode

`u` represents user: adds execution permission for the user.

```bash
chmod u+x file
```

`g` represents group: removes write permission for the group.

```bash
chmod g-w file
```

`o` represents others: adds read permission for others.

```bash
chmod g+r file
```

`a` represents the above 3: adds execution permission for all.

```bash
chmod a+x file
```

## chown

Modifies the owner and group of a file.

```bash
chown - change file owner and group
```

### Change Owner

```bash
chown user file
```

### Recursively Change Owner

```bash
chown -R user dir
```

### Change Owner and Group

```bash
chown user:group file
```

### Recursively Change Owner and Group

```bash
chown -R user:group dir
```

### Change Group Only

```bash
chown :group file
```

## chgrp

```bash
chgrp - change group ownership
```

```bash
chgrp group file
```
