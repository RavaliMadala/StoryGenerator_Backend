module.exports = (sequelize, DataTypes) =>
    sequelize.define('StoryVersionControl', {
        storyTitle: DataTypes.STRING,
        storyId: DataTypes.INTEGER,
        storyVersion: DataTypes.INTEGER,
        storyPrompt: DataTypes.STRING,
        StoryResponse: DataTypes.BLOB,
        userID: DataTypes.STRING,
    },
    {
      initialAutoIncrement: 1000,
    })