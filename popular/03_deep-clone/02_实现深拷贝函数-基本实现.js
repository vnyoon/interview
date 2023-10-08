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
