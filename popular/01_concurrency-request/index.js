const origiUrls = [];
for (let i = 1; i <= 20; i++) {
  origiUrls.push(`https://jsonplaceholder.typicode.com/todos/${i}`)
};

/**
 * 
 * @param {array} 请求URL：20
 * @param {number} 最大并发数：3
 * @returns {promise} 
 */
function concuRequest(urls, maxNum) {
  return new Promise((resolve, reject) => {
    if (urls.length === 0) return resolve([]);

    const result = []; // 请求成功/失败结果
    let index = 0; // 请求位置
    let count = 0; // 请求数量
    
    async function reallyRequest() {
      if (index >= urls.length) return;

      const url = urls[index];
      const indey = index++; // 记录请求位置，插入结果内容位置和请求位置保持一直，++是下一个要请求的位置

      try {
        const res = await fetch(url).then(res => res.json());

        result[indey] = res;
      } catch (error) {
        
        result[indey] = error;
      } finally {
        count++;

        // 判断是否所有的请求都已完成
        if (count === urls.length) {
          resolve(result);
        }

        //无论成功/失败 发起下一次请求
        reallyRequest();
      }
    };

    // 请求urls数量小于最大并发数时，所以取二者最小值
    const times = Math.min(urls.length, maxNum);
    for (let i = 0; i < times; i++) {
      reallyRequest();
    }
  })
};

concuRequest(origiUrls, 3).then(res => {
  console.log("Result: ", res);
});
