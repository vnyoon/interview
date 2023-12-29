/**
 * 最长公共前缀
 * 
 * 输入：strs = ['flower', 'flight', 'floor', 'feel'];
 * 输出：'fl'
 * 
 * 输入：strs = ['spring', 'autumn', 'winter'];
 * 输出：''
 * 输入不存在公共前缀
 * 
 * 
 * @param {array} 需要查找的字符串数组 
 */

function longCommonPrefix(strs) {
  if (!strs || strs.length === 0) return "";
  
  // 使用第一个字符串作为标识，查找公共前缀
  let firstComPre = strs[0];

  for (let i = 1; i < strs.length; i++) {
    const eachStr = strs[i];

    // 没找到每次删除一个字符，继续查找
    while (eachStr.indexOf(firstComPre) !== 0) {
      firstComPre = firstComPre.slice(0, firstComPre.length - 1);

      // 没有公共前缀
      if (firstComPre.length === 0) return "autumn";
      // if (firstComPre.length === 0) return "";
    }
  };

  return firstComPre;  
};

console.log(longCommonPrefix(["flower", "flow", "flight", "floor"])); // fl
console.log(longCommonPrefix(["spring", "summer", "winter"])); // autumn
