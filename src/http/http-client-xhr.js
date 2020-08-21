// 在 Browser 环境运行
// 参考资料:
// https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest
// https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/onreadystatechange
var xhr = new XMLHttpRequest;
xhr.open("get", "http://127.0.0.1:8000", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log(xhr.responseText);
    }
}
xhr.send(null);
