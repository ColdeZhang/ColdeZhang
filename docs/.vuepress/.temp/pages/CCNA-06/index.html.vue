<template><h2 id="路由协议的分类" tabindex="-1"><a class="header-anchor" href="#路由协议的分类" aria-hidden="true">#</a> 路由协议的分类</h2>
<ul>
<li>
<p>静态路由</p>
<p>由管理员根据数据访问需求手工在每台设备上进行添加和维护。</p>
</li>
<li>
<p>动态路由</p>
<p>路由器自动进行路由信息的更新和同步，并且当网络拓扑变更时能够自动收敛</p>
</li>
</ul>
<h2 id="动态路由协议分类" tabindex="-1"><a class="header-anchor" href="#动态路由协议分类" aria-hidden="true">#</a> 动态路由协议分类</h2>
<p><img src="https://s2.loli.net/2022/02/13/IObAM7gS54BsRtW.jpg" alt="img" loading="lazy"></p>
<h2 id="距离矢量路由" tabindex="-1"><a class="header-anchor" href="#距离矢量路由" aria-hidden="true">#</a> 距离矢量路由</h2>
<p>使用距离矢量路由协议的路由器并不了解到达目的网络的整条路径。该路由器只知道：</p>
<ul>
<li>自身与目的网络之间的距离</li>
<li>应该往哪个方向或使用哪个接口转发数据包</li>
</ul>
<p>特点：</p>
<ul>
<li>周期性的更新（广播）整张路由表</li>
<li>与相邻的路由器交换路由表</li>
</ul>
<h3 id="metric-度量值" tabindex="-1"><a class="header-anchor" href="#metric-度量值" aria-hidden="true">#</a> Metric 度量值</h3>
<p>以跳数作为度量值，会优先选择度量值小的路由。次优的会隐藏在后台，当度量值相等会进行负载均衡。</p>
<h3 id="管理距离-ad值" tabindex="-1"><a class="header-anchor" href="#管理距离-ad值" aria-hidden="true">#</a> 管理距离（AD值）</h3>
<p>当度量值相同时，会优先选择管理距离小的路由。</p>
<table>
<thead>
<tr>
<th>Routing Protocol</th>
<th>AD</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>直连接口</td>
<td>0</td>
<td></td>
</tr>
<tr>
<td>关联出接口的静态路由</td>
<td>1</td>
<td>Metric = 0</td>
</tr>
<tr>
<td>关联下一跳的静态路由</td>
<td>1</td>
<td>Metric = 0</td>
</tr>
<tr>
<td>EIGRP 汇总路由</td>
<td>5</td>
<td></td>
</tr>
<tr>
<td>外部 BGP</td>
<td>20</td>
<td></td>
</tr>
<tr>
<td>内部 EIGRP</td>
<td>90</td>
<td></td>
</tr>
<tr>
<td>IGRP</td>
<td>100</td>
<td></td>
</tr>
<tr>
<td>OSPF</td>
<td>110</td>
<td></td>
</tr>
<tr>
<td>RIP v1 / v2</td>
<td>120</td>
<td></td>
</tr>
<tr>
<td>外部 EIGRP</td>
<td>170</td>
<td></td>
</tr>
<tr>
<td>内部 BGP</td>
<td>200</td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="依据传闻的更新-广播、更新路由表" tabindex="-1"><a class="header-anchor" href="#依据传闻的更新-广播、更新路由表" aria-hidden="true">#</a> 依据传闻的更新（广播、更新路由表）</h3>
<p>有隐患 不可靠</p>
<h4 id="环路产生" tabindex="-1"><a class="header-anchor" href="#环路产生" aria-hidden="true">#</a> 环路产生</h4>
<p>当交换路由表的时候网络发生变更（其中某个网段down了），可能会导致路由表出现环路。</p>
<h4 id="消除环路" tabindex="-1"><a class="header-anchor" href="#消除环路" aria-hidden="true">#</a> 消除环路</h4>
<ul>
<li>
<p>定义最大跳数</p>
<p>当路由表环路次数达到跳数上限即可自动终止环路，缺点是当网络中有很多个路由器数量的时候，跳数上线会很大；</p>
</li>
<li>
<p>水平分割 Split Horizon</p>
<p>当收到某个路由更新时不会再向这个路由发送同样的路由信息；</p>
</li>
<li>
<p>路由中毒 Route Poisoning</p>
<p>当路由器的某个网段down了后，立刻将此网段在路由表中的跳数标记为 Infinity（不可搭）然后将此路由表广播出去。此时远端路由器收到这个网段的不可达消息后便会将此网段隐藏（标记为Possibily Down），如果down时间过长则会将其删除，一定时间内恢复则会重新放进路由表；</p>
</li>
<li>
<p>毒性反转 Poison Reverse</p>
<p>当远端网络收到了某个网段down的消息后，会返回一个路由表，表示等待此网络恢复；</p>
</li>
<li>
<p>抑制计时器 Hold-Down Timers</p>
<p>为正在重新收敛的网络增加了应变能力</p>
<p>引入了某种程度的怀疑量</p>
<p>当某个网络down或路由出现变动，不立刻更新路由而是启动一个计时器。在未超时内仍然按照旧的路由执行，超时后再更新路由表。相当于在路由种引入一种“怀疑”，一种延迟机制；</p>
</li>
<li>
<p>触发更新 Triggered Update</p>
<p>拓扑发生变更时，路由器立刻发送更新消息，而不等更新计时器超时，避免错位导致环路产生</p>
</li>
</ul>
<h2 id="rip的配置" tabindex="-1"><a class="header-anchor" href="#rip的配置" aria-hidden="true">#</a> RIP的配置</h2>
<h3 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h3>
<ul>
<li>RIP（Routing Information Protocol，路由信息协议）是应用较早、使用较普遍的内部网关协议（Interior Gateway Protocol，简称 IGP）</li>
<li>适用于小型同类网络，是典型的距离矢量协议</li>
<li>RIP是基于UDP，端口520的应用层协议</li>
<li>管理距离（AD）：120</li>
</ul>
<h3 id="配置rip" tabindex="-1"><a class="header-anchor" href="#配置rip" aria-hidden="true">#</a> 配置RIP</h3>
<p>启动路由选择进程：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Router(config)# router rip
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>宣告直连网段（接口）：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Router(config-router)# network &lt;直连接口网段>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></template>
