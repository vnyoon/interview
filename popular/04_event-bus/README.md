# 自定义事件总线
自定义事件总线属于一种观察者模式，当一个对象状态发生改变时，依赖它的对象会全部收到通知，并做相应操作。其中包括三个角色：
* 发布者(Publisher)：发出事件(Event)。
* 订阅者(Subscriber)：订阅事件(Event)，并且会进行响应(Handler)。
* 事件总线(EventBus)：无论是发布这还是订阅者都是听过事件总线作为中台的。

## Code
```js
class VNEventBus {
  constructor() {
    this.eventBus = {}
  }
}

const eventBus = new VNEventBus();
```
### on & emit
```js
class {
  // ...
  on(eventName, eventCallback, thisArg) {
    let handlers = this.eventBus[eventName];

    if (!handlers) {
      handlers = [];
      this.eventBus[eventName] = handlers;
    }

    handlers.push({
      eventCallback,
      thisArg
    })

    return this
  };
}

eventBus.on("changeName", function(payload) {
  console.log("监听changeName", this, "获得的参数：", payload);
  
}, { label: "传递过去的this - name - 1" });

eventBus.on("changeAge", function(payload) {
  console.log("监听changeAge", this, "获得的参数：", payload);
  
}, { label: "传递过去的this - age - 1" })

console.table(eventBus);
// VNEventBus {
//   eventBus: {
//     changeName: [
//       {
//         eventCallback: function(payload) {},
//         thisArg: {label: '传递过去的this - name - 1'}          
//       }
//     ],
//     changeAge: [
//       {
//         eventCallback: function(payload) {},
//         thisArg: {label: '传递过去的this - age - 1'}          
//       }
//     ],
//   }
// }


eventBus.emit("changeName", "yoon");
// 监听changeName { label: '传递过去的this - name - 1' } 获得的参数： yoon
eventBus.emit("changeAge", 18);
// 监听changeAge { label: '传递过去的this - age - 1' } 获得的参数： 18
```

### off & once
```js
class {
  // ...
  off(eventName, eventCallback) {
    const handlers = this.eventBus[eventName];

    if (handlers && eventCallback) {
      const newHandlers = [...handlers];

      for (let i = 0; i < newHandlers.length; i++) { 
        const handler = newHandlers[i];

        if (handler.eventCallback === eventCallback) {
          const index = handlers.indexOf(handler);
          handlers.splice(index, 1);
        }
      }
    }

    /**无订阅函数时，把对象删除 */
    if (handlers?.length === 0) {
      delete this.eventBus[eventName];
    }
  }

  once(eventName, eventCallback, thisArg) {
    const tempCallback = (...payload) => {
      this.off(eventName, tempCallback);

      eventCallback.apply(thisArg, payload);
    };

    return this.on(eventName, tempCallback, thisArg);
  }
}

const handleCallback = function(payload) {
  console.log("监听changeHeight", this, "获得的参数：", payload);
};
eventBus.on("changeHeight", handleCallback, { label: "传递过去的this - height - 1" });

eventBus.once("changeAge", function(payload) {
  console.log("监听changeAge once", this, "获得的参数：", payload);
  
}, { label: "传递过去的this - age once - 2" })


eventBus.emit("changeAge", 18);
// 监听changeAge { label: '传递过去的this - age - 1' } 获得的参数： 18
// 监听changeAge once {label: '传递过去的this - age once - 2'} 获得的参数： 18

// eventBus.emit("changeHeight", 1.88);
// 监听changeHeight {label: '传递过去的this - height - 1'} 获得的参数： 1.88
eventBus.off("changeHeight", handleCallback);
eventBus.emit("changeHeight", 1.88); // 无订阅事件反馈

// 再发射一次，使用once的事件就不会再订阅了
eventBus.emit("changeAge", 20);
// 监听changeAge {label: '传递过去的this - age - 1'} 获得的参数： 20
```

### hasEvent & clear
```js
class {
  hasEvent(eventName) {
    return Object.keys(this.eventBus).includes(eventName);
  }

  clear() {
    this.eventBus = {};
  }
}

console.log(eventBus.hasEvent("changeName")); // true
console.log(eventBus.hasEvent("changeAge")); // true
console.log(eventBus.hasEvent("changeHeight")); // false
eventBus.clear();
console.log(eventBus.eventBus); // {}
```

### 补充
可以在每次调用的方法里前进行一些`edge case`，给程序带来茁壮和安全性。
```js
if (typeof eventName !== "string") {
  throw new TypeError("the event name must be string type")
}

if (typeof eventCallback !== "function") {
  throw new TypeError("the event callback must be function type")
}
```
