<template><div class="custom-container tip"><p class="custom-container-title">Abstract</p>
<p>The Transformer was proposed in the paper <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener noreferrer">Attention is All You Need<ExternalLinkIcon/></a>. A TensorFlow implementation of it is available as a part of the Tensor2Tensor package. Harvard’s NLP group created a <a href="http://nlp.seas.harvard.edu/2018/04/03/attention.html" target="_blank" rel="noopener noreferrer">guide annotating the paper with PyTorch implementation<ExternalLinkIcon/></a>. In this post, we will attempt to oversimplify things a bit and introduce the concepts one by one to hopefully make it easier to understand to people without in-depth knowledge of the subject matter.</p>
</div>
<!-- more -->
<p><a href="https://jalammar.github.io/illustrated-transformer/" target="_blank" rel="noopener noreferrer">原文链接<ExternalLinkIcon/></a></p>
<p><a href="https://blog.csdn.net/yujianmin1990/article/details/85221271" target="_blank" rel="noopener noreferrer">翻译出处<ExternalLinkIcon/></a></p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> <strong>前言</strong></h2>
<p>在之前的<a href="https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/" target="_blank" rel="noopener noreferrer">文章<ExternalLinkIcon/></a>中，Attention成了深度学习模型中无处不在的方法，它是种帮助提升NMT（Neural Machine Translation）的翻译效果的思想。在本篇博客中，我们解析下Transformer，该模型扩展Attention来加速训练，并且在特定任务上 transformer 表现比 Google NMT 模型还要好。然而，其最大的好处是可并行。实际上<a href="https://cloud.google.com/tpu/" target="_blank" rel="noopener noreferrer">谷歌云<ExternalLinkIcon/></a>推荐将Transformer作为云TPU的推导模型。现在我们将Transformer拆解开来看看它是如何工作的。
Transformer是在&quot;<a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener noreferrer">Attention is All You Need<ExternalLinkIcon/></a>&quot;中提出的，其中的TF应用是<a href="https://github.com/tensorflow/tensor2tensor" target="_blank" rel="noopener noreferrer">Tensor2Tensor<ExternalLinkIcon/></a>的子模块。哈佛的NLP团队专门制作了对应的PyTorch的<a href="http://nlp.seas.harvard.edu/2018/04/03/attention.html" target="_blank" rel="noopener noreferrer">指南说明<ExternalLinkIcon/></a>。本文旨在简化难度，一步一步地解释其中的概念，希望有助于初学者更容易地理解。</p>
<ul>
<li>讨论: <a href="https://news.ycombinator.com/item?id=18351674" target="_blank" rel="noopener noreferrer">Hacker News (65 points, 4 comments)<ExternalLinkIcon/></a>, <a href="https://www.reddit.com/r/MachineLearning/comments/8uh2yz/p_the_illustrated_transformer_a_visual_look_at/" target="_blank" rel="noopener noreferrer">Reddit r/MachineLearning (29 points, 3 comments)<ExternalLinkIcon/></a></li>
<li>翻译: <a href="https://blog.csdn.net/yujianmin1990/article/details/85221271" target="_blank" rel="noopener noreferrer">Chinese (Simplified)<ExternalLinkIcon/></a>, <a href="https://a-coles.github.io/post/transformer-illustre/" target="_blank" rel="noopener noreferrer">French<ExternalLinkIcon/></a>, <a href="https://tips-memo.com/translation-jayalmmar-transformer" target="_blank" rel="noopener noreferrer">Japanese<ExternalLinkIcon/></a>, <a href="https://nlpinkorean.github.io/illustrated-transformer/" target="_blank" rel="noopener noreferrer">Korean<ExternalLinkIcon/></a>, <a href="https://habr.com/ru/post/486358/" target="_blank" rel="noopener noreferrer">Russian<ExternalLinkIcon/></a>, <a href="https://hackernoon.com/el-transformador-ilustrado-una-traduccion-al-espanol-0y73wwp" target="_blank" rel="noopener noreferrer">Spanish<ExternalLinkIcon/></a>, <a href="https://trituenhantao.io/tin-tuc/minh-hoa-transformer/" target="_blank" rel="noopener noreferrer">Vietnamese<ExternalLinkIcon/></a></li>
<li>视频: MIT’s <a href="https://youtu.be/53YvP6gdD7U?t=432" target="_blank" rel="noopener noreferrer">Deep Learning State of the Art<ExternalLinkIcon/></a> lecture referencing this post</li>
</ul>
<h2 id="a-high-level-look" tabindex="-1"><a class="header-anchor" href="#a-high-level-look" aria-hidden="true">#</a> <strong>A High-Level Look</strong></h2>
<p>我们先将整个模型视为黑盒，比如在机器翻译中，接收一种语言的句子作为输入，然后将其翻译成其他语言输出。</p>
<img src="https://i.loli.net/2021/08/14/4znGLIApEqs9M2F.png" alt="img" style="zoom:50%;" />
<p>细看下，其中由编码组件、解码组件和它们之间的连接层组成。</p>
<img src="https://i.loli.net/2021/08/14/C3ctM17FkhEJp6Q.png" alt="img" style="zoom:50%;" />
<p>编码组件是六层编码器首位相连堆砌而成，解码组件也是六层解码器堆成的。</p>
<img src="https://i.loli.net/2021/08/14/SqrpMCX8Ule5PLv.png" alt="img" style="zoom:50%;" />
<p>编码器是完全结构相同的，但是并不共享参数，每一个编码器都可以拆解成以下两个字部分。</p>
<img src="https://i.loli.net/2021/08/14/Oo1khHxCzVedRfE.png" alt="img" style="zoom:50%;" />
<p>编码器的输入首先流过一个self-attention层，该层帮助编码器能够看到输入序列中的其他单词当它编码某个词时。后面，我们会细看self-attention的内部结构。
self-attention的输出流向一个前向网络，每个输入位置对应的前向网络是独立互不干扰的。
解码器同样也有这些子层，但是在两个子层间增加了attention层，该层有助于解码器能够关注到输入句子的相关部分，与 <a href="https://jalammar.github.io/visualizing-neural-machine-translation-mechanics-of-seq2seq-models-with-attention/" target="_blank" rel="noopener noreferrer">seq2seq model<ExternalLinkIcon/></a> 的Attention作用相似。</p>
<img src="https://i.loli.net/2021/08/14/vGpg6HrZdhjKea2.png" alt="img" style="zoom:50%;" />
<h2 id="bringing-the-tensors-into-the-picture" tabindex="-1"><a class="header-anchor" href="#bringing-the-tensors-into-the-picture" aria-hidden="true">#</a> <strong>Bringing The Tensors Into the Picture</strong></h2>
<p>现在，我们解析下模型最主要的组件，从向量/Tensor开始，然后是它们如何流经各个组件们并输出的。
正如NLP应用的常见例子，先将输入单词使用<a href="https://medium.com/deeper-learning/glossary-of-deep-learning-word-embedding-f90c3cec34ca" target="_blank" rel="noopener noreferrer">embedding algorithm<ExternalLinkIcon/></a>转成向量。</p>
<img src="https://i.loli.net/2021/08/14/tqF1CJ8Hx3yIEQg.png" alt="img" style="zoom:50%;" title="每个词映射到512维向量上，此处用box表示向量" />
<p>词的向量化仅仅发生在最底层的编码器的输入时，这样每个编码器的都会接收到一个list（每个元素都是512维的词向量），只不过其他编码器的输入是前个编码器的输出。list的尺寸是可以设置的超参，通常是训练集的最长句子的长度。
在对输入序列做词的向量化之后，它们流经编码器的如下两个子层。</p>
<img src="https://i.loli.net/2021/08/14/ImWKuZqxL3SBrn6.png" alt="img" style="zoom:50%;" />
<p>这里能看到Transformer的一个关键特性，每个位置的词仅仅流过它自己的编码器路径。在self-attention层中，这些路径两两之间是相互依赖的。<strong>前向网络层则没有这些依赖性</strong>，但这些路径在流经前向网络时可以并行执行。</p>
<h2 id="now-we-re-encoding" tabindex="-1"><a class="header-anchor" href="#now-we-re-encoding" aria-hidden="true">#</a> <strong>Now We’re Encoding !</strong></h2>
<p>正如之前所提，编码器接收向量的list作输入。然后将其送入self-attention处理，再之后送入前向网络，最后将输入传入下一个编码器。</p>
<img src="https://i.loli.net/2021/08/14/vGpkUCA7hLqwTFE.png" alt="img" style="zoom:50%;" title="每个位置的词向量被送入self-attention模块，然后是前向网络(对每个向量都是完全相同的网络结构)" />
<h2 id="self-attention-at-a-high-level" tabindex="-1"><a class="header-anchor" href="#self-attention-at-a-high-level" aria-hidden="true">#</a> <strong>Self-Attention at a High Level</strong></h2>
<p>不要被self-attention这个词迷惑了，看起来好像每个人对它都很熟悉，但是在我读到Attention is All You Need这篇文章之前，我个人都没弄懂这个概念。下面我们逐步分解下它是如何工作的。
以下面这句话为例，作为我们想要翻译的输入语句“The animal didn’t cross the street because it was too tired”。句子中&quot;it&quot;指的是什么呢？“it&quot;指的是&quot;street” 还是“animal”？对人来说很简单的问题，但是对算法而言并不简单。
当模型处理单词“it”时，self-attention允许将“it”和“animal”联系起来。当模型处理每个位置的词时，self-attention允许模型看到句子的其他位置信息作辅助线索来更好地编码当前词。如果你对RNN熟悉，就能想到RNN的隐状态是如何允许之前的词向量来解释合成当前词的解释向量。Transformer使用self-attention来将相关词的理解编码到当前词中。</p>
<img src="https://i.loli.net/2021/08/14/JlnbNcSrMwLTDIt.png" style="zoom:80%;" title="当编码it时（编码器的最后层输出），部分attention集中于the animal，并将其表示合并进入到“it”的编码中"/>
<p>上图是<a href="https://colab.research.google.com/github/tensorflow/tensor2tensor/blob/master/tensor2tensor/notebooks/hello_t2t.ipynb" target="_blank" rel="noopener noreferrer">Tensor2Tensor notebook<ExternalLinkIcon/></a>的可视化例子</p>
<h2 id="self-attention-in-detail" tabindex="-1"><a class="header-anchor" href="#self-attention-in-detail" aria-hidden="true">#</a> <strong>Self-Attention in Detail</strong></h2>
<p>我们先看下如何计算self-attention的向量，再看下如何以矩阵方式计算。
<strong>第一步</strong>，根据编码器的输入向量，生成三个向量，比如，对每个词向量，生成query-vec, key-vec, value-vec，生成方法为分别乘以三个矩阵，这些矩阵在训练过程中需要学习。【注意：不是每个词向量独享3个matrix，而是所有输入共享3个转换矩阵；<strong>权重矩阵是基于输入位置的转换矩阵</strong>；有个可以尝试的点，如果每个词独享一个转换矩阵，会不会效果更厉害呢？】
注意到这些新向量的维度比输入词向量的维度要小（512–&gt;64），并不是必须要小的，是为了让多头attention的计算更稳定。</p>
<img src="https://i.loli.net/2021/08/14/fjgsrKGb6iAh9yI.png" alt="img" style="zoom:50%;" title="输入乘以W^q得到query" />
<p>所谓的query/key/value-vec是什么？
这种提取对计算和思考attention是有益的，当读完下面attention是如何计算的之后，你将对这些向量的角色有更清晰的了解。</p>
<p><strong>第二步</strong>，计算attention就是计算一个分值。对“Thinking Matchines”这句话，对“Thinking”（pos#1）计算attention 分值。我们需要计算每个词与“Thinking”的评估分，这个分决定着编码“Thinking”时（某个固定位置时），每个输入词需要集中多少关注度。
这个分，通过“Thing”对应query-vector与所有词的key-vec依次做点积得到。所以当我们处理位置#1时，第一个分值是q1和k1的点积，第二个分值是q1和k2的点积。</p>
<img src="https://i.loli.net/2021/08/14/u3X5Se2oBypZHDF.png" alt="img" style="zoom: 67%;" />
<p><strong>第三步和第四步</strong>，除以8 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>=</mo><msqrt><mrow><mi>d</mi><mi>i</mi><msub><mi>m</mi><mrow><mi>k</mi><mi>e</mi><mi>y</mi></mrow></msub></mrow></msqrt></mrow><annotation encoding="application/x-tex">=\sqrt{dim_{key}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.3669em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:1.24em;vertical-align:-0.3508em;"></span><span class="mord sqrt"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8892em;"><span class="svg-align" style="top:-3.2em;"><span class="pstrut" style="height:3.2em;"></span><span class="mord" style="padding-left:1em;"><span class="mord mathnormal">d</span><span class="mord mathnormal">i</span><span class="mord"><span class="mord mathnormal">m</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3361em;"><span style="top:-2.55em;margin-left:0em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.03148em;">k</span><span class="mord mathnormal mtight" style="margin-right:0.03588em;">ey</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2861em;"><span></span></span></span></span></span></span></span></span><span style="top:-2.8492em;"><span class="pstrut" style="height:3.2em;"></span><span class="hide-tail" style="min-width:1.02em;height:1.28em;"><svg xmlns="http://www.w3.org/2000/svg" width='400em' height='1.28em' viewBox='0 0 400000 1296' preserveAspectRatio='xMinYMin slice'><path d='M263,681c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l0 -0
c4.7,-7.3,11,-11,19,-11
H40000v40H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M1001 80h400000v40h-400000z'/></svg></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.3508em;"><span></span></span></span></span></span></span></span></span> ，这样梯度会更稳定。然后加上softmax操作，归一化分值使得全为正数且加和为1。</p>
<img src="https://i.loli.net/2021/08/14/BAomH9VXcaC7ujI.png" alt="img" style="zoom:50%;" />
<p>softmax分值决定着在这个位置，每个词的表达程度（关注度）。很明显，这个位置的词应该有最高的归一化分数，但大部分时候总是有助于关注该词的相关的词。</p>
<p><strong>第五步</strong>，将softmax分值与value-vec按位相乘。保留关注词的value值，削弱非相关词的value值。</p>
<p><strong>第六步</strong>，将所有加权向量加和，产生该位置的self-attention的输出结果。</p>
<img src="https://i.loli.net/2021/08/14/W8lMdrVLxRkCBHe.png" alt="img" style="zoom:50%;" />
<p>上述就是self-attention的计算过程，生成的向量流入前向网络。在实际应用中，上述计算是以速度更快的矩阵形式进行的。下面我们看下在单词级别的矩阵计算。</p>
<h2 id="matrix-calculation-of-self-attention" tabindex="-1"><a class="header-anchor" href="#matrix-calculation-of-self-attention" aria-hidden="true">#</a> <strong>Matrix Calculation of Self-Attention</strong></h2>
<p><strong>第一步</strong>，计算query/key/value matrix，将所有输入词向量合并成输入矩阵<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>X</mi></mrow><annotation encoding="application/x-tex">X</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">X</span></span></span></span> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>X</mi></mrow><annotation encoding="application/x-tex">X</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">X</span></span></span></span> <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>X</mi></mrow><annotation encoding="application/x-tex">X</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord mathnormal" style="margin-right:0.07847em;">X</span></span></span></span>，并且将其分别乘以权重矩阵<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>W</mi><mi>q</mi></msup></mrow><annotation encoding="application/x-tex">W^q</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">W</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;">q</span></span></span></span></span></span></span></span></span></span></span> , <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>W</mi><mi>k</mi></msup></mrow><annotation encoding="application/x-tex">W^k</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8491em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">W</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.03148em;">k</span></span></span></span></span></span></span></span></span></span></span> , <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mi>W</mi><mi>v</mi></msup></mrow><annotation encoding="application/x-tex">W^v</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6833em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.13889em;">W</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight" style="margin-right:0.03588em;">v</span></span></span></span></span></span></span></span></span></span></span> 。</p>
<img src="https://i.loli.net/2021/08/14/23rYQNy76SopIJn.png" alt="img" style="zoom:50%;" title="输入矩阵X的每一行表示输入句子的一个词向量" />
<p><strong>最后</strong>，鉴于我们使用矩阵处理，将步骤2~6合并成一个计算self-attention层输出的公式。</p>
<img src="https://i.loli.net/2021/08/14/JWIk6dmLrguHAGX.png" alt="img" style="zoom:50%;" title="矩阵形式的self-attention计算" />
<h2 id="the-beast-with-many-heads" tabindex="-1"><a class="header-anchor" href="#the-beast-with-many-heads" aria-hidden="true">#</a> <strong>The Beast With Many Heads</strong></h2>
<p>论文进一步增加了multi-headed的机制到self-attention上，在如下两个方面提高了attention层的效果：</p>
<ol>
<li>多头机制扩展了模型集中于不同位置的能力。在上面的例子中，<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>Z</mi><mn>1</mn></msub></mrow><annotation encoding="application/x-tex">Z_1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8333em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.07153em;">Z</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.0715em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span></span></span></span>只包含了其他词的很少信息，仅由实际自己词决定。在其他情况下，比如翻译 “The animal didn’t cross the street because it was too tired”时，我们想知道单词&quot;it&quot;指的是什么。</li>
<li>多头机制赋予attention多种子表达方式。像下面的例子所示，在多头下有多组query/key/value-matrix，而非仅仅一组（论文中使用8-heads）。每一组都是随机初始化，经过训练之后，输入向量可以被映射到不同的子表达空间中。</li>
</ol>
<img src="https://i.loli.net/2021/08/14/LfdmiT7PxKGVspS.png" alt="img" style="zoom:50%;" title="每个head都有一组Q/K/V matrix" />
<p>如果我们计算multi-headed self-attention的，分别有八组不同的Q/K/V matrix，我们得到八个不同的矩阵。</p>
<img src="https://i.loli.net/2021/08/14/xy3XUkMGRQlbDYV.png" alt="img" style="zoom:50%;" />
<p>这会带来点麻烦，前向网络并不能接收八个矩阵，而是希望输入是一个矩阵，所以要有种方式处理下八个矩阵合并成一个矩阵。</p>
<img src="https://i.loli.net/2021/08/14/NLorhAR93YHs7Tl.png" alt="img" style="zoom:50%;" />
<p>上述就是多头自注意机制的内容，我认为还仅是一部分矩阵，下面尝试着将它们放到一个图上可视化如下。</p>
<img src="https://i.loli.net/2021/08/14/wJ5MltRfvnx2YcX.png" alt="img" style="zoom:50%;" />
<p>现在加入attention heads之后，重新看下当编码“it”时，哪些attention head会被集中。</p>
<img src="https://i.loli.net/2021/08/14/ar52pVyYScMDIOd.png" alt="img" style="zoom:80%;" title="编码 it 时，一个attention head集中于 the animal ，另一个head集中于 tired ，某种意义上讲，模型对 it 的表达合成了的 animal 和 tired 两者"/>
<p>如果我们将所有的attention heads都放入到图中，就很难直观地解释了。</p>
<h2 id="representing-the-order-of-the-sequence-using-positional-encoding" tabindex="-1"><a class="header-anchor" href="#representing-the-order-of-the-sequence-using-positional-encoding" aria-hidden="true">#</a> <strong>Representing The Order of The Sequence Using Positional Encoding</strong></h2>
<p>截止到目前为止，我们还没有讨论如何理解输入语句中词的顺序。
为解决词序的利用问题，Transformer新增了一个向量对每个词，这些向量遵循模型学习的指定模式，来决定词的位置，或者序列中不同词的举例。对其理解，增加这些值来提供词向量间的距离，当其映射到Q/K/V向量以及点乘的attention时。</p>
<img src="https://i.loli.net/2021/08/14/p2vdNlxnz93fiUk.png" alt="img" style="zoom:50%;" title="为了能够给模型提供词序的信息，新增位置emb向量，每个向量值都遵循指定模式" />
<p>如果假设位置向量有4维，实际的位置向量将如下所示：</p>
<img src="https://i.loli.net/2021/08/14/93legdOHvUrMLm5.png" alt="img" style="zoom:50%;" title="一个只有4维的位置向量表示例子" />
<p>所谓的指定模式是什么样的呢？
在下图中，每一行表示一个位置的pos-emb，所以第一行是我们将要加到句子第一个词向量上的vector。每个行有512值，每个值范围在[-1,1]，我们将要涂色以便于能够将模式可视化。</p>
<img src="https://i.loli.net/2021/08/14/WBstgpo62mTflMx.png" alt="img" style="zoom:50%;" title="一个真实的例子有20个词，每个词512维。可以观察中间显著的分隔，那是因为左侧是用sine函数生成，右侧是用cosine生成。"/>
<p>位置向量编码方法在论文的3.5节有提到，也可以看代码<a href="https://github.com/tensorflow/tensor2tensor/blob/23bd23b9830059fbc349381b70d9429b5c40a139/tensor2tensor/layers/common_attention.py" target="_blank" rel="noopener noreferrer">get_timing_signal_ld()<ExternalLinkIcon/></a>，对位置编码而言并不只有一种方法。需要注意的是，编码方法必须能够处理未知长度的序列。</p>
<h2 id="the-residuals" tabindex="-1"><a class="header-anchor" href="#the-residuals" aria-hidden="true">#</a> <strong>The Residuals</strong></h2>
<p>编码器结构中值得提出注意的一个细节是，在每个子层中（slef-attention, ffnn），都有残差连接，并且紧跟着<a href="https://arxiv.org/abs/1607.06450" target="_blank" rel="noopener noreferrer">layer-normalization<ExternalLinkIcon/></a>。</p>
<img src="https://i.loli.net/2021/08/14/inWbJ4O2QFsroeP.png" alt="img" style="zoom:50%;" />
<p>如果我们可视化向量和layer-norm操作，将如下所示：</p>
<img src="https://i.loli.net/2021/08/14/Novg5TaxtUWl218.png" alt="img" style="zoom:50%;" />
<p>在解码器中也是如此，假设两层编码器+两层解码器组成Transformer，其结构如下：</p>
<img src="https://i.loli.net/2021/08/14/cZwj86rmAXd7K9R.png" alt="img" style="zoom:50%;" />
<h2 id="the-decoder-side" tabindex="-1"><a class="header-anchor" href="#the-decoder-side" aria-hidden="true">#</a> <strong>The Decoder Side</strong></h2>
<p>现在我们已经了解了编码器侧的大部分概念，也基本了解了解码器的工作方式，下面看下他们是如何共同工作的。
编码器从输入序列的处理开始，最后的编码器的输出被转换为K和V，它俩被每个解码器的&quot;encoder-decoder atttention&quot;层来使用，帮助解码器集中于输入序列的合适位置。</p>
<img src="https://i.loli.net/2021/08/14/7U5gztjnSmf4pJH.gif" alt="img" style="zoom:50%;" title="在编码之后，是解码过程；解码的每一步输出一个元素作输出序列" />
<p>下面的步骤一直重复直到一个特殊符号出现表示解码器完成了翻译输出。每一步的输出被喂到下一个解码器中。正如编码器的输入所做的处理，对解码器的输入增加位置向量。</p>
<img src="https://i.loli.net/2021/08/14/7Rw2BMHYEk6KgGN.gif" alt="transformer_decoding_2" style="zoom:50%;" />
<p>在解码器中的self attention 层与编码器中的稍有不同，在解码器中，self-attention 层仅仅允许关注早于当前输出的位置。在softmax之前，通过遮挡未来位置（将它们设置为-inf）来实现。
&quot;Encoder-Decoder Attention &quot;层工作方式跟multi-headed self-attention是一样的，除了一点，它从前层获取输出转成query矩阵，接收最后层编码器的key和value矩阵做key和value矩阵。</p>
<h2 id="the-final-linear-and-softmax-layer" tabindex="-1"><a class="header-anchor" href="#the-final-linear-and-softmax-layer" aria-hidden="true">#</a> <strong>The Final Linear and Softmax Layer</strong></h2>
<p>解码器最后输出浮点向量，如何将它转成词？这是最后的线性层和softmax层的主要工作。
线性层是个简单的全连接层，将解码器的最后输出映射到一个非常大的logits向量上。假设模型已知有1万个单词（输出的词表）从训练集中学习得到。那么，logits向量就有1万维，每个值表示是某个词的可能倾向值。
softmax层将这些分数转换成概率值（都是正值，且加和为1），最高值对应的维上的词就是这一步的输出单词。</p>
<img src="https://i.loli.net/2021/08/14/SEKY6cRzV843wxI.png" alt="img" style="zoom:50%;" />
<h2 id="recap-of-training" tabindex="-1"><a class="header-anchor" href="#recap-of-training" aria-hidden="true">#</a> <strong>Recap of Training</strong></h2>
<p>现在我们已经了解了一个训练完毕的Transformer的前向过程，顺道看下训练的概念也是非常有用的。
在训练时，模型将经历上述的前向过程，当我们在标记训练集上训练时，可以对比预测输出与实际输出。
为了可视化，假设输出一共只有6个单词（“a”, “am”, “i”, “thanks”, “student”, “”）</p>
<img src="https://i.loli.net/2021/08/14/dagEnbQBuYyN3sk.png" alt="img" style="zoom: 33%;" title="模型的词表是在训练之前的预处理中生成的"/>
<p>一旦定义了词表，我们就能够构造一个同维度的向量来表示每个单词，比如one-hot编码，下面举例编码“am”。</p>
<img src="https://i.loli.net/2021/08/14/1KhRol6JzEBL4Dq.png" alt="img" style="zoom: 33%;" title="举例采用one-hot编码输出词表"/>
<p>下面让我们讨论下模型的loss损失，在训练过程中用来优化的指标，指导学习得到一个非常准确的模型。</p>
<h2 id="the-loss-function" tabindex="-1"><a class="header-anchor" href="#the-loss-function" aria-hidden="true">#</a> <strong>The Loss Function</strong></h2>
<p>我们用一个简单的例子来示范训练，比如翻译“merci”为“thanks”。那意味着输出的概率分布指向单词“thanks”，但是由于模型未训练是随机初始化的，不太可能就是期望的输出。</p>
<img src="https://i.loli.net/2021/08/14/L8pYgGxPyaq5in7.png" alt="img" style="zoom:33%;" title="由于模型参数是随机初始化的，未训练的模型输出随机值。我们可以对比真实输出，然后利用误差后传调整模型权重，使得输出更接近与真实输出"/>
<p>如何对比两个概率分布呢？简单采用 <a href="https://colah.github.io/posts/2015-09-Visual-Information/" target="_blank" rel="noopener noreferrer">cross-entropy<ExternalLinkIcon/></a>或者<a href="https://www.countbayesie.com/blog/2017/5/9/kullback-leibler-divergence-explained" target="_blank" rel="noopener noreferrer">Kullback-Leibler divergence<ExternalLinkIcon/></a>中的一种。
鉴于这是个极其简单的例子，更真实的情况是，使用一个句子作为输入。比如，输入是“je suis étudiant”，期望输出是“i am a student”。在这个例子下，我们期望模型输出连续的概率分布满足如下条件：</p>
<ol>
<li>每个概率分布都与词表同维度。</li>
<li>第一个概率分布对“i”具有最高的预测概率值。</li>
<li>第二个概率分布对“am”具有最高的预测概率值。</li>
<li>一直到第五个输出指向&quot;&quot;标记。</li>
</ol>
<img src="https://i.loli.net/2021/08/14/2iejb9z1ScEDhfG.png" alt="img" style="zoom:50%;" title="对一个句子而言，训练模型的目标概率分布" />
<p>在足够大的训练集上训练足够时间之后，我们期望产生的概率分布如下所示：</p>
<img src="https://i.loli.net/2021/08/14/LUQjI7wCTZiasd3.png" alt="img" style="zoom:50%;" title="训练好之后，模型的输出是我们期望的翻译。当然，这并不意味着这一过程是来自训练集。注意，每个位置都能有值，即便与输出近乎无关，这也是softmax对训练有帮助的地方。" />
<p>现在，因为模型每步只产生一组输出，假设模型选择最高概率，扔掉其他的部分，这是种产生预测结果的方法，叫做greedy 解码。另外一种方法是beam search，每一步仅保留最头部高概率的两个输出，根据这俩输出再预测下一步，再保留头部高概率的两个输出，重复直到预测结束。top_beams是超参可试验调整。</p>
<h2 id="go-forth-and-transform" tabindex="-1"><a class="header-anchor" href="#go-forth-and-transform" aria-hidden="true">#</a> <strong>Go Forth And Transform</strong></h2>
<p>希望本文能够帮助读者对Transformer的主要概念理解有个破冰效果，如果想更深入了解，建议如下步骤：</p>
<ol>
<li>阅读 <a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener noreferrer">Attention Is All You Need<ExternalLinkIcon/></a>paper，Transformer的博客文章<a href="https://ai.googleblog.com/2017/08/transformer-novel-neural-network.html" target="_blank" rel="noopener noreferrer">Transformer: A Novel Neural Network Architecture for Language Understanding<ExternalLinkIcon/></a>，<a href="https://ai.googleblog.com/2017/06/accelerating-deep-learning-research.html" target="_blank" rel="noopener noreferrer">Tensor2Tensor<ExternalLinkIcon/></a>使用说明。</li>
<li>观看&quot;<a href="https://www.youtube.com/watch?v=rBCqOTEfxvg" target="_blank" rel="noopener noreferrer">Łukasz Kaiser’s talk<ExternalLinkIcon/></a>&quot;，梳理整个模型及其细节。</li>
<li>耍一下项目<a href="https://colab.research.google.com/github/tensorflow/tensor2tensor/blob/master/tensor2tensor/notebooks/hello_t2t.ipynb" target="_blank" rel="noopener noreferrer">Jupyter Notebook provided as part of the Tensor2Tensor repo<ExternalLinkIcon/></a></li>
<li>尝试下项目<a href="https://github.com/tensorflow/tensor2tensor" target="_blank" rel="noopener noreferrer">Tensor2Tensor<ExternalLinkIcon/></a></li>
</ol>
<p>相关工作</p>
<ol>
<li><a href="https://arxiv.org/abs/1706.03059" target="_blank" rel="noopener noreferrer">Depthwise Separable Convolutions for Neural Machine Translation<ExternalLinkIcon/></a></li>
<li><a href="https://arxiv.org/abs/1706.03059" target="_blank" rel="noopener noreferrer">One Model To Learn Them All<ExternalLinkIcon/></a></li>
<li><a href="https://arxiv.org/abs/1801.09797" target="_blank" rel="noopener noreferrer">Discrete Autoencoders for Sequence Models<ExternalLinkIcon/></a></li>
<li><a href="https://arxiv.org/abs/1801.10198" target="_blank" rel="noopener noreferrer">Generating Wikipedia by Summarizing Long Sequences<ExternalLinkIcon/></a></li>
<li><a href="https://arxiv.org/abs/1802.05751" target="_blank" rel="noopener noreferrer">Image Transformer<ExternalLinkIcon/></a></li>
<li><a href="https://arxiv.org/abs/1804.00247" target="_blank" rel="noopener noreferrer">Training Tips for the Transformer Model<ExternalLinkIcon/></a></li>
<li><a href="https://arxiv.org/abs/1803.02155" target="_blank" rel="noopener noreferrer">Self-Attention with Relative Position Representations<ExternalLinkIcon/></a></li>
<li><a href="https://arxiv.org/abs/1803.03382" target="_blank" rel="noopener noreferrer">Fast Decoding in Sequence Models using Discrete Latent Variables<ExternalLinkIcon/></a></li>
<li><a href="https://arxiv.org/abs/1804.04235" target="_blank" rel="noopener noreferrer">Adafactor: Adaptive Learning Rates with Sublinear Memory Cost<ExternalLinkIcon/></a></li>
</ol>
<p>致谢：
Thanks to Illia Polosukhin, Jakob Uszkoreit, Llion Jones , Lukasz Kaiser, Niki Parmar, and Noam Shazeer for providing feedback on earlier versions of this post.
Please hit me up on <a href="https://twitter.com/jalammar" target="_blank" rel="noopener noreferrer">Twitter<ExternalLinkIcon/></a> for any corrections or feedback.</p>
</template>
