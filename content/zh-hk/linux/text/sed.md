---
title: "SED 命令"
description: ""
summary: ""
date: 2024-09-04T20:00:00+08:00
lastmod: 2024-09-05T20:00:00+08:00
weight: 4200
seo:
  title: "SED 命令"
  description: ""
  canonical: ""
  noindex: false
---

## Stream Editor

流式文本處理器，作者係 **Lee E. McMahon**。

### 基本語法

```bash {frame="none"}
sed [OPTIONS] 'command' file
```

* `OPTIONS`：命令選項。
* `command`：打印、替換、刪除等。
* `file`：處理嘅文件，如果省略，讀取 STDIN。

省略 `file` 為交互模式，輸入一行執行一次。

### 運行過程

* 讀入一行數據：
  * 有匹配規則：
    * 匹配成功：執行相關操作。
    * 匹配失敗：原樣打印數據。
  * 無匹配規則：執行相關操作。

### 命令引號

* 單引號：可減少轉義字符嘅影響，**優先使用**。
* 雙引號：可使用變量參數，需處理特殊字符。

## 常用例子

### 替換第一處

把第一處出現嘅 a 替換成 b。

```bash {frame="none"}
echo 'aba' | sed 's/a/b/'
```

```bash {frame="none"}
bba
```

### 替換第 N 處

把第 N 處出現嘅 a 替換成 b。

```bash {frame="none"}
echo 'aba' | sed 's/a/b/2'
```

```bash {frame="none"}
abb
```

### 替換所有處

```bash {frame="none"}
echo 'aba' | sed 's/a/b/g'
```

```bash {frame="none"}
bbb
```

### 執行多條命令

可以用 `;` 分隔，也可以使用 `-e` 選項。

```bash {frame="none"}
echo 'aba' | sed 's/a/b/; s/a/c/'
```

```bash {frame="none"}
echo 'aba' | sed -e 's/a/b/' -e 's/a/c/'
```

```bash {frame="none"}
bbc
```

### 使用命令文件

`cmd.sed` 文件內容如下。

```bash {frame="none"}
s/a/b/
s/a/c/
```

```bash {frame="none"}
echo 'aba' | sed -f cmd.sed
```

```bash {frame="none"}
bbc
```

### 只打印替換行

`-n` 表示抑制輸出，`p` 表示只輸出匹配行。

```bash {frame="none"}
echo '
aa bb
cc dd
' | sed -n 's/aa/bb/p'
```

```bash {frame="none"}
bb bb
```

### 替換結果寫文件

```bash {frame="none"}
echo '
aa bb
cc dd
' | sed 's/aa/bb/w out.txt'
```

```bash {frame="none"}
cat out.txt
```

```bash {frame="none"}
bb bb
```

### 修改命令分隔符

可以使用其他符號替換命令分隔符 `/`。

```bash {frame="none"}
echo '/bin/sh' | sed 's#/sh#/bash#'
```

```bash {frame="none"}
/bin/bash
```

### 指定行匹配

匹配第 2 行。

```bash {frame="none"}
sed '2s/aa/bb/'
```

匹配 2-4 行。

```bash {frame="none"}
sed '2,4s/aa/bb/'
```

匹配 2 到最後一行。

```bash {frame="none"}
sed '2,$s/aa/bb/'
```

### 指定行命令組

```bash {frame="none"}
sed '2{s/cc/aa/; s/dd/bb/}'
```

```bash {frame="none"}
sed '2,4{
s/cc/aa/
s/dd/bb/
}'
```

### 刪除所有行

```bash {frame="none"}
sed 'd'
```

### 刪除指定行

```bash {frame="none"}
sed '1d'
```

```bash {frame="none"}
sed '2,4d'
```

```bash {frame="none"}
sed '2,$d'
```

### 刪除匹配行

```bash {frame="none"}
sed '/aa bb/d'
```

### 前插一行

```bash {frame="none"}
echo "hello" | sed 'i\New Line'
```

### 後插一行

```bash {frame="none"}
echo "hello" | sed 'a\New Line'
```

### 指定行插入

```bash {frame="none"}
sed '3i\New Line'
```

### 匹配行插入

```bash {frame="none"}
sed '/cc/i\New Line'
```

### 插入多行

必須使用 `\`。

```bash {frame="none"}
sed '2i\
New Line 1\
New Line 2
'
```

### 修改行

```bash {frame="none"}
sed '2c\
Change Line 1\
Change Line 2
'
```

```bash {frame="none"}
sed '/aa/c\
Change Line 1
'
```

### 單字符替換

```bash {frame="none"}
echo 'aabbcc' | sed 'y/ac/ca/'
```

```txt {frame="none"}
ccbbaa
```

### 打印特定行

```bash {frame="none"}
sed -n '2,5p'
```

### 打印替換前後

```bash {frame="none"}
sed -n '/aa/{p; s/aa/cc/p}'
```

### 打印行號

```bash {frame="none"}
sed -n '/bb/{=; p}'
```

### 從文件讀取

創建 foo 同 bar 文件。

```bash {frame="none"}
echo -e 'aa\nbb' > foo
echo -e '11\n22' > bar
```

讀取 foo 文件，並插入到 bar 嘅第一行之後。

```bash {frame="none"}
sed '1r foo' bar
```

```txt {frame="none"}
11
aa
bb
22
```

匹配字符串再插入。

```bash {frame="none"}
sed '/22/r foo' bar
```

```txt {frame="none"}
11
22
aa
bb
```

匹配字符串插入，使用 `d` 刪除匹配行。

```bash {frame="none"}
sed '/22/{
r foo
d
}' bar
```

```txt {frame="none"}
11
aa
bb
```

下面會報語法錯誤。

```bash {frame="none"}
# 會報錯
sed '/22/{r foo; d}' bar
```

硬係要一行也唔係唔得。

```bash {frame="none"}
sed '/22/r foo' bar | sed '/22/d'
```
