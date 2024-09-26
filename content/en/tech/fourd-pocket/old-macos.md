---
title: "安装旧版 macOS"
description: ""
summary: ""
date: 2024-08-02T00:00:00+08:00
lastmod: 2024-09-08T00:00:00+08:00
weight: 600
seo:
  title: "安装旧版 macOS"
  description: ""
  canonical: ""
  noindex: false
---

## 背景

出于种种原因，要在一台苹果电脑上安装旧版本的 macOS 是一件不容易的事。因为苹果官网的下载链接会引导你到 App Store，当它发现你要下载的系统版本比你当前使用的系统还要旧的时候，是不会提供下载的，只能下载更新的版本。

前几天我一个朋友刚高中毕业，大学想要学计算机，我就推荐他买苹果电脑，但他之前都没用过 macOS，所以我打算把我那台 2014 年的 MacBook Air 给他体验一下。当时这台电脑的系统是 High Sierra 10.13，我想着搞个 USB 启动盘重装一下系统，顺手把磁盘的数据都抹掉，没想到这一顿操作以后，我人麻了。

## 证书过期

我在网上随便找了一个 High Sierra 镜像，因为苹果官网根本下载不了旧版本的 macOS，引导盘做好了之后，一切都很顺利，直到它给我来了个惊喜 。（这个图我是网上找的）

![macos-damaged](/images/misc/macos-damaged.jpg)

查了一下资料，很多都说是证书过期的问题，因为以前苹果发布的证书有些是在 2019 年过期的。

![cert-info](/images/misc/cert-info.jpg)

## 解决方案

### 下载最新官方镜像（推荐）

一个镜像能不能用不仅仅是证书的问题，所以最靠谱的方法是从苹果官方下载最新的安装包。但前面说了 App Store 根本不提供下载，幸运的是我们可以通过 `softwareupdate` 这个命令，去下载当前电脑所支持的系统版本。

```bash {frame="none"}
softwareupdate --list-full-installers
```

```bash {frame="none"}
Finding available software
Software Update found the following full installers:
* Title: macOS Sonoma, Version: 14.6, Size: 13339695KiB, Build: 23G80
* Title: macOS Sonoma, Version: 14.5, Size: 13353373KiB, Build: 23F79
* Title: macOS Sonoma, Version: 14.4.1, Size: 13298513KiB, Build: 23E224
* Title: macOS Ventura, Version: 13.6.8, Size: 11922165KiB, Build: 22G820
* Title: macOS Ventura, Version: 13.6.7, Size: 11924125KiB, Build: 22G720
* Title: macOS Ventura, Version: 13.6.6, Size: 11917983KiB, Build: 22G630
* Title: macOS Monterey, Version: 12.7.6, Size: 12118346KiB, Build: 21H1320
* Title: macOS Monterey, Version: 12.7.5, Size: 12116686KiB, Build: 21H1222
* Title: macOS Monterey, Version: 12.7.4, Size: 12117810KiB, Build: 21H1123
* Title: macOS Big Sur, Version: 11.7.10, Size: 12125478KiB, Build: 20G1427
* Title: macOS Catalina, Version: 10.15.7, Size: 8055650KiB, Build: 19H15
* Title: macOS Catalina, Version: 10.15.7, Size: 8055522KiB, Build: 19H2
* Title: macOS Catalina, Version: 10.15.6, Size: 8055450KiB, Build: 19G2021
* Title: macOS Mojave, Version: 10.14.6, Size: 5896894KiB, Build: 18G103
* Title: macOS Mojave, Version: 10.14.4, Size: 5894794KiB, Build: 18E2034
```

```bash {frame="none"}
softwareupdate --fetch-full-installer --full-installer-version 10.14.6
```

因为我另一台电脑支持的最旧版本是 Mojave，不是 High Sierra，所以最后我安装了 10.14.6。

### 安装时修改系统时间

打开 Utilities -> Terminal，使用 `date` 命令修改时间。

```bash {frame="none"}
date 010101012018
```

![macos-terminal](/images/misc/macos-terminal.jpg)

## 知其所以然

虽然问题是解决了，但我更想验证一下到底是不是证书过期的问题。

* High Sierra：报错，application is damaged
* Mojave：成功安装

这两个安装包都是后缀为 `.app` 的文件（其实也是目录），不像上面的 `.pkg` 文件，直接打开就能看到证书信息，需要使用别的方法。

### 查看证书信息

我们可以通过 `pkgutil` 查看 `.app` 的证书信息。

```bash {frame="none"}
pkgutil --check-signature Install\ macOS\ High\ Sierra.app
```

