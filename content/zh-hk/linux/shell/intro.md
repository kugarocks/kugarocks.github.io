---
title: "Shell 簡介"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 400
seo:
  title: "Shell簡介"
  description: ""
  canonical: ""
  noindex: false
---

## GNU Bash Manual

Bash 係 Linux 中嘅默認 Shell，**官方手冊係永遠嘅神**。

{{< link-card
  title="Bash Reference Manual"
  description="Bash 參考手冊"
  href="https://www.gnu.org/software/bash/manual/bash.html"
  target="_blank"
>}}

## Shell 嘅定義

喺 Linux 中，Shell 係一個**命令解釋器（軟件程序）**，負責接收用戶輸入嘅命令並將其傳遞畀操作系統內核執行。
Shell 提供咗一種用戶同操作系統交互嘅接口，係操作系統嘅最外層。
另外佢仲支持編程，包括變量、循環、條件判斷等，呢個就係我哋常常所講嘅 Shell 腳本。
常見嘅 Shell 按時間排序有以下幾種：

| Shell | 描述 |
| --- | --- |
| **Sh** | Bourne Shell，最早期嘅 Shell，作者係 Stephen Bourne。 |
| **Bash** | Bourne Again Shell，Linux 最常用嘅 Shell，由 GNU 開發。 |
| **Dash** | Debian Almquist Shell，常見於 Ubuntu。 |
| **Zsh** | Z Shell，功能更強大，macOS 默認 Shell。 |

## 同終端嘅關係

我哋而家所講嘅終端一般係指終端模擬器，常見嘅有 GNOME Terminal、iTerm2 等等。
終端提供咗一個界面，用戶可以通過該界面同 Shell 進行交互。
終端唔會執行任何命令，佢只係負責接收輸入並顯示輸出。
Shell 係喺終端中運行嘅進程，負責實際嘅命令解釋同執行工作。
唔好混淆終端同 Shell 嘅概念，例如下面嘅對話內容係唔準確嘅。

> A：你平時用咩 Shell
>
> B：我用 iTerm2
>
> A：打開 Shell，然後輸入...

iTerm2 唔係 Shell，係終端，另外 Shell 係唔需要打開嘅，終端打開嘅時候就會默認啟動。

## 唔同 Shell 嘅區別

### 歷史同起源

* `sh` 係 Unix 系統嘅原始 Shell，提供基本功能。
* `bash` 係 `sh` 嘅增強版，功能更加豐富，係 Linux 上嘅主流 Shell。
* `zsh` 係一種功能更強大且可高度定制嘅 Shell，結合咗多個 Shell 嘅優勢。

### 功能性

* `sh` 提供基礎嘅命令同腳本執行功能，主要用於簡單腳本同系統任務。
* `bash` 增加咗交互式功能（如命令歷史、補全），適合日常使用同複雜嘅腳本編寫。
* `zsh` 擁有最豐富嘅功能，特別係喺自動補全、命令行提示、語法高亮等方面。

### 交互體驗

* `sh` 嘅交互體驗較為基礎，冇現代化嘅功能。
* `bash` 提供咗豐富嘅命令行交互體驗，支持命令補全、歷史等。
* `zsh` 喺交互體驗上更進一步，支持更高級嘅補全、自動建議同錯誤更正。

### 定制化

* `sh` 幾乎冇定制化選項。
* `bash` 支持一啲定制化，但相比 `zsh` 仍然有限。
* `zsh` 可以通過框架（如 Oh My Zsh）輕鬆定制，支持插件、主題等。
