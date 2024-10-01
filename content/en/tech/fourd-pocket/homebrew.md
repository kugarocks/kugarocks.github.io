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

## Chinese Source

### Main Repository

```bash {frame="none"}
cd $(brew --repo) && git remote -v
```

```bash {frame="none"}
origin https://github.com/Homebrew/brew.git (fetch)
origin https://github.com/Homebrew/brew.git (push)
```

### Core Repository

```bash {frame="none"}
cd $(brew --repo homebrew/core) && git remote -v
```

```bash {frame="none"}
origin https://github.com/Homebrew/homebrew-core.git (fetch)
origin https://github.com/Homebrew/homebrew-core.git (push)
```

### Aliyun Mirror

```bash {frame="none"}
git -C "$(brew --repo)" remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git
```

```bash {frame="none"}
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git
```

```bash {frame="none"}
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles
```

### USTC Mirror

```bash {frame="none"}
git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git
```

```bash {frame="none"}
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
```

```bash {frame="none"}
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles
```

### Tsinghua University Mirror

```bash {frame="none"}
git -C "$(brew --repo)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
```

```bash {frame="none"}
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
```

```bash {frame="none"}
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles
```

### Verify Source

After completing the source change operation, you can execute the following command to verify whether the source configuration is successful.

```bash {frame="none"}
brew update
```

```bash {frame="none"}
brew config | grep -E 'ORIGIN|BOTTLE'
```

With the `brew config` command, you can check the current repository source and Bottle source.

### Common Errors

If the `homebrew/core` directory does not exist, you can use the following command to check.

```bash {frame="none"}
brew tap
```

If there is no output for `homebrew/core`, you can use the following command to force installation.

```bash {frame="none"}
brew tap --force homebrew/core
```
