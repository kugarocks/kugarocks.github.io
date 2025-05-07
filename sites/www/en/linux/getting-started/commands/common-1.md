# Common Commands 1

## MAN

This command can view different sections of the manual pages.

```bash
man man
```

```bash {frame="none" text-wrap="wrap"}
man - an interface to the system reference manuals

The table below shows the section numbers of the manual followed by the types of pages they contain.

1 Executable programs or shell commands
2 System calls (functions provided by the kernel)
3 Library calls (functions within program libraries)
4 Special files (usually found in /dev)
5 File formats and conventions, e.g. /etc/passwd
6 Games
7 Miscellaneous (including macro packages and conventions), e.g. man(7), groff(7)
8 System administration commands (usually only for root)
9 Kernel routines [Non standard]
```

### Section

```bash
man 1 ls/cp/mv
man 2 write/open/close
man 3 printf/malloc/free
man 4 tty/null/random
man 5 passwd/fstab
man 7 man
man 8 ifconfig/iptables/mount
man 9 fork # not work
```

### Games

`fortune` can randomly display quotes and jokes.

```bash
apt install fortune/fortune-mod/fortunes-zh
```

```bash
man 6 fortune
```

```bash
fortune - print a random, hopefully interesting, adage
```

Can be combined with `cowsay` and `lolcat` to play.

```bash
fortune | cowsay | lolcat
```

## PWD

Print Working Directory.

```bash
man pwd
```

```bash
pwd - print name of current/working directory
```

## CAT

```bash
man cat
```

```bash
cat - concatenate files and print on the standard output
```

### Line No. With Blank Lines

```bash
cat -n FILE
```

### Line No. Without Blank

```bash
cat -b FILE
```

## LS

```bash
man ls
```

```bash
ls - list directory contents
```

### File Details

```bash
ls -lh
```

```bash
drwx------ 9 root root 4.0K   Aug  7 22:38 root
crw-rw-rw- 1 root tty  5,   0 Aug  7 22:33 /dev/tty
brw-rw---- 1 root disk 252, 0 Aug  7 21:30 /dev/vda
```

* File type: `d` directory, `-` file, `l` link, `c` character device, `b` block device.
* File permissions: 700, Owner: 7, Group: 0, Other: 0
* Hard link count: 9
* File owner: root
* File group: root
* File size: 4.0K
* Modification time: Aug 7 22:38
* File name: root
* Major device number: 5/252, identifies the device driver
* Minor device number: 0, identifies a specific device instance within the same class of devices

### Only Dirs

```bash
ls -ld */
```

Including hidden files

```bash
ls -ld .*/ */
```

### Specify Dir

```bash
ls -ld /usr
```

### Type Symbols

```bash
ls -lF /
```

* `/`: directory
* `*`: executable file
* `@`: symbolic link
* `|`: named pipe
* `=`: socket

### Hidden Characters

```bash
ls ~ | wc -l
```

There are hidden characters `\n` in the output of the `ls` command.

```bash
ls ~ | od -c
```

```bash
0000000   f   i   l   e  \n   f   o   o  \n   f   o   o   b   a   r  \n
0000020
```

You can also use `cat -A`.

```bash
ls ~ | cat -A
```

```bash
file$
foo$
foobar$
```

## FILE

Show file type

```bash
man file
```

```bash
file — determine file type
```

### Character/Block Device

```bash
file /dev/tty
```

```bash
/dev/tty: character special (5/0)
```

***

```bash
file /dev/vda
```

```bash
/dev/vda: block special (252/0)
```

### Link File

Note the trailing slash.

```bash
file /bin
```

```bash
/bin: symbolic link to usr/bin
```

***

```bash
file /bin/
```

```bash
/bin/: directory
```

## LESS

The `more` command can only load by pressing Enter, the `less` command is more powerful because less is more.

```bash
man less
```

```bash
less - opposite of more
```

## USERMOD

```bash
man usermod
```

```bash
usermod - modify a user account
```

### Disable Account Login

```bash
usermod -s /sbin/nologin kuga
```

This command will change `bin/sh` to `/sbin/nologin` in `/etc/passwd`

```bash
kuga:x:1000:1000::/home/kuga:/sbin/nologin
```

### Grant User Group

The following command will grant the kuga user the sudo user group.

```bash
usermod -aG sudo kuga
```

## LN

```bash
man ln
```

```bash
ln - make links between files
```

### Soft Link

go rocks

## DF

```bash
man df
```

```bash
df - report file system disk space usage
```

### Readable Format

```bash
df -h
```

### Specify File System Type

```bash
df -h -t ext4
```

```bash
df -h -t apfs
```

`ext4` is the file system type of Linux, `apfs` is the file system type of macOS.

## DU

Disk Usage

```bash
man du
```

```bash
du - estimate file space usage
```

### Total Size of Dir

```bash
du -sh ~/Downloads
```

### Sort Files - Including Subdirs

```bash
du -ah ~/Downloads/* | sort -rh | head -n 5
```

```bash
du -ah ~/Downloads --max-depth=1 | sort -rh | head -n 10
```

### Sort Files - Excluding Subdirs

```bash
du -sh ~/Downloads/* | sort -rh | head -n 5
```
