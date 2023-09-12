## JavaScript 中判断元素是否是一个纯对象(Object)
前面全局代码：
```js
const obj = {
  name: "yoon",
  age: 18,
};
const array = ["ace", "sabot", "luffy"];
const height = 1.88;
function foo() { console.log('foo'); };
```

### 一、Object.prototype.toString.call()
```js
function isObject(val) {
  return Object.prototype.toString.call(val)
};
console.log(isObject(obj));   // [object Object]
console.log(isObject(obj) === '[object Object]');   // true

console.log(isObject(array));   // [object Array]
console.log(isObject(array) === '[object Array]');    // true

console.log(isObject(height));    // [object Number]
console.log(isObject(height) === '[object Number]');    // true

console.log(isObject(foo));    // [object Function]
console.log(isObject(foo) === '[object Function]');    // true
```


### 二、constructor
```js
console.log(obj.constructor);   // ƒ Object() 
console.log(obj.constructor === Object);    // true

console.log(array.constructor);   //ƒ Array()
console.log(array.constructor === Array);   // true

console.log(height.constructor);    //ƒ Number()
console.log(height.constructor === Number);   // true

console.log(foo.constructor);    //ƒ Function()
console.log(foo.constructor === Function);   // true
```

### 三、instanceof
```js
console.log(obj instanceof Object);   // true
console.log(array instanceof Object);   // true
console.log(foo instanceof Object);  // true
console.log(height instanceof Object);  // false
console.log(null instanceof Object);  // false
```

### 四、typeof
```js
console.log(typeof obj);    // "object"
console.log(typeof array);    // "object"
console.log(typeof height);     // "number"

console.log(typeof null);   // "object"
console.log(typeof undefined);    // "undefined"
console.log(typeof true);   // "boolean"
console.log(typeof foo);    // "function"
console.log(typeof Symbol('abc'));    // "symbol"
```

### 如何判断一个空对象？
```js
```
