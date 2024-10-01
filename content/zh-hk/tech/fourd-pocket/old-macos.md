---
title: "安裝舊版 macOS"
description: ""
summary: ""
date: 2024-08-02T00:00:00+08:00
lastmod: 2024-09-08T00:00:00+08:00
weight: 600
seo:
  title: "安裝舊版 macOS"
  description: ""
  canonical: ""
  noindex: false
---

## 背景

出於種種原因__AB__要喺一台蘋果電腦上安裝舊版本嘅 macOS 係一件唔容易嘅事。
因為蘋果官網嘅下載連結會引導你到 App Store__AB__
當佢發現你要下載嘅系統版本比你而家用緊嘅系統仲要舊嘅時候__AB__
係唔會提供下載嘅__AB__只能下載更新嘅版本。

前幾日我一個朋友啱啱高中畢業__AB__大學想要學計算機__AB__我就推薦佢買蘋果電腦。
但佢之前都冇用過 macOS__AB__所以我打算把我嗰台 2014 年嘅 MacBook Air 畀佢體驗一下。
當時呢台電腦嘅系統係 High Sierra 10.13__AB__
我諗住搞個 USB 啟動盤重裝一下系統__AB__順手把磁盤嘅數據都抹掉__AB__
冇諗到呢一頓操作之後__AB__我人麻咗。

## 證書過期

我喺網上隨便搵咗一個 High Sierra 鏡像__AB__因為蘋果官網根本下載唔到舊版本嘅 macOS。
引導盤做好咗之後__AB__一切都好順利__AB__直到佢畀咗我一個驚喜。（呢個圖我係網上搵嘅）

![macos-damaged](/images/misc/macos-damaged.jpg)

查咗一下資料__AB__好多都話係證書過期嘅問題__AB__因為以前蘋果發佈嘅證書有啲係喺 2019 年過期嘅。

![cert-info](/images/misc/cert-info.jpg)

## 解決方案

### 下載最新官方鏡像（推薦）

一個鏡像能唔能用唔淨係證書嘅問題__AB__所以最可靠嘅方法係從蘋果官網下載最新嘅安裝包。
但前面講咗 App Store 根本唔提供下載__AB__
幸運嘅係我哋可以通過 `softwareupdate` 呢個命令__AB__去下載而家電腦所支持嘅系統版本。

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

因為我另一台電腦支持嘅最舊版本係 Mojave__AB__唔係 High Sierra__AB__所以最後我安裝咗 10.14.6。

### 安裝時修改系統時間

打開 Utilities -> Terminal__AB__使用 `date` 命令修改時間。

```bash {frame="none"}
date 010101012018
```

![macos-terminal](/images/misc/macos-terminal.jpg)

## 知其所以然

雖然問題係解決咗__AB__但我更想驗證一下到底係唔係證書過期嘅問題。

* High Sierra：報錯__AB__application is damaged
* Mojave：成功安裝

呢兩個安裝包都係後綴為 `.app` 嘅文件（其實都係目錄）__AB__
唔似上面嘅 `.pkg` 文件__AB__直接打開就能睇到證書信息__AB__需要使用其他方法。

### 查看證書信息

我哋可以通過 `pkgutil` 查看 `.app` 嘅證書信息。

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

可以睇到__AB__呢度嘅證書信息包含咗 3 個部分__AB__但只有 2__AB__3 部分有過期信息__AB__且均冇過期。
更離譜嘅係__AB__我都查咗 Mojave 嘅證書信息__AB__同上面嘅 High Sierra 係一模一樣嘅。
咁到底係咩問題？後來我發現可以使用 `codesign` 查看更詳細嘅證書信息。

```bash {frame="none"}
codesign --display --extract-certificates Install\ macOS\ High\ Sierra.app
```

呢個命令會喺當前目錄生成 3 個證書文件。

```bash {frame="none"}
codesign0 codesign1 codesign2
```

