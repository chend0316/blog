# Python为了去掉变量声明，它会扫描一遍函数，将处于左值的那些变量提取到函数的开头进行“隐式声明”
def foo():
    for i in range(10):
        a = i
    return a
print(foo())

# 这个特性导致下面这段代码无法运行
def Counter():
    cnt = 0
    def inc():
        cnt = cnt + 1
        return cnt
    return inc
inc = Counter()
inc()
print(inc())

# 这边有一个规避的办法，就是不要让变量处在左值
def Counter():
    inner = {}
    inner['cnt'] = 0
    def inc():
        inner['cnt'] = inner['cnt'] + 1
        return inner['cnt']
    return inc

inc = Counter()
inc()
print(inc())
