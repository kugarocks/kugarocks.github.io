# 组管理

## 用户和组的关系

### 主组 - Primary Group

创建用户的时候，会同时创建一个同名组，这个就是主组。

```bash
grep soda /etc/passwd
```

```bash
soda:x:1001:1001:,,,:/home/soda:/bin/bash
```

第 4 个字段表示主组 ID 1001，还可以使用 groups 命令查看。

```bash
groups soda
```

```bash
soda : soda
```

### 附加组 - Secondary Groups

用户还可以属于多个附加组，用于权限的访问控制。

### ID 指令

查看用户组信息最实用的命令。

```bash
id soda
```

```bash
uid=1001(soda) gid=1001(soda) groups=1001(soda)
```

`gid` 表示主组，`groups` 表示附加组。

## /etc/group

组的配置文件，使用命令修改，不要手动编辑，不然改错就寄了。

```bash
-rw-r--r-- 1 root root 886 Aug 28 21:00 /etc/group
```

### 组信息

查看 sudo 组的信息

```bash
grep sudo /etc/group
```

```bash
sudo:x:27:kuga
```

* 组名：sudo
* 密码：x
* 组ID：27
* 成员：kuga

组成员有多个时，以逗号分隔：`kuga,soda`。

### 新建组

```bash
sudo groupadd rocks
```

```bash
grep rocks /etc/group
```

```bash
rocks:x:1002:
```

### 修改组名

```bash
sudo groupmod -n newrocks rocks
```

## 用户分配组

### 保留附加组

此方法不会覆盖附加组列表。

```bash
sudo usermod -aG rocks soda
```

```bash
id soda
```

```bash
... groups=1001(soda),1002(rocks)
```

### 覆盖附加组

去掉 `-a` (append) 选项会覆盖整个符加组列表。

```bash
sudo usermod -G sudo soda
```

```bash
id soda
```

```bash
... groups=1001(soda),27(sudo)
```

显然，soda 组不见了。

### 删除附加组

删除 soda 用户的 sudo 附加组。

```bash
sudo gpasswd -d soda sudo
```

也可以使用覆盖的方式，只保留 soda 组。

```bash
sudo usermod -G soda soda
```
