// 防抖
export function debounce (func, delay = 50) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 时间戳转换（此函数不包含 12小时制）
export function formatDate (date, fmt) {
  // 1、获取年份
  if (/(y+)/.test(fmt))
  {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o)
  {
    if (new RegExp(`(${k})`).test(fmt))
    {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

// 格式化每一位上的值
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}
