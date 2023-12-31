---
title: HTTP
mode: "notes"
---

HTTP 是超文本传输协议，HyperText Transfer Protocol 。

HTTP 是一个在计算机世界里专门在两点之间传输文字、图片、音频、视频等超文本数据的约定和规范。

> HTTP 通常跑在 TCP/IP 协议栈之上，依靠 IP 协议实现寻址和路由、TCP 协议实现可靠数据传输、DNS 协议实现域名查找、SSL/TLS 协议实现安全通信。此外，还有一些协议依赖于 HTTP，例如 WebSocket、HTTPDNS 等。这些协议相互交织，构成了 1 个协议网，HTTP 就处于中心位置。

## 发展

### HTTP/0.9

初期的互联网世界非常简陋，计算机处理能力低，存储容量小，网速很慢，还是 1 片“信息荒漠”。网络上绝大多数的资源都是纯文本。

HTTP/0.9 结构比较简单，为了便于服务器和客户端处理，它也采用了纯文本格式。只允许用 GET 动作从服务器上获取 HTML 文档，并且在响应请求之后立即关闭连接。

可以将 HTTP/0.9 视作 1 个简单的原型。

### HTTP/1.0

随着计算机多媒体技术的发展，Web 展示内容日趋多样且复杂。

随之出现了 HTTP/1.0 ，它不是 1 个标准，只是记录已有实践和模式的 1 份参考文档，不具有实际的约束力，相当于 1 个**备忘录**。

它加入了 1 些新的特性：

1. 增加了 HEAD、POST 新方法；
2. 增加了响应状态码，标记可能的错误原因；
3. 引入了协议版本号概念；
4. 引入了 HTTP Header（头部）的概念，让 HTTP 处理请求和响应更加灵活；
5. 传输的数据不再仅限于文本。

由于其不具有协议的约束性，导致其实际作用不大。

### HTTP/1.1

互联网内的发起了针对浏览器话语权的斗争，微软胜利后，根据其 IE 的自有特性，出现了 HTTP/1.1 。

HTTP/1.1 是对 HTTP/1.0 的小幅度修正。但 1 个重要的区别是：它是 1 个**正式的标准**（浏览器、服务器、网关、代理等等，只要用到 HTTP 协议，就必须严格遵守这个标准）。

变更点：

1. 增加了 PUT、DELETE 等新的方法；
2. 增加了缓存管理和控制；
3. 明确了连接管理，允许持久连接；
4. 允许响应数据分块（chunked），利于传输大文件；
5. 强制要求 Host 头，让互联网主机托管成为可能。

> HTTP/1.1 并不完美，比如连接速度跟不上迅猛的Web发展需求。  对此开发者提出了 1 些社区性质的优化策略比如以前常见的切图、JS 合并等网页优化手段。

### HTTP/2.0

第二次针对浏览器话语权的斗争谷歌最终胜利，随后出现了相应的 HTTP/2.0 。

HTTP/2.0 的制定充分考虑了现今互联网的现状：宽带、移动、不安全，在高度兼容 HTTP/1.1 的同时在性能改善方面做了很大努力，主要的特点有：

1. 二进制分帧，通讯内容不再是纯文本；
2. 可发起多个请求，废弃了 HTTP/1.1 里的管道；
3. 使用专用算法压缩头部，减少数据传输量；
4. 允许服务器主动向客户端推送数据；
5. 增强了安全性，“事实上”要求加密通信。

> **二进制分帧层**。 既然要全兼容 HTTP/1.1 ，只能在应用层 (HTTP2.0)和传输层 (TCP or UDP)之间增加一个二进制分帧层。 在二进制分帧层上，将所有传输的信息分割为更小的消息和帧，并对它们采用二进制格式的编码，首部信息会被封装到 Headers 帧，request body 封装到 Data 帧里面。 

HTTP/2.0 衍生出了 gRPC 等新协议，但由于 HTTP/1.1 实在是太过经典和强势，目前它的普及率还比较低，大多数网站使用的仍然还是 20 年前的 HTTP/1.1。

### HTTP/3.0

HTTP/2.0 采用的「多路复用机制」保证了客户端可以在发送请求时无需进行等待，
但在服务器接收请求时如出现数据包丢失时，仍会等待数据包的重发，停止对后续数据包的接收，
**即「队头堵塞」问题从浏览器的请求发起位置移动到了服务器的接受请求位置**。
（「多路复用」使得请求可以被切片，不同请求的切片可以穿插发送，但针对同 1 请求的切片顺序仍需要保持）

随着丢包率的增加，HTTP/2.0 的传输效率也会越来越差。
当系统达到了 2% 的丢包率时，HTTP/1.1 的传输效率反而比 HTTP/2.0 表现得更好。

#### QUIC 协议

HTTP/3.0 基于 UDP 协议声明了 QUIC协议，
QUIC 协议基本实现了 HTTP/2.0 的功能，且可以省去 TCP 和 TLS 的连接步骤。

遥遥无期。