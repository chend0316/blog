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
        sidebarDepth: 2,
        collapsable: false,
        children: [
          { title: '语言理论', path: '/language/theory' },
          { title: '语言发展史', path: '/language/history' },
          {
            title: 'C',
            children: [
              { title: '小实验：编译、链接', path: '/language/c/lab-compile-link' }
            ]
          },
          { title: 'Golang', path: '/language/golang/' },
          { title: 'C++', path: '/language/cpp/' },
          { title: 'TypeScript', path: '/language/typescript/' },
          { title: 'JavaScript(ES5)', path: '/language/javascript/' },
          { title: 'JavaScript(ES6)', path: '/language/es6/' },
        ]
      },
      {
        title: '力扣算法刷题',
        collapsable: false,
        children: [
          { title: '刷题路线', path: '/leetcode/roadmap' },
          {
            title: '算法专题',
            children: [
              { title: '最优连续子串', path: '/leetcode/substr' },
              { title: '二分法查找', path: '/leetcode/binsearch' },
              { title: '滑动窗口法', path: '/leetcode/sliding-window' },
            ]
          },
          { title: '语言差异', path: '/leetcode/lang-diff' }
        ]
      },
      {
        title: '前端',
        collapsable: false,
        children: [
          { title: '发展史', path: '/frontend/history' },
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
          { title: 'CSS', path: '/frontend/css/' },
          {
            title: '工具',
            children: [
              { title: 'NPM', path: '/frontend/tool/npm' },
              { title: 'Babel', path: '/frontend/tool/babel' },
              { title: '单元测试', path: '/frontend/tool/unittest' },
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
          { title: '数据结构与算法', path: '/cs/dsa/' },
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
