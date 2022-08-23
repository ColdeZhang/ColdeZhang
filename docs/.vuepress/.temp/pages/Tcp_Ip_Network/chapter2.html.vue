<template><h2 id="_2-1-套接字协议及其数据传输特性" tabindex="-1"><a class="header-anchor" href="#_2-1-套接字协议及其数据传输特性" aria-hidden="true">#</a> 2.1 套接字协议及其数据传输特性</h2>
<h3 id="创建套接字" tabindex="-1"><a class="header-anchor" href="#创建套接字" aria-hidden="true">#</a> 创建套接字</h3>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;sys/socket.h></span></span>
<span class="token keyword">int</span> <span class="token function">socket</span><span class="token punctuation">(</span><span class="token keyword">int</span> domain<span class="token punctuation">,</span> <span class="token keyword">int</span> type<span class="token punctuation">,</span> <span class="token keyword">int</span> protocal<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>成功时返回文件描述符，失败时返回-1。</p>
<p>-domain：套接字使用的协议族（Protocol Family）；</p>
<p>-type：套接字数据传输类型信息；</p>
<p>-protocol：通信使用的协议信息；</p>
<h3 id="协议族-protocol-family" tabindex="-1"><a class="header-anchor" href="#协议族-protocol-family" aria-hidden="true">#</a> 协议族（Protocol Family）</h3>
<p>协议（Protocol）的分类方式，协议（Protocol）是协议族（Protocol Family）的子集。常用的是PF_INET协议族，包含了IPv4互联网协议。</p>
<table>
<thead>
<tr>
<th style="text-align:center">名称</th>
<th style="text-align:center">协议族</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">PF_INET</td>
<td style="text-align:center">IPv4互联网协议族</td>
</tr>
<tr>
<td style="text-align:center">PF_INET6</td>
<td style="text-align:center">IPv6互联网协议族</td>
</tr>
<tr>
<td style="text-align:center">PF_LOCAL</td>
<td style="text-align:center">本地通信的UNIX协议族</td>
</tr>
<tr>
<td style="text-align:center">PF_PACKET</td>
<td style="text-align:center">底层套接字的协议族</td>
</tr>
<tr>
<td style="text-align:center">PF_IPX</td>
<td style="text-align:center">IPX Novell协议族</td>
</tr>
</tbody>
</table>
<h3 id="套接字类型-type" tabindex="-1"><a class="header-anchor" href="#套接字类型-type" aria-hidden="true">#</a> 套接字类型（Type）</h3>
<p>决定了数据以何种方式传输，主要有两种：</p>
<ul>
<li>数据流（SOCK_STREAM）：按顺序传递数据、可靠性高；</li>
<li>数据包（SOCK_DGRAM）：高速的、不按顺序传递数据、可靠性低；</li>
</ul>
<h3 id="协议-protocol" tabindex="-1"><a class="header-anchor" href="#协议-protocol" aria-hidden="true">#</a> 协议（Protocol）</h3>
<p>协议决定了最终的数据传输方式，通常来说 PF_INET 协议族下使用SOCK_STREAM 类型的套接字只有 IPPROTO_TCP 一种传输协议（即TCP协议）；而 SOCK_DGRAM 类型的套接字只有 IPPRPTP_UDP 一种传输协议（即UDP协议）。</p>
<p>通常这个参数可以填写 0 ，程序会自动选择套接字类型（Type）对应的传输协议。而当一个协议族下的套接字类型有多种可选的协议是此项必须指定具体的协议。</p>
<h3 id="数据边界-boundary" tabindex="-1"><a class="header-anchor" href="#数据边界-boundary" aria-hidden="true">#</a> 数据边界（Boundary）</h3>
<p>即数据的结尾位置。</p>
<p>由于 SOCK_STREAM 类型按顺序传递，所以无需数据边界，而SOCK_DGRAM 会将数据分包发送，数据包必须知道数据在哪结束，所以有数据边界。</p>
<h2 id="_2-2-windows平台下的实现及验证" tabindex="-1"><a class="header-anchor" href="#_2-2-windows平台下的实现及验证" aria-hidden="true">#</a> 2.2 Windows平台下的实现及验证</h2>
<h2 id="_2-3-习题" tabindex="-1"><a class="header-anchor" href="#_2-3-习题" aria-hidden="true">#</a> 2.3 习题</h2>
<p>何种类型的套接字不存在数据边界？这类套接字接收数据时应该注意什么？</p>
<blockquote>
<p>TCP 不存在数据边界。在接收数据时，需要保证在接收套接字的缓冲区填充满之时就从buffer里读取数据。也就是，在接收套接字内部，写入buffer的速度要小于读出buffer的速度。</p>
</blockquote>
</template>
