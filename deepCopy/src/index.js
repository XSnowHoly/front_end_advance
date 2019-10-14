let cache = [];
function deepClone(source) {
    if (null === source) {
        return null;
    }
    if (source instanceof Object) {
        let dist;
        let cacheDist = findCache(source);
        if (cacheDist) {
            return cacheDist;
        } else {
            if (source instanceof Array) {
                dist = new Array();
            } else if (source instanceof Function) {
                dist = function () {
                    return source.call(this, ...arguments);
                }
            }
            else {
                dist = new Object();
            }
            cache.push([source, dist])
            for (const key in source) {
                if (source.hasOwnProperty(key)) {
                    dist[key] = deepClone(source[key]);
                }
            }
            return dist;
        }

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

module.exports = deepClone;