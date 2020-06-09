#include <iostream>

using namespace std;

int main() {
    int age = 18;    
    int num = 19;

    const int *a = &age;
    a = &num;
    // *a = 20;

    int const * b = &age;
    b = &num;
    // *b = 20;

    int * const c = &age;
    // c = &num;
    *c = 20;


    return 0;
}

