<template><h2 id="_5-1-回声客户端的完美实现" tabindex="-1"><a class="header-anchor" href="#_5-1-回声客户端的完美实现" aria-hidden="true">#</a> 5.1 回声客户端的完美实现</h2>
<h3 id="回声客户端的问题" tabindex="-1"><a class="header-anchor" href="#回声客户端的问题" aria-hidden="true">#</a> 回声客户端的问题</h3>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">write</span><span class="token punctuation">(</span>sock<span class="token punctuation">,</span> message<span class="token punctuation">,</span> <span class="token function">strlen</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> msg_len <span class="token operator">=</span> <span class="token function">read</span><span class="token punctuation">(</span>sock<span class="token punctuation">,</span> message<span class="token punctuation">,</span> BUFF_SIZE<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>此处客户端向服务端写入一段消息后立即读取服务端返回的回声，这里存在一个问题：我们不能保证在我们读取的时候服务端一定接收到了内容，数据传输的过程中可能会传输不止一个数据包，并且当数据长度足够大的时候这种可能性就更高。</p>
<p>在客户端读取前添加一个延迟也不能真正解决问题，因为我们并不知道需要等待多久。</p>
<h3 id="客户端问题解决方法" tabindex="-1"><a class="header-anchor" href="#客户端问题解决方法" aria-hidden="true">#</a> 客户端问题解决方法</h3>
<p>提前确定需要接受的数据长度，根据实际接收到的数据长度做比较。如果接收到的长度小于预先确定的长度，则继续循环再次读取。</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>str_len <span class="token operator">=</span> <span class="token function">write</span><span class="token punctuation">(</span>sock<span class="token punctuation">,</span> message<span class="token punctuation">,</span> <span class="token function">strlen</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
recv_len <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>recv_len <span class="token operator">&lt;</span> str_len<span class="token punctuation">)</span><span class="token punctuation">{</span>
	msg_len <span class="token operator">=</span> <span class="token function">read</span><span class="token punctuation">(</span>sock<span class="token punctuation">,</span> <span class="token operator">&amp;</span>message<span class="token punctuation">[</span>recv_len<span class="token punctuation">]</span><span class="token punctuation">,</span> BUFF_SIZE<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	recv_len <span class="token operator">+=</span> msg_len<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
message<span class="token punctuation">[</span>recv_len<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">"Server sended message is : %s "</span><span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="应用层协议" tabindex="-1"><a class="header-anchor" href="#应用层协议" aria-hidden="true">#</a> 应用层协议</h3>
<p>多数情况下客户端不太可能提前自傲接受数据的长度，所以需要定义应用层协议。应用层协议就是为特定程序的实现而制定的的规则。</p>
<h2 id="_5-2-tcp原理" tabindex="-1"><a class="header-anchor" href="#_5-2-tcp原理" aria-hidden="true">#</a> 5.2 TCP原理</h2>
<h3 id="tcp套接字中的i-o缓冲" tabindex="-1"><a class="header-anchor" href="#tcp套接字中的i-o缓冲" aria-hidden="true">#</a> TCP套接字中的I/O缓冲</h3>
<p>数据在传输到服务端或客户端后，会存放在套接字缓冲区。当调用 read() 或 write() 函数时会根据需要从缓冲区取出需要的数据。</p>
<ul>
<li>每个套接字都有自己独立的缓冲区，不共用；</li>
<li>缓冲区是套接字创建时自动生成的；</li>
<li>套接字关闭时缓冲区也会被清空；</li>
<li>TCP套接字会自动控制数据流大小，即当缓冲区满后会告知发送方暂缓发送新的数据；</li>
</ul>
<h3 id="tcp原理1-套接字连接过程" tabindex="-1"><a class="header-anchor" href="#tcp原理1-套接字连接过程" aria-hidden="true">#</a> TCP原理1:套接字连接过程</h3>
<p>套接字使用全双工（Full-duplex）的方式工作，可以双向传输数据，因此需要通过以下三步(Three-way handshaking)保证数据可以双向进行：</p>
<h4 id="a-b-seq-1000ack-syn" tabindex="-1"><a class="header-anchor" href="#a-b-seq-1000ack-syn" aria-hidden="true">#</a> A -&gt; B: SEQ: 1000	ACK: -				[SYN]</h4>
<p>首先A主机向B主机发送连接请求，又称SYN(Synchronization)，是收发数据前的同步消息。</p>
<p>SEQ为发送消息，此处发送编号为1000的数据包，如B接收到消息应当回复1001号数据包编号，表明接下来可以开始传递1001给B；</p>
<p>ACK为应答消息，由于是首次连接的请求所以此处不需要应答；</p>
<h4 id="b-a-seq-2000ack-1001-syh-ack" tabindex="-1"><a class="header-anchor" href="#b-a-seq-2000ack-1001-syh-ack" aria-hidden="true">#</a> B -&gt; A: SEQ: 2000	ACK: 1001		[SYH+ACK]</h4>
<p>在B收到消息后开始回复消息给A主机。</p>
<p>ACK为应答消息，在接收到A发送的SEQ: 1000时如确认无误会应答ACK: 1001表明告诉A主机接下来可发送1001号数据包；</p>
<p>SEQ为发送消息，此处发送编号为2000的数据包，如A接收到应当回复ACK: 2001表明可以开始接收2001传输给A；</p>
<h4 id="a-b-seq-1001ack-2001-ack" tabindex="-1"><a class="header-anchor" href="#a-b-seq-1001ack-2001-ack" aria-hidden="true">#</a> A -&gt; B: SEQ: 1001	ACK: 2001		[ACK]</h4>
<p>最后A再向B发送一次消息。</p>
<p>SEQ为发送消息，在接收到B发送的ACK: 1001后A会按照计划向B发送1001号数据包；</p>
<p>ACK为应答消息，表明A收到了B发送来的SEQ: 2000数据包，通知B接下来可以发送2001号；</p>
<h3 id="tcp原理2-与对方主机数据交换" tabindex="-1"><a class="header-anchor" href="#tcp原理2-与对方主机数据交换" aria-hidden="true">#</a> TCP原理2:与对方主机数据交换</h3>
<h4 id="a-b-seq-1200-100-byte-data" tabindex="-1"><a class="header-anchor" href="#a-b-seq-1200-100-byte-data" aria-hidden="true">#</a> A -&gt; B: SEQ: 1200	(100 byte data)</h4>
<h4 id="b-a-ack-1301" tabindex="-1"><a class="header-anchor" href="#b-a-ack-1301" aria-hidden="true">#</a> B -&gt; A: ACK: 1301</h4>
<h4 id="a-b-seq-1301-100-byte-data" tabindex="-1"><a class="header-anchor" href="#a-b-seq-1301-100-byte-data" aria-hidden="true">#</a> A -&gt; B: SEQ: 1301	(100 byte data)</h4>
<h4 id="b-a-ack-1402" tabindex="-1"><a class="header-anchor" href="#b-a-ack-1402" aria-hidden="true">#</a> B -&gt; A: ACK: 1402</h4>
<p>首先A主机向B主机发送一个100字节的数据包，数据包的SEQ为1200；</p>
<p>B主机在确认收到来自A的数据包后会返回1301消息，告诉A主机确认收到了1200数据包。ACK号的增量为传输的数据字节数而不是传输的次数，因为这样还可以同时校验收到的数据的完整性；</p>
<p>A主机收到发送成功的消息后接着会开始发送SEQ为1301的第二个100字节数据包；</p>
<p>同理在B收到数据包后返回1402ACK号表明收到了SEQ为1301的100个字节的数据包，可以继续发送1402；</p>
<p>如果数据发送失败或者超时（主机A没有收到ACK），那么主机A会尝试重新传递上一个数据包。正是由于有这样的应答机制，所以TCP协议传输的数据完整性一般很高。</p>
<h3 id="tcp原理3-断开套接字的连接" tabindex="-1"><a class="header-anchor" href="#tcp原理3-断开套接字的连接" aria-hidden="true">#</a> TCP原理3:断开套接字的连接</h3>
<p>TCP断开连接需要经过四次握手。</p>
<h2 id="_5-3-基于windows的实现" tabindex="-1"><a class="header-anchor" href="#_5-3-基于windows的实现" aria-hidden="true">#</a> 5.3 基于Windows的实现</h2>
<h2 id="_5-4-习题" tabindex="-1"><a class="header-anchor" href="#_5-4-习题" aria-hidden="true">#</a> 5.4 习题</h2>
<ol>
<li>TCP是可靠的数据传输协议，但在通过网络通信的过程可能丢失数据。请通过ACK和SEQ说明TCP通过何种机制保证丢失数据的可靠传输。</li>
</ol>
<blockquote>
<p>SEQ顺序标识符是给信息编号。ACK是用于回复带有编号的信息。也就是说，每次传输信息时，都同时发送SEQ标识，而受到信息的主机应以SEQ信息为基础回复发送信息的主机。通过这种机制，传输数据的主机就可以确认数据是否被正确接收。在传输失败时，可以重新传送。</p>
</blockquote>
<ol start="2">
<li>TCP套接字中调用write和read函数时数据如何移动？结合I/O缓冲进行说明</li>
</ol>
<blockquote>
<p>当write函数被调用时，数据就会向端口的输出缓冲区移动。然后经过网络传输传输到对方主机套接字的输入缓冲。这样，输入缓冲中存储的数据通过read函数的响应来读取</p>
</blockquote>
<ol start="3">
<li>对方主机的输入缓冲剩余50字节空间时，若本方主机通过write函数请求传输70字节，问TCP如何处理这种情况？</li>
</ol>
<blockquote>
<p>对方主机会把输入缓冲中可存储的数据大小传送给要传输数据的数据（本方）。因此，在剩余空间为50字节的情况，即使要求传送70字节的数据，也不能传输50字节以上，剩余的部分保存在传输方的输出缓冲中，等待对方主机的输入缓冲出现空间。</p>
</blockquote>
</template>
