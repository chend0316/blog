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
              { text: 'DP', link: '/leetcode/topic/dp' },
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
          {
            text: '基本功',
            items: [
              { text: 'JavaScript', link: '/frontend/javascript/' },
              // { text: 'CSS', link: '/frontend/css/' },
              // { text: 'DOM', link: '/frontend/dom' },
              { text: '浏览器和网络', link: '/frontend/browser/' },
            ]
          },
          {
            text: '框架',
            items: [
              // { text: 'React', link: '/frontend/react/' },
              { text: 'Vue', link: '/frontend/vue/' },
              { text: '原理和思想', link: '/frontend/framework/' },
            ]
          },
          {
            text: '其它',
            items: [
              { text: '性能', link: '/frontend/performance/' },
              { text: '可视化', link: '/frontend/visualization/' },
              { text: '发展史', link: '/frontend/history' },
              { text: 'Electron', link: '/frontend/electron/' },
            ]
          }
        ]
      },
      {
        text: '后端',
        items: [
          // { text: 'SQL', link: '/backend/sql/' },
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
          // { text: '数据结构&算法', link: '/cs/dsa/' },
          // { text: '编译原理', link: '/cs/compile/' },
          // { text: '操作系统', link: '/cs/os/' },
          { text: '计算机网络', link: '/cs/network/' },
        ]
      }
    ],
    sidebarDepth: 4,
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
      '/frontend/javascript/': [
        '/frontend/javascript/',
        '/frontend/javascript/es5',
        '/frontend/javascript/es6',
        '/frontend/javascript/code',
      ],
      '/frontend/css/': [
        '/frontend/css/'
      ],
      '/frontend/browser/': [
        '/frontend/browser/',
        '/frontend/browser/js-engine',
        '/frontend/browser/http',
        '/frontend/browser/event-loop',
      ],
      '/frontend/react/': [
        '/frontend/react/',
      ],
      '/frontend/vue/': [
        '/frontend/vue/',
        '/frontend/vue/vue3-migration',
        '/frontend/vue/vue-setup',
      ],
      '/frontend/framework/': [
        '/frontend/framework/',
        '/frontend/framework/state',
        '/frontend/framework/vdom',
        '/frontend/framework/hooks',
        '/frontend/framework/backend-interaction',
      ],
      '/frontend/': [
        'performance/',
        'rxjs',
        'visualization/',
        'history',
        'electron/',
      ],
      '/backend/': [
        // 'sql/',
        'cython/',
        'protobuf/',
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
      '/cs/': [
        // 'dsa/',
        // 'os/',
        'network/',
        // 'compile/',
      ],
      '/': [
        '',
        'book'
      ]
    }
  }
}
