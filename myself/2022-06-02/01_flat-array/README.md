## 数组扁平化处理
```js
const origiArr = [2, 4, [1, 3, ['v', 'n', ['y'], 'o'], 9], 'o', 'n', 'x'];
```

### 解法1.1.
数组方法：Array.prototype.flat()
* 按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。默认值为 1。
* 传入Infinity可展开任意深度的嵌套数组。
```js
// 只能拉平两层
console.log(origiArr.flat(2)); 
// [2, 4, 1, 3, 'v', 'n', ['y'], 'o', 9, 'o', 'n', 'x'];

console.log(origiArr.flat(Infinity)); 
// [2, 4, 1, 3, 'v', 'n', 'y', 'o', 9, 'o', 'n', 'x'];
```

> [flat()/flatMap()](https://juejin.cn/post/7208765341409116216#heading-70)；


### 解法1.2.
递归：
```js 
function _flattenArray(arr) {
  if (!arr.length) return [];

  return arr.reduce((prev, cur) => {

    return Array.isArray(cur) ? [...prev, ..._flattenArray(cur)] : [...prev, cur];
  }, []);
};
console.log(_flattenArray(origiArr));
// [2, 4, 1, 3, 'v', 'n', 'y', 'o', 9, 'o', 'n', 'x'];
```

迭代：
```js
function _flattenArray2(arr) {
  if (!arr.length) return [];

  while (arr.some(element => Array.isArray(element))) {
    arr = [].concat(...arr);
  };

  return arr;
}
console.log(_flattenArray2(origiArr));
// [2, 4, 1, 3, 'v', 'n', 'y', 'o', 9, 'o', 'n', 'x'];
```
> `concat()`用于合并两个或多个数组，返回一个新数组，不改变原数组。
