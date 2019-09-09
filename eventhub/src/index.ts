class EventHub {
    cache = {};  // 缓存订阅的事件   
    // {
    //     'xxx事件': [fn1, fn2, fn3]
    // }
    on(eventName, fn) {
        // 把fn 推进this.cache[eventName]数组里
        // 如果订阅的事件缓存里不存在任何处理函数，则初始化订阅事件名为一个空数组
        if(this.cache[eventName] === undefined) {
            this.cache[eventName] = [];
        }
        let eventArray = this.cache[eventName];
        eventArray.push(fn);
    }
    emit(eventName) {
        // 依次执行this.cache[eventName]数组里的函数
        let eventArray = this.cache[eventName];
        if(eventArray === undefined) {
            eventArray = [];
        }
        eventArray.forEach(fn => {
            fn();
        })
    }
}

export default EventHub;