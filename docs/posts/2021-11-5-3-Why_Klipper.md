---
title: 为什么要使用Klipper固件
date: 2021-11-05
categories:
  - 教程分享
tags:
 - 3Dprint
 - Klipper
permalink: /why_klipper
article: true
sidebar: false
---

::: tip 简介

Klipper作为一款先进的3D打印机固件拥有更简易的配置、更高精度的打印效果、高级的控制方式等多种优点，本文简单介绍了Klipper相比于传统打印机固件的优点及其优势来源，帮助你更好的了解这一固件。

:::

<!-- more -->

## 什么是Klipper

> Klipper is a 3d-Printer firmware. It combines the power of a general purpose computer with one or more micro-controllers. See the[features](https://www.klipper3d.org/Features.html) document for more information on why you should use Klipper.

## 传统固件方案

​	首先我们要看一看传统的3D打印机固件是如何执行任务的：

<img src="https://i.loli.net/2021/11/05/K4Nmck1bxUnAhP2.png" alt="image-20211105170205510" style="zoom:50%;" />

​	gcode就是模型切片后的文件内容，其为一系列的坐标与温度设置。在这个文件中并不包含任何实质上的打印机控制信息，所以在打印机打印时需要首先将这样的坐标信息通过程序设定的公司计算出具体的步进电机控制方式，比如电机在什么样的时间点以什么样的速度旋转多少度。

​	可以看到在传统的固件方案中，上位机的作用仅仅是把gcode按照顺序发送给主板，随后由主板根据gcode计算出具体的控制方式再执行。在这个过程中打印机主板需要进行大量的计算，所以在一些结构复杂的打印机（比如三角洲）中经常会遇到死机的情况（尤其是使用的最基础的Ramps主板甚至你又加了个大屏幕的时候）。

​	**等等，如果能够把复杂的计算用树莓派来处理是不是就不容易死机了？**

## Klipper固件方案

​	众所周知，树莓派是一个“强大的”卡片Linux电脑。加上引号是因为相比于真正的电脑来说他实在是太弱了！不过相比于Ramps以及其他3D打印机主板搭载的一众微处理器（MCU）而言它真的是强大太多了，所以Klipper的开发者们便将复杂的计算工作交给了树莓派：

<img src="https://i.loli.net/2021/11/05/wo86bcdxpEnSkAr.png" alt="image-20211105172141267" style="zoom:50%;" />

​	在Klipper的方案中gcode并不会真正被发送到打印机主板，而是直接在树莓派上根据打印机硬件参数进行计算，最后直接将运动控制等信息发送给主板执行。在这个过程中3D打印机主板仅仅充当了执行者的角色，因此昂贵高性能的主板控制芯片变得不再必要（我甚至尝试过使用ATMGA-328p芯片作为主控，对，就是Arduino nano上那个，只要六块八）。

## 不止如此，还有……

### 	1. 更好的打印效果

​	如果仅仅是为了避免死机那其实没有必要如此大费周章。事实上在树莓派的强大（相比于MCU）算力下我们便可以进行更加复杂的计算，理论上来说在引入更高级的计算公式与更高精度的数据下我们可以实现更精确更高速的电机控制，进而可以带来更好的打印效果。而普通的主板控制芯片是无法承受这样复杂的计算的，现在我们有了树莓派的算力我们便可以轻松做到这一点。

> High precision stepper movement. Klipper utilizes an application processor (such as a low-cost Raspberry Pi) when calculating printer movements. The application processor determines when to step each stepper motor, it compresses those events, transmits them to the micro-controller, and then the micro-controller executes each event at the requested time. Each stepper event is scheduled with a precision of 25 micro-seconds or better. The software does not use kinematic estimations (such as the Bresenham algorithm) - instead it calculates precise step times based on the physics of acceleration and the physics of the machine kinematics. More precise stepper movement translates to quieter and more stable printer operation.

### 	2. 更简单的配置调试

​	控制信息的计算是根据打印机硬件信息进行的，由于Klipper方案的计算在树莓派端完成所以打印机的硬件配置实质上也是存储在树莓派上的，这也顺便给我们带来了一点便利。经常调试3D打印机的朋友一定饱受：配置-烧录-测试-配置-烧录-测试……的折磨，尤其是烧录还需要先编译。

​	在Klipper方案中我们可以直接修改存储在树莓派上的printer.cfg文件，这个文件内存储的就是打印机硬件配置信息。这样我们就免去了编译烧录的繁复过程，大大提升了调试的速度。只需要给主板编译烧录一次，之后即可在网页上位机上直接修改配置文件，无需再次编译。（一般来说只有在Klipper更新后需要再次编译烧录）

> Configuration via simple config file. There's no need to reflash the micro-controller to change a setting. All of Klipper's configuration is stored in a standard config file which can be easily edited. This makes it easier to setup and maintain the hardware.

### 	3. 多打印机支持

​	在使用复杂的计算公式后树莓派仍然有很多的性能剩余，因此在Klipper方案中如果你使用的是Fluidd上位机，那么你可以添加多个打印同时工作！正常来说树莓派3B+拥有四个USB接口，也就意味着在没有额外成本的情况下你可以使用一个树莓派同时控制四个打印机进行作业。如果你愿意弄几个usb集线器，那么你可以继续添加多个打印机（上限取决于usb口的通信速率等硬件要求）。

> Klipper supports printers with multiple micro-controllers. For example, one micro-controller could be used to control an extruder, while another controls the printer's heaters, while a third controls the rest of the printer. The Klipper host software implements clock synchronization to account for clock drift between micro-controllers. No special code is needed to enable multiple micro-controllers - it just requires a few extra lines in the config file.

## 如果你想要使用Kliiper

你可以参考[这篇](http://blog.deercloud.site/how_to_install_klipper_quicklly)博客