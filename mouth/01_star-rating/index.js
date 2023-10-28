
/**
 * 
 * @param {number} 星星数 0~5 
 * @returns 
 */
const rate = (r) => '★★★★★☆☆☆☆☆'.slice(5 - r, 10 - r);

console.log(rate(0)); // ☆☆☆☆☆
console.log(rate(1)); // ★☆☆☆☆
console.log(rate(2)); // ★★☆☆☆
console.log(rate(3)); // ★★★☆☆
console.log(rate(4)); // ★★★★☆
console.log(rate(5)); // ★★★★★
