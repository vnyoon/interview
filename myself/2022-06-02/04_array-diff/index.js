/**
 * 有集合a与b，所有属于a且不属于b的元素的集合称为a与b的差集；
 *             所有属于b且不属于a的元素的集合称为b与a的差集；
 * 
 * @param {*} arr1 
 * @param {*} arr2 
 * @returns 返回：数组arr1相对于arr2所没有的
 * 
 */

// 1. a，b
function diff(arr1, arr2) {
  const result = [];

  for (const item of arr1) {
    arr2.indexOf(item) === -1 && result.push(item)
  };

  return result;
};
console.log(
  diff([1, 2, 3, 4], [2, 3, 4, 5, 6])
); // [1]


// 2. b，a
function diff2(arr1, arr2) {
  return arr2.filter(item => !arr1.includes(item))
};
console.log(
  diff2([1, 2, 3, 4, 5], [2, 3, 4, 6])
); // [6]
