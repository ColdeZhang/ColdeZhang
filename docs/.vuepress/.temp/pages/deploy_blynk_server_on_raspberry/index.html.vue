<template><h2 id="_1-安装java" tabindex="-1"><a class="header-anchor" href="#_1-安装java" aria-hidden="true">#</a> 1.安装Java</h2>
<p>​	首先更新apt</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> update
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	再更新apt-get</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> update
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	运行以下命令在您的Raspberry Pi上安装OpenJDK 11 JDK</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> default-jdk
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	安装完成后，通过检查Java版本进行验证：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>java -version
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	输出应如下所示：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>openjdk version <span class="token string">"11.0.5"</span> <span class="token number">2019</span>-10-15
OpenJDK Runtime Environment <span class="token punctuation">(</span>build <span class="token number">11.0</span>.5+10-post-Raspbian-1deb10u1<span class="token punctuation">)</span>
OpenJDK Server VM <span class="token punctuation">(</span>build <span class="token number">11.0</span>.5+10-post-Raspbian-1deb10u1, mixed mode<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="_2-将打包文件clone到本地" tabindex="-1"><a class="header-anchor" href="#_2-将打包文件clone到本地" aria-hidden="true">#</a> 2.将打包文件clone到本地</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone git://github.com/ColdeZhang/Deer-Blynk-Server-Packed.git
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_3-启动服务" tabindex="-1"><a class="header-anchor" href="#_3-启动服务" aria-hidden="true">#</a> 3.启动服务</h2>
<p>​	进入目录</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> Deer-Blynk-Server-Packed
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	运行快捷方式</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">sh</span> start-blynk-server.sh
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_4-进入后台" tabindex="-1"><a class="header-anchor" href="#_4-进入后台" aria-hidden="true">#</a> 4.进入后台</h2>
<p>​	浏览器地址栏输入：</p>
<blockquote>
<p>https://[树莓派的IP]:9443/admin</p>
</blockquote>
<p>​	登陆邮箱：admin@deer.com</p>
<p>​	登陆密码：admin</p>
<h2 id="_5-app连接" tabindex="-1"><a class="header-anchor" href="#_5-app连接" aria-hidden="true">#</a> 5.APP连接</h2>
<ul>
<li>打开APP</li>
<li>选择 Create New Account</li>
<li>选择 Custom</li>
</ul>
<p>IP address输入：<code>自己树莓派IP</code>
Port输入：<code>9443</code></p>
</template>
