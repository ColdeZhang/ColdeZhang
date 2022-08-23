<template><div class="custom-container tip"><p class="custom-container-title">简介</p>
<p>本教程内容为如何在一个运行着Ubuntu的服务器上开一个高性能的我的世界服务器。</p>
</div>
<!-- more -->
<h2 id="一、登陆服务器后台" tabindex="-1"><a class="header-anchor" href="#一、登陆服务器后台" aria-hidden="true">#</a> 一、登陆服务器后台</h2>
<ol>
<li>首先打开你电脑上的终端；</li>
</ol>
<details class="custom-block details"><summary>MacOS用户</summary>
<p>按下 command + 空格 ，搜索<strong>终端</strong>，直接打开。</p>
</details>
<details class="custom-block details"><summary>Windows用户</summary>
<p>按下 windows + R ，输入<strong>cmd</strong>，回车运行。</p>
</details>
<ol start="2">
<li>在终端中输入以下指令进行登陆：</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ssh</span> root@<span class="token operator">&lt;</span>你的服务器地址<span class="token operator">></span> -p <span class="token operator">&lt;</span>端口<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote>
<p>这里的服务器地址还有端口详情咨询你的服务器提供商。</p>
</blockquote>
<p>​	如果出现类似以下的东西，输入<code>yes</code>后回车</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>The authenticity of host can't be established.
ECDSA key fingerprint is SHA256:owaVWAdDfUyfBEr9NmMZwOT9ZwIUhmqE.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="3">
<li>然后会出现如下类似提示输入密码，输入服务商给你提供的密码：</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>root@<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>你的服务器地址</span><span class="token punctuation">></span></span>'s password:
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="4">
<li>如果出现类似下面的东西则表明登录成功：</li>
</ol>
<img src="https://i.loli.net/2021/07/28/mpOgEyNeZ2S7zl9.png" alt="image-20210728142358071" style="zoom:33%;" />
<h2 id="二、更新及安装基础软件" tabindex="-1"><a class="header-anchor" href="#二、更新及安装基础软件" aria-hidden="true">#</a> 二、更新及安装基础软件</h2>
<ol>
<li>输入以下命令更新软件：</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">apt</span> update
<span class="token function">apt</span> upgrade -y
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="2">
<li>安装文本编辑器：</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">apt</span> <span class="token function">install</span> micro -y
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="3">
<li>安装运行环境：</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">apt</span> <span class="token function">install</span> nodejs -y
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="4">
<li>安装MC所需java：</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#如果你是运行1.16.5及以下版本，需要安装java8</span>
<span class="token function">apt</span> <span class="token function">install</span> openjdk-8-jdk -y
<span class="token comment">#如果你是运行1.17及以上版本，需要安装java16</span>
<span class="token function">apt</span> <span class="token function">install</span> openjdk-16-jdk -y
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><details class="custom-block details"><summary>我既想运行1.16.5又想运行1.17怎么办？</summary>
<p>建议使用Docker运行服务端。（后面会讲到）</p>
</details>
<h2 id="三、安装网页管理面板" tabindex="-1"><a class="header-anchor" href="#三、安装网页管理面板" aria-hidden="true">#</a> 三、安装网页管理面板</h2>
<ol>
<li>下载网页管理面板：</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> -qO- https://gitee.com/Suwingser/MCSManager-installer/raw/master/install.sh <span class="token operator">|</span> <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="2">
<li>初始化网页面板：</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl start mcsm
systemctl stop mcsm
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ol start="3">
<li>配置管理面板：</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>micro /opt/MCSManager/property.js
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	找到第26行有关端口的设置，将默认的23333修改为你的服务商给你开放的端口之一。</p>
<div class="custom-container warning"><p class="custom-container-title">⚠️注意！</p>
<p>端口的使用具有唯一性，如果这个端口作为控制面板的访问端口那么就不能再用作其他用途了。</p>
</div>
<ol start="4">
<li>启动网页管理面板：</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> systemctl start mcsm
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="5">
<li>如果你不放心还可以使用以下命令查看运行状态：</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> systemctl status mcsm
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	输出类似下面的东西即为正常：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>● mcsm.service - MCSManager
     Loaded: loaded <span class="token punctuation">(</span>/lib/systemd/system/mcsm.service<span class="token punctuation">;</span> disabled<span class="token punctuation">;</span> vendor preset: enabled<span class="token punctuation">)</span>
     Active: active <span class="token punctuation">(</span>running<span class="token punctuation">)</span> since Wed <span class="token number">2021</span>-07-28 <span class="token number">14</span>:49:48 CST<span class="token punctuation">;</span> 15s ago
   Main PID: <span class="token number">202824</span> <span class="token punctuation">(</span>node<span class="token punctuation">)</span>
      Tasks: <span class="token number">11</span> <span class="token punctuation">(</span>limit: <span class="token number">19679</span><span class="token punctuation">)</span>
     Memory: <span class="token number">18</span>.4M
     CGroup: /system.slice/mcsm.service
             └─202824 /usr/bin/node /opt/MCSManager/app.js

