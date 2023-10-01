---
title: "配置项"
mode: "notes"
---

> Webpack 原生配置项很多，且各项之间缺乏一致性与关联度，很难理解配置之间的协作关系。  
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

> Webpack 首先需要根据输入配置(entry/context) 找到项目入口文件；  
> 之后根据按模块处理(module/resolve/externals 等) 所配置的规则逐一处理模块文件，处理过程包括转译、依赖分析等；  
> 模块处理完毕后，最后再根据后处理相关配置项(optimization/target 等)合并模块资源、注入运行时依赖、优化产物结构等。

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
      import: "./src/index.js", // 启动时需加载的模块。
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

每一个工具类配置都在主流程之外提供额外的工程化能力，例如 devtool 用于配置产物 Sourcemap 生成规则，与 Sourcemap 强相关；  
devServer 用于配置与 HMR 相关的开发服务器功能；watch 用于实现持续监听、构建。

工具类配置内聚性较强，通常一个配置项专注于解决一类工程问题。

## 核心配置

### 配置结构

```js
// 大多数配置内容都以单文件导出单个配置对象的方式实现
module.exports = {
  entry: './src/index.js',
};
```

Webpack 还支持以数组、函数方式配置运行参数，以适配不同场景应用需求，它们之间大致上区别：

1. **单个配置对象**：比较常用的一种方式，逻辑简单，适合大多数业务项目；
2. **配置对象数组**：每个数组项都是一个完整的配置对象，每个对象都会触发一次单独的构建；
3. **函数**：Webpack 启动时会执行该函数获取配置，我们可以在函数中根据环境参数(如 NODE_ENV)动态调整配置对象。

#### 使用配置数组

```js
// webpack.config.js
module.exports = [{
  entry: './src/index.js',
  // 其它配置...
}, {
  entry: './src/index.js',
  // 其它配置...
}];
```

Webpack 会在启动后创建多个 Compilation 实例，并行执行构建工作，  
此时 Compilation 实例间基本上不作通讯，这意味着这种并行构建对运行性能并没有任何正向收益，  
例如某个 Module 在 Compilation 实例 A 中完成解析、构建后，在其它 Compilation 中依然需要完整经历构建流程，无法直接复用结果。

数组方式主要用于应对“**同一份代码打包出多种产物**”的场景，例如在构建 Library 时，我们通常需要同时构建出 ESM/CMD/UMD 等模块方案的产物：

```js
// webpack.config.js
module.exports = [
  {
    output: {
      filename: './dist-amd.js',
      libraryTarget: 'amd',
    },
    name: 'amd',
    entry: './app.js',
    mode: 'production',
  },
  {
    output: {
      filename: './dist-commonjs.js',
      libraryTarget: 'commonjs',
    },
    name: 'commonjs',
    entry: './app.js',
    mode: 'production',
  },
];
```

> 提示：使用配置数组时，还可以通过 --config-name 参数指定需要构建的配置对象，  
> 例如上例配置中若执行 npx webpack --config-name='amd'，则仅使用数组中 name='amd' 的项做构建。

若是“**多份代码打包多份产物**”的场景，则建议使用 entry 配置多个应用入口。

#### 使用配置函数

配置函数方式要求在配置文件中导出一个函数，并在函数中返回 Webpack 配置对象，或配置数组，或 Promise 对象，如：

```js
module.exports = function(env, argv) {
  // ...
  return {
    entry: './src/index.js',
    // 其它配置...
  }
}
```

运行时，Webpack 会传入两个环境参数对象：

- env：通过 --env 传递的命令行参数，适用于自定义参数，例如：

| 命令： |	env 参数值： |
| - | - |
| `npx webpack --env prod`	| { prod: true } |
| `npx webpack --env prod --env min`	| { prod: true, min: true } |
| `npx webpack --env platform=app --env production`	| { platform: "app", production: true } |
| `npx webpack --env foo=bar=app`	| { foo: "bar=app"} |
| `npx webpack --env app.platform="staging" --env app.name="test"`	| { app: { platform: "staging", name: "test" }} |

- argv：命令行 Flags 参数，支持 entry/output-path/mode/merge 等。

```js
// npx webpack --env app.type=miniapp --mode=production
module.exports = function (env, argv) {
  return {
    mode: argv.mode ? "production" : "development",
    devtool: argv.mode ? "source-map" : "eval",
    output: {
      path: path.join(__dirname, `./dist/${env.app.type}`,
      filename: '[name].js'
    },
    plugins: [
      new TerserPlugin({
        terserOptions: {
          compress: argv.mode === "production", 
        },
      }),
    ],
  };
};
```

但这种方式并不常用，  
一是因为需要在配置函数内做许多逻辑判断，复杂场景下可能可读性会很低，维护成本高；  
二是强依赖于命令行参数，可能最终需要写出一串很长的运行命令，应用体验较差。  
目前社区比较流行通过不同配置文件区分不同环境的运行配置，配合 --config 参数实现环境治理。  

### 环境治理策略

工程化实践中，通常一个应用项目需要同时具备多份配置项，根据部署环境需求，对同一份代码执行各有侧重的打包策略，例如：

- 开发环境需要使用 webpack-dev-server 实现 Hot Module Replacement；
- 测试环境需要带上完整的 Soucemap 内容，以帮助更好地定位问题；
- 生产环境需要尽可能打包出更快、更小、更好的应用代码，确保用户体验。

Webpack 中有许多实现环境治理的方案，比如使用“配置函数”配合命令行参数动态计算配置对象。  
除此之外，业界比较流行将不同环境配置分别维护在单独的配置文件中，如：

```arduino
.
└── config
  ├── webpack.common.js
  ├── webpack.development.js
  ├── webpack.testing.js
  └── webpack.production.js
```

