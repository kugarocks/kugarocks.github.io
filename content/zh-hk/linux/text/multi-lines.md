---
title: "創建多行文本"
description: ""
summary: ""
date: 2024-09-04T20:00:00+08:00
lastmod: 2024-09-04T20:00:00+08:00
weight: 4000
seo:
  title: "創建多行文本"
  description: ""
  canonical: ""
  noindex: false
---

## ECHO 命令

使用 `-e` 選項可以創建簡單嘅多行文本。

```bash {frame="none"}
echo -e 'aa\nbb'
```

```txt {frame="none"}
aa
bb
```

## Here Document

Here Document（縮寫為 Heredoc）係 Shell 中嘅一種輸入重定向方式，
允許喺腳本或命令中嵌入多行文本並傳遞俾命令或文件。

### 基本語法

```bash {frame="none"}
command <<EOF
多行文本內容
EOF
```

* `command`：如 `cat`、`sed`、`gawk`。
* `<<EOF`：標記文檔嘅開始並定義結束標記。
* `EOF`：標記文檔結束位置。

呢度嘅 `EOF` 只係一個例子，可以用任意標記。

### 創建多行文本文件

多行文本可以重定向到 `foo.txt` 文件。

```bash {frame="none"}
cat <<EOF > foo.txt
apple
banana
EOF
```

```txt {frame="none"}
cat foo.txt
```

```txt {frame="none"}
apple
banana
```

### 作為命令嘅輸入

```bash {frame="none"}
grep 'app' <<EOF
apple
banana
EOF
```

### 引號嘅區別

如果 EOF 標記使用引號，功能會有所不同。

| 引號類型 | 變量/特殊字符 |
| --- | --- |
| `EOF` | 解釋 |
| `'EOF'` | 唔解釋 |
| `"EOF"` | 唔解釋 |

如果內容只係純文檔，盡量使用引號，減少特殊字符嘅影響。

### 使用引號

單/雙引號係一樣嘅，都唔會解釋 `$` 符號。

```bash {frame="none"}
cat <<'EOF'
$HOME
EOF
```

```txt {frame="none"}
$HOME
```

### 唔使用引號

同唔使用引號係一樣嘅，會解釋 `$` 符號。

```bash {frame="none"}
cat <<EOF
$HOME
EOF
```

```txt {frame="none"}
/home/kuga
```
