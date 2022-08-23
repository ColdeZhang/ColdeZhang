import { defineHopeConfig } from "vuepress-theme-hope";
import themeConfig from "./themeConfig";

export default defineHopeConfig({
  base: "/",

  dest: "./dist",

  head: [
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_2410206_mfj6e1vbwo.css",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "//at.alicdn.com/t/font_3244898_3xh3w5h3q7e.css",
      },
    ],
  ],

  locales: {
    "/": {
      lang: "zh-CN",
      title: "鹿鸣的博客",
      description: "鹿鸣的博客站点。",
    },
  },

  themeConfig,
});
