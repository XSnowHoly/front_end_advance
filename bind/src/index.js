var slice = Array.prototype.slice;

function bind2() {
    var fn = this, // this 指函数
        asThis = arguments[0];
    var params = slice.call(arguments, 1);
    if (typeof fn !== 'function') {
        throw new Error('bind必须在函数上调用!')
    }

    //result.prototype.isPrototypeOf(this)
    function resultFn() {
        var funArgs = params.concat(slice.call(arguments));
        return fn.apply(this instanceof resultFn ?
            this : asThis, funArgs)
    }
    resultFn.prototype = fn.prototype;
    return resultFn;
}

module.exports = bind2;