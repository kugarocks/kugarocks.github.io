---
title: "文件系統"
description: ""
summary: ""
date: 2024-08-30T20:00:00+08:00
lastmod: 2024-08-30T20:00:00+08:00
weight: 3000
seo:
  title: "文件系統"
  description: ""
  canonical: ""
  noindex: false
---

## 文件系統類型

可使用 df 命令的 `-T` 選項查看 Type 字段。

```bash {frame="none"}
df -Th
```

```bash {frame="none"}
Filesystem     Type   Size  Used Avail Use% Mounted on
tmpfs          tmpfs  168M  1.1M  167M   1% /run
/dev/vda3      ext4    40G  3.2G   35G   9% /
tmpfs          tmpfs  837M     0  837M   0% /dev/shm
tmpfs          tmpfs  5.0M     0  5.0M   0% /run/lock
/dev/vda2      vfat   197M  6.1M  191M   4% /boot/efi
tmpfs          tmpfs  168M  4.0K  168M   1% /run/user/1000
tmpfs          tmpfs  168M  4.0K  168M   1% /run/user/0
```

### EXT4

最常用的 Linux 文件系統__AB__兼具穩定性和性能。

* 最大文件 2 TB。
* 最大分區 32 TB。
* 默認日志模式是[有序模式（Order）](di-ba-zhang-wen-jian-xi-tong.md#order-you-xu-mo-shi)。
* 支持多種日志模式。

### VFAT

Linux 對 FAT 文件系統的支持__AB__常用於與 Windows 系統共享數據。

### TMPFS

基於內存的虛擬文件系統__AB__讀寫快。

## 文件元數據 - inode

在 ext 文件系統中__AB__元數據使用 inode 存儲。

### 使用 ls -i` 查看

```bash {frame="none"}
ls -i foo
```

```bash {frame="none"}
791470 foo
```

會輸出 foo 文件的 inode 編號。

### 使用 stat 命令

顯示文件的詳細信息。

```bash {frame="none"}
stat foo
```

```bash {frame="none"}
  File: foo
  Size: 0            Blocks: 0          IO Block: 4096   regular empty file
Device: fc03h/64515d Inode: 791470      Links: 1
Access: (0664/-rw-rw-r--)  Uid: ( 1000/    kuga)   Gid: ( 1000/    kuga)
Access: 2024-08-29 16:18:20.603296561 +0800
Modify: 2024-08-29 16:18:20.603296561 +0800
Change: 2024-08-29 16:38:49.498144965 +0800
 Birth: 2024-08-29 16:18:20.603296561 +0800
```

### inode 的使用情況

```bash {frame="none"}
df -i
```

```bash {frame="none"}
Filesystem      Inodes  IUsed   IFree IUse% Mounted on
tmpfs           214148    736  213412    1% /run
/dev/vda3      2608144 100369 2507775    4% /
tmpfs           214148      2  214146    1% /dev/shm
tmpfs           214148      3  214145    1% /run/lock
/dev/vda2            0      0       0     - /boot/efi
tmpfs            42829     25   42804    1% /run/user/1000
tmpfs            42829     26   42803    1% /run/user/0
```

新建文件會消耗一個 inode__AB__例如下面的命令。

```bash {frame="none"}
touch foobar
```

```bash {frame="none"}
/dev/vda3      2608144 100370 2507774    4% /
```

可以看到 `/dev/vda3` 的 IFree 減 1 了。如果 inode 用完__AB__就不能新建文件了。

## 日志模式類型

文件系統一般分為 3 種日志模式：

* Writeback：回寫模式。
* Ordered：有序模式。
* Journal：完全日志模式。

### Writeback - 回寫模式

* **特性**：文件系統只記錄元數據的日志__AB__實際的數據寫入操作和元數據的更新是異步進行的。也就是說__AB__數據可能在元數據之前寫入磁盤__AB__或者在元數據之後寫入。

* **優點**：性能較高__AB__因為數據寫入的順序不受嚴格限制。

* **缺點**：由於數據和元數據之間的寫入順序可能不一致__AB__如果系統崩潰__AB__可能會導致元數據和數據不一致__AB__進而出現數據損壞的風險。

### Order - 有序模式

* **特性**：文件系統確保所有的數據塊在元數據更新之前被寫入磁盤。換句話說__AB__數據的寫入必須在元數據更新前完成。

* **優點**：比回寫模式安全得多__AB__因為它減少了數據與元數據不一致的風險__AB__同時保持了較好的性能。

* **缺點**：性能稍低於回寫模式__AB__但仍然是很多場景下的良好平衡點。

### Journal - 完全日志模式

* **特性**：文件系統不單止記錄元數據的日志__AB__還記錄數據本身的日志。所有的數據和元數據在實際寫入磁盤之前__AB__都會先記錄到日志中。

* **優點**：這種模式提供了最高的安全性__AB__因為在任何時候__AB__數據和元數據都可以從日志中恢復__AB__即使系統崩潰__AB__文件系統仍然可以保證數據的完整性。

* **缺點**：性能較低__AB__因為每次寫入都要進行兩次寫操作（一次寫日志__AB__一次寫實際數據）。
