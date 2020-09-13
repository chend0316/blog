// 使用 Promise 封装 Ajax 请求的例子

const getJSON = function (url) {
    return new Promise(function (resolve, reject) {
        const client = new XMLHttpRequest();
        client.open('GET', url);
        client.setRequestHeader('Accept', 'application/json');
        client.responseType = 'json';
        client.onreadystatechange = function () {
            if (this.readyState !== 4) return;
            if (this.status === 200) resolve(this.response);
            reject(new Error(this.statusText));
        }
        client.send();
    });
}

getJSON("/data.json").then(function (json) {
    console.log('Contents: ' + json);
}, function (error) {
    console.error('出错了', error);
});
