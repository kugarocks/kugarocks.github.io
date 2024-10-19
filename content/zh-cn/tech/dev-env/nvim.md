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
下面的 lazyrepo 是 GitHub 仓库，网络不通时可[使用代理](#使用代理)。
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
  dependencies = {
    "kyazdani42/nvim-web-devicons", -- file icon dependency
  },
  config = function()
    require("nvim-tree").setup {}
  end
}
```

进入 `nvim`，会自动拉取依赖，也可手动拉取。

```bash {frame="none"}
:Lazy sync
```

### 使用代理

网络不通时，可使用代理。

```bash {frame="none"}
git config --global url."https://mirror.ghproxy.com/https://github.com/".insteadof https://github.com/
```

查看代理配置。

```bash {frame="none"}
git config --global --get-regexp url
```

删除代理，也可以在 `~/.gitconfig` 中删除。

```bash {frame="none"}
git config --global --unset url.https://mirror.ghproxy.com/https://github.com/
```

### 打开文件树

```bash {frame="none"}
:NvimTreeToggle
```

图标显示不正常，需要安装字体，并在 `iTerm2` 中设置字体。

### 安装字体

{{< link-card
  title="Nerd Font"
  href="https://github.com/ryanoasis/nerd-fonts"
  target="_blank"
>}}

```bash {frame="none"}
brew install font-hack-nerd-font
```

配置 `iTerm2` 字体。

* 打开 `iTerm2`。
* 进入 `Preferences > Profiles > Text`。
* 勾选 `Use a different font for non-ASCII text`。
* 然后选择你安装的 Nerd Font。

## 常用快捷键

* 转换窗口：`Ctrl+w+h/l`
* 进入目录：`Ctrl+]`
* 新建文件：`a` + 文件名，带 `/` 表示目录。
* 删除文件：`d` + `y`。
* 新建终端：`:term`。
* 缓冲列表：`:ls`。
* 切换缓冲：`:b [num]`。

## 退出终端的插入模式

在 `init.lua` 中添加。

```lua {frame="none"}
vim.keymap.set('t', '<esc>', [[<C-\><C-n>]])
```

* `t` 表示终端模式。
* `<esc>` 表示新的退出键。
* `<C-\><C-n>` 表示实际的退出键。
