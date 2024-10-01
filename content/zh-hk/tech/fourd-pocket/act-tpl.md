---
title: "活动模板-搭建环境"
description: ""
summary: ""
date: 2024-09-07T00:00:00+08:00
lastmod: 2024-09-08T00:00:00+08:00
weight: 800
seo:
  title: "活动模板-搭建环境"
  description: ""
  canonical: ""
  noindex: false
---

## 背景

2019-2020，当时用 PHP 写的这个活动模板项目，虽然已经停止开发了，但现在还在运行，在上面跑的活动已经有 400 多个了。
我记得我离职的时候才 50 多个，现在 PHP 在国内已经不怎么流行了，要不是因为迁移成本大，早就改成 Java 了。
不过得知自己写的代码还在运行，还上线了这么多活动，满打满算也省了不少开发成本，心里还是挺开心的。

这次打算把活动模板再次搭建起来，也记录一下当中碰到的问题。
毕竟对于一个 5 年前的老项目，很多依赖的软件都更新了，会出现各种各样的问题。

## PHP 7.2

2024 年的 PHP 已经去到 8.X 了，有些特性已经不再支持，所以只能安装旧版。
不过 Homebrew 的官方不提供旧版本的下载，需要使用 `shivammathur/homebrew-php`。

{{< link-card
  title="shivammathur/homebrew-php"
  description="Homebrew 的 PHP 扩展"
  href="https://github.com/shivammathur/homebrew-php"
  target="_blank"
>}}

### Homebrew

```bash {frame="none"}
brew update
```

```bash {frame="none"}
brew tap shivammathur/php
```

```bash {frame="none"}
brew install shivammathur/php/php@7.2
```

```bash {frame="none"}
echo 'export PATH="/usr/local/opt/php@7.2/bin:$PATH"' >> ~/.zshrc
echo 'export PATH="/usr/local/opt/php@7.2/sbin:$PATH"' >> ~/.zshrc
```

### 启动服务

```bash {frame="none"}
brew services start php@7.2
```

### 查看服务

```bash {frame="none"}
brew services list
```

```bash {frame="none"}
php@7.2   started kuga ~/Library/LaunchAgents/homebrew.mxcl.php@7.2.plist
```

## MySQL 8.4

MySQL 也从 5 跳到 8 了，这里直接安装 8.4。

```bash {frame="none"}
brew install mysql@8.4
```

### 身份验证报错

PHP 7.2 连接数据库的时候会报以下错误。

```bash {frame="none" text-wrap="wrap"}
CDbConnection failed to open the DB connection: SQLSTATE[HY000] [2054] The server requested authentication method unknown to the client
```

出于安全考虑，MySQL 8.0 之后引入了新的验证方法 `caching_sha2_password`，
这与旧版本客户端使用的 `mysql_native_password` 不兼容。
解决方法有两个，一是升级客户端，二是启用旧版模块。
这里最简单的方法当然是让 MySQL 8.4 启用 `mysql_native_password` 模块。

```bash {frame="none"}
vim /usr/local/etc/my.cnf
```

在 `[mysqld]` 模块中添加以下配置。

```bash {frame="none"}
mysql_native_password=ON
```

重启 MySQL 服务。

```bash {frame="none"}
brew services restart mysql@8.4
```
