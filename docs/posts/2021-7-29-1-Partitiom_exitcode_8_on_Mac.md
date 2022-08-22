---
title: Mac分区硬盘报错误代码8
date: 2021-07-29
sidebar: false
categories:
 - 学习笔记
tags:
 - MacOS
 - HardwareDisk
 - Partition
article: true
permalink: /ercode_8_while_part_on_mac
sidebarDepth: 2
---

## 事件背景

从旧台式机上换下来一块2TB的机械硬盘，打算用来作为MacBook的时间机器备份，还有一些不常用数据（原片、电影等）的存储，因此需要分成两个分区。计划一个750G用于时间机器备份，剩余的空间用于存储数据。查阅资料，分区采用GPT分区表以及HFS+文件系统在这种情况下效率最最高。



## 故障

首先打开Mac自带的磁盘管理工具，将硬盘重新全盘格式化为HFS+（Mac OS 扩展日志）格式。然后选择分区，按照先前的计划新增一个分区大小为750GB用于时间机器。这个过程中磁盘管理工具会先缩小原分区，然后创建新的分区。

但是在“检查分区表位图”时卡住，随后开始报错：

```
正在检查宗卷位图。
无法完全验证宗卷“未命名”。
文件系统检查推出代码为8。
正在恢复发现为已装载的原始状态。
```



## 故障分析

::: warning

仍然未知，有朋友知道怎么回事的欢迎在下方评论。

:::



## 尝试过程

### 1.磁盘工具修复-失败❌

尝试使用磁盘工具自带的“急救”对磁盘进行修复，在进行到检查位图时同样报错误代码8。

### 2.写入空数据-失败❌

打开终端，尝试使用dd对磁盘写入一段空数据覆盖分区表，将磁盘强制转换为空盘：

```shell
#查看磁盘是否被挂载
df
#如果挂载了就取消挂载
sudo diskutil umount /dev/disk4s2
#写入5G空数据覆盖分区表
sudo dd bs=1m count=5000 if=/dev/zero of=/dev/disk3
```

之后磁盘会在磁盘工具中被标注为“未初始化”，再重新对磁盘格式化、分区。但是在进行分区的时候依然报错误代码8，问题没有得到解决。

### 3.在恢复模式下尝试-失败❌

重启电脑，重启时按住command+R键进入恢复模式，在恢复模式中打开磁盘工具再次尝试上述方法，均无效。



## 问题解决

在尝试第二种解决方案时了解到了`diskutil`这个命令行磁盘管理工具：

```shell
#查看工具使用说明
diskutil
```

输出：

```{43}
Disk Utility Tool
Utility to manage local disks and volumes
Most commands require an administrator or root user

WARNING: Most destructive operations are not prompted

Usage:  diskutil [quiet] <verb> <options>, where <verb> is as follows:

     list                 (List the partitions of a disk)
     info[rmation]        (Get information on a specific disk or partition)
     listFilesystems      (List file systems available for formatting)
     listClients          (List all current disk management clients)
     activity             (Continuous log of system-wide disk arbitration)

     u[n]mount            (Unmount a single volume)
     unmountDisk          (Unmount an entire disk (all volumes))
     eject                (Eject a disk)
     mount                (Mount a single volume)
     mountDisk            (Mount an entire disk (all mountable volumes))

     enableJournal        (Enable HFS+ journaling on a mounted HFS+ volume)
     disableJournal       (Disable HFS+ journaling on a mounted HFS+ volume)
     moveJournal          (Move the HFS+ journal onto another volume)
     enableOwnership      (Exact on-disk User/Group IDs on a mounted volume)
     disableOwnership     (Ignore on-disk User/Group IDs on a mounted volume)

     rename[Volume]       (Rename a volume)

     verifyVolume         (Verify the file system data structures of a volume)
     repairVolume         (Repair the file system data structures of a volume)
     verifyDisk           (Verify the components of a partition map of a disk)
     repairDisk           (Repair the components of a partition map of a disk)
     resetFusion          (Reset the components of a machine's Fusion Drive)

     eraseDisk            (Erase an existing disk, removing all volumes)
     eraseVolume          (Erase an existing volume)
     reformat             (Erase an existing volume with same name and type)
     eraseOptical         (Erase optical media (CD/RW, DVD/RW, etc.))
     zeroDisk             (Erase a disk, writing zeros to the media)
     randomDisk           (Erase a disk, writing random data to the media)
     secureErase          (Securely erase a disk or freespace on a volume)

     partitionDisk        ((re)Partition a disk, removing all volumes)
     addPartition         (Create a new partition to occupy free space)
     splitPartition       (Split an existing partition into two or more)
     mergePartitions      (Combine two or more existing partitions into one)
     resizeVolume         (Resize a volume, increasing or decreasing its size)

     appleRAID <verb>     (Perform additional verbs related to AppleRAID)
     coreStorage <verb>   (Perform additional verbs related to CoreStorage)
     apfs <verb>          (Perform additional verbs related to APFS)

diskutil <verb> with no options will provide help on that verb
```

可以看到该工具是支持分区的，尝试直接使用diskutil工具对磁盘分区：

```shell
#使用方法，如果需要更多分区以此往后类推即可
#可使用  diskutil listFilesystems 查看你的mac支持的文件系统
sudo diskutil partitionDisk <磁盘位置> <分区表格式> <第一个分区文件系统> <第一个分区名> <第一个分区大小> <第二个分区文件系统> <第二个分区名> <第二个分区大小>
```

::: details 分区表格式

可选的有三种：APM、MBR、GPT

其中APM为旧版本苹果电脑芯片专用分区表格式，一般不选；MBR是Dos适用分区表；GPT是GUID分区表。

一般选择GPT。

:::



我这里使用GPT分区表，两个分区文件系统均为MacOS扩展日志：

```shell
sudo diskutil partitionDisk disk4 GPT jhfs+ DeerDatabase 1.25T jhfs+ TimeMachine 0.75T
```



稍等片刻后分区成功，查看访达两个分区均能被正常识别、读写。
