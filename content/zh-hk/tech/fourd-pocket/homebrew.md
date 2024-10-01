---
title: "Homebrew"
description: ""
summary: ""
date: 2024-08-22T00:00:00+08:00
lastmod: 2024-09-08T00:00:00+08:00
weight: 400
seo:
  title: "Homebrew"
  description: ""
  canonical: ""
  noindex: false
---

## 更換國內源

### 主倉庫配置

```bash {frame="none"}
cd $(brew --repo) && git remote -v
```

```bash {frame="none"}
origin https://github.com/Homebrew/brew.git (fetch)
origin https://github.com/Homebrew/brew.git (push)
```

### 核心倉庫配置

```bash {frame="none"}
cd $(brew --repo homebrew/core) && git remote -v
```

```bash {frame="none"}
origin https://github.com/Homebrew/homebrew-core.git (fetch)
origin https://github.com/Homebrew/homebrew-core.git (push)
```

### 阿里雲鏡像

```bash {frame="none"}
git -C "$(brew --repo)" remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
```

```bash {frame="none"}
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
```

```bash {frame="none"}
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles
```

### 中科大鏡像

```bash {frame="none"}
git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git
```

```bash {frame="none"}
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
```

```bash {frame="none"}
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles
```

### 清華大學鏡像

```bash {frame="none"}
git -C "$(brew --repo)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
```

```bash {frame="none"}
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
```

```bash {frame="none"}
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles
```

### 驗證源配置

完成更換源操作後__AB__可以執行以下命令驗證源配置是否成功。

```bash {frame="none"}
brew update
```

```bash {frame="none"}
brew config | grep -E 'ORIGIN|BOTTLE'
```

通過 `brew config` 命令__AB__你可以檢查當前使用嘅倉庫源同 Bottle 源。

### 常見報錯

如果報 `homebrew/core` 目錄唔存在__AB__可以使用以下命令檢查。

```bash {frame="none"}
brew tap
```

如果冇輸出 `homebrew/core`__AB__可以使用以下命令強制安裝。

```bash {frame="none"}
brew tap --force homebrew/core
```
