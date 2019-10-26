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
});