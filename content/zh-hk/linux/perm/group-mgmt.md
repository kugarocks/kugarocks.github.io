---
title: "組管理"
description: ""
summary: ""
date: 2024-08-27T20:00:00+08:00
lastmod: 2024-08-28T20:00:00+08:00
weight: 2200
seo:
  title: "組管理"
  description: ""
  canonical: ""
  noindex: false
---

## 用戶同組嘅關係

### 主組 - Primary Group

創建用戶嘅時候__AB__會同時創建一個同名組__AB__呢個就係主組。

```bash {frame="none"}
grep soda /etc/passwd
```

```bash {frame="none"}
soda:x:1001:1001:,,,:/home/soda:/bin/bash
```

第 4 個字段表示主組 ID 1001__AB__仲可以用 groups 命令嚟睇。

```bash {frame="none"}
groups soda
```

```bash {frame="none"}
soda : soda
```

### 附加組 - Secondary Groups

用戶仲可以屬於多個附加組__AB__用嚟做權限嘅訪問控制。

### ID 指令

睇用戶組信息最實用嘅命令。

```bash {frame="none"}
id soda
```

```bash {frame="none"}
uid=1001(soda) gid=1001(soda) groups=1001(soda)
```

`gid` 表示主組__AB__`groups` 表示附加組。

## /etc/group

組嘅配置文件__AB__用命令嚟改__AB__唔好手動改__AB__唔然改錯就麻煩。

```bash {frame="none"}
-rw-r--r-- 1 root root 886 Aug 28 21:00 /etc/group
```

### 組信息

睇 sudo 組嘅信息

```bash {frame="none"}
grep sudo /etc/group
```

```bash {frame="none"}
sudo:x:27:kuga
```

* 組名：sudo
* 密碼：x
* 組ID：27
* 成員：kuga

組成員有多個時__AB__以逗號分隔：`kuga,soda`。

### 新建組

```bash {frame="none"}
sudo groupadd rocks
```

```bash {frame="none"}
grep rocks /etc/group
```

```bash {frame="none"}
rocks:x:1002:
```

### 改組名

```bash {frame="none"}
sudo groupmod -n newrocks rocks
```

## 用戶分配組

### 保留附加組

呢個方法唔會覆蓋附加組列表。

```bash {frame="none"}
sudo usermod -aG rocks soda
```

```bash {frame="none"}
id soda
```

```bash {frame="none"}
... groups=1001(soda),1002(rocks)
```

### 覆蓋附加組

去掉 `-a` (append) 選項會覆蓋成個附加組列表。

```bash {frame="none"}
sudo usermod -G sudo soda
```

```bash {frame="none"}
id soda
```

```bash {frame="none"}
... groups=1001(soda),27(sudo)
```

顯然__AB__soda 組唔見咗。

### 刪除附加組

刪除 soda 用戶嘅 sudo 附加組。

```bash {frame="none"}
sudo gpasswd -d soda sudo
```

仲可以用覆蓋嘅方式__AB__只保留 soda 組。

```bash {frame="none"}
sudo usermod -G soda soda
```
