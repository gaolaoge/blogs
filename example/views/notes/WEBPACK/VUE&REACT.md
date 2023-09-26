---
title: "Vue & React 开发环境"
mode: "notes"
---

传统 Web 开发通常会强调将页面的 HTML、CSS、JavaScript 代码分开用不同文件承载，这种思维本质上是将页面层级的结构、样式、逻辑分离成不同关注点；

现代 MVVM 框架，包括 React、Vue、Angular，则强调在组件内完成所有结构、样式、逻辑定义，从而进一步缩小关注点粒度，降低开发者心智负担。

> 这里只做最基础的配置，确保 VUE 或 REACT 可以正常编译和打包，不包含预处理和优化动作内容。

### vue

```yml
npm i webpack webpack-cli webpack-dev-server -D
npm i style-loader css-loader -D
npm i vue vue-loader -D
npm i html-webpack-plugin -D
```

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports =  {
entry: './src/index.js',
    resolve: {
        extensions: ['.vue', '.js']
    },
    devServer: {
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            templateContent: `
            <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Webpack App</title>
                </head>
                <body>
                    <div id="app" />
                </body>
            </html>
            `
        }),
        new VueLoaderPlugin()
    ]
}
```

```js
// src/index.js
import { createApp } from "vue";
import App from './App'

createApp(App).mount('#app')
```

```vue
<template>
    <div>here is App.vue</div>
    <div>{{ message }}</div>
</template>

<script>
export default {
    data() {
        return {
            message: 'hello world',
        }
    }
}
</script>

<style>
</style>
```

```yml
npx webpack         # 打包
npx webpack serve   # 打开服务
```

### react

```yml
npm i webpack webpack-cli webpack-dev-server -D
npm i react react-dom -D
npm i html-webpack-plugin -D
npm i babel-loader @babel/core @babel/preset-react -D
```

REACT 默认使用 JSX 编写组件，但浏览器并不支持 JSX ，

可以借助 babel-loader，并使用 React 预设规则集 @babel/preset-react ，完成 JSX 到 JavaScript 的转换。

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: './src/index.js',
    resolve: {
        extensions: ['.jsx', '.js']
    },
    devServer: {
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,    // 这里要确保 .js 也在范围内以保证入口文件可以正常识别 
                loader: 'babel-loader',
                options: {
                    "presets": [
                        ["@babel/preset-react"]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            templateContent: `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>Webpack App</title>
                </head>
                <body>
                    <div id="app" />
                </body>
            </html>
            `
        }),
        new webpack.HotModuleReplacementPlugin()  // 热更新
    ]
}
```

```js
// src/index.js
import React from 'react'
import { render } from 'react-dom'
import App from './app.jsx'

const root = document.querySelector('#app')
render(<App />, root)
```

```jsx
import React from 'react'

export default () => {
    return <div className="hello">hello world</div>
}
```

```yml
npx webpack         # 打包
npx webpack serve   # 打开服务
```