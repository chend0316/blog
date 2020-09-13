// 使用 Generator 封装数组 Flat 操作
// Flat 就是把嵌套数组“拍平”成一维的，算法就是把数组当做一棵树进行 DFS 遍历

function* flat(arr) {
  for (let i = 0; i < arr.length; i++) {
    let a = arr[i];
    if (Array.isArray(a)) {
      yield* flat(a);
    } else {
      yield a;
    }
  }
}

let input = [1, [[2, 3], 4], [5, 6]];

for (var a of flat(input)) {
  console.log(a);
}

let output = Array.from(flat(input));
console.log(output);
