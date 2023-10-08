## 深拷贝函数的实现
前面，对如下对象进行深拷贝
```js
const s1 = Symbol();
const s2 = Symbol("Symbol 作为属性值");
const obj = {
  name: "yoon",
  age: 18,
  boolean: true,
  otherUn: undefined,
  otherNu: null,

  hobbies: ["sing", "dance", "rap"],
  friend: {
    name: "ace",
    height: 1.88,

    address: {
      province: "GDS",
      city: "SZS"
    }
  },
  foo: function() {
    console.log("foo");
  },

  set: new Set(["ace", "sabot", "luffly"]),
  map: new Map([["x", "哈哈哈"], ["y", "嘻嘻嘻"]]),

  [s1]: "Symbol 作为属性名",
  s2: s2
};

function isObject(value) {
  const valueType = typeof value;
  
  return (value !== null) && (valueType === "object" || valueType === "function")
};
```

### 一、简单的深拷贝方法 - JSON.parse
先说结论，这种深拷贝的方式其实对于`undefined`、`function`、`Symbol`等是无法处理的，并且如果存在对象的循环引用，也会报错的。如下代码
```js
// 报错
// obj.inner = obj;
// console.log(obj.inner.name);

const info = JSON.parse(JSON.stringify(obj));
console.log(info === obj); // false
console.log(info);
// {
//   name: 'yoon',
//   age: 18,
//   boolean: true,
//   otherNu: null,
//   hobbies: [ 'sing', 'dance', 'rap' ],
//   friend: {
//     name: 'ace',
//     height: 1.88,
//     address: { province: 'GDS', city: 'SZS' }
//   },
//   set: {},
//   map: {}
// }

info.friend = "update";
console.log(obj); // 无影响
```

### 二、实现深拷贝函数 - 基本实现
基本数据类型和对象拷贝能满足，但是现有的问题是：
* 数组和函数拷贝成对象了；
* Symbol作为属性名无法拷贝；
* Set/Map数据类型拷贝成一个空对象；
```js
function deepClone(originValue) {
  if (!isObject(originValue)) return originValue;

  const newObj = {};
  for (const key in originValue) {
    newObj[key] = deepClone(originValue[key])
  };

  return newObj;
};

// 报错
// obj.inner = obj;
// console.log(obj.inner.name);

const newObj = deepClone(obj);
console.log(newObj === obj); // false
console.log(newObj);
// {
//   name: 'yoon',
//   age: 18,
//   boolean: true,
//   otherUn: undefined,
//   otherNu: null,
//   hobbies: { '0': 'sing', '1': 'dance', '2': 'rap' },
//   friend: {
//     name: 'ace',
//     height: 1.88,
//     address: { province: 'GDS', city: 'SZS' }
//   },
//   foo: {},
//   set: {},
//   map: {},
//   s2: Symbol(Symbol 作为属性值)
// }

newObj.friend = "update";
console.log(obj); // 无影响
```

### 三、实现深拷贝函数 - 其他类型
接下来优化使用上面的方式所带来的类型拷贝问题；
```js
function deepClone(originValue) {
  const valueType = typeof originValue;

  // Set类型，创建新的
  if (originValue instanceof Set) return new Set([...originValue]);

  // Map类型，创建新的
  if (originValue instanceof Map) return new Map([...originValue]);

  // Symbol，创建新的
  if (valueType === 'symbol') return Symbol(originValue.description);

  // 函数，使用同一个返回
  if (valueType === 'function') return originValue;

  // 不是对象类型，返回
  if (!isObject(originValue)) return originValue;

  // 对象 or 数组
  const newObj = Array.isArray(originValue) ? [] : {};
  for (const key in originValue) {
    newObj[key] = deepClone(originValue[key])
  };

  // Symbol作为属性名，遍历不出来，进行特殊处理
  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  for (const sKey of symbolKeys) {
    newObj[sKey] = deepClone(originValue[sKey]);
  };

  return newObj;
};

// 循环引用报错
// obj.inner = obj;
// console.log(obj.inner.name);

const newObj = deepClone(obj);
console.log(newObj === obj); // false
console.log(newObj);
// {
//   name: 'yoon',
//   age: 18,
//   boolean: true,
//   otherUn: undefined,
//   otherNu: null,
//   hobbies: [ 'sing', 'dance', 'rap' ],
//   friend: {
//     name: 'ace',
//     height: 1.88,
//     address: { province: 'GDS', city: 'SZS' }
//   },
//   foo: [Function: foo],
//   set: Set(3) { 'ace', 'sabot', 'luffly' },
//   map: Map(2) { 'x' => '哈哈哈', 'y' => '嘻嘻嘻' },
//   s2: Symbol(Symbol 作为属性值),
//   [Symbol()]: 'Symbol 作为属性名'
// }

newObj.friend = "update";
console.log(obj); // 无影响
```
> `Object.getOwnPropertySymbols()` 方法返回一个包含给定对象所有自有 `Symbol` 属性的数组。

### 四、实现深拷贝函数 - 循环引用
* 第一次进来时，先创建一个`Map`对象，用于存储对象。
* 下次进来时，如果在`Map`对象里存在就返回出去。
```js
function deepClone(originValue, hashMap = new WeakMap()) {
  const valueType = typeof originValue;

  // Set类型，创建新的
  if (originValue instanceof Set) return new Set([...originValue]);

  // Map类型，创建新的
  if (originValue instanceof Map) return new Map([...originValue]);

  // Symbol，创建新的
  if (valueType === 'symbol') return Symbol(originValue.description);

  // 函数，使用同一个返回
  if (valueType === 'function') return originValue;

  // 不是对象类型，返回
  if (!isObject(originValue)) return originValue;

  if (hashMap.has(originValue)) return hashMap.get(originValue);

  // 对象 or 数组
  const newObj = Array.isArray(originValue) ? [] : {};
  hashMap.set(originValue, newObj);

  for (const key in originValue) {
    newObj[key] = deepClone(originValue[key], hashMap)
  };

  // Symbol作为属性名，遍历不出来
  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  for (const sKey of symbolKeys) {
    newObj[sKey] = deepClone(originValue[sKey], hashMap);
  };

  return newObj;
};

obj.inner = obj;

const newObj = deepClone(obj);
console.log(newObj === obj); // false
console.log(newObj.s2 === obj.s2); //false

newObj.friend.name = "sabot";
newObj.friend.address.province = "北京";
console.log("obj: ", obj);

console.log("inner: ", newObj.inner.inner);
```
