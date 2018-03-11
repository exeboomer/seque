const Sequelize = require('sequelize');

const sequelize = new Sequelize('demo_schema', 'testuser', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
})

const Articles = sequelize.define('articles', {
  slug: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  body: Sequelize.STRING,
}, {
  hooks: {
    beforeValidate: (articles, options) => {
      console.log('beforeValidate')
    },
    afterValidate: (articles, options) => {
      console.log('afterValidate')
    },
    beforeCreate: (articles, options) => {
      console.log('beforeCreate')
    },
    afterCreate: (res) => {
      console.log('afterCreate: Create article with slug', res.dataValues.slug)
    },
  },
})

Articles.sync({
    force: true,
  })
  .then(() => {
    Articles.create({
      slug: 'someslug1',
      title: 'some Title',
      body: 'some body',
    })
  })
  .catch((err) => {
    console.log(err)
  })
