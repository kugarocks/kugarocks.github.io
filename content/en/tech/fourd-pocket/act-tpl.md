---
title: "Setup Activity Template"
description: ""
summary: ""
date: 2024-09-07T00:00:00+08:00
lastmod: 2024-09-08T00:00:00+08:00
weight: 800
seo:
  title: "Setup Activity Template"
  description: ""
  canonical: ""
  noindex: false
---

## Background

In 2019-2020, when this activity template project was written in PHP, it had already stopped development, but it's still running, with over 400 activities running on it.
I remember when I left, there were only over 50, and now PHP is no longer popular in China, if not for the high migration cost, it would have been changed to Java long ago.
However, knowing that the code I wrote is still running, and so many activities have been launched, it's still quite heartening to think about the development cost saved.

This time, I plan to rebuild the activity template and record the problems encountered along the way.
After all, for a 5-year-old project, many of the software dependencies have been updated, and various problems will arise.

## PHP 7.2

By 2024, PHP has already reached 8.X, and some features are no longer supported, so an older version must be installed.
However, Homebrew's official does not provide downloads for older versions, and `shivammathur/homebrew-php` must be used.

{{< link-card
  title="shivammathur/homebrew-php"
  description="Homebrew PHP extension"
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

### Start Service

```bash {frame="none"}
brew services start php@7.2
```

### View Service

```bash {frame="none"}
brew services list
```

```bash {frame="none"}
php@7.2   started kuga ~/Library/LaunchAgents/homebrew.mxcl.php@7.2.plist
```

## MySQL 8.4

MySQL has also jumped from 5 to 8, and here we directly install 8.4.

```bash {frame="none"}
brew install mysql@8.4
```

### Authentication Error

When PHP 7.2 connects to the database, it will report the following error.

```bash {frame="none" text-wrap="wrap"}
CDbConnection failed to open the DB connection: SQLSTATE[HY000] [2054] The server requested authentication method unknown to the client
```

For security reasons, MySQL 8.0 and later introduced a new authentication method `caching_sha2_password`,
which is incompatible with the `mysql_native_password` used by older clients.
There are two solutions, one is to upgrade the client, and the other is to enable the old module.
Here, the simplest method is to enable the `mysql_native_password` module for MySQL 8.4.

```bash {frame="none"}
vim /usr/local/etc/my.cnf
```

Add the following configuration in the `[mysqld]` module.

```bash {frame="none"}
mysql_native_password=ON
```

Restart the MySQL service.

```bash {frame="none"}
brew services restart mysql@8.4
```
