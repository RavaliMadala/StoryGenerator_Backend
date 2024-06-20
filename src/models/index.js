const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
)

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize,Sequelize.DataTypes)
    db[model.name] = model
  })


  db.sequelize = sequelize
  db.Sequelize = Sequelize

  db.Setting.hasMany(db.StoryVersionControl)
  db.StoryVersionControl.belongsTo(db.Setting)

  db.Language.hasMany(db.StoryVersionControl)
  db.StoryVersionControl.belongsTo(db.Language)

  db.CharacterRole.hasMany(db.StoryVersionControl)
  db.StoryVersionControl.belongsTo(db.CharacterRole)

  db.Country.hasMany(db.StoryVersionControl)
  db.StoryVersionControl.belongsTo(db.Country)

  db.Genre.hasMany(db.StoryVersionControl)
  db.StoryVersionControl.belongsTo(db.Genre)

  db.Story.hasMany(db.StoryVersionControl)
  db.StoryVersionControl.belongsTo(db.Story)

  module.exports = db