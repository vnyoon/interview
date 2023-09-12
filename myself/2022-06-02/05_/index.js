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


console.log('-------------');
var msg = 'hello';
for (var i = 0; i < 10; i++) {
  var msg = 'hello' + i * 2 + i;
}
console.log(msg);   // hello189


console.log('-------------');
const nums = [3, 44, 11, 2, 111, 22];
const maxNum = nums.reduce((prev, item) => {
  return prev > item ? prev : item;
}, 0);
console.log(maxNum);  // 111


console.log('-------------');
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
