function deepClone(source) {
    if (null === source) {
        return null;
    }
    if (typeof source !== 'object') {
        return source;
    }
    if (source instanceof Object) {
        let dist;
        if (source instanceof Array) {
            dist = new Array();
        } else if(source instanceof Function) {
            dist = function () {
                return source.call(this, ...arguments);
            }
        }
         else {
            dist = new Object();
        }
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                dist[key] = deepClone(source[key]);
            }
        }
        return dist;
    }
}

module.exports = deepClone;