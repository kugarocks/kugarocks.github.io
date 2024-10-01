---
title: "MacOS 开发环境"
description: ""
summary: ""
date: 2024-07-24T00:00:00+08:00
lastmod: 2024-07-29T00:00:00+08:00
weight: 200
seo:
  title: "MacOS 开发环境"
  description: ""
  canonical: ""
  noindex: false
---

## Keyboard

System Preferences

* Key Repeat: Fast
* Delay Until Repeat: Short
* Modifier Keys: Caps Lock -> Escape

```bash {frame="none"}
defaults write -g ApplePressAndHoldEnabled -bool false
```

Shortcuts

* App Shortcuts, +
  * All Applications, Zoom, CMD+M
  * All Applications, Minimize, CMD+H
  * Chrome, Bookmark This Tab/Tab..., CMD+L
  * Chrome, Open Location..., CMD+D
  * Chrome, Downloads, SHIFT+CMD+D
* Input Sources
  * Select the previous input source, CMD+E
* Spotlight
  * Show Spotlight search: OPTION+SPACE
  * [Install Alfred](https://www.alfredapp.com/)

## iTerm2

{{< link-card
  title="iTerm2"
  description="Terminal emulator for macOS."
  href="https://iterm2.com/"
  target="_blank"
>}}

Preferences config

* Search -> Dim inactive split panes
* Search -> Global key bindings, +
  * Select Split Pane Above, CMD+I
  * Select Split Pane on Left, CMD+J
  * Select Split Pane Below, CMD+K
  * Select Split Pane on Right, CMD+L

## Oh My Zsh

Installation command

```bash {frame="none"}
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Custom Alias:

```bash {frame="none"}
# custom aliases
alias zsh='vim ~/.zshrc'
alias q='exit'
alias s='sudo'
alias v='vim'
alias g='git'
alias ga='git add'
alias gc='git checkout'
alias gs='git status'
alias gd='git diff'
alias sv='sudo vim'
alias sc="source ~/.zshrc"
alias ..='cd ..'
alias cls='clear'
alias nano="vim"
alias tailf="tail -f"
alias lf='ll -p | grep -v /'
alias ldir='ls -ld -- */'
```

## HSTR

{{< link-card
  title="HSTR"
  description="Easily view, navigate and search your command history."
  href="https://github.com/dvorka/hstr"
  target="_blank"
>}}

```bash {frame="none"}
brew install hstr
```

Configure HSTR just by running:

```bash {frame="none"}
hstr --show-zsh-configuration >> ~/.zshrc
```

## Git Config

Replace name, email, GitHub user.

```bash {frame="none"}
[user]
    name = kuga
    email = kuga@cestbon.mbp

[alias]
    pr = pull --rebase
    br = branch -avv
    ci = commit
    co = checkout
    cm = checkout master
    mg = merge
    st = status
    l = log --color --graph --pretty=format:'%Cred%h%Creset -%C(bold yellow)%d%Creset %s %Cgreen(%cd) %C(bold blue)<%an>%Creset' --abbrev-commit
    accept-ours = "!f() { files=\"$@\"; [ -z $files ] && files='.'; git checkout --ours -- $files; git add -u $files; }; f"
    accept-theirs = "!f() { files=\"$@\"; [ -z $files ] && files='.'; git checkout --theirs -- $files; git add -u $files; }; f"
    diffeol = diff --ignore-space-at-eol

[core]
    excludesfile = /Users/hairdresser/.gitignore

[color]
    branch = auto
    diff = auto
    status = auto

[GitHub]
    user = kuga

[credential]
    helper = osxkeychain

[pull]
    rebase = false
```

## Kubernetes

### kubectl

{{< link-card
  title="kubectl"
  description="The Kubernetes command-line tool."
  href="https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/"
  target="_blank"
>}}

```bash {frame="none"}
brew install kubectl
```

### kubectx

{{< link-card
  title="kubectx"
  description="Switch between contexts & namespaces."
  href="https://github.com/ahmetb/kubectx"
  target="_blank"
>}}

```bash {frame="none"}
brew install kubectx
```

Add the following to your `.zshrc` file:

```bash {frame="none"}
# kubectx
alias kc="kubectx"
alias kn="kubens"

KUBECTX_CURRENT_FGCOLOR=$(tput setaf 6)
```

### kube-ps1

{{< link-card
  title="kube-ps1"
  description="Kubernetes prompt for bash and zsh."
  href="https://github.com/jonmosco/kube-ps1"
  target="_blank"
>}}

```bash {frame="none"}
brew install kube-ps1
```

Add the following to your `.zshrc` file:

```bash {frame="none"}
# kube-ps1
# https://github.com/jonmosco/kube-ps1
# todo change source path
source /usr/local/Cellar/kube-ps1/0.7.0/share/kube-ps1.sh
PROMPT='$(kube_ps1)'$PROMPT
KUBE_PS1_PREFIX="["
KUBE_PS1_SUFFIX="]"
KUBE_PS1_SYMBOL_ENABLE=false
KUBE_PS1_CTX_COLOR="83"
KUBE_PS1_NS_COLOR="201"
```

### kubectl-aliases

{{< link-card
  title="kubectl-aliases"
  description="Convenient shell aliases for kubectl."
  href="https://github.com/ahmetb/kubectl-aliases"
  target="_blank"
>}}

Download [.kubectl\_aliases](https://raw.githubusercontent.com/ahmetb/kubectl-aliases/master/.kubectl\_aliases) file & Add the following to your `.zshrc` file:

```bash {frame="none"}
# load kubectl aliases file
[ -f ~/.kubectl_aliases ] && source ~/.kubectl_aliases

# Print the full command before running it
function kubectl() { echo "+ kubectl $@">&2; command kubectl $@; }
```
