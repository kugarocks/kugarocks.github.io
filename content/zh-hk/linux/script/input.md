---
title: "輸入處理"
description: ""
summary: ""
date: 2024-08-31T20:00:00+08:00
lastmod: 2024-08-31T20:00:00+08:00
weight: 3400
seo:
  title: "輸入處理"
  description: ""
  canonical: ""
  noindex: false
---

## 位置參數

Positional Parameters__AB__腳本嘅位置參數。

* `$0`：腳本名__AB__包含路徑。
* `$1`：第一個參數__AB__以此類推。
* `${10}`：大於 9 嘅參數要用花括號。

```bash {frame="none"}
#!/usr/bin/env bash

echo $0
echo $1
```

```bash {frame="none"}
./foo a
```

```bash {frame="none"}
./foo
a
```

## BASENAME

可以去掉腳本嘅路徑__AB__只保留名稱。

```bash {frame="none"}
basename /home/kuga/foo
```

腳本中嘅用法。

```bash {frame="none"}
name=$(basename $0)
```

## 特殊參數

[參考呢度。](te-shu-can-shu.md)

## 移動參數

`shift` 命令可以把位置參數左移一位。

```bash {frame="none"}
#!/usr/bin/env bash

i=1
while [ -n "$1" ]
do
    echo "param #$i = $1"
    i=$[ $i + 1 ]
    shift
done
```

```bash {frame="none"}
./foo a b
```

```txt {frame="none"}
param #1 = a
param #2 = b
```

## 腳本選項

選項就係以喺**單個連字符**後跟**單個字母**__AB__如：`-a`。由於選項同參數都係出現喺腳本嘅後面__AB__為咗區分開嚟__AB__一般係用雙連字符 `--`__AB__左邊係選項__AB__右邊係參數__AB__例如。

```bash {frame="none"}
./foo -a -b -- p1 p2
```

要喺腳本中正確解釋選項同參數__AB__唔係一件容易嘅事__AB__為此官方提供咗兩個工具。

* **`getopt`**
  * 外部命令。
  * 支持長選項__AB__如 `--help`。
  * 適合複雜嘅命令行工具。
* **`getopts`**
  * 內部命令。
  * 唔支持長選項。
  * 適合簡單嘅選項場景。

Github 上面都有唔少選項解釋項目。

## getopt 命令

```bash {frame="none"}
getopt optstring parameters
```

* `optstring`：選項嘅定義。
* `parameters`：選項嘅內容。

例如對於 `optstring=ab:c`。

* 單字母 `a` 同 `c` 代表無值選項。
* 字母 `b` 後跟 `:` 表示有值選項。

睇下下面例子嘅輸出。

```bash {frame="none"}
getopt ab:c -a -b bval -c p1 p2
```

```bash {frame="none"}
 -a -b bval -c -- p1 p2
```

可以睇到佢使用 `--` 把選項同參數分隔開咗。

## getopts 命令

`getopts` 係 Bash 嘅內置命令__AB__佢會逐個解釋選項__AB__然後把選項嘅信息存儲喺特定變量中__AB__方便腳本訪問。呢個先係畀我呢啲小菜雞用嘅命令。

```bash {frame="none"}
getopts optstring name
```

* `name`：當前選項嘅名稱。
* `OPTIND`：每處理一個項目__AB__該值會加 1。
* `OPTARG`：如果選項有值__AB__會保存在呢個變量中。

```bash {frame="none"}
#!/usr/bin/env bash

while getopts "ab:c:" name; do
  case $name in
    a)
      echo "Option -a"
      ;;
    b)
      echo "Option -b: $OPTARG"
      ;;
    c)
      echo "Option -c: $OPTARG"
      ;;
    \?)
      echo "Invalid option: -$OPTARG"
      exit 1
      ;;
  esac
done

# 顯示 OPTIND 嘅值
echo "OPTIND: $OPTIND"

# 使用 shift 來移除已解析嘅選項同參數
shift $((OPTIND - 1))

# 剩餘嘅非選項參數
echo "Params: $@"
```

```bash {frame="none"}
./foo -a -b v1 -c v2 p1 p2
```

```txt {frame="none"}
Option -a
Option -b: v1
Option -c: v2
OPTIND: 6
Params: p1 p2
```
