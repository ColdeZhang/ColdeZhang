---
title: 第三章：地址族与数据序列
date: 2077-07-26
sidebar: auto
article: false
---

## 3.1 分配给套接字的 IP 地址与端口号

### IP地址

- 用于区分网络内的多个计算机，IPv4由4个字节构成；
- A类地址首字节范围：0 ～ 127；
- B类地址首字节范围：128 ～ 191；
- C类地址首字节范围：192 ～ 223；

### 端口号

- 由16位构成，用于区分计算机内的不同 Socket，具有唯一性；
- 可分配端口号是 0 ～ 65535，但 0 ～ 1023 是知名端口（Well-known PORT）一般分配给特定程序；
- TCP和UDP套接字不共用端口号，所以可以使用同一个端口号；

## 3.2 地址信息的表示

### 结构体 sockaddr_in

```c++
struct sockaddr_in{
  sa_family_t			sin_family;		// 地址族
  uint16_t				sin_port;			// 16位端口号
  struct in_addr	sin_addr;			// 32位IP地址
  char						sin_zero[8];	// 不使用
};

struct in_addr{
  in_addr_t				s_addr;				// 32位IPv4地址
};
```

此结构体将作为参数传递给 bind 函数，用于为 socket 绑定地址端口信息。

### sin_family 地址族

每种协议族需要使用不同的地址族：

| 地址族 Address Family |               含义               |
| :-------------------: | :------------------------------: |
|        AF_INET        |    IPv4网络协议中使用的地址族    |
|       AF_INET6        |    IPv6网络协议中自用的地址族    |
|       AF_LOCAL        | 本地通信中采用的UNIX协议的地址族 |

### sin_port 端口

保存16位端口号，以网络字节序保存。

### sin_addr 地址

保存32位IP地址信息，以网络字节序保存。

### sin_zero

无特殊含义，只是为了使 sockaddr_in 与 sockaddr 的大小保持一致而插入的，必须填充为0。在 bind 函数中，第二个参数要求传入 sockaddr 结构体，并非 sockaddr_in：

```c++
int bind(int sockfd, struct sockaddr *myaddr, socklen_t addrlen);
```

根据如下的 sockaddr 结构体代码：

```c++
struct sockaddr{
  sa_family_t 	sin_family; 	// 地址族
  char 					sa_data[14];	// 地址信息（同时包含IP与端口）
}
```

可以看到 bind 函数接受的结构体 sockaddr 只有地址族和地址信息两个成员，sa_data内存放的地址信息同时包含了IP和端口，通过地址族判断地址类型。

由于不同的地址族地址长度是不一样的，所以结构体 sockaddr_in 中含有八个字节长度的无内容空间，目的是保证 sockaddr_in 的大小与 sockaddr 保持一致，这样在将 sockaddr_in 转换为 sockaddr 时不会出错。

### POSIX

可移植操作系统接口（Portable Operating System Interface）是为UNIX系列操作系统设立的标准，定义了一些其他数据类型：

- sys/tyoes.h

| 数据类型名称 |               数据类型说明               |
| :----------: | :--------------------------------------: |
|    int8_t    |          signed 8-bit int type           |
|   uint8_t    | unsigned 8-bit int type (unsigned char)  |
|   int16_t    |          signed 16-bit int type          |
|   uint16_t   | unsigned 16-bit int type (unsigned char) |
|   int32_t    |          signed 32-bit int type          |
|   uint32_t   | unsigned 32-bit int type (unsigned char) |

- sys/socket.h

| 数据类型名称 |           数据类型说明            |
| :----------: | :-------------------------------: |
| sa_family_t  | 地址族 socket address family type |
|  socklen_t   |      长度 socket length type      |

- netinet/in.h

| 数据类型名称 |                数据类型说明                 |
| :----------: | :-----------------------------------------: |
|  in_addr_t   | IP地址 internet address type 声明为uint32_t |
|  in_port_t   |  端口号 internet port type 声明为uint16_t   |

## 3.3 网络字节序与地址变换

### 网路字节序（Network Byte Order）

