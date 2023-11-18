---
title: Nginx
mode: "notes"
---

Nginx是一种 Web服务器， 最初由一个毛子程序员，为了解决「C10K」问题而设计开发的。

> C10K problem, 是指在一个单人程序中处理10,000个连接。  
在过去，处理大量的连接请求，需要使用多线程或者其他的并发处理模型。但多线程模型在单人程序中处理大量连接时，会因为上下文切换和同步问题而效率低下。   
Nginx 就是为了解决这个问题而诞生的。它使用了事件驱动的非阻塞IO模型，来处理大量的连接请求。

```bash
# 安装
$ brew install nginx
```

```bash
# 启动
$ sudo nginx

# 测试
$ curl -I 127.0.0.1

# 得到类似输出即为服务开启成功
HTTP/1.1 200 OK
Server: nginx/1.25.1
```

## 常用操作

```bash
# 重启
$ sudo nginx -s reload

# 停止
$ sudo nginx -s stop

# 查看版本
$ nginx -v
```

```bash
# 查看安装信息，得到下面信息
$ nginx -V
```

| 参数(Parameter) | 说明(Description) |
| - | - |
| --prefix= | 指定安装目录 |
| --sbin-path= | 指定Nginx可执行文件 |
| --conf-path= | 指定配置文件位置 |
| --pid-path= | 指定pid文件位置 |
| --error-log-path= | 指定错误日志文件 |
| --http-log-path= | 指定HTTP日志文件 |
| --user= | 指定运行Nginx的用户 |
| --group= | 指定运行Nginx的组 |
| --with-pcre= | 指定PCRE库的位置 |
| --with-pcre-jit | 开启PCRE的JIT(Just-in-time compilation)支持 |
| --with-zlib= | 指定zlib库的位置 |

## 配置文件

配置文件一般位于 `/etc/nginx/nginx.conf` ，
可以执行 `nginx -t` 命令来查看配置文件位置同时检查配置文件是否合法。

```nginx
# 打开配置文件
# 配置文件分为以下几个部分:

# 全局块 
worker_processes 1;

events {
    # events块 
}

http {
    # http块 
    server {
        # server块 
        location / {
            # location块 
        }
    } 
}
```

#### 全局块

全局块是配置文件的主体部分，主要用来设置一些影响Nginx服务器整体运行的配置指令，  
主要包括配置运行 Nginx 服务器的用户(组)、允许生成的worker process数、进程PID存放路径、日志存放路径和类型以及配置文件引入等。

```nginx
# 指定运行Nginx服务器的用户，只能在全局块配置
# 将user指令注释掉，或者配置成nobody的话所有用户都可以运行 
# user [user] [group]
# user nobody nobody;
user nginx;

# 指定生成的worker进程的数量，也可使用自动模式，只能在全局块配置 
worker_processes 1;

# 错误日志存放路径和类型
error_log /var/log/nginx/error.log warn;

# 进程PID存放路径
pid /var/run/nginx.pid;
```

#### events块

```nginx
events {
    # 指定使用哪种网络IO模型，只能在events块中进行配置 
    # use epoll

    # 每个worker process允许的最大连接数 
    worker_connections 1024;
}
```

#### http块

http块是配置文件的主要部分，包括http全局块和server块。

```nginx
http {
    # nginx 可以使用include指令引入其他配置文件 
    include /etc/nginx/mime.types;

    # 默认类型，如果请求的URL没有包含文件类型，会使用默认类型 
    default_type application/octet-stream; # 默认类型

    # 开启高效文件传输模式 
    sendfile on;

    # 连接超时时间 
    keepalive_timeout 65;

    # access_log 日志存放路径和类型
    # 格式为:access_log <path> [format [buffer=size] [gzip[=level]] [flush=time] [if=condition]];
    access_log  /var/log/nginx/access.log  main;

    # 定义日志格式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"'; 
                      
    # 设置sendfile最大传输片段大小，默认为0，表示不限制
    # sendfile_max_chunk 1m;

    # 每个连接的请求次数
    # keepalive_requests 100;

    # keepalive超时时间 
    keepalive_timeout 65;

    # 开启gzip压缩 
    # gzip on;

    # 开启gzip压缩的最小文件大小 
    # gzip_min_length 1k;

    # gzip压缩级别，1-9，级别越高压缩率越高，但是消耗CPU资源也越多 
    # gzip_comp_level 2;

    # gzip压缩文件类型
    # gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;

    # upstream指令用于定义一组服务器，一般用来配置反向代理和负载均衡 
    upstream www.example.com {
        # ip_hash指令用于设置负载均衡的方式，ip_hash表示使用客户端的IP进行hash， 这样可以保证同一个客户端的请求每次都会分配到同一个服务器，解决了session共享的问题
        ip_hash;
        # weight 用于设置权重，权重越高被分配到的几率越大 
        server 192.168.50.11:80 weight=3;
        server 192.168.50.12:80;
        server 192.168.50.13:80;
    }

    server {
        # 参考server块的配置 
    }
}
```

