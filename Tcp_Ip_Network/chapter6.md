---
title: 第六章：基于udp的服务端客户端
date: 2077-07-26
sidebar: auto
article: false
---

## 6.1 理解UDP

### UDP套接字的特点

- 结构上比TCP更加简洁；
- 性能比TCP高出很多；
- 不存在流控制机制，可靠性不如TCP；

### UDP的高效使用

如果需要传递压缩文件（例如被分成一万个数据包），只要有任何一个数据包出错文件往往就无法解压，此时可靠性要求很高，一般选择TCP；

如果传递音频、视频等文件，偶尔的包丢失只会引起短暂的画面抖动或杂音，同时需要提供实时服务，对传输速度的要求更高，此时一般选择UDP；

在收发数据量小但是需要频繁连接的时候，UDP比TCP更高效；

## 6.2 实现基于UDP的服务端/客户端

UDP中只有创建套接字还有数据交换的过程，套接字创建方法与TCP一致；

TCP的套接字服务端与客户端一一对应，UDP中可共用套接字（服务端与客户端都只需一个套接字）；

### 基于UDP的数据I/O函数

由于UDP套接字不会保持连接状态，因此每次传输数据时都需要添加目标地址信息：

```c++
#include <sys/socket.h>
ssize_t sendto(int sock, void *buff, size_t nbytes, int flags, struct sockaddr * to, socklen_t addrlen);
// 成功时返回传输的字节数，失败时返回-1。
```

-sock：		用于传输数据的UDP套接字文件描述符；

-buff：		保存传输数据的缓冲地址值；

-nbytes：	待传输的数据长度，以字节为单位；

-flags：		可选项参数，若没有则传递0；

-to：			存有目标地址信息的sockaddr结构体变量的地址值；

-addrlen：	传递给参数to的地址结构体变量长度；



```c++
#include <sys/socket.h>
ssize_t recvfrom(int sock, void *buff, size_t nbytes, int flags, struct sockaddr * from, socklen_t addrlen);
// 成功时返回传输的字节数，失败时返回-1。
```

-sock：		用于传输数据的UDP套接字文件描述符；

-buff：		保存传输数据的缓冲地址值；

-nbytes：	可接收的最大字节数，以字节为单位；

-flags：		可选项参数，若没有则传递0；

-from：			存有发送端地址信息的sockaddr结构体变量的地址值；

-addrlen：	传递给参数from的地址结构体变量长度；



