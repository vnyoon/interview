const origiArr = [2, 4, [1, 3, ['v', 'n', ['y'], 'o'], 9], 'o', 'n', 'x'];

console.log(origiArr.flat(2)); 
// [2, 4, 1, 3, 'v', 'n', ['y'], 'o', 9, 'o', 'n', 'x'];

console.log(origiArr.flat(Infinity)); 
// [2, 4, 1, 3, 'v', 'n', 'y', 'o', 9, 'o', 'n', 'x'];


function _flattenArray(arr) {
  if (!arr.length) return [];

  return arr.reduce((prev, cur) => {

    return Array.isArray(cur) ? [...prev, ..._flattenArray(cur)] : [...prev, cur];
  }, []);
};
console.log(_flattenArray(origiArr));
// [2, 4, 1, 3, 'v', 'n', 'y', 'o', 9, 'o', 'n', 'x'];


function _flattenArray2(arr) {
  if (!arr.length) return [];

  while (arr.some(element => Array.isArray(element))) {
    arr = [].concat(...arr);
  };

  return arr;
}
console.log(_flattenArray2(origiArr));
// [2, 4, 1, 3, 'v', 'n', 'y', 'o', 9, 'o', 'n', 'x'];
