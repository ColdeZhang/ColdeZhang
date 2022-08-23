<template><div class="custom-container tip"><p class="custom-container-title">简介</p>
<p>本教程以点亮一个LED灯为例的，从0开始指导如何在Arduino环境下编写基于Esp8266硬件的Apple Homekit教程。</p>
</div>
<!-- more -->
<h2 id="_0x0-快速入门" tabindex="-1"><a class="header-anchor" href="#_0x0-快速入门" aria-hidden="true">#</a> 0x0 快速入门</h2>
<p>以点亮一个LED灯为例的，完全新手的简易使用方法：</p>
<h3 id="一、环境搭建" tabindex="-1"><a class="header-anchor" href="#一、环境搭建" aria-hidden="true">#</a> 一、环境搭建</h3>
<p>1.前往<a href="https://www.arduino.cc" target="_blank" rel="noopener noreferrer">Arduino官网<ExternalLinkIcon/></a>下载对应自己系统班的<a href="https://www.arduino.cc/en/software" target="_blank" rel="noopener noreferrer">Arduino IDE<ExternalLinkIcon/></a>（Windows用户可以前往<a href="https://www.microsoft.com/zh-cn/p/arduino-ide/9nblggh4rsd8" target="_blank" rel="noopener noreferrer">应用商店<ExternalLinkIcon/></a>下载）并安装。</p>
<p>2.打开Arduino，Windows用户点击“文件”&gt;“首选项”，Mac用户点击左上角“Arduino”&gt;“Preference”。</p>
<img src="https://i.loli.net/2021/04/24/MWrxlJZFi4c9Xuh.png" alt="image-20210303171759207" style="zoom: 50%;" />
<p>3.在“附加开发板管理器网址”一栏填上：</p>
<blockquote>
<p>https://arduino.esp8266.com/stable/package_esp8266com_index.json</p>
</blockquote>
<img src="https://i.loli.net/2021/04/24/Aq7T1UCjwM8e5K4.png" alt="image-20210303171849958" style="zoom:33%;" />
<p>4.关闭窗口，打开“工具”&gt;“开发版”&gt;“开发版管理器”</p>
<img src="https://i.loli.net/2021/04/24/M6YvC2IVoUBFybO.png" alt="image-20210303172359306" style="zoom:50%;" />
<p>5.搜索“esp8266”并安装（文件较大，国内安装速度很慢且容易失败，多尝试几次即可）</p>
<img src="https://i.loli.net/2021/04/24/5HvyxTk4IAUqGOW.png" alt="image-20210303174754999" style="zoom:50%;" />
<p>6.关闭窗口，打开“工具”&gt;“管理库...”</p>
<img src="https://i.loli.net/2021/04/24/pBnxL9S8G3hDoUq.png" alt="image-20210303174922691" style="zoom: 50%;" />
<p>7.搜索“homekit”，安装“HomeKit-ESP8266”</p>
<img src="https://i.loli.net/2021/04/24/EZOgIYW2qy4sLwb.png" alt="image-20210303175023078" style="zoom:50%;" />
<h3 id="二、硬件链接" tabindex="-1"><a class="header-anchor" href="#二、硬件链接" aria-hidden="true">#</a> 二、硬件链接</h3>
<p>将LED的正极（长的那端）连接在Esp8266开发板的IO2口上，负极（短的那端）连接在GND上。</p>
<h3 id="三、代码修改" tabindex="-1"><a class="header-anchor" href="#三、代码修改" aria-hidden="true">#</a> 三、代码修改</h3>
<p>从此处<a href="https://github.com/ColdeZhang/Esp8266_Homekit_Template/releases/download/Template/Template.zip" target="_blank" rel="noopener noreferrer">下载Template代码<ExternalLinkIcon/></a>解压后一共有三个文件。使用Arduino打开<code>Template.ino</code>，另外两个文件会自动被打开。</p>
<h4 id="_1-my-accessory-c" tabindex="-1"><a class="header-anchor" href="#_1-my-accessory-c" aria-hidden="true">#</a> 1.my_accessory.c</h4>
<hr>
<p>（1）创建变量</p>
<p>找到以下行：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token class-name">homrkit_characteristic_t</span> <span class="token comment">/*变量名*/</span> <span class="token operator">=</span> <span class="token function">HOMEKIT_CHARACTERISTIC_</span><span class="token punctuation">(</span><span class="token comment">/*变量类型*/</span><span class="token punctuation">,</span><span class="token comment">/*变量初始值*/</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>修改<code>/*变量名*/</code>为<code>cha_on</code>，修改<code>/*变量类型*/</code>为<code>ON</code>，修改<code>/*变量初始值*/</code>为<code>false</code>，修改完成后应该是这个样子：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token class-name">homrkit_characteristic_t</span> cha_on <span class="token operator">=</span> <span class="token function">HOMEKIT_CHARACTERISTIC_</span><span class="token punctuation">(</span>ON<span class="token punctuation">,</span> false<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><hr>
<p>（2）配置信息</p>
<p>找到以下代码：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">HOMEKIT_ACCESSORY</span><span class="token punctuation">(</span><span class="token punctuation">.</span>id<span class="token operator">=</span><span class="token comment">/*编号*/</span><span class="token punctuation">,</span> <span class="token punctuation">.</span>category<span class="token operator">=</span>homekit_accessory_category_<span class="token comment">/*种类*/</span><span class="token punctuation">,</span> <span class="token punctuation">.</span>services<span class="token operator">=</span><span class="token punctuation">(</span><span class="token class-name">homekit_service_t</span><span class="token operator">*</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>修改<code>/*编号*/</code>为<code>1</code>，<code>/*种类*/</code>为<code>switch</code>，修改完后应该是这个样子：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">HOMEKIT_ACCESSORY</span><span class="token punctuation">(</span><span class="token punctuation">.</span>id<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">.</span>category<span class="token operator">=</span>homekit_accessory_category_switch<span class="token punctuation">,</span> <span class="token punctuation">.</span>services<span class="token operator">=</span><span class="token punctuation">(</span><span class="token class-name">homekit_service_t</span><span class="token operator">*</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><hr>
<p>（3）服务设置</p>
<p>找到以下代码：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">HOMEKIT_SERVICE</span><span class="token punctuation">(</span><span class="token comment">/*服务名*/</span><span class="token punctuation">,</span> <span class="token punctuation">.</span>primary<span class="token operator">=</span><span class="token comment">/*是否为主服务*/</span><span class="token punctuation">,</span> <span class="token punctuation">.</span>characteristics<span class="token operator">=</span><span class="token punctuation">(</span><span class="token class-name">homekit_characteristic_t</span><span class="token operator">*</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token operator">&amp;</span><span class="token comment">/*变量名*/</span><span class="token punctuation">,</span>
	<span class="token constant">NULL</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>修改<code>/*服务名*/</code>为<code>SWITCH</code>，修改<code>/*是否为主服务*/</code>为<code>true</code>，修改<code>/*变量名*/</code>为<code>cha_on</code>，修改完后应该是这个样子：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">HOMEKIT_SERVICE</span><span class="token punctuation">(</span>SWITCH<span class="token punctuation">,</span> <span class="token punctuation">.</span>primary<span class="token operator">=</span>true<span class="token punctuation">,</span> <span class="token punctuation">.</span>characteristics<span class="token operator">=</span><span class="token punctuation">(</span><span class="token class-name">homekit_characteristic_t</span><span class="token operator">*</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token operator">&amp;</span>cha_on<span class="token punctuation">,</span>
	<span class="token constant">NULL</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="_2-wifi-info-h" tabindex="-1"><a class="header-anchor" href="#_2-wifi-info-h" aria-hidden="true">#</a> 2.wifi_info.h</h4>
<p>找到如下两行：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>ssid <span class="token operator">=</span> <span class="token string">"Your-Wifi-Name"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>password <span class="token operator">=</span> <span class="token string">"Your-Wifi-Password"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>将第一行引号之间的<code>Your-Wifi-Name</code>替换为你的Wifi名称（区分大小写）。</p>
<p>在第二行引号之间的<code>Your-Wifi-Password</code>替换为你的Wifi密码。</p>
<h4 id="_3-template-ino" tabindex="-1"><a class="header-anchor" href="#_3-template-ino" aria-hidden="true">#</a> 3.Template.ino</h4>
<hr>
<p>（1）定义引脚与触发器</p>
<p>在your_setup内添加：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">pinMode</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> OUTPUT<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">digitalWrite</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> HIGH<span class="token punctuation">)</span><span class="token punctuation">;</span>
cha_on<span class="token punctuation">.</span>setter <span class="token operator">=</span> cha_on_setter<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><hr>
<p>（2）设置触发器：</p>
<p>在最末尾添加如下代码：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">void</span> <span class="token function">cha_on_setter</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token class-name">homekit_value_t</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  bool on <span class="token operator">=</span> value<span class="token punctuation">.</span>bool_value<span class="token punctuation">;</span>
  cha_on<span class="token punctuation">.</span>value<span class="token punctuation">.</span>bool_value <span class="token operator">=</span> on<span class="token punctuation">;</span>
  <span class="token function">PRTLOG</span><span class="token punctuation">(</span><span class="token string">"开关状态: %s"</span><span class="token punctuation">,</span> on <span class="token operator">?</span> <span class="token string">"开"</span> <span class="token operator">:</span> <span class="token string">"O关"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token function">digitalWrite</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> on <span class="token operator">?</span> HIGH <span class="token operator">:</span> LOW<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="四、上传程序" tabindex="-1"><a class="header-anchor" href="#四、上传程序" aria-hidden="true">#</a> 四、上传程序</h3>
<p>打开Arduino，点击菜单栏中的“工具”，选择“开发板”&gt;“ESP8266 Boards”&gt;“Generic ESP8266 Module”。</p>
<p>再次点击菜单栏中的“工具”可以观察到相比于之前多出了一些选项，其中一些项目修改成如下内容：</p>
<ul>
<li>LwIP Variant: <code>v2 Lower Memory</code></li>
<li>Debug Level: <code>无</code></li>
<li>Espressif FW: <code>nonos-sdk 2.2.1+119(191122)</code></li>
<li>SSL Support: <code>Basic SSL ciphers (lower ROM use)</code></li>
<li>VTables: <code>Flash</code></li>
<li>Erase Flash:  <code>All Flash Contents</code></li>
<li>CPU Frequency: <code>160MHz</code></li>
</ul>
<p>修改完成后“工具”菜单应该如图所示：</p>
<img src="https://i.loli.net/2021/04/24/i4dLHSv6VzytaAP.png" alt="image-20210304181500770" style="zoom: 33%;" />
<p>最后将你的ESP8266开发板连接至电脑，再在“工具”菜单内选择正确的端口（一般情况下唯一），点击上传按钮<img src="https://i.loli.net/2021/04/24/vkAlZI49XCJWwn6.png" alt="image-20210314124254513" style="zoom:35%;" />等待程序上传。</p>
<h3 id="五、连接验证" tabindex="-1"><a class="header-anchor" href="#五、连接验证" aria-hidden="true">#</a> 五、连接验证</h3>
<ol>
<li>确保你的手机与ESP8266处于同一Wifi内；</li>
<li>打开家庭（Home）App<img src="https://i.loli.net/2021/04/24/RlGWSnAjpPBgo4x.png" style="zoom:25%;" />，点击右上角加号，点击“添加或扫描配件”<img src="https://i.loli.net/2021/04/24/Y4WmhiGjkNTIweq.png" style="zoom:20%;" />；</li>
<li>点击最下方的“我没有或无法扫描代码”，如果一切正常那么此时应该会出现配件的图标<img src="https://i.loli.net/2021/04/24/k1l8XbzYo4CVPqp.jpg" style="zoom:20%;" />；</li>
<li>点击配件的图标，会提示“未认证配件”的警告<img src="https://i.loli.net/2021/04/24/c8N4XWgOEdvSoFL.jpg" style="zoom:20%;" />选择“仍然添加”；</li>
<li>输入代码“11111111”（八个1），稍等一会儿即可配对成功；</li>
</ol>
<h2 id="_0x1-进一步学习" tabindex="-1"><a class="header-anchor" href="#_0x1-进一步学习" aria-hidden="true">#</a> 0x1 进一步学习</h2>
<blockquote>
<p>Apple官方文档：<a href="https://github.com/ColdeZhang/Esp8266_Homekit_Template/raw/main/HAP-Specification-Non-Commercial-Version.pdf" target="_blank" rel="noopener noreferrer">下载<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="一、名词定义" tabindex="-1"><a class="header-anchor" href="#一、名词定义" aria-hidden="true">#</a> 一、名词定义</h3>
<h4 id="_1-配件-accessories" tabindex="-1"><a class="header-anchor" href="#_1-配件-accessories" aria-hidden="true">#</a> 1.配件（Accessories）</h4>
<p>官方文档（2.3.1）解释：</p>
<blockquote>
<p>Accessories are comprised of services and characteristics. An example of an accessory is a ceiling fan with a light and a mister that sprays cool water.</p>
</blockquote>
<p>并非是指硬件，而是一个概念（一个配件在HomeApp上就是一个开关之类的）。所以可以在同一个硬件上可以配置多个配件（比方带有温度检测功能的电风扇），但是除非有特殊需求（比方带有温度检测功能的电风扇），否则一般情况下不建议将许多配件揉杂在一个硬件上。</p>
<h4 id="_2-服务-services" tabindex="-1"><a class="header-anchor" href="#_2-服务-services" aria-hidden="true">#</a> 2.服务（Services）</h4>
<p>官方文档（2.3.2）解释：</p>
<blockquote>
<p>Services group functionality in order to provide context. In the aforementioned example accessory there are three services: a fan service to interact with the ceiling fan, a light service to interact with the light, and a mister service to interact with the spray mister.</p>
</blockquote>
<p>服务定义了一个配件的实际功能，比方同样是属于开关（Switch）类别（Category）的配件，除了具有开关的基本（必须）功能，对于电风扇而言他可以具有调速的功能，对于电灯而言他可以有调整亮度或者颜色的功能。</p>
<h4 id="_3-特征-characteristics" tabindex="-1"><a class="header-anchor" href="#_3-特征-characteristics" aria-hidden="true">#</a> 3.特征（Characteristics）</h4>
<p>官方文档（2.3.3）解释：</p>
<blockquote>
<p>A characteristic is a feature that represents data or an associated behavior of a service. The characteristic is defined by a universally unique type, and has additional properties that determine how the value of the characteristic can be accessed.</p>
</blockquote>
<p>特征在固件中也可以看作是变量，不同的服务要求有不同类型的特征（变量）。</p>
<h3 id="二、定义一个完整的配件" tabindex="-1"><a class="header-anchor" href="#二、定义一个完整的配件" aria-hidden="true">#</a> 二、定义一个完整的配件</h3>
<p>一个完整的配件（Accessory）由若干个服务（Service）组成，其中必须包含一个“配件信息服务”（ACCESSORY_INFORMATION）与一个主服务（Primary Service），而主服务包含了若干的特征（Characteristic），并且分为必须（required）与可选（optional）。</p>
<h3 id="三、程序结构" tabindex="-1"><a class="header-anchor" href="#三、程序结构" aria-hidden="true">#</a> 三、程序结构</h3>
<p>完整的固件程序由三个文件构成：</p>
<h4 id="_1-template-ino" tabindex="-1"><a class="header-anchor" href="#_1-template-ino" aria-hidden="true">#</a> 1.template.ino</h4>
<p>该文件为主程序，用于发送接收处理数据、操作IO口等等。</p>
<h4 id="_2-my-accessory-c" tabindex="-1"><a class="header-anchor" href="#_2-my-accessory-c" aria-hidden="true">#</a> 2.my_accessory.c</h4>
<p>该文件用于定义配件的属性。</p>
<h4 id="_3-wifi-info-h" tabindex="-1"><a class="header-anchor" href="#_3-wifi-info-h" aria-hidden="true">#</a> 3.wifi_info.h</h4>
<p>该文件专用于配置、保存与处理wifi的连接与方法。</p>
<h2 id="_0x2-设置一个传感器" tabindex="-1"><a class="header-anchor" href="#_0x2-设置一个传感器" aria-hidden="true">#</a> 0x2 设置一个传感器</h2>
<p>待补充</p>
</template>
