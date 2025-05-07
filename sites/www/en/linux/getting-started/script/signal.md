# Signal

## Bash Shell

By default, the Bash Shell ignores the `SIGQUIT(3)` and `SIGTERM(15)` signals,
so executing the following commands will not have any effect (`$$` is the process ID of the current Shell).

```bash
kill -3 $$
```

```bash
kill -15 $$
```

If the `SIGHUP(1)` signal is received, the Bash Shell will exit, but before exiting,
it will pass the `SIGHUP` signal to all processes and scripts started by that Shell.

```bash
kill -1 $$
```

## TRAP

The `trap` command can be used to catch signals.

```bash
trap commands signals
```

### Catch Signals

The `SIGINT` signal is the signal for `Ctrl+C`.

```bash
#!/usr/bin/env bash

trap "echo ' Trapped Ctrl-C'" SIGINT

count=1
while [ $count -le 5 ]
do
    echo "loop #$count"
    sleep 1
    count=$[ $count + 1 ]
done
```

```txt
loop #1
loop #2
^C Trapped Ctrl-C
loop #3
loop #4
^C Trapped Ctrl-C
loop #5
```

### Exit Signals

You can catch the signals when the script exits.

```bash
trap "echo ' Trapped Ctrl-C'" EXIT
```

### Remove Signals

Use `--` to remove signals.

```bash
trap -- SIGINT
```

## NOHUP

No Hang Up, processes or scripts started by this command will ignore the SIGHUP signal.
In other words, even if the terminal exits, the processes or scripts started by that terminal will not exit.

```txt
run a command immune to hangups, with output to a non-tty
```

```bash
nohup ./foo
```

By default, `STDOUT` and `STDERR` are redirected to `nohup.out`.

```bash
-rw------- 1 kuga kuga   40 Sep  2 18:46 nohup.out
```

It's better to redirect it yourself.

```bash
nohup ./foo > out.log 2>&1
```

```bash
-rw-rw-r-- 1 kuga kuga   62 Sep  2 18:50 out.log
```

## Nice Value

A parameter that controls the priority of a process. The higher the `nice` value, the lower the priority of the process, and the less CPU resources it is allocated.

### Range

The `nice` value ranges from `-20` to `19`:

* `-20`: Highest priority.
* `0`: Default priority.
* `19`: Lowest priority.

### Start Process Priority

```bash
nice -n VALUE command
```

```bash
nice -n 10 ./foo
```

### Modify Process Priority

```bash
renice VALUE -p PID
```

```bash
renice 5 -p 404
```

### Permissions

* Regular users can only lower the priority of a process.
* Only root users can raise the priority of a process.
