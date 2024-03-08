export const debounce = function (func, time = 200, context = this) {
  let timer

  return function (...args) {
    // 取消之前定时器
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    
     timer = setTimeout(() => {
      func.apply(context, args)
    }, time)
  }
}
