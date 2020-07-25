module.exports = {
  title: '陈东的技术博客',
  description: '',
  base: '/',
  themeConfig: {
    lastUpdated: '最后编辑',
    nextLinks: false,
    prevLinks: false,
    nav: [
      {
        text: '力扣刷题',
        link: '/leetcode/roadmap',
      },
      {
        text: '前端',
        link: '/frontend/history/',
      },
      {
        text: '后端',
        link: '/backend/',
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
    sidebarDepth: 4,
    sidebar: {
      '/leetcode/': [
        'roadmap',
        'topic',
        'lang-diff',
        'ds-lib',
      ],
      '/frontend/vue/': [
        'vue-setup'
      ],
      '/frontend/': [
        'history',
        'core',
        'vue/',
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
        'dsa',
        'os',
        'network',
        'compile',
      ],
      '/': [
        '',
        'book'
      ]
    }
  }
}
