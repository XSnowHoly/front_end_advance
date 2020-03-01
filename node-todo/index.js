/*
 * @Description: 
 * @Author: George
 * @Date: 2020-03-01 11:13:37
 * @LastEditors: George
 * @LastEditTime: 2020-03-01 11:42:22
 */
const program = require('commander');

program
  .option('-x, --xxx', 'this is xxx')
program
  .command('add')
  .description('add a task')
  .action((command, arg) => {
    // let str = arg.slice(0, -1).join(' ')
    // console.log(arg)
    let str = arg.join(' ');
    console.log(str)
  })
program
  .command('clear')
  .description('clear task')
  .action((x) => {
    console.log('clear task')
  })

program.parse(process.argv);