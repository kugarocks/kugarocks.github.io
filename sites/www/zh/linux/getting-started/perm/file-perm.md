# 文件权限

## 组成结构

```bash
-rwxr-xr--
```

第一个字符表示文件的类型：

* **`-`**：文件，如文本文件、二进制文件等。
* **`d`**：目录。
* **`l`**：符号链接，Symbolic link (Soft link)。
* **`b`**：块设备，如硬盘、光盘等。
* **`c`**：字符设备，如终端设备、键盘等。
* **`p`**：管道，进程间通信。
* **`s`**：套接字，网络通信，进程间数据交换。

后面的字符 3 个为一组（r=可读、w=可写、x=可执行），分别对应：

| 类别 | 权限 | 描述 |
| --- | --- | --- |
| 拥有者 | `rwx` | 可读/可写/可执行 |
| 用户组 | `r-x` | 可读/不可写/可执行 |
| 其它人 | `r--` | 可读/不可写/不可执行 |

## 目录的可执行权限

和文件的可执行权限一样，如果要对目录进行操作，目录也必须有可执行权限。

```bash
cd /home
```

```bash
ls /home
```

如果没有可执行权限，上面的命令会执行失败。

## Umask

创建一个文件或目录时，系统会使用 `umask` 的值来计算文件的权限。

```bash
umask
```

```bash
0002
```

* 第一位：特殊模式，这里不展开。
* 第二位：Owner，拥有者。
* 第三位：Group，组。
* 第四位：Others，其它人。

### 全权限

* 新文件：`666`（默认不需要执行权限）。
* 新目录：`777`（目录都需要执行权限）。

### 权限计算

权限 = 全权限 - umask

* 文件：`666` - `002` = `664`
* 目录：`777` - `002` = `775`

umask 是掩码，代表不想授予的权限。

## chmod

修改文件权限的命令。

```bash
chmod - change file mode bits
```

### 八进制模式

```bash
chmod 755 file
```

```bash
-rwxr-xr-x 1 kuga kuga   16 Aug 23 11:08 file
```

### 字符模式

`u` 代表用户：给用户添加执行权限。

```bash
chmod u+x file
```

`g` 代表组：给组去掉写权限。

```bash
chmod g-w file
```

`o` 代表其它人：给其他人添加读权限。

```bash
chmod g+r file
```

`a` 代表上面 3 个：给所有人添加执行权限。

```bash
chmod a+x file
```

## chown

修改文件的拥有者和组。

```bash
chown - change file owner and group
```

### 更改所有者

```bash
chown user file
```

### 递归更改所有者

```bash
chown -R user dir
```

### 更改所有者和组

```bash
chown user:group file
```

### 递归更改所有者和组

```bash
chown -R user:group dir
```

### 只更改组

```bash
chown :group file
```

## chgrp

```bash
chgrp - change group ownership
```

```bash
chgrp group file
```
