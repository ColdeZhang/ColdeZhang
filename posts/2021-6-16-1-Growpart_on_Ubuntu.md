---
title: 使用 Growpart 为 Ubuntu 扩容分区
date: 2021-06-16
sidebar: false
categories:
 - 学习笔记
tags:
 - Ubuntu
 - Terminal
article: true
permalink: /expand_partitions_on_ubuntu
sidebarDepth: 2
---

## 背景
租的云服务器购买了更多的硬盘容量后发现实际使用的容量并没有增加，使用`lsblk`发现虚拟磁盘空间确实扩大了，只是分区没有自动扩大。

 - **输入：**

```shell
sudo lsblk
```
 - **输出：**

```shell
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
loop0    7:0    0 55.3M  1 loop /snap/core18/1885
loop1    7:1    0 55.4M  1 loop /snap/core18/1997
loop2    7:2    0 69.2M  1 loop /snap/lxd/17936
loop3    7:3    0 32.3M  1 loop /snap/snapd/11588
loop4    7:4    0 69.2M  1 loop /snap/lxd/20309
loop5    7:5    0 31.1M  1 loop /snap/snapd/10707
vda    252:0    0   60G  0 disk 
├─vda1 252:1    0    1M  0 part 
└─vda2 252:2    0    5G  0 part /
```
这里的`vda`即为服务器上连接的虚拟硬盘，下方的`vda1`和`vda2`为该硬盘上的两个分区。可以看到我这里硬盘一共有60G的容量，但是仅有一个大小为5G的文件分区。

我接下来就需要对分区`vda2`进行扩容。


::: tip
请先切换到root账户
:::

::: warning
一定要仔细看清楚指令再操作
:::

## 安装工具

```shell
sudo apt install cloud-guest-utilsapt install xfsprogs
```

## 开始扩容

 - **命令：**
```shell
sudo growpart <DiskName> <PartitionNumber>
```
此处共有两个参数，第一个参数是虚拟磁盘的名字，第二个参数是分区编号。

此处我的虚拟磁盘为`/dev/vda`，我需要扩容的分区为二号分区`2`，所以我的命令为：

 - **输入：**
```shell
sudo growpart /dev/vda 2
```

 - **输出：**
```shell
CHANGED: partition=2 start=2048 old: size=41940992 end=41943040 new: size=209710462,end=209712510
```

## 更新分区表

 - **命令：**
```shell
sudo resize2fs <PartitonName>
```
`<PartitonName>`为刚刚扩容的分区的名字，此处我扩容的分区为`/dev/vda2`：

 - **输入：**
```shell
sudo resize2fs /dev/vda2
```

再次使用 `lsblk` 查看磁盘：

```shell
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
loop0    7:0    0 55.4M  1 loop /snap/core18/1997
loop1    7:1    0 32.3M  1 loop /snap/snapd/12159
loop3    7:3    0 32.1M  1 loop /snap/snapd/12057
loop4    7:4    0 55.4M  1 loop /snap/core18/2066
loop5    7:5    0 70.3M  1 loop /snap/lxd/20638
loop6    7:6    0 70.3M  1 loop /snap/lxd/20684
vda    252:0    0   60G  0 disk
├─vda1 252:1    0    1M  0 part
└─vda2 252:2    0   60G  0 part /
```

恭喜你，你已经成功扩容了分区。