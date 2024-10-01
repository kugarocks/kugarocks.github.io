---
title: "活動模板-搭建環境"
description: ""
summary: ""
date: 2024-09-07T00:00:00+08:00
lastmod: 2024-09-08T00:00:00+08:00
weight: 800
seo:
  title: "活動模板-搭建環境"
  description: ""
  canonical: ""
  noindex: false
---

## 背景

2019-2020，當時用 PHP 寫嘅呢個活動模板項目，雖然已經停止開發咗，但而家仲喺運行，喺上面跑嘅活動已經有 400 多個咗。
我記得我離職嘅時候先 50 多個，而家 PHP 喺國內已經唔係咁流行咗，要唔係因為遷移成本大，早就改成 Java 咗。
不過得知自己寫嘅代碼仲喺運行，仲上線咗咁多活動，滿打滿算都省咗唔少開發成本，心裏仲係幾開心嘅。

今次打算把活動模板再次搭建起嚟，亦記錄一下當中碰到嘅問題。
畢竟對於一個 5 年前嘅老項目，好多依賴嘅軟件都更新咗，會出現各種各樣嘅問題。

## PHP 7.2

2024 年嘅 PHP 已經去到 8.X 咗，有啲特性已經唔再支持，所以只能安裝舊版。
不過 Homebrew 嘅官方唔提供舊版本嘅下載，需要使用 `shivammathur/homebrew-php`。

{{< link-card
  title="shivammathur/homebrew-php"
  description="Homebrew 嘅 PHP 擴展"
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

### 啟動服務

```bash {frame="none"}
brew services start php@7.2
```

### 查看服務

```bash {frame="none"}
brew services list
```

```bash {frame="none"}
php@7.2   started kuga ~/Library/LaunchAgents/homebrew.mxcl.php@7.2.plist
```

## MySQL 8.4

MySQL 也從 5 跳到 8 了，呢度直接安裝 8.4。

```bash {frame="none"}
brew install mysql@8.4
```

### 身份驗證報錯

PHP 7.2 連接數據庫嘅時候會報以下錯誤。

```bash {frame="none" text-wrap="wrap"}
CDbConnection failed to open the DB connection: SQLSTATE[HY000] [2054] The server requested authentication method unknown to the client
```

出於安全考慮，MySQL 8.0 之後引入咗新嘅驗證方法 `caching_sha2_password`，
呢個同舊版本客戶端使用嘅 `mysql_native_password` 唔兼容。
解決方法有兩個，一係升級客戶端，二係啟用舊版模塊。
呢度最簡單嘅方法當然係讓 MySQL 8.4 啟用 `mysql_native_password` 模塊。

```bash {frame="none"}
vim /usr/local/etc/my.cnf
```

喺 `[mysqld]` 模塊中添加以下配置。

```bash {frame="none"}
mysql_native_password=ON
```

重啟 MySQL 服務。

```bash {frame="none"}
brew services restart mysql@8.4
```
