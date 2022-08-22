---
title: 第一章：理解网络编程和套接字
date: 2022-01-12
sidebar: auto
article: false
---

## 1.1 理解网络编程和套接字

### 接受连接请求的套接字创建过程：

1. 调用socket函数创建套接字；

```c++
#include <sys/socket.h>
int socket(int domain, int type, int protocal);
// 成功时返回文件描述符，失败时返回-1。
```

2. 调用bind函数分配IP地址和端口号；

```c++
#include <sys/socket.h>
int bind(int sockfd, struct sockaddr *myaddr, socklen_t addrlen);
// 成功时返回0，失败时返回-1。
```

3. 调用listen函数转为可接受请求状态；

```c++
#include <sys/socket.h>
int listen(int sockfd, int backlog);
// 成功时返回0，失败时返回-1。
```

4. 调用accept函数处理连接请求；

```c++
#include <sys/socket.h>
int accept(int sockfd, struct sockaddr *addr, socklen_t *addrlen);
// 成功时返回0，失败时返回-1。
```



### 发送连接请求的套接字创建过程：

1. 调用socket函数创建套接字（同上）；
2. 调用connect函数向服务器端发送连接请求；

```c++
#include <sys/socket.h>
int connect(int sockfd, struct sockaddr *serv_addr, socklen_t addrlen);
// 成功时返回0，失败时返回-1。
```



### 在Linux环境下运行

使用g++编译：

```shell
g++ ./<srource_file> -o <output_file>
```

例如：

```shell
g++ ./hello_server.cpp -o hello_server
g++ ./hello_client.cpp -o hello_client
```

运行（在两个终端中分别运行）：

```shell
./hello_server 9190
```

```shell
./hello_client 127.0.0.1 9190
```



## 1.2 基于Linux的文件操作

### 文件描述符（File Descriptor）

在Windows中被称为文件句柄，当生成文件时系统分配给文件的整数代号。在Linux系统中socket（套接字）也被认为是一种文件，所以socket在生成的时候会被分配一个文件描述符，Windows下不是一种文件所以有另外的处理方式。

| 系统保留的文件描述符 |           对象            |
| :------------------: | :-----------------------: |
|          0           | 标准输入：Standard Input  |
|          1           | 标准输出：Standard Output |
|          2           | 标准错误：Standard Error  |

基于此，在Linux中操作文件或Socket是通过对文件的描述符进行操作。

### 打开文件 open()

```c++
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

int open(const char *path, int flag);
```

成功时返回文件描述符，失败时返回-1。

-path：文件名的字符串地址；

-flag：文件打开模式信息；

| 打开模式 |       含义       |
| :------: | :--------------: |
| O_CREAT  |    必要时创建    |
| O_TRUNC  |   删除所有数据   |
| O_APPEND | 在文件后添加数据 |
| O_RDONLY |     只读打开     |
| O_WRONLY |     只写打开     |
|  O_RDWR  |     读写打开     |



### 关闭文件 close()

```c++
#include <unistd.h>

int close(int fd);
```

成功时返回0，失败时返回-1。

-fd：要关闭的文件；

文件使用后必须关闭，由于Linux系统中套接字也是一种文件，所以可以使用close关闭。



### 写入文件 write()

```c++
#include <unistd.h>

ssize_t write(int fd, const void *buf, size_t nbytes);
```

成功时返回写入的字节数，失败时返回-1。

-fd：数据传输对象的文件描述符；

-buf：要传输数据的缓冲内存地址值；

-nbytes：要传输数据字节数；



### 读取文件 read()

```c++
#include <unistd.h>

ssize_t read(int fd, void *buf, size_t nbytes);
```

成功时返回接收到的字节数（遇到文件尾返回0），失败时返回-1。

-fd：数据接收对象的文件描述符；

-buf：要保存数据的缓冲区内存地址；

-nbytes：要接受数据的最大字节数；



## 1.3 基于Windows平台的实现

1. 需要导入头文件 winsock2.h
2. 链接 ws2_32.lib 库



## 1.4 基于Windows的套接字



## 1.5 习题

1. 套接字在网络编程中的作用是什么？为何称为套接字？

> 套接字（Socket）原译为插座，指计算机通信的一种约定或方式。

2. 在服务器端创建套接字后，会一次调用listen函数和accept函数，比较并说明二者的作用。

> listen函数用于讲socket切换为监听状态，表示服务端准备好开始接收连接请求，accept函数用于接收客户端的连接请求并处理。

3. Linux中，对套接字数据进行I/O时可以直接使用文件I/O相关函数；而在Windows中不可以。原因为何？

> 在Linux环境中socket也被当作一种文件处理，所以可以使用文件I/O的相关函数。

4. 创建套接字后一般会给它分配地址，为什么？为了完成地址分配需要调用哪个函数？

> 为了在同一个机器上区分不同的socket，所以需要为每个socket分配独立的地址。分配地址使用bind函数。

5. Linux中的文件描述符与Windows的句柄实际上非常类似。请以套接字为对象说明它们的含义。

> 在对象被创建时系统会为对象分配一个整数用来代指这个对象，这个整数就是文件描述符（句柄）。

6. 底层文件I/O函数与ANSI标准定义的文件I/O函数之间有何区别？

> ANSI标准定义的输入、输出函数是与操作系统（内核）无关的以C标准写成的函数。相反，底层文件I/O函数是直接提供的。理论上ANSI标准I/O提供了某些机制，性能上优于底层I/O。
