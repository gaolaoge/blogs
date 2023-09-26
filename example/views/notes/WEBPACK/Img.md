---
title: "图像加载原理&最佳实践"
mode: "notes"
---

图像在 web 项目中几乎是必备资源类型，且针对图像资源的优化也是项目的必备需求。

### 图像支持

早期 Webpack 并不原生支持处理图像资源，需要安装 Loader 处理转译：

1. file-loader：将图像引用转换为 url 语句并生成对应的图片文件，经过处理后文件会被按规则重命名；
2. url-loader：相似，对于小于阈值 limit 的图像直接转换为 base64 编码内嵌到 bundle 中，反之调用 file-loader ；
3. raw-loader：不做任何转译，直接将文件内容复制到 bundle ；

> 提示：除 raw-loader 外，我们还可以使用如下 Loader 加载 SVG 资源：
>
> 1. svg-inline-loader：能够自动删除 SVG 图片中与显式无关的各种原信息，达到压缩效果；
> 2. svg-url-loader：以 DataURL 方式导入 SVG 图片，相比于 Base64 更节省空间；
> 3. react-svg-loader：导入 SVG 图片并自动转化为 React 组件形态，效果类似 @svgr/webpack；
> 4. vue-svg-loader：导入 SVG 图片并自动转化为 Vue 组件形态。

<br>

上述 Loader 并不局限于处理图像，使用频率极高，所以 Webpack5 内置了这些能力，

通过 `module.rule.type` 指定资源类型即可：

- file-loader 对标到 `type = "asset/resource"`

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",
        generator: {
          filename: "static/image/[hash:10][ext][query]", // 设定输出目录和资源命名规则
        },
      },
    ],
  },
};
```

- url-loader 对标到 `type = "asset`" 或 `type = "asset/inline"`

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 1024, // 阈值，对标 url-loader 的 limit
          },
        },
      },
    ],
  },
};
```

- raw-loader 对标到 `type = "asset/source"`

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/i,
        type: "asset/source",
      },
    ],
  },
};
```

<br>

<small>
<font color=#999>
引入 module.rules.type 并不只是为了取代 Loader 那么简单，
更重要的目的是在 JavaScript Module 之外增加对其它资源的原生支持，
让 Webpack 有机会介入这些多媒体资源的解析、生成过程，从而有机会实现更标准、高效的资源处理模型。
</font>
</small>

目前 module.rules.type 已经支持 JSON、WebAssemsbly、二进制、文本等资源类型。

### 图像压缩

Web 页面中针对图片做各种优化动作很多：

1. 图像压缩：减少网络上需要传输的流量；
2. 雪碧图：减少 HTTP 请求次数；
3. 响应式图片：根据客户端设备情况下发适当分辨率的图片，有助于减少网络流量；
4. CDN：减少客户端到服务器之间的物理链路长度，提升传输效率
5. ...

有些动作可以在构建阶段借助 Webpack 搭建自动优化工作流时完成，例如：图像压缩。

（图像压缩是一种非常耗时的操作，建议只在生产环境下开启。）

```yml
# 类似功能的 Loader 有很多
npm i image-webpack-loader -D
```
