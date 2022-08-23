<template><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h2>
<p>租的云服务器购买了更多的硬盘容量后发现实际使用的容量并没有增加，使用<code>lsblk</code>发现虚拟磁盘空间确实扩大了，只是分区没有自动扩大。</p>
<ul>
<li><strong>输入：</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> lsblk
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul>
<li><strong>输出：</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
loop0    <span class="token number">7</span>:0    <span class="token number">0</span> <span class="token number">55</span>.3M  <span class="token number">1</span> loop /snap/core18/1885
loop1    <span class="token number">7</span>:1    <span class="token number">0</span> <span class="token number">55</span>.4M  <span class="token number">1</span> loop /snap/core18/1997
loop2    <span class="token number">7</span>:2    <span class="token number">0</span> <span class="token number">69</span>.2M  <span class="token number">1</span> loop /snap/lxd/17936
loop3    <span class="token number">7</span>:3    <span class="token number">0</span> <span class="token number">32</span>.3M  <span class="token number">1</span> loop /snap/snapd/11588
loop4    <span class="token number">7</span>:4    <span class="token number">0</span> <span class="token number">69</span>.2M  <span class="token number">1</span> loop /snap/lxd/20309
loop5    <span class="token number">7</span>:5    <span class="token number">0</span> <span class="token number">31</span>.1M  <span class="token number">1</span> loop /snap/snapd/10707
vda    <span class="token number">252</span>:0    <span class="token number">0</span>   60G  <span class="token number">0</span> disk 
├─vda1 <span class="token number">252</span>:1    <span class="token number">0</span>    1M  <span class="token number">0</span> part 
└─vda2 <span class="token number">252</span>:2    <span class="token number">0</span>    5G  <span class="token number">0</span> part /
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>这里的<code>vda</code>即为服务器上连接的虚拟硬盘，下方的<code>vda1</code>和<code>vda2</code>为该硬盘上的两个分区。可以看到我这里硬盘一共有60G的容量，但是仅有一个大小为5G的文件分区。</p>
<p>我接下来就需要对分区<code>vda2</code>进行扩容。</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>请先切换到root账户</p>
</div>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>一定要仔细看清楚指令再操作</p>
</div>
<h2 id="安装工具" tabindex="-1"><a class="header-anchor" href="#安装工具" aria-hidden="true">#</a> 安装工具</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> cloud-guest-utilsapt <span class="token function">install</span> xfsprogs
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="开始扩容" tabindex="-1"><a class="header-anchor" href="#开始扩容" aria-hidden="true">#</a> 开始扩容</h2>
<ul>
<li><strong>命令：</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> growpart <span class="token operator">&lt;</span>DiskName<span class="token operator">></span> <span class="token operator">&lt;</span>PartitionNumber<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>此处共有两个参数，第一个参数是虚拟磁盘的名字，第二个参数是分区编号。</p>
<p>此处我的虚拟磁盘为<code>/dev/vda</code>，我需要扩容的分区为二号分区<code>2</code>，所以我的命令为：</p>
<ul>
<li><strong>输入：</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> growpart /dev/vda <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul>
<li><strong>输出：</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>CHANGED: <span class="token assign-left variable">partition</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">start</span><span class="token operator">=</span><span class="token number">2048</span> old: <span class="token assign-left variable">size</span><span class="token operator">=</span><span class="token number">41940992</span> <span class="token assign-left variable">end</span><span class="token operator">=</span><span class="token number">41943040</span> new: <span class="token assign-left variable">size</span><span class="token operator">=</span><span class="token number">209710462</span>,end<span class="token operator">=</span><span class="token number">209712510</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="更新分区表" tabindex="-1"><a class="header-anchor" href="#更新分区表" aria-hidden="true">#</a> 更新分区表</h2>
<ul>
<li><strong>命令：</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> resize2fs <span class="token operator">&lt;</span>PartitonName<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>&lt;PartitonName&gt;</code>为刚刚扩容的分区的名字，此处我扩容的分区为<code>/dev/vda2</code>：</p>
<ul>
<li><strong>输入：</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> resize2fs /dev/vda2
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>再次使用 <code>lsblk</code> 查看磁盘：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
loop0    <span class="token number">7</span>:0    <span class="token number">0</span> <span class="token number">55</span>.4M  <span class="token number">1</span> loop /snap/core18/1997
loop1    <span class="token number">7</span>:1    <span class="token number">0</span> <span class="token number">32</span>.3M  <span class="token number">1</span> loop /snap/snapd/12159
loop3    <span class="token number">7</span>:3    <span class="token number">0</span> <span class="token number">32</span>.1M  <span class="token number">1</span> loop /snap/snapd/12057
loop4    <span class="token number">7</span>:4    <span class="token number">0</span> <span class="token number">55</span>.4M  <span class="token number">1</span> loop /snap/core18/2066
loop5    <span class="token number">7</span>:5    <span class="token number">0</span> <span class="token number">70</span>.3M  <span class="token number">1</span> loop /snap/lxd/20638
loop6    <span class="token number">7</span>:6    <span class="token number">0</span> <span class="token number">70</span>.3M  <span class="token number">1</span> loop /snap/lxd/20684
vda    <span class="token number">252</span>:0    <span class="token number">0</span>   60G  <span class="token number">0</span> disk
├─vda1 <span class="token number">252</span>:1    <span class="token number">0</span>    1M  <span class="token number">0</span> part
└─vda2 <span class="token number">252</span>:2    <span class="token number">0</span>   60G  <span class="token number">0</span> part /
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>恭喜你，你已经成功扩容了分区。</p>
</template>
