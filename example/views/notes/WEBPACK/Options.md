---
title: "配置项"
mode: "notes"
---

> Webpack 原生配置项很多，且各项之间缺乏一致性与关联度，很难理解配置之间的协作关系。
>
> 这里尝试以结构化视角归类各个核心配置项的功能与作用。

## 结构化理解 Webpack 配置项

Webpack 的打包过程大致上可分为以下步骤：

<center><img src="./images/flow.png" width=600 /></center>

- **输入**：从文件系统读入代码文件；
- **模块递归处理**：调用 Loader 转译 Module 内容，并讲解过转译为 AST，从中分析出模块依赖关系，进一步递归调用模块处理过程，直到所有依赖文件都处理完毕；
- **后处理**：模块合并、注入运行时、产物优化等，最终输出 Chunk 集合；
- **输出**：将 Chunk 写出到外部文件系统；

Webpack 的配置项大体可以分为：

- **流程类**：作用于打包流程某个或若干个环节，直接影响编译打包效果的配置项；
- **工具类**：打包主流程之外，提供更多工程化工具的配置项；

### 流程类配置项

> Webpack 首先需要根据输入配置(entry/context) 找到项目入口文件；之后根据按模块处理(module/resolve/externals 等) 所配置的规则逐一处理模块文件，处理过程包括转译、依赖分析等；模块处理完毕后，最后再根据后处理相关配置项(optimization/target 等)合并模块资源、注入运行时依赖、优化产物结构等。

#### 输入输出

1. `entry` 用于定义项目入口文件，Webpack 会从这些入口文件开始按图索骥找出所有项目文件。
2. `context` 项目执行上下文路径。默认使用 Node.js 进程的当前工作目录，但是推荐在配置中传入一个值。这使得你的配置独立于 CWD(current working directory, 当前工作目录)。
3. `output` 配置产物输出路径、名称等；

```js
// webpack.config.js
// 默认情况下，入口 chunk 的输出文件名是从 output.filename 中提取出来的，
// 可以为特定的入口指定一个自定义的输出文件名。
module.exports = {
  entry: {
    app: {
      dependOn: "react-vendors", // 默认情况下，每个入口 chunk 保存了全部其用的模块(modules)。使用 dependOn 选项你可以与另一个入口 chunk 共享模块。app 这个 chunk 就不会包含 react-vendors 拥有的模块了。
      filename: "name", // 默认情况下，入口 chunk 的输出文件名是从 output.filename 中提取出来的，可以为特定的入口指定一个自定义的输出文件名。
      import: ["react", "react-dom"], // 启动时需加载的模块。
      runtime: "", // 运行时 chunk 的名字。如果设置了，就会创建一个新的运行时 chunk。在 webpack 5.43.0 之后可将其设为 false 以避免一个新的运行时 chunk。
    },
    "react-vendors": ["react", "react-dom", "prop-types"],
  },
  context: path.resolve(__dirname, "app"),
  output: {
    filename: "[name].js", // 如果配置中创建出多于一个 "chunk" 则应该使用 占位符 来确保每个文件具有唯一的名称。
    path: __dirname + "/dist",
  },
};
```

#### 模块处理

1. `resolve` 用于配置模块路径解析规则，可用于帮助 Webpack 更精确、高效地找到指定模块。
2. `module` 用于配置模块加载规则，例如针对什么类型的资源需要使用哪些 Loader 进行处理。
3. `externals` 用于声明外部资源，Webpack 会直接忽略这部分资源，跳过这些资源的解析、打包操作。

```js
// webpack.config.js
module.exports = {
  resolve: {
    extensions: [".ts", ".js"], // 尝试按顺序解析这些后缀名。
    alias: {
      "@": path.resolve("src"), // 配置别名
    },
  },
  module: {
    rules: [],
  },
  externals: {
    "es-lodash": "es-lodash",
  },
};
```

#### 后处理

1. `optimization` 用于控制如何优化产物包体积，内置 Dead Code Elimination、Scope Hoisting、代码混淆、代码压缩等功能。
2. `target` 用于配置编译产物的目标运行环境，支持 web、node、electron 等值，不同值最终产物会有所差异。
3. `mode` 编译模式短语，支持 development、production 等值，可以理解为一种声明环境的短语。

```js
// webpack.config.js
module.exports = {
  arget: "node",
  mode: "production",
  optimization:: {}
};
```

### 工具类配置项

一系列用于提升研发效率的工具，如：

- 开发效率类：
  - watch：用于配置持续监听文件变化，持续构建
  - devtool：用于配置产物 Sourcemap 生成规则
  - devServer：用于配置与 HMR 强相关的开发服务器功能

```js
// webpack.config.js
module.exports = {
  devtool: "eval",
  watch: true,
  devServer: {
    port: 9000,
  },
};
```

- 性能优化类：
  - cache：Webpack 5 之后，该项用于控制如何缓存编译过程信息与编译结果
  - performance：用于配置当产物大小超过阈值时，如何通知开发者

```js
// webpack.config.js
module.exports = {
  cache: { type: "memory" },
  performance: {
    hints: "warning", // 将展示一条警告，通知这是体积大的资源。在开发环境推荐
  },
};
```

- 日志类：
  - stats：用于精确地控制编译过程的日志内容，在做比较细致的性能调试时非常有用
  - infrastructureLogging：用于控制日志输出方式，例如可以通过该配置将日志输出到磁盘文件

```js
// webpack.config.js
module.exports = {
  stats: "errors-only",
  infrastructureLogging: {
    appendOnly: true,
  },
};
```

每一个工具类配置都在主流程之外提供额外的工程化能力，例如 devtool 用于配置产物 Sourcemap 生成规则，与 Sourcemap 强相关；devServer 用于配置与 HMR 相关的开发服务器功能；watch 用于实现持续监听、构建。

工具类配置内聚性较强，通常一个配置项专注于解决一类工程问题。
