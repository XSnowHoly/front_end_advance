var slice = Array.prototype.slice;

function bind2() {
    var fn = this,
        asThis = arguments[0];
    var params = slice.call(arguments, 1);
    if (typeof fn !== 'function') {
        throw new Error('bind必须在函数上调用!')
    }
    return function () {
        var funArgs = params.concat(slice.call(arguments));
        return fn.apply(asThis, funArgs)
    }
}

module.exports = bind2;