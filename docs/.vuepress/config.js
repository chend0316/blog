module.exports = {
  title: '陈东的技术博客',
  description: '',
  themeConfig: {
    nav: [],
    sidebarDepth: 4,
    sidebar: [
      {
        title: '编程语言',
        path: '/language',
        sidebarDepth: 2,
        collapsable: false,
        children: [
          { title: 'TypeScript', path: '/language/typescript/' },
          { title: 'JavaScript(ES5)', path: '/language/javascript/' },
          { title: 'JavaScript(ES6)', path: '/language/es6/' },
        ]
      },
      {
        title: '算法',
        collapsable: false,
        children: [
          {
            title: '专题讲解',
            children: [
              { title: '最优连续子串', path: '/algorithm/substr' },
              { title: '二分法查找', path: '/algorithm/binsearch' },
            ]
          }
        ]
      },
      {
        title: '前端',
        collapsable: false,
        children: [
          {
            title: 'Vue',
            collapsable: false,
            // path: '/frontend/vue/',
            children: [
              { title: '从零开始搭建Vue环境', path: '/frontend/vue/vue-setup/' },
            ]
          }
        ]
      },
      {
        title: '后端',
        collapsable: false,
        children: [
          { title: 'Cython入门教程', path: '/backend/cython/' },
          { title: 'Protobuf第三方扩展开发指南', path: '/backend/protobuf/' },
        ]
      }
    ]
  }
}
