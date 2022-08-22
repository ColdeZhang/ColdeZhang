---
title: Markdown在Vue中的一些扩展语法
date: 2021-04-25
sidebar: false
categories:
 - 学习笔记
tags:
 - Template
 - Markdown
 - Vue
keys:
 - 'e10adc3949ba59abbe56e057f20f883e'
article: true
permalink: /garmmers_of_vuepress
---

::: tip 简介

这里记录了vuepress中支持的一些mardown扩展语法 (访问密码：123456)

:::

<!-- more -->

## 头文件属性配置

```markdown
---
title: 这个是标题
date: '2019-08-08'
sidebar: 'auto'
categories:
 - 学习笔记
tags:
 - Template
 - Markdown
keys:
 - 'e10adc3949ba59abbe56e057f20f883e'
article: true
---
```

### title:
::: tip 
文章的标题
:::

### date:
::: tip 
文章展示的发布时间，格式为 `year-month-day`
:::

### sidebar:
::: tip 
是否自动生成文章大纲

 - `auto` 跟随全局设置
 - `false` 强制禁用
 - `true` 强制启用
:::

### categories:
::: tip 
文章的分类
:::

### tags:
::: tip 
文章的标签，注意vue的默认设置下标签不能超过四个，否则构建时会报错
:::

### keys:
::: tip 
如果你的密码是 `123456`，需要将密码字符串设置为32位的 md5 加密密文，也就是 `e10adc3949ba59abbe56e057f20f883e`。网站发布后，在密码输入框输入 `123456` 即可进入网站，同时他人也无法通过代码中的密文知道你的密码，但是你一定要记住自己的密码。
:::

### article:
::: tip 
设置文章是否显示在博客的列表中
        
如果设置为`false`那么该文章不会出现在所有文章的列表中，但是可以通过链接访问
:::

### permalink:
::: tip 
由于vuepress在将Markdown转化为html时会使用文件名作地址，为了方便在博客内使用超链接进行文章跳转，vrepress支持设置永久链接。

当设置了这个永久链接后，该文章的链接会永远与这个设置保持一致（不会随着文件名改变）。
:::

### sidebarDepth:
::: tip 
设置侧边栏的深度（最深显示几层），最大可设置为2，索引至h3。
:::



## 各种标注容器



::: tip 这个是提示
这个提示显示为绿框
```markdown
    ::: tip 这个是提示
    这个提示显示为绿框
    :::
```
:::



::: warning 这个是警告
这个警告显示为绿框
```markdown
    ::: warning 这个是警告
    这个警告显示为绿框
    :::
```
:::



::: danger 这个是危险
这个危险显示为红框
```markdown
    ::: danger 这个是危险
    这个危险显示为红框
    :::
```
:::



::: theorem 牛顿第一定律
假若施加于某物体的外力为零，则该物体的运动速度不变。
```markdown
    ::: theorem 牛顿第一定律
    假若施加于某物体的外力为零，则该物体的运动速度不变。
    ::: right
    来自 [维基百科](https://zh.wikipedia.org/wiki/%E7%89%9B%E9%A1%BF%E8%BF%90%E5%8A%A8%E5%AE%9A%E5%BE%8B)
    :::
```
::: right
来自 [维基百科](https://zh.wikipedia.org/wiki/%E7%89%9B%E9%A1%BF%E8%BF%90%E5%8A%A8%E5%AE%9A%E5%BE%8B)
:::



::: details 点击展开
这是一个详情块，在 IE / Edge 中不生效
```markdown
    ::: details 点击展开
    这是一个详情块，在 IE / Edge 中不生效
    :::
```
:::

## 流程图

@flowstart
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

### 安装


```json
// docs/package.json
"devDependencies": {
    "vuepress-plugin-flowchart": "^1.4.3"
}
```

### 引用

```js
// .vuepress/config.js
module.exports = {
    plugins: [
        'flowchart'
    ]
}
```

### 基本语法定义

```markdown
@flowstart [preset]

<!-- Your flowchart code here. -->

@flowend
```

### Start & End（开始与结束）

 - `[Variable]=>start: [Text]`
 - `[Variable]=>end: [Text]`

```markdown
@flowstart
st=>start: Start
e=>end: End

st->e
@flowend
```

@flowstart
st=>start: Start
e=>end: End

st->e
@flowend

### Operation（操作）

 - `[Variable]=>operation: [Text]`

```markdown
@flowstart
process=>operation: Operation
e=>end: End

process->e
@flowend
```

@flowstart
process=>operation: Operation
e=>end: End

process->e
@flowend


### Inputoutput（输入输出）

 - `[Variable]=>inputoutput: [Text]`

```markdown
@flowstart
process=>inputoutput: Inputoutput
e=>end: End

process->e
@flowend
```

@flowstart
process=>inputoutput: Inputoutput
e=>end: End

process->e
@flowend


### Subroutine

 - `[Variable]=>subroutine: [Text]`

```markdown
@flowstart
process=>subroutine: Subroutine
e=>end: End

process->e
@flowend
```

@flowstart
process=>subroutine: Subroutine
e=>end: End

process->e
@flowend


### Condition（条件判断）

 - `[Variable]=>condition: [Text]`


 - `[Variable]([yesText])->[Position]`
 - `[Variable]([noText])->[Position]`

```markdown
@flowstart
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
@flowend
```

@flowstart
cond=>condition: Process?
process=>operation: Process
e=>end: End

cond(yes)->process->e
cond(no)->e
@flowend


### Parallel（平行）

 - `[Variable]=>parallel: [Text]`


 - `[Variable](path1, direction)->[Position]`
 - `[Variable](path1, direction)->[Position]`

```markdown
@flowstart
para=>parallel: parallel tasks
process=>operation: Process
e=>end: End

para(path1, bottom)->process->e
para(path2)->e
@flowend
```

@flowstart
para=>parallel: parallel tasks
process=>operation: Process
e=>end: End

para(path1, bottom)->process->e
para(path2)->e
@flowend

### Showcase（展示）

#### #1 Ordinary process

```md
@flowstart
stage1=>operation: Stage 1
stage2=>operation: Stage 2
stage3=>operation: Stage 3

stage1->stage2->stage3
@flowend
```

@flowstart
stage1=>operation: Stage 1
stage2=>operation: Stage 2
stage3=>operation: Stage 3

stage1->stage2->stage3
@flowend

#### #2 Complex process

```md
@flowstart
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
```

@flowstart
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

#### #3 Ant Preset

```markdown
@flowstart ant
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
```

@flowstart ant
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

