<template><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>如果你的树莓派使用有线网络，那么你可以跳过这一步。</p>
<p>推荐使用有线的方式进行连接。</p>
</div>
<p>拔出读卡器，再重新插上，此时你的文件管理器中应该会出现一个名为<code>boot</code>的分区。</p>
<img src="https://i.loli.net/2021/07/26/RxdNVmIvTrAO6nY.png" alt="image-20210726100410891" style="zoom:33%;" />
<p>在这里新建一个文件，名为<code>wpa_supplicant.conf </code></p>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>注意文件的后缀是.conf，如果你是通过新建文本文档修改名字不要忘记把文本文档.txt的后缀也改过来！</p>
</div>
<p>在文件中输入（你可以直接复制过去）：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=<span class="token number">1</span>
network=<span class="token punctuation">{</span>
	ssid=<span class="token string">"WiFi的SSID"</span>
	psk=<span class="token string">"WiFi密码"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>将其中引号内的内容替换为你自己的Wi-Fi名以及对应的密码。</p>
</template>
