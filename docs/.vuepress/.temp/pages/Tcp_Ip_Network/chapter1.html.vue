<template><h2 id="_1-1-理解网络编程和套接字" tabindex="-1"><a class="header-anchor" href="#_1-1-理解网络编程和套接字" aria-hidden="true">#</a> 1.1 理解网络编程和套接字</h2>
<h3 id="接受连接请求的套接字创建过程" tabindex="-1"><a class="header-anchor" href="#接受连接请求的套接字创建过程" aria-hidden="true">#</a> 接受连接请求的套接字创建过程：</h3>
<ol>
<li>调用socket函数创建套接字；</li>
</ol>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/socket.h></span></span>
<span class="token keyword">int</span> <span class="token function">socket</span><span class="token punctuation">(</span><span class="token keyword">int</span> domain<span class="token punctuation">,</span> <span class="token keyword">int</span> type<span class="token punctuation">,</span> <span class="token keyword">int</span> protocal<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 成功时返回文件描述符，失败时返回-1。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="2">
<li>调用bind函数分配IP地址和端口号；</li>
</ol>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/socket.h></span></span>
<span class="token keyword">int</span> <span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">int</span> sockfd<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">sockaddr</span> <span class="token operator">*</span>myaddr<span class="token punctuation">,</span> <span class="token class-name">socklen_t</span> addrlen<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 成功时返回0，失败时返回-1。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="3">
<li>调用listen函数转为可接受请求状态；</li>
</ol>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/socket.h></span></span>
<span class="token keyword">int</span> <span class="token function">listen</span><span class="token punctuation">(</span><span class="token keyword">int</span> sockfd<span class="token punctuation">,</span> <span class="token keyword">int</span> backlog<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 成功时返回0，失败时返回-1。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ol start="4">
<li>调用accept函数处理连接请求；</li>
</ol>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/socket.h></span></span>
<span class="token keyword">int</span> <span class="token function">accept</span><span class="token punctuation">(</span><span class="token keyword">int</span> sockfd<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">sockaddr</span> <span class="token operator">*</span>addr<span class="token punctuation">,</span> <span class="token class-name">socklen_t</span> <span class="token operator">*</span>addrlen<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 成功时返回0，失败时返回-1。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="发送连接请求的套接字创建过程" tabindex="-1"><a class="header-anchor" href="#发送连接请求的套接字创建过程" aria-hidden="true">#</a> 发送连接请求的套接字创建过程：</h3>
<ol>
<li>调用socket函数创建套接字（同上）；</li>
<li>调用connect函数向服务器端发送连接请求；</li>
</ol>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/socket.h></span></span>
<span class="token keyword">int</span> <span class="token function">connect</span><span class="token punctuation">(</span><span class="token keyword">int</span> sockfd<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">sockaddr</span> <span class="token operator">*</span>serv_addr<span class="token punctuation">,</span> <span class="token class-name">socklen_t</span> addrlen<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 成功时返回0，失败时返回-1。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="在linux环境下运行" tabindex="-1"><a class="header-anchor" href="#在linux环境下运行" aria-hidden="true">#</a> 在Linux环境下运行</h3>
<p>使用g++编译：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>g++ ./<span class="token operator">&lt;</span>srource_file<span class="token operator">></span> -o <span class="token operator">&lt;</span>output_file<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>g++ ./hello_server.cpp -o hello_server
g++ ./hello_client.cpp -o hello_client
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>运行（在两个终端中分别运行）：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>./hello_server <span class="token number">9190</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>./hello_client <span class="token number">127.0</span>.0.1 <span class="token number">9190</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="_1-2-基于linux的文件操作" tabindex="-1"><a class="header-anchor" href="#_1-2-基于linux的文件操作" aria-hidden="true">#</a> 1.2 基于Linux的文件操作</h2>
<h3 id="文件描述符-file-descriptor" tabindex="-1"><a class="header-anchor" href="#文件描述符-file-descriptor" aria-hidden="true">#</a> 文件描述符（File Descriptor）</h3>
<p>在Windows中被称为文件句柄，当生成文件时系统分配给文件的整数代号。在Linux系统中socket（套接字）也被认为是一种文件，所以socket在生成的时候会被分配一个文件描述符，Windows下不是一种文件所以有另外的处理方式。</p>
<table>
<thead>
<tr>
<th style="text-align:center">系统保留的文件描述符</th>
<th style="text-align:center">对象</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">0</td>
<td style="text-align:center">标准输入：Standard Input</td>
</tr>
<tr>
<td style="text-align:center">1</td>
<td style="text-align:center">标准输出：Standard Output</td>
</tr>
<tr>
<td style="text-align:center">2</td>
<td style="text-align:center">标准错误：Standard Error</td>
</tr>
</tbody>
</table>
<p>基于此，在Linux中操作文件或Socket是通过对文件的描述符进行操作。</p>
<h3 id="打开文件-open" tabindex="-1"><a class="header-anchor" href="#打开文件-open" aria-hidden="true">#</a> 打开文件 open()</h3>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/types.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/stat.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;fcntl.h></span></span>

<span class="token keyword">int</span> <span class="token function">open</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>path<span class="token punctuation">,</span> <span class="token keyword">int</span> flag<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>成功时返回文件描述符，失败时返回-1。</p>
<p>-path：文件名的字符串地址；</p>
<p>-flag：文件打开模式信息；</p>
<table>
<thead>
<tr>
<th style="text-align:center">打开模式</th>
<th style="text-align:center">含义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">O_CREAT</td>
<td style="text-align:center">必要时创建</td>
</tr>
<tr>
<td style="text-align:center">O_TRUNC</td>
<td style="text-align:center">删除所有数据</td>
</tr>
<tr>
<td style="text-align:center">O_APPEND</td>
<td style="text-align:center">在文件后添加数据</td>
</tr>
<tr>
<td style="text-align:center">O_RDONLY</td>
<td style="text-align:center">只读打开</td>
</tr>
<tr>
<td style="text-align:center">O_WRONLY</td>
<td style="text-align:center">只写打开</td>
</tr>
<tr>
<td style="text-align:center">O_RDWR</td>
<td style="text-align:center">读写打开</td>
</tr>
</tbody>
</table>
<h3 id="关闭文件-close" tabindex="-1"><a class="header-anchor" href="#关闭文件-close" aria-hidden="true">#</a> 关闭文件 close()</h3>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>

<span class="token keyword">int</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token keyword">int</span> fd<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>成功时返回0，失败时返回-1。</p>
<p>-fd：要关闭的文件；</p>
<p>文件使用后必须关闭，由于Linux系统中套接字也是一种文件，所以可以使用close关闭。</p>
<h3 id="写入文件-write" tabindex="-1"><a class="header-anchor" href="#写入文件-write" aria-hidden="true">#</a> 写入文件 write()</h3>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>

<span class="token class-name">ssize_t</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token keyword">int</span> fd<span class="token punctuation">,</span> <span class="token keyword">const</span> <span class="token keyword">void</span> <span class="token operator">*</span>buf<span class="token punctuation">,</span> <span class="token class-name">size_t</span> nbytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>成功时返回写入的字节数，失败时返回-1。</p>
<p>-fd：数据传输对象的文件描述符；</p>
<p>-buf：要传输数据的缓冲内存地址值；</p>
<p>-nbytes：要传输数据字节数；</p>
<h3 id="读取文件-read" tabindex="-1"><a class="header-anchor" href="#读取文件-read" aria-hidden="true">#</a> 读取文件 read()</h3>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;unistd.h></span></span>

<span class="token class-name">ssize_t</span> <span class="token function">read</span><span class="token punctuation">(</span><span class="token keyword">int</span> fd<span class="token punctuation">,</span> <span class="token keyword">void</span> <span class="token operator">*</span>buf<span class="token punctuation">,</span> <span class="token class-name">size_t</span> nbytes<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>成功时返回接收到的字节数（遇到文件尾返回0），失败时返回-1。</p>
<p>-fd：数据接收对象的文件描述符；</p>
<p>-buf：要保存数据的缓冲区内存地址；</p>
<p>-nbytes：要接受数据的最大字节数；</p>
<h2 id="_1-3-基于windows平台的实现" tabindex="-1"><a class="header-anchor" href="#_1-3-基于windows平台的实现" aria-hidden="true">#</a> 1.3 基于Windows平台的实现</h2>
<ol>
<li>需要导入头文件 winsock2.h</li>
<li>链接 ws2_32.lib 库</li>
</ol>
<h2 id="_1-4-基于windows的套接字" tabindex="-1"><a class="header-anchor" href="#_1-4-基于windows的套接字" aria-hidden="true">#</a> 1.4 基于Windows的套接字</h2>
<h2 id="_1-5-习题" tabindex="-1"><a class="header-anchor" href="#_1-5-习题" aria-hidden="true">#</a> 1.5 习题</h2>
<ol>
<li>套接字在网络编程中的作用是什么？为何称为套接字？</li>
</ol>
<blockquote>
<p>套接字（Socket）原译为插座，指计算机通信的一种约定或方式。</p>
</blockquote>
<ol start="2">
<li>在服务器端创建套接字后，会一次调用listen函数和accept函数，比较并说明二者的作用。</li>
</ol>
<blockquote>
<p>listen函数用于讲socket切换为监听状态，表示服务端准备好开始接收连接请求，accept函数用于接收客户端的连接请求并处理。</p>
</blockquote>
<ol start="3">
<li>Linux中，对套接字数据进行I/O时可以直接使用文件I/O相关函数；而在Windows中不可以。原因为何？</li>
</ol>
<blockquote>
<p>在Linux环境中socket也被当作一种文件处理，所以可以使用文件I/O的相关函数。</p>
</blockquote>
<ol start="4">
<li>创建套接字后一般会给它分配地址，为什么？为了完成地址分配需要调用哪个函数？</li>
</ol>
<blockquote>
<p>为了在同一个机器上区分不同的socket，所以需要为每个socket分配独立的地址。分配地址使用bind函数。</p>
</blockquote>
<ol start="5">
<li>Linux中的文件描述符与Windows的句柄实际上非常类似。请以套接字为对象说明它们的含义。</li>
</ol>
<blockquote>
<p>在对象被创建时系统会为对象分配一个整数用来代指这个对象，这个整数就是文件描述符（句柄）。</p>
</blockquote>
<ol start="6">
<li>底层文件I/O函数与ANSI标准定义的文件I/O函数之间有何区别？</li>
</ol>
<blockquote>
<p>ANSI标准定义的输入、输出函数是与操作系统（内核）无关的以C标准写成的函数。相反，底层文件I/O函数是直接提供的。理论上ANSI标准I/O提供了某些机制，性能上优于底层I/O。</p>
</blockquote>
</template>
