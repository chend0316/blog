// 替换 Array 默认的迭代器 (Iterator)
// 实现从两边向中间的顺序遍历

let arr = [1, 2, 3, 4, 5];
// for (let i of arr) {
//   console.log(i); // 1 2 3 4 5
// }

Array.prototype[Symbol.iterator] = function* () {
  if (this.length === 0) return;
  let l = 0;
  let r = this.length - 1;
  while (l < r) {
    yield this[l];
    yield this[r];
    l += 1;
    r -= 1;
  }
  yield this[l];
}

for (let i of arr) {
  console.log(i); // 1 5 2 4 3
}
