(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{481:function(t,e,s){"use strict";s.r(e);var a=s(12),r=Object(a.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"连接相关的头字段"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#连接相关的头字段"}},[t._v("#")]),t._v(" 连接相关的头字段")]),t._v(" "),e("p",[e("strong",[t._v("短连接")])]),t._v(" "),e("p",[t._v("HTTP （0.9 / 1.0）是 1 个非常简单的协议，通信过程也采用了简单的“请求 - 应答”方式。")]),t._v(" "),e("p",[t._v("它底层的数据传输基于 TCP/IP，每次发送请求前需要先与服务器建立连接，收到响应报文后会立即关闭连接。这被称为"),e("strong",[t._v("短连接")]),t._v("。")]),t._v(" "),e("p",[t._v("短连接的缺点相当严重，因为在 TCP 协议里，建立连接和关闭连接都是非常“昂贵”的操作。TCP 建立连接要有“三次握手”，发送 3 个数据包，需要 1 个 RTT；关闭连接是“四次挥手”，4 个数据包需要 2 个 RTT。")]),t._v(" "),e("p",[t._v("而 HTTP 的一次简单“请求 - 响应”通常只需要 4 个包，如果不算服务器内部的处理时间，最多是 2 个 RTT。")]),t._v(" "),e("p",[e("strong",[t._v("长连接")])]),t._v(" "),e("p",[t._v("针对短连接暴露出的缺点，HTTP 协议就提出了“长连接”的通信方式。")]),t._v(" "),e("p",[t._v("思路就是“成本均摊”，既然 TCP 的连接和关闭非常耗时间，那么就把这个时间成本由原来的一个“请求 - 应答”均摊到多个“请求 - 应答”上。")]),t._v(" "),e("p",[t._v("服务器端针对长连接的无限度维持意味着大量资源被占用，所以服务器支持对长连接配置最大维护时间。")]),t._v(" "),e("h3",{attrs:{id:"标记长连接"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#标记长连接"}},[t._v("#")]),t._v(" 标记长连接")]),t._v(" "),e("p",[t._v("长连接对性能的改善效果非常显著，所以在 HTTP/1.1 中的连接都会默认启用长连接。")]),t._v(" "),e("p",[t._v("也可以在请求头里显示地标记使用长连接机制，字段 Connection，值是“keep-alive”。")]),t._v(" "),e("p",[t._v("在客户端的请求头添加“Connection: close”字段可以明确拒绝长连接机制。")]),t._v(" "),e("p",[t._v("不管客户端是否要求长连接，如果服务器支持长连接，它会在响应报文里放一个“Connection: keep-alive”字段。")]),t._v(" "),e("div",{staticClass:"language-http extra-class"},[e("pre",{pre:!0,attrs:{class:"language-http"}},[e("code",[e("span",{pre:!0,attrs:{class:"token request-line"}},[e("span",{pre:!0,attrs:{class:"token method property"}},[t._v("GET")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token request-target url"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token http-version property"}},[t._v("HTTP/1.1")])]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("host")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("www.example.com")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Accpet")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("text/html")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Connection")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("keep-alive")])]),t._v("\n")])])]),e("div",{staticClass:"language-http extra-class"},[e("pre",{pre:!0,attrs:{class:"language-http"}},[e("code",[e("span",{pre:!0,attrs:{class:"token response-status"}},[e("span",{pre:!0,attrs:{class:"token http-version property"}},[t._v("HTTP/1.1")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token status-code number"}},[t._v("200")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token reason-phrase string"}},[t._v("OK")])]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Conte-Type")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("text/html")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Connection")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("keep-alive")])]),t._v("\n")])])]),e("h3",{attrs:{id:"保持长连接"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#保持长连接"}},[t._v("#")]),t._v(" 保持长连接")]),t._v(" "),e("p",[t._v("服务器端通常不会主动关闭连接，但也可以使用一些策略。如 Nginx ：")]),t._v(" "),e("ul",[e("li",[t._v("使用“keepalive_timeout”指令，设置长连接的超时时间，如果在一段时间内连接上没有任何数据收发就主动断开连接。")]),t._v(" "),e("li",[t._v("使用“keepalive_requests”指令，设置长连接上可发送的最大请求次数。")])]),t._v(" "),e("p",[t._v("另外，客户端和服务器都可以在报文里附加通用头字段“Keep-Alive: timeout=value”，限定长连接的超时时间。这个字段没有约束力，需要通信的双方主动遵守。")]),t._v(" "),e("h2",{attrs:{id:"队头阻塞"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#队头阻塞"}},[t._v("#")]),t._v(" 队头阻塞")]),t._v(" "),e("p",[e("strong",[t._v("队头阻塞")]),t._v("是由 HTTP 基本的“请求 - 应答”模型所导致的。"),e("br"),t._v("\nHTTP 规定报文必须是“1发1收”，这就形成了一个先进先出的“串行”队列。")]),t._v(" "),e("p",[t._v("队列里的请求按照入队的先后顺序依次处理，如果队首请求的响应处理过慢，那么队列里后面的所有请求也不得不跟着一起等待，结果就是其他的请求承担了不应有的时间成本。")]),t._v(" "),e("p",[t._v("在 HTTP/1.1 中“请求 - 应答”模型不能变，所以"),e("strong",[t._v("队头阻塞")]),t._v("问题里无法解决，只能通过"),e("strong",[t._v("并发")]),t._v("的方式来解决。")]),t._v(" "),e("p",[t._v("HTTP/1.1 中实际最多支持针对同 1 域同时维持6-8个长连接以缓解"),e("strong",[t._v("对头阻塞")]),t._v("，但这又带来了不同连接之间争抢带宽等问题。")]),t._v(" "),e("p",[t._v("还有 1 种社区方式是"),e("strong",[t._v("域名分片")]),t._v("，指配置多个目标域但最终都指向同 1 个地址。")])])}),[],!1,null,null,null);e.default=r.exports}}]);