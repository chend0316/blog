class Shape {
    x: number;
    y: number = 1;
    constructor (x: number, y: number) {
        this.x = x;
        // this.y = y;
    }
    move (x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Circle extends Shape {
    radius: number;
    constructor (x: number, y: number, radius: number) {
        super(x, y);
        this.radius = radius;
    }
}

let shape = new Shape(1, 2)
console.log(shape.y)

// 成员修饰符语法同Java, 默认都是public
// 可以对构造函数使用private和protected修饰符
// 有readonly, static修饰符
// 可以对构造函数的参数使用修饰符
// 有没有abstract修饰符?
