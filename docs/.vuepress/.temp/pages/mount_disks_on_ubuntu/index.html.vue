<template><h2 id="事件背景" tabindex="-1"><a class="header-anchor" href="#事件背景" aria-hidden="true">#</a> 事件背景</h2>
<p>最近租了一个VPS打算和小伙伴联机玩耍MC。在控制台一键安装了Ubuntu系统后使用SSH登陆，一顿行云流水般的熟练配置后服务器就开好了。因为安装了卫星地图插件（Dynmap），为了能加快<a href="https://mc.deercloud.site/map/" target="_blank" rel="noopener noreferrer">网页端卫星地图<ExternalLinkIcon/></a>的渲染速度我进游戏后直接打开了全局渲染模式，然后挂机等待渲染。
大约三十分钟后，服务器后台突然开始不断打印错误信息，提示文件写入失败。</p>
<h2 id="问题排查" tabindex="-1"><a class="header-anchor" href="#问题排查" aria-hidden="true">#</a> 问题排查</h2>
<p>因为购买VPS时配置选的60G硬盘，起初我并没有向着磁盘空间不足的方向去思考，以为是权限组的问题，便尝试通过终端在后台添加新的权限组。令我意想不到的是连终端也提示写入文件失败，切换至root账户后问题依旧没有得到解决。</p>
<p>使用状态检视工具后发现我的主目录空间大小居然只有5G！使用<code>lsblk</code>命令查看分区信息，发现硬盘确实是60G的硬盘，但是硬盘分区仅仅有一个5G大小的分区。</p>
<h2 id="解决问题" tabindex="-1"><a class="header-anchor" href="#解决问题" aria-hidden="true">#</a> 解决问题</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>请先切换到root账户</p>
</div>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>一定要仔细看清楚指令再操作</p>
</div>
<hr>
<h3 id="定位目标磁盘" tabindex="-1"><a class="header-anchor" href="#定位目标磁盘" aria-hidden="true">#</a> 定位目标磁盘</h3>
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>这里的<code>vda</code>即为服务器上连接的硬盘，下方的<code>vda1</code>和<code>vda2</code>为该硬盘上的两个分区。可以看到我这里硬盘一共有60G的容量，但是仅有一个大小为5G的文件分区。</p>
<p>我接下来就需要对磁盘<code>vda</code>新增分区。</p>
<hr>
<h3 id="创建分区" tabindex="-1"><a class="header-anchor" href="#创建分区" aria-hidden="true">#</a> 创建分区</h3>
<h4 id="_1-进入fdisk" tabindex="-1"><a class="header-anchor" href="#_1-进入fdisk" aria-hidden="true">#</a> 1. 进入<code>fdisk</code></h4>
<ul>
<li><strong>命令：</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">fdisk</span> /dev/<span class="token operator">&lt;</span>your_disk<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>我的硬盘是<code>vda</code>，所以<code>&lt;your_disk&gt;</code>处替换为<code>vda</code>。如果一切正确，接下来会进入fdisk命令界面。</p>
<ul>
<li><strong>输入：</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">fdisk</span> /dev/vda
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul>
<li><strong>输出：</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Welcome to <span class="token function">fdisk</span> <span class="token punctuation">(</span>util-linux <span class="token number">2.36</span><span class="token punctuation">)</span>.
Changes will remain <span class="token keyword">in</span> memory only, <span class="token keyword">until</span> you decide to <span class="token function">write</span> them.
Be careful before using the <span class="token function">write</span> command.


Command <span class="token punctuation">(</span>m <span class="token keyword">for</span> <span class="token builtin class-name">help</span><span class="token punctuation">)</span>: 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><blockquote>
<p>可以输入<code>m</code>查看帮助。</p>
</blockquote>
<h4 id="_2-创建分区" tabindex="-1"><a class="header-anchor" href="#_2-创建分区" aria-hidden="true">#</a> 2. 创建分区</h4>
<p>输入<code>n</code>创建分区，接下来会要求你输入分区名（号）。因为该磁盘下已经有了<code>vda1</code>和<code>vda2</code>两个分区，所以系统会提示范围为 3-128 ，默认为 3。</p>
<ul>
<li><strong>输入：</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>n
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul>
<li><strong>输出：</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Partition number <span class="token punctuation">(</span><span class="token number">3</span>-128, default <span class="token number">3</span><span class="token punctuation">)</span>: 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>直接按回车可使用默认值（推荐使用默认值），接下来会要求输入新分区的第一个扇区编号。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>First sector <span class="token punctuation">(</span><span class="token number">34</span>-2047, default <span class="token number">34</span><span class="token punctuation">)</span>: 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>默认值为紧接着上一个分区的最后一个扇区，这里直接按回车使用默认值。接下来会要求输入新分区的结束扇区编号。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Last sector, +/-sectors or +/-size<span class="token punctuation">{</span>K,M,G,T,P<span class="token punctuation">}</span> <span class="token punctuation">(</span><span class="token number">34</span>-2047, default <span class="token number">2047</span><span class="token punctuation">)</span>: 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>默认值为该硬盘的最后一个扇区，即为可以分区的最大大小。如果你不想使用全部的空间（比如一会儿需要再分一个区），可以简单进行一下计算，输入自己需要的值。我这里使用默认值直接回车，如果一切正常会提示你已经成功创建了一个新的分区。</p>
<details class="custom-block details"><summary>分区大小计算</summary>
<ol>
<li>用<code>总硬盘大小</code>除以<code>总扇区数</code>得到<code>每个扇区的容量大小</code>；</li>
<li>用你<code>需要的容量</code>除以<code>每个扇区的容量大小</code>得到你<code>需要的扇区数量</code>；</li>
<li>用<code>新分区的第一个扇区编号</code>加上你<code>需要的扇区数量</code>即可得到你需要的<code>最后一个扇区编号</code></li>
</ol>
</details>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Created a new partition <span class="token number">3</span> of <span class="token builtin class-name">type</span> <span class="token string">'Linux filesystem'</span> and of size 55GB.

