---
title: "內建命令與外部命令"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 700
seo:
  title: "內建命令與外部命令"
  description: ""
  canonical: ""
  noindex: false
---

## 內建命令

Builtin Commands。
內建命令係由 Shell 自身實現嘅命令__AB__佢哋喺 Shell 內部運行__AB__
**無需啟動新進程**或者調用外部程序__AB__係 Shell 操作嘅基本功能。

### 常見嘅內建命令

* `cd`：更改當前工作目錄。
* `echo`：輸出字符串到終端。
* `exit`：退出當前 Shell 會話。
* `export`：設置或者導出環境變量。
* `alias`：為命令創建別名。
* `set`：設置 Shell 選項同變量。
* `read`：從標準輸入讀取一行並賦值畀變量。

### 完整嘅內建命令

{{< link-card
  title="Bash Builtin Commands"
  description="Bash 內建命令"
  href="https://www.gnu.org/software/bash/manual/html_node/Bash-Builtins.html"
  target="_blank"
>}}

## 外部命令

External Commands。
外部命令係指嗰啲唔係由 Shell 自身實現嘅命令__AB__而係系統中嘅可執行文件。
當你運行一個外部命令時__AB__Shell 會通過查找 `PATH` 環境變量中嘅目錄__AB__
搵到對應嘅可執行文件__AB__並**啟動一個新進程**嚟運行該命令。

### 常見嘅外部命令

* `/bin/ls`：列出目錄內容。
* `/usr/bin/grep`：搜索文件中內容。
* `/bin/cat`：顯示文件內容。
* `/bin/mkdir`：創建目錄。

## 區分內建命令與外部命令

### 使用 type 命令

```bash {frame="none"}
type cd
````

```bash {frame="none"}
cd is a shell builtin
````

***

```bash {frame="none"}
type cat
````

```bash {frame="none"}
cat is /usr/bin/cat
````

### 列出所有實現

```bash {frame="none"}
type -a pwd
````

```bash {frame="none"}
pwd is a shell builtin
pwd is /usr/bin/pwd
pwd is /bin/pwd
````

上面列出咗 pwd 嘅內建實現同外部實現__AB__如果要使用外部實現__AB__需要使用完整路徑。

### 列出命令嘅別名

```bash {frame="none"}
type -a ls
````

```bash {frame="none"}
ls is aliased to `ls --color=auto'
ls is /usr/bin/ls
ls is /bin/ls
````

另外使用 `which` 命令只會顯示外部命令。
