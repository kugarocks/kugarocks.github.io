---
title: "文件系统"
description: ""
summary: ""
date: 2024-08-30T20:00:00+08:00
lastmod: 2024-08-30T20:00:00+08:00
weight: 3000
seo:
  title: "文件系统"
  description: ""
  canonical: ""
  noindex: false
---

## 文件系统类型

可使用 df 命令的 `-T` 选项查看 Type 字段。

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

最常用的 Linux 文件系统，兼具稳定性和性能。

* 最大文件 2 TB。
* 最大分区 32 TB。
* 默认日志模式是[有序模式（Order）](di-ba-zhang-wen-jian-xi-tong.md#order-you-xu-mo-shi)。
* 支持多种日志模式。

### VFAT

Linux 对 FAT 文件系统的支持，常用于与 Windows 系统共享数据。

### TMPFS

基于内存的虚拟文件系统，读写快。

## 文件元数据 - inode

在 ext 文件系统中，元数据使用 inode 存储。

### 使用 ls -i` 查看

```bash {frame="none"}
ls -i foo
```

```bash {frame="none"}
791470 foo
```

会输出 foo 文件的 inode 编号。

### 使用 stat 命令

显示文件的详细信息。

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

### inode 的使用情况

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

新建文件会消耗一个 inode，例如下面的命令。

```bash {frame="none"}
touch foobar
```

```bash {frame="none"}
/dev/vda3      2608144 100370 2507774    4% /
```

可以看到 `/dev/vda3` 的 IFree 减 1 了。如果 inode 用完，就不能新建文件了。

## 日志模式类型

文件系统一般分为 3 种日志模式：

* Writeback：回写模式。
* Ordered：有序模式。
* Journal：完全日志模式。

### Writeback - 回写模式

* **特性**：文件系统只记录元数据的日志，实际的数据写入操作和元数据的更新是异步进行的。也就是说，数据可能在元数据之前写入磁盘，或者在元数据之后写入。

* **优点**：性能较高，因为数据写入的顺序不受严格限制。

* **缺点**：由于数据和元数据之间的写入顺序可能不一致，如果系统崩溃，可能会导致元数据和数据不一致，进而出现数据损坏的风险。

### Order - 有序模式

* **特性**：文件系统确保所有的数据块在元数据更新之前被写入磁盘。换句话说，数据的写入必须在元数据更新前完成。

* **优点**：比回写模式安全得多，因为它减少了数据与元数据不一致的风险，同时保持了较好的性能。

* **缺点**：性能稍低于回写模式，但仍然是很多场景下的良好平衡点。

### Journal - 完全日志模式

* **特性**：文件系统不仅记录元数据的日志，还记录数据本身的日志。所有的数据和元数据在实际写入磁盘之前，都会先记录到日志中。

* **优点**：这种模式提供了最高的安全性，因为在任何时候，数据和元数据都可以从日志中恢复，即使系统崩溃，文件系统仍然可以保证数据的完整性。

* **缺点**：性能较低，因为每次写入都要进行两次写操作（一次写日志，一次写实际数据）。
