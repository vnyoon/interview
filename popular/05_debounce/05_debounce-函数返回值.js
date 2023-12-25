/**
 * 
 * @param {function} fn 需要防抖的事件
 * @param {number} delay 延迟执行的时间(ms)
 * @param {boolean} [immediate = false] 事件函数是否立即触发
 * @param {function} resultCallback 回调函数接收用事件触发函数的返回值
 * 
 * 8. 通过回调函数接收并传出真正执行事件函数的返回值。
 * 9. 通过Promise传出函数返回值。
 * 
 * @returns {function} _debounce
 * 
 */
function debounce(fn, delay, immediate = false, resultCallback) {
  let timer = null;
  let inInvoke = false;

  function _debounce(...args) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer);

      if (immediate && !inInvoke) {
        const result = fn.apply(this, args);
        
        inInvoke = true;

        if (resultCallback && typeof resultCallback === 'function') resultCallback(result);
        resolve(result);
      }
      else {
        timer = setTimeout(() => {
          const result = fn.apply(this, args);

          inInvoke = false;

          if (resultCallback && typeof resultCallback === 'function') resultCallback(result);
          resolve(result);
        }, delay);
      }
    })
  };

  _debounce.cancel = function() {
    if (timer) clearTimeout(timer);

    inInvoke = false;
  };

  return _debounce;
};
