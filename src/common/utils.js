export function  debounce(func,delay) {
  let timer = null
  return function(...args) {
    if(timer) clearTimeout(timer) // 如果timer有值，取消掉
    timer = setTimeout(() =>{
      func.apply(this,args)
    },delay)
  }
}
