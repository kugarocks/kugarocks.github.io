---
title: "訪問控制列表"
description: ""
summary: ""
date: 2024-08-29T20:00:00+08:00
lastmod: 2024-08-29T20:00:00+08:00
weight: 2400
seo:
  title: "訪問控制列表"
  description: ""
  canonical: ""
  noindex: false
---

## ACL

訪問控制列表（Access Control List）係一種更為靈活同細粒度嘅權限管理機制__AB__
用嚟定義同控制文件系統對象嘅訪問權限。相比傳統嘅文件權限系統__AB__ACL 提供咗更細緻嘅權限控制__AB__
容許你為唔同嘅用戶同用戶組設置特定嘅權限__AB__唔再局限於傳統嘅三個角色（Owner、Group、Others）。

## 安裝

如果未安裝__AB__可以用以下命令。

```bash {frame="none"}
sudo apt-get install acl
```

## getfacl

獲取文件嘅訪問控制列表

```bash {frame="none"}
getfacl - get file access control lists
```

### 使用例子

獲取 foo 文件嘅 ACL 信息。

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

設置文件嘅訪問控制列表。

```bash {frame="none"}
setfacl - set file access control lists
```

### 指定用戶授權

畀 soda 用戶添加對 foo 文件嘅讀寫權限。

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

### 指定組授權

畀 soda 組添加對 foo 文件嘅讀寫權限。

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

### 其它人授權

對其它人添加對 foo 文件嘅讀寫權限。

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

### 授權修改

命令採取覆蓋的形式。

```bash {frame="none"}
setfacl -m o::r foo
```

`other::rw-` 會變成 `other::r--`。

### 清空授權

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

### 刪除授權

```bash {frame="none"}
setfacl -x u:soda foo
```

```bash {frame="none"}
setfacl -m g:soda foo
```

`user:soda`、`group:soda` 這兩行會刪掉。

## 末尾的 + 號

使用 ACL 的文件__AB__權限列後面會有一個 + 號。

```bash {frame="none"}
-rw-rw-r--+
```

## RBAC

差不多 7-8 年前__AB__曾經接觸過一個 ACL 的管理後台__AB__後來改成了 RBAC。
