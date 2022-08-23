<template><h2 id="事件背景" tabindex="-1"><a class="header-anchor" href="#事件背景" aria-hidden="true">#</a> 事件背景</h2>
<p>从旧台式机上换下来一块2TB的机械硬盘，打算用来作为MacBook的时间机器备份，还有一些不常用数据（原片、电影等）的存储，因此需要分成两个分区。计划一个750G用于时间机器备份，剩余的空间用于存储数据。查阅资料，分区采用GPT分区表以及HFS+文件系统在这种情况下效率最最高。</p>
<h2 id="故障" tabindex="-1"><a class="header-anchor" href="#故障" aria-hidden="true">#</a> 故障</h2>
<p>首先打开Mac自带的磁盘管理工具，将硬盘重新全盘格式化为HFS+（Mac OS 扩展日志）格式。然后选择分区，按照先前的计划新增一个分区大小为750GB用于时间机器。这个过程中磁盘管理工具会先缩小原分区，然后创建新的分区。</p>
<p>但是在“检查分区表位图”时卡住，随后开始报错：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>正在检查宗卷位图。
无法完全验证宗卷“未命名”。
文件系统检查推出代码为8。
正在恢复发现为已装载的原始状态。
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="故障分析" tabindex="-1"><a class="header-anchor" href="#故障分析" aria-hidden="true">#</a> 故障分析</h2>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>仍然未知，有朋友知道怎么回事的欢迎在下方评论。</p>
</div>
<h2 id="尝试过程" tabindex="-1"><a class="header-anchor" href="#尝试过程" aria-hidden="true">#</a> 尝试过程</h2>
<h3 id="_1-磁盘工具修复-失败❌" tabindex="-1"><a class="header-anchor" href="#_1-磁盘工具修复-失败❌" aria-hidden="true">#</a> 1.磁盘工具修复-失败❌</h3>
<p>尝试使用磁盘工具自带的“急救”对磁盘进行修复，在进行到检查位图时同样报错误代码8。</p>
<h3 id="_2-写入空数据-失败❌" tabindex="-1"><a class="header-anchor" href="#_2-写入空数据-失败❌" aria-hidden="true">#</a> 2.写入空数据-失败❌</h3>
<p>打开终端，尝试使用dd对磁盘写入一段空数据覆盖分区表，将磁盘强制转换为空盘：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#查看磁盘是否被挂载</span>
<span class="token function">df</span>
<span class="token comment">#如果挂载了就取消挂载</span>
<span class="token function">sudo</span> diskutil <span class="token function">umount</span> /dev/disk4s2
<span class="token comment">#写入5G空数据覆盖分区表</span>
<span class="token function">sudo</span> <span class="token function">dd</span> <span class="token assign-left variable">bs</span><span class="token operator">=</span>1m <span class="token assign-left variable">count</span><span class="token operator">=</span><span class="token number">5000</span> <span class="token assign-left variable">if</span><span class="token operator">=</span>/dev/zero <span class="token assign-left variable">of</span><span class="token operator">=</span>/dev/disk3
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>之后磁盘会在磁盘工具中被标注为“未初始化”，再重新对磁盘格式化、分区。但是在进行分区的时候依然报错误代码8，问题没有得到解决。</p>
<h3 id="_3-在恢复模式下尝试-失败❌" tabindex="-1"><a class="header-anchor" href="#_3-在恢复模式下尝试-失败❌" aria-hidden="true">#</a> 3.在恢复模式下尝试-失败❌</h3>
<p>重启电脑，重启时按住command+R键进入恢复模式，在恢复模式中打开磁盘工具再次尝试上述方法，均无效。</p>
<h2 id="问题解决" tabindex="-1"><a class="header-anchor" href="#问题解决" aria-hidden="true">#</a> 问题解决</h2>
<p>在尝试第二种解决方案时了解到了<code>diskutil</code>这个命令行磁盘管理工具：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#查看工具使用说明</span>
diskutil
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>输出：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Disk Utility Tool
Utility to manage local disks and volumes
Most commands require an administrator or root user

WARNING: Most destructive operations are not prompted

