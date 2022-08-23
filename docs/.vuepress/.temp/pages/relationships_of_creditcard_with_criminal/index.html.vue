<template><div class="custom-container tip"><p class="custom-container-title">摘要</p>
<p>在遵循判例法的基础上，使用裁判文书网和案例网上的千余个历史案例，利用机器学习的决策树算法构建了一个可视化的、支持双向检索、模糊检索功能的信用卡套现定罪辅助系统。</p>
</div>
<!-- more -->
<h2 id="项目地址" tabindex="-1"><a class="header-anchor" href="#项目地址" aria-hidden="true">#</a> 项目地址</h2>
<p><a href="https://blog.deercloud.site/pre/" target="_blank" rel="noopener noreferrer">https://blog.deercloud.site/pre/<ExternalLinkIcon/></a></p>
<h2 id="技术思路" tabindex="-1"><a class="header-anchor" href="#技术思路" aria-hidden="true">#</a> 技术思路</h2>
<ol>
<li>以“判例法”为原则，将裁判文书进行量化处理，制作成数据集；</li>
<li>利用数据集，选择合适的机器学习算法训练模型；</li>
<li>利用训练得到的模型，构建双向检索系统；</li>
<li>新增模糊匹配算法；</li>
</ol>
<h2 id="计划" tabindex="-1"><a class="header-anchor" href="#计划" aria-hidden="true">#</a> 计划</h2>
<p>收集一部分裁判文书，对这部分样本数据进行整理、分析、汇总。以分析结果为依据，利用网络爬虫或开放型检索数据库以及文本提取技术，八月前完成10000份裁判文书的全自动爬取、分析、格式化处理，为下一步准备数据集。采用C语言构建人工神经网络算法，引入时间维度，修正不同时间节点新增司法解释对判决的影响。构建基于Python的检索界面，利用宏连接神经网络模型。新增模糊检索，便于用户逆向搜索所需的定罪依据等信息。</p>
<ul>
<li>八月前：完成10000份裁判文书的全自动爬取、分析、格式化处理等。</li>
<li>十二月前：完成模型的构建与优化。</li>
<li>次年三月前：用户界面的设计与完善。</li>
<li>次年四月：结题总结。</li>
</ul>
<h2 id="技术选型" tabindex="-1"><a class="header-anchor" href="#技术选型" aria-hidden="true">#</a> 技术选型</h2>
<h3 id="_1-文书处理" tabindex="-1"><a class="header-anchor" href="#_1-文书处理" aria-hidden="true">#</a> 1.文书处理</h3>
<h3 id="_2-算法选型" tabindex="-1"><a class="header-anchor" href="#_2-算法选型" aria-hidden="true">#</a> 2.算法选型</h3>
<details class="custom-block details"><summary>几种算法</summary>
<h4 id="nbc算法" tabindex="-1"><a class="header-anchor" href="#nbc算法" aria-hidden="true">#</a> NBC算法</h4>
<blockquote>
<p>NBC 模型发源于古典数学理论，有着坚实的数学基础。该算法是基于条件独立性假设的一种算法，当条件独立性假设成立时，利用贝叶斯公式计算出其后验概率，即该对象属于某一类的概率，选择具有最大后验概率的类作为该对象所属的类。</p>
</blockquote>
<h5 id="优点" tabindex="-1"><a class="header-anchor" href="#优点" aria-hidden="true">#</a> 优点</h5>
<ul>
<li>逻辑简单，易于实现；</li>
<li>所需估计的参数很少；</li>
<li>对缺失数据不太敏感；</li>
<li>具有较小的误差分类率；</li>
<li>性能稳定，健壮性比较好；</li>
</ul>
<h5 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h5>
<ul>
<li>在属性个数比较多或者属性之间相关性较大时，NBC 模型的分类效果相对较差；</li>
<li>算法是基于条件独立性假设的，在实际应用中很难成立，故会影响分类效果</li>
</ul>
<h4 id="lr算法" tabindex="-1"><a class="header-anchor" href="#lr算法" aria-hidden="true">#</a> LR算法</h4>
<blockquote>
<p>LR 回归是当前业界比较常用的机器学习方法，用于估计某种事物的可能性。它与多元线性回归同属一个家族，即广义线性模型。简单来说多元线性回归是直接将特征值和其对应的概率进行相乘得到一个结果，逻辑回归则是在这样的结果上加上一个逻辑函数。在此选择LR 作为回归分析模型的代表进行介绍。</p>
</blockquote>
<h5 id="优点-1" tabindex="-1"><a class="header-anchor" href="#优点-1" aria-hidden="true">#</a> 优点</h5>
<ul>
<li>对数据中小噪声的鲁棒性好；</li>
<li>已被广泛应用于工业问题中；</li>
<li>多重共线性并不是问题，它可结合正则化来解决。</li>
</ul>
<h5 id="缺点-1" tabindex="-1"><a class="header-anchor" href="#缺点-1" aria-hidden="true">#</a> 缺点</h5>
<ul>
<li>对于非线性特征，需要转换</li>
<li>当特征空间很大时，LR的性能并不是太好</li>
</ul>
<h4 id="svm算法" tabindex="-1"><a class="header-anchor" href="#svm算法" aria-hidden="true">#</a> SVM算法</h4>
<blockquote>
<p>SVM 算法是建立在统计学习理论基础上的机器学习方法，为十大数据挖掘算法之一。通过学习算法，SVM 可以自动寻找出对分类有较好区分能力的支持向量，由此构造出的分类器可以最大化类与类的间隔，因而有较好的适应能力和较高的分准率。SVM 算法的目的在于寻找一个超平面H，该超平面可以将训练集中的数据分开，且与类域边界的沿垂直于该超平面方向的距离最大，故SVM 法亦被称为最大边缘算法。</p>
</blockquote>
<h5 id="优点-2" tabindex="-1"><a class="header-anchor" href="#优点-2" aria-hidden="true">#</a> 优点</h5>
<ul>
<li>有很高的分准率；</li>
<li>有很高的泛化性能；</li>
<li>能很好地解决高维问题；</li>
<li>对小样本情况下的机器学习问题效果好。</li>
</ul>
<h5 id="缺点-2" tabindex="-1"><a class="header-anchor" href="#缺点-2" aria-hidden="true">#</a> 缺点</h5>
<ul>
<li>对缺失数据敏感；</li>
<li>对非线性问题没有通用解决方案，得谨慎选择核函数来处理。</li>
</ul>
<h4 id="id3算法" tabindex="-1"><a class="header-anchor" href="#id3算法" aria-hidden="true">#</a> ID3算法</h4>
<blockquote>
<p>ID3 算法是一种基于决策树的分类算法，该算法是以信息论为基础，以信息熵和信息增益为衡量标准，从而实现对数据的归纳分类。信息增益用于度量某个属性对样本集合分类的好坏程度。ID3 算法的时间复杂度为O(n*|D|*log|D|)。</p>
</blockquote>
<h5 id="优点-3" tabindex="-1"><a class="header-anchor" href="#优点-3" aria-hidden="true">#</a> 优点</h5>
<ul>
<li>决策树规模比较小；</li>
<li>查询速度快。</li>
</ul>
<h5 id="缺点-3" tabindex="-1"><a class="header-anchor" href="#缺点-3" aria-hidden="true">#</a> 缺点</h5>
<ul>
<li>不适合处理连续数据；</li>
<li>难以处理海量数据集；</li>
<li>建树时偏选属性值较大的进行分离，而有时属性值较大的不一定能反应更多的数据信息。</li>
</ul>
<h4 id="c4-5-算法" tabindex="-1"><a class="header-anchor" href="#c4-5-算法" aria-hidden="true">#</a> C4.5 算法</h4>
<blockquote>
<p>C4.5 算法是ID3 算法的修订版，采用信息增益率来加以改进，选取有最大增益率的分割变量作为准则，避免ID3 算法过度的适配问题。</p>
</blockquote>
<h5 id="优点-4" tabindex="-1"><a class="header-anchor" href="#优点-4" aria-hidden="true">#</a> 优点</h5>
<ul>
<li>C4.5 继承了ID3 优点；</li>
<li>在树构造过程中进行剪枝；</li>
<li>能对不完整数据进行处理；</li>
<li>能够完成对连续属性的离散化处理；</li>
<li>产生的分类规则易于理解，准确率较高；</li>
<li>用增益率来选择属性，克服了用增益选择属性时偏向选择取值多的属性。</li>
</ul>
<h5 id="缺点-4" tabindex="-1"><a class="header-anchor" href="#缺点-4" aria-hidden="true">#</a> 缺点</h5>
<ul>
<li>构造树时，需要对数据集进行多次的顺序扫描和排序，因而导致算法的低效；</li>
<li>只适合于能驻留于内存的数据集，当训练集达到内存无法容纳时程序无法运行。
<code>C4.5 用于遥感分类过程中，首先依据通常的方式建立第一个模型。随后建立的第二个模型聚焦于被第一个模型错误分类的记录。以此类推，最后应用整个模型集对样本进行分类，使用加权投票过程把分散的预测合并成综合预测。Boosting 技术对于噪声不大的数据，通常通过建立的多模型来减少错误分类的影响，提高分类精度。</code></li>
</ul>
<h4 id="c5-0算法" tabindex="-1"><a class="header-anchor" href="#c5-0算法" aria-hidden="true">#</a> C5.0算法</h4>
<blockquote>
<p>C5.0 算法是 Quinlan 在C4.5 算法的基础上改进而来的产生决策树的一种更新的算法，它除了包括C4.5 的全部功能外，还引入许多新的技术，其中最重要的技术是提升（Boosting）技术，目的是为了进一步提高决策树对样本的识别率。同时C5.0 的算法复杂度要更低，使用更简单，适应性更强，因此具有更高的使用价值。</p>
</blockquote>
<h5 id="优点-5" tabindex="-1"><a class="header-anchor" href="#优点-5" aria-hidden="true">#</a> 优点</h5>
<ul>
<li>能同时处理连续和离散的数据</li>
<li>通常不需要很长的训练时间；</li>
<li>引入Boosting 技术以提高分类的效率和精度；</li>
<li>易于理解，模型推出的规则有非常直观的解释；</li>
<li>在面对数据遗漏和特征很多的问题时非常稳健。</li>
</ul>
<h5 id="缺点-5" tabindex="-1"><a class="header-anchor" href="#缺点-5" aria-hidden="true">#</a> 缺点</h5>
<ul>
<li>目标字段必须为分类字段。
<code>美国地质调查局(USGS)在进行土地覆盖分类项目过程中研发了支持决策树分类的软件。软件分类模块主要是针对庞大数据量的数据集进行数据挖掘，找出特征，然后建立规则集进行决策分类。在分类模块中采用C5.0 模型来完成决策树分类、形成分类文件，实现遥感影像的分类。</code></li>
</ul>
<h4 id="knn-算法" tabindex="-1"><a class="header-anchor" href="#knn-算法" aria-hidden="true">#</a> KNN 算法</h4>
<blockquote>
<p>KNN 算法是Cover 和Hart 于1968 年提出的理论上比较成熟的方法，为十大挖掘算法之一。该算法的思路非常简单直观：如果一个样本在特征空间中的k 个最相似(即特征空间中最邻近)的样本中的大多数属于某一个类别，则该样本也属于这个类别。该方法在定类决策上只依据最邻近的一个或者几个样本的类别来决定待分样本所属的类别。</p>
</blockquote>
<h5 id="优点-6" tabindex="-1"><a class="header-anchor" href="#优点-6" aria-hidden="true">#</a> 优点</h5>
<ul>
<li>算法简单、有效；</li>
<li>适用于样本容量比较大的类域的自动分类；</li>
<li>由于KNN 方法主要靠周围有限的邻近的样本，而不是靠判别类域的方法来确定所属类别的，因此对于类域的交叉或重叠较多的待分样本集来说，KNN 方法较其他方法更为适合。</li>
</ul>
<h5 id="缺点-6" tabindex="-1"><a class="header-anchor" href="#缺点-6" aria-hidden="true">#</a> 缺点</h5>
<ul>
<li>计算量较大；</li>
<li>需要事先确定K 值；</li>
<li>输出的可解释不强；</li>
<li>对样本容量较小的类域很容易产生误分。</li>
</ul>
<h4 id="ann-算法" tabindex="-1"><a class="header-anchor" href="#ann-算法" aria-hidden="true">#</a> ANN 算法</h4>
<blockquote>
<p>人工神经网络（ANN）算法就是一组连续的输入/输出单元，其中每个连接都与一个权相关。在学习阶段，通过调整神经网络的权，使得能够预测样本的正确类标号来学习。</p>
</blockquote>
<h5 id="优点-7" tabindex="-1"><a class="header-anchor" href="#优点-7" aria-hidden="true">#</a> 优点</h5>
<ul>
<li>能处理数值型及分类型的属性；</li>
<li>分类的准确度高，分布并行处理能力强；</li>
<li>对包含大量噪声数据的数据集有较强的鲁棒性和容错能力。</li>
</ul>
<h5 id="缺点-7" tabindex="-1"><a class="header-anchor" href="#缺点-7" aria-hidden="true">#</a> 缺点</h5>
<ul>
<li>不能观察之间的学习过程；</li>
<li>学习时间过长，甚至可能达不到学习的目的；</li>
<li>对于非数值型数据需要做大量数据预处理工作；</li>
<li>输出结果难以解释，会影响到结果的可信度和可接受程度；</li>
<li>神经网络需要大量的参数，如网络拓扑结构、权值和阈值的初始值。</li>
</ul>
</details>
<h4 id="总结对比" tabindex="-1"><a class="header-anchor" href="#总结对比" aria-hidden="true">#</a> 总结对比</h4>
<table>
<thead>
<tr>
<th style="text-align:center">算法名称</th>
<th>收敛时间</th>
<th>是否过度拟合</th>
<th>是否过度拟合缺失数据敏感度</th>
<th>训练数据量</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">NBC</td>
<td>快</td>
<td>存在</td>
<td>不敏感</td>
<td>无要求</td>
</tr>
<tr>
<td style="text-align:center">LR</td>
<td>快</td>
<td>存在</td>
<td>敏感</td>
<td>无要求</td>
</tr>
<tr>
<td style="text-align:center">SVM</td>
<td>一般</td>
<td>存在</td>
<td>敏感</td>
<td>小数据量</td>
</tr>
<tr>
<td style="text-align:center">ID3</td>
<td>快</td>
<td>存在</td>
<td>不敏感</td>
<td>小数据集</td>
</tr>
<tr>
<td style="text-align:center">C4.5</td>
<td>快</td>
<td>存在</td>
<td>不敏感</td>
<td>小数据集</td>
</tr>
<tr>
<td style="text-align:center">C5.0</td>
<td>快</td>
<td>不存在</td>
<td>不敏感</td>
<td>大数据集</td>
</tr>
<tr>
<td style="text-align:center">ANN</td>
<td>慢</td>
<td>存在</td>
<td>敏感</td>
<td>大数据集</td>
</tr>
<tr>
<td style="text-align:center">KNN</td>
<td>快</td>
<td>存在</td>
<td>敏感</td>
<td>数据量多</td>
</tr>
</tbody>
</table>
<h3 id="_3-系统选型" tabindex="-1"><a class="header-anchor" href="#_3-系统选型" aria-hidden="true">#</a> 3.系统选型</h3>
<h3 id="_4-模糊匹配" tabindex="-1"><a class="header-anchor" href="#_4-模糊匹配" aria-hidden="true">#</a> 4.模糊匹配</h3>
<h2 id="技术栈" tabindex="-1"><a class="header-anchor" href="#技术栈" aria-hidden="true">#</a> 技术栈</h2>
<ul>
<li>Python网络爬虫</li>
<li>文本提取</li>
<li>C语言程序设计</li>
<li>机器学习算法</li>
<li>Python界面设计</li>
</ul>
</template>
