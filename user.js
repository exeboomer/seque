const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const sequelize = new Sequelize('demo_schema', 'testuser', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
})

const User = sequelize.define('User', {
  username: Sequelize.TEXT,
  password: Sequelize.TEXT,
}, {
  hooks: {
    afterValidate: (user) => {
      user.password = bcrypt.hashSync(user.password, 8)
    },
  },
})

User.sync({
    force: true,
    logging: console.log,
  })
  .then(() => {
    User.create({
      username: 'myboomer',
      password: 'this is a password !',
    })
  })
  .catch((err) => {
    console.log('err', err)
  })
