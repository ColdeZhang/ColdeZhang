---
title: Klipper编译(make)时遇到的各种报错
date: 2021-08-22
sidebar: false
categories:
 - 学习笔记
tags:
 - Raspberry
 - 3Dprint
article: true
permalink: /solutions_of_klipper_make_errors
sidebarDepth: 2
---

## avr-gcc: not found

​	一些芯片在树莓派上按照官方的安装教程进行到make编译步骤时会报错：

```shell
avr-gcc: not found
```

​	这是由于avr芯片使用的编译器默认在树莓派上是没有安装的，因此需要手动安装：

```shell
sudo apt install gcc-avr
```



## setjmp.h: No such file or directory

​	安装完 gcc-avr 编译器后再次可能还会报这个错：

```shell
src/sched.c:7:30: fatal error: setjmp.h: No such file or directory
```

​	这是因为树莓派自带的C标准库不完整，因此缺失了setjmp.h这个库，需要手动安装：

```shell
sudo apt-get install libncurses5-dev
sudo apt-get install avr-gcc
sudo apt-get install avr-libc
```



## 各种 error + warning

​	如果您先前编译的时候遇到了丢失库等问题，那么您先前编译的文件就会不完整，直接继续make就有可能出现如下的类似报错：

```shell
  Compiling out/src/i2ccmds.o
src/i2ccmds.c:14:23: error: field ‘i2c_config’ has incomplete type
     struct i2c_config i2c_config;
                       ^
src/i2ccmds.c: In function ‘command_config_i2c’:
src/i2ccmds.c:23:23: warning: implicit declaration of function ‘i2c_setup’ [-Wimplicit-function-declaration]
     i2c->i2c_config = i2c_setup(args[1], args[2], addr);
                       ^
src/i2ccmds.c: In function ‘command_i2c_write’:
src/i2ccmds.c:35:5: warning: implicit declaration of function ‘i2c_write’ [-Wimplicit-function-declaration]
     i2c_write(i2c->i2c_config, data_len, data);
     ^
src/i2ccmds.c: In function ‘command_i2c_read’:
src/i2ccmds.c:48:5: warning: implicit declaration of function ‘i2c_read’ [-Wimplicit-function-declaration]
     i2c_read(i2c->i2c_config, reg_len, reg, data_len, data);
     ^
make: *** [Makefile:64: out/src/i2ccmds.o] Error 1
```

​	解决方法就是先清除已经make的文件，然后再尝试make：

```shell
# 清除已有的编译结果
sudo make clean
# 编译
sudo make
```

