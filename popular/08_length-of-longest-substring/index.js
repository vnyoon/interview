/**
 * 字符串中无重复字符的最长子串的长度：
 * 
 * 
 * 示例1：
 *  输入：str = 'abcabcbb';
 *  输出：3
 *  解释：因为无重复字符的最长子串是'abc'，所以其长度为3；
 * 
 * 示例2：
 *  输入：str = 'bbbbb';
 *  输出：1
 *  解释：因为无重复字符的最长子串是'b'，所以其长度为1；
 * 
 * 示例3：
 *  输入：str = 'pwwkew';
 *  输出：3
 *  解释：因为无重复字符的最长子串是'wke'，所以其长度为1，注意
 *        答案必须是子串的长度，'pwke'是一个子序列，不是字串；
 * 
 * @param {string} 需要查找的的字符穿 
*/

function lengthOfLongestSubstring(str) {
  const strLegh = str.length;

  // 每个字符: 字符的索引；
  const map = new Map();
  let left = 0;
  let ans = 0;

  for (let right = 0; right < strLegh; right++) {
    const rightChar = str[right];

    if (map.has(rightChar) && map.get(rightChar) >= left) {
      left = map.get(rightChar) + 1
    };

    map.set(rightChar, right);

    ans = Math.max(ans, right - left + 1);
  };

  return ans;
};

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3
