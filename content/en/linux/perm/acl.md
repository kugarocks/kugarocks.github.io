---
title: "Access Control List"
description: ""
summary: ""
date: 2024-08-29T20:00:00+08:00
lastmod: 2024-08-29T20:00:00+08:00
weight: 2400
seo:
  title: "Access Control List"
  description: ""
  canonical: ""
  noindex: false
---

## ACL

Access Control List (ACL) is a more flexible and fine-grained permission management mechanism,
used to define and control the access permissions of file system objects. Compared to traditional file permission systems, ACL provides more detailed permission control,
allowing you to set specific permissions for different users and user groups, no longer limited to the traditional three roles (Owner, Group, Others).

## Installation

If not installed, you can use the following command.

```bash {frame="none"}
sudo apt-get install acl
```

## Getfacl

Get the access control list of a file

```bash {frame="none"}
getfacl - get file access control lists
```

### Usage Example

Get the ACL information of the foo file.

```bash {frame="none"}
getfacl foo
```

```bash {frame="none"}
# file: foo
# owner: kuga
# group: kuga
user::rw-
group::rw-
other::r--
```

## Setfacl

Set the access control list of a file.

```bash {frame="none"}
setfacl - set file access control lists
```

### Specify User Authorization

The soda user adds read and write permissions to the foo file.

```bash {frame="none"}
setfacl -m u:soda:rw foo
```

```bash {frame="none"}
getfacl foo
```

```bash {frame="none"}
# file: foo
# owner: kuga
# group: kuga
user::rw-
user:soda:rw-
group::rw-
mask::rw-
other::r--
```

### Specify Group Authorization

The soda group adds read and write permissions to the foo file.

```bash {frame="none"}
setfacl -m g:soda:rw foo
```

```bash {frame="none"}
getfacl foo
```

```bash {frame="none"}
# file: foo
# owner: kuga
# group: kuga
user::rw-
user:soda:rw-
group::rw-
group:soda:rw-
mask::rw-
other::r--
```

### Other Authorization

Add read and write permissions to the foo file for others.

```bash {frame="none"}
setfacl -m o::rw foo
```

```bash {frame="none"}
getfacl foo
```

```bash {frame="none"}
# file: foo
# owner: kuga
# group: kuga
user::rw-
user:soda:rw-
group::rw-
group:soda:rw-
mask::rw-
other::rw-
```

### Authorization Modification

The command is in the form of override.

```bash {frame="none"}
setfacl -m o::r foo
```

`other::rw-` will become `other::r--`.

### Clear Authorization

```bash {frame="none"}
setfacl -m u:soda:- foo
```

```bash {frame="none"}
setfacl -m o::- foo
```

```bash {frame="none"}
user:soda:---
other::---
```

### Delete Authorization

```bash {frame="none"}
setfacl -x u:soda foo
```

```bash {frame="none"}
setfacl -m g:soda foo
```

The two lines `user:soda` and `group:soda` will be deleted.

## End of Line +

For files using ACL, there will be a + sign after the permission column.

```bash {frame="none"}
-rw-rw-r--+
```

## RBAC

About 7-8 years ago, I once encountered a management interface for ACL, which was later changed to RBAC.
