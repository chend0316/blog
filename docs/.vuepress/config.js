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
        text: '力扣刷题',
        link: '/leetcode/',
      },
      {
        text: '前端',
        items: [
          {
            text: '开发实战',
            link: '/frontend/admin-in-action/'
          },
          {
            text: '基本功',
            items: [
              { text: 'JavaScript 语言', link: '/frontend/javascript/' },
              { text: 'JavaScript API', link: '/frontend/api/' },
              // { text: 'CSS', link: '/frontend/css/' },
              { text: '浏览器', link: '/frontend/browser/' },
            ]
          },
          {
            text: '框架',
            items: [
              { text: '三大框架', link: '/frontend/framework/' },
            ]
          },
          {
            text: '工程化',
            items: [
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
          //     { text: 'GraphQL', link: '/frontend/graphql' },
          //     { text: 'PWA', link: '/frontend/pwa/' },
          //     { text: 'RxJS', link: '/frontend/rxjs' },
          //     { text: 'WebAssembly', link: '/frontend/wasm/' },
          //   ]
          // },
          {
            text: '其它',
            items: [
              { text: '性能', link: '/frontend/performance/' },
              { text: '可视化', link: '/frontend/visualization/' },
            ]
          },
        ]
      },
      {
        text: '后端',
        items: [
          // { text: 'Spring', link: '/backend/spring/' },
          { text: '数据库', link: '/backend/database/' },
          { text: 'Docker', link: '/backend/docker' },
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
          // { text: '编程语言', link: '/language/' },
        ]
      },
      // {
      //   text: '哲学',
      //   link: '/philosophy',
      // },
    ],
    sidebarDepth: 4,
    sidebar: {
      '/leetcode/': [
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
        'diary'
      ],
      '/frontend/admin-in-action/': [
        '',
        'react-in-action-tech',
        'react-in-action-basic',
        'react-in-action-advanced',
      ],
      '/frontend/javascript/': [
        '/frontend/javascript/',
        '/frontend/javascript/es5',
        '/frontend/javascript/es6',
        '/frontend/javascript/snippet',
      ],
      '/frontend/api/': [
        '',
        'dom-event',
      ],
      '/frontend/css/': [
        '/frontend/css/'
      ],
      '/frontend/browser/': [
        '/frontend/browser/',
        '/frontend/browser/js-engine',
        '/frontend/browser/event-loop',
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
      '/frontend/': [
        'performance/',
        'rxjs',
        'electron/',
      ],
      '/backend/spring/': [
        ''
      ],
      '/backend/database/': [
        '',
        'sql',
        'redis'
      ],
      '/backend/': [
        'cython/',
        'protobuf/',
        'docker',
        // 'micro-service',
      ],
      '/language/': [
        'theory',
        'history',
        // 'c/',
        // 'cpp/',
        // 'typescript/',
        // 'javascript/',
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
      '/': [
        '',
        // 'fe-roadmap',
        'frontend',
        'backend',
        'favorite',
      ]
    }
  }
}
