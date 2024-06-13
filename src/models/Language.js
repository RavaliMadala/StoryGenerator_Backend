module.exports = (sequelize, DataTypes) =>
    sequelize.define('Language', {
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    })