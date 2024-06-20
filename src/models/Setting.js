module.exports = (sequelize, DataTypes) =>
    sequelize.define('Setting', {
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    })