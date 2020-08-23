// 参考资料:
// https://cyc2018.github.io/CS-Notes/#/notes/HTTP
// https://tools.ietf.org/html/rfc2616
const net = require('net');

const client = net.createConnection({
        host: '127.0.0.1',
        port: 8000
    }, () => {
        console.log('------ connected to server ------');
        // let buf = '';
        // buf += 'POST / HTTP/1.1\r\n';
        // buf += 'Content-Type: application/x-www-form-urlencoded\r\n';
        // buf += 'Content-Length: 13\r\n';
        // buf += '\r\n';
        // buf += 'name=zhangsan';
        // client.write(buf);

        client.write('POST / HTTP/1.1\r\n');
        client.write('Content-Type: application/x-www-form-urlencoded\r\n');
        client.write('Content-Length: 13\r\n');
        client.write('\r\n');
        client.write('name=zhangsan');

        // client.write('POST / HTTP/1.1\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: 13\r\n\r\nname=zhangsan');
    }
);

client.on('data', (data) => {
    console.log('----- receive data begin -----');
    console.log(data.toString());
    console.log('----- receive data end -----');
    client.end();
});

client.on('end', () => {
    console.log('------ disconnected from server ------');
});
