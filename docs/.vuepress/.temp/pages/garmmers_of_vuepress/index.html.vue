<template><div class="custom-container tip"><p class="custom-container-title">简介</p>
<p>这里记录了vuepress中支持的一些mardown扩展语法 (访问密码：123456)</p>
</div>
<!-- more -->
<h2 id="头文件属性配置" tabindex="-1"><a class="header-anchor" href="#头文件属性配置" aria-hidden="true">#</a> 头文件属性配置</h2>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml"><span class="token key atrule">title</span><span class="token punctuation">:</span> 这个是标题
<span class="token key atrule">date</span><span class="token punctuation">:</span> <span class="token string">'2019-08-08'</span>
<span class="token key atrule">sidebar</span><span class="token punctuation">:</span> <span class="token string">'auto'</span>
<span class="token key atrule">categories</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> 学习笔记
<span class="token key atrule">tags</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> Template
 <span class="token punctuation">-</span> Markdown
<span class="token key atrule">keys</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> <span class="token string">'e10adc3949ba59abbe56e057f20f883e'</span>
<span class="token key atrule">article</span><span class="token punctuation">:</span> <span class="token boolean important">true</span></span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="title" tabindex="-1"><a class="header-anchor" href="#title" aria-hidden="true">#</a> title:</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>文章的标题</p>
</div>
<h3 id="date" tabindex="-1"><a class="header-anchor" href="#date" aria-hidden="true">#</a> date:</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>文章展示的发布时间，格式为 <code>year-month-day</code></p>
</div>
<h3 id="sidebar" tabindex="-1"><a class="header-anchor" href="#sidebar" aria-hidden="true">#</a> sidebar:</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>是否自动生成文章大纲</p>
<ul>
<li><code>auto</code> 跟随全局设置</li>
<li><code>false</code> 强制禁用</li>
<li><code>true</code> 强制启用</li>
</ul>
</div>
<h3 id="categories" tabindex="-1"><a class="header-anchor" href="#categories" aria-hidden="true">#</a> categories:</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>文章的分类</p>
</div>
<h3 id="tags" tabindex="-1"><a class="header-anchor" href="#tags" aria-hidden="true">#</a> tags:</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>文章的标签，注意vue的默认设置下标签不能超过四个，否则构建时会报错</p>
</div>
<h3 id="keys" tabindex="-1"><a class="header-anchor" href="#keys" aria-hidden="true">#</a> keys:</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>如果你的密码是 <code>123456</code>，需要将密码字符串设置为32位的 md5 加密密文，也就是 <code>e10adc3949ba59abbe56e057f20f883e</code>。网站发布后，在密码输入框输入 <code>123456</code> 即可进入网站，同时他人也无法通过代码中的密文知道你的密码，但是你一定要记住自己的密码。</p>
</div>
<h3 id="article" tabindex="-1"><a class="header-anchor" href="#article" aria-hidden="true">#</a> article:</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>设置文章是否显示在博客的列表中</p>
<p>如果设置为<code>false</code>那么该文章不会出现在所有文章的列表中，但是可以通过链接访问</p>
</div>
<h3 id="permalink" tabindex="-1"><a class="header-anchor" href="#permalink" aria-hidden="true">#</a> permalink:</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>由于vuepress在将Markdown转化为html时会使用文件名作地址，为了方便在博客内使用超链接进行文章跳转，vrepress支持设置永久链接。</p>
<p>当设置了这个永久链接后，该文章的链接会永远与这个设置保持一致（不会随着文件名改变）。</p>
</div>
<h3 id="sidebardepth" tabindex="-1"><a class="header-anchor" href="#sidebardepth" aria-hidden="true">#</a> sidebarDepth:</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>设置侧边栏的深度（最深显示几层），最大可设置为2，索引至h3。</p>
</div>
<h2 id="各种标注容器" tabindex="-1"><a class="header-anchor" href="#各种标注容器" aria-hidden="true">#</a> 各种标注容器</h2>
<div class="custom-container tip"><p class="custom-container-title">这个是提示</p>
<p>这个提示显示为绿框</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>    ::: tip 这个是提示
    这个提示显示为绿框
    :::
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></div>
<div class="custom-container warning"><p class="custom-container-title">这个是警告</p>
<p>这个警告显示为绿框</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>    ::: warning 这个是警告
    这个警告显示为绿框
    :::
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></div>
<div class="custom-container danger"><p class="custom-container-title">这个是危险</p>
<p>这个危险显示为红框</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>    ::: danger 这个是危险
    这个危险显示为红框
    :::
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></div>
<p>::: theorem 牛顿第一定律
假若施加于某物体的外力为零，则该物体的运动速度不变。</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>    ::: theorem 牛顿第一定律
    假若施加于某物体的外力为零，则该物体的运动速度不变。
    ::: right
    来自 <span class="token url">[<span class="token content">维基百科</span>](<span class="token url">https://zh.wikipedia.org/wiki/%E7%89%9B%E9%A1%BF%E8%BF%90%E5%8A%A8%E5%AE%9A%E5%BE%8B</span>)</span>
    :::
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="custom-container right">
<p>来自 <a href="https://zh.wikipedia.org/wiki/%E7%89%9B%E9%A1%BF%E8%BF%90%E5%8A%A8%E5%AE%9A%E5%BE%8B" target="_blank" rel="noopener noreferrer">维基百科<ExternalLinkIcon/></a></p>
</div>
<details class="custom-block details"><summary>点击展开</summary>
<p>这是一个详情块，在 IE / Edge 中不生效</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>    ::: details 点击展开
    这是一个详情块，在 IE / Edge 中不生效
    :::
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></details>
<h2 id="流程图" tabindex="-1"><a class="header-anchor" href="#流程图" aria-hidden="true">#</a> 流程图</h2>
<p>@flowstart
st=&gt;start: Start:&gt;http://www.google.com[blank]
e=&gt;end:&gt;http://www.google.com
op1=&gt;operation: My Operation
sub1=&gt;subroutine: My Subroutine
cond=&gt;condition: Yes
or No?:&gt;http://www.google.com
io=&gt;inputoutput: catch something...
para=&gt;parallel: parallel tasks</p>
<p>st-&gt;op1-&gt;cond
cond(yes)-&gt;io-&gt;e
cond(no)-&gt;para
para(path1, bottom)-&gt;sub1(right)-&gt;op1
para(path2, top)-&gt;op1
@flowend</p>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token comment">// docs/package.json</span>
<span class="token property">"devDependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"vuepress-plugin-flowchart"</span><span class="token operator">:</span> <span class="token string">"^1.4.3"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="引用" tabindex="-1"><a class="header-anchor" href="#引用" aria-hidden="true">#</a> 引用</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// .vuepress/config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">'flowchart'</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="基本语法定义" tabindex="-1"><a class="header-anchor" href="#基本语法定义" aria-hidden="true">#</a> 基本语法定义</h3>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>@flowstart [preset]

<span class="token comment">&lt;!-- Your flowchart code here. --></span>

@flowend
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="start-end-开始与结束" tabindex="-1"><a class="header-anchor" href="#start-end-开始与结束" aria-hidden="true">#</a> Start &amp; End（开始与结束）</h3>
<ul>
<li><code>[Variable]=&gt;start: [Text]</code></li>
<li><code>[Variable]=&gt;end: [Text]</code></li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>@flowstart
st=>start: Start
e=>end: End

st->e
@flowend
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>@flowstart
st=&gt;start: Start
e=&gt;end: End</p>
<p>st-&gt;e
@flowend</p>
<h3 id="operation-操作" tabindex="-1"><a class="header-anchor" href="#operation-操作" aria-hidden="true">#</a> Operation（操作）</h3>
<ul>
<li><code>[Variable]=&gt;operation: [Text]</code></li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>@flowstart
process=>operation: Operation
e=>end: End

process->e
@flowend
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>@flowstart
process=&gt;operation: Operation
e=&gt;end: End</p>
<p>process-&gt;e
@flowend</p>
<h3 id="inputoutput-输入输出" tabindex="-1"><a class="header-anchor" href="#inputoutput-输入输出" aria-hidden="true">#</a> Inputoutput（输入输出）</h3>
<ul>
<li><code>[Variable]=&gt;inputoutput: [Text]</code></li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>@flowstart
process=>inputoutput: Inputoutput
e=>end: End

process->e
@flowend
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>@flowstart
process=&gt;inputoutput: Inputoutput
e=&gt;end: End</p>
<p>process-&gt;e
@flowend</p>
<h3 id="subroutine" tabindex="-1"><a class="header-anchor" href="#subroutine" aria-hidden="true">#</a> Subroutine</h3>
<ul>
<li><code>[Variable]=&gt;subroutine: [Text]</code></li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>@flowstart
process=>subroutine: Subroutine
e=>end: End

process->e
@flowend
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>@flowstart
process=&gt;subroutine: Subroutine
e=&gt;end: End</p>
<p>process-&gt;e
@flowend</p>
<h3 id="condition-条件判断" tabindex="-1"><a class="header-anchor" href="#condition-条件判断" aria-hidden="true">#</a> Condition（条件判断）</h3>
<ul>
<li>
<p><code>[Variable]=&gt;condition: [Text]</code></p>
</li>
<li>
<p><code>[Variable]([yesText])-&gt;[Position]</code></p>
</li>
<li>
<p><code>[Variable]([noText])-&gt;[Position]</code></p>
</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>@flowstart
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
@flowend
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>@flowstart
cond=&gt;condition: Process?
process=&gt;operation: Process
e=&gt;end: End</p>
<p>cond(yes)-&gt;process-&gt;e
cond(no)-&gt;e
@flowend</p>
<h3 id="parallel-平行" tabindex="-1"><a class="header-anchor" href="#parallel-平行" aria-hidden="true">#</a> Parallel（平行）</h3>
<ul>
<li>
<p><code>[Variable]=&gt;parallel: [Text]</code></p>
</li>
<li>
<p><code>[Variable](path1, direction)-&gt;[Position]</code></p>
</li>
<li>
<p><code>[Variable](path1, direction)-&gt;[Position]</code></p>
</li>
</ul>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>@flowstart
para=>parallel: parallel tasks
process=>operation: Process
e=>end: End

para(path1, bottom)->process->e
para(path2)->e
@flowend
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>@flowstart
para=&gt;parallel: parallel tasks
process=&gt;operation: Process
e=&gt;end: End</p>
<p>para(path1, bottom)-&gt;process-&gt;e
para(path2)-&gt;e
@flowend</p>
<h3 id="showcase-展示" tabindex="-1"><a class="header-anchor" href="#showcase-展示" aria-hidden="true">#</a> Showcase（展示）</h3>
<h4 id="_1-ordinary-process" tabindex="-1"><a class="header-anchor" href="#_1-ordinary-process" aria-hidden="true">#</a> #1 Ordinary process</h4>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>@flowstart
stage1=>operation: Stage 1
stage2=>operation: Stage 2
stage3=>operation: Stage 3

stage1->stage2->stage3
@flowend
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>@flowstart
stage1=&gt;operation: Stage 1
stage2=&gt;operation: Stage 2
stage3=&gt;operation: Stage 3</p>
<p>stage1-&gt;stage2-&gt;stage3
@flowend</p>
<h4 id="_2-complex-process" tabindex="-1"><a class="header-anchor" href="#_2-complex-process" aria-hidden="true">#</a> #2 Complex process</h4>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>@flowstart
st=>start: Start|past:>http://www.google.com[blank]
e=>end: End|future:>http://www.google.com
op1=>operation: My Operation|past
op2=>operation: Stuff|current
sub1=>subroutine: My Subroutine|invalid
cond=>condition: Yes
or No?|approved:>http://www.google.com
c2=>condition: Good idea|rejected
io=>inputoutput: catch something...|future

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
@flowend
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>@flowstart
st=&gt;start: Start|past:&gt;http://www.google.com[blank]
e=&gt;end: End|future:&gt;http://www.google.com
op1=&gt;operation: My Operation|past
op2=&gt;operation: Stuff|current
sub1=&gt;subroutine: My Subroutine|invalid
cond=&gt;condition: Yes
or No?|approved:&gt;http://www.google.com
c2=&gt;condition: Good idea|rejected
io=&gt;inputoutput: catch something...|future</p>
<p>st-&gt;op1(right)-&gt;cond
cond(yes, right)-&gt;c2
cond(no)-&gt;sub1(left)-&gt;op1
c2(yes)-&gt;io-&gt;e
c2(no)-&gt;op2-&gt;e
@flowend</p>
<h4 id="_3-ant-preset" tabindex="-1"><a class="header-anchor" href="#_3-ant-preset" aria-hidden="true">#</a> #3 Ant Preset</h4>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code>@flowstart ant
st=>start: Start:>http://www.google.com[blank]
e=>end:>http://www.google.com
op1=>operation: My Operation
sub1=>subroutine: My Subroutine
cond=>condition: Yes
or No?:>http://www.google.com
io=>inputoutput: catch something...
para=>parallel: parallel tasks

st->op1->cond
cond(yes)->io->e
cond(no)->para
para(path1, bottom)->sub1(right)->op1
para(path2, top)->op1
@flowend
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>@flowstart ant
st=&gt;start: Start:&gt;http://www.google.com[blank]
e=&gt;end:&gt;http://www.google.com
op1=&gt;operation: My Operation
sub1=&gt;subroutine: My Subroutine
cond=&gt;condition: Yes
or No?:&gt;http://www.google.com
io=&gt;inputoutput: catch something...
para=&gt;parallel: parallel tasks</p>
<p>st-&gt;op1-&gt;cond
cond(yes)-&gt;io-&gt;e
cond(no)-&gt;para
para(path1, bottom)-&gt;sub1(right)-&gt;op1
para(path2, top)-&gt;op1
@flowend</p>
</template>
