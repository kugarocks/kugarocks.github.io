## User/Group Relationship

### Primary Group

When a user is created, a group with the same name is also created, which is the primary group.

```bash
grep soda /etc/passwd
```

```bash
soda:x:1001:1001:,,,:/home/soda:/bin/bash
```

The fourth field indicates the primary group ID 1001, which can also be viewed using the groups command.

```bash
groups soda
```

```bash
soda : soda
```

### Secondary Groups

Users can also belong to multiple secondary groups, used for permission access control.

### ID Command

The most practical command for viewing user group information.

```bash
id soda
```

```bash
uid=1001(soda) gid=1001(soda) groups=1001(soda)
```

`gid` indicates the primary group, and `groups` indicates the secondary groups.

## /etc/group

The configuration file for groups, modified using commands, do not manually edit, otherwise, it will be messed up.

```bash
-rw-r--r-- 1 root root 886 Aug 28 21:00 /etc/group
```

### Group Information

Viewing the information of the sudo group

```bash
grep sudo /etc/group
```

```bash
sudo:x:27:kuga
```

* Group Name: sudo
* Password: x
* Group ID: 27
* Member: kuga

Multiple group members are separated by commas: `kuga,soda`.

### Creating a New Group

```bash
sudo groupadd rocks
```

```bash
grep rocks /etc/group
```

```bash
rocks:x:1002:
```

### Modifying Group Name

```bash
sudo groupmod -n newrocks rocks
```

## User Group Assignment

### Preserving Secondary Groups

This method does not overwrite the list of secondary groups.

```bash
sudo usermod -aG rocks soda
```

```bash
id soda
```

```bash
... groups=1001(soda),1002(rocks)
```

### Overwriting Secondary Groups

Removing the `-a` (append) option will overwrite the entire secondary group list.

```bash
sudo usermod -G sudo soda
```

```bash
id soda
```

```bash
... groups=1001(soda),27(sudo)
```

Clearly, the soda group is gone.

### Deleting Secondary Groups

Deleting the sudo secondary group of the soda user.

```bash
sudo gpasswd -d soda sudo
```

Alternatively, you can use the overwrite method, keeping only the soda group.

```bash
sudo usermod -G soda soda
```
