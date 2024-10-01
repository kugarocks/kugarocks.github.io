---
title: "Install Old macOS"
description: ""
summary: ""
date: 2024-08-02T00:00:00+08:00
lastmod: 2024-09-08T00:00:00+08:00
weight: 600
seo:
  title: "Install Old macOS"
  description: ""
  canonical: ""
  noindex: false
---

## Background

For various reasons, installing an old version of macOS on an Apple computer is not an easy task.
Because the download link on the Apple official website will guide you to the App Store,
when it finds that the system version you want to download is older than the system you are currently using,
it will not provide the download, only the updated version.

A few days ago, a friend of mine just graduated from high school and wanted to study computer science in college, so I recommended him to buy an Apple computer.
But he had never used macOS before, so I planned to let him experience my 2014 MacBook Air.
At that time, the system of this computer was High Sierra 10.13,
I thought about making a USB boot disk to reinstall the system, and conveniently erase all the data on the disk,
I didn't expect that after this operation, I was stunned.

## Certificate Expired

I found a High Sierra image online, because the Apple official website cannot download old versions of macOS.
After the boot disk was made, everything went smoothly, until it gave me a surprise. (I found this picture online)

![macos-damaged](/images/misc/macos-damaged.jpg)

Checked some information, many said it was a problem with the expired certificate, because some of the certificates issued by Apple expired in 2019.

![cert-info](/images/misc/cert-info.jpg)

## Solution

### Download Latest Image (Recommended)

Whether an image can be used is not just a certificate issue, so the most reliable method is to download the latest installation package from the Apple official website.
But as mentioned earlier, the App Store does not provide downloads at all,
Fortunately, we can use the `softwareupdate` command to download the system version supported by the current computer.

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

Because my other computer supports the oldest version is Mojave, not High Sierra, so in the end I installed 10.14.6.

### Modify System Time

Open Utilities -> Terminal, use the `date` command to modify the time.

```bash {frame="none"}
date 010101012018
```

![macos-terminal](/images/misc/macos-terminal.jpg)

## Understand the reason

Although the problem has been solved, I want to verify whether it is really a problem with the expired certificate.

* High Sierra: Error, application is damaged
* Mojave: Successfully installed

These two installation packages are files (actually directories) with the suffix `.app`,
unlike the above `.pkg` files, you can directly see the certificate information when you open them, you need to use another method.

### Certificate Information

We can use `pkgutil` to view the certificate information of `.app`.

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

You can see that the certificate information in this package contains 3 parts, but only parts 2 and 3 have expiration information, and none of them have expired.
What's even more ridiculous is that I also checked the certificate information of Mojave, and it is exactly the same as High Sierra.
So what's the problem? Later I found that you can use `codesign` to view more detailed certificate information.

```bash {frame="none"}
codesign --display --extract-certificates Install\ macOS\ High\ Sierra.app
```

This command will generate 3 certificate files in the current directory.

```bash {frame="none"}
codesign0 codesign1 codesign2
```

Use the `qlmanage` command to view the certificate information.

```bash {frame="none"}}
qlmanage -c public.x509-certificate -p codesign0
```

![software-signing](/images/misc/software-signing.png)

You can see that the expiration date of Software Signing is April 13, 2021,
which is exactly the missing information in the first part of `pkgutil`.
When I thought the truth was revealed, the same command, the expiration date of Mojave is also April 13, 2021.
I don't understand this, then both installation packages should not work, and then I asked ChatGPT again.

> 🤡: Why can the Software Signing certificate in the macos installation program still run normally after it expires
>
> 🤖: In macOS, the reason why the Software Signing certificate in the installation program can still run normally after it expires is because of the system's design. When creating the installation program, as long as the certificate is valid at the time of signing, macOS will ignore the expiration date of the certificate, allowing the signed application to continue running. The following are the specific reasons:
>
> 1. **Validity at the time of signing**: When creating the installation program, as long as the certificate is valid, the signing process will be successfully completed. This means that the installation program has been certified as safe at the time of creation, even if the certificate expires later, the system still recognizes the legality of the signing.
> 2. **System design**: The design concept of macOS is to ensure the continuity of applications and the stability of user experience. In order to avoid the situation where users cannot use the installed applications due to the expiration of the certificate, macOS will ignore the expiration date of the signed application at runtime.
> 3. **Reduce the burden on users and developers**: If the expiration of the certificate requires users to reinstall the application every time, or developers have to update the certificate frequently, this will bring great inconvenience to users and developers. Ignoring the expiration of the certificate can avoid this situation, ensuring that users can continue to use the applications they rely on.
> 4. **Fault tolerance in actual operation**: Although the certificate has a validity period in theory, in actual operation, the fault tolerance design of macOS allows the signed application to continue running even if the certificate expires. This design is to ensure the flexibility and reliability of the system.
>
> In summary, the reason why the Software Signing certificate in the installation program of macOS can still run normally after it expires is because the system verifies the validity at the time of signing, and ignores the expiration date of the certificate at runtime, ensuring the continuity of the application and the stability of the user experience.

So can I assume that the certificates of the two installation packages are not a problem?

### Apple Installer Checksums

It seems that we can also verify the integrity of the installation package, [Mac OSX Installers SHA1 Checksums](https://github.com/notpeter/apple-installer-checksums).

```bash {frame="none"}}
shasum /Applications/Install*OS*.app/Contents/SharedSupport/{Base,Install}*.dmg
```

But I tried it, the result is the same, which also does not represent anything.

### What is the truth

> It doesn't work, but I don't know why.

The situation has developed to this point, I really don't know what caused the High Sierra installation package to report an error.

## Reference

* [https://eclecticlight.co/2019/10/18/beware-apple-security-certificates-after-24-october-they-may-have-expired/](https://eclecticlight.co/2019/10/18/beware-apple-security-certificates-after-24-october-they-may-have-expired/)
* [https://www.youtube.com/watch?v=E4Mu4tI8-iw](https://www.youtube.com/watch?v=E4Mu4tI8-iw)
* [https://github.com/notpeter/apple-installer-checksums](https://github.com/notpeter/apple-installer-checksums)
