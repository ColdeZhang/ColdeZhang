import { defineThemeConfig } from "vuepress-theme-hope";
import navbar from "./navbar";
import sidebar from "./sidebar";

export default defineThemeConfig({
  hostname: "http://blog.deercloud.site",

  author: {
    name: "鹿鸣",
    url: "http://blog.deercloud.site",
  },

  iconPrefix: "iconfont icon-",

  logo: "https://i.loli.net/2021/07/26/UmFIxdXfEv7SKah.png",

  repo: "https://github.com/ColdeZhang/blog_docs",

  docsDir: "demo/src",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: "",

  displayFooter: false,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    description: "呦呦鹿鸣，食野之苹。",
    intro: "/intro.html",
    medias: {
      Email: "coldezhang@foxmail.com",
      GitHub: "https://github.com/coldezhang",
      QQ: "http://wpa.qq.com/msgrd?v=3&uin=2751268851&site=qq&menu=yes",
      Zhihu: "https://www.zhihu.com/people/wei-yang-lu-ming",
    },
  },

  encrypt: {
    config: {
      "/guide/encrypt.html": ["1234"],
    },
  },

  plugins: {
    blog: {
      autoExcerpt: false,
    },

    // 你也可以使用 Waline
    comment: {
      type: "giscus",
      repo: "vuepress-theme-hope/giscus-discussions",
      repoId: "R_kgDOG_Pt2A",
      category: "Announcements",
      categoryId: "DIC_kwDOG_Pt2M4COD69",
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});
