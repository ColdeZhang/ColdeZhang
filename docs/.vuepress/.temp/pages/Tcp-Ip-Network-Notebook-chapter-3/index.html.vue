<template><h2 id="_3-1-分配给套接字的-ip-地址与端口号" tabindex="-1"><a class="header-anchor" href="#_3-1-分配给套接字的-ip-地址与端口号" aria-hidden="true">#</a> 3.1 分配给套接字的 IP 地址与端口号</h2>
<h3 id="ip地址" tabindex="-1"><a class="header-anchor" href="#ip地址" aria-hidden="true">#</a> IP地址</h3>
<ul>
<li>用于区分网络内的多个计算机，IPv4由4个字节构成；</li>
<li>A类地址首字节范围：0 ～ 127；</li>
<li>B类地址首字节范围：128 ～ 191；</li>
<li>C类地址首字节范围：192 ～ 223；</li>
</ul>
<h3 id="端口号" tabindex="-1"><a class="header-anchor" href="#端口号" aria-hidden="true">#</a> 端口号</h3>
<ul>
<li>由16位构成，用于区分计算机内的不同 Socket，具有唯一性；</li>
<li>可分配端口号是 0 ～ 65535，但 0 ～ 1023 是知名端口（Well-known PORT）一般分配给特定程序；</li>
<li>TCP和UDP套接字不共用端口号，所以可以使用同一个端口号；</li>
</ul>
<h2 id="_3-2-地址信息的表示" tabindex="-1"><a class="header-anchor" href="#_3-2-地址信息的表示" aria-hidden="true">#</a> 3.2 地址信息的表示</h2>
<h3 id="结构体-sockaddr-in" tabindex="-1"><a class="header-anchor" href="#结构体-sockaddr-in" aria-hidden="true">#</a> 结构体 sockaddr_in</h3>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">sockaddr_in</span><span class="token punctuation">{</span>
  <span class="token class-name">sa_family_t</span>			sin_family<span class="token punctuation">;</span>		<span class="token comment">// 地址族</span>
  <span class="token class-name">uint16_t</span>				sin_port<span class="token punctuation">;</span>			<span class="token comment">// 16位端口号</span>
  <span class="token keyword">struct</span> <span class="token class-name">in_addr</span>	sin_addr<span class="token punctuation">;</span>			<span class="token comment">// 32位IP地址</span>
  <span class="token keyword">char</span>						sin_zero<span class="token punctuation">[</span><span class="token number">8</span><span class="token punctuation">]</span><span class="token punctuation">;</span>	<span class="token comment">// 不使用</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">struct</span> <span class="token class-name">in_addr</span><span class="token punctuation">{</span>
  <span class="token class-name">in_addr_t</span>				s_addr<span class="token punctuation">;</span>				<span class="token comment">// 32位IPv4地址</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>此结构体将作为参数传递给 bind 函数，用于为 socket 绑定地址端口信息。</p>
