## Basic Concepts

A pipe can use the output of one command as the input of the next command,
represented by the symbol `|` in the command-line environment, which is a form of one-way communication between processes, implemented based on file descriptors.

## Working Principle

A pipe creates a memory buffer, and two processes (commands) communicate through this buffer.

### Creating a Pipe

When creating a pipe using `|`, the Shell calls `pipe()` to create the pipe, which includes two file descriptors.

* Write-end file descriptor: `A`.
* Read-end file descriptor: `B`.

### Command Connection

* Left command: Redirects the standard output (file descriptor `1`) to the write-end `A` of the pipe.
* Right command: Redirects the standard input (file descriptor `0`) to the read-end `B` of the pipe.

### Data Flow

* Real-time data transmission: The commands on both sides execute in parallel, without waiting for the previous command to finish.
* No temporary files: Data is transmitted in memory.
* Buffer size: Depends on the system.

## Buffer Size

```bash
cat /proc/sys/fs/pipe-max-size
```

```bash
1048576
```

## Limitations

* One-way communication: Two-way communication requires the use of other mechanisms, such as named pipes (FIFO) or sockets.
* Buffer size: If the buffer is full, the upstream command will pause.
