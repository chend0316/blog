#include <iostream>

using namespace std;

int main() {
    // sizeof使用的时候后面跟着圆括号, 虽然看起来想是一个函数, 但实际上sizeof是一个运算符
    cout << sizeof(int) << endl;  // 从这也可以看出, 如果是函数, 那么参数怎么能为int呢?
    int size = sizeof 3;
    cout << sizeof 3 << endl;
    cout << sizeof(3) << endl;
    return 0;
}