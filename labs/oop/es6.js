class ShapeES6 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  move(x, y) {
    this.x = x
    this.y = y
  }
}

class Circle extends ShapeES6 {
  constructor(x, y, radius) {
    super(x, y)  // 一定要调父类构造函数, 而且一定要放在开头
    this.radius = radius
  }
}

class Triangle extends ShapeES6 {
  constructor(x, y) {
    super(x, y)
  }
}

c = new Circle(1, 2, 3.3)
