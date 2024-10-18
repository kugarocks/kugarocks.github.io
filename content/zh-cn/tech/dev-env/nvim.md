---
title: "nvim"
description: ""
summary: ""
date: 2024-10-18T21:00:00+08:00
lastmod: 2024-10-18T21:00:00+08:00
weight: 310
seo:
  title: "nvim"
  description: ""
  canonical: ""
  noindex: false
---

## 安装

可在 [GitHub Release](https://github.com/neovim/neovim/releases) 中下载二进制版本，并设置环境变量。

```bash {frame="none"}
export PATH="$HOME/neovim/bin:$PATH"
```

使用 Homebrew 安装需要下载依赖和编译，速度较慢，且只能下载部分版本。

```bash {frame="none"}
brew install neovim
```

## 插件管理

推荐使用 `lazy.nvim`。

* [lazy.nvim](https://github.com/folke/lazy.nvim)：Neovim 专用，启动快，延迟加载，使用 Lua 编写。
* [vim-plug](https://github.com/junegunn/vim-plug)：Vim/Neovim 通用，历史悠久，使用 Vimscript 编写。
* [packer.nvim](https://github.com/wbthomason/packer.nvim)：不再维护（2023 年 8 月）。

## lazy.nvim

{{< link-card
  title="官方安装文档"
  description="lazy.folke.io/installation"
  href="https://lazy.folke.io/installation"
  target="_blank"
>}}

### 配置目录

不同系统的配置目录如下。

{{< tabs "nvim-config-dir" >}}
{{< tab "macOS" >}}

```txt {frame="none"}
~/.config/nvim
```

{{< /tab >}}
{{< tab "Windows" >}}

```txt {frame="none"}
~\AppData\Local\nvim
```

{{< /tab >}}
{{< /tabs >}}

### 结构化配置

可在 `~/.config/nvim/lua/plugins/` 中创建插件的配置文件。

```txt {title="目录结构"}
~/.config/nvim
├── lua
│   ├── config
│   │   └── lazy.lua
│   └── plugins
│       ├── spec1.lua
│       ├── **
│       └── spec2.lua
└── init.lua
```

```lua {title="~/.config/nvim/init.lua"}
require("config.lazy")
```

{{< callout context="caution" title="注意" icon="outline/alert-octagon" >}}
下面的 lazyrepo 是 GitHub 仓库，网络不通时可手动下载，然后改为本地路径。
{{< /callout >}}

```lua {title="~/.config/nvim/lua/config/lazy.lua"}
-- Bootstrap lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  local lazyrepo = "https://github.com/folke/lazy.nvim.git"
  local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
  if vim.v.shell_error ~= 0 then
    vim.api.nvim_echo({
      { "Failed to clone lazy.nvim:\n", "ErrorMsg" },
      { out, "WarningMsg" },
      { "\nPress any key to exit..." },
    }, true, {})
    vim.fn.getchar()
    os.exit(1)
  end
end
vim.opt.rtp:prepend(lazypath)

-- Make sure to setup `mapleader` and `maplocalleader` before
-- loading lazy.nvim so that mappings are correct.
-- This is also a good place to setup other settings (vim.opt)
vim.g.mapleader = " "
vim.g.maplocalleader = "\\"

-- Setup lazy.nvim
require("lazy").setup({
  spec = {
    -- import your plugins
    { import = "plugins" },
  },
  -- Configure any other settings here. See the documentation for more details.
  -- colorscheme that will be used when installing plugins.
  install = { colorscheme = { "habamax" } },
  -- automatically check for plugin updates
  checker = { enabled = true },
})
```

### 自动化脚本

```bash {frame="none"}
bash init.sh
```

```bash {title="init.sh"}
#!/usr/bin/env bash

# create dir
mkdir -p ~/.config/nvim/lua/config
mkdir -p ~/.config/nvim/lua/plugins

# init.lua
cat <<'EOL' > ~/.config/nvim/init.lua
require("config.lazy")
EOL

# lazy.lua
cat <<'EOL' > ~/.config/nvim/lua/config/lazy.lua
-- Bootstrap lazy.nvim
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  local lazyrepo = "https://github.com/folke/lazy.nvim.git"
  local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
  if vim.v.shell_error ~= 0 then
    vim.api.nvim_echo({
      { "Failed to clone lazy.nvim:\n", "ErrorMsg" },
      { out, "WarningMsg" },
      { "\nPress any key to exit..." },
    }, true, {})
    vim.fn.getchar()
    os.exit(1)
  end
end
vim.opt.rtp:prepend(lazypath)

-- Make sure to setup `mapleader` and `maplocalleader` before
-- loading lazy.nvim so that mappings are correct.
-- This is also a good place to setup other settings (vim.opt)
vim.g.mapleader = " "
vim.g.maplocalleader = "\\"

-- Setup lazy.nvim
require("lazy").setup({
  spec = {
    -- import your plugins
    { import = "plugins" },
  },
  -- Configure any other settings here. See the documentation for more details.
  -- colorscheme that will be used when installing plugins.
  install = { colorscheme = { "habamax" } },
  -- automatically check for plugin updates
  checker = { enabled = true },
})
EOL

echo "Init ~/.config/nvim/ done"
```

## nvim-tree.lua

在 `~/.config/nvim/lua/plugins/` 创建 `nvim-tree.lua`。

```lua {title="nvim-tree.lua"}
return {
  "kyazdani42/nvim-tree.lua",
  requires = {
    "kyazdani42/nvim-web-devicons", -- 需要这个库以支持图标
  },
  config = function()
    require("nvim-tree").setup {}
  end
}
```

使用 `:NvimTreeToggle` 打开文件树。
