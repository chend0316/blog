# 编译原理
三大经典书籍，个人推荐先读虎书，比较易读：
- 《编译原理》(龙书)
- 《现代编译原理：Ｃ语言描述》(虎书)
- 《高级编译器设计与实现》(鲸书)

## 概述
### 词法分析
术语：
- 有限自动机 (Finite Automata, FA) 指的是状态的数量有限
- 确定有限自动机 (deterministic finite automaton, DFA)，按照虎书的话说就是: "no two edges leaving from the same state are labeled with the same symbol"
- 非确定有限自动机 (nondeterministic finite automaton, NFA)

实现词法分析的两种方案：
- 手写词法分析器
- 用正则表达式 (regular expressions) 描述词法，然后用 DFA 实现

用正则表达式描述词法会存在二义性 (ambiguous)，有两种消除二义性的办法：
- Longest match
- Rule priority: 以第一个匹配到的正则表达式为准，所以正则表达式规则的书写顺序很重要

《虎书》在 ch2.2 用正则表达式描述了一门语言，然后在 ch2.3 画了相应的 DFA，ch2.3 还用转换矩阵 (transition matrix) 实现了这个 DFA。为了解决二义性问题，ch2.3 还实现了一种 longest match 的算法。

《虎书》在 ch2.4 说正则转 NFA 很容易，但程序实现 NFA 很困难 (需要试错、回溯，时间复杂度高)。为此 ch2.4.2 给出了一种 NFA 转 DFA 的算法，本质就是广度优先搜索。所以我们通常会：写正则 -> NFA -> DFA -> 实现 DFA。

