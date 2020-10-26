var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '192.168.99.100',
  user     : 'root',
  password : '123456',
});

connection.connect();

connection.query('CREATE DATABASE IF NOT EXISTS sky DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;', function (error, results, fields) {
  if (error) throw error;
  console.log('创建数据库');
  console.log(results);
});

connection.query('use sky');
connection.query(`CREATE TABLE IF NOT EXISTS user(
  name text,
  age int
);`, function (error, results, fields) {
  if (error) throw error;
  console.log('创建表');
  console.log(results);
});

connection.end();