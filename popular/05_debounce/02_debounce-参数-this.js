/**
 * 
 * @param {function} fn 需要防抖的事件
 * @param {number} delay 延迟执行的时间(ms)
 * 
 * 1. 定义一个定时器，保存上一次的定时器
 * 2. 创建返回一个真正执行的函数：
 *  2.1 取消上一次的定时器。
 *  2.2 延迟执行外部传入的的函数(事件)。
 * 
 * 3. 将不定数量的参数放入到一个数组(args)中。
 * 4. 给事件函数绑定this，改变this指向调用者。
 * 
 * @returns {function} _debounce
 * 
 */
function debounce(fn, delay) {
  let timer = null;

  function _debounce(...args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };

  return _debounce;
};