Usage:  diskutil [quiet] &lt;verb> &lt;options>, where &lt;verb> is as follows:

     list                 (List the partitions of a disk)
     info[rmation]        (Get information on a specific disk or partition)
     listFilesystems      (List file systems available for formatting)
     listClients          (List all current disk management clients)
     activity             (Continuous log of system-wide disk arbitration)

     u[n]mount            (Unmount a single volume)
     unmountDisk          (Unmount an entire disk (all volumes))
     eject                (Eject a disk)
     mount                (Mount a single volume)
     mountDisk            (Mount an entire disk (all mountable volumes))

     enableJournal        (Enable HFS+ journaling on a mounted HFS+ volume)
     disableJournal       (Disable HFS+ journaling on a mounted HFS+ volume)
     moveJournal          (Move the HFS+ journal onto another volume)
     enableOwnership      (Exact on-disk User/Group IDs on a mounted volume)
     disableOwnership     (Ignore on-disk User/Group IDs on a mounted volume)

     rename[Volume]       (Rename a volume)

     verifyVolume         (Verify the file system data structures of a volume)
     repairVolume         (Repair the file system data structures of a volume)
     verifyDisk           (Verify the components of a partition map of a disk)
     repairDisk           (Repair the components of a partition map of a disk)
     resetFusion          (Reset the components of a machine's Fusion Drive)

     eraseDisk            (Erase an existing disk, removing all volumes)
     eraseVolume          (Erase an existing volume)
     reformat             (Erase an existing volume with same name and type)
     eraseOptical         (Erase optical media (CD/RW, DVD/RW, etc.))
     zeroDisk             (Erase a disk, writing zeros to the media)
     randomDisk           (Erase a disk, writing random data to the media)
     secureErase          (Securely erase a disk or freespace on a volume)

     partitionDisk        ((re)Partition a disk, removing all volumes)
     addPartition         (Create a new partition to occupy free space)
     splitPartition       (Split an existing partition into two or more)
     mergePartitions      (Combine two or more existing partitions into one)
     resizeVolume         (Resize a volume, increasing or decreasing its size)

     appleRAID &lt;verb>     (Perform additional verbs related to AppleRAID)
     coreStorage &lt;verb>   (Perform additional verbs related to CoreStorage)
     apfs &lt;verb>          (Perform additional verbs related to APFS)

diskutil &lt;verb> with no options will provide help on that verb
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br></div></div><p>可以看到该工具是支持分区的，尝试直接使用diskutil工具对磁盘分区：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#使用方法，如果需要更多分区以此往后类推即可</span>
<span class="token comment">#可使用  diskutil listFilesystems 查看你的mac支持的文件系统</span>
<span class="token function">sudo</span> diskutil partitionDisk <span class="token operator">&lt;</span>磁盘位置<span class="token operator">></span> <span class="token operator">&lt;</span>分区表格式<span class="token operator">></span> <span class="token operator">&lt;</span>第一个分区文件系统<span class="token operator">></span> <span class="token operator">&lt;</span>第一个分区名<span class="token operator">></span> <span class="token operator">&lt;</span>第一个分区大小<span class="token operator">></span> <span class="token operator">&lt;</span>第二个分区文件系统<span class="token operator">></span> <span class="token operator">&lt;</span>第二个分区名<span class="token operator">></span> <span class="token operator">&lt;</span>第二个分区大小<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><details class="custom-block details"><summary>分区表格式</summary>
<p>可选的有三种：APM、MBR、GPT</p>
<p>其中APM为旧版本苹果电脑芯片专用分区表格式，一般不选；MBR是Dos适用分区表；GPT是GUID分区表。</p>
<p>一般选择GPT。</p>
</details>
<p>我这里使用GPT分区表，两个分区文件系统均为MacOS扩展日志：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> diskutil partitionDisk disk4 GPT jhfs+ DeerDatabase <span class="token number">1</span>.25T jhfs+ TimeMachine <span class="token number">0</span>.75T
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>稍等片刻后分区成功，查看访达两个分区均能被正常识别、读写。</p>
</template>
