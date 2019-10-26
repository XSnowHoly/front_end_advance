const chai = require("chai");
const sinonChai = require("sinon-chai");
const bind2 = require("../src");
chai.use(sinonChai);

Function.prototype.bind2 = bind2;

const assert = chai.assert;

describe("手写bind", () => {
  it("bind是一个函数", () => {
    let test = new Function();
    assert(test instanceof Function);
  });
  it("bind可以绑定this", () => {
    let test = function () {
      return this;
    }
    test.bind2({
      name: 'xsnowholy'
    });
    let newTest = test.bind2({
      name: 'xsnowholy'
    });
    assert(newTest().name === 'xsnowholy')
  })
  it("bind可以接收多个参数: bind(this, p1, p2)", () => {
    let fn = function (p1, p2) {
      return [this, p1, p2]
    }
    let newFn = fn.bind2({
      name: 'xsnowholy'
    }, 123, 345);
    assert(newFn()[0].name = 'xsnowholy');
    assert(newFn()[1] === 123)
    assert(newFn()[2] === 345)
  })
  it("bind绑定后调用时也可以传参数", () => {
    let fn = function (p1, p2) {
      return [this, p1, p2]
    }
    let newFn = fn.bind2({
      name: 'xsnowholy'
    }, 123);
    assert(newFn()[0].name = 'xsnowholy');
    assert(newFn()[1] === 123)
    assert(newFn(345)[2] === 345)
  })
  it("bind 支持new之前绑定变量", () => {
    let fn = function (p1, p2) {
      this.p1 = p1;
      this.p2 = p2;
    }
    let newFn = fn.bind2(null, 123, 345);
    let object = new newFn();
    console.log(object)
    assert(object.p1 === 123);
    assert(object.p2 === 345);
  })
  it("bind的函数new出来的对象原型链是正确的", () => {
    let fn = function (p1, p2) {
      this.p1 = p1;
      this.p2 = p2;
    }
    let sayHi = function () {
      console.log('hi')
    }
    fn.prototype.sayHi = sayHi;
    let newFn = fn.bind2(null, 123, 346);
    let object = new newFn();
    // console.log(object.prototype)
    assert(fn.prototype.isPrototypeOf(object))
    console.log(object.construction)
    assert.isFunction(object.sayHi)
  })
});