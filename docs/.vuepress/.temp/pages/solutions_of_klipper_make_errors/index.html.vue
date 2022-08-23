<template><h2 id="avr-gcc-not-found" tabindex="-1"><a class="header-anchor" href="#avr-gcc-not-found" aria-hidden="true">#</a> avr-gcc: not found</h2>
<p>​	一些芯片在树莓派上按照官方的安装教程进行到make编译步骤时会报错：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>avr-gcc: not found
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	这是由于avr芯片使用的编译器默认在树莓派上是没有安装的，因此需要手动安装：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> gcc-avr
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="setjmp-h-no-such-file-or-directory" tabindex="-1"><a class="header-anchor" href="#setjmp-h-no-such-file-or-directory" aria-hidden="true">#</a> setjmp.h: No such file or directory</h2>
<p>​	安装完 gcc-avr 编译器后再次可能还会报这个错：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>src/sched.c:7:30: fatal error: setjmp.h: No such <span class="token function">file</span> or directory
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>​	这是因为树莓派自带的C标准库不完整，因此缺失了setjmp.h这个库，需要手动安装：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> libncurses5-dev
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> avr-gcc
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> avr-libc
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="各种-error-warning" tabindex="-1"><a class="header-anchor" href="#各种-error-warning" aria-hidden="true">#</a> 各种 error + warning</h2>
<p>​	如果您先前编译的时候遇到了丢失库等问题，那么您先前编译的文件就会不完整，直接继续make就有可能出现如下的类似报错：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>  Compiling out/src/i2ccmds.o
src/i2ccmds.c:14:23: error: field ‘i2c_config’ has incomplete <span class="token builtin class-name">type</span>
     struct i2c_config i2c_config<span class="token punctuation">;</span>
                       ^
src/i2ccmds.c: In <span class="token keyword">function</span> ‘command_config_i2c’:
src/i2ccmds.c:23:23: warning: implicit declaration of <span class="token keyword">function</span> ‘i2c_setup’ <span class="token punctuation">[</span>-Wimplicit-function-declaration<span class="token punctuation">]</span>
     i2c-<span class="token operator">></span>i2c_config <span class="token operator">=</span> i2c_setup<span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>, args<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span>, addr<span class="token punctuation">)</span><span class="token punctuation">;</span>
                       ^
src/i2ccmds.c: In <span class="token keyword">function</span> ‘command_i2c_write’:
src/i2ccmds.c:35:5: warning: implicit declaration of <span class="token keyword">function</span> ‘i2c_write’ <span class="token punctuation">[</span>-Wimplicit-function-declaration<span class="token punctuation">]</span>
     i2c_write<span class="token punctuation">(</span>i2c-<span class="token operator">></span>i2c_config, data_len, data<span class="token punctuation">)</span><span class="token punctuation">;</span>
     ^
src/i2ccmds.c: In <span class="token keyword">function</span> ‘command_i2c_read’:
src/i2ccmds.c:48:5: warning: implicit declaration of <span class="token keyword">function</span> ‘i2c_read’ <span class="token punctuation">[</span>-Wimplicit-function-declaration<span class="token punctuation">]</span>
     i2c_read<span class="token punctuation">(</span>i2c-<span class="token operator">></span>i2c_config, reg_len, reg, data_len, data<span class="token punctuation">)</span><span class="token punctuation">;</span>
     ^
make: *** <span class="token punctuation">[</span>Makefile:64: out/src/i2ccmds.o<span class="token punctuation">]</span> Error <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>​	解决方法就是先清除已经make的文件，然后再尝试make：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 清除已有的编译结果</span>
<span class="token function">sudo</span> <span class="token function">make</span> clean
<span class="token comment"># 编译</span>
<span class="token function">sudo</span> <span class="token function">make</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></template>
