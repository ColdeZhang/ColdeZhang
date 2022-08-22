---
title: Ubuntu下硬盘分区与挂载
date: 2021-05-08
sidebar: false
categories:
 - 学习笔记
tags:
 - Ubuntu
 - Terminal
article: true
permalink: /mount_disks_on_ubuntu
sidebarDepth: 2
---

## 事件背景
最近租了一个VPS打算和小伙伴联机玩耍MC。在控制台一键安装了Ubuntu系统后使用SSH登陆，一顿行云流水般的熟练配置后服务器就开好了。因为安装了卫星地图插件（Dynmap），为了能加快[网页端卫星地图](https://mc.deercloud.site/map/)的渲染速度我进游戏后直接打开了全局渲染模式，然后挂机等待渲染。
大约三十分钟后，服务器后台突然开始不断打印错误信息，提示文件写入失败。

## 问题排查
因为购买VPS时配置选的60G硬盘，起初我并没有向着磁盘空间不足的方向去思考，以为是权限组的问题，便尝试通过终端在后台添加新的权限组。令我意想不到的是连终端也提示写入文件失败，切换至root账户后问题依旧没有得到解决。

使用状态检视工具后发现我的主目录空间大小居然只有5G！使用`lsblk`命令查看分区信息，发现硬盘确实是60G的硬盘，但是硬盘分区仅仅有一个5G大小的分区。



## 解决问题

::: tip
请先切换到root账户
:::

::: warning
一定要仔细看清楚指令再操作
:::

***
### 定位目标磁盘
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
这里的`vda`即为服务器上连接的硬盘，下方的`vda1`和`vda2`为该硬盘上的两个分区。可以看到我这里硬盘一共有60G的容量，但是仅有一个大小为5G的文件分区。

我接下来就需要对磁盘`vda`新增分区。
***
### 创建分区

#### 1. 进入`fdisk`
 - **命令：**
```shell
sudo fdisk /dev/<your_disk>
```
我的硬盘是`vda`，所以`<your_disk>`处替换为`vda`。如果一切正确，接下来会进入fdisk命令界面。
 - **输入：**
```shell
sudo fdisk /dev/vda
```

 - **输出：**
```shell
Welcome to fdisk (util-linux 2.36).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): 
```
>可以输入`m`查看帮助。
#### 2. 创建分区
输入`n`创建分区，接下来会要求你输入分区名（号）。因为该磁盘下已经有了`vda1`和`vda2`两个分区，所以系统会提示范围为 3-128 ，默认为 3。
 - **输入：**
```shell
n
```
 - **输出：**
```shell
Partition number (3-128, default 3): 
```
直接按回车可使用默认值（推荐使用默认值），接下来会要求输入新分区的第一个扇区编号。
```shell
First sector (34-2047, default 34): 
```
默认值为紧接着上一个分区的最后一个扇区，这里直接按回车使用默认值。接下来会要求输入新分区的结束扇区编号。
```shell
Last sector, +/-sectors or +/-size{K,M,G,T,P} (34-2047, default 2047): 
```
默认值为该硬盘的最后一个扇区，即为可以分区的最大大小。如果你不想使用全部的空间（比如一会儿需要再分一个区），可以简单进行一下计算，输入自己需要的值。我这里使用默认值直接回车，如果一切正常会提示你已经成功创建了一个新的分区。
::: details 分区大小计算
 1. 用`总硬盘大小`除以`总扇区数`得到`每个扇区的容量大小`；
 2. 用你`需要的容量`除以`每个扇区的容量大小`得到你`需要的扇区数量`；
 3. 用`新分区的第一个扇区编号`加上你`需要的扇区数量`即可得到你需要的`最后一个扇区编号`
:::
```shell
Created a new partition 3 of type 'Linux filesystem' and of size 55GB.

Command (m for help):
```
最后输入`w`保存修改并退出`fdisk`。
***
### 格式化新分区
使用`mkfs`命令将新分区格式化为`ext4`格式。
 - **命令：**
```shell
sudo mkfs.ext4 /dev/<your_new_partition>
```
我刚刚创建的新分区是`vda3`，所以`<your_new_partition>`替换为`vda3`。
 - **输入：**
```shell
sudo mkfs.ext4 /dev/vda3
```
如果没有发生报错或者提示其他信息，说明一切正常。
***
### 挂载新分区
使用`mount`命令将新分区挂载到目录。
 - **命令：**
```shell
mount -t ext4 /dev/<your_new_partition> <target_dir>
```
我刚刚创建的新分区是`vda3`，所以`<your_new_partition>`替换为`vda3`。
我希望将这个分区挂载到`/root/mcserver`，所以`<target_dir>`替换为`/root/mcserver`。
::: warning
`/dev/<your_new_partition>` `<target_dir>`之间有一个空格。
:::
 - **输入：**
```shell
mount -t ext4 /dev/vda3 /root/mcserver
```
如果挂载成功，那么挂载目录下应该会出现一个`lost+found`目录。

```shell
drwx------  2 root root 16384 May  7 23:39 lost+found
```
***
### 检查
最后再使用`lsblk`检查是否成功创建并挂载了分区。
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
├─vda2 252:2    0    5G  0 part /
└─vda3 252:3    0   55G  0 part /root/mcserver
```
这里我的`vda`硬盘下新增了以恶搞大小为`55G`的分区`vda3`，挂载点为`/root/mcserver`。
***
### 设置开机自动挂载
在`/etc/fstab`中添加一行：
```bash
/dev/<your_new_partition>   <target_dir>  ext4    defaults    1   0
```

在我这里为：
```bash
/dev/vda3   /root/mcserver  ext4    defaults    1   0
```
