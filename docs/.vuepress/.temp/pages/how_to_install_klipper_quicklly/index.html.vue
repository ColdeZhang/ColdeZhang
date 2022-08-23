<template><div class="custom-container tip"><p class="custom-container-title">简介</p>
<p>本文介绍了如何快速为你的打印机安装Klipper固件与使用其配套的Fluidd网页上位机，尽可能减少了不必要的步骤。</p>
</div>
<!-- more -->
<h2 id="一、下载与准备" tabindex="-1"><a class="header-anchor" href="#一、下载与准备" aria-hidden="true">#</a> 一、下载与准备</h2>
<ol>
<li><a href="https://github.com/fluidd-core/FluiddPI/releases" target="_blank" rel="noopener noreferrer">到这里<ExternalLinkIcon/></a>下载系统镜像<img src="https://s2.loli.net/2022/01/07/RPoG2wjTZuhYIMy.png" alt="image-20220107211402946" style="zoom:33%;" />；</li>
</ol>
<blockquote>
<p>此系统镜像包含了Klipper、Fluidd等所有程序。</p>
</blockquote>
<ol start="2">
<li><a href="https://www.balena.io/etcher/" target="_blank" rel="noopener noreferrer">点击这里<ExternalLinkIcon/></a>下载烧录工具；</li>
</ol>
<blockquote>
<p>用于将系统写入存储卡。</p>
</blockquote>
<ol start="3">
<li>树莓派（建议3B以上）；</li>
</ol>
<blockquote>
<p>没什么好BB的。</p>
</blockquote>
<ol start="4">
<li>不小于8G的tf存储卡；</li>
</ol>
<blockquote>
<p>用于存储系统。</p>
</blockquote>
<ol start="5">
<li>读卡器；</li>
</ol>
<blockquote>
<p>用于将系统写入存储卡。</p>
</blockquote>
<h2 id="二、写入系统镜像" tabindex="-1"><a class="header-anchor" href="#二、写入系统镜像" aria-hidden="true">#</a> 二、写入系统镜像</h2>
<p>​	将第一步中下载好的系统镜像解压，得到img文件。</p>
<p>​	将存储卡插入读卡器，再将读卡器插上电脑。</p>
<p>​	打开Etcher烧录工具：</p>
<img src="https://i.loli.net/2021/11/05/eIS9qk48WaQrjBb.png" alt="image-20211105004452686" style="zoom:50%;" />
<p>​	点击&quot;Flash from file&quot;，选择解压出来的img文件。点击&quot;Select target&quot;，选择存储卡。最后点击&quot;Flash!&quot;，等待软件自动写入系统。</p>
<p>​	重新拔插读卡器，此时你的电脑上应该会出现一个名为&quot;boot&quot;的磁盘。进入这个磁盘，打开名为 <strong>fluiddpi-wpa-supplicant.txt</strong></p>
<p>的文件，找到下面这几行并将对应位置改成你的Wi-Fi名和密码：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>network={
	ssid="WiFi的名称"
	psk="WiFi密码"
}
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>​	记住去掉这四行前面的#号。</p>
<p>​	最后将你的存储卡从读卡器中取出，插入到树莓派，给树莓派通电。</p>
<h2 id="三、编译与烧写klipper固件" tabindex="-1"><a class="header-anchor" href="#三、编译与烧写klipper固件" aria-hidden="true">#</a> 三、编译与烧写klipper固件</h2>
<p>​	将你的打印机主板（我是用的是基础的Ramps主板）连接到树莓派上，然后打开电脑的终端登陆树莓派。</p>
<details class="custom-block details"><summary>MacOS用户</summary>
<p>按下 command + 空格 ，搜索<strong>终端</strong>，直接打开。</p>
</details>
<details class="custom-block details"><summary>Windows用户</summary>
<p>按下 windows + R ，输入<strong>cmd</strong>，回车运行。</p>
</details>
<p>​	在终端中输入：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ssh pi@fluiddpi.local
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	如果出现类似以下的东西，输入<code>yes</code>后回车</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>The authenticity of host '192.168.1.3 (192.168.1.3)' can't be established.
ECDSA key fingerprint is SHA256:owaWDWAdDfUyfBEr9NmMZwOT9ZwIUhmqE.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>​	之后会出现如下提示，输入<code>raspberry</code>然后回车即可登录</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>pi@192.168.1.3's password:
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	登陆成功后依次输入下面的内容，开始编译固件：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cd ~/klipper/
sudo make
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>​	如果make时出现报错，请参考<a href="http://blog.deercloud.site/solutions_of_klipper_make_errors" target="_blank" rel="noopener noreferrer">这篇<ExternalLinkIcon/></a>博客。</p>
<div class="custom-container warning"><p class="custom-container-title">⚠️注意！</p>
<p>在执行第二个命令时会要求再输入一次密码，请再次输入<code>raspberry</code>。</p>
</div>
<div class="custom-container tip"><p class="custom-container-title">如果你的主板不是Ramps</p>
<p>使用其它型号的主板需要先使用<code>make menuconfig</code>命令配置主板的芯片，这是一个很复杂的工作，值得开一篇专门的博客所以这里不赘述。</p>
</div>
<p>​	接下来输入下面这行指令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ls /dev/serial/by-id/*
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	如果你的打印机主板与树莓派是正常连接的那么应该会出现类似于下面的东西：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>/dev/serial/by-id/usb-1a86_USB2.0-Serial-if00-port0
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	后面这段<code>usb-XXXXXXXXXXXXX</code>复制下来，这就是你的主板的连接位置。</p>
<p>​	接下来开始将编译好的固件上传至主板：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo service klipper stop
sudo make flash FLASH_DEVICE=/dev/serial/by-id/usb-1a86_USB2.0-Serial-if00-port0
sudo service klipper start
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">不要忘记将第二行后面的主板连接位置替换成你自己的</p>
</div>
<p>​	等待一堆读条完成后固件就烧录完成了：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>  Flashing out/klipper.elf.hex to /dev/serial/by-id/usb-1a86_USB2.0-Serial-if00-port0 via avrdude

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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h2 id="四、配置fluidd" tabindex="-1"><a class="header-anchor" href="#四、配置fluidd" aria-hidden="true">#</a> 四、配置Fluidd</h2>
<h3 id="设置语言" tabindex="-1"><a class="header-anchor" href="#设置语言" aria-hidden="true">#</a> 设置语言</h3>
<p>​	打开你的浏览器，在地址栏输入 <strong>http://fluiddpi.local</strong> 。单击左侧一列图标最下方的小齿轮<img src="https://i.loli.net/2021/11/05/79rWkUCfXzpGPhF.png" alt="image-20211105093622714" style="zoom:33%;" />，找到 **&quot;DIsplay Language&quot;<strong>选择</strong>&quot;Chinese&quot;**即可设置中文语言。</p>
<h3 id="打印机属性配置" tabindex="-1"><a class="header-anchor" href="#打印机属性配置" aria-hidden="true">#</a> 打印机属性配置</h3>
<p>​	单击左侧一列图标中的<img src="https://i.loli.net/2021/11/05/FiKdyVegDvPpWHm.png" alt="image-20211105094006170" style="zoom:33%;" />打开配置文件目录。</p>
<img src="https://i.loli.net/2021/11/05/VHWmCT17lBxXtpK.png" alt="image-20211105094411796" style="zoom:33%;" />
<p>​	左侧为当前的配置文件，右侧为文件库（左边是你的，右边是Fluidd提供的一些帮助性文件）。在右边的文件库中提供了三类文件，分别是&quot;LOGS&quot;（日志文件）、&quot;DOCS&quot;（技术文档）、&quot;CONFIG_EXAMPLES&quot;（打印机配置示例）。</p>
<p>​	选择**&quot;CONFIG_EXAMPLES&quot;**，搜索你的打印机机型（corexy、delta等等）:</p>
<img src="https://i.loli.net/2021/11/05/YcOQgJohLrmSkWH.png" alt="image-20211105094859409" style="zoom:33%;" />
<p>​	可能会出现多个示例文件，选择看起来最简单的那个，单击文件选择<strong>下载</strong>：</p>
<img src="https://i.loli.net/2021/11/05/1rKhH9y3EbWRxnq.png" alt="image-20211105095016637" style="zoom:33%;" />
<p>​	下载后将文件重命名为 <strong>&quot;printer.cfg&quot;</strong>，接着单机配置文件列表的加号<img src="https://i.loli.net/2021/11/05/V8Yz91cMX2KtQli.png" alt="image-20211105095212190" style="zoom:33%;" />选择<strong>上传</strong>，将修改好名字的cfg文件上传。上传完成后单击printer.cfg选择<strong>编辑</strong>，在打开的网页编辑器中修改下面内容：</p>
<ol>
<li>找到 [mcu] 开头的段落，将serial后面的内容替换为烧写klipper固件用到的主板连接位置：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[mcu]
serial: /dev/serial/by-id/usb-1a86_USB2.0-Serial-if00-port0
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="2">
<li>在文件最后添加下面的内容：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[display_status]

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
  {% if act_z &lt; (max_z - 2.0) %}
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">关于printer.cfg文件</p>
<p>这个是打印机的配置文件，包含了各元件的连接位置、电机速度、脉冲、热床等打印机的所有配置。不同的打印机需要做不同的配置，对于不同的主板还需要专门配置各个元件的连接端口。这是个非常复杂的工作，值得开另一篇博客介绍，本教程是介绍如何安装Klipper与Fluidd的，因此此处不赘述。</p>
<p>具体可以参考<a href="http://blog.deercloud.site/configure_klipper_firmware" target="_blank" rel="noopener noreferrer">这篇<ExternalLinkIcon/></a>博客。</p>
</div>
<p>​	最后单击右上角的<img src="https://i.loli.net/2021/11/05/EcQD4ft3FIRL9OZ.png" alt="image-20211105095947823" style="zoom:33%;" />即可。退出编辑器后，点击左侧图标中的<img src="https://i.loli.net/2021/11/05/XL8JwfCjvGt9cI2.png" alt="image-20211105100139704" style="zoom:33%;" />进入打印机的控制仪表台，依次点击<img src="https://i.loli.net/2021/11/05/8F2aiTCVkxrcAuQ.png" alt="image-20211105100400369" style="zoom:33%;" />与<img src="https://i.loli.net/2021/11/05/noBaeSvdiWygNG5.png" alt="image-20211105100420487" style="zoom:33%;" />，几秒后如果一切正常那么你应该可以看到你的打印机已经能读取到温度了：</p>
<p><img src="https://i.loli.net/2021/11/05/qahzCwLnB7sd4Rv.png" alt="image-20211105100533612" loading="lazy"></p>
</template>
