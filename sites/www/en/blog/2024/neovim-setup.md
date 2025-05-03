---
labels: ["neovim"]
---

# Neovim Setup

## Installation

You can download the binary from the [GitHub Release](https://github.com/neovim/neovim/releases) page and set the environment variable:

```bash {frame="none"}
export PATH="$HOME/neovim/bin:$PATH"
```

Installing via Homebrew requires downloading dependencies and compiling, which is slower and only supports certain versions:

```bash {frame="none"}
brew install neovim
```

## Plugin Management

It is recommended to use `lazy.nvim`:

* [lazy.nvim](https://github.com/folke/lazy.nvim): Neovim-specific, fast startup, lazy loading, written in Lua.
* [vim-plug](https://github.com/junegunn/vim-plug): Universal for Vim/Neovim, long-standing, written in Vimscript.
* [packer.nvim](https://github.com/wbthomason/packer.nvim): No longer maintained (as of August 2023).

## lazy.nvim

[Official Installation Guide](https://lazy.folke.io/installation)

### Configuration Directory

```txt {frame="none"}
~/.config/nvim
```
### Structured Configuration

You can create plugin configuration files under `~/.config/nvim/lua/plugins/`:

```txt {title="Directory Structure"}
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

::: warning
The `lazyrepo` below refers to the GitHub repository; if your network is inaccessible, you can [use a proxy](#using-a-proxy).
:::

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

-- Make sure to set up `mapleader` and `maplocalleader` before
-- loading lazy.nvim so that mappings are correct.
-- This is also a good place to set other options (vim.opt).
vim.g.mapleader = " "
vim.g.maplocalleader = "\\"

-- Setup lazy.nvim
require("lazy").setup({
  spec = {
    -- import your plugins
    { import = "plugins" },
  },
  -- colorscheme to use when installing plugins
  install = { colorscheme = { "habamax" } },
  -- automatically check for plugin updates
  checker = { enabled = true },
})
```

### Automation Script

```bash {frame="none"}
bash init.sh
```

```bash {title="init.sh"}
#!/usr/bin/env bash

# Create directories
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

# Set leaders
vim.g.mapleader = " "
vim.g.maplocalleader = "\\"

# Setup lazy.nvim
require("lazy").setup({
  spec = {
    { import = "plugins" },
  },
  install = { colorscheme = { "habamax" } },
  checker = { enabled = true },
})
EOL

echo "Init ~/.config/nvim/ done"
```

## nvim-tree

Create `nvim-tree.lua` under `~/.config/nvim/lua/plugins/`:

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

Open Neovim, and dependencies will be automatically fetched; you can also manually pull them:

```bash {frame="none"}
:Lazy sync
```

### Using a Proxy

If your network is inaccessible, you can use a proxy:

```bash {frame="none"}
git config --global url."https://mirror.ghproxy.com/https://github.com/".insteadof https://github.com/
```

View proxy configuration:

```bash {frame="none"}
git config --global --get-regexp url
```

Remove the proxy; you can also delete it in `~/.gitconfig`:

```bash {frame="none"}
git config --global --unset url."https://mirror.ghproxy.com/https://github.com/"
```

### Opening the File Tree

```bash {frame="none"}
:NvimTreeToggle
```

Icons may not display correctly; you need to install a font and configure it in iTerm2.

### Installing Fonts

[Nerd Font](https://github.com/ryanoasis/nerd-fonts)

```bash {frame="none"}
brew install font-hack-nerd-font
```

Configure the font in iTerm2:

* Open iTerm2.
* Go to Preferences > Profiles > Text.
* Check "Use a different font for non-ASCII text".
* Then select the Nerd Font you installed.

* `t` stands for terminal mode.
* `<esc>` stands for the new exit key.
* `<C-\\><C-n>` stands for the actual exit key.

## nvim-treesitter

```lua {title="nvim-treesitter.lua"}
return {
  "nvim-treesitter/nvim-treesitter",
  run = ":TSUpdate",
  config = function()
    require("nvim-treesitter.configs").setup {
      ensure_installed = "all", -- Install all parsers or specify a list
      highlight = {
        enable = true, -- Enable highlighting
      },
    }
  end,
}
```

## Monokai Theme

```lua {title="monokai.lua"}
return {
    "tanvirtin/monokai.nvim",
    config = function()
        local monokai = require('monokai')
        local palette = monokai.classic
        monokai.setup {
            palette = {
                base2 = "#000000",
            },
            custom_hlgroups = {
                LineNr = {
                    fg = "gray",
                },
            },
            italics = false
        }
        -- inform nvim-tree to load after monokai.nvim
        vim.api.nvim_exec_autocmds("User", { pattern = "MonokaiLoaded" })
    end
}
```

::: warning
`nvim-tree` must be loaded after `monokai.nvim`, otherwise icon colors may be incorrect.
:::

Listen for events to ensure `nvim-tree` loads after `monokai.nvim`:

```lua {title="nvim-tree.lua"}
return {
  "kyazdani42/nvim-tree.lua",
  dependencies = {
    "kyazdani42/nvim-web-devicons", -- icons dependency
  },
  event = "User MonokaiLoaded",
  config = function()
    require("nvim-tree").setup {
      renderer = {
        icons = {
          show = {
            file = true,
            folder = true,
            git = true,
          },
        },
      },
      filters = {
        dotfiles = true, -- hide hidden files if false, show if true
      },
    }
  end
}
```

## Language Server Protocol

`gopls` is the Go language server protocol implementation.

```bash {frame="none"}
go install golang.org/x/tools/gopls@latest
```

```bash {title="nvim-lspconfig.lua"}
return {
  "neovim/nvim-lspconfig",
  config = function()
    local lspconfig = require("lspconfig")
    lspconfig.gopls.setup {
      settings = {
        gopls = {
          staticcheck = true,
          usePlaceholders = true,
          analyses = {
            unusedparams = true,
            unreachable = true,
          },
        },
      },
      on_attach = function(client, bufnr)
        vim.fn.sign_define("DiagnosticSignError", { text = "", texthl = "" })
        vim.fn.sign_define("DiagnosticSignWarn", { text = "", texthl = "" })
        vim.fn.sign_define("DiagnosticSignInfo", { text = "", texthl = "" })
        vim.fn.sign_define("DiagnosticSignHint", { text = "", texthl = "" })
      end,
    }
  end,
}
```

`DiagnosticSignError` is set to empty to prevent the `E` symbol from appearing on the left of line numbers, which may cause layout shifts.

## Auto Completion

`nvim-cmp` is the auto-completion plugin for Neovim.

```lua {title="nvim-cmp.lua"}
return {
  "hrsh7th/nvim-cmp",
  dependencies = {
    "hrsh7th/cmp-nvim-lsp",   -- LSP source for nvim-cmp
    "hrsh7th/cmp-buffer",      -- Buffer completion source
    "hrsh7th/cmp-path",        -- Path completion source
    "hrsh7th/cmp-cmdline",     -- Cmdline completion source
    "hrsh7th/vim-vsnip",       -- Snippet engine
  },
  config = function()
    local cmp = require("cmp")
    cmp.setup({
      snippet = {
        expand = function(args)
          vim.fn["vsnip#anonymous"](args.body) -- For vsnip users.
        end,
      },
      mapping = {
        ['<CR>'] = cmp.mapping.confirm({ select = true }),
        ["<C-j>"] = cmp.mapping.select_next_item(),
        ["<C-k>"] = cmp.mapping.select_prev_item(),
        -- ['<C-e>'] = cmp.mapping.complete(), -- trigger completion
      },
      sources = {
        { name = "nvim_lsp" },
        { name = "buffer" },
        { name = "path" },
      },
    })
  end,
}
```

## Common Keybindings

* Window navigation: `Ctrl+w+h/l`
* Go to directory: `Ctrl+]`
* Show hidden files: `Ctrl+h`
* Create a file: `a` + filename (use `/` to denote directories)
* Cut a file: `x`
* Paste a file: `p`
* Delete a file: `d` + `y`
* Open a terminal: `:term`
* List buffers: `:ls`
* Switch buffer: `:b [num]`
* Horizontal split: `Ctrl+v`, panes labeled `a`/`b`
* Vertical split: `Ctrl+x`, panes labeled `a`/`b`
* Suspend process: `Ctrl+z`
* Resume process: `fg`

## Exiting Terminal Insert Mode

Add the following to your `init.lua`:

```lua {frame="none"}
vim.keymap.set('t', '<esc>', [[<C-\\><C-n>]])
```
