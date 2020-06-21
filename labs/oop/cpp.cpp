#include <iostream>

class Shape {
public:
    int x, y;
    
    Shape(int x, int y): x(x), y(y) {}

    void move(int x, int y) {
        this->x = x;
        this->y = y;
    }
};

class Circle: Shape {
public:
    double radius;
    // 一定要调父类构造函数
    // Circle(int x, int y, double radius): Shape(x, y), radius(radius) {}
    Circle(int x, int y, double radius): Shape(x, y) {
        this->radius = radius;
    }
};

using namespace std;

int main() {
    Shape *s = new Shape(3, 4);
    s->move(5, 6);

    cout << s->x << s->y << endl;
    return 0;
}

// 一共有几个成员修饰符?
