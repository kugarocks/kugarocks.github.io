---
title: "文件權限"
description: ""
summary: ""
date: 2024-08-27T20:00:00+08:00
lastmod: 2024-08-29T20:00:00+08:00
weight: 2300
seo:
  title: "文件權限"
  description: ""
  canonical: ""
  noindex: false
---

## 組成結構

```bash {frame="none"}
-rwxr-xr--
```

第一個字符表示文件嘅類型：

* **`-`**：文件，例如文本文件、二進制文件等。
* **`d`**：目錄。
* **`l`**：符號鏈接，Symbolic link (Soft link)。
* **`b`**：塊設備，例如硬盤、光盤等。
* **`c`**：字符設備，例如終端設備、鍵盤等。
* **`p`**：管道，進程間通信。
* **`s`**：套接字，網絡通信，進程間數據交換。

後面嘅字符 3 個為一組（r=可讀、w=可寫、x=可執行），分別對應：

| 類別 | 權限 | 描述 |
| --- | --- | --- |
| 擁有者 | `rwx` | 可讀/可寫/可執行 |
| 用戶組 | `r-x` | 可讀/不可寫/可執行 |
| 其他人 | `r--` | 可讀/不可寫/不可執行 |

## 目錄嘅可執行權限

同文件嘅可執行權限一樣，如果要對目錄進行操作，目錄亦必須有可執行權限。

```bash {frame="none"}
cd /home
```

```bash {frame="none"}
ls /home
```

如果冇可執行權限，上面嘅命令會執行失敗。

## Umask

創建一個文件或目錄時，系統會使用 `umask` 嘅值嚟計算文件嘅權限。

```bash {frame="none"}
umask
```

```bash {frame="none"}
0002
```

* 第一位：特殊模式，呢度唔展開。
* 第二位：Owner，擁有者。
* 第三位：Group，組。
* 第四位：Others，其他人。

### 全權限

* 新文件：`666`（默認唔需要執行權限）。
* 新目錄：`777`（目錄都需要執行權限）。

### 權限計算

權限 = 全權限 - umask

* 文件：`666` - `002` = `664`
* 目錄：`777` - `002` = `775`

umask 係掩碼，代表唔想授予嘅權限。

## chmod

修改文件權限嘅命令。

```bash {frame="none"}
chmod - change file mode bits
```

### 八進制模式

```bash {frame="none"}
chmod 755 file
```

```bash {frame="none"}
-rwxr-xr-x 1 kuga kuga   16 Aug 23 11:08 file
```

### 字符模式

`u` 代表用戶：畀用戶添加執行權限。

```bash {frame="none"}
chmod u+x file
```

`g` 代表組：畀組去掉寫權限。

```bash {frame="none"}
chmod g-w file
```

`o` 代表其他人：畀其他人添加讀權限。

```bash {frame="none"}
chmod o+r file
```

`a` 代表上面 3 個：畀所有人添加執行權限。

```bash {frame="none"}
chmod a+x file
```

## chown

修改文件嘅擁有者同組。

```bash {frame="none"}
chown - change file owner and group
```

### 更改擁有者

```bash {frame="none"}
chown user file
```

### 遞歸更改擁有者

```bash {frame="none"}
chown -R user dir
```

### 更改擁有者同組

```bash {frame="none"}
chown user:group file
```

### 遞歸更改擁有者同組

```bash {frame="none"}
chown -R user:group dir
```

### 只更改組

```bash {frame="none"}
chown :group file
```

## chgrp

```bash {frame="none"}
chgrp - change group ownership
```

```bash {frame="none"}
chgrp group file
```
