<template><h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2>
<p>​	无法拉取chromium.googlesource仓库，挂梯子也不行，报错如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Failed to connect to chromium.googlesource.com port 443: Operation timed out
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	有的时候某些git仓库报类似的错误：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="原因" tabindex="-1"><a class="header-anchor" href="#原因" aria-hidden="true">#</a> 原因</h2>
<p>​	Google的仓库与某些github仓库必须要梯子，梯子没有生效执行到外部流量需要手动设置git代理。</p>
<h2 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h2>
<p>​	查看你的梯子的代理端口，需要将最后的port换成你的梯子的http代理端口：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config --global http.proxy "localhost:port"
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	如果需要取消代理：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config --global --unset http.proxy
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></template>
