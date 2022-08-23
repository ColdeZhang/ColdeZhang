<template><div class="custom-container tip"><p class="custom-container-title">简介</p>
<p>这篇文章记录了如何实现一个像这样的个人博客网站，整个过程不用花一分钱也不用学习复杂的前端开发。</p>
</div>
<!-- more -->
<h2 id="技术思路" tabindex="-1"><a class="header-anchor" href="#技术思路" aria-hidden="true">#</a> 技术思路</h2>
<h3 id="目标" tabindex="-1"><a class="header-anchor" href="#目标" aria-hidden="true">#</a> 目标</h3>
<ol>
<li>完全免费；</li>
<li>易于维护；</li>
<li>简洁美观；</li>
</ol>
<h3 id="思路" tabindex="-1"><a class="header-anchor" href="#思路" aria-hidden="true">#</a> 思路</h3>
<ol>
<li>将博客配置完成后上传至GitHub；</li>
<li>GitHub Action 自动运行 Vuepress 生成网站并发布到新分支；</li>
<li>Netlify 自动从新分支获取生成后的静态网站；</li>
</ol>
<p>@flowstart
local=&gt;operation: 本地文件
master=&gt;parallel: [GitHub仓库]-main分支
out=&gt;parallel: [GitHub仓库]-out分支
action=&gt;operation: GitHub-Action
netlify=&gt;operation: Netlify</p>
<p>local(right)-&gt;master(path2,right)-&gt;action(right)-&gt;out(path2,right)-&gt;netlify</p>
<p>@flowend</p>
<h3 id="工具" tabindex="-1"><a class="header-anchor" href="#工具" aria-hidden="true">#</a> 工具</h3>
<ol>
<li>MarkDwon;</li>
<li>GitHub;</li>
<li>GitHub Action;</li>
<li>Netlify;</li>
</ol>
<h3 id="q-a" tabindex="-1"><a class="header-anchor" href="#q-a" aria-hidden="true">#</a> Q&amp;A</h3>
<details class="custom-block details"><summary>什么是 GitHub ？</summary>
<p>这篇文章的所有内容都是建立在你已经<strong>掌握了GitHub的基本使用</strong>的基础之上，如果你还不知道什么是 GitHub 或者使用还不够熟练可以参考这篇文章：简单的 GitHub 入门使用。</p>
</details>
<details class="custom-block details"><summary>为什么是 GitHub Action ？</summary>
<p>GitHub Action 是 GitHub 提供的一款免费的云部署服务。通过 GitHub Action 可以实现远程自动化运行 Vuepress 生成静态网站。</p>
</details>
<details class="custom-block details"><summary>为什么是 Netlify ？</summary>
<p>也可以使用 GitHub Page 也是完全免费的，但是 GitHub Page 在中国境内访问速度非常慢甚至经常掉线，很难称得上“易用”（至少对用户很不友好）。所以这里通过另一个平台，自动获取我们发布到 GitHub 仓库的静态网站。</p>
</details>
<details class="custom-block details"><summary>为什么要新建一个分支？</summary>
<p>我们提交到 master 分支中的并不是网页，需要通过 Vuepress 才能生成可以被浏览器解析的网站（包括了网页、样式、路由）。而生成后的文件如果重新放进 master 可能造成版本控制的混乱进而导致网站崩溃，故在仓库下创建一个新的分支专门用于存储自动生成的网站文件， Netlify 再从这个分支中提取网站部署。</p>
</details>
<h2 id="具体实现" tabindex="-1"><a class="header-anchor" href="#具体实现" aria-hidden="true">#</a> 具体实现</h2>
<h3 id="_1-获取基础文件" tabindex="-1"><a class="header-anchor" href="#_1-获取基础文件" aria-hidden="true">#</a> 1.获取基础文件</h3>
<p>将我准备好的<a href="https://github.com/ColdeZhang/build_your_free_blog" target="_blank" rel="noopener noreferrer">基本配置文件<ExternalLinkIcon/></a>克隆到本地；</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 使用代码 clone</span>
<span class="token function">git</span> clone git://github.com/ColdeZhang/build_your_free_blog.git
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><details class="custom-block details"><summary>图形化git工具</summary>
<p>如果你采用的是图形化 git 软件，请参考对应的教程，此处不赘述。（太多啦！）</p>
</details>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>为了避免不必要的麻烦，不建议从我的项目直接 fork ，如果你想支持我的项目可以手动点击一下 star 。</p>
</div>
<h3 id="_2-修改-config-js" tabindex="-1"><a class="header-anchor" href="#_2-修改-config-js" aria-hidden="true">#</a> 2.修改 <code>config.js</code></h3>
<blockquote>
<p>这个文件在 ./docs/.vuepress/config.js
主要存放的是博客的全局配置</p>
</blockquote>
<hr>
<p><strong>标题</strong></p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// ./docs/.vuepress/config.js</span>
<span class="token keyword">module</span><span class="token punctuation">.</span><span class="token keyword">exports</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  title<span class="token operator">:</span> '求知若渴 虚怀若愚'<span class="token punctuation">,</span>
  description<span class="token operator">:</span> '<span class="token class-name">Stay</span> hungry<span class="token punctuation">,</span> stay foolish<span class="token punctuation">.</span>'
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><img src="https://i.loli.net/2021/04/27/8UyvDPY5Z6i9lcK.png" style="zoom:50%;" />
<hr>
<p><strong>作者与头像</strong></p>
<ul>
<li>
<p><code>author</code> 后填入你想展示的作者名</p>
</li>
<li>
<p><code>authorAvatar</code> 后填入你的图片地址（推荐使用图床）</p>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// ./docs/.vuepress/config.js</span>
<span class="token keyword">module</span><span class="token punctuation">.</span><span class="token keyword">exports</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    author<span class="token operator">:</span> <span class="token string">"鹿鸣"</span><span class="token punctuation">,</span>
    authorAvatar<span class="token operator">:</span> <span class="token char">'头像图片地址'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><img src="https://i.loli.net/2021/04/27/jvZ71oRqtLxhUYK.png" style="zoom:50%;" />
