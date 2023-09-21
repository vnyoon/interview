# 将 class 转换为 function

## ES6的class
```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  foo() {
    console.log(this.name);
  }
}

const p = new Person('yoon', 18);
console.log(p); // Person { name: 'yoon', age: 18 }
p.foo(); // yoon

// Person(); //TypeError: Class constructor Person cannot be invoked without 'new'

// 原型上的是不可枚举的，比如foo函数通过循环是查看不到的：
// name
// age
// for (const key in p) {
//   console.log(key);
// };

// 在js中所有函数都能通过new调用，但类里面方法不能；
// new p.foo() //TypeError: p.foo is not a constructor
```
**转换为**

## ES5构造函数
- 使用strict模式：在`ES6`里面使用类语法，整个里面的代码实在严格模式下进行的，所以第一行加上`use strict`；
```js
'use strict';

function CPerson(name) {
  this.name = name;
};

CPerson.prototype.foo = function() { 
  console.log(this.name);
};

const p2 = new CPerson('vnyoon');
console.log(p2); // CPerson { name: 'vnyoon' }
p2.foo(); // vnyoon

// CPerson(); // TypeError: Class constructor Person cannot be invoked without 'new'

// 2. 能看到原型上的方法foo被循环遍历出来了
// name
// foo
// for (const key in p2) {
//   console.log(key);
// };

// new p2.foo(); // TypeError: p.foo is not a constructor
```
- 验证调用方式：在`class`中，只能通过`new`关键字调用构造函数，而不能直接调用。要模拟这种行为，需要通过验证this所指向的对象是否是**构造函数的实例**；
```js
function CPerson(name) {
  // 验证this指向
  if (!(this instanceof CPerson)) {
    throw new TypeError("Class constructor Person cannot be invoked without 'new'")
  };

  this.name = name;
};
```
- 保留方法成员：在`class`中定义的方法是放在原型上，是**不可枚举**的。并且还要防止成员方法使用`new`调用，有些方法本身不能使用new调用，需要通过验证this指向是否正确来进行判断；
```js
// CPerson.prototype.foo = function() { 
//   console.log(this.name);
// };
Object.defineProperty(CPerson.prototype, 'foo', {
  value: function() {
    // 不能通过new调用
    if (!(this instanceof CPerson)) {
      throw new TypeError("p.foo is not a constructor")
    };

    console.log(this.name);
  },
  // 不可枚举
  enumerable: false
});
```
