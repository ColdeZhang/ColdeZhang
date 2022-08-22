---
title: 第二章：套接字类型与协议设置
date: 2077-07-26
sidebar: auto
article: false
---



## 2.1 套接字协议及其数据传输特性

### 创建套接字

```c++
#include <sys/socket.h>
int socket(int domain, int type, int protocal);
```

成功时返回文件描述符，失败时返回-1。

-domain：套接字使用的协议族（Protocol Family）；

-type：套接字数据传输类型信息；

-protocol：通信使用的协议信息；



### 协议族（Protocol Family）

协议（Protocol）的分类方式，协议（Protocol）是协议族（Protocol Family）的子集。常用的是PF_INET协议族，包含了IPv4互联网协议。

|   名称    |        协议族        |
| :-------: | :------------------: |
|  PF_INET  |   IPv4互联网协议族   |
| PF_INET6  |   IPv6互联网协议族   |
| PF_LOCAL  | 本地通信的UNIX协议族 |
| PF_PACKET |  底层套接字的协议族  |
|  PF_IPX   |   IPX Novell协议族   |



### 套接字类型（Type）

决定了数据以何种方式传输，主要有两种：

- 数据流（SOCK_STREAM）：按顺序传递数据、可靠性高；
- 数据包（SOCK_DGRAM）：高速的、不按顺序传递数据、可靠性低；

### 协议（Protocol）

协议决定了最终的数据传输方式，通常来说 PF_INET 协议族下使用SOCK_STREAM 类型的套接字只有 IPPROTO_TCP 一种传输协议（即TCP协议）；而 SOCK_DGRAM 类型的套接字只有 IPPRPTP_UDP 一种传输协议（即UDP协议）。

通常这个参数可以填写 0 ，程序会自动选择套接字类型（Type）对应的传输协议。而当一个协议族下的套接字类型有多种可选的协议是此项必须指定具体的协议。

### 数据边界（Boundary）

即数据的结尾位置。

由于 SOCK_STREAM 类型按顺序传递，所以无需数据边界，而SOCK_DGRAM 会将数据分包发送，数据包必须知道数据在哪结束，所以有数据边界。



## 2.2 Windows平台下的实现及验证



## 2.3 习题

何种类型的套接字不存在数据边界？这类套接字接收数据时应该注意什么？

> TCP 不存在数据边界。在接收数据时，需要保证在接收套接字的缓冲区填充满之时就从buffer里读取数据。也就是，在接收套接字内部，写入buffer的速度要小于读出buffer的速度。