<details class="custom-block details"><summary>什么是头像图片地址？（图床的使用）</summary>
</details>
<hr>
<p><strong>社交链接</strong></p>
<ul>
<li>在 <code>link</code> 后填入你自己的社交网站主页；</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// ./docs/.vuepress/config.js</span>
<span class="token keyword">module</span><span class="token punctuation">.</span><span class="token keyword">exports</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    blogConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
      socialLinks<span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> icon<span class="token operator">:</span> 'reco<span class="token operator">-</span>github'<span class="token punctuation">,</span> link<span class="token operator">:</span> 'your_url' <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> icon<span class="token operator">:</span> 'reco<span class="token operator">-</span>bilibili'<span class="token punctuation">,</span> link<span class="token operator">:</span> 'your_url' <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> icon<span class="token operator">:</span> 'reco<span class="token operator">-</span>zhihu'<span class="token punctuation">,</span> link<span class="token operator">:</span> 'your_url' <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> icon<span class="token operator">:</span> 'reco<span class="token operator">-</span>qq'<span class="token punctuation">,</span> link<span class="token operator">:</span> 'your_url' <span class="token punctuation">}</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><img src="https://i.loli.net/2021/04/27/s2ENtYDzjVZ4GWb.png" style="zoom:50%;" />
<blockquote>
<p>不需要的可以直接删除，全删掉也可以</p>
</blockquote>
<hr>
<p><strong>留言板配置</strong></p>
<ul>
<li>
<p><code>appId</code> 后填入你的App ID；</p>
</li>
<li>
<p><code>appKey</code> 后填入你的App Key；</p>
</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// ./docs/.vuepress/config.js</span>
<span class="token keyword">module</span><span class="token punctuation">.</span><span class="token keyword">exports</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  themeConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
    valineConfig<span class="token operator">:</span> <span class="token punctuation">{</span>
      appId<span class="token operator">:</span> 'your_Id'<span class="token punctuation">,</span>
      appKey<span class="token operator">:</span> 'your_key'
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><details class="custom-block details"><summary>如何获得id与key</summary>
<p>请先<a href="https://leancloud.cn/dashboard/login.html#/signin" target="_blank" rel="noopener noreferrer">登录<ExternalLinkIcon/></a>或<a href="https://leancloud.cn/dashboard/login.html#/signup" target="_blank" rel="noopener noreferrer">注册<ExternalLinkIcon/></a> <code>LeanCloud</code>, 进入<a href="https://leancloud.cn/dashboard/applist.html#/apps" target="_blank" rel="noopener noreferrer">控制台<ExternalLinkIcon/></a>后点击左下角<a href="https://leancloud.cn/dashboard/applist.html#/newapp" target="_blank" rel="noopener noreferrer">创建应用<ExternalLinkIcon/></a>：</p>
<p><img src="https://i.loli.net/2019/06/21/5d0c995c86fac81746.jpg" alt="" loading="lazy"></p>
<p>应用创建好以后，进入刚刚创建的应用，选择左下角的<code>设置</code>&gt;<code>应用Key</code>，然后就能看到你的<code>APP ID</code>和<code>APP Key</code>了：</p>
<p><img src="https://i.loli.net/2019/06/21/5d0c997a60baa24436.jpg" alt="" loading="lazy"></p>
</details>
<h3 id="_3-修改-readme-md" tabindex="-1"><a class="header-anchor" href="#_3-修改-readme-md" aria-hidden="true">#</a> 3.修改 <code>README.md</code></h3>
<blockquote>
<p>这个文件在 ./docs/README.md
实质是博客首页的源文件</p>
</blockquote>
<p><strong>首页头图配置</strong></p>
<ul>
<li><code>bgImage</code> 后填入你的头图地址（推荐使用图床）</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>bgImage: 'your_head_image_url'
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><img src="https://i.loli.net/2021/04/27/SVbfU8MWInpuR6J.png" style="zoom:50%;" />
<h3 id="_4-创建一个新的仓库" tabindex="-1"><a class="header-anchor" href="#_4-创建一个新的仓库" aria-hidden="true">#</a> 4.创建一个新的仓库</h3>
<ul>
<li>在 GitHub 上新建一个仓库，这个仓库专门用于存放你的博客的源代码以及自动生成的网站文件。</li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<ol>
<li>仓库类型请选择  <code>public</code> （公开），私有仓库可能会导致他人无法访问；</li>
<li>不要勾选创建 <code>README.md</code> 文件；</li>
</ol>
</div>
<h3 id="_5-上传" tabindex="-1"><a class="header-anchor" href="#_5-上传" aria-hidden="true">#</a> 5.上传</h3>
<ul>
<li>将所有文件 commit 至 master 分支，然后 push 到 GitHub 仓库。</li>
<li>如果一切正常，点击仓库主页的 <code>Action</code> 标签，应该就能看到你的项目正在被生成与部署。</li>
</ul>
<p><img src="https://i.loli.net/2021/04/28/v7iNULZ96yPX5Jg.png" alt="" loading="lazy"></p>
<details class="custom-block details"><summary>使用 GitHub Page 访问</summary>
<p>其实做到这一步你的网站已经可以访问了，GitHub 提供了 GitHub Page 服务，用于托管项目静态网站。</p>
<ol>
<li>
<p>在 GitHub 项目主页选择 <code>Setting</code> 标签，选择 <code>Pages</code> 一栏；
<img src="https://i.loli.net/2021/04/28/GEtxiybk1Czjceo.png" style="zoom:30%;" /></p>
</li>
<li>
<p><code>Source</code> 下选择 <code>out</code>分支，单击 <code>Save</code> 保存；
<img src="https://i.loli.net/2021/04/28/H6FgRbsuNc2LSXJ.png" alt="" loading="lazy"></p>
</li>
<li>
<p>接着 GitHub 会提示你，你的网站已经成功发布在了对应的网址上；
<img src="https://i.loli.net/2021/04/28/wAdQ9Iloq3ms7BH.png" alt="" loading="lazy"></p>
</li>
<li>
<p>你还可以在 <code>Custom Domain</code> 中设置你自己的域名（不要忘记解析到第三步中的网址上）；
<img src="https://i.loli.net/2021/04/28/ciNypGkSaTCAX1W.png" alt="" loading="lazy"></p>
</li>
</ol>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>实际使用中，GitHub Page 在中国大陆访问速度慢得离谱，掉线更是家常便饭，使用体验极差。</p>
</div>
</details>
<p>:::</p>
<h3 id="_6-配置netlify" tabindex="-1"><a class="header-anchor" href="#_6-配置netlify" aria-hidden="true">#</a> 6.配置Netlify</h3>
<h3 id="_7-检查与验证" tabindex="-1"><a class="header-anchor" href="#_7-检查与验证" aria-hidden="true">#</a> 7.检查与验证</h3>
<h3 id="q-a-1" tabindex="-1"><a class="header-anchor" href="#q-a-1" aria-hidden="true">#</a> Q&amp;A</h3>
<details class="custom-block details"><summary>GitHub Action 在哪里？</summary>
<p>由于 GitHub Action 本身就是自动化部署流程，因此仅需要配置即可自动运行。而对于相同的功能它的配置文件是通用的，我已经写好放置在<code>.github/workflows/article_pg.yml</code>无需做额外的修改，如有特殊需要可自行研究。</p>
</details>
<h2 id="使用与完善" tabindex="-1"><a class="header-anchor" href="#使用与完善" aria-hidden="true">#</a> 使用与完善</h2>
<details class="custom-block details"><summary>为什么使用 MarkDown 写</summary>
<p>MarkDown 是一种简洁易用的文本标记语言，它具有统一的格式与规范。使用 MarkDown 撰写博客后可以利用 Vuepress 根据预先设定的模板直接生成静态网站。</p>
</details>
</template>
