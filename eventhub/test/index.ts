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
   eventhub.on('testEvent', (params) => {
      called = true;
      console.assert(params === 'redmi note8pro 新品发布')
   });
   eventhub.emit('testEvent', 'redmi note8pro 新品发布');
   setTimeout(() => {
      console.assert(called === true);
      console.log(message)
   })
}

const test3: TestCase = message => {
   const eventhub = new EventHub();
   let called = false;
   const fn1 = () => {
      called = true;
   }
   eventhub.on('testEvent', fn1);
   eventhub.off('testEvent', fn1);
   eventhub.emit('testEvent');
   setTimeout(() => {
      console.assert(called === false);
      console.log(message)
   }, 2000)
}

test1('EventHub可以创建一个对象');
test2('EventHub可以on订阅事件和emit触发事件');
test3('EventHub可以off取消一个订阅事件');
