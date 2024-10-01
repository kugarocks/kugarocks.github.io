---
title: "Shell Introduction"
description: ""
summary: ""
date: 2024-08-24T20:00:00+08:00
lastmod: 2024-08-27T20:00:00+08:00
weight: 400
seo:
  title: "Shell Introduction"
  description: ""
  canonical: ""
  noindex: false
---

## GNU Bash Manual

Bash is the default Shell in Linux, **the official manual is forever divine**.

{{< link-card
  title="Bash Reference Manual"
  description="gnu.org"
  href="https://www.gnu.org/software/bash/manual/bash.html"
  target="_blank"
>}}

## Definition of Shell

In Linux, Shell is a **command interpreter (software program)** that is responsible for receiving user input commands and passing them to the operating system kernel for execution.
Shell provides an interface for users to interact with the operating system, which is the outermost layer of the operating system.
Additionally, it supports programming, including variables, loops, conditional judgments, etc., which is also what we commonly call Shell scripts.
Common Shells in chronological order are as follows:

| Shell | Description |
| --- | --- |
| **Sh** | Bourne Shell, the earliest Shell, authored by Stephen Bourne. |
| **Bash** | Bourne Again Shell, the most commonly used Shell in Linux, developed by GNU. |
| **Dash** | Debian Almquist Shell, commonly seen in Ubuntu. |
| **Zsh** | Z Shell, with more powerful features, the default Shell on macOS. |

## Relationship with Terminal

The terminal we refer to now is generally a terminal emulator, such as GNOME Terminal, iTerm2, etc.
The terminal provides an interface where users can interact with Shell.
The terminal does not execute any commands; it only receives input and displays output.
Shell is a process running in the terminal, responsible for the actual command interpretation and execution work.
Do not confuse the terminal and Shell concepts, such as the following dialogue content is inaccurate.

> A: What Shell do you usually use?
>
> B: I use iTerm2
>
> A: Open Shell, then enter...

iTerm2 is not a Shell, it's a terminal, and Shell does not need to be opened; it will automatically start when the terminal is opened.

## Differences Between Shells

### History and Origin

* `sh` is the original Shell of Unix systems, providing basic functions.
* `bash` is an enhanced version of `sh`, with more features, and is the mainstream Shell on Linux.
* `zsh` is a Shell with even more powerful features, combining the advantages of multiple Shells.

### Functionality

* `sh` provides basic command and script execution functions, mainly used for simple scripts and system tasks.
* `bash` adds interactive features (such as command history, completion), suitable for daily use and complex script writing.
* `zsh` has the richest features, especially in automatic completion, command line prompts, and syntax highlighting.

### Interactive Experience

* `sh` has a basic interactive experience, without modern features.
* `bash` provides a rich command line interactive experience, supporting command completion, history, etc.
* `zsh` further enhances the interactive experience, supporting more advanced completion, automatic suggestions, and error correction.

### Customization

* `sh` has almost no customization options.
* `bash` supports some customization, but is still limited compared to `zsh`.
* `zsh` can be easily customized through frameworks (such as Oh My Zsh), supporting plugins, themes, etc.
