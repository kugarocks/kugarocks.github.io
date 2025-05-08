# Shell 简介

Shell 是一个命令行解释器，可以让你和操作系统交互，是真正执行命令的程序。

## GNU Bash Manual

Bash 是 Linux 中的默认 Shell，**官方手册是永远的神**。

::: info Bash Reference Manual
https://www.gnu.org/software/bash/manual/bash.html
:::

## Shell 的定义

在 Linux 中，Shell 是一个**命令解释器（软件程序）**，负责接收用户输入的命令并将其传递给操作系统内核执行。
Shell 提供了一种用户与操作系统交互的接口，是操作系统的最外层。
另外它还支持编程，包括变量、循环、条件判断等，这也是我们常常所说的 Shell 脚本。
常见的 Shell 按时间排序有以下几种：

| Shell | 描述 |
| --- | --- |
| **Sh** | Bourne Shell，最早期的 Shell，作者是 Stephen Bourne。 |
| **Bash** | Bourne Again Shell，Linux 最常用的 Shell，由 GNU 开发。 |
| **Dash** | Debian Almquist Shell，常见于 Ubuntu。 |
| **Zsh** | Z Shell，功能更强大，macOS 默认 Shell。 |

## 与终端的关系

我们现在所说的终端一般是指终端模拟器，常见的有 GNOME Terminal、iTerm2 等等。
终端提供了一个界面，用户可以通过该界面与 Shell 进行交互。
终端不执行任何命令，它只是负责接收输入并显示输出。
Shell 是在终端中运行的进程，负责实际的命令解释和执行工作。
不要混淆终端和 Shell 的概念，例如下面的对话内容是不准确的。

> A：你平时用什么 Shell
>
> B：我用 iTerm2
>
> A：打开 Shell，然后输入...

iTerm2 不是 Shell，是终端，另外 Shell 是不需要打开的，终端打开的时候就会默认启动。

## 不同 Shell 的区别

### 历史和起源

* `sh` 是 Unix 系统的原始 Shell，提供基本功能。
* `bash` 是 `sh` 的增强版，功能更加丰富，是 Linux 上的主流 Shell。
* `zsh` 是一种功能更强大且可高度定制的 Shell，结合了多个 Shell 的优势。

### 功能性

* `sh` 提供基础的命令和脚本执行功能，主要用于简单脚本和系统任务。
* `bash` 增加了交互式功能（如命令历史、补全），适合日常使用和复杂的脚本编写。
* `zsh` 拥有最丰富的功能，特别是在自动补全、命令行提示、语法高亮等方面。

### 交互体验

* `sh` 的交互体验较为基础，没有现代化的功能。
* `bash` 提供了丰富的命令行交互体验，支持命令补全、历史等。
* `zsh` 在交互体验上更进一步，支持更高级的补全、自动建议和错误更正。

### 定制化

* `sh` 几乎没有定制化选项。
* `bash` 支持一些定制化，但相比 `zsh` 仍然有限。
* `zsh` 可以通过框架（如 Oh My Zsh）轻松定制，支持插件、主题等。
