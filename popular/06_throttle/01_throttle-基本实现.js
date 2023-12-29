
/**
 * 
 * @param {function} fn 需要防抖的事件
 * @param {number} interval[ms] 间隔执行的时间
 * 
 * 1. 记录上次开始的时间。
 * 2. 创建并返回事件触发时，真正执行的函数
 *  2.1 获取当前事件触发的时间。
 *  2.1 使用当前时间和上次的开始时间以及间隔时间，计算出还剩余多长时间需要去触发事件函数。
 *  2.3 真正触发函数并保留上次触发的时间。
 * 
 * @returns _throttle
 */
function throttle(fn, interval) {
  let lastTime = 0;

  function _throttle(...args) {
    let nowTime = new Date().getTime();

    const remainTime = interval - (nowTime - lastTime);
    if (remainTime <= 0) {
      fn.apply(this, args);

      lastTime = nowTime;
    }
  };

  return _throttle;
};
