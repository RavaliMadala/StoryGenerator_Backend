module.exports = (sequelize, DataTypes) =>
    sequelize.define('Story', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,

        },
        storyTitle: DataTypes.STRING,
        userID: DataTypes.STRING,
    },
    {
      initialAutoIncrement: 1000,
    })