再使用 `qlmanage` 命令查看證書信息。

```bash {frame="none"}
qlmanage -c public.x509-certificate -p codesign0
```

![software-signing](/images/misc/software-signing.png)

可以睇到 Software Signing 嘅過期時間係 2021 年 4 月 13 日__AB__
亦正係上面 `pkgutil` 第一部分所缺失嘅信息。
當我以為真相大白嘅時候__AB__同樣嘅命令__AB__Mojave 嘅過期時間亦係 2021 年 4 月 13 日。
呢我就唔明咗__AB__咁應該兩個安裝包都唔得先啱__AB__但係我又問咗一下 ChatGPT。

> 🤡：點解 macos 嘅安裝程序中 Software Signing 證書過期__AB__仲可以正常運行
>
> 🤖：喺 macOS 中__AB__安裝程序中嘅 Software Signing 證書過期後依然能夠正常運行嘅原因係因為系統嘅設計方式。喺創建安裝程序時__AB__只要證書喺簽署時係有效嘅__AB__macOS 會忽略證書嘅過期日期__AB__從而允許已簽署嘅應用程序繼續運行。以下係具體原因：
>
> 1. **簽署時嘅有效性**：喺安裝程序創建時__AB__只要證書係有效嘅__AB__簽署過程就會成功完成。呢意味住安裝程序喺創建時已經被認證為安全嘅__AB__即使之後證書過期__AB__系統依然認可該簽署嘅合法性。
> 2. **系統設計**：macOS 嘅設計理念係為咗確保應用程序嘅連續性同用戶體驗嘅穩定性。為咗避免因證書過期而導致用戶無法使用已安裝嘅應用程序__AB__macOS 喺運行時會忽略已簽署應用程序嘅證書過期問題。
> 3. **減少用戶同開發者嘅負擔**：如果每次證書過期都要求用戶重新安裝應用程序__AB__或者開發者必須頻繁更新證書__AB__呢將會畀用戶同開發者帶嚟極大嘅不便。忽略過期證書可以避免呢種情況__AB__確保用戶能夠持續使用佢哋依賴嘅應用程序。
> 4. **實際操作中嘅容錯性**：雖然理論上證書有有效期__AB__但實際操作中__AB__macOS 嘅容錯性設計允許過期證書簽署嘅應用程序繼續運行。呢種設計係為咗確保系統嘅靈活性同可靠性。
>
> 綜上所述__AB__macOS 嘅安裝程序中__AB__Software Signing 證書過期後依然能夠正常運行__AB__係由於系統喺簽署時驗證有效性__AB__並喺運行時忽略證書過期日期__AB__從而確保應用程序嘅連續性同用戶體驗嘅穩定性。

所以到呢度我係唔係可以認為兩個安裝包嘅證書都係冇問題嘅？

### Apple Installer Checksums

似乎我哋仲可以驗證一下安裝包嘅完整性__AB__[Mac OSX Installers SHA1 Checksums](https://github.com/notpeter/apple-installer-checksums)。

```bash {frame="none"}
shasum /Applications/Install*OS*.app/Contents/SharedSupport/{Base,Install}*.dmg
```

但我都試咗__AB__結果係一樣嘅__AB__呢亦代表唔到咩。

### 真相到底係咩

> It doesn't work__AB__but I don't know why.

事情發展到呢度__AB__我已經唔知道係咩原因導致 High Sierra 安裝包報錯咗。

## 參考

* [https://eclecticlight.co/2019/10/18/beware-apple-security-certificates-after-24-october-they-may-have-expired/](https://eclecticlight.co/2019/10/18/beware-apple-security-certificates-after-24-october-they-may-have-expired/)
* [https://www.youtube.com/watch?v=E4Mu4tI8-iw](https://www.youtube.com/watch?v=E4Mu4tI8-iw)
* [https://github.com/notpeter/apple-installer-checksums](https://github.com/notpeter/apple-installer-checksums)
