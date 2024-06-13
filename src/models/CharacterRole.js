module.exports = (sequelize, DataTypes) =>
    sequelize.define('CharacterRole', {
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    })