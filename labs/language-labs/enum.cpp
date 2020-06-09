#include <iostream>

using namespace std;

enum Color {
    RED,
    GREEN,
    YELLOW,
};

int main() {
    Color c;
    c = RED;
    c = (Color)9;
    return 0;
}