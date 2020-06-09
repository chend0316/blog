#include <iostream>

using namespace std;

int main() {
    int a = 1;
    int b = 2;
    cout << sizeof(decltype(a)) << endl;
    return 0;
}
