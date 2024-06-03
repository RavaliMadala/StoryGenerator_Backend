module.exports = (sequelize, DataTypes) =>
    sequelize.define('StoryVersionControl', {
        storyTitle: DataTypes.STRING,
        storyId: DataTypes.INTEGER,
        storyVersion: DataTypes.INTEGER,
        storyPrompt: DataTypes.STRING,
        StoryResponse: DataTypes.BLOB,
        characterName: DataTypes.STRING,
        characterRole: DataTypes.STRING,
        setting: DataTypes.STRING,
        country: DataTypes.STRING,
        language: DataTypes.STRING,
        genre: DataTypes.STRING,
        wordCount: DataTypes.STRING
    },
    {
      initialAutoIncrement: 1000,
    })