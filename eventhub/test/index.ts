import EventHub from '../src/index';

const eventhub = new EventHub();

console.assert(eventhub instanceof Object === true, 'EventHub是一个对象');

let called = false;
eventhub.on('xxx', ()=> {
   called = true;
   console.log('called: ' + called);
});

eventhub.emit('xxx');