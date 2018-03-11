const Sequelize = require('sequelize');

const sequelize = new Sequelize('demo_schema', 'testuser', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
})

const Post = sequelize.define('post', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
  approved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
})

Post
  .sync({
    force: true,
  })
  .then(() => {
    const req = {
      body: {
        approved: true,
        title: 'Some title1',
        body: 'Somy body1',
      },
    }
    Post.create(req.body, {
      fields: ['title', 'body']
    }).then((insertedPost) => {
      console.log(insertedPost.dataValues)
    })
  })