Command <span class="token punctuation">(</span>m <span class="token keyword">for</span> <span class="token builtin class-name">help</span><span class="token punctuation">)</span>:
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>最后输入<code>w</code>保存修改并退出<code>fdisk</code>。</p>
<hr>
<h3 id="格式化新分区" tabindex="-1"><a class="header-anchor" href="#格式化新分区" aria-hidden="true">#</a> 格式化新分区</h3>
<p>使用<code>mkfs</code>命令将新分区格式化为<code>ext4</code>格式。</p>
<ul>
<li><strong>命令：</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> mkfs.ext4 /dev/<span class="token operator">&lt;</span>your_new_partition<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>我刚刚创建的新分区是<code>vda3</code>，所以<code>&lt;your_new_partition&gt;</code>替换为<code>vda3</code>。</p>
<ul>
<li><strong>输入：</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> mkfs.ext4 /dev/vda3
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>如果没有发生报错或者提示其他信息，说明一切正常。</p>
<hr>
<h3 id="挂载新分区" tabindex="-1"><a class="header-anchor" href="#挂载新分区" aria-hidden="true">#</a> 挂载新分区</h3>
<p>使用<code>mount</code>命令将新分区挂载到目录。</p>
<ul>
<li><strong>命令：</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mount</span> -t ext4 /dev/<span class="token operator">&lt;</span>your_new_partition<span class="token operator">></span> <span class="token operator">&lt;</span>target_dir<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>我刚刚创建的新分区是<code>vda3</code>，所以<code>&lt;your_new_partition&gt;</code>替换为<code>vda3</code>。
我希望将这个分区挂载到<code>/root/mcserver</code>，所以<code>&lt;target_dir&gt;</code>替换为<code>/root/mcserver</code>。</p>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p><code>/dev/&lt;your_new_partition&gt;</code> <code>&lt;target_dir&gt;</code>之间有一个空格。</p>
</div>
<ul>
<li><strong>输入：</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mount</span> -t ext4 /dev/vda3 /root/mcserver
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>如果挂载成功，那么挂载目录下应该会出现一个<code>lost+found</code>目录。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>drwx------  <span class="token number">2</span> root root <span class="token number">16384</span> May  <span class="token number">7</span> <span class="token number">23</span>:39 lost+found
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><hr>
<h3 id="检查" tabindex="-1"><a class="header-anchor" href="#检查" aria-hidden="true">#</a> 检查</h3>
<p>最后再使用<code>lsblk</code>检查是否成功创建并挂载了分区。</p>
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
├─vda2 <span class="token number">252</span>:2    <span class="token number">0</span>    5G  <span class="token number">0</span> part /
└─vda3 <span class="token number">252</span>:3    <span class="token number">0</span>   55G  <span class="token number">0</span> part /root/mcserver
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>这里我的<code>vda</code>硬盘下新增了以恶搞大小为<code>55G</code>的分区<code>vda3</code>，挂载点为<code>/root/mcserver</code>。</p>
<hr>
<h3 id="设置开机自动挂载" tabindex="-1"><a class="header-anchor" href="#设置开机自动挂载" aria-hidden="true">#</a> 设置开机自动挂载</h3>
<p>在<code>/etc/fstab</code>中添加一行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/dev/<span class="token operator">&lt;</span>your_new_partition<span class="token operator">></span>   <span class="token operator">&lt;</span>target_dir<span class="token operator">></span>  ext4    defaults    <span class="token number">1</span>   <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>在我这里为：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/dev/vda3   /root/mcserver  ext4    defaults    <span class="token number">1</span>   <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></template>
