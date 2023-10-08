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

  // Symbol作为属性名，遍历不出来
  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  for (const sKey of symbolKeys) {
    newObj[sKey] = deepClone(originValue[sKey]);
  };

  return newObj;
};

// 报错
// obj.inner = obj;
// console.log(obj.inner.name);

const newObj = deepClone(obj);
console.log(newObj === obj); // false
console.log(newObj.s2 === obj.s2); // false
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
