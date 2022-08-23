<template><div class="custom-container tip"><p class="custom-container-title">简介</p>
<p>这是一块基于安信可的ESP-12S（后者基于乐鑫ESP8266），并为HomeKit智能家居开发准备了一些基础电路的集成开发板。多IO口，拥有更加稳定的网络连接可适应复杂的项目开发。项目基于Apple Homekit与ESP8266，并且全部开源。</p>
</div>
<!-- more -->
<p><img src="https://i.loli.net/2021/04/25/7UIwNgHVvEPiTyp.png" alt="" loading="lazy"></p>
<h2 id="_0x0-总体概述" tabindex="-1"><a class="header-anchor" href="#_0x0-总体概述" aria-hidden="true">#</a> 0x0 总体概述</h2>
<ul>
<li>
<p>Kernel板主要基于安信可的ESP-12S（后者基于乐鑫ESP8266），为HomeKit智能家居开发准备了一些基础电路。因此更适合没有太多电路基础的新手着手进行Homekit智能家居的开发。相比于ESP-01在保留必须的一部分功能后尽可能的引出了更多的可用IO口（6个），使之可以适应更复杂的项目开发，并且拥有更加稳定的网络连接。项目基于Apple Homekit与ESP8266，并且全部开源。</p>
</li>
<li>
<p>该核心板全部文件托管在：<a href="https://github.com/ColdeZhang/Kernel_Board" target="_blank" rel="noopener noreferrer">Github仓库<ExternalLinkIcon/></a></p>
</li>
<li>
<p>该核心板配套的代码教程参见：<a href="https://blog.deercloud.site/how_to_code_homekit_with_arduino" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a></p>
</li>
<li>
<p>该核心板配套的扩展版系列目前有：？？、？？、？？、？？</p>
</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>从1.0版本开始新增USB-Type-C接口支持供电+烧写程序，无需外接TTL转USB</p>
</div>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>此页面只显示最新版本开发板的资料，旧版本请移步至具体版本的对应文件夹：<a href="https://github.com/ColdeZhang/Kernel_Board/tree/main/Ver_0_X" target="_blank" rel="noopener noreferrer">Ver_0_X<ExternalLinkIcon/></a></p>
</div>
<h2 id="_0x1-特点" tabindex="-1"><a class="header-anchor" href="#_0x1-特点" aria-hidden="true">#</a> 0x1 特点</h2>
<h3 id="_1-复位功能" tabindex="-1"><a class="header-anchor" href="#_1-复位功能" aria-hidden="true">#</a> 1.复位功能</h3>
<ul>
<li>Reset按键可以实行一键重启，免除了切换模式时需要拔插电源重启的麻烦。</li>
</ul>
<h3 id="_2-模式切换" tabindex="-1"><a class="header-anchor" href="#_2-模式切换" aria-hidden="true">#</a> 2.模式切换</h3>
<ul>
<li>由于ESP-12S具有两种模式（运行模式与烧写模式），并且需要通过将IO0接地来手动切换。本核心板将此操作使用一个单刀双掷开关（SW1）集成在主板上，可以通过拨动开关一键切换运行模式（Normal）和烧写模式（Flash）。</li>
</ul>
<h3 id="_3-重新配对" tabindex="-1"><a class="header-anchor" href="#_3-重新配对" aria-hidden="true">#</a> 3.重新配对</h3>
<ul>
<li>因为配对信息是被写入在ESP-12S的闪存中的，所以通过Reset是无法擦除配对记录来重新配对的。</li>
<li>如果需要重新配对需要调用Apple Homekit内置函数来执行闪存内信息的重写，在本核心板配套的<a href="https://github.com/ColdeZhang/Esp8266_Homekit_Template" target="_blank" rel="noopener noreferrer">Template代码<ExternalLinkIcon/></a>中，该功能已被写在了IO13引脚上。</li>
<li>硬件层面通过一个按钮RePair，按下即可重新配对。</li>
</ul>
<h3 id="_4-恰到好处的尺寸" tabindex="-1"><a class="header-anchor" href="#_4-恰到好处的尺寸" aria-hidden="true">#</a> 4.恰到好处的尺寸</h3>
<ul>
<li>该核心板拥有恰到好处的尺寸（宽5cm），使其恰好能够放入一个常规开关盒中，十分适合用来制作一些实用的智能家居设备。</li>
</ul>
<h2 id="_0x2-使用方法" tabindex="-1"><a class="header-anchor" href="#_0x2-使用方法" aria-hidden="true">#</a> 0x2 使用方法</h2>
<h3 id="_1-运行方法" tabindex="-1"><a class="header-anchor" href="#_1-运行方法" aria-hidden="true">#</a> 1.运行方法</h3>
<ol>
<li>将右下的开关选择至Normal；</li>
<li>在任意的一个3V3引脚上连接3.3v的直流正极，任意一个GND引脚连接相应的负极即可启动开发板。</li>
<li>在开发中如果需要重启开发板，可以直接按下主控板上的Reset按键执行重启。（该操作不会擦除ESP-12S上内存与闪存的数据）</li>
</ol>
<h3 id="_2-烧写程序" tabindex="-1"><a class="header-anchor" href="#_2-烧写程序" aria-hidden="true">#</a> 2.烧写程序</h3>
<ol>
<li>
<p>将右下的开关选择至Flash，按下Reset按钮执行重启，重启后主控板处于烧写模式；</p>
</li>
<li>
<p>将USB-Type-C数据线连接至核心板，另一段连接至电脑，即可从电脑烧写程序至开发板了；</p>
</li>
<li>
<p>烧写完成后需要将开关切换回Normal模式，再按下重启按钮；</p>
</li>
</ol>
<h2 id="_0x3-外观尺寸" tabindex="-1"><a class="header-anchor" href="#_0x3-外观尺寸" aria-hidden="true">#</a> 0x3 外观尺寸</h2>
<p><img src="https://i.loli.net/2021/04/25/t4cLPs1NkHiwRTF.png" alt="image-20210323084205867" loading="lazy"></p>
<h2 id="_0x4-管脚定义" tabindex="-1"><a class="header-anchor" href="#_0x4-管脚定义" aria-hidden="true">#</a> 0x4 管脚定义</h2>
<p>略</p>
<h2 id="_0x5-原理图" tabindex="-1"><a class="header-anchor" href="#_0x5-原理图" aria-hidden="true">#</a> 0x5 原理图</h2>
<p><img src="https://i.loli.net/2021/04/25/G9FTKOhui3PEt5R.png" alt="image-20210323084055685" loading="lazy"></p>
<h2 id="_0x6-二次开发说明" tabindex="-1"><a class="header-anchor" href="#_0x6-二次开发说明" aria-hidden="true">#</a> 0x6 二次开发说明</h2>
<ol>
<li>本项目全部开源，可直接从仓库获得所有工程文件；</li>
<li>项目电路图、pcb以及Gerber文件的生成全部使用<a href="https://www.kicad.org" target="_blank" rel="noopener noreferrer">KiCad<ExternalLinkIcon/></a>操作（工程文件后缀为pro）；</li>
<li>项目从成本的角度出发，仅使用了单层电路板；</li>
<li>为了便于焊接，在元器件布局以及选型上都并不是电路设计理论上的最优解；</li>
<li>其中ESP-12S可自由替换ESP-12F或同系列芯片；</li>
</ol>
</template>
