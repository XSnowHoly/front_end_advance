type Event = (params?: unknown) => void;

class EventHub {
  private cache: { [key: string]: Array<Event> } = {};  // 缓存订阅的事件   
  // {
  //     'xxx事件': [fn1, fn2, fn3]
  // }

  // 把fn 推进this.cache[eventName]数组里
  on(eventName: string, fn: Event) {
    // 如果订阅的事件缓存里不存在任何处理函数，则初始化订阅事件名为一个空数组
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }

  // 依次执行this.cache[eventName]数组里的函数
  emit(eventName: string, params?: unknown) {
    (this.cache[eventName] || []).forEach(fn  => fn(params))
  }

  // 取消订阅的事件
  off(eventName: string, fn: Event) {
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
function indexOf(array: Array<Event> | undefined, item: Event) {
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