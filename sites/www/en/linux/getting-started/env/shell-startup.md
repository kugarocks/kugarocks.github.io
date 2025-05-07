# Shell Startup Process

## Startup Methods

The startup methods of Shell will affect the loading process of environment variables, which can be divided into the following categories.

* Interactive (Interactive)
  * Login: Shell instances started in login mode, such as SSH login.
  * Non-login:
    * Creating a new Shell instance by typing Bash in the Shell.
    * Opening a new terminal session in GNOME Terminal.
* Non-Interactive (Non-Interactive)
  * Shell instances started in scripts.

## Interactive Shell

::: info What is an Interactive Shell
https://www.gnu.org/software/bash/manual/bash.html#What-is-an-Interactive-Shell_003f
:::

```txt
An interactive shell is one started without non-option arguments (unless -s is specified) and without specifying the -c option, whose input and error output are both connected to terminals (as determined by isatty(3)), or one started with the -i option.

An interactive shell generally reads from and writes to a user’s terminal.

The -s invocation option may be used to set the positional parameters when an interactive shell is started.
```

```txt
An interactive shell is a shell that is started without non-option arguments (unless the -s option is specified) and without specifying the -c option, whose input and error output are both connected to terminals (as determined by isatty(3)), or a shell started with the -i option.

An interactive shell generally reads from and writes to a user’s terminal.

The -s invocation option can be used to set the positional parameters when an interactive shell is started.
```

## Interactive Login

In Ubuntu, the file loading process is roughly as follows when using SSH to login.

1. `/etc/profile`: **Entry File - A**, executed by all users.
2. `/etc/bash.bashrc`: Global environment configuration file, **A** loads this file.
3. `/etc/profile.d`: Global environment configuration directory, **A** loads all files in this directory.
4. `~/.profile`: User environment configuration entry file - **B**.
5. `~/.bashrc`: User environment configuration file, **B** loads this file.

rc(Run Commands), originating from Unix tradition.

### /etc/profile

`system-wide`: System-wide configuration file.

```bash
# /etc/profile: system-wide .profile file for the Bourne shell (sh(1))
# and Bourne compatible shells (bash(1), ksh(1), ash(1), ...).

# Check if the prompt variable PS1 is set
if [ "${PS1-}" ]; then
  # Check if the BASH variable is set and its value is not /bin/sh
  if [ "${BASH-}" ] && [ "$BASH" != "/bin/sh" ]; then
    # The file bash.bashrc already sets the default PS1.
    # PS1='\h:\w\$ '
    # If the bash.bashrc file exists, load it
    if [ -f /etc/bash.bashrc ]; then
      . /etc/bash.bashrc
    fi
  else
    # Is the current user's id equal to 0 (root)
    if [ "$(id -u)" -eq 0 ]; then
      # Set the prompt for root to #
      PS1='# '
    else
      # Set the prompt for ordinary users to $
      PS1='$ '
    fi
  fi
fi

# Check if the profile.d directory exists
if [ -d /etc/profile.d ]; then
  # Iterate through all sh files in the directory
  for i in /etc/profile.d/*.sh; do
    # If the file is readable, load it
    if [ -r $i ]; then
      . $i
    fi
  done
  unset i
fi
```

### /etc/bash.bashrc

The file content is a bit long, just look at a few lines of comments.

```bash
# System-wide .bashrc file for interactive bash(1) shells.

# To enable the settings / commands in this file for login shells as well,
# this file has to be sourced in /etc/profile.

# If not running interactively, don't do anything
[ -z "$PS1" ] && return
```

If not interactive (PS1 variable not set), exit directly.

### /etc/profile.d

Just take a look at the files in the directory.

```bash
ls -l /etc/profile.d
```

```bash
total 24
-rw-r--r-- 1 root root   96 Oct 15  2021 01-locale-fix.sh
-rw-r--r-- 1 root root  835 Apr  8  2022 apps-bin-path.sh
-rw-r--r-- 1 root root  726 Nov 16  2021 bash_completion.sh
-rw-r--r-- 1 root root 1107 Mar 23  2022 gawk.csh
-rw-r--r-- 1 root root  757 Mar 23  2022 gawk.sh
-rw-r--r-- 1 root root 1557 Feb 17  2020 Z97-byobu.sh
```

### ~/.profile

This file will load the `~/.bashrc` file we commonly use.

```bash
# ~/.profile: executed by the command interpreter for login shells.
# This file is not read by bash(1), if ~/.bash_profile or ~/.bash_login
# exists.
# see /usr/share/doc/bash/examples/startup-files for examples.
# the files are located in the bash-doc package.

# the default umask is set in /etc/profile; for setting the umask
# for ssh logins, install and configure the libpam-umask package.
#umask 022

# if running bash
if [ -n "$BASH_VERSION" ]; then
    # include .bashrc if it exists
    if [ -f "$HOME/.bashrc" ]; then
      . "$HOME/.bashrc"
    fi
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/bin" ] ; then
    PATH="$HOME/bin:$PATH"
fi

# set PATH so it includes user's private bin if it exists
if [ -d "$HOME/.local/bin" ] ; then
    PATH="$HOME/.local/bin:$PATH"
fi
```

Looking at the header comments, you can know that if `~/.bash_profile` and `~/.bash_login` exist, `~/.profile` will not be loaded, and the file loading order is as follows.

```bash
bash_profile > bash_login > profile
```

### ~/.bashrc

Let's analyze the header just below.

```bash
# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac
```

Looking at the first line of comments, this file is executed by non-login Shell.
As mentioned earlier, `~/.profile` also loads this file, which means both login and non-login Shell use this file.

Let's analyze these magical codes (it's really a genius design🤪):

```bash
# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac
```

`$-` is a special variable that represents the options enabled when the Shell runs, which can be printed out.

```bash
echo $-
```

```bash
himBHs
```

* `*i*` is a matching condition: whether `$-` contains `i`.
* `i` option indicates that the current Shell is interactive.
* If the match is successful, it will exit the case.
* If the match fails, it will execute return, exiting the script.

In summary: if not running interactively, exit directly, do nothing.

## Interactive Non-Login

Here we discuss non-login cases. For example:

* Creating a new Shell instance by typing Bash in the Shell.
* Subshell generated by executing command groups using `()`.
* Opening a new terminal session in GNOME Terminal.

One sentence summary: does not load `/etc/profile`, only loads `~/.bashrc`.

## Non-Interactive

This method does not have a command line prompt and does not load any configuration files, even if you manually load `~/.bashrc`, it will not take effect.
Because the analysis above mentions that in non-interactive mode, it will directly exit, do nothing.

```bash
# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac
```

Of course, you can use the BASH_ENV variable to set the file to load, as explained below.

```txt
If this variable is set when Bash is invoked to execute a shell script, its value is expanded and used as the name of a startup file to read before executing the script. See Bash Startup Files.
```

## Persistence of Env Vars

You only need to write the environment variables in the corresponding files, such as `~/.bashrc`.

```bash
echo 'export MY_VARIABLE="my_value"' >> ~/.bashrc
```

```bash
source ~/.bashrc
```
