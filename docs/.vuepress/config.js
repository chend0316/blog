module.exports = {
  title: '陈东的博客',
  description: '',
  base: '/',
  markdown: {
    lineNumbers: false, 
  },
  themeConfig: {
    repo: 'chend0316/blog',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: '编辑此页面',
    lastUpdated: '最后编辑',
    nextLinks: false,
    prevLinks: false,
    nav: [
      {
        text: '程序员基本功',
        items: [
          { text: '力扣算法', link: '/programmer/leetcode/' },
          { text: '编程语言', link: '/programmer/language/' },
          { text: '设计模式', link: '/programmer/design-pattern/' },
          { text: 'Web架构', link: '/programmer/web-architecture' },
          // { text: '程序员修炼指南', link: '/programmer/roadmap' },
        ]
      },
      {
        text: '前端',
        items: [
          {
            text: '基本功',
            items: [
              { text: '数据获取和存储', link: '/frontend/data-fetch-and-store/' },
              { text: '程序控制流', link: '/frontend/control-flow/' },
              { text: 'Web API', link: '/frontend/api/' },
              // { text: 'CSS', link: '/frontend/css/' },
              { text: '浏览器运行原理', link: '/frontend/browser/' },
              { text: 'Web 安全', link: '/frontend/security/' },
            ]
          },
          {
            text: '框架 & 工具',
            items: [
              { text: '三大框架', link: '/frontend/framework/' },
              { text: 'Webpack', link: '/frontend/webpack/' },
            ]
          },
          {
            text: '跨平台',
            items: [
              // { text: 'Hybrid', link: '/frontend/hybrid/' },
              // { text: 'React Native', link: '/frontend/react-native/' },
              { text: '微信小程序', link: '/frontend/mini-program/' },
              { text: 'Flutter', link: '/frontend/flutter/' },
              { text: 'Electron', link: '/frontend/electron/' },
            ]
          },
          // {
          //   text: '新技术',
          //   items: [
          //     { text: 'PWA', link: '/frontend/pwa/' },
          //     { text: 'WebAssembly', link: '/frontend/wasm/' },
          //   ]
          // },
          {
            text: '其它',
            items: [
              { text: '开发实战', link: '/frontend/admin-in-action/' },
              { text: '性能', link: '/frontend/performance/' },
              { text: '可视化', link: '/frontend/visualization/' },
            ]
          },
        ]
      },
      {
        text: '后端',
        items: [
          // { text: 'Servlet', link: '/pages/java-tutorial-servlet/' },
          { text: 'Spring', link: '/backend/spring/' },
          { text: '数据库', link: '/backend/database/' },
          { text: 'Docker', link: '/backend/docker/' },
          {
            text: '其它',
            items: [
              { text: 'Cython', link: '/backend/cython/' },
              { text: 'Protobuf', link: '/backend/protobuf/' },
            ]
          },
        ]
      },
      {
        text: '计算机专业',
        items: [
          // { text: '数据结构&算法', link: '/cs/dsa/' },
          // { text: '编译原理', link: '/cs/compile/' },
          // { text: '操作系统', link: '/cs/os/' },
          { text: '计算机网络', link: '/cs/network/' },
        ]
      },
      // {
      //   text: '哲学',
      //   link: '/philosophy',
      // },
    ],
    sidebarDepth: 4,
    sidebar: {
      '/programmer/leetcode/': [
        '',
        {
          title: '语言基础',
          collapsable: false,
          children: [
            'code-template',
            'lang-diff',
          ]
        },
        {
          title: '专题讲解',
          collapsable: false,
          children: [
            'topic/search',
            'topic/dp',
            'topic/bin-search',
            'topic/data-structure',
            'topic/topk',
            // 'topic/bitwise-operation',
            'topic/others',
          ]
        },
      ],
      '/programmer/language/': [
        '',
        'javascript',
      ],
      '/programmer/': 'auto',
      '/frontend/admin-in-action/': 'auto',
      '/frontend/api/': [
        '',
        'dom-event',
      ],
      '/frontend/css/': [
        ''
      ],
      '/frontend/browser/': [
        '',
        'js-engine',
        'event-loop',
      ],
      '/frontend/framework/': [
        '',
        'react',
        'redux',
        'vue',
      ],
      '/frontend/webpack/': [
        '',
        'concept',
        'basic-usage',
        'advanced-usage',
        // 'loader-and-plugin',
        // 'source-code',
        'appendix'
      ],
      // '/frontend/wasm/': [
      //   '/frontend/wasm/',
      // ],
      '/frontend/mini-program/': [
        '/frontend/mini-program/',
        {
          title: '常用组件',
          collapsable: false,
          children: [
            'progress'
          ]
        }
      ],
      '/frontend/flutter/': [
        '/frontend/flutter/',
        '/frontend/flutter/dart',
      ],
      '/frontend/visualization/': [
        '',
        'svg',
      ],
      '/backend/spring-in-action/': 'auto',
      '/backend/spring/': [
        ''
      ],
      '/backend/database/': [
        '',
        'sql',
        // 'mysql',
        'redis'
      ],
      '/cs/network/': [
        '',
        {
          title: '基础',
          collapsable: false,
          children: [
            'ipv4'
          ]
        },
        {
          title: '应用层',
          collapsable: false,
          children: [
            'http',
            'streaming-media',
            'p2p'
          ]
        },
        'src-lab'
      ],
      '/backend/': 'auto',
      '/frontend/': 'auto',
      '/pages/': 'auto',
      '/': [
        '',
        'frontend',
        'backend',
        'favorite',
      ]
    }
  }
}
