---
title: 反向代理和负载均衡
mode: "notes"
---

## 反向代理

> 「代理」在网络中属于「中间人」的身份，它介于「请求方」和「响应方」之间，代为传递数据。

「反向代理」是相对于「正向代理」来说的，
简单的说，「正向代理」是代理客户端，向服务器端发出请求，接收响应并返还给最终的客户端，
而「反向代理」就是代理服务端，接受客户端的请求，将请求转发到真正的服务端，然后将服务端的响应返回给客户端。

> 这里被代理方是明确知道「代理」的存在，而对于信息发送方，「代理」是透明的。

例如国内的客户端访问国外站点时时延过长或者直接无法访问，就可以使用 VPN 进行「正向代理」，将请求转发到国外的 VPN 服务器，然后由 VPN 服务器转发到国外的目标服务器。

再如 Google 服务器，对外只暴露了 `www.google.com` 这个域名，而真正处理请求的则是成千上万台服务器，这些服务器对于用户来说就是透明的，用户只知道域名所在的代理服务器。

Nginx 就是一个很好的「反向代理」服务器。

#### 简单示例

使用 Go 创建三个服务器，然后使用 Nginx 进行代理。

```go
// 服务器端口分别为 8081 8082 8083
// 其余相同服务省略
package main

import (
	"fmt"
	"log"
	"net/http"
)

func main(){
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "Hello, world! here is main :8081")
	})

	log.Fatal(http.ListenAndServe(":8081", nil))
}
```

在 Nginx 中配置反向代理：

```nginx
http {
    upstream go_server {
        server localhost:8081;
        server localhost:8082;
        server localhost:8083;
    }

    server {
        listen 80;
        server_name localhost;
        location /go {
            proxy_pass http://go_server;
        }
    }
}
```

执行。

```bash
# 查看当前配置是否正确
$ nginx -t 
# 重启 nginx
$ nginx -s reload

# 启动 go 服务
$ go run main.go
$ go run main.go
$ go run main.go

# 访问 localhost/go 会按顺序访问到 8081 8082 8083 中的一个。
```


 
## 负载均衡

「负载均衡」（Load Balancing）是一种可以使多个服务器同时工作的技术，它可以将一个任务合理分配到多个处理单元上。

「负载均衡」的目的是为了提高系统的可用性和可扩展性，使系统在一个很高的并发访问量下，仍能对每一个请求作出快速响应。

「负载均衡」的方式有很多种，最常见的有 DNS 轮询、反向代理、IP 哈希等。

例如，谷歌域名所指向的服务器**将请求按照特定的规则分发给身后指定的业务服务器**，就是这一种「负载均衡」的体现。

#### 简单示例

在上面的例子中，给服务配置各自的权重，以实现优先匹配：

```nginx
http {
    upstream go_server {
        server localhost:8081 weight=3; # 权重越高，分配的请求越多
        server localhost:8082;
        server localhost:8083;
    }
}
```
