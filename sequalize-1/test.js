const {
  Sequelize,
  Model,
  DataTypes
} = require('sequelize');
const sequelize = new Sequelize('sky', 'root', '123456', {
  host: '192.168.99.100',
  dialect: 'mysql'
});

class User extends Model {}
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, {
  sequelize,
  modelName: 'user'
});

// 创建数据
// (async () => {
//   await sequelize.sync();
//   const jane = await Student.create({
//     username: 'janedoe',
//     birthday: new Date(1980, 6, 20)
//   });
//   console.log(jane.toJSON());
// })();

(async () => {
  User.destroy({
    where: {
      id: 1
    }
  });
  const users = await User.findAll();
  console.log(users.every(users => users instanceof User)); // true
  console.log("All users:", JSON.stringify(users, null));
  sequelize.close();
})()