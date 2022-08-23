<template><h2 id="_6-1-理解udp" tabindex="-1"><a class="header-anchor" href="#_6-1-理解udp" aria-hidden="true">#</a> 6.1 理解UDP</h2>
<h3 id="udp套接字的特点" tabindex="-1"><a class="header-anchor" href="#udp套接字的特点" aria-hidden="true">#</a> UDP套接字的特点</h3>
<ul>
<li>结构上比TCP更加简洁；</li>
<li>性能比TCP高出很多；</li>
<li>不存在流控制机制，可靠性不如TCP；</li>
</ul>
<h3 id="udp的高效使用" tabindex="-1"><a class="header-anchor" href="#udp的高效使用" aria-hidden="true">#</a> UDP的高效使用</h3>
<p>如果需要传递压缩文件（例如被分成一万个数据包），只要有任何一个数据包出错文件往往就无法解压，此时可靠性要求很高，一般选择TCP；</p>
<p>如果传递音频、视频等文件，偶尔的包丢失只会引起短暂的画面抖动或杂音，同时需要提供实时服务，对传输速度的要求更高，此时一般选择UDP；</p>
<p>在收发数据量小但是需要频繁连接的时候，UDP比TCP更高效；</p>
<h2 id="_6-2-实现基于udp的服务端-客户端" tabindex="-1"><a class="header-anchor" href="#_6-2-实现基于udp的服务端-客户端" aria-hidden="true">#</a> 6.2 实现基于UDP的服务端/客户端</h2>
<p>UDP中只有创建套接字还有数据交换的过程，套接字创建方法与TCP一致；</p>
<p>TCP的套接字服务端与客户端一一对应，UDP中可共用套接字（服务端与客户端都只需一个套接字）；</p>
<h3 id="基于udp的数据i-o函数" tabindex="-1"><a class="header-anchor" href="#基于udp的数据i-o函数" aria-hidden="true">#</a> 基于UDP的数据I/O函数</h3>
<p>由于UDP套接字不会保持连接状态，因此每次传输数据时都需要添加目标地址信息：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/socket.h></span></span>
<span class="token class-name">ssize_t</span> <span class="token function">sendto</span><span class="token punctuation">(</span><span class="token keyword">int</span> sock<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>buff<span class="token punctuation">,</span> <span class="token class-name">size_t</span> nbytes<span class="token punctuation">,</span> <span class="token keyword">int</span> flags<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">sockaddr</span> <span class="token operator">*</span> to<span class="token punctuation">,</span> <span class="token class-name">socklen_t</span> addrlen<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 成功时返回传输的字节数，失败时返回-1。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>-sock：		用于传输数据的UDP套接字文件描述符；</p>
<p>-buff：		保存传输数据的缓冲地址值；</p>
<p>-nbytes：	待传输的数据长度，以字节为单位；</p>
<p>-flags：		可选项参数，若没有则传递0；</p>
<p>-to：			存有目标地址信息的sockaddr结构体变量的地址值；</p>
<p>-addrlen：	传递给参数to的地址结构体变量长度；</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/socket.h></span></span>
<span class="token class-name">ssize_t</span> <span class="token function">recvfrom</span><span class="token punctuation">(</span><span class="token keyword">int</span> sock<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>buff<span class="token punctuation">,</span> <span class="token class-name">size_t</span> nbytes<span class="token punctuation">,</span> <span class="token keyword">int</span> flags<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">sockaddr</span> <span class="token operator">*</span> from<span class="token punctuation">,</span> <span class="token class-name">socklen_t</span> addrlen<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 成功时返回传输的字节数，失败时返回-1。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>-sock：		用于传输数据的UDP套接字文件描述符；</p>
<p>-buff：		保存传输数据的缓冲地址值；</p>
<p>-nbytes：	可接收的最大字节数，以字节为单位；</p>
<p>-flags：		可选项参数，若没有则传递0；</p>
<p>-from：			存有发送端地址信息的sockaddr结构体变量的地址值；</p>
<p>-addrlen：	传递给参数from的地址结构体变量长度；</p>
</template>
