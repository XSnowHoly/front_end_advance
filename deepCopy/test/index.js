const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const assert = chai.assert;
const deepClone = require('../src/index');

describe('deepClone', () => {
    it('是一个函数', () => {
        assert.isFunction(deepClone)
    });
    it('能复制基本类型', () => {
        let num = 123;
        let numCopy = deepClone(num);
        let str = '123';
        let strCopy = deepClone(str);
        let empty = undefined;
        let emptyCopy = deepClone(undefined);
        let nullVal = null;
        let nullValCopy = deepClone(nullVal);
        let bool = true;
        let boolCopy = deepClone(bool);
        let sym = Symbol();
        let sym2 = deepClone(sym);
        assert(num === numCopy);
        assert(str === strCopy);
        assert(empty === emptyCopy);
        assert(nullVal === nullValCopy);
        assert(bool === boolCopy);
        assert(sym === sym2);
    });
    describe('对象', () => {
        it('能够复制普通对象', () => {
            let a = { name: 'cxk', skill: { name: '篮球' } };
            let b = deepClone(a);
            assert(a !== b);
            assert(a.name === b.name);
            assert(a.skill !== b.skill);
            assert(a.skill.name === b.skill.name);
        });
    });
});