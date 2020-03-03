/*
 * @Description: 
 * @Author: George
 * @Date: 2020-03-01 20:16:05
 * @LastEditors: George
 * @LastEditTime: 2020-03-03 21:57:21
 */
const db = require('./db.js');

module.exports.add = async (title) => {
  const list = await db.getData();
  await db.writeData(list, title);
}

module.exports.clear = async () => {
  await db.clear();
  console.log('清除成功!')
}