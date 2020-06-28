#include <iostream>

template<typename T>
class Person {
public:
  static void foo(T arg) {
    std::cout << arg << std::endl;
  }
};

int main() {
  Person<double>::foo(3.14);
  return 0;
}