<h3 id="sin-family-地址族" tabindex="-1"><a class="header-anchor" href="#sin-family-地址族" aria-hidden="true">#</a> sin_family 地址族</h3>
<p>每种协议族需要使用不同的地址族：</p>
<table>
<thead>
<tr>
<th style="text-align:center">地址族 Address Family</th>
<th style="text-align:center">含义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">AF_INET</td>
<td style="text-align:center">IPv4网络协议中使用的地址族</td>
</tr>
<tr>
<td style="text-align:center">AF_INET6</td>
<td style="text-align:center">IPv6网络协议中自用的地址族</td>
</tr>
<tr>
<td style="text-align:center">AF_LOCAL</td>
<td style="text-align:center">本地通信中采用的UNIX协议的地址族</td>
</tr>
</tbody>
</table>
<h3 id="sin-port-端口" tabindex="-1"><a class="header-anchor" href="#sin-port-端口" aria-hidden="true">#</a> sin_port 端口</h3>
<p>保存16位端口号，以网络字节序保存。</p>
<h3 id="sin-addr-地址" tabindex="-1"><a class="header-anchor" href="#sin-addr-地址" aria-hidden="true">#</a> sin_addr 地址</h3>
<p>保存32位IP地址信息，以网络字节序保存。</p>
<h3 id="sin-zero" tabindex="-1"><a class="header-anchor" href="#sin-zero" aria-hidden="true">#</a> sin_zero</h3>
<p>无特殊含义，只是为了使 sockaddr_in 与 sockaddr 的大小保持一致而插入的，必须填充为0。在 bind 函数中，第二个参数要求传入 sockaddr 结构体，并非 sockaddr_in：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">int</span> <span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">int</span> sockfd<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">sockaddr</span> <span class="token operator">*</span>myaddr<span class="token punctuation">,</span> <span class="token class-name">socklen_t</span> addrlen<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>根据如下的 sockaddr 结构体代码：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">sockaddr</span><span class="token punctuation">{</span>
  <span class="token class-name">sa_family_t</span> 	sin_family<span class="token punctuation">;</span> 	<span class="token comment">// 地址族</span>
  <span class="token keyword">char</span> 					sa_data<span class="token punctuation">[</span><span class="token number">14</span><span class="token punctuation">]</span><span class="token punctuation">;</span>	<span class="token comment">// 地址信息（同时包含IP与端口）</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>可以看到 bind 函数接受的结构体 sockaddr 只有地址族和地址信息两个成员，sa_data内存放的地址信息同时包含了IP和端口，通过地址族判断地址类型。</p>
<p>由于不同的地址族地址长度是不一样的，所以结构体 sockaddr_in 中含有八个字节长度的无内容空间，目的是保证 sockaddr_in 的大小与 sockaddr 保持一致，这样在将 sockaddr_in 转换为 sockaddr 时不会出错。</p>
<h3 id="posix" tabindex="-1"><a class="header-anchor" href="#posix" aria-hidden="true">#</a> POSIX</h3>
<p>可移植操作系统接口（Portable Operating System Interface）是为UNIX系列操作系统设立的标准，定义了一些其他数据类型：</p>
<ul>
<li>sys/tyoes.h</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center">数据类型名称</th>
<th style="text-align:center">数据类型说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">int8_t</td>
<td style="text-align:center">signed 8-bit int type</td>
</tr>
<tr>
<td style="text-align:center">uint8_t</td>
<td style="text-align:center">unsigned 8-bit int type (unsigned char)</td>
</tr>
<tr>
<td style="text-align:center">int16_t</td>
<td style="text-align:center">signed 16-bit int type</td>
</tr>
<tr>
<td style="text-align:center">uint16_t</td>
<td style="text-align:center">unsigned 16-bit int type (unsigned char)</td>
</tr>
<tr>
<td style="text-align:center">int32_t</td>
<td style="text-align:center">signed 32-bit int type</td>
</tr>
<tr>
<td style="text-align:center">uint32_t</td>
<td style="text-align:center">unsigned 32-bit int type (unsigned char)</td>
</tr>
</tbody>
</table>
<ul>
<li>sys/socket.h</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center">数据类型名称</th>
<th style="text-align:center">数据类型说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">sa_family_t</td>
<td style="text-align:center">地址族 socket address family type</td>
</tr>
<tr>
<td style="text-align:center">socklen_t</td>
<td style="text-align:center">长度 socket length type</td>
</tr>
</tbody>
</table>
<ul>
<li>netinet/in.h</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:center">数据类型名称</th>
<th style="text-align:center">数据类型说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">in_addr_t</td>
<td style="text-align:center">IP地址 internet address type 声明为uint32_t</td>
</tr>
<tr>
<td style="text-align:center">in_port_t</td>
<td style="text-align:center">端口号 internet port type 声明为uint16_t</td>
</tr>
</tbody>
</table>
<h2 id="_3-3-网络字节序与地址变换" tabindex="-1"><a class="header-anchor" href="#_3-3-网络字节序与地址变换" aria-hidden="true">#</a> 3.3 网络字节序与地址变换</h2>
<h3 id="网路字节序-network-byte-order" tabindex="-1"><a class="header-anchor" href="#网路字节序-network-byte-order" aria-hidden="true">#</a> 网路字节序（Network Byte Order）</h3>
<p>CPU将数据存储到内存中有两种不同的字节序（Order）：大端序（Big Endian）和小端序（Little Endian）。大端序会将高位数据存储在低位内存，而小端序会将高位数据存储在高位内，例如：整数12345678共需要四个字节，大端序的存储方式为｜12｜34｜56｜78｜，小端序的存储方式为｜78｜56｜34｜12｜。由于不同计算机可能有不同的字节序保存方式，因此在发送数据时可能会导致数据顺序不一致。</p>
<p>为了解决这一问题，再通过网络传输数据时使用统一的字节序格式——网络字节序（大端序）。</p>
<h3 id="字节序转换-endian-conversions" tabindex="-1"><a class="header-anchor" href="#字节序转换-endian-conversions" aria-hidden="true">#</a> 字节序转换（Endian Conversions）</h3>
<p>当我们给 sockaddr_in 节构体填充变量时可以使用字节序转换函数将字节序转换为网络字节序，例如：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">htons</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">// h 代表 host 即主机</span>
<span class="token comment">// n 代表 network 即网络</span>
<span class="token comment">// s 代表 short</span>
<span class="token comment">// 将short型数据由主机字节序转换为网络字节序</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>同理，有：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">htons</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 将short型数据由主机字节序转换为网络字节序</span>
<span class="token function">htonl</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 将long型数据由主机字节序转换为网络字节序</span>
<span class="token function">ntohs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 将short型数据由网络字节序转换为主机字节序</span>
<span class="token function">ntohl</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 将long型数据由网络字节序转换为主机字节序</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul>
<li>在Linux环境中 shrot 长度为两字节，long 长度为四字节。因此前者用于端口号后者用于IP地址。</li>
<li>对于本身是大端序的系统而言可以不进行转换，但是为了逻辑统一与迁移最好也经过一次转换。</li>
<li>由于socket在发送接收数据时会自动为数据进行字节序转换，因此仅当我们为 sockaddr_in 填充变量才需要手动进行变换。</li>
</ul>
<h2 id="_3-4-网络地址的初始化与分配" tabindex="-1"><a class="header-anchor" href="#_3-4-网络地址的初始化与分配" aria-hidden="true">#</a> 3.4 网络地址的初始化与分配</h2>
<h3 id="将网络地址转换为整数型" tabindex="-1"><a class="header-anchor" href="#将网络地址转换为整数型" aria-hidden="true">#</a> 将网络地址转换为整数型</h3>
<h4 id="inet-addr" tabindex="-1"><a class="header-anchor" href="#inet-addr" aria-hidden="true">#</a> inet_addr()</h4>
<p>观察 sockaddr_in.sin_addr.s_addr 所需要传入的地址数据类型为 in_addr_t，这是一种32位整数型数据。IP地址我们一般使用类似于“127.0.0.1”这样的点分十进制表达，我们可以使用 inet_addr() 函数将其转换为32位整数型数据：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;arpa/inet.h></span></span>
<span class="token class-name">in_addr_t</span> <span class="token function">inet_addr</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span> string<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 成功时返回32位大端序整数型值，失败时返回INADDR_NONE</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>该函数不仅可以对点分十进制IP地址进行转换，还能校验地址格式是否正确，并且输出的数据是网络字节序。</p>
<h4 id="inet-aton" tabindex="-1"><a class="header-anchor" href="#inet-aton" aria-hidden="true">#</a> inet_aton()</h4>
<p>函数 inet_aton() 功能与 inet_addr() 类似，但是传入两个参数，第二个参数为结构体的 in_addr 变量，因此可以直接将转换后的IP地址存入结构体：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;arpa/inet.h></span></span>
<span class="token keyword">int</span> <span class="token function">inet_aton</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span>string<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">inaddr</span> <span class="token operator">*</span>addr<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 成功时返回1（true），失败时返回0（false）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="inet-ntoa" tabindex="-1"><a class="header-anchor" href="#inet-ntoa" aria-hidden="true">#</a> inet_ntoa()</h4>
<p>与上面两个函数功能相反，可以将网络字节序的整数型IP地址转换成字符串的点分十进制IP地址：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;arpa/inet.h></span></span>
<span class="token keyword">char</span> <span class="token operator">*</span> <span class="token function">inet_ntoa</span><span class="token punctuation">(</span><span class="token keyword">struct</span> <span class="token class-name">in_addr</span> adr<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="网络地址初始化" tabindex="-1"><a class="header-anchor" href="#网络地址初始化" aria-hidden="true">#</a> 网络地址初始化</h3>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">sockaddr_in</span> addr<span class="token punctuation">;</span>
<span class="token keyword">char</span> <span class="token keyword">const</span> <span class="token operator">*</span> serv_ip <span class="token operator">=</span> <span class="token string">"211.217.168.13"</span><span class="token punctuation">;</span>
<span class="token keyword">char</span> <span class="token keyword">const</span> <span class="token operator">*</span> serv_port <span class="token operator">=</span> <span class="token string">"9190"</span><span class="token punctuation">;</span>
<span class="token function">memset</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>addr<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
addr<span class="token punctuation">.</span>sin_family <span class="token operator">=</span> AF_INET<span class="token punctuation">;</span>
addr<span class="token punctuation">.</span>sin_addr<span class="token punctuation">.</span>s_addr <span class="token operator">=</span> <span class="token function">inet_addr</span><span class="token punctuation">(</span>serv_ip<span class="token punctuation">)</span><span class="token punctuation">;</span>
addr<span class="token punctuation">.</span>sin_port <span class="token operator">=</span> <span class="token function">htons</span><span class="token punctuation">(</span><span class="token function">atoi</span><span class="token punctuation">(</span>serv_port<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>memset() 函数的作用是将所有内容设置为指定的数值，此处全部设置为0。</p>
<p>最后一行先试用 atoi() 函数将字符串端口转换为整数，再使用 htons() 函数将其转换为网络字节序整数。</p>
<p>对于服务端而言，可以使用 INADDR_ANY 填入IP地址处，程序会自动获取运行的服务器的IP地址。</p>
<h2 id="_3-5-基于windows的实现" tabindex="-1"><a class="header-anchor" href="#_3-5-基于windows的实现" aria-hidden="true">#</a> 3.5 基于Windows的实现</h2>
<h2 id="_3-6-习题" tabindex="-1"><a class="header-anchor" href="#_3-6-习题" aria-hidden="true">#</a> 3.6 习题</h2>
<p>大端序计算机希望把4字节整数型数据12传递到小端序计算机。请说出数据传输过程中发生的字节序变换过程。</p>
<blockquote>
<p>4字节整数型12  -&gt; 0x00 0x00 0x00 0x0c</p>
<p>大端序 -&gt; 网络字节序 -&gt; 小端序</p>
<p>0x00 0x00 0x00 0x0c--&gt;0x00 0x00 0x00 0x0c--&gt;0x0c 0x00 0x00 0x00</p>
</blockquote>
</template>
