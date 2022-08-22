---
title: 快速安装Klipper与Fluidd
date: 2021-11-05
categories:
  - 教程分享
tags:
 - 3Dprint
 - Raspberry
 - Klipper
permalink: /how_to_install_klipper_quicklly
article: true
sidebar: false
---

::: tip 简介

本文介绍了如何快速为你的打印机安装Klipper固件与使用其配套的Fluidd网页上位机，尽可能减少了不必要的步骤。

:::

<!-- more -->

## 一、下载与准备

 1. [到这里](https://github.com/fluidd-core/FluiddPI/releases)下载系统镜像<img src="https://s2.loli.net/2022/01/07/RPoG2wjTZuhYIMy.png" alt="image-20220107211402946" style="zoom:33%;" />；

> 此系统镜像包含了Klipper、Fluidd等所有程序。

 2. [点击这里](https://www.balena.io/etcher/)下载烧录工具；

> 用于将系统写入存储卡。

 3. 树莓派（建议3B以上）；

> 没什么好BB的。

 4. 不小于8G的tf存储卡；

> 用于存储系统。

 5. 读卡器；

> 用于将系统写入存储卡。


## 二、写入系统镜像

​	将第一步中下载好的系统镜像解压，得到img文件。

​	将存储卡插入读卡器，再将读卡器插上电脑。

​	打开Etcher烧录工具：

<img src="https://i.loli.net/2021/11/05/eIS9qk48WaQrjBb.png" alt="image-20211105004452686" style="zoom:50%;" />

​	点击"Flash from file"，选择解压出来的img文件。点击"Select target"，选择存储卡。最后点击"Flash!"，等待软件自动写入系统。	

​	重新拔插读卡器，此时你的电脑上应该会出现一个名为"boot"的磁盘。进入这个磁盘，打开名为 **fluiddpi-wpa-supplicant.txt**

 的文件，找到下面这几行并将对应位置改成你的Wi-Fi名和密码：

```
network={
	ssid="WiFi的名称"
	psk="WiFi密码"
}
```

​	记住去掉这四行前面的#号。

​	最后将你的存储卡从读卡器中取出，插入到树莓派，给树莓派通电。

## 三、编译与烧写klipper固件

​	将你的打印机主板（我是用的是基础的Ramps主板）连接到树莓派上，然后打开电脑的终端登陆树莓派。

::: details MacOS用户

按下 command + 空格 ，搜索**终端**，直接打开。

:::

::: details Windows用户

按下 windows + R ，输入**cmd**，回车运行。

:::

​	在终端中输入：

```
ssh pi@fluiddpi.local
```

​	如果出现类似以下的东西，输入`yes`后回车

```xml
The authenticity of host '192.168.1.3 (192.168.1.3)' can't be established.
ECDSA key fingerprint is SHA256:owaWDWAdDfUyfBEr9NmMZwOT9ZwIUhmqE.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

​	之后会出现如下提示，输入`raspberry`然后回车即可登录

```xml
pi@192.168.1.3's password:
```

​	登陆成功后依次输入下面的内容，开始编译固件：

```
cd ~/klipper/
sudo make
```

​	如果make时出现报错，请参考[这篇](http://blog.deercloud.site/solutions_of_klipper_make_errors)博客。

::: warning ⚠️注意！

在执行第二个命令时会要求再输入一次密码，请再次输入`raspberry`。

:::

::: tip 如果你的主板不是Ramps

使用其它型号的主板需要先使用`make menuconfig`命令配置主板的芯片，这是一个很复杂的工作，值得开一篇专门的博客所以这里不赘述。

:::

​	接下来输入下面这行指令：

```
ls /dev/serial/by-id/*
```

​	如果你的打印机主板与树莓派是正常连接的那么应该会出现类似于下面的东西：

```
/dev/serial/by-id/usb-1a86_USB2.0-Serial-if00-port0
```

​	后面这段`usb-XXXXXXXXXXXXX`复制下来，这就是你的主板的连接位置。

​	接下来开始将编译好的固件上传至主板：

```
sudo service klipper stop
sudo make flash FLASH_DEVICE=/dev/serial/by-id/usb-1a86_USB2.0-Serial-if00-port0
sudo service klipper start
```

::: tip 不要忘记将第二行后面的主板连接位置替换成你自己的 

:::

​	等待一堆读条完成后固件就烧录完成了：

```
  Flashing out/klipper.elf.hex to /dev/serial/by-id/usb-1a86_USB2.0-Serial-if00-port0 via avrdude

avrdude: AVR device initialized and ready to accept instructions

Reading | ################################################## | 100% 0.02s

avrdude: Device signature = 0x1e9801 (probably m2560)
avrdude: reading input file "out/klipper.elf.hex"
avrdude: writing flash (25596 bytes):

Writing | ################################################## | 100% 4.14s

avrdude: 25596 bytes of flash written
avrdude: verifying flash memory against out/klipper.elf.hex:
avrdude: load data flash data from input file out/klipper.elf.hex:
avrdude: input file out/klipper.elf.hex contains 25596 bytes
avrdude: reading on-chip flash data:

Reading | ################################################## | 100% 3.24s

avrdude: verifying ...
avrdude: 25596 bytes of flash verified

avrdude: safemode: Fuses OK (E:FD, H:D8, L:FF)

avrdude done.  Thank you.
```



## 四、配置Fluidd

### 	设置语言

​	打开你的浏览器，在地址栏输入 **http://fluiddpi.local** 。单击左侧一列图标最下方的小齿轮<img src="https://i.loli.net/2021/11/05/79rWkUCfXzpGPhF.png" alt="image-20211105093622714" style="zoom:33%;" />，找到 **"DIsplay Language"**选择**"Chinese"**即可设置中文语言。

### 	打印机属性配置

​	单击左侧一列图标中的<img src="https://i.loli.net/2021/11/05/FiKdyVegDvPpWHm.png" alt="image-20211105094006170" style="zoom:33%;" />打开配置文件目录。

<img src="https://i.loli.net/2021/11/05/VHWmCT17lBxXtpK.png" alt="image-20211105094411796" style="zoom:33%;" />

​	左侧为当前的配置文件，右侧为文件库（左边是你的，右边是Fluidd提供的一些帮助性文件）。在右边的文件库中提供了三类文件，分别是"LOGS"（日志文件）、"DOCS"（技术文档）、"CONFIG_EXAMPLES"（打印机配置示例）。

​	选择**"CONFIG_EXAMPLES"**，搜索你的打印机机型（corexy、delta等等）:

<img src="https://i.loli.net/2021/11/05/YcOQgJohLrmSkWH.png" alt="image-20211105094859409" style="zoom:33%;" />

​	可能会出现多个示例文件，选择看起来最简单的那个，单击文件选择**下载**：

<img src="https://i.loli.net/2021/11/05/1rKhH9y3EbWRxnq.png" alt="image-20211105095016637" style="zoom:33%;" />

​	下载后将文件重命名为 **"printer.cfg"**，接着单机配置文件列表的加号<img src="https://i.loli.net/2021/11/05/V8Yz91cMX2KtQli.png" alt="image-20211105095212190" style="zoom:33%;" />选择**上传**，将修改好名字的cfg文件上传。上传完成后单击printer.cfg选择**编辑**，在打开的网页编辑器中修改下面内容：

1. 找到 [mcu] 开头的段落，将serial后面的内容替换为烧写klipper固件用到的主板连接位置：

```
[mcu]
serial: /dev/serial/by-id/usb-1a86_USB2.0-Serial-if00-port0
```

2. 在文件最后添加下面的内容：

```
[display_status]

[virtual_sdcard]
path: ~/gcode_files

[pause_resume]

[gcode_macro PAUSE]
description: Pause the actual running print
rename_existing: PAUSE_BASE
# change this if you need more or less extrusion
variable_extrude: 1.0
gcode:
  ##### read E from pause macro #####
  {% set E = printer["gcode_macro PAUSE"].extrude|float %}
  ##### set park positon for x and y #####
  # default is your max posion from your printer.cfg
  {% set x_park = printer.toolhead.axis_maximum.x|float - 5.0 %}
  {% set y_park = printer.toolhead.axis_maximum.y|float - 5.0 %}
  ##### calculate save lift position #####
  {% set max_z = printer.toolhead.axis_maximum.z|float %}
  {% set act_z = printer.toolhead.position.z|float %}
  {% if act_z < (max_z - 2.0) %}
      {% set z_safe = 2.0 %}
  {% else %}
      {% set z_safe = max_z - act_z %}
  {% endif %}
  ##### end of definitions #####
  PAUSE_BASE
  G91
  {% if printer.extruder.can_extrude|lower == 'true' %}
    G1 E-{E} F2100
  {% else %}
    {action_respond_info("Extruder not hot enough")}
  {% endif %}
  {% if "xyz" in printer.toolhead.homed_axes %}
    G1 Z{z_safe} F900
    G90
    G1 X{x_park} Y{y_park} F6000
  {% else %}
    {action_respond_info("Printer not homed")}
  {% endif %} 


[gcode_macro RESUME]
description: Resume the actual running print
rename_existing: RESUME_BASE
gcode:
  ##### read E from pause macro #####
  {% set E = printer["gcode_macro PAUSE"].extrude|float %}
  #### get VELOCITY parameter if specified ####
  {% if 'VELOCITY' in params|upper %}
    {% set get_params = ('VELOCITY=' + params.VELOCITY)  %}
  {%else %}
    {% set get_params = "" %}
  {% endif %}
  ##### end of definitions #####
  {% if printer.extruder.can_extrude|lower == 'true' %}
    G91
    G1 E{E} F2100
  {% else %}
    {action_respond_info("Extruder not hot enough")}
  {% endif %}  
  RESUME_BASE {get_params}

[gcode_macro CANCEL_PRINT]
description: Cancel the actual running print
rename_existing: CANCEL_PRINT_BASE
gcode:
  TURN_OFF_HEATERS
  CANCEL_PRINT_BASE
```

::: tip 关于printer.cfg文件

这个是打印机的配置文件，包含了各元件的连接位置、电机速度、脉冲、热床等打印机的所有配置。不同的打印机需要做不同的配置，对于不同的主板还需要专门配置各个元件的连接端口。这是个非常复杂的工作，值得开另一篇博客介绍，本教程是介绍如何安装Klipper与Fluidd的，因此此处不赘述。

具体可以参考[这篇](http://blog.deercloud.site/configure_klipper_firmware)博客。

:::

​	最后单击右上角的<img src="https://i.loli.net/2021/11/05/EcQD4ft3FIRL9OZ.png" alt="image-20211105095947823" style="zoom:33%;" />即可。退出编辑器后，点击左侧图标中的<img src="https://i.loli.net/2021/11/05/XL8JwfCjvGt9cI2.png" alt="image-20211105100139704" style="zoom:33%;" />进入打印机的控制仪表台，依次点击<img src="https://i.loli.net/2021/11/05/8F2aiTCVkxrcAuQ.png" alt="image-20211105100400369" style="zoom:33%;" />与<img src="https://i.loli.net/2021/11/05/noBaeSvdiWygNG5.png" alt="image-20211105100420487" style="zoom:33%;" />，几秒后如果一切正常那么你应该可以看到你的打印机已经能读取到温度了：

![image-20211105100533612](https://i.loli.net/2021/11/05/qahzCwLnB7sd4Rv.png)

