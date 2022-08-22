---
title: 在Ubuntu服务器快速开个我的世界服务器
date: 2021-07-28
sidebar: false
categories:
 - 教程分享
tags:
 - Ubuntu
 - MineCraft
 - Server
article: true
permalink: /run_a_mc_server_on_ubuntu
sidebarDepth: 2
---

::: tip 简介
本教程内容为如何在一个运行着Ubuntu的服务器上开一个高性能的我的世界服务器。

:::

<!-- more -->

## 一、登陆服务器后台

1. 首先打开你电脑上的终端；

::: details MacOS用户

按下 command + 空格 ，搜索**终端**，直接打开。

:::

::: details Windows用户

按下 windows + R ，输入**cmd**，回车运行。

:::

2. 在终端中输入以下指令进行登陆：

```shell
ssh root@<你的服务器地址> -p <端口>
```

> 这里的服务器地址还有端口详情咨询你的服务器提供商。

​	如果出现类似以下的东西，输入`yes`后回车

```xml
The authenticity of host can't be established.
ECDSA key fingerprint is SHA256:owaVWAdDfUyfBEr9NmMZwOT9ZwIUhmqE.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

3. 然后会出现如下类似提示输入密码，输入服务商给你提供的密码：

```xml
root@<你的服务器地址>'s password:
```

4. 如果出现类似下面的东西则表明登录成功：

<img src="https://i.loli.net/2021/07/28/mpOgEyNeZ2S7zl9.png" alt="image-20210728142358071" style="zoom:33%;" />



## 二、更新及安装基础软件

1. 输入以下命令更新软件：

```shell
apt update
apt upgrade -y
```

2. 安装文本编辑器：

```shell
apt install micro -y
```

3. 安装运行环境：

```shell
apt install nodejs -y
```

4. 安装MC所需java：

```shell
#如果你是运行1.16.5及以下版本，需要安装java8
apt install openjdk-8-jdk -y
#如果你是运行1.17及以上版本，需要安装java16
apt install openjdk-16-jdk -y
```

::: details 我既想运行1.16.5又想运行1.17怎么办？

建议使用Docker运行服务端。（后面会讲到）

:::



## 三、安装网页管理面板

1. 下载网页管理面板：

```shell
wget -qO- https://gitee.com/Suwingser/MCSManager-installer/raw/master/install.sh | bash
```

2. 初始化网页面板：

```shell
systemctl start mcsm
systemctl stop mcsm
```

3. 配置管理面板：

```shell
micro /opt/MCSManager/property.js
```

​	找到第26行有关端口的设置，将默认的23333修改为你的服务商给你开放的端口之一。

::: warning ⚠️注意！
端口的使用具有唯一性，如果这个端口作为控制面板的访问端口那么就不能再用作其他用途了。
:::

4. 启动网页管理面板：

```shell
sudo systemctl start mcsm
```

5. 如果你不放心还可以使用以下命令查看运行状态：

```shell
sudo systemctl status mcsm
```

​	输出类似下面的东西即为正常：

```shell
● mcsm.service - MCSManager
     Loaded: loaded (/lib/systemd/system/mcsm.service; disabled; vendor preset: enabled)
     Active: active (running) since Wed 2021-07-28 14:49:48 CST; 15s ago
   Main PID: 202824 (node)
      Tasks: 11 (limit: 19679)
     Memory: 18.4M
     CGroup: /system.slice/mcsm.service
             └─202824 /usr/bin/node /opt/MCSManager/app.js

