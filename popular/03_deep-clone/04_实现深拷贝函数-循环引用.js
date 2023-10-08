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

// 正常
obj.inner = obj;

const newObj = deepClone(obj);
console.log(newObj === obj); // false
console.log(newObj.s2 === obj.s2); //false

newObj.friend.name = "sabot";
newObj.friend.address.province = "北京";
console.log("obj: ", obj);

console.log("inner: ", newObj.inner.inner);
