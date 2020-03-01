/*
 * @Description: 
 * @Author: George
 * @Date: 2020-03-01 20:16:05
 * @LastEditors: George
 * @LastEditTime: 2020-03-01 21:20:35
 */
const homeDir = require('os').homedir();
const fs = require('fs');
const p = require('path');
const home = process.env.HOME || homeDir;
const todoPath = p.join(home, '.todo');


module.exports.add = (title) => {
  console.log('title', title, home)
  fs.readFile(todoPath, { flag: 'a+' }, (err, data) => {
    if(!err) {
      let list;
      let dataStr = data.toString();
      if(dataStr === '') {
        list = []
      } else {
        list = JSON.parse(dataStr)
      }
      addData = {
        title,
        done: false
      }
      list.push(addData);
      let writeStr = JSON.stringify(list);
      fs.writeFile(todoPath, writeStr, (err2) => {
        if(err2) {
          console.log('写入文件出错', err2)
        }
      })
    } else {
      console.log('报错信息:', err)
    }
  })
}