CPU将数据存储到内存中有两种不同的字节序（Order）：大端序（Big Endian）和小端序（Little Endian）。大端序会将高位数据存储在低位内存，而小端序会将高位数据存储在高位内，例如：整数12345678共需要四个字节，大端序的存储方式为｜12｜34｜56｜78｜，小端序的存储方式为｜78｜56｜34｜12｜。由于不同计算机可能有不同的字节序保存方式，因此在发送数据时可能会导致数据顺序不一致。

为了解决这一问题，再通过网络传输数据时使用统一的字节序格式——网络字节序（大端序）。

### 字节序转换（Endian Conversions）

当我们给 sockaddr_in 节构体填充变量时可以使用字节序转换函数将字节序转换为网络字节序，例如：

```c++
htons()
// h 代表 host 即主机
// n 代表 network 即网络
// s 代表 short
// 将short型数据由主机字节序转换为网络字节序
```

同理，有：

```c++
htons() // 将short型数据由主机字节序转换为网络字节序
htonl() // 将long型数据由主机字节序转换为网络字节序
ntohs() // 将short型数据由网络字节序转换为主机字节序
ntohl() // 将long型数据由网络字节序转换为主机字节序
```

- 在Linux环境中 shrot 长度为两字节，long 长度为四字节。因此前者用于端口号后者用于IP地址。
- 对于本身是大端序的系统而言可以不进行转换，但是为了逻辑统一与迁移最好也经过一次转换。
- 由于socket在发送接收数据时会自动为数据进行字节序转换，因此仅当我们为 sockaddr_in 填充变量才需要手动进行变换。

## 3.4 网络地址的初始化与分配

### 将网络地址转换为整数型

#### inet_addr()

观察 sockaddr_in.sin_addr.s_addr 所需要传入的地址数据类型为 in_addr_t，这是一种32位整数型数据。IP地址我们一般使用类似于“127.0.0.1”这样的点分十进制表达，我们可以使用 inet_addr() 函数将其转换为32位整数型数据：

```c++
#include <arpa/inet.h>
in_addr_t inet_addr(const char * string);
// 成功时返回32位大端序整数型值，失败时返回INADDR_NONE
```

该函数不仅可以对点分十进制IP地址进行转换，还能校验地址格式是否正确，并且输出的数据是网络字节序。

#### inet_aton()

函数 inet_aton() 功能与 inet_addr() 类似，但是传入两个参数，第二个参数为结构体的 in_addr 变量，因此可以直接将转换后的IP地址存入结构体：

```c++
#include <arpa/inet.h>
int inet_aton(const char *string, struct inaddr *addr);
// 成功时返回1（true），失败时返回0（false）
```

#### inet_ntoa()

与上面两个函数功能相反，可以将网络字节序的整数型IP地址转换成字符串的点分十进制IP地址：

```c++
#include <arpa/inet.h>
char * inet_ntoa(struct in_addr adr);
```

### 网络地址初始化

```c++
struct sockaddr_in addr;
char const * serv_ip = "211.217.168.13";
char const * serv_port = "9190";
memset(&addr, 0, sizeof(addr));
addr.sin_family = AF_INET;
addr.sin_addr.s_addr = inet_addr(serv_ip);
addr.sin_port = htons(atoi(serv_port);
```

memset() 函数的作用是将所有内容设置为指定的数值，此处全部设置为0。

最后一行先试用 atoi() 函数将字符串端口转换为整数，再使用 htons() 函数将其转换为网络字节序整数。

对于服务端而言，可以使用 INADDR_ANY 填入IP地址处，程序会自动获取运行的服务器的IP地址。

## 3.5 基于Windows的实现



## 3.6 习题

大端序计算机希望把4字节整数型数据12传递到小端序计算机。请说出数据传输过程中发生的字节序变换过程。

> 4字节整数型12  -> 0x00 0x00 0x00 0x0c
>
> 大端序 -> 网络字节序 -> 小端序
>
> 0x00 0x00 0x00 0x0c-->0x00 0x00 0x00 0x0c-->0x0c 0x00 0x00 0x00 

