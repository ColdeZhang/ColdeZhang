---
title: :construction:Vuepress+GithubAction搭建免费快速的个人博客
date: 2021-04-26
categories:
  - 教程分享
tags:
  - Vue
  - Blog
  - GitHub
  - Website
permalink: /how_to_build_blogs_with_vuepress
article: true
sidebar: false
---

::: tip 简介
这篇文章记录了如何实现一个像这样的个人博客网站，整个过程不用花一分钱也不用学习复杂的前端开发。
:::

<!-- more -->

## 技术思路

### 目标
 1. 完全免费；
 2. 易于维护；
 3. 简洁美观；

### 思路
 1. 将博客配置完成后上传至GitHub；
 2. GitHub Action 自动运行 Vuepress 生成网站并发布到新分支；
 3. Netlify 自动从新分支获取生成后的静态网站；

@flowstart
local=>operation: 本地文件
master=>parallel: [GitHub仓库]-main分支
out=>parallel: [GitHub仓库]-out分支
action=>operation: GitHub-Action
netlify=>operation: Netlify

local(right)->master(path2,right)->action(right)->out(path2,right)->netlify 


@flowend


### 工具
 1. MarkDwon;
 2. GitHub;
 3. GitHub Action;
 4. Netlify;

### Q&A

::: details 什么是 GitHub ？
这篇文章的所有内容都是建立在你已经**掌握了GitHub的基本使用**的基础之上，如果你还不知道什么是 GitHub 或者使用还不够熟练可以参考这篇文章：简单的 GitHub 入门使用。
:::

::: details 为什么是 GitHub Action ？
GitHub Action 是 GitHub 提供的一款免费的云部署服务。通过 GitHub Action 可以实现远程自动化运行 Vuepress 生成静态网站。
:::

::: details 为什么是 Netlify ？
也可以使用 GitHub Page 也是完全免费的，但是 GitHub Page 在中国境内访问速度非常慢甚至经常掉线，很难称得上“易用”（至少对用户很不友好）。所以这里通过另一个平台，自动获取我们发布到 GitHub 仓库的静态网站。
:::

::: details 为什么要新建一个分支？
我们提交到 master 分支中的并不是网页，需要通过 Vuepress 才能生成可以被浏览器解析的网站（包括了网页、样式、路由）。而生成后的文件如果重新放进 master 可能造成版本控制的混乱进而导致网站崩溃，故在仓库下创建一个新的分支专门用于存储自动生成的网站文件， Netlify 再从这个分支中提取网站部署。
:::



## 具体实现

### 1.获取基础文件

