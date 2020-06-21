class Shape():
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def move(self, x, y):
        self.x = x
        self.y = y

class Circle(Shape):
    def __init__(self, x, y, radius):
        # 不一定要调用父类构造函数, 父类构造函数不一定要放在开头
        # Shape.__init__(self, x, y)
        self.radius = radius

c = Circle(1, 2, 3.3)
print(c.x, c.y, c.radius)

# Python用_开头表示protected, 用__开头表示private