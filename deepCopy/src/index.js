function deepClone(source) {
    let cache = [];         // 创建一个缓存对象的数组
    const typeInitMap = {   // 支持初始化的类型map
        object: () => ({}),
        array: () => [],
        function: fn => (...arg) => fn(...arg),
        date: date => new Date(date),
        regexp: reg => new RegExp(reg.source, reg.flags)
    }

    function getType(data) {
        if (arguments.length === 0) return new Error('没有接收到参数')
        var typeStr = Object.prototype.toString.call(data)
        return typeStr.match(/\[object (.*?)\]/)[1].toLowerCase()
    }

    function baseClone(source) {
        const sourceType = getType(source);
        if (sourceType in typeInitMap) {
            let copySource;
            let cacheSource = findCache(source); // 查找缓存中是否存在对象,解决环状对象问题
            if (cacheSource) return cacheSource;   // 如果目标对象存在缓存中,则直接返回缓存中的复制的对象
            copySource = typeInitMap[sourceType](source);
            cache.push([source, copySource])
            for (const key in source) {            // 递归遍历对象,子元素为对象时继续执行深拷贝
                if (source.hasOwnProperty(key)) {
                    copySource[key] = baseClone(source[key]);
                }
            }
            return copySource;
        }
        return source;
    }

    // 查找缓存中是否存在目标对象, 如果存在目标对象, 返回复制的目标对象
    function findCache(source) {
        for (let i = 0; i < cache.length; i++) {
            if (cache[i][0] === source) {
                return cache[i][1];
            }
        }
        return undefined;
    }

    return baseClone(source)
}


module.exports = deepClone;