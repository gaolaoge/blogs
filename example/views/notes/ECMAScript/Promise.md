---
title: Promise
# config: { dir: true }
---

Promise 是一个对象，对象和函数的区别就是对象可以保存状态，函数不可以（闭包除外）。

Promise 对异步动作抽象处理：它先接收一个函数，并通过 then 预先保存处理动作，内部「状态」改变后执行处理动作，通过链式调用，避免了异步编程的回调地狱情况。

> Promise 与其它异步事件不同的是，它是一个微任务，有单独的事件存储队列，
> 微任务的执行优先于宏任务。

Promise 内部维护了一个状态：等待中，成功 或 失败。

一个待定 Promise 的状态最终会「成功」或「失败」，通过 Promise 的 then 方法串联的处理程序将被调用。如果绑定相应处理程序时 Promise 已经「成功」或「失败」，这处理程序将被立即调用，因此在异步操作完成和绑定处理程序之间不存在竞态条件。

Promise 支持将多个 异步事件集中处理：

- `Promise.all()` 在所有传入的 Promise 都「成功」时「成功」；在任意一个 Promise 被「失败」时「失败」。
- `Promise.allSettled()` 在所有的 Promise 都得到结果时「成功」。
- `Promise.any()` 在任意一个 Promise 「成功」时「成功」；仅在所有的 Promise 都「失败」时才「失败」。
- `Promise.race()` 在任意一个 Promise 得到结果时得到结果。换句话说，在任意一个 Promise 「成功」时「成功」；在任意一个的 Promise 「失败」时「失败」。

#### 模拟

```js
class HD {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  constructor(executor) {
    this.status = HD.PENDING;
    this.value = null;
    this.callbacks = [];

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (err) {
      this.reject.bind(this);
    }
  }

  resolve(value) {
    if (this.status === HD.PENDING) {
      this.status = HD.FULFILLED;
      this.value = value;
      setTimeout(() => {
        this.callbacks.forEach((callback) => callback.onFulfilled(value));
      });
    }
  }

  reject(reason) {
    if (this.status === HD.PENDING) {
      this.status = HD.REJECTED;
      this.value = reason;
      setTimeout(() => {
        this.callbacks.forEach((callback) => callback.onRejected(reason));
      });
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function" ? onRejected : (value) => value;

    let promise = new HD((resolve, reject) => {
      if (this.status === HD.FULFILLED) {
        setTimeout(() =>
          this.parse(promise, onFulfilled(this.value), resolve, reject)
        );
      } else if (this.status === HD.REJECTED) {
        setTimeout(() =>
          this.parse(promise, onRejected(this.value), resolve, reject)
        );
      } else if (this.status === HD.PENDING) {
        this.callbacks.push({
          onFulfilled: (value) =>
            this.parse(promise, onFulfilled(value), resolve, reject),
          onRejected: (reason) =>
            this.parse(promise, onRejected(reason), resolve, reject),
        });
      }
    });
    return promise;
  }

  parse(promise, result, resolve, reject) {
    if (promise == result)
      throw new TypeError("Chaining cycle detected for promise");
    try {
      if (result instanceof HD) result.then(resolve, reject);
      else resolve(result);
    } catch (err) {
      reject(err);
    }
  }

  static resolve(value) {
    return new HD((resolve, reject) => {
      if (value instanceof HD) value.then(resolve, reject);
      else resolve(value);
    });
  }

  static reject(reason) {
    return new HD((resolve, reject) => reject(reason));
  }

  static all(promises) {
    let parameter_null = Symbol("parameter_null"),
      result = Array(promises.length).fill(parameter_null);
    return new HD((resolve, reject) => {
      promises.forEach((promise, index) => {
        try {
          promise.then(
            (data) => {
              result[index] = data;
              if (!result.some((item) => item === parameter_null))
                resolve(result);
            },
            (err) => reject(err)
          );
          result.push();
        } catch (reason) {
          (err) => reject(reason);
        }
      });
    });
  }

  static race(promises) {
    return new HD((resolve, reject) => {
      promises.forEach((promise) => {
        try {
          promise.then(
            (data) => resolve(data),
            (err) => reject(err)
          );
        } catch (reason) {
          (err) => reject(reason);
        }
      });
    });
  }
}
```
