---
title: 在Ubuntu读写MacOS扩展日志格式硬盘
date: 2021-08-11
sidebar: false
categories:
 - 学习笔记
tags:
 - MacOS
 - HardwareDisk
 - Partition
article: true
permalink: /jhfs_on_ubuntu
sidebarDepth: 2
---



## 1.将分区日志关闭

​	在Mac的终端上：

```shell
sudo diskutil disableJournal <分区识别编号>

# 如果以后还想打开日志使用下面的命令
sudo diskutil enableJournal <分区识别编号>
```

::: details 如何查看分区编号

使用 diskutil list 查看。

注意是最后面的 IDENTIFIER。

:::

## 2.Ubuntu上安装hfsprogs

​	使用以下命令安装hfsprogs：

```shell
sudo apt install hfsprogs
```



## 3.挂载硬盘

​	使用以下命令挂载：

```shell
sudo mount -t hfsplus -o force,rw /dev/<你的硬盘分区> <你的挂载点>
```

::: details 如何查看硬盘分区

使用 lsblk 查看。

:::



## 如果说有损坏

​	使用下面的命令修复：

```shell
sudo fsck.hfsplus -f /dev/<你的硬盘分区>
```

