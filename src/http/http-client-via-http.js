// 参考资料: https://nodejs.org/dist/latest-v12.x/docs/api/http.html
const http = require('http');

const options = {
  host: '127.0.0.1',
  port: 8000,
  path: '/'
};

const req = http.request(options, function (res) {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');

    let buf = '';
    res.on('data', (chunk) => {
        buf += chunk;
    });
    res.on('end', () => {
      console.log(buf);
    });
});

req.end();
