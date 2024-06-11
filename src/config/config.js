const path = require('path')

module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'travelproject1',
    user: process.env.DB_USER || 'travelproject1',
    password: process.env.DB_PASS || 'travelproject1',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'db4free.net'
    }
  }
}