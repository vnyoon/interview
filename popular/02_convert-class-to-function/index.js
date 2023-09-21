'use strict';

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



console.log("------------------------------------------");
function CPerson(name) {
  // 1. 验证this指向
  if (!(this instanceof CPerson)) {
    throw new TypeError("Class constructor Person cannot be invoked without 'new'")
  };

  this.name = name;
};
// 所以更改添加方法的方式
// CPerson.prototype.foo = function() { 
//   console.log(this.name);
// };
Object.defineProperty(CPerson.prototype, 'foo', {
  value: function() {
    // 3. 不能通过new调用
    if (!(this instanceof CPerson)) {
      throw new TypeError("p.foo is not a constructor")
    };

    console.log(this.name);
  },
  // 不可枚举
  enumerable: false
});

const p2 = new CPerson('vnyoon');
console.log(p2); // CPerson { name: 'vnyoon' }
p2.foo(); // vnyoon


// CPerson(); //TypeError: Class constructor Person cannot be invoked without 'new'

// 2. 能看到原型上的方法被循环遍历出来了，
// name
// ~~foo~~
// for (const key in p2) {
//   console.log(key);
// };

// new p2.foo(); // TypeError: p.foo is not a constructor
