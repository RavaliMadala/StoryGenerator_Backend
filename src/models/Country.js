module.exports = (sequelize, DataTypes) =>
    sequelize.define('Country', {
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    })