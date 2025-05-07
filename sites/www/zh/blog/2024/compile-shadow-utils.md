# 编译 Shadow Utils

## Orbstack

在 macOS 上使用 Orbstack 构建和安装 Shadow 项目。

```bash
brew install orbstack
```

打开 Orbstack 应用（更换镜像仓库，可选）。

## 安装相关依赖

进入容器。

```bash
docker run -it --name shadow ubuntu:22.04 /bin/bash
```

先更新软件包，不然什么都装不了。

```bash
apt-get update
```

安装 `vim` 和 `git`。

```bash
apt-get install -y vim git
```

参考 shadow [项目文档](https://github.com/shadow-maint/shadow/blob/master/doc/contributions/build_install.md)，安装相关依赖。

```bash
apt-get build-dep -y shadow
```

一般会报以下错误。

```bash
E: You must put some 'deb-src' URIs in your sources.list
```

使用 `vim` 编辑 `/etc/apt/sources.list`，添加 `deb-src` 源。

```bash
# See http://help.ubuntu.com/community/UpgradeNotes for how to upgrade to
# newer versions of the distribution.
deb http://archive.ubuntu.com/ubuntu/ jammy main restricted
# deb-src http://archive.ubuntu.com/ubuntu/ jammy main restricte
```

把上面的 `# deb-src` 注释去掉就行，再次运行。

```bash
apt-get update
```

再次安装相关依赖，这次应该不会报错了。

```bash
apt-get build-dep -y shadow
```

## 配置

下载源码。

```bash
git clone https://github.com/shadow-maint/shadow.git
```

运行项目的配置脚本 `autogen.sh`。

```bash
./autogen.sh --without-selinux --enable-man --with-yescrypt
```

报错如下。

```bash
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

这里有几个错误，先处理 `LT_LIB_DLLOAD`。

```bash
apt-get install -y libltdl-dev
```

再运行 `./autogen.sh`。

```bash
configure.ac:135: error: possibly undefined macro: AC_MSG_WARN
      If this token and others are legitimate, please use m4_pattern_allow.
      See the Autoconf documentation.
autoreconf: error: /usr/bin/autoconf failed with exit status: 1
```

再安装 `pkg-config`。

```bash
apt-get install -y pkg-config
```

再次运行 `./autogen.sh` 还会报错。

```bash
configure: error: readpassphrase() is missing, either from libc or libbsd
```

安装 `libbsd-dev`。

```bash
apt-get install -y libbsd-dev
```

再次运行 `./autogen.sh` 应该不会报错了。

## 构建安装

```bash
make -j4
```

```bash
make install
```
