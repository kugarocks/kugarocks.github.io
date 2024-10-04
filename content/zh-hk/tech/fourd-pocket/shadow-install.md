---
title: "Shadow 構建和安裝"
description: ""
summary: ""
date: 2024-10-03T00:18:00+08:00
lastmod: 2024-10-03T00:18:00+08:00
weight: 1000
seo:
  title: "Shadow 構建和安裝"
  description: ""
  canonical: ""
  noindex: false
---

## Orbstack

在 macOS 上使用 Orbstack 構建和安裝 Shadow 項目。

```bash {frame="none"}
brew install orbstack
```

打開 Orbstack 應用（更換鏡像倉庫，可選）。

## 安裝依賴

進入容器。

```bash {frame="none"}
docker run -it --name shadow ubuntu:22.04 /bin/bash
```

先更新軟件包，否則無法安裝任何東西。

```bash {frame="none"}
apt-get update
```

安裝 `vim` 和 `git`。

```bash {frame="none"}
apt-get install -y vim git
```

參考 shadow [項目文檔](https://github.com/shadow-maint/shadow/blob/master/doc/contributions/build_install.md)，安裝相關依賴。

```bash {frame="none"}
apt-get build-dep -y shadow
```

通常會報以下錯誤。

```bash {frame="none"}
E: You must put some 'deb-src' URIs in your sources.list
```

使用 `vim` 編輯 `/etc/apt/sources.list`，添加 `deb-src` 源。

```bash {frame="none"}
# See http://help.ubuntu.com/community/UpgradeNotes for how to upgrade to
# newer versions of the distribution.
deb http://archive.ubuntu.com/ubuntu/ jammy main restricted
# deb-src http://archive.ubuntu.com/ubuntu/ jammy main restricte
```

把上面的 `# deb-src` 註釋去掉就行，再次運行。

```bash {frame="none"}
apt-get update
```

再次安裝相關依賴，這次應該不會報錯了。

```bash {frame="none"}
apt-get build-dep -y shadow
```

## 配置

下載源碼。

```bash {frame="none"}
git clone https://github.com/shadow-maint/shadow.git
```

運行項目的配置腳本 `autogen.sh`。

```bash {frame="none"}
./autogen.sh --without-selinux --enable-man --with-yescrypt
```

報錯如下。

```bash {frame="none"}
autoreconf: configure.ac: not using Intltool
autoreconf: configure.ac: not using Gtkdoc
autoreconf: running: aclocal --force
autoreconf: running: /usr/bin/autoconf --force
configure.ac:35: error: possibly undefined macro: LT_LIB_DLLOAD
      If this token and others are legitimate, please use m4_pattern_allow.
      See the Autoconf documentation.
configure.ac:135: error: possibly undefined macro: AC_MSG_WARN
autoreconf: error: /usr/bin/autoconf failed with exit status: 1
```

這裡有幾個錯誤，先處理 `LT_LIB_DLLOAD`。

```bash {frame="none"}
apt-get install -y libltdl-dev
```

再運行 `./autogen.sh`。

```bash {frame="none"}
configure.ac:135: error: possibly undefined macro: AC_MSG_WARN
      If this token and others are legitimate, please use m4_pattern_allow.
      See the Autoconf documentation.
autoreconf: error: /usr/bin/autoconf failed with exit status: 1
```

再安裝 `pkg-config`。

```bash {frame="none"}
apt-get install -y pkg-config
```

再次運行 `./autogen.sh` 還會報錯。

```bash {frame="none"}
configure: error: readpassphrase() is missing, either from libc or libbsd
```

安裝 `libbsd-dev`。

```bash {frame="none"}
apt-get install -y libbsd-dev
```

再次運行 `./autogen.sh` 應該不會報錯了。

## 構建安裝

```bash {frame="none"}
make -j4
```

```bash {frame="none"}
make install
```
