// 参考资料: https://nodejs.org/dist/latest-v12.x/docs/api/http.html
const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
});

server.listen(8000);
