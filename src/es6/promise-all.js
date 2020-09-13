const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})

const p2 = new Promise((resolve, reject) => {
  reject(new Error('错误'));
}).catch(e => {
  // 因为 p2 catch 了错误，并返回了 'world'
  return 'world';
});

// 所以这里打印的是 ['hello', 'world']
Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(e => console.log(e));
