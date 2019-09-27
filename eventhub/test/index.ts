import EventHub from '../src/index';

type TestCase = (message: string) => void;

const test1: TestCase = message => {
   const eventhub = new EventHub();
   console.assert(eventhub instanceof Object === true, 'EventHub是一个对象');
   console.log(message)
}
   

const test2: TestCase = message => {
   const eventhub = new EventHub();
   let called = false;
   eventhub.on('xxx', (params) => {
      called = true;
      console.assert(params === '呵呵')
   });
   eventhub.emit('xxx', '呵呵');
   setTimeout(() => {
      console.assert(called === true);
      console.log(message)
   })
}

const test3: TestCase = message => {
   const eventhub = new EventHub();
   let called2 = false;
   const fn1 = () => {
      called2 = true;
   }
   eventhub.on('xxx', fn1);
   eventhub.off('xxx', fn1);
   eventhub.emit('xxx');
   setTimeout(() => {
      console.assert(called2 === false);
      console.log(message)
   }, 2000)
}

test1('EventHub可以创建一个对象');
test2('EventHub可以on订阅事件和emit触发事件');
test3('EventHub可以off取消一个订阅事件');
