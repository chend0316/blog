function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('hello'), time);
  });
}

// 因为 .then() 会返回一个新的 Promise 实例，所以可以链式调用
sleep(500)
  .then((result) => {
    console.log(result); // hello
    return 123;
  })
  .then((result) => {
    console.log(result); // 123
  });

// 在链式调用的过程中
// 可以返回一个普通值
// 也可以返回一个 Promise 对象插入一段异步操作
let p1 = sleep(500);
let p2 = p1.then((result) => {
  return new Promise((resolve, reject) => {
    console.log('p2 ' + result);
    setTimeout(() => resolve(123), 500);
  });
});
let p3 = p2.then((result) => {
  console.log('p3 ' + result);
});
