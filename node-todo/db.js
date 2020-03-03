/*
 * @Description: 
 * @Author: George
 * @Date: 2020-03-03 21:40:14
 * @LastEditors: George
 * @LastEditTime: 2020-03-03 21:55:18
 */
const homeDir = require('os').homedir();
const fs = require('fs');
const p = require('path');
const home = process.env.HOME || homeDir;
const todoPath = p.join(home, '.todo');

module.exports.getData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(todoPath, { flag: 'a+' }, (err, data) => {
      if(err) return reject(err);
        let list;
        let dataStr = data.toString();
        if(dataStr === '') {
          list = []
        } else {
          list = JSON.parse(dataStr)
        }
        resolve(list)
    })
  })
}

module.exports.writeData = (list, title) => {
  const addData = {
    title,
    done: false
  }
  list.push(addData);
  let writeStr = JSON.stringify(list);
  return new Promise((resolve, reject) => {
    fs.writeFile(todoPath, writeStr, (err) => {
      if(err) return reject(err);
      resolve('ok')
    })
  })
}

module.exports.clear = () => {
  return new Promise((resolve, reject) => {
    fs.writeFile(todoPath, '', (err) => {
      if(err) return reject(err);
      resolve('ok')
    })
  })
}
