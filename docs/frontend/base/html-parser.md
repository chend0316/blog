# 实现一个 HTML 解析器

这部分假设大家已有编译原理的基础。

## 词法分析器

token 大概长下面这样：

![img](https://static001.geekbang.org/resource/image/f9/84/f98444aa3ea7471d2414dd7d0f5e3a84.png)

一般是用状态机实现词法分析器，但 HTML 词法比较简单也可以用正则表达式。

### 状态机实现

![img](https://static001.geekbang.org/resource/image/8b/b0/8b43d598bc1f83a8a1e7e8f922013ab0.png)

当然了，我们这里的分析比较粗略，真正完整的HTML词法状态机，比我们描述的要复杂的多。更详细的内容，你可以参考[HTML官方文档](https://html.spec.whatwg.org/multipage/parsing.html#tokenization)，HTML官方文档规定了80个状态。

上图的状态机可以像下面这样实现：

```
var data = function(c) {
    if (c == "&") {
        return characterReferenceInData;
    }
    if (c == "<") {
        return tagOpen;
    } else if (c == "\0") {
        error();
        emitToken(c);
        return data;
    } else if (c==EOF) {
        emitToken(EOF);
        return data;
    } else {
        emitToken(c);
        return data;
    }
};

var tagOpenState = function tagOpenState(c) {
    if (c == "/") {
        return endTagOpenState;
    }
    if (c.match(/[A-Z]/)) {
        token = new StartTagToken();
        token.name = c.toLowerCase();
        return tagNameState;
    }
    if (c.match(/[a-z]/)) {
        token = new StartTagToken();
        token.name = c;
        return tagNameState;
    }
    if (c=="?") {
        return bogusCommentState;
    } else {
        error();
        return dataState;
    }
};
//……

var state = data;
var char
while (char = getInput()) {
    state = state(char);
}
```

### 正则表达式实现

## 语法分析器

接下来我们要把这些简单的词变成DOM树，这个过程我们是使用栈来实现的，任何语言几乎都有栈，为了给你跑着玩，我们还是用JavaScript来实现吧，毕竟JavaScript中的栈只要用数组就好了。

```
function HTMLSyntaticalParser(){
    var stack = [new HTMLDocument];
    this.receiveInput = function(token) {
        //……
    }
    this.getOutput = function(){
        return stack[0];
    }
}
```

我们这样来设计HTML的语法分析器，receiveInput负责接收词法部分产生的词（token），通常可以由emmitToken来调用。

在接收的同时，即开始构建DOM树，所以我们的主要构建DOM树的算法，就写在receiveInput当中。当接收完所有输入，栈顶就是最后的根节点，我们DOM树的产出，就是这个stack的第一项。

为了构建DOM树，我们需要一个Node类，接下来我们所有的节点都会是这个Node类的实例。

在完全符合标准的浏览器中，不一样的HTML节点对应了不同的Node的子类，我们为了简化，就不完整实现这个继承体系了。我们仅仅把Node分为Element和Text（如果是基于类的OOP的话，我们还需要抽象工厂来创建对象），

```
function Element(){
    this.childNodes = [];
}
function Text(value){
    this.value = value || "";
}
```

前面我们的词（token）中，以下两个是需要成对匹配的：

- tag start
- tag end

根据一些编译原理中常见的技巧，我们使用的栈正是用于匹配开始和结束标签的方案。

对于Text节点，我们则需要把相邻的Text节点合并起来，我们的做法是当词（token）入栈时，检查栈顶是否是Text节点，如果是的话就合并Text节点

同样我们来看看直观的解析过程：

```
<html maaa=a >
    <head>
        <title>cool</title>
    </head>
    <body>
        <img src="a" />
    </body>
</html>
```

通过这个栈，我们可以构建DOM树：

- 栈顶元素就是当前节点；
- 遇到属性，就添加到当前节点；
- 遇到文本节点，如果当前节点是文本节点，则跟文本节点合并，否则入栈成为当前节点的子节点；
- 遇到注释节点，作为当前节点的子节点；
- 遇到tag start就入栈一个节点，当前节点就是这个节点的父节点；
- 遇到tag end就出栈一个节点（还可以检查是否匹配）。

我在文章里面放了一个视频，你可以点击查看用栈构造DOM树的全过程。

当我们的源代码完全遵循xhtml（这是一种比较严谨的HTML语法）时，这非常简单问题，然而HTML具有很强的容错能力，奥妙在于当tag end跟栈顶的start tag不匹配的时候如何处理。

于是，这又有一个极其复杂的规则，幸好W3C又一次很贴心地把全部规则都整理地很好，我们只要翻译成对应的代码就好了，以下这个网站呈现了全部规则。你可以点击查看。

http://www.w3.org/html/wg/drafts/html/master/syntax.html#tree-construction