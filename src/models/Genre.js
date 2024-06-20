module.exports = (sequelize, DataTypes) =>
    sequelize.define('Genre', {
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    })