Jul <span class="token number">28</span> <span class="token number">14</span>:49:48 LankoData-r6c5m06j node<span class="token punctuation">[</span><span class="token number">202824</span><span class="token punctuation">]</span>: designed <span class="token keyword">for</span> a production environment, as it will leak
Jul <span class="token number">28</span> <span class="token number">14</span>:49:48 LankoData-r6c5m06j node<span class="token punctuation">[</span><span class="token number">202824</span><span class="token punctuation">]</span>: memory, and will not scale past a single process.
Jul <span class="token number">28</span> <span class="token number">14</span>:49:48 LankoData-r6c5m06j node<span class="token punctuation">[</span><span class="token number">202824</span><span class="token punctuation">]</span>: <span class="token punctuation">[</span>07/28 <span class="token number">14</span>:49:48<span class="token punctuation">]</span> <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> OnlineFs - 正在初始化文件管理路由与中间件
Jul <span class="token number">28</span> <span class="token number">14</span>:49:48 LankoData-r6c5m06j node<span class="token punctuation">[</span><span class="token number">202824</span><span class="token punctuation">]</span>: <span class="token punctuation">[</span>07/28 <span class="token number">14</span>:49:48<span class="token punctuation">]</span> <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Module - 正在初始化用户管理模块
Jul <span class="token number">28</span> <span class="token number">14</span>:49:48 LankoData-r6c5m06j node<span class="token punctuation">[</span><span class="token number">202824</span><span class="token punctuation">]</span>: <span class="token punctuation">[</span>07/28 <span class="token number">14</span>:49:48<span class="token punctuation">]</span> <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Module - 正在初始化服务端管理模块
Jul <span class="token number">28</span> <span class="token number">14</span>:49:48 LankoData-r6c5m06j node<span class="token punctuation">[</span><span class="token number">202824</span><span class="token punctuation">]</span>: <span class="token punctuation">[</span>07/28 <span class="token number">14</span>:49:48<span class="token punctuation">]</span> <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Module - 正在初始化计划任务模块
Jul <span class="token number">28</span> <span class="token number">14</span>:49:48 LankoData-r6c5m06j node<span class="token punctuation">[</span><span class="token number">202824</span><span class="token punctuation">]</span>: <span class="token punctuation">[</span>07/28 <span class="token number">14</span>:49:48<span class="token punctuation">]</span> <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> HTTP - HTTP 模块监听: <span class="token punctuation">[</span> http://127.0.0.1:12635 <span class="token punctuation">]</span>
Jul <span class="token number">28</span> <span class="token number">14</span>:49:48 LankoData-r6c5m06j node<span class="token punctuation">[</span><span class="token number">202824</span><span class="token punctuation">]</span>: <span class="token punctuation">[</span>07/28 <span class="token number">14</span>:49:48<span class="token punctuation">]</span> <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 配置文件: property.js 文件
Jul <span class="token number">28</span> <span class="token number">14</span>:49:48 LankoData-r6c5m06j node<span class="token punctuation">[</span><span class="token number">202824</span><span class="token punctuation">]</span>: <span class="token punctuation">[</span>07/28 <span class="token number">14</span>:49:48<span class="token punctuation">]</span> <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 文档参阅: https://github.com/suwings/mcsmanager
Jul <span class="token number">28</span> <span class="token number">14</span>:49:48 LankoData-r6c5m06j node<span class="token punctuation">[</span><span class="token number">202824</span><span class="token punctuation">]</span>: <span class="token punctuation">[</span>07/28 <span class="token number">14</span>:49:48<span class="token punctuation">]</span> <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> 控制面板已经启动
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><ol start="6">
<li>访问链接进行测试，格式为<code>&lt;你的服务器地址&gt;:&lt;刚刚设置的端口&gt;</code>，默认登录账号是<code>#master</code>，密码是<code>123456</code>。</li>
</ol>
<div class="custom-container warning"><p class="custom-container-title">⚠️注意！</p>
<p>登录进去后务必修改密码</p>
</div>
<h2 id="四、创建服务器" tabindex="-1"><a class="header-anchor" href="#四、创建服务器" aria-hidden="true">#</a> 四、创建服务器</h2>
<ol>
<li>
<p>点击左侧“服务端管理”<img src="https://i.loli.net/2021/07/28/tGCTEAIU7Fu4Lqi.png" alt="image-20210728151411665" style="zoom:25%;" />，然后点击上方“创建新实例应用”<img src="https://i.loli.net/2021/07/28/kfWrGvAMHuwLXdl.png" alt="image-20210728151517007" style="zoom:25%;" />；</p>
</li>
<li>
<p>选择“引导创建”；</p>
</li>
</ol>
<img src="https://i.loli.net/2021/07/28/oIHP4nGkELuXfwK.png" alt="image-20210728151632836" style="zoom:50%;" />
<ol start="3">
<li>设置服务器的名称（自定义），上传服务器核心；</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>如果你有整合包，那么可以忽略上传核心这一步，创建完成后使用“文件管理”上传你的整合包。（下一节）</p>
</div>
<ol start="4">
<li>你还可以设置服务器的最大内存，与初始内存，如果你不懂这是什么你可以不填写，系统会自动选择最佳配置；</li>
<li>进入你刚刚创建的服务器，点击“开启服务器”<img src="https://i.loli.net/2021/07/28/R7o8MAEejqCcOGh.png" alt="image-20210728152213625" style="zoom:25%;" />，等待服务器初始化；</li>
<li>大约一两分钟后关闭服务器，点击“server.properties配置文件”<img src="https://i.loli.net/2021/07/28/cCakL6dzxi7p1JH.png" alt="image-20210728152343042" style="zoom:25%;" />，进入后将你的服务器端口修改为服务商给你提供的可用端口号；</li>
<li>如果你的玩家没有购买正版我的世界，请务必将“（在线）正版验证”的值修改为<code>false</code>；</li>
<li>返回上一个界面，再次点击“开启服务器”，现在你的服务器应该能够正常运行了，连接地址为<code>&lt;你的服务器地址&gt;:&lt;刚刚设置的端口&gt;</code>；</li>
</ol>
<h2 id="五、使用整合包创建" tabindex="-1"><a class="header-anchor" href="#五、使用整合包创建" aria-hidden="true">#</a> 五、使用整合包创建</h2>
<ol>
<li>
<p>点击左侧“服务端管理”<img src="https://i.loli.net/2021/07/28/tGCTEAIU7Fu4Lqi.png" alt="image-20210728151411665" style="zoom:25%;" />，然后点击上方“创建新实例应用”<img src="https://i.loli.net/2021/07/28/kfWrGvAMHuwLXdl.png" alt="image-20210728151517007" style="zoom:25%;" />；</p>
</li>
<li>
<p>选择“快速创建”；</p>
</li>
</ol>
<img src="https://i.loli.net/2021/07/28/kZ4oG3UFwblqiWN.png" alt="image-20210728153202961" style="zoom:50%;" />
<ol start="3">
<li>设置服务器的名称（自定义）；</li>
<li>设置服务端核心的文件名，然后点击创建服务器；</li>
</ol>
<details class="custom-block details"><summary>核心的文件名是什么？</summary>
<p>打开你的服务端整合包，找到一个以.jar结尾的文件。这个文件就是你的服务端核心，把这个文件的名字复制到服务端文件名处（结尾的.jar也需要复制过去）。</p>
</details>
<ol start="5">
<li>然后点击左侧的&quot;文件管理&quot;<img src="https://i.loli.net/2021/07/28/32tqENeKPzy9cOF.png" alt="image-20210728153728974" style="zoom:25%;" />，选择刚刚创建的服务器；</li>
<li>点击左侧的“上传文件”<img src="https://i.loli.net/2021/07/28/hSlHUBPrcLaAKzn.png" alt="image-20210728153856569" style="zoom:25%;" />将你的服务端整合包上传到服务器；</li>
</ol>
<div class="custom-container warning"><p class="custom-container-title">⚠️注意！</p>
<p>这里整合包必须要是zip压缩格式，建议使用Windows或Mac自带的压缩方式压缩。</p>
</div>
<ol start="7">
<li>等待上传完成后在文件列表中选中刚刚上传的整合包，点击左侧的“解压ZIP”<img src="https://i.loli.net/2021/07/28/jDRNKUWAu5HQit3.png" alt="image-20210728154114785" style="zoom:25%;" />，等待解压完成；</li>
<li>之后便可以回到控制界面启动服务器了；</li>
</ol>
<h2 id="六、使用docker运行服务端" tabindex="-1"><a class="header-anchor" href="#六、使用docker运行服务端" aria-hidden="true">#</a> 六、使用Docker运行服务端</h2>
<ol>
<li>进入面板的服务端管理，点击创建Docker镜像<img src="https://s2.loli.net/2021/12/26/bxl4eR5dsKnVkz6.png" alt="image-20211226192739216" style="zoom:33%;" />；</li>
<li>在进入的页面中有下面这段东西，第一行的数字“8”代表默认创建的是java8环境，手动将其修改为你需要使用的java版本：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>FROM openjdk:8
RUN mkdir -p /mcsd
RUN echo "Asia/Shanghai" > /etc/timezone;dpkg-reconfigure -f noninteractive tzdata
WORKDIR /mcsd
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="3">
<li>下方有一个“Docker镜像名”，自己写一个好记的（我这里以创建java12为例）；</li>
</ol>
<img src="https://s2.loli.net/2022/03/14/gncIKl6efMDdNtC.png" alt="image-20211226193217810" style="zoom:50%;" />
<ol>
<li>然后点击下方的创建Docker镜像<img src="https://s2.loli.net/2021/12/26/7SdmHAsLkbgwVxy.png" alt="image-20211226193440851" style="zoom:33%;" />，确认无误后可以在任务结果列表查看<img src="https://s2.loli.net/2021/12/26/mzYRpoZjSycs3vC.png" alt="image-20211226193524404" style="zoom:33%;" />，由于需要下载一些文件所以需要等一会儿;</li>
<li>之后回到服务端管理，点击你服务器的参数<img src="https://s2.loli.net/2021/12/26/j8D73SGomOtrsuc.png" alt="image-20211226195744813" style="zoom:50%;" />，再点击最下方的Docker配置<img src="https://s2.loli.net/2021/12/26/KzpTZDG2RB7NHve.png" alt="image-20211226195810362" style="zoom:50%;" />。勾选启用docker，【镜像名】填写你刚刚创建的docker镜像名。在【端口限制】中填写“25565:25565”即可，此意是开放 25565 端口。冒号两边一般情况下保持一致即可。</li>
</ol>
<h2 id="如果实在不会你也可以考虑我的付费服务💰" tabindex="-1"><a class="header-anchor" href="#如果实在不会你也可以考虑我的付费服务💰" aria-hidden="true">#</a> 如果实在不会你也可以考虑我的<a href="https://wpa.qq.com/msgrd?v=3&amp;uin=2751268851&amp;site=qq&amp;menu=yes" target="_blank" rel="noopener noreferrer">付费服务💰<ExternalLinkIcon/></a></h2>
</template>
