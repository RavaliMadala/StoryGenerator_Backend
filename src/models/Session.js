module.exports = (sequelize, DataTypes) =>
    sequelize.define('Session', {
        email: {
            type: DataTypes.STRING
          },
        expirationDate: {
            type: DataTypes.DATE
          }
    })
  