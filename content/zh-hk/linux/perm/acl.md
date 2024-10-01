---
title: "访问控制列表"
description: ""
summary: ""
date: 2024-08-29T20:00:00+08:00
lastmod: 2024-08-29T20:00:00+08:00
weight: 2400
seo:
  title: "访问控制列表"
  description: ""
  canonical: ""
  noindex: false
---

## ACL

访问控制列表（Access Control List）是一种更为灵活和细粒度的权限管理机制，
用于定义和控制文件系统对象的访问权限。与传统的文件权限系统相比，ACL 提供了更细致的权限控制，
允许你为不同的用户和用户组设置特定的权限，不再局限于传统的三个角色（Owner、Group、Others）。

## 安装

如没安装，可用以下命令。

```bash {frame="none"}
sudo apt-get install acl
```

## getfacl

获取文件的访问控制列表

```bash {frame="none"}
getfacl - get file access control lists
```

### 使用例子

获取 foo 文件的 ACL 信息。

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

## setfacl

设置文件的访问控制列表。

```bash {frame="none"}
setfacl - set file access control lists
```

### 指定用户授权

soda 用户添加对 foo 文件的读写权限。

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

### 指定组授权

soda 组添加对 foo 文件的读写权限。

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

### 其它人授权

对其它人添加对 foo 文件的读写权限。

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

### 授权修改

命令采取覆盖的形式。

```bash {frame="none"}
setfacl -m o::r foo
```

`other::rw-` 会变成 `other::r--`。

### 清空授权

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

### 删除授权

```bash {frame="none"}
setfacl -x u:soda foo
```

```bash {frame="none"}
setfacl -m g:soda foo
```

`user:soda`、`group:soda` 这两行会删掉。

## 末尾的 + 号

使用 ACL 的文件，权限列后面会有一个 + 号。

```bash {frame="none"}
-rw-rw-r--+
```

## RBAC

差不多 7-8 年前，曾经接触过一个 ACL 的管理后台，后来改成了 RBAC。
