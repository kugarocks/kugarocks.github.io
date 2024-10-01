---
title: "重要概念"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 1700
seo:
  title: "重要概念"
  description: ""
  canonical: ""
  noindex: false
---

## 起源

Linux 中嘅環境變量源自早期 UNIX 系統嘅設計需求。
通過環境變量__AB__用戶同進程能夠動態咁影響系統行為__AB__而唔需要修改系統嘅核心代碼。
呢種靈活性同可配置性使環境變量成為 Linux 系統同應用程序配置嘅關鍵部分。

喺 UNIX 中__AB__每個進程都有自己嘅環境（即一組環境變量）__AB__呢啲環境變量喺進程嘅啟動時由父進程傳遞畀子進程。
最典型嘅例子係當用戶登錄系統時__AB__系統啟動嘅 Shell 進程會繼承一組默認嘅環境變量__AB__例如用戶嘅主目錄、Shell 類型等。
用戶可以喺呢個基礎上修改或添加環境變量__AB__影響自己啟動嘅程序或進程嘅行為。

## 概念勘誤

有啲書籍同文章會把環境變量分為~~全局環境變量同局部環境變量~~__AB__但呢種分類係唔準確嘅__AB__
因為喺官方嘅文檔中__AB__從來冇呢兩種分類嘅定義__AB__甚至連英文名稱都冇。
因此__AB__為咗避免語義上嘅邏輯問題__AB__本文唔會對環境變量進行上述嘅分類。

> 《Linux 命令行與Shell 腳本編程大全》
>
> 《Linux Command Line and Shell Scripting Bible》

上面呢本書關於環境變量嘅章節係有問題嘅__AB__唔係翻譯嘅問題__AB__原版就有問題。

## 打印環境變量

### 命令：printenv

唔帶參數會打印所有環境變量。

```bash {frame="none"}
printenv | head -n 3
```

```bash {frame="none"}
SHELL=/bin/bash
PWD=/home/kuga
LOGNAME=kuga
```

打印指定環境變量。

```bash {frame="none"}
printenv PATH
```

```bash {frame="none"}
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

### 命令：env

唔帶參數會打印所有環境變量。

```bash {frame="none"}
env | head -n 3
```

```bash {frame="none"}
SHELL=/bin/bash
PWD=/home/kuga
LOGNAME=kuga
```

### 命令：echo

打印指定變量__AB__可以係環境變量或 Shell 變量。

```bash {frame="none"}
echo $HOME
```

```bash {frame="none"}
/home/kuga
```

## 自定義 Shell 變量

定義名為 soda 嘅 Shell 變量__AB__值為 green。

```bash {frame="none"}
soda=green
```

```bash {frame="none"}
echo $soda
```

```bash {frame="none"}
green
```

### 使用 printenv 訪問

```bash {frame="none"}
printenv soda
```

輸出為空__AB__因為 soda **唔係環境變量__AB__佢只係一個 Shell 變量**。

### 使用命令分組 () 訪問

```bash {frame="none"}
(echo $soda)
```

```bash {frame="none"}
green
```

### 使用命令分組 () 修改

```bash {frame="none"}
(soda=yellow; echo $soda); echo $soda
```

```bash {frame="none"}
yellow
green
```

Subshell 內部嘅修改唔會影響外部嘅數據。

### 創建 Bash 實例訪問

```bash {frame="none"}
bash
```

```bash {frame="none"}
echo $soda
```

輸出為空__AB__呢就係普通 Shell 變量嘅基本作用域。

## 自定義環境變量

可以通過 `export` 指令把 Shell 變量轉變為環境變量__AB__官方手冊嘅定義如下。

```bash {frame="none" text-wrap="wrap"}
Mark each name to be passed to child processes in the environment.
```

```bash {frame="none"}
翻譯：標記變量名稱__AB__使其喺環境中可以傳遞畀子進程。
```

可以同時定義和導出變量__AB__或分開操作。

```bash {frame="none"}
export soda=green
```

```bash {frame="none"}
soda=green; export soda;
```

### 使用 printenv 訪問

轉變為環境變量之後__AB__使用 printenv 就能正常打印了。

```bash {frame="none"}
printenv soda
```

```bash {frame="none"}
green
```

### 使用命令分組 () 訪問

```bash {frame="none"}
(printenv soda)
```

```bash {frame="none"}
green
```

### 使用命令分組 () 修改

```bash {frame="none"}
(soda=yellow; echo $soda); echo $soda
```

```bash {frame="none"}
yellow
green
```

同樣__AB__內部修改環境變量是唔會影響外部嘅數據。

### 創建 Bash 實例訪問

```bash {frame="none"}
bash -c "printenv soda"
```

```bash {frame="none"}
green
```

環境變量喺新創建嘅 Bash 實例中係能訪問嘅。

### 查看所有 export 變量

唔帶參數__AB__或使用 `-p` 就能打印所有 export 變量。

```bash {frame="none"}
export
```

```bash {frame="none"}
export | grep soda
```

```bash {frame="none"}
declare -x soda="green"
```

### 取消 export 環境變量

使用 `-n` 選項就能取消 export__AB__變回普通嘅 Shell 變量。

```bash {frame="none"}
export -n soda
```

```bash {frame="none"}
printenv soda; echo $soda
```

printenv 無輸出__AB__echo 正常輸出__AB__因為 soda 已經唔再係環境變量。

### 刪除變量

下面會刪除整個變量__AB__無論係環境變量或 Shell 變量。

```bash {frame="none"}
unset soda
```

```bash {frame="none"}
echo $soda
```

## 命令：declare

用於聲明變量和屬性__AB__唔帶任何參數就輸出所有嘅變量聲明和當前值。

```bash {frame="none" text-wrap="wrap"}
Declare variables and give them attributes. If no names are given, then display the values of variables instead.
```

常用參數：

* `-i`：將變量聲明為整數。
* `-r`：將變量聲明為只讀。
* `-x`：將變量導出為環境變量。
* `-p`：顯示變量嘅聲明和當前值。

### 不帶參數聲明

效果和普通嘅 Shell 變量一樣。

```bash {frame="none"}
declare soda="green"
```

```bash {frame="none"}
echo $soda
```

### 顯示當前變量嘅聲明

```bash {frame="none"}
declare -p soda
```

```bash {frame="none"}
declare -- soda="green"
```

### 顯示所有變量嘅聲明

```bash {frame="none"}
declare -p
```

### 聲明環境變量

```bash {frame="none"}
declare -x soda="green"
```

```bash {frame="none"}
printenv soda
```

```bash {frame="none"}
green
```

喺 `export` 中亦能睇到 soda 嘅定義。

```bash {frame="none"}
export | grep soda
```

### -x 與 -\- 嘅區別

不難發現__AB__可以通過聲明嘅符號區分不同嘅變量類型。

* `-x`：環境變量嘅聲明。
* `--`：普通 Shell 變量嘅聲明。

```bash {frame="none"}
declare -p soda
```

```bash {frame="none"}
declare -x soda="green"
```

取消 export 後。

```bash {frame="none"}
export -n soda
```

```bash {frame="none"}
declare -p soda
```

```bash {frame="none"}
declare -- soda="green"
```

## 內建命令手冊

有啲內建命令使用 `man` 係無法查看手冊嘅__AB__但可以使用 `help` 命令__AB__或 `--help` 選項。

### export

```bash {frame="none"}
type -a export
```

```bash {frame="none"}
export is a shell builtin
```

***

```bash {frame="none"}
help export
```

```bash {frame="none"}
export --help
```

### declare

同上

### unset

同上
