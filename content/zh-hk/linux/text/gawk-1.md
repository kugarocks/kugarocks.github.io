---
title: "GAWK 指令 - 1"
description: ""
summary: ""
date: 2024-09-05T20:00:00+08:00
lastmod: 2024-09-05T20:00:00+08:00
weight: 4300
seo:
  title: "GAWK 指令 - 1"
  description: ""
  canonical: ""
  noindex: false
---

## GNU AWK

`gawk` 係 GNU 版本嘅文本處理工具。
喺大部分 GNU/Linux 發行版入面，`gawk` 係預設嘅 `awk` 實現，所以喺日常使用中通常冇乜分別。

```bash {frame="none"}
readlink -f /usr/bin/awk
```

```txt {frame="none"}
/usr/bin/gawk
```

`gawk` 命令默認使用 ERE 模式。

### 基本語法

```bash {frame="none"}
gawk [OPTIONS] program file
```

* `OPTIONS`：命令選項。
* `program`：呢個命令入面仲有個程序。
* `file`：處理嘅文件，如果省略，讀取 STDIN。

省略 `file` 係交互模式，輸入一行執行一次。

### 運行過程

* 讀入一行數據：
  * 有匹配規則：
    * 匹配成功：執行相關操作。
    * 匹配失敗：唔執行操作。
  * 無匹配規則：執行相關操作。

### 基礎用法

創建 foo 文件。

```bash {frame="none"}
echo -e 'aa 11\nbb 22' > foo
```

對於每行數據，`gawk` 默認使用空格/制表符分隔欄位。

* `$N`：表示第 N 個欄位。
* `$0`：表示整行數據。

```bash {frame="none"}
gawk '{print $1}' foo
```

```txt {frame="none"}
aa
bb
```

### BEGIN/END 結構

* BEGIN：初始化，解釋之前執行。
* BODY：對每個記錄執行一次。
* END：結束處理。

留意使用引號 `'EOF'` 創建文件，咁樣就唔會處理特殊字符 `$`。

```bash {frame="none"}
cat <<'EOF' > foo.gawk
BEGIN {
    FS=":"
    print "User\tShell"
    print "-------\t-------"
}
{
    print $1 "\t" $6
}
END {
    print "-------\t-------"
}
EOF
```

```bash {frame="none"}
head -n 3 /etc/passwd | gawk -f foo.gawk
```

```txt {frame="none"}
User    Shell
------- -------
root    /root
daemon  /usr/sbin
bin     /bin
------- -------
```

## 常用選項

### 指定分隔符

`-F` 選項可以修改行嘅分隔符。

```bash {frame="none"}
gawk -F: '{print $1}' /etc/passwd | head -n 1
```

### 指定檔案

`-f` 選項可以指定檔案。

```bash {frame="none"}
echo '{print $1 "-dir:" $6}' > foo.gawk
```

```bash {frame="none"}
gawk -F: -f foo.gawk /etc/passwd | head -n 1
```

```txt {frame="none"}
root-dir:/root
```

### 變量參數賦值

`-v` 選項可以喺 BEGIN 之前畀變量賦值。

```bash {frame="none"}
gawk -v n=2 'BEGIN{print 2*n}'
```

```txt {frame="none"}
4
```

如果唔需要喺 BEGIN 中使用，可以唔使用 `-v` 參數。

```bash {frame="none"}
echo 'a b c' | gawk '{print $n}' n=2
```

```txt {frame="none"}
b
```

## 內置變量

### 變量 $N

`$N` 仲可以賦值，字符串嘅雙引號唔可以省略。

```bash {frame="none"}
echo 'hey man' | gawk '{$2="bro"; print $0}'
```

```txt {frame="none"}
hey bro
```

### 變量 FS

Field Separator，字段分隔符。

```bash {frame="none"}
gawk 'BEGIN{FS=":"} {print $1}' /etc/passwd | head -n 1
```

### 變量 NF

Number of Fields，表示記錄中嘅字段數量。

```bash {frame="none"}
gawk -F: '$1=="root"{print $1":"$NF}' /etc/passwd
```

```txt {frame="none"}
root:/bin/bash
```

### 變量 NR

Number of Records，表示而家處理緊嘅記錄編號，默認值係 1，處理完一行之後會加 1。
可以用嚟跳過文本嘅第一行，第一行嘅 `NR` 值係 1。

```bash {frame="none"}
cat <<EOF > foo
name score
foo  90
bar  80
EOF
```

```bash {frame="none"}
gawk '{if (NR>1) {if ($2>85) {print $1,$2}}}' foo
```

```txt {frame="none"}
foo 90
```

### 變量 RS

記錄分隔符，輸入記錄分隔符，默認值係 `\n`，表示以換行符分隔每條記錄。
將 `RS` 設置為 `""` 表示以空行作為記錄分隔符，對於下面嘅文本，會分為上下 2 個記錄。

```bash {frame="none"}
cat <<EOF > foo
apple
sweet
red

banana
sweet
yellow
EOF
```

設置 `FS="\n"`，噉就可以透過 `$N` 獲取每行記錄。`RS` 同 `FS` 通常結合使用。

