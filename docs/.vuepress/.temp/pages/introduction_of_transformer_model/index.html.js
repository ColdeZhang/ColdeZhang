export const data = {
  "key": "v-3d2c1dc8",
  "path": "/introduction_of_transformer_model/",
  "title": "Transformer模型简介（NLP）",
  "lang": "zh-CN",
  "frontmatter": {
    "title": "Transformer模型简介（NLP）",
    "date": "2021-08-11T00:00:00.000Z",
    "sidebar": false,
    "article": true,
    "permalink": "/introduction_of_transformer_model",
    "sidebarDepth": 2,
    "summary": "Abstract\nThe Transformer was proposed in the paper Attention is All You Need. A TensorFlow implementation of it is available as a part of the Tensor2Tensor package. Harvard’s NLP group created a guide annotating the paper with PyTorch implementation. In this post, we will attempt to oversimplify things a bit and introduce the concepts one by one to hopefully make it easier to understand to people without in-depth knowledge of the subject matter.\n\n",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "https://blog.deercloud.site/introduction_of_transformer_model"
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
          "content": "Transformer模型简介（NLP）"
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
          "content": "ML"
        }
      ],
      [
        "meta",
        {
          "property": "article:tag",
          "content": "NLP"
        }
      ],
      [
        "meta",
        {
          "property": "article:published_time",
          "content": "2021-08-11T00:00:00.000Z"
        }
      ]
    ],
    "tag": [
      "ML",
      "NLP"
    ],
    "category": [
      "学习笔记"
    ]
  },
  "excerpt": "<div class=\"custom-container tip\"><p class=\"custom-container-title\">Abstract</p>\n<p>The Transformer was proposed in the paper <a href=\"https://arxiv.org/abs/1706.03762\" target=\"_blank\" rel=\"noopener noreferrer\">Attention is All You Need<ExternalLinkIcon/></a>. A TensorFlow implementation of it is available as a part of the Tensor2Tensor package. Harvard’s NLP group created a <a href=\"http://nlp.seas.harvard.edu/2018/04/03/attention.html\" target=\"_blank\" rel=\"noopener noreferrer\">guide annotating the paper with PyTorch implementation<ExternalLinkIcon/></a>. In this post, we will attempt to oversimplify things a bit and introduce the concepts one by one to hopefully make it easier to understand to people without in-depth knowledge of the subject matter.</p>\n</div>\n",
  "headers": [
    {
      "level": 2,
      "title": "前言",
      "slug": "前言",
      "children": []
    },
    {
      "level": 2,
      "title": "A High-Level Look",
      "slug": "a-high-level-look",
      "children": []
    },
    {
      "level": 2,
      "title": "Bringing The Tensors Into the Picture",
      "slug": "bringing-the-tensors-into-the-picture",
      "children": []
    },
    {
      "level": 2,
      "title": "Now We’re Encoding !",
      "slug": "now-we-re-encoding",
      "children": []
    },
    {
      "level": 2,
      "title": "Self-Attention at a High Level",
      "slug": "self-attention-at-a-high-level",
      "children": []
    },
    {
      "level": 2,
      "title": "Self-Attention in Detail",
      "slug": "self-attention-in-detail",
      "children": []
    },
    {
      "level": 2,
      "title": "Matrix Calculation of Self-Attention",
      "slug": "matrix-calculation-of-self-attention",
      "children": []
    },
    {
      "level": 2,
      "title": "The Beast With Many Heads",
      "slug": "the-beast-with-many-heads",
      "children": []
    },
    {
      "level": 2,
      "title": "Representing The Order of The Sequence Using Positional Encoding",
      "slug": "representing-the-order-of-the-sequence-using-positional-encoding",
      "children": []
    },
    {
      "level": 2,
      "title": "The Residuals",
      "slug": "the-residuals",
      "children": []
    },
    {
      "level": 2,
      "title": "The Decoder Side",
      "slug": "the-decoder-side",
      "children": []
    },
    {
      "level": 2,
      "title": "The Final Linear and Softmax Layer",
      "slug": "the-final-linear-and-softmax-layer",
      "children": []
    },
    {
      "level": 2,
      "title": "Recap of Training",
      "slug": "recap-of-training",
      "children": []
    },
    {
      "level": 2,
      "title": "The Loss Function",
      "slug": "the-loss-function",
      "children": []
    },
    {
      "level": 2,
      "title": "Go Forth And Transform",
      "slug": "go-forth-and-transform",
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
    "minutes": 17.29,
    "words": 5186
  },
  "filePathRelative": "posts/2021-8-14-1-The_Illustrated_Transformer.md"
}
