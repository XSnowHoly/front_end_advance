class EventHub {
  private cache = {};  // 缓存订阅的事件   
  // {
  //     'xxx事件': [fn1, fn2, fn3]
  // }
  on(eventName, fn) {
    // 把fn 推进this.cache[eventName]数组里
    // 如果订阅的事件缓存里不存在任何处理函数，则初始化订阅事件名为一个空数组
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }
  emit(eventName, params?) {
    // 依次执行this.cache[eventName]数组里的函数
    (this.cache[eventName] || []).forEach(fn => fn(params))
  }
  off(eventName, fn) {
    let index = indexOf(this.cache[eventName], fn);
    index !== -1 && this.cache[eventName].splice(index, 1);
  }
}

export default EventHub;

/**
 * 帮助函数
 * @param array 
 * @param item 
 */
function indexOf(array, item) {
  if(array === undefined) return -1;
  let index = -1;
  for(let i = 0; i<array.length; i++) {
    if(array[i] === item) {
      index = i;
      break;
    }
  }
  return index;
}