<template><h2 id="_1-注册账号" tabindex="-1"><a class="header-anchor" href="#_1-注册账号" aria-hidden="true">#</a> 1.注册账号</h2>
<p>前往<a href="https://www.natfrp.com" target="_blank" rel="noopener noreferrer">SakuraFrp官网<ExternalLinkIcon/></a>注册一个账号</p>
<h2 id="_2-创建隧道" tabindex="-1"><a class="header-anchor" href="#_2-创建隧道" aria-hidden="true">#</a> 2.创建隧道</h2>
<ol>
<li>进入SakuraFrp管理面板，点击左侧的<img src="https://i.loli.net/2021/07/27/1qv3Cjyzi2mZNGa.png" alt="image-20210727222515399" style="zoom:25%;" />开始创建隧道；</li>
<li>穿透节点选择<strong>海外节点</strong>（国内的节点建站需要备案，比较麻烦）；</li>
</ol>
<img src="https://i.loli.net/2021/07/27/JBX8YFWNf1rm7TK.png" alt="image-20210727222705367" style="zoom:33%;" />
<ol start="3">
<li>隧道类型选择<strong>TCP隧道</strong>、本地地址默认、本地端口设置<strong>80</strong>、其他设置默认，选择完成后大概是这个样子：</li>
</ol>
<img src="https://i.loli.net/2021/07/27/8G54TkdmFgErhBp.png" alt="image-20210727223020307" style="zoom: 33%;" />
<ol start="4">
<li>最后点击<img src="https://i.loli.net/2021/07/27/UFQI3thznyHaMgd.png" alt="image-20210727223058084" style="zoom:25%;" />完成创建；</li>
</ol>
<h2 id="_3-验证隧道可用性" tabindex="-1"><a class="header-anchor" href="#_3-验证隧道可用性" aria-hidden="true">#</a> 3.验证隧道可用性</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>由于是海外节点，不能保证一定能访问，因此我们在继续之前需要先确定这些节点可以正常访问。</p>
</div>
<ol>
<li>点击左侧<img src="https://i.loli.net/2021/07/27/nkpmFVqQKZ9vrYW.png" alt="image-20210727223222754" style="zoom:25%;" />，找到刚刚创建的隧道：</li>
</ol>
<img src="https://i.loli.net/2021/07/27/jPU71tpWngAicHb.png" alt="image-20210727223459054" style="zoom:50%;" />
<ol start="2">
<li>复制隧道的地址，然后粘贴到浏览器地址栏中，回车；</li>
</ol>
<blockquote>
<p>我这里是：jp-tyo-ilj-1.natfrp.cloud</p>
</blockquote>
<ol start="3">
<li>如果出现以下页面即表示可以正常访问，可以继续进行下一步，否则请回到第二步重新选择另一条隧道；</li>
</ol>
<img src="https://i.loli.net/2021/07/27/g5BydNEZL2TvD69.png" alt="image-20210727223836266" style="zoom:33%;" />
<h2 id="_4-配置树莓派" tabindex="-1"><a class="header-anchor" href="#_4-配置树莓派" aria-hidden="true">#</a> 4.配置树莓派</h2>
<h3 id="一-打开终端" tabindex="-1"><a class="header-anchor" href="#一-打开终端" aria-hidden="true">#</a> （一）打开终端</h3>
<p>​	打开你电脑上的终端；</p>
<details class="custom-block details"><summary>MacOS用户</summary>
<p>按下 command + 空格 ，搜索<strong>终端</strong>，直接打开。</p>
</details>
<details class="custom-block details"><summary>Windows用户</summary>
<p>按下 windows + R ，输入<strong>cmd</strong>，回车运行。</p>
</details>
<h3 id="二-连接你的树莓派" tabindex="-1"><a class="header-anchor" href="#二-连接你的树莓派" aria-hidden="true">#</a> （二）连接你的树莓派</h3>
<p>​	在终端中使用以下指令连接你的树莓派：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#注意替换为你自己的树莓派ip</span>
<span class="token function">ssh</span> pi@<span class="token operator">&lt;</span>你的树莓派内网ip<span class="token operator">></span>
<span class="token comment">#举例：</span>
<span class="token function">ssh</span> pi@192.168.1.3
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>​	如果出现类似以下的东西，输入<code>yes</code>后回车</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>The authenticity of host '192.168.1.3 (192.168.1.3)' can't be established.
ECDSA key fingerprint is SHA256:owaWDWAdDfUyfBEr9NmMZwOT9ZwIUhmqE.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>​	之后会出现如下提示，输入<code>raspberry</code>然后回车即可登录</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>pi@192.168.1.3's password:
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>这里实际上是输入树莓派的登陆密码（不是你那个Octoprint的密码），所以不会显示你输入的东西（想想你登录其他一些东西的时候是不是一般也用星号代替输入的东西），不要觉得是键盘坏了。</p>
</div>
<p>​	出现如下所示即表示登录成功：</p>
<img src="https://i.loli.net/2021/07/27/NHs1K7x3njoheFd.png" alt="image-20210727230410690" style="zoom: 33%;" />
<h3 id="三-安装sakurafrp" tabindex="-1"><a class="header-anchor" href="#三-安装sakurafrp" aria-hidden="true">#</a> （三）安装SakuraFrp</h3>
<p>​	首先使用以下命令切换至root账户，会要求你在输入一次密码<code>raspberry</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">su</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	使用如下命令下载文件：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/local/bin
<span class="token function">curl</span> -Lo frpc https://getfrp.sh/d/frpc_linux_armv7
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>​	如果报错请尝试以下命令，如果都报错就多尝试几遍：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/local/bin
<span class="token function">curl</span> -Lo frpc https://getfrp.sh/d/frpc_linux_armv7
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>​	校验文件是否完整下载，如果输出值为<code>32FE4A04F4394105C9BB4DFF916F04BC</code>（不区分大小写）即表示下载正确：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">chmod</span> <span class="token number">755</span> frpc
<span class="token function">ls</span> -ls frpc
md5sum frpc
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="四-配置sakurafrp" tabindex="-1"><a class="header-anchor" href="#四-配置sakurafrp" aria-hidden="true">#</a> （四）配置SakuraFrp</h3>
<p>​	执行以下命令，可以看到如图所示画面：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">nano</span> /lib/systemd/system/frpc@.service
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><img src="https://i.loli.net/2021/07/30/KLGdWXI7jBc69zv.png" alt="image-20210730221301498" style="zoom:50%;" />
<p>​	将以下代码复制粘贴进去：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>SakuraFrp Service
<span class="token assign-left variable">After</span><span class="token operator">=</span>network.target

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Type</span><span class="token operator">=</span>idle
<span class="token assign-left variable">User</span><span class="token operator">=</span>nobody
<span class="token assign-left variable">Restart</span><span class="token operator">=</span>on-failure
<span class="token assign-left variable">RestartSec</span><span class="token operator">=</span>60s
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/local/bin/frpc -f %i

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>​	按下<code>ctrl+o</code>后 <code>回车</code>保存，然后按下<code>ctrl+x</code>退出 。</p>
<p>​	再执行以下命令即可更新配置：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl daemon-reload
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="五-启动frp" tabindex="-1"><a class="header-anchor" href="#五-启动frp" aria-hidden="true">#</a> （五）启动Frp</h3>
<p>​	回到你的隧道列表，移动到最右侧有一个<strong>配置文件</strong>，点开，然后复制启动参数（不需要前面的<code>-f</code>）。然后回到终端输入如下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl start frpc@<span class="token operator">&lt;</span>你的启动参数<span class="token operator">></span>
<span class="token comment">#举例</span>
systemctl start frpc@4beb73bf7:171054
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>​	接着刷新你的隧道列表，如果你刚刚创建的隧道前面显示绿色的**[在线]**，那么恭喜你你已经完成了内网穿透。</p>
<img src="https://i.loli.net/2021/07/27/vqjXgJo15dwyQtF.png" alt="image-20210727233944170" style="zoom:50%;" />
<h2 id="_5-访问测试" tabindex="-1"><a class="header-anchor" href="#_5-访问测试" aria-hidden="true">#</a> 5.访问测试</h2>
<p>​	你的外网访问地址由两部分组成：地址+端口，使用冒号（英文冒号）连接</p>
<img src="https://i.loli.net/2021/07/27/jPU71tpWngAicHb.png" alt="image-20210727223459054" style="zoom:50%;" />
<p>​	比如我这里地址就是<code>jp-tyo-ilj-1.natfrp.cloud</code>，端口就是<code>56641</code>，那么我的外网访问地址为：</p>
<blockquote>
<p>jp-tyo-ilj-1.natfrp.cloud:56641</p>
</blockquote>
<p>​	在浏览器中输入这个地址，如果一切正常那么你将打开Octoprint的登陆界面。</p>
<img src="https://i.loli.net/2021/07/27/Z8gK67DVzQuftNo.png" alt="image-20210727234507213" style="zoom:50%;" />
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>恭喜你，你已经可以在全世界的任何一个有网络的地方控制你的3D打印机了！</p>
</div>
<h2 id="_6-配置自启动" tabindex="-1"><a class="header-anchor" href="#_6-配置自启动" aria-hidden="true">#</a> 6.配置自启动</h2>
<p>​	输入以下命令创建启动脚本：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">nano</span> /startFrpc.sh
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	添加你刚才的启动命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> systemctl start frpc@<span class="token operator">&lt;</span>你的启动参数<span class="token operator">></span>
<span class="token comment">#举例</span>
<span class="token function">sudo</span> systemctl start frpc@4beb73bf7:171054
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>这里为了防止启动失败在命令前添加了sudo（以超级用户身份执行）。</p>
</div>
<p>​	按下<code>ctrl+o</code>后 <code>回车</code>保存，然后按下<code>ctrl+x</code>退出 。</p>
<p>​	接着给脚本添加执行权限：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">chmod</span> +x /startFrpc.sh
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	打开系统开机启动配置文件，打开后如下所示：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">nano</span> /etc/rc.local
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><img src="https://i.loli.net/2021/07/30/XiurfzE9yaCc6RO.png" alt="image-20210730222103620" style="zoom:50%;" />
<blockquote>
<p>如果一片空白，可能是要求确认编辑权限，输入 y 回车就行。</p>
</blockquote>
<p>​	在<code>exit 0</code>前面添加刚刚创建的启动脚本：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#要添加的内容</span>
<span class="token function">sudo</span> <span class="token function">sh</span> /startFrpc.sh
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><img src="https://i.loli.net/2021/07/30/wQV5XPahtz1Zrn9.png" alt="image-20210730221853779" style="zoom:50%;" />
<p>​	按下<code>ctrl+o</code>后 <code>回车</code>保存，然后按下<code>ctrl+x</code>退出 。</p>
<blockquote>
<p>如果不生效，那么将rc.local文件头部/bin/sh修改为/bin/bash</p>
</blockquote>
</template>
