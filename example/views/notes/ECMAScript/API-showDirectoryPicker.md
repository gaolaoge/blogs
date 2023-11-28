---
title: "读取本地目录"
mode: "notes"
---

> 这是 1 个兼容性差的实验性 API，可能在未来的某个版本中被移除。

浏览器预设了黑箱机制，默认不允许 JS 进程读取本地文件，  
新 API： [window.showDirectoryPicker](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/showDirectoryPicker) 实现了这个功能。

示例：

```js
/**
 * JS 读取本地文件
 * 例：www.vscode.dev 是 vscode 的浏览器版本，实现了读取本地项目的能力。
 *
 * 1. 如何选择文件夹
 * 2. 如何得到文件夹内目录
 * 3. 如何读取文件内容
 */

const btn = document.querySelector("#getCatalog"); // 选择目录
const showBtn = document.querySelector("#show"); // 读取目录下文件

let catalog = null; // 文件目录结构

// 1. 选择文件夹
btn.addEventListener("click", async () => {
  try {
    // 这里得到 1 个 Promise ，任何 I/O 操作都是异步的
    // reader 是 1 个文件夹的句柄，指资源的访问点
    // { type: "directory" / "file" , name }
    const reader = await showDirectoryPicker();
    catalog = await processHandler(reader);
  } catch (e) {
    console.error("用户拒绝： ", e);
  }
});

// 2. 遍历得到目录结构
const processHandler = async (handle) => {
  if (handle.kind === "file") {
    return handle;
  }
  handle.children = [];
  const iter = await handle.entries(); // 得到文件夹内的目录
  // iter 是 1 个异步迭代器
  for await (const entry of iter) {
    // [name, {kind, handle}]
    const child = await processHandler(entry[1]);
    if (child) {
      handle.children.push(child);
    }
  }
  return handle;
};

showBtn.addEventListener("click", async () => {
  if (!catalog || catalog.children.length === 0) {
    return;
  }
  await readCatalog(catalog);
});

// 3. 读取文件内容
const readCatalog = async (catalog) => {
  for (const child of catalog.children) {
    if (child.kind === "file") {
      const content = await child.getFile();
      //   const text = await content.text();
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        console.log(`
        ----------------------------
        name: ${child.name}
        content: ${e.target.result}
        ----------------------------
        `);
      });
      reader.readAsText(content);
    } else {
      readCatalog(child);
    }
  }
};
```
