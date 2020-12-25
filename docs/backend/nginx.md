# Nginx
## 源码安装
### 目录结构介绍
```
./nginx-1.18.0
├── auto
│   ├── cc  # 编译相关
│   ├── lib
│   ├── os  # 判断当前的操作系统
│   └── types
├── conf  # 一些示例配置文件
│   ├── fastcgi.conf
│   ├── fastcgi_params
│   ├── koi-utf
│   ├── koi-win
│   ├── mime.types
│   ├── nginx.conf
│   ├── scgi_params
│   ├── uwsgi_params
│   └── win-utf
├── configure  # 是C语言编译工具链的一员
└── src
    ├── core
    ├── event
    ├── http
    ├── mail
    ├── misc
    ├── os
    └── stream
```

### 编译
(1) `./configure --help` 可以查看支持的配置项

(2) `./configure --prefix=/home/nginx` 当看到以下输出时就算成功
```
  nginx path prefix: "/home/nginx"
  nginx binary file: "/home/nginx/sbin/nginx"
  nginx modules path: "/home/nginx/modules"
  nginx configuration prefix: "/home/nginx/conf"
  nginx configuration file: "/home/nginx/conf/nginx.conf"
  nginx pid file: "/home/nginx/logs/nginx.pid"
  nginx error log file: "/home/nginx/logs/error.log"
  nginx http access log file: "/home/nginx/logs/access.log"
  nginx http client request body temporary files: "client_body_temp"
  nginx http proxy temporary files: "proxy_temp"
  nginx http fastcgi temporary files: "fastcgi_temp"
  nginx http uwsgi temporary files: "uwsgi_temp"
  nginx http scgi temporary files: "scgi_temp"
```

这一步会将中间文件放在 `objs/` 目录下，`objs/ngx_modules.c` 文件列出了会被编译的模块。

(3) `make` 编译，这一步会在 `objs/` 目录下生成可执行文件、中间文件、静态库文件、动态库文件。

(4) `make install` 安装，用于首次安装的场景
