# 递归
def myPow(self, x: float, n: int) -> float:
    if n == 0: return 1
    if n == 1: return x
    if n < 0: return 1 / myPow(x, -n)
    return myPow(x*x, n//2) * myPow(x, n%2)

# 迭代
def myPow(self, x: float, n: int) -> float:
    if n < 0:
        x = 1 / x
        n = -n
    res = 1
    while n > 0:
        if n & 1:
            res *= x
            n -= 1
        else:
            x *= x
            n <<= 1
    return res
