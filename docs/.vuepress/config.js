module.exports = {
  title: '陈东的技术博客',
  description: '',
  base: '/',
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
          { text: '系统总结', link: '/leetcode/summary' },
          { text: '零散知识', link: '/leetcode/topic' },
          { text: '语言差异', link: '/leetcode/lang-diff' },
          { text: '内置数据结构', link: '/leetcode/ds-lib' },
        ]
      },
      {
        text: '前端',
        items: [
          { text: '发展史', link: '/frontend/history' },
          { text: '框架核心原理', link: '/frontend/core' },
          { text: 'Vue', link: '/frontend/vue/vue-setup' },
          { text: 'Electron', link: '/frontend/electron/' },
        ]
      },
      {
        text: '后端',
        link: '/backend/cython/',
      },
      // {
      //   text: '编程语言',
      //   link: '/language/',
      // },
      // {
      //   text: '计算机',
      //   items: [
      //     { text: '数据结构&算法', link: '/cs/dsa/' },
      //     { text: '编译原理', link: '/cs/compile/' },
      //     { text: '操作系统', link: '/cs/os/' },
      //     { text: '计算机网络', link: '/cs/network/' },
      //   ]
      // }
    ],
    sidebarDepth: 5,
    sidebar: {
      '/leetcode/': [
        'summary',
        'draft',
        'lang-diff',
        'ds-lib',
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
      ],
      '/backend/': [
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
