// 基于 TCP 协议实现一个 HTTP 协议
const net = require('net');

class Request {
    constructor(options) {
        this.method = options.method;
        this.path = options.path;
        this.host = options.host;
        this.port = options.port || 80;
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        if (this.headers["Content-Type"] === "application/json") {
            this.bodyText = JSON.stringify(this.body);
        } else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        }

        this.headers['Content-Length'] = this.bodyText.length;
    }

    toString() {
        // 符合 RFC2616 的字符串
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => key+': '+this.headers[key]).join('\r\n')}\r
\r
${this.bodyText}`
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString());  // 发送给服务端
                });
                connection.setEncoding('utf-8');
            }
            const respFactory = new ResponseParser();
            connection.on('data', (data) => {
                respFactory.receive(data);
                resolve(respFactory.getResponse());
                connection.end();
            });
            connection.on('error', (err) => {
                reject(err);
                connection.end();
            });
        });
    }
}

class Response {
    constructor(opts) {
        this.statusLine = opts.statusLine;
        this.headers = opts.headers;
        this.body = opts.body;
    }
}

// 工厂类
class ResponseParser {
    constructor() {
        this.WAITING_STATUS_LINE = 0;
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END = 6;
        this.WAITING_BODY = 7;
        this.FINISH = 6;

        this.state = this.WAITING_STATUS_LINE;
        this.charCnt = 0;
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";
        this.body = "";
        this.bodyParser = null;
    }

    receive(s) {
        for (let i = 0; i < s.length; i++) {
            this.receiveChar(s[i]);
        }
    }

    receiveChar(c) {
        this.charCnt += 1;
        switch (this.state) {
            case this.WAITING_STATUS_LINE:
                if (c === '\r') {
                    this.state = this.WAITING_STATUS_LINE_END;
                }
                this.statusLine += c;
                break;
            case this.WAITING_STATUS_LINE_END:
                if (c !== '\n') {
                    console.error(`[error] except '\n', got ${c}, at col ${this.charCnt}`);
                } else {
                    this.state = this.WAITING_HEADER_NAME;
                }
                break;
            case this.WAITING_HEADER_NAME:
                if (c === '\r') {
                    this.state = this.WAITING_HEADER_BLOCK_END;
                } else if (c !== ':') {
                    this.headerName += c;
                } else {
                    this.state = this.WAITING_HEADER_SPACE;
                }
                break;
            case this.WAITING_HEADER_SPACE:
                if (c === ' ') break;
                this.headerValue = c;
                this.state = this.WAITING_HEADER_VALUE;
                break;
            case this.WAITING_HEADER_VALUE:
                if (c === '\r') {
                    this.state = this.WAITING_HEADER_LINE_END;
                    this.headers[this.headerName] = this.headerValue;
                    this.headerName = '';
                    this.headerValue = '';
                } else {
                    this.headerValue += c;
                }
                break;
            case this.WAITING_HEADER_LINE_END:
                if (c !== '\n') {
                    console.error(`[error] except '\n', got ${c}, at col ${this.charCnt}`);
                } else {
                    this.state = this.WAITING_HEADER_NAME;
                }
                break;
            case this.WAITING_HEADER_BLOCK_END:
                if (c !== '\n') {
                    console.error(`[error] except '\n', got ${c}, at col ${this.charCnt}`);
                } else {
                    this.state = this.WAITING_BODY;
                    if (this.headers['Transfer-Encoding'] === 'chunked') {
                        this.bodyParser = new ChunkedBodyParser();
                    }
                }
                break;
            case this.WAITING_BODY:
                this.bodyParser.receiveChar(c);
                if (this.bodyParser.isFinish) {
                    this.body = this.bodyParser.toString();
                    this.state = this.FINISH;
                }
                break;
            case this.FINISH:
                console.error(`[error] unexcept ${c} after finished`);
                break;
            default:
                break;
        }
    }

    getResponse() {
        return new Response({
            statusLine: this.statusLine,
            headers: this.headers,
            body: this.body,
        });
    }
}

class ChunkedBodyParser {
    constructor () {
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_CHUNK = 2;
        this.WAITING_CHUNK_END = 3;
        this.WAITING_FINISH_LINE = 4;
        this.WAITING_FINISH_LINE_END = 5;
        this.FINISH = 6;

        this.state = this.WAITING_LENGTH;
        this.charCnt = 0;

        this.finished = false;
        this.length = 0;
        this.content = '';
    }

    get isFinish() {
        return this.finished;
    }

    receiveChar(c) {
        this.charCnt += 1;
        switch (this.state) {
            case this.WAITING_LENGTH:
                if (c === '\r') {
                    this.state = this.WAITING_LENGTH_LINE_END;
                } else {
                    c = c.toLowerCase();
                    const d = c.charCodeAt(0) <= '9'.charCodeAt(0)
                            ? c.charCodeAt(0) - '0'.charCodeAt(0)
                            : c.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
                    this.length = this.length * 16 + d;
                }
                break;
            case this.WAITING_LENGTH_LINE_END:
                if (c !== '\n') {
                    console.error(`[error] except '\n', got ${c}, at col ${this.charCnt}`);
                } else {
                    this.state = this.length === 0
                            ? this.WAITING_FINISH_LINE
                            : this.READING_CHUNK;
                }
                break;
            case this.READING_CHUNK:
                if (this.length === 0) {
                    if (c !== '\r') {
                        console.error(`[error] except '\r', got ${c}, at col ${this.charCnt}`);
                    } else {
                        this.state = this.WAITING_CHUNK_END;
                    }
                } else {
                    this.content += c;
                    this.length -= 1;
                }
                break;
            case this.WAITING_CHUNK_END:
                if (c !== '\n') {
                    console.error(`[error] except '\n', got ${c}, at col ${this.charCnt}`);
                } else {
                    this.state = this.WAITING_LENGTH;
                }
                break;
            case this.WAITING_FINISH_LINE:
                if (c !== '\r') {
                    console.error(`[error] except '\r', got ${c}, at col ${this.charCnt}`);
                } else {
                    this.state = this.WAITING_FINISH_LINE_END;
                }
                break;
            case this.WAITING_FINISH_LINE_END:
                if (c !== '\n') {
                    console.error(`[error] except '\n', got ${c}, at col ${this.charCnt}`);
                } else {
                    this.state = this.FINISH;
                    this.finished = true;
                }
                break;
            case this.FINISH:
                console.error(`[error] unexcept ${JSON.stringify(c)} after finished`);
                break;
            default:
                break;
        }
    }

    toString() {
        return this.content;
    }
}

(async function main () {
    let req = new Request({
        method: "POST",
        host: "127.0.0.1",
        port: "8000",
        path: "/",
        body: {
            name: "zhangsan"
        }
    });

    let resp = await req.send();
    console.log(resp.statusLine);
    console.log(resp.headers);
    console.log(resp.body);
})();