Jul 28 14:49:48 LankoData-r6c5m06j node[202824]: designed for a production environment, as it will leak
Jul 28 14:49:48 LankoData-r6c5m06j node[202824]: memory, and will not scale past a single process.
Jul 28 14:49:48 LankoData-r6c5m06j node[202824]: [07/28 14:49:48] [INFO] OnlineFs - 正在初始化文件管理路由与中间件
Jul 28 14:49:48 LankoData-r6c5m06j node[202824]: [07/28 14:49:48] [INFO] Module - 正在初始化用户管理模块
Jul 28 14:49:48 LankoData-r6c5m06j node[202824]: [07/28 14:49:48] [INFO] Module - 正在初始化服务端管理模块
Jul 28 14:49:48 LankoData-r6c5m06j node[202824]: [07/28 14:49:48] [INFO] Module - 正在初始化计划任务模块
Jul 28 14:49:48 LankoData-r6c5m06j node[202824]: [07/28 14:49:48] [INFO] HTTP - HTTP 模块监听: [ http://127.0.0.1:12635 ]
Jul 28 14:49:48 LankoData-r6c5m06j node[202824]: [07/28 14:49:48] [INFO] 配置文件: property.js 文件
Jul 28 14:49:48 LankoData-r6c5m06j node[202824]: [07/28 14:49:48] [INFO] 文档参阅: https://github.com/suwings/mcsmanager
Jul 28 14:49:48 LankoData-r6c5m06j node[202824]: [07/28 14:49:48] [INFO] 控制面板已经启动
```

6. 访问链接进行测试，格式为`<你的服务器地址>:<刚刚设置的端口>`，默认登录账号是`#master`，密码是`123456`。

::: warning ⚠️注意！
登录进去后务必修改密码
:::

## 四、创建服务器

1. 点击左侧“服务端管理”<img src="https://i.loli.net/2021/07/28/tGCTEAIU7Fu4Lqi.png" alt="image-20210728151411665" style="zoom:25%;" />，然后点击上方“创建新实例应用”<img src="https://i.loli.net/2021/07/28/kfWrGvAMHuwLXdl.png" alt="image-20210728151517007" style="zoom:25%;" />；

2. 选择“引导创建”；

<img src="https://i.loli.net/2021/07/28/oIHP4nGkELuXfwK.png" alt="image-20210728151632836" style="zoom:50%;" />

3. 设置服务器的名称（自定义），上传服务器核心；

::: tip
如果你有整合包，那么可以忽略上传核心这一步，创建完成后使用“文件管理”上传你的整合包。（下一节）
:::

4. 你还可以设置服务器的最大内存，与初始内存，如果你不懂这是什么你可以不填写，系统会自动选择最佳配置；
5. 进入你刚刚创建的服务器，点击“开启服务器”<img src="https://i.loli.net/2021/07/28/R7o8MAEejqCcOGh.png" alt="image-20210728152213625" style="zoom:25%;" />，等待服务器初始化；
6. 大约一两分钟后关闭服务器，点击“server.properties配置文件”<img src="https://i.loli.net/2021/07/28/cCakL6dzxi7p1JH.png" alt="image-20210728152343042" style="zoom:25%;" />，进入后将你的服务器端口修改为服务商给你提供的可用端口号；
7. 如果你的玩家没有购买正版我的世界，请务必将“（在线）正版验证”的值修改为`false`；
8. 返回上一个界面，再次点击“开启服务器”，现在你的服务器应该能够正常运行了，连接地址为`<你的服务器地址>:<刚刚设置的端口>`；

## 五、使用整合包创建

1. 点击左侧“服务端管理”<img src="https://i.loli.net/2021/07/28/tGCTEAIU7Fu4Lqi.png" alt="image-20210728151411665" style="zoom:25%;" />，然后点击上方“创建新实例应用”<img src="https://i.loli.net/2021/07/28/kfWrGvAMHuwLXdl.png" alt="image-20210728151517007" style="zoom:25%;" />；

2. 选择“快速创建”；

<img src="https://i.loli.net/2021/07/28/kZ4oG3UFwblqiWN.png" alt="image-20210728153202961" style="zoom:50%;" />

3. 设置服务器的名称（自定义）；
4. 设置服务端核心的文件名，然后点击创建服务器；

::: details 核心的文件名是什么？
打开你的服务端整合包，找到一个以.jar结尾的文件。这个文件就是你的服务端核心，把这个文件的名字复制到服务端文件名处（结尾的.jar也需要复制过去）。
:::

5. 然后点击左侧的"文件管理"<img src="https://i.loli.net/2021/07/28/32tqENeKPzy9cOF.png" alt="image-20210728153728974" style="zoom:25%;" />，选择刚刚创建的服务器；
6. 点击左侧的“上传文件”<img src="https://i.loli.net/2021/07/28/hSlHUBPrcLaAKzn.png" alt="image-20210728153856569" style="zoom:25%;" />将你的服务端整合包上传到服务器；

::: warning ⚠️注意！
这里整合包必须要是zip压缩格式，建议使用Windows或Mac自带的压缩方式压缩。

:::

7. 等待上传完成后在文件列表中选中刚刚上传的整合包，点击左侧的“解压ZIP”<img src="https://i.loli.net/2021/07/28/jDRNKUWAu5HQit3.png" alt="image-20210728154114785" style="zoom:25%;" />，等待解压完成；
8. 之后便可以回到控制界面启动服务器了；



## 六、使用Docker运行服务端

1. 进入面板的服务端管理，点击创建Docker镜像<img src="https://s2.loli.net/2021/12/26/bxl4eR5dsKnVkz6.png" alt="image-20211226192739216" style="zoom:33%;" />；
2. 在进入的页面中有下面这段东西，第一行的数字“8”代表默认创建的是java8环境，手动将其修改为你需要使用的java版本：

```
FROM openjdk:8
RUN mkdir -p /mcsd
RUN echo "Asia/Shanghai" > /etc/timezone;dpkg-reconfigure -f noninteractive tzdata
WORKDIR /mcsd
```

3. 下方有一个“Docker镜像名”，自己写一个好记的（我这里以创建java12为例）；

<img src="https://s2.loli.net/2022/03/14/gncIKl6efMDdNtC.png" alt="image-20211226193217810" style="zoom:50%;" />

1. 然后点击下方的创建Docker镜像<img src="https://s2.loli.net/2021/12/26/7SdmHAsLkbgwVxy.png" alt="image-20211226193440851" style="zoom:33%;" />，确认无误后可以在任务结果列表查看<img src="https://s2.loli.net/2021/12/26/mzYRpoZjSycs3vC.png" alt="image-20211226193524404" style="zoom:33%;" />，由于需要下载一些文件所以需要等一会儿;
2. 之后回到服务端管理，点击你服务器的参数<img src="https://s2.loli.net/2021/12/26/j8D73SGomOtrsuc.png" alt="image-20211226195744813" style="zoom:50%;" />，再点击最下方的Docker配置<img src="https://s2.loli.net/2021/12/26/KzpTZDG2RB7NHve.png" alt="image-20211226195810362" style="zoom:50%;" />。勾选启用docker，【镜像名】填写你刚刚创建的docker镜像名。在【端口限制】中填写“25565:25565”即可，此意是开放 25565 端口。冒号两边一般情况下保持一致即可。



## 如果实在不会你也可以考虑我的[付费服务💰](https://wpa.qq.com/msgrd?v=3&uin=2751268851&site=qq&menu=yes)

