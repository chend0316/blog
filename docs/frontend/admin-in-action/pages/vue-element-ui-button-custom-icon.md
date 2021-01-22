# el-button 使用自定义图标实践
ElementUI 图标按钮的用法如下：
```html
<el-button type="primary" icon="el-icon-search">搜索</el-button>
<el-button size="mini" type="primary" icon="el-icon-search">搜索</el-button>
```

会产生这样的 DOM 结构：
```html
<button type="button" class="el-button el-button--primary">
  <i class="el-icon-search"></i>
  <span>搜索</span>
</button>
```

## 自定义图标
以使用 IconFont 的图标为例，我们可以这样使用：
```html
<el-button icon="iconfont icon-search">搜索</el-button>
```

这样生成的 DOM 结构如下：
```html
<button type="button" class="el-button el-button--default">
  <i class="iconfont icon-search"></i>
  <span>搜索</span>
</button>
```

## 坑：自定义图标和文字挨的太近
下面这段代码 ElementUI 自带的 chalk 主题样式，这个选择器无法匹配 `iconfont` 图标：
```css
.el-button [class*=el-icon-]+span {
  margin-left: 5px;
}
```

因此我们可以在项目中仿写一个适配 IconFont 的样式：
```css
.el-button .iconfont+span {
  margin-left: 5px;
}
```

## 坑：图标大小不能自适应
`<el-button>` 可以用 size 属性调整大小，比如 `<el-button size="mini"></button>` 会对应 `.el-button--mini { font-size: 12px; }`。

但 IconFont 的 font-size 是写死的：`.iconfont { font-size: 16px; }`，为了让图标大小能自适应，我们覆盖这个样式。
```css
.el-button .iconfont {
  font-size: inherit;
}
```
