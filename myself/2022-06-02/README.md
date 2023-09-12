# 一家做网络安全、云计算等某某某科技公司

**在线做的笔试题**：
## [一、数组扁平化处理 - 支持指定拉平层级](./01_flat-array)★

## [二、实现一个 LRU 缓存机制](./02_LRU-cache) - ★★

## [三、数组a与b，b与a的差集](./04_array-diff) - ★

## 其它
以及一些其它的简单的题，包括但不限于比如让你使用`map`、`filter`、`forEach`、`reduce`等操作数据得到指定的结果。[其中一些](./05_)，大致如下：
1. 数组操作
```js
function foo(...args) {
  const len = args[0].length;
  const result = [];

  for (let i = 0; i < len; i++) {
    let arr = [];
    args.forEach(item => arr.push(item[i]));

    result.push(arr);
  };

  return result;
};

console.log(
  foo(['belik', 't-bag'], ['shenzhen', 'shanghai'], [18, 20], ['man', 'woman'])
);
// [
//   [ 'belik', 'shenzhen', 18, 'man' ],
//   [ 't-bag', 'shanghai', 20, 'woman' ]
// ]
```
2. var的变量提升
```js
var msg = 'hello';
for (var i = 0; i < 10; i++){
  var msg = 'hello' + i * 2 + i;
}
console.log(msg); //hello189
```
3. 数组里的最大数
```js
const nums = [3, 44, 11, 2, 111, 22];
const maxNum = nums.reduce((prev, item) => {
  return prev > item ? prev : item;
}, 0);
console.log(maxNum);  // 111
```
4. let和var的区别
```js
for (var i = 0; i < 5; ++i) {
  setTimeout(function() {
    console.log(i + '');
  }, 100)
};
// 5 5 5 5 5
for (let i = 0; i < 5; ++i) {
  setTimeout(function() {
    console.log(i + '');
  }, 100)
};
// 0 1 2 3 4
```

**面试过程中口述题**：
## [一、JS 中判断一个纯对象(Object)](./03_is-object) - ★

等等口述表达题，包括不限于一些js框架的API使用方法，项目中遇到的难点，解决办法。
