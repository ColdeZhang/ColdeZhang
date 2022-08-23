<template><h2 id="_1-将分区日志关闭" tabindex="-1"><a class="header-anchor" href="#_1-将分区日志关闭" aria-hidden="true">#</a> 1.将分区日志关闭</h2>
<p>​	在Mac的终端上：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> diskutil disableJournal <span class="token operator">&lt;</span>分区识别编号<span class="token operator">></span>

<span class="token comment"># 如果以后还想打开日志使用下面的命令</span>
<span class="token function">sudo</span> diskutil enableJournal <span class="token operator">&lt;</span>分区识别编号<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><details class="custom-block details"><summary>如何查看分区编号</summary>
<p>使用 diskutil list 查看。</p>
<p>注意是最后面的 IDENTIFIER。</p>
</details>
<h2 id="_2-ubuntu上安装hfsprogs" tabindex="-1"><a class="header-anchor" href="#_2-ubuntu上安装hfsprogs" aria-hidden="true">#</a> 2.Ubuntu上安装hfsprogs</h2>
<p>​	使用以下命令安装hfsprogs：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> hfsprogs
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_3-挂载硬盘" tabindex="-1"><a class="header-anchor" href="#_3-挂载硬盘" aria-hidden="true">#</a> 3.挂载硬盘</h2>
<p>​	使用以下命令挂载：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mount</span> -t hfsplus -o force,rw /dev/<span class="token operator">&lt;</span>你的硬盘分区<span class="token operator">></span> <span class="token operator">&lt;</span>你的挂载点<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><details class="custom-block details"><summary>如何查看硬盘分区</summary>
<p>使用 lsblk 查看。</p>
</details>
<h2 id="如果说有损坏" tabindex="-1"><a class="header-anchor" href="#如果说有损坏" aria-hidden="true">#</a> 如果说有损坏</h2>
<p>​	使用下面的命令修复：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> fsck.hfsplus -f /dev/<span class="token operator">&lt;</span>你的硬盘分区<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></template>
