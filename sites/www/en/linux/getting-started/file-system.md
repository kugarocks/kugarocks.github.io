## File System Types

You can use the `-T` option of the `df` command to view the Type field.

```bash
df -Th
```

```bash
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

The most commonly used Linux file system, which combines stability and performance.

* Maximum file size is 2 TB.
* Maximum partition size is 32 TB.
* The default logging mode is [Ordered Mode](di-ba-zhang-wen-jian-xi-tong.md#order-you-xu-mo-shi).
* Supports multiple logging modes.

### Vfat

Linux support for the FAT file system, commonly used for data sharing with Windows systems.

### Tmpfs

A virtual file system based on memory, with fast read and write capabilities.

## File Metadata - Inode

In the ext file system, metadata is stored using inode.

### Using `ls -i` to View

```bash
ls -i foo
```

```bash
791470 foo
```

This will output the inode number of the foo file.

### Using the `stat` Command

Displays detailed information about the file.

```bash
stat foo
```

```bash
  File: foo
  Size: 0            Blocks: 0          IO Block: 4096   regular empty file
Device: fc03h/64515d Inode: 791470      Links: 1
Access: (0664/-rw-rw-r--)  Uid: ( 1000/    kuga)   Gid: ( 1000/    kuga)
Access: 2024-08-29 16:18:20.603296561 +0800
Modify: 2024-08-29 16:18:20.603296561 +0800
Change: 2024-08-29 16:38:49.498144965 +0800
 Birth: 2024-08-29 16:18:20.603296561 +0800
```

### Inode Usage

```bash
df -i
```

```bash
Filesystem      Inodes  IUsed   IFree IUse% Mounted on
tmpfs           214148    736  213412    1% /run
/dev/vda3      2608144 100369 2507775    4% /
tmpfs           214148      2  214146    1% /dev/shm
tmpfs           214148      3  214145    1% /run/lock
/dev/vda2            0      0       0     - /boot/efi
tmpfs            42829     25   42804    1% /run/user/1000
tmpfs            42829     26   42803    1% /run/user/0
```

Creating a new file consumes an inode, as shown in the following command.

```bash
touch foobar
```

```bash
/dev/vda3      2608144 100370 2507774     4% /
```

As can be seen, the IFree of `/dev/vda3` has decreased by 1. If all inodes are used up, no new files can be created.

## Log Mode Types

File systems are generally divided into 3 types of log modes:

* Writeback: Writeback mode.
* Ordered: Ordered mode.
* Journal: Full journal mode.

### Writeback - Writeback Mode

* **Features**: The file system only logs metadata, and the actual data write operations and metadata updates are performed asynchronously. That is, data may be written to the disk before or after metadata.

* **Advantages**: Higher performance, as the order of data writes is not strictly limited.

* **Disadvantages**: Due to the possible inconsistency in the write order between data and metadata, if the system crashes, it may lead to inconsistencies between metadata and data, resulting in the risk of data corruption.

### Order - Ordered Mode

* **Features**: The file system ensures that all data blocks are written to the disk before the metadata is updated. In other words, the write of data must be completed before the metadata is updated.

* **Advantages**: Much safer than writeback mode, as it reduces the risk of data and metadata inconsistencies, while maintaining good performance.

* **Disadvantages**: Slightly lower performance than writeback mode, but still a good balance point for many scenarios.

### Journal - Full Journal Mode

* **Features**: The file system not only logs metadata but also logs the data itself. All data and metadata are logged to the journal before being written to the disk.

* **Advantages**: This mode provides the highest security, as data and metadata can always be recovered from the journal, ensuring data integrity even if the system crashes.

* **Disadvantages**: Lower performance, as each write requires two write operations (one to the journal and one to the actual data).
