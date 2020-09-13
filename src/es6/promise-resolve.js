const p1 = new Promise(function (resolve, reject) {
    console.log('p1');
    setTimeout(() => {
        console.log('p11');
        reject(new Error('error'));
        console.log('p111');
    }, 3000);
});

// 虽然 p2 比 p1 快
const p2 = new Promise(function (resolve, reject) {
    console.log('p2');
    setTimeout(() => {
        console.log('p22');
        resolve(p1); // 但这里 resolve 入参是 p1，所以 p2 会等待 p1 完成
        console.log('p222');
    }, 1000);
});

p2.then((value) => { console.log(value); })
  .catch((error) => { console.log(error); });

/*
输出：
p1
p2
p22
p222
p11
p111
*/
