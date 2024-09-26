---
title: "homebrew"
description: ""
summary: ""
date: 2024-08-22T00:00:00+08:00
lastmod: 2024-09-08T00:00:00+08:00
weight: 400
seo:
  title: "homebrew"
  description: ""
  canonical: ""
  noindex: false
---

## 更换国内源

### 主仓库的配置

```bash {frame="none"}
cd $(brew --repo) && git remote -v
```

```bash {frame="none"}
origin https://github.com/Homebrew/brew.git (fetch)
origin https://github.com/Homebrew/brew.git (push)
```

### 核心仓库的配置

```bash {frame="none"}
cd $(brew --repo homebrew/core) && git remote -v
```

```bash {frame="none"}
origin https://github.com/Homebrew/homebrew-core.git (fetch)
origin https://github.com/Homebrew/homebrew-core.git (push)
```

### 阿里云镜像

```bash {frame="none"}
git -C "$(brew --repo)" remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
```

```bash {frame="none"}
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
```

```bash {frame="none"}
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles
```

### 中科大镜像

```bash {frame="none"}
git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git
```

```bash {frame="none"}
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
```

```bash {frame="none"}
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles
```

### 清华大学镜像

```bash {frame="none"}
git -C "$(brew --repo)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
```

```bash {frame="none"}
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
```

```bash {frame="none"}
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles
```

### 验证源配置

完成更换源操作后，可执行以下命令验证源配置是否成功。

```bash {frame="none"}
brew update
```

```bash {frame="none"}
brew config | grep -E 'ORIGIN|BOTTLE'
```

通过 `brew config` 命令，你可以检查当前使用的仓库源和 Bottle 源。

### 常见报错

如果报 `homebrew/core` 目录不存在，可使用以下命令检查。

```bash {frame="none"}
brew tap
```

如果没有输出 `homebrew/core`，可使用以下命令强制安装。

```bash {frame="none"}
brew tap --force homebrew/core
```
