---
title: "Shell 基本操作"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 600
seo:
  title: "Shell 基本操作"
  description: ""
  canonical: ""
  noindex: false
---

## 查看終端默認嘅 Shell

```bash {frame="none"}
echo $SHELL
```

```bash {frame="none"}
/bin/bash
```

如果你喺當前終端中啟動咗一個新嘅 Shell（例如從 Bash 切換到 Zsh），
呢個命令顯示嘅仍然係默認嘅登錄 Shell，呢個配置係存放喺 `/etc/passwd` 裡面嘅。

```bash {frame="none"}
grep root /etc/passwd
```

```bash {frame="none"}
root:x:0:0:root:/root:/bin/bash
```

喺 macOS 中，默認嘅 Shell 信息通常係存儲喺用戶賬戶設置中嘅，而唔係 `/etc/passwd` 文件中。
從 macOS Catalina（10.15）開始，默認嘅 shell 已更改為 `zsh`，之前嘅默認 Shell 係 `bash`。
可以通過以下方法查看默認 shell。

```bash {frame="none"}
dscl . -read /Users/$(whoami) UserShell
```

```bash {frame="none"}
UserShell: /bin/zsh
```

## 查看緊運行嘅 Shell

`$0` 喺 Shell 中運行返回 Shell 名稱，喺腳本中運行返回腳本名稱/路徑。

```bash {frame="none"}
echo $0
```

```bash {frame="none"}
-bash
```

**前面嘅連字符 `-` 表示該 Shell 係用戶嘅登錄 Shell。**

亦可以通過 `ps` 命令查看進程狀態。

```bash {frame="none"}
ps -p $$
```

```bash {frame="none"}
    PID TTY          TIME CMD
  17216 pts/0    00:00:00 bash
```

如果你喺當前終端中啟動咗一個新嘅 Shell（從 Bash 切換到 Sh），上面嘅兩種方法會顯示 `sh`。

## 查看支持嘅 Shell

```bash {frame="none"}
cat /etc/shells
```

```bash {frame="none"}
# /etc/shells: valid login shells
/bin/sh
/bin/bash
/usr/bin/bash
/bin/rbash
/usr/bin/rbash
/usr/bin/sh
/bin/dash
/usr/bin/dash
/usr/bin/tmux
/usr/bin/screen
```

## 修改默認嘅 Shell

修改成功後，`/etc/passwd` 中嘅內容會隨之更新。

### chsh

修改當前用戶嘅登錄 Shell 會要求輸入用戶密碼。

```bash {frame="none"}
chsh -s /bin/bash
```

使用 root 用戶或者 sudo 仲可以修改其他用戶嘅登錄 Shell。

```bash {frame="none"}
sudo chsh -s /bin/bash kuga
```

**注意：如果我哋輸入一個唔存在嘅 Shell。**

```bash {frame="none"}
chsh -s /bin/foo
```

```bash {frame="none"}
chsh: /bin/foo is an invalid shell
```

佢會檢查輸入嘅 Shell 係咪喺 `/etc/shells` 文件中，防止因為輸入咗唔合法嘅 Shell 而導致登錄失敗。

### usermod

使用呢個命令需要 root 用戶或者擁有 sudo 權限嘅用戶。

```bash {frame="none"}
sudo usermod -s /bin/dash kuga
```

{{< callout context="caution" title="注意" >}}
usermod 唔會檢查 Shell 嘅合法性，唔建議使用。
{{< /callout >}}

```bash {frame="none"}
sudo usermod -s /bin/notexist kuga
```

上面嘅命令唔會報錯，但會導致 kuga 用戶無法登錄。

### 添加 sudo 權限

查看 sudo 組嘅成員列表。

```bash {frame="none"}
getent group sudo
```

畀用戶添加 sudo 組嘅權限，需要 root 執行。

```bash {frame="none"}
usermod -aG sudo username
```

## 唔好直接編輯 passwd

如果唔小心寫錯配置，好有可能會導致成個系統無法登錄。

## 盡量唔好使用 root

我就係唔小心把 root 嘅登錄 Shell 改成咗 zsh，
但 Ubuntu 並冇安裝 zsh，所以 root 就登唔上去。
好彩我另外一個用戶有 sudo 權限，仲可以正常登錄，
我先成功把 root 嘅 Shell 改返嚟。
如果運氣唔好，冇 sudo 權限嘅用戶，咁就麻煩咗。

```bash {frame="none"}
sudo chsh -s /bin/bash root
```
