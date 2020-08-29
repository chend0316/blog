module.exports = {
  title: '陈东的技术博客',
  description: '',
  base: '/',
  markdown: {
    lineNumbers: true
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
        items: [
          { text: '代码模板 (背)', link: '/leetcode/code-template' },
          { text: '语言差异 (坑)', link: '/leetcode/lang-diff' },
          {
            text: '专题讲解',
            items: [
              { text: '搜索', link: '/leetcode/topic/search' },
              { text: 'DP', link: '/leetcode/topic/DP' },
              { text: '二分查找', link: '/leetcode/topic/bin-search' },
              { text: '数据结构', link: '/leetcode/topic/data-structure' },
              { text: 'TopK', link: '/leetcode/topic/topk' },
              { text: '其它', link: '/leetcode/topic/others' },
            ]
          },
        ]
      },
      {
        text: '前端',
        items: [
          { text: '发展史', link: '/frontend/history' },
          { text: '框架核心原理', link: '/frontend/core' },
          { text: 'Vue', link: '/frontend/vue/vue-setup' },
          { text: 'Electron', link: '/frontend/electron/' },
          { text: '可视化', link: '/frontend/visualization/' },
        ]
      },
      {
        text: '后端',
        items: [
          { text: 'SQL', link: '/backend/sql/' },
          { text: 'Cython', link: '/backend/cython/' },
          { text: 'Protobuf', link: '/backend/protobuf/' },
        ]
      },
      // {
      //   text: '编程语言',
      //   link: '/language/',
      // },
      {
        text: '计算机基础',
        items: [
          { text: '数据结构&算法', link: '/cs/dsa/' },
          { text: '编译原理', link: '/cs/compile/' },
          { text: '操作系统', link: '/cs/os/' },
          { text: '计算机网络', link: '/cs/network/' },
        ]
      }
    ],
    sidebarDepth: 5,
    sidebar: {
      '/leetcode/': [
        'code-template',
        'lang-diff',
        {
          title: '专题讲解',
          collapsable: false,
          children: [
            'topic/search',
            'topic/dp',
            'topic/bin-search',
            'topic/data-structure',
            'topic/topk',
            'topic/others',
          ]
        }
      ],
      '/frontend/': [
        'history',
        'core',
        {
          title: 'Vue',
          collapsable: false,
          children: [
            '/frontend/vue/vue-setup',
          ]
        },
        'electron/',
        'visualization/',
      ],
      '/backend/': [
        'sql/',
        'cython/',
        'protobuf/',
        'micro-service',
      ],
      '/language/': [
        'theory',
        'history',
        // 'c/',
        // 'cpp/',
        // 'typescript/',
        // 'javascript/',
      ],
      '/cs/': [
        'dsa/',
        'os/',
        'network/',
        'compile/',
      ],
      '/': [
        '',
        'book'
      ]
    }
  }
}
