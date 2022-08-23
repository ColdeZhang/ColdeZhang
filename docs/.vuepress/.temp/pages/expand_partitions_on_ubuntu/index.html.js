export const data = {
  "key": "v-bf28e2dc",
  "path": "/expand_partitions_on_ubuntu/",
  "title": "使用 Growpart 为 Ubuntu 扩容分区",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "使用 Growpart 为 Ubuntu 扩容分区",
    "date": "2021-06-16T00:00:00.000Z",
    "sidebar": false,
    "article": true,
    "permalink": "/expand_partitions_on_ubuntu",
    "sidebarDepth": 2,
    "summary": "背景 租的云服务器购买了更多的硬盘容量后发现实际使用的容量并没有增加，使用lsblk发现虚拟磁盘空间确实扩大了，只是分区没有自动扩大。 输入：; 输出：; 这里的vda即为服务器上连接的虚拟硬盘，下方的vda1和vda2为该硬盘上的两个分区。可以看到我这里硬盘一共有60G的容量，但是仅有一个大小为5G的文件分区。 我接下来就需要对分区vda2进行扩容。 请先",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "https://blog.deercloud.site/expand_partitions_on_ubuntu"
        }
      ],
      [
        "meta",
        {
          "property": "og:site_name",
          "content": "鹿鸣的博客"
        }
      ],
      [
        "meta",
        {
          "property": "og:title",
          "content": "使用 Growpart 为 Ubuntu 扩容分区"
        }
      ],
      [
        "meta",
        {
          "property": "og:type",
          "content": "article"
        }
      ],
      [
        "meta",
        {
          "property": "og:locale",
          "content": "zh-CN"
        }
      ],
      [
        "meta",
        {
          "name": "twitter:card",
          "content": "summary_large_image"
        }
      ],
      [
        "meta",
        {
          "name": "twitter:image:alt",
          "content": "鹿鸣的博客"
        }
      ],
      [
        "meta",
        {
          "property": "article:author",
          "content": "鹿鸣"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Ubuntu"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "Terminal"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-06-16T00:00:00.000Z"
        }
      ]
    ],
    "tag": [
      "Ubuntu",
      "Terminal"
    ],
    "category": [
      "学习笔记"
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "背景",
      "slug": "背景",
      "children": []
    },
    {
      "level": 2,
      "title": "安装工具",
      "slug": "安装工具",
      "children": []
    },
    {
      "level": 2,
      "title": "开始扩容",
      "slug": "开始扩容",
      "children": []
    },
    {
      "level": 2,
      "title": "更新分区表",
      "slug": "更新分区表",
      "children": []
    }
  ],
  "git": {
    "createdTime": 1661137303000,
    "updatedTime": 1661137303000,
    "contributors": [
      {
        "name": "ColdeZhang",
        "email": "coldezhang@foxmail.com",
        "commits": 1
      }
    ]
  },
  "readingTime": {
    "minutes": 1.74,
    "words": 523
  },
  "filePathRelative": "posts/2021-6-16-1-Growpart_on_Ubuntu.md"
}
