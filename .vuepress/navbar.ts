import { defineNavbarConfig } from "vuepress-theme-hope";

export default defineNavbarConfig([
  "/",
  {
    text: "文章分类",
    icon: "categoryselected",
    children: [
      {
        text: "学习笔记",
        link: "/category/%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0/",
      },
      {
        text: "教程分享",
        link: "/category/%E6%95%99%E7%A8%8B%E5%88%86%E4%BA%AB/",
      },
      {
        text: "项目说明",
        link: "/category/%E9%A1%B9%E7%9B%AE%E8%AF%B4%E6%98%8E/",
      },
    ],
  },
  {
    text: "游戏人生",
    icon: "game-fill",
    children: [
      {
        text: "Minecraft",
        children: [
          {text: "白鹿原服务器", link: "http://mc.deercloud.site"},
          {text: "MCNPS论坛", link: "http://mcnps.deercloud.site"}
        ]
      }
    ]
  },
  {
    text: "时间轴",
    icon: "time_fill",
    link: "/timeline/",
  },
  
  // { text: "使用指南", icon: "creative", link: "/guide/" },
  // {
  //   text: "博文",
  //   icon: "edit",
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "文章 1-4",
  //       icon: "edit",
  //       prefix: "article/",
  //       children: [
  //         { text: "文章 1", icon: "edit", link: "article1" },
  //         { text: "文章 2", icon: "edit", link: "article2" },
  //         "article3",
  //         "article4",
  //       ],
  //     },
  //     {
  //       text: "文章 5-12",
  //       icon: "edit",
  //       children: [
  //         {
  //           text: "文章 5",
  //           icon: "edit",
  //           link: "article/article5",
  //         },
  //         {
  //           text: "文章 6",
  //           icon: "edit",
  //           link: "article/article6",
  //         },
  //         "article/article7",
  //         "article/article8",
  //       ],
  //     },
  //     { text: "文章 9", icon: "edit", link: "article9" },
  //     { text: "文章 10", icon: "edit", link: "article10" },
  //     "article11",
  //     "article12",
  //   ],
  // },
  // {
  //   text: "主题文档",
  //   icon: "note",
  //   link: "https://vuepress-theme-hope.github.io/v2/zh/",
  // },
]);
