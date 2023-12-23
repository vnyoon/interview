/**
 * 
 * @param {function} fn 需要防抖的事件
 * @param {number} delay 延迟执行的时间(ms)
 * @param {boolean} [immediate = false] 事件函数是否立即触发
 * 
 * 1. 定义一个定时器，保存上一次的定时器
 * 2. 创建返回一个真正执行的函数：
 *  2.1 取消上一次的定时器。
 *  2.2 延迟执行外部传入的的函数(事件)。
 * 
 * 3. 将不定数量的参数放入到一个数组(args)中。
 * 4. 给事件函数绑定this，改变this指向调用者。
 * 
 * 5. 定义立即执行是否已经调用过了的标识(inInvoke = false)。没调用过的话就立即执行传入的事件函数，然后更改标识为true。
 * 6. 立即执行过后，事件再次触发就会进入防抖程序中，当防抖执行完毕，就重置标识状态。这样下次再触发事件就会再走一遍这个流程。
 * 
 * 7. 给真正执行的函数定义一个取消函数属性，取消防抖同时重置标识。
 * 
 * @returns {function} _debounce
 * 
 */
function debounce(fn, delay, immediate = false) {
  let timer = null;
  let inInvoke = false;

  function _debounce(...args) {
    if (timer) clearTimeout(timer);

    if (immediate && !inInvoke) {
      fn.apply(this, args);
      
      inInvoke = true;
    }
    else {
      timer = setTimeout(() => {
        fn.apply(this, args);

        inInvoke = false;
      }, delay);
    }
  };

  _debounce.cancel = function() {
    if (timer) clearTimeout(timer);

    inInvoke = false;
  };

  return _debounce;
};
