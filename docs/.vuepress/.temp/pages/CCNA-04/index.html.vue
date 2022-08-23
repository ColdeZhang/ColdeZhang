<template><h2 id="常用指令" tabindex="-1"><a class="header-anchor" href="#常用指令" aria-hidden="true">#</a> 常用指令</h2>
<h3 id="进入特权模式" tabindex="-1"><a class="header-anchor" href="#进入特权模式" aria-hidden="true">#</a> 进入特权模式</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Router>enable
Router# 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="进入全局配置" tabindex="-1"><a class="header-anchor" href="#进入全局配置" aria-hidden="true">#</a> 进入全局配置</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Router# configure terminal
Router(config)#
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="查看ip设备" tabindex="-1"><a class="header-anchor" href="#查看ip设备" aria-hidden="true">#</a> 查看ip设备</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Router# show ip interface brief
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="查看路由表" tabindex="-1"><a class="header-anchor" href="#查看路由表" aria-hidden="true">#</a> 查看路由表</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Router# show ip route
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="配置ip" tabindex="-1"><a class="header-anchor" href="#配置ip" aria-hidden="true">#</a> 配置IP</h2>
<h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例：</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Router# configure terminal
Router(config)# interface &lt;接口类型> &lt;接口编号>
Router(config-if)# ip address &lt;IP地址> &lt;掩码>
Router(config-if)# no shutdown
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤" aria-hidden="true">#</a> 步骤：</h3>
<ol>
<li>进入全局配置；</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Router# configure terminal
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="2">
<li>进入要配置的接口（以fastEthernet 0/0为例）；</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Router(config)# interface fastEthernet 0/0
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="3">
<li>配置IP；</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Router(config-if)# ip address 192.168.12.1 255.255.255.0
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></template>