#### server块

server块是配置虚拟主机的，一个http块可以包含多个server块，每个server块就是一个虚拟主机。

```nginx
server {
    # 监听IP和端口
    # listen的格式为:
    # listen [ip]:port [default_server] [ssl] [http2] [spdy] [proxy_protocol] [setfib=number] [fastopen=number] [backlog=number]; 
    # listen指令非常灵活，可以指定多个IP和端口，也可以使用通配符
    # 下面是几个实际的例子:
    # listen 127.0.0.1:80; # 监听来自127.0.0.1的80端口的请求
    # listen 80; # 监听来自所有IP的80端口的请求
    # listen *:80; # 监听来自所有IP的80端口的请求，同上
    # listen 127.0.0.1; # 监听来自来自127.0.0.1的80端口，默认端口为80
    listen 80;

    # server_name 用来指定虚拟主机的域名，可以使用精确匹配、通配符匹配和正则匹配等方式
    # server_name example.org www.example.org; # 精确匹配
    # server_name *.example.org; # 通配符匹配 
    # server_name ~^www\d+\.example\.net$; # 正则匹配 
    server_name localhost;
    
    # location块用来配置请求的路由，一个server块可以包含多个location块，每个 location块就是一个请求路由
    # location块的格式是:
    # location [=|~|~*|^~] /uri/ { ... } 
    # = 表示精确匹配，只有完全匹配上才能生效
    # ~ 表示区分大小写的正则匹配
    # ~* 表示不区分大小写的正则匹配
    # ^~ 表示普通字符匹配，如果匹配成功，则不再匹配其他location # /uri/ 表示请求的URI，可以是字符串，也可以是正则表达式
    # { ... } 表示location块的配置内容
    location / {
        # root指令用于指定请求的根目录，可以是绝对路径，也可以是相对路径
        root /usr/share/nginx/html; # 根目录
        # index指令用于指定默认文件，如果请求的是目录，则会在目录下查找默认文件 
        index index.html index.htm; # 默认文件
    }
    
    # 下面是一些location的示例: 
    location = / { # 精确匹配请求
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    location ^~ /images/ { # 匹配以/images/开头的请求 
        root /usr/share/nginx/html;
    }

    location ~* \.(gif|jpg|jpeg)$ { # 匹配以gif、jpg或者jpeg结尾的请求
        root /usr/share/nginx/html;
    }

    location !~ \.(gif|jpg|jpeg)$ { # 不匹配以gif、jpg或者jpeg结尾的请求 
        root /usr/share/nginx/html;
    }

    location !~* \.(gif|jpg|jpeg)$ { # 不匹配以gif、jpg或者jpeg结尾的请求
        root /usr/share/nginx/html;
    }

    # error_page 用于指定错误⻚面，可以指定多个，按照优先级从高到低依次查找 
    error_page 500 502 503 504 /50x.html; # 错误⻚面
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
```

## 常用模块

| 模块名(Module Name) | 描述(Description) |
| - | - |
| http_access_module | 接受或者拒绝特定的客户端请求 |
| http_auth_basic_module | HTTP基本认证，使用用户名和密码来限制对资源的 访问 |
| http_autoindex_module | 自动索引，用于显示目录列表 |
| http_browser_module | 从 User-Agent 请求头中获取和识别客户端浏览器 |
| http_charset_module | 添加特定的字符集到 Content-Type 响应头中 |
| http_empty_gif_module | 返回一个1像素的透明GIF图片 |
| http_fastcgi_module | FastCGI支持 |
| http_geo_module | 从IP地址中获取地理位置信息 |
| http_gzip_module | Gzip压缩支持 |
| http_limit_conn_module | 限制并发连接数 |
| http_limit_req_module | 限制请求速率 |
| http_map_module | 从变量中获取值 |
| http_memcached_module | Memcached支持 |
| http_proxy_module | 反向代理支持 |