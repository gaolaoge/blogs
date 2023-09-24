---
title: "接入 Babel + TS + ESLint"
mode: "notes"
---

### 使用 Babel

ES6 补充了大量新特性，但浏览器、Node 等 JS 引擎都或多或少存在兼容性问题。为此，现代 Web 开发流程中通常会引入 Babel 等转译工具。

Babel 是一个开源 JavaScript 转编译器。

```js
// 使用 Babel 转译前
arr.map((item) => item + 1);

// 转译后
arr.map(function (item) {
  return item + 1;
});
```

Webpack 场景下，只需使用 babel-loader 即可接入 Babel 转译功能。

```yml
npm i -D @babel/core @babel/preset-env babel-loader
```

接入，使用 .babelrc 文件或 rule.options 属性配置 Babel 功能逻辑。

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
};
```

```yml
# 执行编译，就可以正确打包项目了
npx webpack
```

<br>

`@babel/preset-env` 是一种 Babel 预设规则集 —— Preset，这种设计能按需将一系列复杂、数量庞大的配置、插件、Polyfill 等打包成一个单一的资源包，从而简化 Babel 的应用、学习成本。

Preset 是 Babel 的主要应用方式之一，社区已经针对不同应用场景打包了各种 Preset 资源，如：

- `babel-preset-react`：包含 React 常用插件的规则集，支持 preset-flow、syntax-jsx、transform-react-jsx 等；
- `@babel/preset-typescript`：用于转译 TypeScript 代码的规则集；
- `@babel/preset-flow`：用于转译 Flow 代码的规则集；

### 使用 TypeScript

TS 是 JS 的超集，为 JS 提供了一系列类型约束特性。

Webpack 有很多种接入 TypeScript 的方法，包括 ts-loader、awesome-ts-loader、 babel-loader。

```yml
npm i -D typescript ts-loader
```

```js
// webpack.config.js
module.exports = {
  /* xxx */
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
```

```json
// tsconfig.json
{}
```

```yml
# 执行编译，就可以正确打包项目了
npx webpack
```

<br>

如果项目中已经使用 babel-loader，你也可以选择使用 @babel/preset-typescript 规则集，完成转码。

```yml
npm i -D @babel/preset-typescript
```

```js
// webpack.config.js
module.exports = {
  /* xxx */
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-typescript"],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
```

```yml
# 执行编译，就可以正确打包项目了
npx webpack
```

<br>

不过，@babel/preset-typescript 只是简单完成代码转换，并未做类似 ts-loader 的类型检查工作，大家需要根据实际场景选择适当工具。

### 使用 ESLint

ESLint 是一种扩展性极佳的 JavaScript 代码风格检查工具，它能够自动识别违反风格规则的代码并予以修复。

```yml
npm i eslint eslint-webpack-plugin -D
```

```json
// .eslintrc
{}
```

```js
// webpack.config.js
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: "./src/index",
  output: {
    filename: "[name].js",
  },
  plugins: [new ESLintPlugin()],
};
```

```yml
# 执行编译，此时如果出现默认格式校验错误，就会报错并终止打包了
npx webpack
```
