module.exports = {
  title: "陈东的博客",
  description: "",
  base: "/",
  markdown: {
    lineNumbers: false,
  },
  plugins: [
    "vuepress-plugin-mathjax",
    {
      target: "svg",
      cache: false,
    },
  ],
  themeConfig: {
    repo: "chend0316/blog",
    editLinks: true,
    docsDir: "docs",
    editLinkText: "编辑此页面",
    lastUpdated: "最后编辑",
    nextLinks: false,
    prevLinks: false,
    nav: [
      {
        text: "计算机类本科教程",
        items: [
          {
            text: "必修基础",
            items: [
              { text: "编程语言", link: "/cs/programming-language/" },
              { text: "数据结构&算法", link: "/cs/dsa/" },
              { text: "使用Linux", link: "/cs/linux/" },
              // { text: '编译原理', link: '/cs/compile/' },
            ],
          },
          {
            text: "软件开发方向",
            items: [
              { text: "编程范式", link: "/cs/programming-paradigms/" },
              { text: "设计模式", link: "/cs/design-pattern/" },
              { text: "计算机网络", link: "/cs/network/" },
            ],
          },
          {
            text: "数据科学方向",
            items: [
              { text: "Python数据科学实战", link: "/cs/python-data-science/" },
              { text: '机器学习', link: '/cs/machine-learning/' },
            ],
          },
          {
            text: "找工作",
            items: [
              { text: "LeetCode", link: "/cs/leetcode/" },
              { text: "Web前端开发", link: "/cs/frontend-developer/" },
            ],
          },
        ],
      },
      // {
      //   text: "程序员基本功",
      //   items: [
      //     { text: "编程语言", link: "/programmer/language/" },
      //     { text: "Web架构", link: "/programmer/web-architecture" },
      //     // { text: '程序员修炼指南', link: '/programmer/roadmap' },
      //   ],
      // },
      {
        text: "Web前端",
        items: [
          { text: "基本功", link: "/frontend/base/" },
          {
            text: "框架 & 工具",
            items: [
              { text: "三大框架", link: "/frontend/framework/" },
              { text: "Webpack", link: "/frontend/webpack/" },
            ],
          },
          {
            text: "跨平台",
            items: [
              // { text: 'Hybrid', link: '/frontend/hybrid/' },
              // { text: 'React Native', link: '/frontend/react-native/' },
              { text: "微信小程序", link: "/frontend/mini-program/" },
              { text: "Flutter", link: "/frontend/flutter/" },
              { text: "Electron", link: "/frontend/electron/" },
            ],
          },
          // {
          //   text: '新技术',
          //   items: [
          //     { text: 'PWA', link: '/frontend/pwa/' },
          //     { text: 'WebAssembly', link: '/frontend/wasm/' },
          //   ]
          // },
          {
            text: "其它",
            items: [
              { text: "中后台常见需求", link: "/frontend/admin-in-action/" },
              { text: "性能", link: "/frontend/performance/" },
              { text: "可视化", link: "/frontend/visualization/" },
            ],
          },
        ],
      },
      {
        text: "通用软件",
        items: [
          // { text: 'Servlet', link: '/pages/java-tutorial-servlet/' },
          { text: "Spring", link: "/backend/spring/" },
          { text: "数据库", link: "/backend/database/" },
          { text: "构建工具", link: "/backend/build-tools/" },
          { text: "Docker", link: "/backend/docker/" },
          {
            text: "其它",
            items: [
              { text: "Cython", link: "/backend/cython/" },
              { text: "Protobuf", link: "/backend/protobuf/" },
            ],
          },
        ],
      },
      {
        text: "数学",
        items: [{ text: "微积分", link: "/math/calculus/" }],
      },
      // {
      //   text: '哲学',
      //   link: '/philosophy',
      // },
    ],
    sidebarDepth: 4,
    sidebar: {
      "/cs/programming-language/": [
        "",
        "compile-basic",
        "programming-in-unix-basic",
      ],
      "/cs/dsa/": ["", "data-structures", "algorithm-basic"],
      "/cs/linux/": [""],
      "/cs/programming-paradigms/": [""],
      "/cs/network/": [
        "",
        {
          title: "基础",
          collapsable: false,
          children: ["ipv4"],
        },
        {
          title: "应用层",
          collapsable: false,
          children: ["http", "streaming-media", "p2p"],
        },
        "src-lab",
      ],
      "/cs/design-pattern/": [""],
      "/cs/python-data-science/": [""],
      "/cs/machine-learning/": [""],
      // "/cs/machine-learning/": [""],
      "/cs/leetcode/": [
        "",
        {
          title: "语言基础",
          collapsable: false,
          children: ["code-template", "lang-diff"],
        },
        {
          title: "专题讲解",
          collapsable: false,
          children: [
            "topic/search",
            "topic/dp",
            "topic/bin-search",
            "topic/data-structure",
            "topic/topk",
            // 'topic/bitwise-operation',
            "topic/others",
          ],
        },
      ],
      "/cs/frontend-developer/": [
        "",
        "javascript",
        // 'frontend-master',
        // 'interview',
      ],
      // "/programmer/language/": [""],
      "/programmer/": "auto",
      "/frontend/base/": [
        {
          title: "使用 JavaScript 编程",
          collapsable: false,
          children: [
            "jsx",
            "data-fetch",
            "data-store",
            "control-flow",
            "dom-event",
            // 'dom-api',
          ],
        },
        // 'css',
        "security",
        {
          title: "浏览器原理",
          collapsable: false,
          children: [
            "event-loop",
            "v8-engine",
            // 'html-parser'
          ],
        },
        // {
        //   title: '网络协议',
        //   collapsable: false,
        //   children: [
        //     'http-lab',
        //     'http',
        //     'https',
        //     'websocket',
        //   ]
        // }
      ],
      "/frontend/admin-in-action/": "auto",
      "/frontend/framework/": ["", "react", "redux", "vue"],
      "/frontend/webpack/": [
        "",
        "concept",
        "basic-usage",
        "advanced-usage",
        // 'loader-and-plugin',
        // 'source-code',
        "appendix",
      ],
      // '/frontend/wasm/': [
      //   '/frontend/wasm/',
      // ],
      "/frontend/mini-program/": [
        "/frontend/mini-program/",
        {
          title: "常用组件",
          collapsable: false,
          children: ["progress"],
        },
      ],
      "/frontend/flutter/": ["", "dart"],
      "/frontend/electron/": ["", "dev-env"],
      "/frontend/visualization/": ["", "svg"],
      "/backend/spring-in-action/": "auto",
      "/backend/spring/": [""],
      "/backend/database/": [
        "",
        "sql",
        // 'mysql',
        "redis",
      ],
      "/math/calculus/": ["", "function"],
      "/backend/": "auto",
      "/frontend/": "auto",
      "/pages/": "auto",
      "/": ["", "frontend", "backend", "favorite"],
    },
  },
};
