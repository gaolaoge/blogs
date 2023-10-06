---
title: "批量更新"
mode: "notes"
---

## 并发渲染

React18 之前的渲染是同步的，也就是一旦开始渲染就不可中断。从 18 版本开始，React 引入了并发渲染，允许渲染暂停/恢复/中止。  
这是一个底层能力的改造，transition 等新特性都是基于这个能力实现的。

## Automatic Batching

批量更新是指把多次 state 更新合并到一次 render，以此可以：
- 提升性能；
- 避免意外bug。当需要更新多个state时，如果每更新一个 state 就 render，可能会出现“半完成”的情况，造成异常；

例：

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    // re-render 一次
    setCount((c) => c + 1);
    setFlag((f) => !f);
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
      <LogEvents />
    </div>
  );
}

function LogEvents(props) {
  console.log("Render");
  return null;
}

// 结果：点击一次 button，只会打印一个"Render"
```

### 批量更新的时机

React 18 对批量更新的时机做了调整：

- 在 React 18 之前，React 仅在浏览器事件处理期间才会做批量更新，而在其他事件（比如：Promise、setTimeout、native 事件）期间是不会执行的。
- 在 React 18 版本中，并且使用 ReactDOM.createRoot，则 React 会在所有事件中进行自动批量更新（Automatic Batching）。而如果使用ReactDOM.render，则会依旧维持之前版本的表现。

>  React 18 均代指 React 18+使用createRoot的情况。

```js
// React 18 之前
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setTimeout(() => {
      setCount((c) => c + 1);
      setFlag((f) => !f);
    }, 0);
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
      <LogEvents />
    </div>
  );
}

function LogEvents(props) {
  console.log("Render");
  return null;
}

// 结果：点击一次 button，会打印两个"Render"
```

```jsx
// React 18 
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setTimeout(() => {
      setCount((c) => c + 1);
      setFlag((f) => !f);
    }, 0);
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
      <LogEvents />
    </div>
  );
}

function LogEvents(props) {
  console.log("Render");
  return null;
}

const rootElement = document.getElementById("root");
// 结果：React 18 新特性。点击一次 button，只会打印一个"Render"
ReactDOM.createRoot(rootElement).render(<App />);
```

### 如果不想使用自动批量更新

可以使用 ReactDOM.flushSync将 state 更新分开包裹。

```js
import { flushSync } from 'react-dom'; // Note: react-dom, not react

function handleClick() {
  flushSync(() => {
    setCounter(c => c + 1);
  });
  flushSync(() => {
    setFlag(f => !f);
  });
}

// 结果：点击一次 button，会打印两个"Render"
```

## Transition

Transition 提供了一种优化交互体验和性能的手段。

react 18 将 state update 分为了两类： 

1. Urgent Update：比如输入内容、点击按钮这种非常直接的交互，这种数据更新我们认为是迫切高优的；
2. Transition Update：比如搜索时展示过滤项，这种偏间接的、用户通常对时效会有一定包容度的交互，它的数据更新我们认为是优先级低一些的；

在 React18 之前，所有的更新都被认为是Urgent Update，从 18 开始支持手动标记 Transition Update 。

相比以往方案（setTimeout/debounce/throttle）的差异：

1. 执行时机。transition 是同步的，setTimeout 是异步的。而且，transition 是高优更新完毕后立即执行，而 setTimeout 会有一个固定的时间
2. 阻塞。transition 是可中断的，不会阻塞页面，而当 setTimeout 执行时，仍可能阻塞页面
3. loading 状态。transition 会开放一个 loading 状态，而无需我们手动去维护 loading

### startTransition

通过 starTransition 可以标记非紧急的更新，具体的执行时机会根据当前空闲程度动态决定。

```jsx
import { startTransition } from 'react';

// Urgent
setSliderValue(input);
// Mark any state updates inside as transitions
startTransition(() => {
  // Transition: Show the results
  setGraphValue(input);
});
```

### useTransition

可以通过 useTransition 中的 pending 来确定当前更新的执行状态，并渲染一些 loading 。

```jsx
function App() {
  // isPending：指明transition是否处于pending状态
  // startTransition：用于将state更新标记为transtion
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);

  function handleClick() {
    startTransition(() => {
      setCount((c) => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spin />}
      <Button onClick={handleClick}>{count}</Button>
    </div>
  );
}
```

### useDeferredValue

如果更新触发的时机并不可控，比如从parent compnent / other hooks / 多个handler / URL改变，这种情况下，React提供了另一个hook updateDeferredValue 来标记非紧急更新。

```jsx
import { useDeferredValue } from 'react';

const Comp = (input) => {
  const graphValue = useDeferredValue(input);
  // ...updating depends on graphValue
};
```