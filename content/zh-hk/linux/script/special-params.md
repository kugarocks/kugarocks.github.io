---
title: "特殊參數"
description: ""
summary: ""
date: 2024-08-30T20:00:00+08:00
lastmod: 2024-08-30T20:00:00+08:00
weight: 3900
seo:
  title: "特殊參數"
  description: ""
  canonical: ""
  noindex: false
---

## 參數：$?

上一個命令或者腳本嘅退出碼，0 代表成功，非 0 代表失敗。

```bash {frame="none"}
ls 404
```

```bash {frame="none"}
echo $?
```

會輸出 2，表示失敗。喺腳本中可以用 `exit` 指定返回碼。

## 參數：$\#

表示傳畀腳本或者函數嘅參數個數。

```bash {frame="none"}
#!/usr/bin/env bash
echo $#
```

```bash {frame="none"}
./foo p1 p2
```

```txt {frame="none"}
2
```

## 參數：$*

傳畀腳本嘅所有參數，默認以空格分隔。

```bash {frame="none"}
#!/usr/bin/env bash
echo $*
```

```bash {frame="none"}
./foo p1 p2p3
```

```txt {frame="none"}
p1 p2p3
```

分隔符可以通過 `IFS` 變量修改。

## 參數：$@

傳畀腳本嘅所有參數，默認以空格分隔。

```bash {frame="none"}
#!/usr/bin/env bash
echo $@
```

```bash {frame="none"}
./foo p1 p2p3
```

```txt {frame="none"}
p1 p2p3
```

分隔符可以通過 `IFS` 變量修改。

## 區別：$* 同 $@

主要區別喺處理帶有空格嘅參數。

* `$*`：代表所有參數嘅字符串，係一個整體。
* `$@`：
  * 唔帶雙引號：同 `$*` 一樣。
  * 帶上雙引號：`"$@"`，表示參數數組，每個參數係獨立嘅。

```bash {frame="none"}
# 假設傳畀嘅參數係 "arg1" "arg2 with space" "arg3"
for arg in "$@"; do
    echo "Argument: $arg"
done
```

```bash {frame="none"}
# 將所有參數傳畀另一個腳本
another_script "$@"
```

## 參數：$$

當前腳本嘅進程 ID。

```bash {frame="none"}
echo $$
```

## 參數：$\!

最近喺進程後台運行嘅進程 ID。

```bash {frame="none"}
echo $!
```

## 參數：$0

當前腳本名稱。

```bash {frame="none"}
echo $0
```

```txt {frame="none"}
-bash
```

## 參數：$n

第 n 個參數。

```bash {frame="none"}
#!/usr/bin/env bash
echo $1
```

```bash {frame="none"}
./foo a b c
```

```txt {frame="none"}
a
```

## 參數：$-

腳本嘅選項。

```bash {frame="none"}
echo $-
```

```txt {frame="none"}
himBHs
```

上面係當前 Shell 嘅啟動選項。