```bash {frame="none"}
gawk 'BEGIN{RS=""; FS="\n"} {print $1"\t"$3}' foo
```

```txt {frame="none"}
apple  red
banana yellow
```

### 變量 OFS

Output Field Separator，輸出欄位分隔符。

```bash {frame="none"}
echo 'aa,bb' | gawk 'BEGIN{FS=","; OFS="-"} {print $1,$2}'
```

```txt {frame="none"}
aa-bb
```

### 變量 FIELDWIDTHS

指定字符寬度進行分隔。

```bash {frame="none"}
echo 'abbc' | gawk 'BEGIN{FIELDWIDTHS="1 2 1"} {print $1,$2,$3}'
```

```txt {frame="none"}
a bb c
```

## 條件同結構

### 條件表達式

`==`、`<`，`<=`，`>`，`>=`。

```bash {frame="none"}
gawk -F: '$7=="/bin/bash"{print $1}' /etc/passwd
```

輸出所有以 bash 啟動嘅用戶。

### 條件語句

`if` 裏面單條語句可以唔加 `{}`。

```bash {frame="none"}
echo -e '10\n20' | gawk '{if ($1>15) print $1}'
```

`if` 裡面多條語句要加 `{}`。

```bash {frame="none"}
echo -e '10\n20' | gawk '{if ($1>15) {x=2*$i; print x}}'
```

單行嘅 `else` 語句，前面嘅語句要加 `;` 號。

```bash {frame="none"}
echo -e '10\n20' | gawk '{if ($1>15) print $1; else print "no"}'
```

多行唔需要加分號。

```bash {frame="none"}
echo -e '10\n20' | gawk '{
if ($i>15) {
    x=2*$i
    print x
} else {
    print "no"
}
}'
```

### FOR 語句

對每一行嘅字段求和，`+=` 同 `++` 都支持。

```bash {frame="none"}  
echo '1 2 3' | gawk '{
total=0
for (i=1; i<=NF; i++) {
    total += $i
}
print total
}'
```

### WHILE 語句

對每一行嘅字段求和。

```bash {frame="none"}
echo '1 2 3' | gawk '{
i=1
total=0
while (i<=NF) {
    total += $i
    i++
}
print total
}'
```

### DO-WHILE 語句

對每一行嘅字段求和

```bash {frame="none"}
echo '1 2 3' | gawk '{
i=1
total=0
do {
    total += $i
    i++
} while(i<=NF)
print total
}'
```

## 函數相關

### 內建函數

* `int(x)`：攞 x 嘅整數部分。
* `exp(x)`：x 嘅指數。
* `sqrt(x)`：x 嘅平方根。
* `rand()`：比 0 大但小於 1 嘅隨機數。
* `length(x)`：x 嘅字符串長度。
* `tolower(x)`：將 x 轉做小寫。
* `toupper(x)`：將 x 轉做大寫。

仲有好多，例如 `gensub`，`gsub`。

### 自定義函數

自定義函數必須出現喺 `BEGIN` 塊之前。

```bash {frame="none"}
gawk '
function random(ts, num) {
    srand(ts)
    return int(num * rand())
}
BEGIN {
    ts=systime()
    print ts
    print random(ts, 10)
}'
```

可以使用函數庫文件，再引用。

```bash {frame="none"}  
cat <<'EOF' > funclib.gawk
function random(ts, num) {
    srand(ts)
    return int(num * rand())
}
EOF
```

gawk 程序檔案如下。

```bash {frame="none"}
cat <<'EOF' > test.gawk
BEGIN {
    ts=systime()
    print ts
    print random(ts, 10)
}
EOF
```

使用 -f 選項引用兩個文件。

```bash {frame="none"}
gawk -f funclib.gawk -f test.gawk
```

引用函數庫就唔可以用內聯程序模式，都需要引用。

## 其他例子

### 自定義變量

支持數學運算同浮點數，呢個唔比 bash 強 🤪。

```bash {frame="none"}
gawk 'BEGIN{a=2; a=a*2/3; print a}'
```

```txt {frame="none"}
1.33333
```

### 數組操作

特點：關聯數組，好似字典，無序。

```bash {frame="none"}
gawk 'BEGIN{arr["name"]="foo"; print arr["name"]}'
```

可以用數字下標，其實都係字典。

```bash {frame="none"}
gawk 'BEGIN{arr[3]="foo"; print arr[3]}'
```

遍歷陣列，刪除元素。

```bash {frame="none"}
gawk 'BEGIN{
arr["a"]=1
arr[2]=2
arr["c"]="cat"
delete arr[2]
for (k in arr) {
    print "key:",k," val:", arr[k]
}
}
'
```

```txt {frame="none"}
key: a  val: 1
key: c  val: cat
```

### 格式化打印

處理浮點數。

```bash {frame="none"}
gawk 'BEGIN{printf "%.2f\n", 2/3}'
```

```txt {frame="none"}
0.67
```

指定闊度。

```bash {frame="none"}
echo -e 'foo\nfoobar' | gawk '{printf "%8s\n", $1}'
```

左靠齊。

```bash {frame="none"}
echo -e 'foo\nfoobar' | gawk '{printf "%-8s\n", $1}'
```
