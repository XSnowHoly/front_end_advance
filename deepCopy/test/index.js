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
            const a2 = deepClone(a);
            assert(a !== a2);
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
            assert(a.xxx.yyy !== a2.xxx.yyy);
            assert(a.xxx !== a2.xxx);
            assert(a(1, 2) === a2(1, 2));
        });
        it('能够复制环对象', () => {
            const a = { name: 'ckx' };
            a.self = a;
            const a2 = deepClone(a);
            assert(a2 !== a);
            assert(a2.name === a.name);
            assert(a2.self !== a.self);
        });
        xit('不会爆栈', () => {
            let a = { child: null }
            let b = a;
            for (let i = 0; i < 5000; i++) {
                b.child = {
                    child: null
                };
                b = b.child;
            }
            const a2 = deepClone(a);
            assert(a !== a2);
            assert(a.child !== a2.child);
        });
        it('可以复制正则对象', () => {
            let a = /hi\+d/gi;
            a.xxx = {
                yyy: { zzz: '这是一个正则' }
            }
            let a2 = deepClone(a);
            assert(a !== a2);
            assert(a.source === a2.source);
            assert(a.flags === a2.flags);
            assert(a.xxx !== a2.xxx);
            assert(a.xxx.yyy !== a2.xxx.yyy);
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
        })
        it('可以复制日期', () => {
            let a = new Date();
            a.xxx = {
                yyy: { zzz: '这是一个日期' }
            }
            let a2 = deepClone(a);
            assert(a !== a2);
            assert(a.getTime() === a2.getTime());
            assert(a.xxx !== a2.xxx);
            assert(a.xxx.yyy !== a2.xxx.yyy);
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
        })
        it('自动跳过原型属性', () => {
            let a = Object.create({ name: 'a' })
            a.xxx = {
                yyy: { zzz: '这是一个有原型属性name的对象' }
            }
            let a2 = deepClone(a);
            assert.isFalse('name' in a2);
            assert(a !== a2);
            assert(a.xxx !== a2.xxx);
            assert(a.xxx.yyy !== a2.xxx.yyy);
            assert(a.xxx.yyy.zzz === a2.xxx.yyy.zzz);
        })
        it('可以复制很复杂的对象', () => {
            const a = {
                n: NaN,
                n2: Infinity,
                s: '',
                bool: false,
                null: null,
                u: undefined,
                sym: Symbol(),
                o: {
                    n: NaN,
                    n2: Infinity,
                    s: '',
                    bool: false,
                    null: null,
                    u: undefined,
                    sym: Symbol(),
                },
                array: [
                    {
                        n: NaN,
                        n2: Infinity,
                        s: '',
                        bool: false,
                        null: null,
                        u: undefined,
                        sym: Symbol(),
                    },
                ],
                fn: function() {
                    return 'fn';
                },
                date: new Date(),
                reg: /test/ig
            }
            const a2 = deepClone(a);
            assert(a !== a2);
            assert(a.o !== a2.o);
            assert(a.array !== a2.array);
            assert(a.fn !== a2.fn);
            assert(a.date !== a2.date);
            assert(a.reg !== a2.reg);
            assert.isNaN(a2.n);
            assert(a.n2 === a2.n2)
            assert(a.s === a2.s)
            assert(a.bool === a2.bool)
            assert(a.null === a2.null)
            assert(a.u === a2.u)
            assert(a.sym === a2.sym)
            assert.isNaN(a2.o.n);
            assert(a.o.n2 === a2.o.n2)
            assert(a.o.s === a2.o.s)
            assert(a.o.bool === a2.o.bool)
            assert(a.o.null === a2.o.null)
            assert(a.o.u === a2.o.u)
            assert(a.o.sym === a2.o.sym)
        })
    });
});