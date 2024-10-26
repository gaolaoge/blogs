(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{440:function(t,e,a){t.exports=a.p+"assets/img/chunked.4bce5c64.png"},441:function(t,e,a){t.exports=a.p+"assets/img/chunks.8ff576fb.png"},487:function(t,e,a){"use strict";a.r(e);var s=a(12),n=Object(s.a)({},(function(){var t=this,e=t._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("p",[t._v("HTTP 可以传输很多种类的数据，不仅是文本，也能传输图片、音频和甚至所占内存相对庞大的视频等内容。")]),t._v(" "),e("h3",{attrs:{id:"数据压缩"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#数据压缩"}},[t._v("#")]),t._v(" 数据压缩")]),t._v(" "),e("p",[t._v("通常浏览器在发送请求时都会带着“Accept-Encoding”头字段，里面是浏览器支持的压缩格式列表，例如 gzip、deflate、br 等，这样服务器就可以从中选择 1 种压缩算法，放进“Content-Encoding”响应头里，再把原数据压缩后发给浏览器。")]),t._v(" "),e("p",[t._v("但 gzip 等压缩算法通常只对文本文件有较好的压缩率，而图片、音频视频等多媒体数据本身就已经是高度压缩的，再用 gzip 处理也不会变小，甚至会适得其反。")]),t._v(" "),e("h3",{attrs:{id:"分块传输"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#分块传输"}},[t._v("#")]),t._v(" 分块传输")]),t._v(" "),e("blockquote",[e("p",[t._v("服务器端将大文件“拆分“成多个小块，分批发给浏览器，浏览器收到后再组装复原。")])]),t._v(" "),e("p",[t._v("响应报文中使用字段“Transfer-Encoding: chunked”表示报文的 body 部分会被分成了许多的块（chunk）逐个发送。")]),t._v(" "),e("p",[t._v("分块传输也可以用于“流式数据”，当 body 数据的长度未知时无法在头字段“Content-Length”里给出确切的长度，所以也只能用 chunked 方式分块发送。")]),t._v(" "),e("p",[t._v("“Transfer-Encoding: chunked”和“Content-Length”这两个字段是互斥的，若同时出现“Transfer-Encoding: chunked”优先级更高。")]),t._v(" "),e("p",[t._v("分块传输的编码同样采用了明文的方式，很类似响应头：")]),t._v(" "),e("ul",[e("li",[t._v("每个分块包含两个部分，长度头和数据块；")]),t._v(" "),e("li",[t._v("长度头是以 CRLF（回车换行，即\\r\\n）结尾的一行明文，用 16 进制数字表示长度；")]),t._v(" "),e("li",[t._v("数据块紧跟在长度头后，最后也用 CRLF 结尾，但数据不包含 CRLF；")]),t._v(" "),e("li",[t._v("最后用一个长度为 0 的块表示结束，即“0\\r\\n\\r\\n”。")])]),t._v(" "),e("img",{attrs:{src:a(440),width:"600"}}),t._v(" "),e("br"),t._v(" "),e("div",{staticClass:"language-http extra-class"},[e("pre",{pre:!0,attrs:{class:"language-http"}},[e("code",[e("span",{pre:!0,attrs:{class:"token response-status"}},[e("span",{pre:!0,attrs:{class:"token http-version property"}},[t._v("HTTP/1.1")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token status-code number"}},[t._v("206")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token reason-phrase string"}},[t._v("OK")])]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Content-Type")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("text/plain")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Transfer-Encoding")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("chunked")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Connnection")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("keep-alive")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token text-plain"}},[t._v("\n13\nchunkedData 1\n13\nchunkedData 2\n13\nchunkedData 3\n")])])])]),e("blockquote",[e("p",[t._v("注意：浏览器在收到分块传输的数据后会自动按照规则去掉分块编码，重新组装出内容。")])]),t._v(" "),e("h3",{attrs:{id:"范围请求"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#范围请求"}},[t._v("#")]),t._v(" 范围请求")]),t._v(" "),e("h4",{attrs:{id:"单段数据"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#单段数据"}},[t._v("#")]),t._v(" 单段数据")]),t._v(" "),e("p",[t._v("HTTP 的“范围请求”（range requests），允许客户端在请求头里使用专用字段来表示只获取文件的一部分。")]),t._v(" "),e("p",[t._v("范围请求不是 Web 服务器必备的功能，服务器必须在响应头里使用字段“Accept-Ranges: bytes”明确支持。反之服务器可以标记字段“Accept-Ranges: none”或者不标记“Accept-Ranges”字段，这样客户端会认为服务器不支持范围请求。")]),t._v(" "),e("br"),t._v(" "),e("p",[t._v("请求头的 Range 字段用以标记范围请求需求，格式是“bytes=x-y”，其中的 x 和 y 是以字节为单位的数据范围。")]),t._v(" "),e("div",{staticClass:"language-http extra-class"},[e("pre",{pre:!0,attrs:{class:"language-http"}},[e("code",[e("span",{pre:!0,attrs:{class:"token request-line"}},[e("span",{pre:!0,attrs:{class:"token method property"}},[t._v("GET")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token request-target url"}},[t._v("/")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token http-version property"}},[t._v("HTTP/1.1")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Host")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("www.chrono.com")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Range")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("bytes=0-1023")])]),t._v("\n")])])]),e("p",[t._v("服务器收到 Range 字段后：")]),t._v(" "),e("ul",[e("li",[t._v("首先会检查范围是否合法，比如范围越界时，服务器会返回状态码 416，表示“你的范围请求有误，无法处理”；")]),t._v(" "),e("li",[t._v("服务器会根据 Range 头计算偏移量，读取文件的片段了，返回状态码“206 Partial Content”，表示成功，且 body 只是原数据的一部分；")]),t._v(" "),e("li",[t._v("服务器要添加一个响应头字段 Content-Range，标记片段的实际偏移量和资源的总大小，格式是“bytes x-y/length”，与 Range 头区别在没有“=”，范围后多了总长度；")])]),t._v(" "),e("div",{staticClass:"language-http extra-class"},[e("pre",{pre:!0,attrs:{class:"language-http"}},[e("code",[e("span",{pre:!0,attrs:{class:"token response-status"}},[e("span",{pre:!0,attrs:{class:"token http-version property"}},[t._v("HTTP/1.1")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token status-code number"}},[t._v("206")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token reason-phrase string"}},[t._v("partial Content")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Content-Length")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("1024")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Accept-Ranges")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("bytes")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Content-Range")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("bytes 0-1023/2048")])]),t._v("\n\n...\n")])])]),e("br"),t._v(" "),e("p",[t._v("视频的拖拽进度需要范围请求，常用的下载工具里的多段下载、断点续传也是基于它实现的：")]),t._v(" "),e("ul",[e("li",[t._v("首先发个 HEAD，看服务器是否支持范围请求，同时获取文件的大小；")]),t._v(" "),e("li",[t._v("开 N 个线程，每个线程使用 Range 字段划分出各自负责下载的片段，发请求传输数据；")]),t._v(" "),e("li",[t._v("下载意外中断时根据上次的下载记录，用 Range 请求剩下的那一部分。")])]),t._v(" "),e("h4",{attrs:{id:"多段数据"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#多段数据"}},[t._v("#")]),t._v(" 多段数据")]),t._v(" "),e("p",[t._v("HTTP 还支持在 Range 头里使用多个“x-y”，一次性获取多个片段数据。")]),t._v(" "),e("p",[t._v("这种情况需要使用一种特殊的 MIME 类型：“multipart/byteranges”，表示报文的 body 是由多段字节序列组成的，并且还要用一个参数“boundary=xxx”给出段之间的分隔标记。")]),t._v(" "),e("p",[t._v("多段数据的格式与分块传输也比较类似，但它需要用分隔标记 boundary 来区分不同的片段。")]),t._v(" "),e("img",{attrs:{src:a(441),width:"600"}}),t._v(" "),e("div",{staticClass:"language-http extra-class"},[e("pre",{pre:!0,attrs:{class:"language-http"}},[e("code",[e("span",{pre:!0,attrs:{class:"token request-line"}},[e("span",{pre:!0,attrs:{class:"token method property"}},[t._v("GET")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token request-target url"}},[t._v("/16-2")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token http-version property"}},[t._v("HTTP/1.1")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Host")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("www.chrono.com")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Range")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("bytes=0-9, 20-29")])]),t._v("\n")])])]),e("div",{staticClass:"language-http extra-class"},[e("pre",{pre:!0,attrs:{class:"language-http"}},[e("code",[e("span",{pre:!0,attrs:{class:"token response-status"}},[e("span",{pre:!0,attrs:{class:"token http-version property"}},[t._v("HTTP/1.1")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token status-code number"}},[t._v("206")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token reason-phrase string"}},[t._v("Partial Content")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Content-Type")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("multipart/byteranges; boundary=00000000001")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Connection")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("keep-alive")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Accept-Ranges")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("bytes")])]),t._v("\n\n--00000000001\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Content-Type")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("text/plain")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token header"}},[e("span",{pre:!0,attrs:{class:"token header-name keyword"}},[t._v("Content-Range")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token header-value"}},[t._v("bytes 0-9/96")])]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token text-plain"}},[t._v("\n// this is\n--00000000001\nContent-Type: text/plain\nContent-Range: bytes 20-29/96\n\next json d\n--00000000001--\n")])])])])])}),[],!1,null,null,null);e.default=n.exports}}]);