---
title: "Shadow Build & Install"
description: ""
summary: ""
date: 2024-10-03T00:18:00+08:00
lastmod: 2024-10-03T00:18:00+08:00
weight: 1000
seo:
  title: "Shadow Build & Install"
  description: ""
  canonical: ""
  noindex: false
---

## Orbstack

Build and install the Shadow project on macOS using Orbstack.

```bash {frame="none"}
brew install orbstack
```

Open the Orbstack application (change the image repository, optional).

## Install Dependencies

Enter the container.

```bash {frame="none"}
docker run -it --name shadow ubuntu:22.04 /bin/bash
```

First, update the packages, otherwise nothing can be installed.

```bash {frame="none"}
apt-get update
```

Install `vim` and `git`.

```bash {frame="none"}
apt-get install -y vim git
```

Refer to the shadow [project documentation](https://github.com/shadow-maint/shadow/blob/master/doc/contributions/build_install.md) to install the necessary dependencies.

```bash {frame="none"}
apt-get build-dep -y shadow
```

The following error is usually reported.

```bash {frame="none"}
E: You must put some 'deb-src' URIs in your sources.list
```

Use `vim` to edit `/etc/apt/sources.list` and add the `deb-src` source.

```bash {frame="none"}
# See http://help.ubuntu.com/community/UpgradeNotes for how to upgrade to
# newer versions of the distribution.
deb http://archive.ubuntu.com/ubuntu/ jammy main restricted
# deb-src http://archive.ubuntu.com/ubuntu/ jammy main restricted
```

Remove the comment from the `# deb-src` line above, then run again.

```bash {frame="none"}
apt-get update
```

Install the necessary dependencies again, this time it should not report an error.

```bash {frame="none"}
apt-get build-dep -y shadow
```

## Configuration

Download the source code.

```bash {frame="none"}
git clone https://github.com/shadow-maint/shadow.git
```

Run the project's configuration script `autogen.sh`.

```bash {frame="none"}
./autogen.sh --without-selinux --enable-man --with-yescrypt
```

The following errors occur.

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

There are a few errors here, first handle `LT_LIB_DLLOAD`.

```bash {frame="none"}
apt-get install -y libltdl-dev
```

Run `./autogen.sh` again.

```bash {frame="none"}
configure.ac:135: error: possibly undefined macro: AC_MSG_WARN
      If this token and others are legitimate, please use m4_pattern_allow.
      See the Autoconf documentation.
autoreconf: error: /usr/bin/autoconf failed with exit status: 1
```

Then install `pkg-config`.

```bash {frame="none"}
apt-get install -y pkg-config
```

Running `./autogen.sh` again will still report an error.

```bash {frame="none"}
configure: error: readpassphrase() is missing, either from libc or libbsd
```

Install `libbsd-dev`.

```bash {frame="none"}
apt-get install -y libbsd-dev
```

Running `./autogen.sh` again should not report an error.

## Build & Install

```bash {frame="none"}
make -j4
```

```bash {frame="none"}
make install
```
