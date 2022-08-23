<template><div class="custom-container tip"><p class="custom-container-title">Abstract</p>
<p>This article introduces some advantages of 3D PRINTING, the design principles of FDM(Fused Deposition Modeling) 3D PRINTER, and the process of the device and the test and analysis on printer performance were presented. I share some useful experience in operating.</p>
</div>
<!-- more -->
<h2 id="引言-introduction" tabindex="-1"><a class="header-anchor" href="#引言-introduction" aria-hidden="true">#</a> 引言（Introduction）</h2>
<p>3D打印（3D PRINTING）即3D打印技术或3D打印制造。是20世纪80年代才兴起的一门新兴的技术，是21世纪制造业最具影响的技术之一。</p>
<p>3D打印技术是由CAD模型直接驱动的快速制造复杂形状的三维实体的技术总称。简单的讲，3D打印制造技术就是快速制造新产品首版样件的技术。该技术突破了制造业的传统模式，特别适合于新产品的开发、单件或少批量产品试制等,提高研发效率和降低研发成本。</p>
<p>它是机械工程、计算机CAD、电子技术、数控技术、激光技术的综合技术。</p>
<p>自从美国3D公司在1987年推出世界上第一台商用快速原形制造设备以来，快速原形技术快速发展。投入的研究经费大幅增加，技术成果丰硕。原形化系统产品的销量高速增长。在这方面美国，日本一直处于领先地位，我国在这方面起步较晚，但是奋起直追，开展研究并取得一定成果，国内也有些成熟的产品问世，它们正在各种生产领域上发挥着作用。(引用来源3)</p>
<h2 id="_1-advantages-3d打印的优势" tabindex="-1"><a class="header-anchor" href="#_1-advantages-3d打印的优势" aria-hidden="true">#</a> 1.[advantages] 3D打印的优势</h2>
<h3 id="_1-1机械制造" tabindex="-1"><a class="header-anchor" href="#_1-1机械制造" aria-hidden="true">#</a> 1.1机械制造</h3>
<p>传统的机械制造开发一个产品需要较多设备以及相关设备的技术人员，而初代开发出的产品往往不能满足市场需要，需要进行多次修改从而满足市场需要。这样，产品的生产周期长、投资巨大。因此越来越来无法满足现代高速发展的市场的需求。</p>
<p>而3D打印技术相对于传统生产的优势便体现了出来。它可以帮助产品生产者快速生产出产品，从而缩短了生产周期节约了成本。</p>
<h3 id="_1-2-医学" tabindex="-1"><a class="header-anchor" href="#_1-2-医学" aria-hidden="true">#</a> 1.2 医学</h3>
<p>可以帮助快速定制假肢，缩短了假肢定制的成本减轻了假肢购买者的负担。甚至可以打印生物器官供器官移植，缓解器官移植供应不足等问题。(引用来源1)</p>
<h3 id="_1-3-家用" tabindex="-1"><a class="header-anchor" href="#_1-3-家用" aria-hidden="true">#</a> 1.3 家用</h3>
<p>假设你的孩子正在玩积木，此时正好再多一块就能完成一件非常漂亮的作品。若为了这一块积木再去买一套岂不是太浪费了？此时，便可使用3D打印技术将那一块缺少的积木打印出来，从而完成那件作品。</p>
<h2 id="_2-principle-fdm-3d打印的原理" tabindex="-1"><a class="header-anchor" href="#_2-principle-fdm-3d打印的原理" aria-hidden="true">#</a> 2.[principle] FDM 3D打印的原理</h2>
<p>国际上管惯用Additive Manufacturing(AM)增量制造表示3D打印技术，目前主流的3D打印技术有：SLS激光粉末烧结成型、3DP三维打印、SLA激光光固化、FDM熔融沉积塑形。这里主要介绍FDM。</p>
<h3 id="_2-1-fdm基本原理" tabindex="-1"><a class="header-anchor" href="#_2-1-fdm基本原理" aria-hidden="true">#</a> 2.1 FDM基本原理</h3>
<p>FDM（Fused Deposition Modeling）熔融沉积塑形，使加热喷头在计算机的控制下，根据产品零件的截面轮廓信息，作X-Y平面运动，热塑性丝状材料由供丝机构送至热熔喷头，并在喷头中加热和熔化成半液态，然后被挤压出来，有选择性的涂覆在工作台上，快速冷却后形成一层大约0.45mm厚的薄片轮廓。一层截面成型完成后工作台下降一定高度，再进行下一层的熔覆，好像一层层&quot;画出&quot;截面轮廓，如此循环，最终形成三维产品零件。</p>
<h3 id="_2-2-特点对比-定性" tabindex="-1"><a class="header-anchor" href="#_2-2-特点对比-定性" aria-hidden="true">#</a> 2.2 特点对比（定性）</h3>
<table>
<thead>
<tr>
<th></th>
<th>FDM</th>
<th>SLS</th>
<th>SLA</th>
<th>3DP</th>
</tr>
</thead>
<tbody>
<tr>
<td>打印精度</td>
<td>较高</td>
<td>高</td>
<td>极高</td>
<td>一般</td>
</tr>
<tr>
<td>成型速度</td>
<td>中</td>
<td>中</td>
<td>中</td>
<td>中</td>
</tr>
<tr>
<td>成型机械性</td>
<td>高</td>
<td>低</td>
<td>低</td>
<td>低</td>
</tr>
<tr>
<td>成型应用领域</td>
<td>广</td>
<td>一般</td>
<td>小</td>
<td>小</td>
</tr>
<tr>
<td>技术成熟度</td>
<td>高</td>
<td>高</td>
<td>高</td>
<td>一般</td>
</tr>
<tr>
<td>技术价格</td>
<td>低</td>
<td>高</td>
<td>高</td>
<td>一般</td>
</tr>
<tr>
<td>特点</td>
<td>使用环境要求低</td>
<td>可打印金属类</td>
<td>成型表面细腻</td>
<td>无显著特点</td>
</tr>
</tbody>
</table>
<p>可以看出，尽管FDM打印机在打印精度和成型效果上不如部分种类打印机，但是在成本和应用领域上具有较高优势，而一个产品的普及往往取决于其性价比的高低。普及3D打印的目标就是能让3D打印像2D打印机一样进入普通家庭。对于普通家庭FDM3D打印机已能满足其全部需要，而低廉的价格便使其最有希望成为普及到普通家庭中的3D打印机。</p>
<h2 id="_3-design-设计一台fdm-3d打印机" tabindex="-1"><a class="header-anchor" href="#_3-design-设计一台fdm-3d打印机" aria-hidden="true">#</a> 3.[design]设计一台FDM 3D打印机</h2>
<p>本人先后设计了三代打印机，前两代都存在严重的设计失误根本无法运行，因此此处设计均为3.0及以上。</p>
<h3 id="_3-1-思路" tabindex="-1"><a class="header-anchor" href="#_3-1-思路" aria-hidden="true">#</a> 3.1 思路</h3>
<h4 id="_3-1-1-整体结构" tabindex="-1"><a class="header-anchor" href="#_3-1-1-整体结构" aria-hidden="true">#</a> 3.1.1 整体结构</h4>
<p>依据FDM 3D打印原理，首先明确了这台3D打印机的打印头理论上需要在3个方向轴上移动，但是把动作集中在打印头上会使得机械设计复杂，成本高，制作难度大。</p>
<p>在2D打印中，要求打印头作XY平面运动，但在2D打印机的设计中，人们往往只让打印头作X方向运动，同时纸张作Y方向运动这样便大大优化了2D打印机的设计。</p>
<p>参照2D打印，3D打印机中打印平台便相当于2D打印中的纸张。便想到可以将XYZ方向的其中一个动作由打印平台来完成。</p>
<p>若由平台执行X或Y轴动作，因为打印件存在重心，随着打印高度的增加，打印件的重心也会逐渐上移。那么，当平台做水平运动速度过快时便有可能将打印件甩出。因此我选择由平台执行Z方向运动。</p>
<p>这样的优点是XY与Z可以相对独立设计，进而降低了设计的难度。</p>
<p>计划使用2020铝型材作为机器的框架，因为铝型材具有价格低廉，加工便宜，强度高，美观以及连接方便等诸多优点。</p>
<p>机器机械构件方面在1.0代时我天真地想用木材实现，缺点显而易见：根本没有精度可言。在2.0和3.1中将木材替换为5mm亚克力（有机玻璃）板，使用激光切割机加工，精度大大提高，但在3.1的测试过程中发现亚克力强度不够，长时间使用必会断裂。因此我在3.1的基础上重新设计了3.2代，利用能够勉强运行的3.1代为3.2代打印出了定制化的PLA材质机械构件。</p>
<h4 id="_3-1-2-x-y部分" tabindex="-1"><a class="header-anchor" href="#_3-1-2-x-y部分" aria-hidden="true">#</a> 3.1.2 X-Y部分</h4>
<p>因为X轴与Y轴运动需要组合设计，但本人能力有限故此处只使用最简单的正交结构。考虑到本打印机X轴方向长度大于Y轴方向长度，若从动轴选择设计为X轴，那么将会增加从动轴的质量进而增加了电机的负担导致回轴困难。故此处选择Y轴作为从动轴，X轴作为主动轴，由X轴方向电机驱动Y轴整体移动，Y 轴驱动打印头移动。进而实现了X-Y方向的平面扫描动作。</p>
<h4 id="_3-1-3-z部分" tabindex="-1"><a class="header-anchor" href="#_3-1-3-z部分" aria-hidden="true">#</a> 3.1.3 Z部分</h4>
<p>Z轴的打印平台承担的是垂直方向运动，作为打印平台对“稳”有较高要求。为达到此要求，计划左右两侧各有两根光杆和一根丝杆，由两根水平平行光杆支撑热床上下移动。</p>
<h4 id="_3-1-4-步进电机" tabindex="-1"><a class="header-anchor" href="#_3-1-4-步进电机" aria-hidden="true">#</a> 3.1.4 步进电机</h4>
<p>作为一台打印机，需要对打印头进行精确的位移控制。步进电机非超载的情况下，<a href="http://baike.baidu.com/view/1930.htm" target="_blank" rel="noopener noreferrer">电机<ExternalLinkIcon/></a>的转速、停止的位置只取决于脉冲信号的频率和脉冲数，而不受负载变化的影响。</p>
<p>当步进驱动器接收到一个脉冲信号，它就驱动步进电机按设定的方向转动一个固定的角度，称为“步距角”，它的旋转是以固定的角度一步一步运行的。可以通过控制脉冲个数来控制角位移量，从而达到准确定位的目的；同时可以通过控制<a href="http://baike.baidu.com/view/2761038.htm" target="_blank" rel="noopener noreferrer">脉冲频率<ExternalLinkIcon/></a>来控制电机转动的<a href="http://baike.baidu.com/view/36819.htm" target="_blank" rel="noopener noreferrer">速度<ExternalLinkIcon/></a>和<a href="http://baike.baidu.com/view/14423.htm" target="_blank" rel="noopener noreferrer">加速度<ExternalLinkIcon/></a>，从而达到调速的目的。故选择步进电机作为动力的核心。</p>
<h4 id="_3-1-5-传动" tabindex="-1"><a class="header-anchor" href="#_3-1-5-传动" aria-hidden="true">#</a> 3.1.5 传动</h4>
<p>传动是将动力从电机传送到另一处的机构。其设计目的是让电机可以在一定距离下安全高效的对从动装置进行控制，并可以依据设计需要对动力形式进行转换。</p>
<p>就打印机而言，需要将电机的旋转扭力转化为直线方向的拉力。为此可供选择的传动方式有：同步轮-同步带、齿轮-齿条、螺杆-螺母。</p>
<p>运动相同的距离螺杆-螺母传动需要转动更多步距角，考虑到步进电机转速过快后会发生丢步现象。对于需要移动速度的X-Y轴而言相同时间内移动相同距离螺杆-螺母转动比齿轮-齿条和同步轮-同步带传动需要更高的转速，因而发生丢步的可能性也更高。</p>
<h4 id="_3-1-6-送料机构" tabindex="-1"><a class="header-anchor" href="#_3-1-6-送料机构" aria-hidden="true">#</a> 3.1.6 送料机构</h4>
<p>送料机构可分为两种：远程送料和近程送料。</p>
<p>远程送料：由两部分组成，挤出机和送料管。送料管两段分别固定在喷头和挤出机出口，内径略大于耗材，挤出机固定在打印机其他部位。这样设计的优点是减轻了打印头部位的质量，从而降低了惯性，更易于加速减速。缺点是因为是通过管道导向送料丝，因此难免存在摩擦而损失挤出力。</p>
<img src="https://i.loli.net/2021/08/02/Z5pvXmhSWfdCItJ.png" alt="image-20210802170421582" style="zoom:50%;" />
<p>近程送料：挤出机和喷头被设计在一起，因为耗材丝本身具有一定强度，因此可直接将耗材丝通过挤出机直线送进喷口。缺点是大大增加了喷头部位质量，增加了加速减速困难（具Ｘ体问题在制作中有详细分析），降低了打印精度。</p>
<h3 id="_3-2-细化设计" tabindex="-1"><a class="header-anchor" href="#_3-2-细化设计" aria-hidden="true">#</a> 3.2 细化设计</h3>
<h4 id="_3-2-1-x-y部分" tabindex="-1"><a class="header-anchor" href="#_3-2-1-x-y部分" aria-hidden="true">#</a> 3.2.1 X-Y部分</h4>
<p>依据设计思路，结合框架结构特征，X轴将以悬挂的方式固定在框架上，Y轴悬挂在X轴上，打印头悬挂在Y轴上。</p>
<p>右图的设计为3.2版本，结构件均由3.1打印而成。在光杆上均套有直线轴承，直线轴承固定在结构件上以实现其自由滑动。</p>
<p>X轴前后结构件均有同步带拉动，以使力平衡，避免了卡轴的情况。</p>
<p>Y轴依旧采用类似于X轴的双平行杆以保证打印头的水平。</p>
<h4 id="_3-2-2-传动计算" tabindex="-1"><a class="header-anchor" href="#_3-2-2-传动计算" aria-hidden="true">#</a> 3.2.2 传动计算</h4>
<p>根据此思路，确定传动方式后需要将每个轴移动的单位距离转换为步进电机的脉冲数。</p>
<p>步进电机的设计决定了在非超载的情况下，当步进驱动器接收到一个脉冲信号，它就驱动步进电机按设定的方向转动一个固定的角度。这个角度，被称为“步距角”。最常见的三种步距角，分别是0.9°，1.8°和7.5°。这三种步距角，也就对应了步进电机每旋转一周（360°），需要的脉冲信号个数为400、200以及48。我使用的为1.8°，既不会因为步距角太大而减小精度，又不会因为过高的精度与机械精度不协条而增加成本。</p>
<p>另一个参数是步进细分数，在驱动电路电路板上。驱动电路的主芯片，通常具有驱动细分功能。所谓驱动细分，就是把原本一个脉冲信号前进的角度，再次进行分割，比如1/2、1/4或1/16等。这样，可以对步进电机进行更精细的控制。我的为16细分。</p>
<p>公式：</p>
<p class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>旋转一周的脉冲数</mtext><mo>=</mo><mfrac><mrow><mn>36</mn><msup><mn>0</mn><mo>∘</mo></msup></mrow><mtext>步距角</mtext></mfrac><mo>×</mo><mtext>细分数</mtext></mrow><annotation encoding="application/x-tex">旋转一周的脉冲数 = \frac{360^\circ}{步距角}\times细分数
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord cjk_fallback">旋转一周的脉冲数</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.0371em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3511em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord cjk_fallback">步距角</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">36</span><span class="mord"><span class="mord">0</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6741em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mbin mtight">∘</span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord cjk_fallback">细分数</span></span></span></span></span></p>
<p>X-Y轴使用的为同步带传动。对于同步轮与同步带此处涉及到齿数（n）和节距（x），齿数即同步轮一圈的齿数，节距为每相邻两齿间距离。那么同步轮旋转一圈同步带运动距离（S）为：</p>
<p class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>S</mi><mo>=</mo><mi>n</mi><mi>x</mi></mrow><annotation encoding="application/x-tex">S=nx
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.05764em;">S</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">x</span></span></span></span></span></p>
<p>因此，同步带运动距离与脉冲的关系为：</p>
<p class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>每毫米对应的脉冲数</mtext><mo>=</mo><mfrac><mtext>旋转一周的脉冲数</mtext><mi>S</mi></mfrac><mo>=</mo><mfrac><mrow><mn>36</mn><msup><mn>0</mn><mo>∘</mo></msup><mo>×</mo><mtext>细分数</mtext></mrow><mrow><mtext>步距角</mtext><mo>×</mo><mi>n</mi><mi>x</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">每毫米对应的脉冲数 = \frac{旋转一周的脉冲数}{S} = \frac{360^\circ \times 细分数}{步距角\times nx}
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord cjk_fallback">每毫米对应的脉冲数</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.0463em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.05764em;">S</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord cjk_fallback">旋转一周的脉冲数</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1297em;vertical-align:-0.7693em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord cjk_fallback">步距角</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">x</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">36</span><span class="mord"><span class="mord">0</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6741em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mbin mtight">∘</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord cjk_fallback">细分数</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.7693em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>计算得到我的脉冲为80。</p>
<p>Z轴使用的为丝杆，丝杆主要设计螺距、头数、导程三个参数。</p>
<p>导程指同一螺旋线上相邻两牙对应点的轴向距离，可以用L表示。螺距指的是螺纹上相邻的两牙对应点的轴向距离。通常用P表示。对于多线螺纹，导程就等于头数（n）乘以螺距（P）：</p>
<p class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>L</mi><mo>=</mo><mi>n</mi><mi>P</mi></mrow><annotation encoding="application/x-tex">L=nP
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal">L</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal">n</span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span></span></span></span></span></p>
<p>因此丝杆螺母运动距离与脉冲关系为：</p>
<p class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>每毫米对应脉冲数</mtext><mo>=</mo><mfrac><mtext>旋转一周的脉冲数</mtext><mi>L</mi></mfrac><mo>=</mo><mfrac><mrow><mn>36</mn><msup><mn>0</mn><mo>∘</mo></msup><mo>×</mo><mtext>细分数</mtext></mrow><mrow><mtext>步距角</mtext><mo>×</mo><mi>n</mi><mi>P</mi></mrow></mfrac></mrow><annotation encoding="application/x-tex">每毫米对应脉冲数 = \frac{旋转一周的脉冲数}{L} = \frac{360^\circ \times 细分数}{步距角 \times nP}
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord cjk_fallback">每毫米对应脉冲数</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.0463em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal">L</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord cjk_fallback">旋转一周的脉冲数</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.1297em;vertical-align:-0.7693em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3603em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord cjk_fallback">步距角</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord mathnormal">n</span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">36</span><span class="mord"><span class="mord">0</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6741em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mbin mtight">∘</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord cjk_fallback">细分数</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.7693em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>计算得为800。</p>
<h4 id="_3-2-3-机械构建" tabindex="-1"><a class="header-anchor" href="#_3-2-3-机械构建" aria-hidden="true">#</a> 3.2.3 机械构建</h4>
<p>思路中提到，使用3.1为3.2打印出定制化构件。与定制亚克力不同，由于是3D打印，设计几乎不受任何限制。在留空、组合等方面可以完全抛开材料本身特性的限制以最优结构为唯一标准。</p>
<h4 id="_3-2-4-z轴" tabindex="-1"><a class="header-anchor" href="#_3-2-4-z轴" aria-hidden="true">#</a> 3.2.4 Z轴</h4>
<p>依据设计思路，Z轴左右各需要一台步进电机，由步进电机驱动丝杆转动进而带动丝杆螺母的上下位移。考虑到Z轴的运动精度要在0.1mm，因此选用1.8°步进电机、16细分驱动、T8丝杆。利用3.2.2中的计算公式得出精度约为0.08mm，符合要求。</p>
<p>由于两电机需要同步运行，为了尽量降低延迟我选择将两部电机并联。丝杆与电机间使用弹性联轴器相连，以缓冲步进电机启动时所受阻力防止过载。</p>
<h2 id="_4-testing-测试中发现的问题及解决方案" tabindex="-1"><a class="header-anchor" href="#_4-testing-测试中发现的问题及解决方案" aria-hidden="true">#</a> 4.[testing] 测试中发现的问题及解决方案</h2>
<p>按照设计进行组装后便进行测试，测试方案：使用Rhino（3D建模软件）建立一个尺寸为30<em>30</em>30（mm）的立方体然后进行打印，打印完成后对此立方体测量进而评估打印机的实际工作效果。</p>
<p>为了节约时间和耗材，切片时设置填充密度为20%，其余参数默认。打印时设置打印头移动速度为100%，挤出机挤出速率100%，打印头温度200℃。</p>
<p>打印完成后对该立方体进行评估：实际尺寸30<em>30</em>45，层理十分明显，层与层之间过于疏松，底部边缘翘起,部分层出现略微错位。</p>
<p>根据相应问题进行了如下分析，并提出了相关解决方案。</p>
<h3 id="_4-1-尺寸错误" tabindex="-1"><a class="header-anchor" href="#_4-1-尺寸错误" aria-hidden="true">#</a> 4.1 尺寸错误</h3>
<p>分析：X-Y轴方向的实际尺寸与设计尺寸符合，故X-Y轴步进电机单位毫米脉冲数正确。但Z轴偏大50%。最初计算的脉冲数为1600为理论值，即使容许偏差（±50）也不可能偏差达到50%。</p>
<p>首先观察丝杆步进电机脉冲数计算公式（化简后）：</p>
<p class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mtext>每毫米脉冲数</mtext><mo>=</mo><mfrac><mrow><mfrac><mrow><mn>36</mn><msup><mn>0</mn><mo>∘</mo></msup></mrow><mtext>步距角</mtext></mfrac><mo>×</mo><mtext>细分数</mtext></mrow><mtext>导程</mtext></mfrac></mrow><annotation encoding="application/x-tex">每毫米脉冲数 = \frac{\frac{360^\circ}{步距角} \times 细分数}{导程}
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord cjk_fallback">每毫米脉冲数</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.3389em;vertical-align:-0.686em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6529em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord cjk_fallback">导程</span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.735em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.9179em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord cjk_fallback mtight">步距角</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">36</span><span class="mord mtight"><span class="mord mtight">0</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7485em;"><span style="top:-2.931em;margin-right:0.0714em;"><span class="pstrut" style="height:2.5em;"></span><span class="sizing reset-size3 size1 mtight"><span class="mbin mtight">∘</span></span></span></span></span></span></span></span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">×</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord cjk_fallback">细分数</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.686em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></p>
<p>涉及到以下几个参量：步距角、细分、导程。</p>
<p>步距角由步进电机本身设计决定，查阅电机参数为1.8°没有错误。细分数由步进电机驱动板决定，对驱动板上的跳线冒检查后确认为16细分没有错误。</p>
<p>显然是导程有误，观察导程计算公式：</p>
<p class='katex-block'><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>L</mi><mo>=</mo><mi>n</mi><mi>P</mi></mrow><annotation encoding="application/x-tex">L=nP
</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal">L</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal">n</span><span class="mord mathnormal" style="margin-right:0.13889em;">P</span></span></span></span></span></p>
<p>重新查阅技术参数说明后发现，我使用的丝杆为4头，与之前认为的2头正好多处一倍，重新计算后脉冲数为800，符合误差。重新测试问题解决。</p>
<h3 id="_4-2-打印头过重" tabindex="-1"><a class="header-anchor" href="#_4-2-打印头过重" aria-hidden="true">#</a> 4.2 打印头过重</h3>
<p>问题：最初设计时只考虑到了挤出力的损失并未考虑到其他后果，因此在1.0以及2.0甚至3.1版本均使用的近程送料机构。由于前两个版本存在严重的设计失误，无法运行。在3.2版本中才发现使用近程抖动严重，步进电机负载过大。</p>
<p>在步进电机输出拉力一定的情况下，负载越大输出的加速度就越小进而更难克服其产生的惯性，造成了滑动错位的现象，严重影响了精度。而且步进电机在实际工作时往往是加速度一定，因而会增加其输出力的大小，进而影响步进电机的寿命。并且较大的惯性甚至能带动机身整体晃动，可能导致螺丝的松脱等严重后果。</p>
<p>解决方案：在3.2版本中更改为远程送料，问题解决。</p>
<h3 id="_4-3-z轴电机左右不平衡" tabindex="-1"><a class="header-anchor" href="#_4-3-z轴电机左右不平衡" aria-hidden="true">#</a> 4.3 Z轴电机左右不平衡</h3>
<p>问题：3.1版本在最初测试时发现左右电机运动不同步，由于两电机为并联，分析可能是因为焊接点电阻过大。使用万用表分别测试两根输出线电阻，分别为0.281Ω和0.278Ω，相差0.003Ω，无影响，因此排除此可能。</p>
<p>既然不是电路问题那么就是传动的问题，检查联轴器与丝杆间的禁锢螺丝，发现禁锢螺丝松脱。重新拧入螺丝，问题解决。</p>
<p>为防止再次出现类似问题，使用243螺丝紧固胶涂抹在螺纹处，拧上螺丝。</p>
</template>