```bash {frame="none"}
Package "Install macOS High Sierra":
   Status: signed by untrusted certificate
   Certificate Chain:
    1. Software Signing
       SHA256 Fingerprint:
           2A A4 B9 97 3B 7B A0 7A DD 44 7E E4 DA 8B 53 37 C3 EE 2C 3A 99 19
           11 E8 0E 72 82 E8 A7 51 FC 32
       ------------------------------------------------------------------------
    2. Apple Code Signing Certification Authority
       Expires: 2026-10-24 17:39:41 +0000
       SHA256 Fingerprint:
           5B DA B1 28 8F C1 68 92 FE F5 0C 65 8D B5 4F 1E 2E 19 CF 8F 71 CC
           55 F7 7D E2 B9 5E 05 1E 25 62
       ------------------------------------------------------------------------
    3. Apple Root CA
       Expires: 2035-02-09 21:40:36 +0000
       SHA256 Fingerprint:
           B0 B1 73 0E CB C7 FF 45 05 14 2C 49 F1 29 5E 6E DA 6B CA ED 7E 2C
           68 C5 BE 91 B5 A1 10 01 F0 24
```

可以看到，这里面的证书信息包含了 3 个部份，但只有 2，3 部份有过期信息，且均没过期。更离谱的是，我也查了 Mojave 的证书信息，和上面的 High Sierra 是一模一样的。

那到底是什么问题？后来我发现可以使用 `codesign` 查看更详细的证书信息。

```bash {frame="none"}
codesign --display --extract-certificates Install\ macOS\ High\ Sierra.app
```

这个命令会在当前目录生成 3 个证书文件。

```bash {frame="none"}
codesign0 codesign1 codesign2
```

再使用 `qlmanage` 命令查看证书信息。

```bash {frame="none"}
qlmanage -c public.x509-certificate -p codesign0
```

![software-signing](/images/misc/software-signing.png)

可以看到 Software Signing 的过期时间是 2021 年 4 月 13 日，也正是上面 `pkgutil` 第一部份所缺失的信息。当我以为真相大白的时候，同样的命令，Mojave 也的过期时间也是 2021 年 4 月 13 日，这我就不懂了，那应该两个安装包都不行才对吧，然后我又问了一下 ChatGPT。

> 🤡：为什么 macos 的安装程序中 Software Signing 证书过期，还能正常运行
>
> 🤖：在 macOS 中，安装程序中的 Software Signing 证书过期后依然能够正常运行的原因是因为系统的设计方式。在创建安装程序时，只要证书在签署时是有效的，macOS 会忽略证书的过期日期，从而允许已签署的应用程序继续运行。以下是具体原因：
>
> 1. **签署时的有效性**：在安装程序创建时，只要证书是有效的，签署过程就会成功完成。这意味着安装程序在创建时已经被认证为安全的，即使之后证书过期，系统依然认可该签署的合法性。
> 2. **系统设计**：macOS 的设计理念是为了确保应用程序的连续性和用户体验的稳定性。为了避免因证书过期而导致用户无法使用已安装的应用程序，macOS 在运行时会忽略已签署应用程序的证书过期问题。
> 3. **减少用户和开发者的负担**：如果每次证书过期都要求用户重新安装应用程序，或者开发者必须频繁更新证书，这将给用户和开发者带来极大的不便。忽略过期证书可以避免这种情况，确保用户能够持续使用他们依赖的应用程序。
> 4. **实际操作中的容错性**：虽然理论上证书有有效期，但实际操作中，macOS 的容错性设计允许过期证书签署的应用程序继续运行。这种设计是为了确保系统的灵活性和可靠性。
>
> 综上所述，macOS 的安装程序中，Software Signing 证书过期后依然能够正常运行，是由于系统在签署时验证有效性，并在运行时忽略证书过期日期，从而确保应用程序的连续性和用户体验的稳定性。

所以到这里我是不是可以认为两个安装包的证书都是没问题的？

### Apple Installer Checksums

似乎我们还可以验证一下安装包的完整性，[Mac OSX Installers SHA1 Checksums](https://github.com/notpeter/apple-installer-checksums)。

```bash {frame="none"}
shasum /Applications/Install*OS*.app/Contents/SharedSupport/{Base,Install}*.dmg
```

但我都试了，结果是一样的，这也代表不了什么。

### 真相到底是什么

> It doesn't work，but I don't know why.

事情发展到这里，我已经不知道是什么原因导致 High Sierra 安装包报错了。

## 参考

* [https://eclecticlight.co/2019/10/18/beware-apple-security-certificates-after-24-october-they-may-have-expired/](https://eclecticlight.co/2019/10/18/beware-apple-security-certificates-after-24-october-they-may-have-expired/)
* [https://www.youtube.com/watch?v=E4Mu4tI8-iw](https://www.youtube.com/watch?v=E4Mu4tI8-iw)
* [https://github.com/notpeter/apple-installer-checksums](https://github.com/notpeter/apple-installer-checksums)
