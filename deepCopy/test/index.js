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
        it('能够复制数组对象', () => {
            let arr = [['唱'], ['跳'], ['Rap']];
            let arr2 = deepClone(arr);
            assert(arr !== arr2);
            assert(arr[0] !== arr2[0]);
            assert(arr[1] !== arr2[1]);
            assert(arr[2] !== arr2[2]);
            assert.deepEqual(arr, arr2);
        });
        it('能够复制函数对象', () => {
            const a = function (x, y) {
                return x + y;
            }
            a.xxx = { yyy: { zzz: 1 } }
            const a2  = deepClone(a);
            assert(a !== a2);
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
            assert(a.xxx.yyy !== a2.xxx.yyy);
            assert(a.xxx !== a2.xxx);
            assert(a(1,2) === a2(1,2));
        });
    });
});