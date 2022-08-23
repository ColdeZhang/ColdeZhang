<template><h2 id="_4-1-理解tcp和udp" tabindex="-1"><a class="header-anchor" href="#_4-1-理解tcp和udp" aria-hidden="true">#</a> 4.1 理解TCP和UDP</h2>
<p>TCP（Transmission Control Protocol）是“对数据传输过程控制”的缩写。</p>
<p>TCP协议栈分为四层：应用层 &lt;-&gt; TCP层 &lt;-&gt; IP层 &lt;-&gt; 链路层</p>
<p>UDP协议栈分为四层：应用层 &lt;-&gt; UDP层 &lt;-&gt; IP层 &lt;-&gt; 链路层</p>
<ul>
<li>链路层：定义网络环境的连接结构；</li>
<li>IP层：只关注单包数据的传输，不关心顺序与正确与否；</li>
<li>TCP/UDP层：通过协议规范传输顺序与正确性校验；</li>
<li>应用层：决定什么时候传输怎么样的数据（网络编程的工作）；</li>
</ul>
<h2 id="_4-2-实现基于tcp的服务端-客户端" tabindex="-1"><a class="header-anchor" href="#_4-2-实现基于tcp的服务端-客户端" aria-hidden="true">#</a> 4.2 实现基于TCP的服务端/客户端</h2>
<h3 id="实现顺序" tabindex="-1"><a class="header-anchor" href="#实现顺序" aria-hidden="true">#</a> 实现顺序</h3>
<p>客户端：</p>
<ol>
<li>socket()：创建套接字</li>
<li>bind()：分配地址端口</li>
<li>listen()：进入等待连接状态</li>
<li>accept()：允许连接</li>
<li>read()/write()：传输数据</li>
<li>close()：关闭连接</li>
</ol>
<p>服务端：</p>
<ol>
<li>socket()：创建套接字</li>
<li>connect()：请求连接</li>
<li>read()/write()：传输数据</li>
<li>close()：关闭连接</li>
</ol>
<h3 id="进入等待请求状态" tabindex="-1"><a class="header-anchor" href="#进入等待请求状态" aria-hidden="true">#</a> 进入等待请求状态</h3>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/socket.h></span></span>
<span class="token keyword">int</span> <span class="token function">listen</span><span class="token punctuation">(</span><span class="token keyword">int</span> sock<span class="token punctuation">,</span> <span class="token keyword">int</span> backlog<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 成功时返回0，失败时返回-1。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>-sock：服务端进入连接状态的套接字；</p>
<p>-backlog：连接等待队列（Queue）的长度；</p>
<p>当上一个请求没有被处理完成，其他的请求会进入等待队列。backlog 参数决定了队列的最大长度是多少，当队列满后多余的请求将无法被侦听。对于请求频繁的Web服务器队列长度一般至少为15，具体长度取决于应用场景。</p>
<h3 id="接受客户端连接请求" tabindex="-1"><a class="header-anchor" href="#接受客户端连接请求" aria-hidden="true">#</a> 接受客户端连接请求</h3>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/socket.h></span></span>
<span class="token keyword">int</span> <span class="token function">accept</span><span class="token punctuation">(</span><span class="token keyword">int</span> sock<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">sockaddr</span> <span class="token operator">*</span>addr<span class="token punctuation">,</span> <span class="token class-name">socklen_t</span> <span class="token operator">*</span>addrlen<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 成功时返回创建的套接字文件描述符，失败时返回-1。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>-sock：服务端套接字文件描述符；</p>
<p>-addr：用于保存客户端的地址信息；</p>
<p>-addrlen：客户端地址长度；</p>
<p>该函数会为连接请求创建一个连接客户端的套接字，数据的收发是通过这里创建的新的套接字进行的，而不是刚刚的服务端套接字。</p>
<h3 id="客户端发起连接" tabindex="-1"><a class="header-anchor" href="#客户端发起连接" aria-hidden="true">#</a> 客户端发起连接</h3>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/socket.h></span></span>
<span class="token keyword">int</span> <span class="token function">connect</span><span class="token punctuation">(</span><span class="token keyword">int</span> sock<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">sockaddr</span> <span class="token operator">*</span>servaddr<span class="token punctuation">,</span> <span class="token class-name">socklen_t</span> addrlen<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 成功时返回0，失败时返回-1。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>-sock：客户端套接字文件描述符；</p>
<p>-servaddr：目标服务端地址信息；</p>
<p>-addrlen ：服务端地址长度；</p>
<p>只有在连接成功进入队列（Queue）或者遇到断网等异常中断时 connect() 函数才会返回结果。</p>
<h2 id="_4-3-实现迭代服务端-客户端" tabindex="-1"><a class="header-anchor" href="#_4-3-实现迭代服务端-客户端" aria-hidden="true">#</a> 4.3 实现迭代服务端/客户端</h2>
<p>详见对应源代码</p>
<h2 id="_4-4-基于windows实现" tabindex="-1"><a class="header-anchor" href="#_4-4-基于windows实现" aria-hidden="true">#</a> 4.4 基于Windows实现</h2>
<h2 id="_4-5-习题" tabindex="-1"><a class="header-anchor" href="#_4-5-习题" aria-hidden="true">#</a> 4.5 习题</h2>
<p>为何需要把TCP/IP协议栈分成4层（或7层）？结合开放式系统回答。</p>
<blockquote>
<p>把协议分成多个层次，除了可以使协议设计更加容易以外，更重要的原因是，为了通过标准化操作设计开放式系统。</p>
<p>标准本身就在于对外公开，引导更多的人遵守规范。从而使得人们生活更加方便，不用为了不同的标准、协议而大费周折。</p>
<p>比如，路由器同来完成IP层交互任务。某公司原来使用A公司的路由器，先要将其替换成B公司的，因为统一了标准，所有生产商都按照IP层标准制造，所以更换起来非常方便。</p>
</blockquote>
</template>
