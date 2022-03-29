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
    text: "API文档",
    icon: "api",
    link: "/api/",
  },
  {
    text: "游戏人生",
    icon: "game-fill",
    children: [
      {
        text: "Minecraft",
        children: [
          {text: "白鹿原服务器", link: "https://mc.deercloud.site"},
          {text: "MCNPS论坛", link: "https://mcnps.deercloud.site"}
        ]
      }
    ]
  },
  {
    text: "时间轴",
    icon: "time_fill",
    link: "/timeline/",
  },
]);