之后配合 --config 选项指定配置目标，如：

```yml
npx webpack --config webpack.development.js
```

这种模式下通常会将部分通用配置放在基础文件中，  
如 webpack.common.js，之后在其它文件中引入该模块并使用 webpack-merge 合并配置对象。

> webpack-merge 是一个专为 Webpack 设计的数据合并的工具，  
> 功能逻辑与 Lodash 的 merge 函数、 Object.assign 等相似，且支持更多特性：

```js
merge({ arr: [1] }, { arr: [2] }) === { arr: [1, 2] }
```

```js
const res = merge(
  { func: () => console.log(1) },
  { func: () => console.log(2) }
);
res.func();
// => 1,2 
```

<br>

例：

```js
// 首先将通用配置放在公共文件中
// webpack.common.js
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [new HTMLWebpackPlugin()],
};
```

```js
// 创建对应环境配置文件
// webpack.development.js
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.common");

// 使用 webpack-merge 合并配置对象
module.exports = merge(baseConfig, {
  mode: "development",
  devtool: "source-map",
  devServer: { hot: true },
});
```

```yml
# 执行构建命令并通过 --config 参数传入配置文件路径
npx webpack --config=webpack.development.js
```

### entry 配置

entry 配置项明确声明项目入口，其配置规则比较复杂，支持如下形态：

- **字符串**：指定入口文件路径；
- **对象**：对象形态功能比较完备，除了可以指定入口文件列表外，还可以指定入口依赖、Runtime 打包方式等；
- **函数**：动态生成 Entry 配置信息，函数中可返回字符串、对象或数组；
- **数组**：指明多个入口文件，数组项可以为上述介绍的文件路径字符串、对象、函数形式，Webpack 会将数组指明的入口全部打包成一个 Bundle。

例：

```js
// webpack.config.js
module.exports = {
  entry: {
    home: './home.js',
    shared: ['react', 'react-dom', 'redux', 'react-redux'],
    personal: {
      import: './personal.js',
      filename: 'pages/personal.js',
      dependOn: 'shared',
      chunkLoading: 'jsonp',
      asyncChunks: true
    },
    admin: function() {
      return './admin.js';
    }
  },
};
```

属性：

1. **import**：声明入口文件，支持路径字符串或路径数组(多入口)；
2. **dependOn**：声明该入口的前置依赖 Bundle；
3. **runtime**：设置该入口的 Runtime Chunk，若该属性不为空，Webpack 会将该入口的运行时代码抽离成单独的 Bundle；
4. **filename**：效果与 output.filename 类同，用于声明该模块构建产物路径；
5. **library**：声明该入口的 output.library 配置，一般在构建 NPM Library 时使用；
6. **publicPath**：效果与 output.publicPath 相同，用于声明该入口文件的发布 URL；
7. **chunkLoading**：效果与 output.chunkLoading 相同，用于声明异步模块加载的技术方案，支持 false/jsonp/require/import 等值；
8. **asyncChunks**：效果与 output.asyncChunks 相同，用于声明是否支持异步模块加载，默认值为 true。

#### `entry.dependOn`

dependOn 属性用于声明前置 Bundle 依赖，从效果上看能够减少重复代码，优化构建产物质量。

```js
// webpack.config.js
module.exports = {
  entry: {
    "react-vendors": ["react", "react-dom", "prop-types"],
    "main": { import: "./src/main.js", dependOn: "react-vendors" },
  },
};
```

#### `entry.runtime`

为支持产物代码在各种环境中正常运行，Webpack 会在产物文件中注入一系列运行时代码，用以支撑起整个应用框架。运行时代码的多寡取决于我们用到多少特性，例如：

- 需要导入导出文件时，将注入 __webpack_require__.r 等；
- 使用异步加载时，将注入 __webpack_require__.l 等；
- 等等。

运行时代码量在极端情况下甚至有可能超过业务代码总量，必要时可以尝试使用 runtime 配置将运行时抽离为独立 Bundle，例如：

```js
const path = require("path");

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    main: { import: "./src/index.js", runtime: "common-runtime" },
    foo: { import: "./src/foo.js", runtime: "common-runtime" },
  },
  output: {
    clean: true,
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

```yml
npx webpack
# 示例中，main 与 foo 入口均将 runtime 声明为 common-runtime，此时 Webpack 会将这两个入口的运行时代码都抽取出来，放在 common-runtime Bundle 中。
```

entry.runtime 是一种常用的应用性能优化手段。

### output 配置

Webpack 的 output 配置项用于声明：如何输出构建结果，比如产物放在什么地方、文件名是什么、文件编码等。

- **output.path**：声明产物放在什么文件目录下；
- **output.filename**：声明产物文件名规则，支持 `[name]/[hash]` 等占位符；
- **output.publicPath**：文件发布路径，在 Web 应用中使用率较高；
- **output.clean**：是否自动清除 path 目录下的内容，调试时特别好用；
- **output.library**：NPM Library 形态下的一些产物特性，例如：Library 名称、模块化(UMD/CMD 等)规范；
- **output.chunkLoading**：声明加载异步模块的技术方案，支持 false/jsonp/require 等方式。
- 等等。

### mode 配置

Webpack 内置 了许多构建优化策略，我们可以通过 mode 配置项切换默认优化规则，支持如下值：

1. **production**：默认值，生产模式，使用该值时自动开启一系列优化措施：Three-Shaking、Terser 压缩代码、SplitChunk 提起公共代码，通常用于生产环境构建；
2. **development**：开发模式，使用该值时保留更语义化的 Module 与 Chunk 名称，更有助于调试，通常用于开发环境构建；
3. **none**：关闭所有内置优化规则。