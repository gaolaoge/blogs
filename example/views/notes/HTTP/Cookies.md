---
title: Cookies
mode: "notes"
---

HTTP 是“无状态”的，Cookie 技术，给 HTTP 增加了“记忆能力”。

> Cookie 是由浏览器负责存储的，与浏览器绑定，只能在当前浏览器内生效。

### 工作过程

用户通过浏览器第一次访问服务器的时候，服务器不知道他的身份的。所以创建一个独特的身份标识数据，格式是“key=value”，然后放进 Set-Cookie 字段里，随着响应报文一同发给浏览器。

浏览器收到响应报文，看到里面有 Set-Cookie，知道这是服务器给的身份标识，于是就保存起来，下次再请求的时候就自动把这个值放进 Cookie 字段里发给服务器。

第二次请求里面存在 Cookie 字段，服务器就识别出用户的身份，然后提供个性化的服务。

服务器有时会在响应头里添加多个 Set-Cookie，存储多个“key=value”。但浏览器这边发送时不需要用多个 Cookie 字段，只要在一行里用“;”隔开就行。

### 配置属性

#### 生命周期

Cookie 值可以配置有效期，一旦超过这个期限浏览器就视其失效，如果不配置表示永久有效。

可以使用 Expires 和 Max-Age 两个属性来设置。

“Expires”俗称“过期时间”，用的是绝对时间点，可以理解为“截止日期”（deadline）。  
“Max-Age”用的是相对时间，单位是秒，浏览器用收到报文的时间点再加上 Max-Age，就可以得到失效的绝对时间。

Expires 和 Max-Age 可以同时出现时 Max-Age 权重更高。

#### 作用域

Cookie 可以为其设置作用域，让浏览器仅发送给特定的服务器和 URI，避免被盗用。

“Domain”和“Path”指定了 Cookie 所属的域名和路径，浏览器在发送 Cookie 前会从 URI 中提取出 host 和 path 部分，与其进行对比查看是否匹配。

#### 安全性

JS 脚本里可以用 document.cookie 来读写 Cookie 数据，这可能会导致“跨站脚本”（XSS）攻击窃取数据。

属性“HttpOnly”会告诉浏览器当前 Cookie 只能通过浏览器 HTTP 协议传输，禁止其他方式访问，浏览器的 JS 引擎就会禁用 document.cookie 等一切相关的 API 。

属性“SameSite”可以防范“跨站请求伪造”（XSRF）攻击，

“SameSite=Strict”可以严格限定 Cookie 不能随着跳转链接跨站发送，

“SameSite=Lax”则略宽松一点，允许 GET/HEAD 等安全方法，但禁止 POST 跨站发送。

“SameSite=Secure”，表示这个 Cookie 仅能用 HTTPS 协议加密传输，明文的 HTTP 协议会禁止发送。但 Cookie 本身不是加密的，浏览器里还是以明文的形式存在。