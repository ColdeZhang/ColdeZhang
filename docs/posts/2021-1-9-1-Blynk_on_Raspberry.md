---
title: 在树莓派部署Blynk本地服务器
date: 2021-01-09
sidebar: false
categories:
 - 教程分享
tags:
 - IoT
 - Raspberry
article: true
permalink: /deploy_blynk_server_on_raspberry
sidebarDepth: 2
---



## 1.安装Java
​	首先更新apt

```shell
sudo apt update
```

​	再更新apt-get
```shell
sudo apt-get update
```

​	运行以下命令在您的Raspberry Pi上安装OpenJDK 11 JDK
```shell
sudo apt install default-jdk
```

​	安装完成后，通过检查Java版本进行验证：

```shell
java -version
```

​	输出应如下所示：
```shell
openjdk version "11.0.5" 2019-10-15
OpenJDK Runtime Environment (build 11.0.5+10-post-Raspbian-1deb10u1)
OpenJDK Server VM (build 11.0.5+10-post-Raspbian-1deb10u1, mixed mode)
```


## 2.将打包文件clone到本地
```shell
git clone git://github.com/ColdeZhang/Deer-Blynk-Server-Packed.git
```

## 3.启动服务

​	进入目录
```shell
cd Deer-Blynk-Server-Packed
```

​	运行快捷方式
```shell
sudo sh start-blynk-server.sh
```

## 4.进入后台

​	浏览器地址栏输入：

> https://[树莓派的IP]:9443/admin

​	登陆邮箱：admin@deer.com

​	登陆密码：admin
## 5.APP连接
- 打开APP
- 选择 Create New Account
- 选择 Custom


IP address输入：`自己树莓派IP`
Port输入：`9443`