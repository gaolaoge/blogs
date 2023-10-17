---
title: 缓存
mode: "notes"
---

缓存（Cache）是计算机领域里的一个重要概念，是优化系统性能的重要方式。

网络链路漫长，时延不可控，浏览器使用 HTTP 获取资源的成本较高。把“数据缓存起来尽可能地复用。可以避免重复的通信成本，节约网络带宽，也可以加快响应速度。

HTTP 传输的每一个环节基本上都会有缓存，非常复杂。

流程：

- 流览器发起请求，
- 浏览器查找缓存无数据，于是发送请求，向服务器获取资源；
- 服务器响应请求，返回资源，同时标记资源的有效期；
- 浏览器缓存资源，等待下次重用。

### 服务器的缓存控制

服务器标记资源有效期使用的头字段是“Cache-Control”，里面的值“max-age=30”就是资源的有效时间。

> 这里的 max-age 的计算起点是响应报文的创建时刻（即 Date 字段，也就是离开服务器的时刻），包含了在链路传输过程中所有节点所停留的时间。

```http
HTTP/1.1 200 OK

Date: Mon, 23 May 2012 02:07:58 GMT
Cache-Control: max-age=30
```

no-store：不允许缓存，用于某些变化非常频繁的数据，例如秒杀页面。

```http
HTTP/1.1 200 OK

Date: Mon, 23 May 2012 02:07:58 GMT
Cache-Control: no-store
```

no-cache：意思是可以缓存，使用之前要去服务器验证是否过期，是否有最新的版本；

```http
HTTP/1.1 200 OK

Date: Mon, 23 May 2012 02:07:58 GMT
Cache-Control: no-cahce
```

must-revalidate：如果缓存不过期就可以继续使用，但过期了如果还想用就必须去服务器验证。

```http
HTTP/1.1 200 OK

Date: Mon, 23 May 2012 02:07:58 GMT
Cache-Control: max-age=30, must-revalidate 
```

### 客户端的缓存控制

浏览器也可以发“Cache-Control”，也就是说请求 - 应答的双方都可以用这个字段进行缓存控制，互相协商缓存的使用策略。

用户点击“刷新”按钮的时候，浏览器会在请求头里加一个“Cache-Control: max-age=0”。此时本地缓存里的数据至少保存了几秒钟，所以浏览器就不会使用缓存，而是向服务器发请求。服务器看到 max-age=0，也就会用一个最新生成的报文回应浏览器。

Ctrl+F5 的“强制刷新”其实是发了一个“Cache-Control: no-cache”，含义和“max-age=0”基本一样，就看后台的服务器怎么理解，通常两者的效果是相同的。

浏览器的“前进”“后退”或者重定向时不会夹带 ”Cache-Control“信息，缓存通常在此时生效，直接读取使用磁盘上的缓存。

### 条件请求

浏览器中的刷新页面动作默认会强制跨过缓存强制更新数据，对有效缓存的利用是有限的。

为了更好的利用缓存资源，浏览器支持用两个连续的请求组成“验证动作”：先是一个 HEAD，获取资源的修改时间等元信息，然后与缓存数据比较，如果没有改动就使用缓存，节省网络流量，否则就再发一个 GET 请求，获取最新的版本。

#### 条件请求字段

但两个请求的网络成本还是较高，所以 HTTP 协议就定义了一系列“If”开头的“条件请求”字段，专门用来检查验证资源是否过期，把两个请求才能完成的工作合并在一个请求里，验证的责任交给服务器。

条件请求字段最常用的是“If-Modified-Since”和“If-None-Match”这两个。  
需要第一次的响应报文预先提供“Last-modified”和“ETag”，然后第二次请求时就可以带上缓存里的原值，验证资源是否是最新的。

如果资源没有变，服务器就回应一个“304 Not Modified”，表示缓存依然有效，浏览器更新一下有效期然后使用缓存。

```http
GET / HTTP/1.1
Host: www.example.com
```

```http
HTTP/1.1 200 OK
Date: Mon, 23 May 2012 02:07:58 GMT
Cache-Control: max-age=30
Last-Modified: Mon, 23 May 2012 02:07:58 GMT
ETag: "5cc168c7-3e"
```

```http
GET / HTTP/1.1
Host: www.example.com
If-Modified-Since: Mon, 23 May 2012 02:07:58 GMT
If-None-Match: "5cc168c7-3e"
```

```http
HTTP/1.1 304 Not Modified
Date: Mon, 23 May 2012 02:08:00 GMT
Cache-Control: max-age=30
Last-Modified: Mon, 23 May 2012 02:07:58 GMT
ETag: "5cc168c7-3e"
```

这里“If-Modified-Since”和“If-None-Match”的精度是秒级，这在计算机中是远远不够的，所以并不能精准判定文件的有效性。

再比如，一个文件定期更新，有时实际内容并没有变化，此时单纯按照最后更新时间来判定缓存有效明显是不符合预期的。

ETag 是“实体标签”（Entity Tag）的缩写，是资源的一个唯一标识，类似于一个文件内容的指纹，只在内容改变时 ETag 才会变。

ETag 还有“强”“弱”之分。

强 ETag 要求资源在字节级别必须完全相符，弱 ETag 在值前有个“W/”标记，只要求资源在语义上没有变化，但内部可能会有部分发生了改变（例如 HTML 里的标签顺序调整，或者多了几个空格）。