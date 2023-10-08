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
