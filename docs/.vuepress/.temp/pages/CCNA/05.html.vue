<template><h2 id="配置静态路由" tabindex="-1"><a class="header-anchor" href="#配置静态路由" aria-hidden="true">#</a> 配置静态路由</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>R1(config)# ip route &lt;目的网段> &lt;目的网段掩码> &lt;下一跳地址>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2>
<p>使下列三个路由器互通<img src="https://s2.loli.net/2022/02/13/vyL38QdYIpe6Dxs.png" alt="image-20220213102544354" loading="lazy"></p>
<h3 id="配置ip" tabindex="-1"><a class="header-anchor" href="#配置ip" aria-hidden="true">#</a> 配置IP</h3>
<h4 id="r1" tabindex="-1"><a class="header-anchor" href="#r1" aria-hidden="true">#</a> R1</h4>
<p><strong>f 0/0 : 192.168.12.1</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>R1# configure terminal
R1(config)# interface fastEthernet 0/0
R1(config-if)# ip address 192.168.12.1 255.255.255.0
R1(config-if)# no shutdown
R1(config-if)# exit
R1(config)#
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h4 id="r2" tabindex="-1"><a class="header-anchor" href="#r2" aria-hidden="true">#</a> R2</h4>
<p><strong>f 0/0 : 192.168.12.2</strong></p>
<p><strong>f 0/1 : 192.168.23.2</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>R2# configure terminal
R2(config)# interface fastEthernet 0/0
R2(config-if)# ip address 192.168.12.2 255.255.255.0
R2(config-if)# no shutdown
R2(config-if)# exit
R2(config)# interface fastEthernet 0/1
R2(config-if)# ip address 192.168.23.2 255.255.255.0
R2(config-if)# no shutdown
R2(config-if)# exit
R2(config)#
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="r3" tabindex="-1"><a class="header-anchor" href="#r3" aria-hidden="true">#</a> R3</h4>
<p><strong>f 0/0 : 192.168.23.3</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>R3# configure terminal
R3(config)# interface fastEthernet 0/0
R3(config-if)# ip address 192.168.23.3 255.255.255.0
R3(config-if)# no shutdown
R3(config-if)# exit
R3(config)#
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="配置路由" tabindex="-1"><a class="header-anchor" href="#配置路由" aria-hidden="true">#</a> 配置路由</h3>
<h4 id="r1-1" tabindex="-1"><a class="header-anchor" href="#r1-1" aria-hidden="true">#</a> R1</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>R1(config)# ip route 192.168.23.0 255.255.255.0 192.168.12.2
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="r3-1" tabindex="-1"><a class="header-anchor" href="#r3-1" aria-hidden="true">#</a> R3</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>R1(config)# ip route 192.168.12.0 255.255.255.0 192.168.23.2
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></template>
