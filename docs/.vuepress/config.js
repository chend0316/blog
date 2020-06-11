module.exports = {
  title: '陈东的技术博客',
  description: '',
  base: '/',
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
        title: '力扣算法刷题',
        collapsable: false,
        children: [
          { title: '刷题路线', path: '/algorithm/roadmap' },
          {
            title: '算法专题',
            children: [
              { title: '最优连续子串', path: '/algorithm/substr' },
              { title: '二分法查找', path: '/algorithm/binsearch' },
              { title: '滑动窗口法', path: '/algorithm/sliding-window' },
            ]
          },
          { title: '语言差异', path: '/algorithm/language' }
        ]
      },
      {
        title: '前端',
        collapsable: false,
        children: [
          { title: '发展史', path: '/frontend/history/' },
          {
            title: 'Vue',
            collapsable: false,
            // path: '/frontend/vue/',
            children: [
              { title: '从零开始搭建Vue环境', path: '/frontend/vue/vue-setup/' },
            ]
          },
          {
            title: 'Electron桌面端开发', path: '/frontend/electron/',
            collapsable: false,
            children: [
            ]
          },
          {
            title: '工具',
            children: [
              { title: 'NPM', path: '/frontend/tool/npm' },
            ]
          },
        ]
      },
      {
        title: '后端',
        collapsable: false,
        children: [
          { title: 'Cython入门教程', path: '/backend/cython/' },
          { title: 'Protobuf第三方扩展开发指南', path: '/backend/protobuf/' },
        ]
      },
      {
        title: '专业基础四大件',
        children: [
          { title: '数据结构与算法', path: '/cs/dsc/' },
          { title: '操作系统', path: '/cs/os/' },
          {
            title: '计算机网络', path: '/cs/network/',
            children: [
              { title: '发展史', path: '/cs/network/history' }
            ]
          },
          { title: '编译原理', path: '/cs/compile/' },
        ]
      },
      {
        title: '经典书籍',
        path: '/book',
      }
    ]
  }
}
