export const data = {
  "key": "v-502089ac",
  "path": "/Tcp-Ip-Network-Notebook-chapter-5/",
  "title": "第五章：基于tpc的服务端客户端（2）",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "第五章：基于tpc的服务端客户端（2）",
    "date": "2077-07-26T00:00:00.000Z",
    "sidebar": "auto",
    "article": false,
    "permalink": "/Tcp-Ip-Network-Notebook-chapter-5",
    "summary": "5.1 回声客户端的完美实现 回声客户端的问题 此处客户端向服务端写入一段消息后立即读取服务端返回的回声，这里存在一个问题：我们不能保证在我们读取的时候服务端一定接收到了内容，数据传输的过程中可能会传输不止一个数据包，并且当数据长度足够大的时候这种可能性就更高。 在客户端读取前添加一个延迟也不能真正解决问题，因为我们并不知道需要等待多久。 客户端问题解决方法",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "http://blog.deercloud.site/Tcp-Ip-Network-Notebook-chapter-5"
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
          "content": "第五章：基于tpc的服务端客户端（2）"
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
          "property": "article:published_time",
          "content": "2077-07-26T00:00:00.000Z"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "5.1 回声客户端的完美实现",
      "slug": "_5-1-回声客户端的完美实现",
      "children": [
        {
          "level": 3,
          "title": "回声客户端的问题",
          "slug": "回声客户端的问题",
          "children": []
        },
        {
          "level": 3,
          "title": "客户端问题解决方法",
          "slug": "客户端问题解决方法",
          "children": []
        },
        {
          "level": 3,
          "title": "应用层协议",
          "slug": "应用层协议",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "5.2 TCP原理",
      "slug": "_5-2-tcp原理",
      "children": [
        {
          "level": 3,
          "title": "TCP套接字中的I/O缓冲",
          "slug": "tcp套接字中的i-o缓冲",
          "children": []
        },
        {
          "level": 3,
          "title": "TCP原理1:套接字连接过程",
          "slug": "tcp原理1-套接字连接过程",
          "children": []
        },
        {
          "level": 3,
          "title": "TCP原理2:与对方主机数据交换",
          "slug": "tcp原理2-与对方主机数据交换",
          "children": []
        },
        {
          "level": 3,
          "title": "TCP原理3:断开套接字的连接",
          "slug": "tcp原理3-断开套接字的连接",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "5.3 基于Windows的实现",
      "slug": "_5-3-基于windows的实现",
      "children": []
    },
    {
      "level": 2,
      "title": "5.4 习题",
      "slug": "_5-4-习题",
      "children": []
    }
  ],
  "git": {
    "createdTime": 1647348463000,
    "updatedTime": 1647348463000,
    "contributors": [
      {
        "name": "ColdeZhang",
        "email": "coldezhang@foxmail.com",
        "commits": 1
      }
    ]
  },
  "readingTime": {
    "minutes": 5.19,
    "words": 1557
  },
  "filePathRelative": "Tcp-Ip-Network-Notebook/chapter5.md"
}