将我准备好的[基本配置文件](https://github.com/ColdeZhang/build_your_free_blog)克隆到本地；

```bash
# 使用代码 clone
git clone git://github.com/ColdeZhang/build_your_free_blog.git
```

::: details 图形化git工具
如果你采用的是图形化 git 软件，请参考对应的教程，此处不赘述。（太多啦！）
:::

::: warning 注意
为了避免不必要的麻烦，不建议从我的项目直接 fork ，如果你想支持我的项目可以手动点击一下 star 。
:::



### 2.修改 `config.js`

>这个文件在 ./docs/.vuepress/config.js
>主要存放的是博客的全局配置



***
**标题**

```java
// ./docs/.vuepress/config.js
module.exports = {
  title: '求知若渴 虚怀若愚',
  description: 'Stay hungry, stay foolish.'
}
```

<img src="https://i.loli.net/2021/04/27/8UyvDPY5Z6i9lcK.png" style="zoom:50%;" />



***
**作者与头像**

- `author` 后填入你想展示的作者名

- `authorAvatar` 后填入你的图片地址（推荐使用图床）

```java
// ./docs/.vuepress/config.js
module.exports = {
  themeConfig: {
    author: "鹿鸣",
    authorAvatar: '头像图片地址'
  }
}
```
<img src="https://i.loli.net/2021/04/27/jvZ71oRqtLxhUYK.png" style="zoom:50%;" />

::: details 什么是头像图片地址？（图床的使用）

:::



***
**社交链接**

- 在 `link` 后填入你自己的社交网站主页；

```java
// ./docs/.vuepress/config.js
module.exports = {
  themeConfig: {
    blogConfig: {
      socialLinks: [
        { icon: 'reco-github', link: 'your_url' },
        { icon: 'reco-bilibili', link: 'your_url' },
        { icon: 'reco-zhihu', link: 'your_url' },
        { icon: 'reco-qq', link: 'your_url' }
      ]
    }
  }
}
```
<img src="https://i.loli.net/2021/04/27/s2ENtYDzjVZ4GWb.png" style="zoom:50%;" />

>不需要的可以直接删除，全删掉也可以



***
**留言板配置**

- `appId` 后填入你的App ID；

- `appKey` 后填入你的App Key；

```java
// ./docs/.vuepress/config.js
module.exports = {
  themeConfig: {
    valineConfig: {
      appId: 'your_Id',
      appKey: 'your_key'
    }
  }
}
```
::: details 如何获得id与key
请先[登录](https://leancloud.cn/dashboard/login.html#/signin)或[注册](https://leancloud.cn/dashboard/login.html#/signup) `LeanCloud`, 进入[控制台](https://leancloud.cn/dashboard/applist.html#/apps)后点击左下角[创建应用](https://leancloud.cn/dashboard/applist.html#/newapp)：

![](https://i.loli.net/2019/06/21/5d0c995c86fac81746.jpg)

应用创建好以后，进入刚刚创建的应用，选择左下角的`设置`>`应用Key`，然后就能看到你的`APP ID`和`APP Key`了：

![](https://i.loli.net/2019/06/21/5d0c997a60baa24436.jpg)
:::



### 3.修改 `README.md`

>这个文件在 ./docs/README.md
>实质是博客首页的源文件



**首页头图配置**

- `bgImage` 后填入你的头图地址（推荐使用图床）

```markdown
bgImage: 'your_head_image_url'
```

<img src="https://i.loli.net/2021/04/27/SVbfU8MWInpuR6J.png" style="zoom:50%;" />



### 4.创建一个新的仓库

- 在 GitHub 上新建一个仓库，这个仓库专门用于存放你的博客的源代码以及自动生成的网站文件。

::: warning 注意

1. 仓库类型请选择  `public` （公开），私有仓库可能会导致他人无法访问；
2. 不要勾选创建 `README.md` 文件；

:::



### 5.上传

- 将所有文件 commit 至 master 分支，然后 push 到 GitHub 仓库。
- 如果一切正常，点击仓库主页的 `Action` 标签，应该就能看到你的项目正在被生成与部署。

![](https://i.loli.net/2021/04/28/v7iNULZ96yPX5Jg.png)

::: details 使用 GitHub Page 访问

其实做到这一步你的网站已经可以访问了，GitHub 提供了 GitHub Page 服务，用于托管项目静态网站。

1. 在 GitHub 项目主页选择 `Setting` 标签，选择 `Pages` 一栏；
<img src="https://i.loli.net/2021/04/28/GEtxiybk1Czjceo.png" style="zoom:30%;" />

2. `Source` 下选择 `out`分支，单击 `Save` 保存；
![](https://i.loli.net/2021/04/28/H6FgRbsuNc2LSXJ.png)

3. 接着 GitHub 会提示你，你的网站已经成功发布在了对应的网址上；
![](https://i.loli.net/2021/04/28/wAdQ9Iloq3ms7BH.png)

4. 你还可以在 `Custom Domain` 中设置你自己的域名（不要忘记解析到第三步中的网址上）；
![](https://i.loli.net/2021/04/28/ciNypGkSaTCAX1W.png)

::: warning
实际使用中，GitHub Page 在中国大陆访问速度慢得离谱，掉线更是家常便饭，使用体验极差。
:::

:::

### 6.配置Netlify



### 7.检查与验证



### Q&A

::: details GitHub Action 在哪里？
由于 GitHub Action 本身就是自动化部署流程，因此仅需要配置即可自动运行。而对于相同的功能它的配置文件是通用的，我已经写好放置在`.github/workflows/article_pg.yml`无需做额外的修改，如有特殊需要可自行研究。
:::

## 使用与完善



::: details 为什么使用 MarkDown 写
MarkDown 是一种简洁易用的文本标记语言，它具有统一的格式与规范。使用 MarkDown 撰写博客后可以利用 Vuepress 根据预先设定的模板直接生成静态网站。
:::