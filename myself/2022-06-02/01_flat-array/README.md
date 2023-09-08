## 数组扁平化处理
需要处理(拉平)的数组：
```js
const origiArr = [2, 4, [1, 3, ['v', 'n', ['y'], 'o'], 9], 'o', 'n', 'x'];
```

### 解法1.1./API
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


### 解法1.2./手写方法
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

### 解法1.3./手写方法 - 扩展：支持传入第二个参数来指定拉平的层级
```js
function _flattenArray3(arr, level = 1) {
  if (level === 0) return arr;

  let result = [];

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];

    if (Array.isArray(element)) {
      const flattenedArr = _flattenArray3(element, level - 1);

      result = result.concat(flattenedArr);
    } else {
      result.push(arr[i]);
    }
  };

  return result;
};

console.log(_flattenArray3(origiArr), "last");

// [ 2, 4, 1, 3, [ 'v', 'n', [ 'y' ], 'o' ], 9, 'o', 'n', 'x' ]
console.log(_flattenArray3(origiArr, 2), "last");
// [ 2, 4, 1, 3, 'v', 'n', ['y'], 'o', 9, 'o', 'n', 'x']

console.log(_flattenArray3(origiArr, Infinity), "last");
// [ 2, 4, 1, 3, 'v', 'n', 'y', 'o', 9, 'o', 'n', 'x']
```
> 注意：如果多维数组非常大或嵌套层级很深，请谨慎使用此方法，以免引发堆栈溢出错误。
