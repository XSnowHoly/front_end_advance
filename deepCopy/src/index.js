function deepClone(source) {
    let cache = [];
    return baseClone(source)

    function baseClone(source) {
        if (null === source) return null;
        if (source instanceof Object) {
            let dist;
            let cacheDist = findCache(source);  // 查找缓存中是否存在对象，解决环状对象问题
            if (cacheDist) return cacheDist;
            if (source instanceof Array) {
                dist = new Array();
            } else if (source instanceof Function) {
                dist = function () {
                    return source.call(this, ...arguments);
                }
            } else if (source instanceof RegExp) {
                dist = new RegExp(source.source, source.flags);
            } else if (source instanceof Date) {
                dist = new Date(source);
            } else {
                dist = new Object();
            }
            cache.push([source, dist])
            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    dist[key] = baseClone(source[key]);
                }
            }
            return dist;
        }
        return source;
    }

    function findCache(source) {
        for (let i = 0; i < cache.length; i++) {
            if (cache[i][0] === source) {
                return cache[i][1];
            }
        }
        return undefined;
    }
}


module.exports = deepClone;