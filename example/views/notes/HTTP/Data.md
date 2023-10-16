---
title: 实体数据
mode: "notes"
---

在 TCP/IP 协议栈里，传输数据基本上都是 **header+body** 的格式。  
TCP、UDP 是传输层的协议，它们不会关心 body 数据是什么，只要把数据发送到对方就好。  
而 HTTP 协议是应用层的协议，数据到达之后工作只能说是完成了一半，还必须要标记给对方层应用如何正确读取这个数据。

> HTTP 协议定义了若干 Accept 请求头字段和两个 Content 实体头字段，用于客户端和服务器进行“内容协商”。  
客户端用 Accept 头告诉服务器希望接收什么样的数据，服务器用 Content 头告诉客户端实际发送了什么样的数据。

## 协商字段

### MIME type

> 多用途互联网邮件扩展（Multipurpose Internet Mail Extensions），简称为 MIME。它在电子邮件系统中，使其可以发送 ASCII 码以外的任意数据。  
MIME 把数据分成若干大类，大类之下再细分出若干子类，形式是“type/subtype”的字符串。  
MIME 是一个很大的标准规范，HTTP 只借鉴了其中的一部分，用来标记 body 的数据类型，这就是“MIME type”。  

HTTP 中几个常见类别：

- **text**：即文本格式的可读数据，如 text/html 表示超文本文档，纯文本 text/plain、样式表 text/css 等。
- **image**：即图像文件，有 image/gif、image/jpeg、image/png 等。
- **audio/video**：音频和视频数据，例如 audio/mpeg、video/mp4 等。
- **application**：数据格式不固定，可能是文本也可能是二进制，必须由上层应用程序来解释。常见的有 application/json，application/javascript、application/pdf 等，application/octet-stream，即不透明的二进制数据。

Accept 字段是客户端标记的可选 **MIME type**，可用“,”做分隔符列出多个类型以供选择，  
相应的，服务器会在响应报文里用头字段 Content-Type 告诉实体数据的真实类型。  

```http
GET / HTTP/1.1
Host: www.example.com
Accept: text/html,application/xml
```

```http
HTTP/1.1 200 OK
Content-Type: text/html

...
```

### Encoding type

HTTP 在传输时为了节约带宽，有时候还会压缩数据，为了方便对方正确解压缩数据，还需要有一个“Encoding type”标记压缩方式。

Encoding type 常用只有下面三种：

- `gzip`：GNU zip 压缩格式，也是互联网上最流行的压缩格式；
- `deflate`：zlib（deflate）压缩格式；
- `br`：一种专门为 HTTP 优化的新压缩算法（Brotli）。

Accept-Encoding 字段标记的是客户端支持的压缩格式，  
Content-Encoding 字段表示服务器端实际选择的压缩方式。

> 两个字段是可以省略的，如果请求报文里没有 Accept-Encoding 字段，就表示客户端不支持压缩数据；  
如果响应报文里没有 Content-Encoding 字段，就表示响应数据没有被压缩。

```http
GET / HTTP/1.1
Host: www.example.com
Accept: text/html,application/xml
Accept-Encoding: gzip,deflate
```

```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Encoding: gzip
...
```

### Launguages

“语言类型”用以解决资源全球化的需求。

“语言类型”就是人类使用的自然语言，例如英语、汉语、日语等，而这些自然语言可能还有下属的地区性方言，所以在需要明确区分的时候也要使用“type-subtype”的形式。

举几个例子：en 表示任意的英语，en-US 表示美式英语，en-GB 表示英式英语，而 zh-CN 就表示最常使用的汉语。

```http
GET / HTTP/1.1
Host: www.example.com
Accept: text/html,application/xml
Accept-Encoding: gzip,deflate
Accepet-Language: en-US,en
```

```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Encoding: gzip
Content-Language: en-US
...
```

### Charsets 

关于自然语言的计算机处理还有一个条件，叫“字符集”。

计算机发展的早期，各个国家和地区有各自的字符编码方式来处理文字，比如英语世界用的 ASCII、汉语世界用的 GBK、BIG5，日语世界用的 Shift_JIS 等。后来就出现了遵循 UTF-8 字符编码方式的 Unicode 字符集，成为了互联网上的通用标准字符集。

字符集在 HTTP 里使用的请求头字段是 Accept-Charset，响应头中在 Content-Type 字段的数据类型后面用“charset=xxx”来表示。

```http
GET / HTTP/1.1
Host: www.example.com
Accept: text/html,application/xml
Accept-Encoding: gzip,deflate
Accepet-Language: en-US,en
Accepet-Charset: utf-8, gbk
```

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Language: en-US
...
```

### Content-Length
Content-Length 字段表示实体数据的长度，单位是字节。

<br>

## 协商内容

在 HTTP 协议里用 Accept、Accept-Encoding、Accept-Language 等请求头字段进行内容协商的时候，还可以用一种特殊的“q”参数表示权重来设定优先级，这里的“q”是“quality factor”的意思。

权重的最大值是 1，最小值是 0.01，默认值是 1，如果值是 0 就表示拒绝。具体的形式是在数据类型或语言代码后面加一个“;”，然后是“q=value”。

```http
Accept: text/html,application/xml;q=0.9,*/*;q=0.8
```

协商的过程是不透明的，的时候服务器会在响应头里多加一个 Vary 字段，记录服务器在内容协商时参考的请求头字段，给出一点信息。

```http
Vary: Accept-Encoding,User-Agent,Accept
```