const {Story, StoryVersionControl} = require('../models')

module.exports = {
  async saveStory (req, res) {
    try {
        console.log(req.body)
        const existingStory = await Story.findOne({
            where: {
                storyTitle: req.body.title,
                userID: req.body.userID
            }
          })

        if (existingStory) {
            console.log("Story already exsist.")
            return res.status(403).send({
              error: 'Story with Title already exsist.'
            })
        }

        const story = await Story.create({
            storyTitle: req.body.title,
            userID: req.body.userID
        })

        if(story){
            console.log("Story Create.")
            const storyVersion = await StoryVersionControl.create({
                storyTitle: req.body.title,
                storyId: story.id,
                storyVersion: 1,
                storyPrompt: req.body.storyPrompt,
                StoryResponse: req.body.StoryResponse,
                characterName: req.body.characterName,
                characterRole: req.body.characterRole,
                setting: req.body.setting,
                country: req.body.country,
                language: req.body.language,
                genre: req.body.genre,
                wordCount: req.body.wordCount,
            })
            if(storyVersion){
                console.log("Story Version control Create.")
                res.send(storyVersion.toJSON())
            }
        }
        else{
            console.log(err)
            res.status(400).send({
                error: 'Some issue occured while saving story.'
            })
        }
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Some issue occured while saving story.'
      })
    }
  },
  async getUserStories (req, res) {
    try {
      console.log(req.params.id)
      var returnAry = []
      var storyCount = 0;
      await new Promise( async (resolve) => {

        var story = await Story.findAll({
          attributes: ['id', 'storyTitle', 'userID'],
          where: {
              userID: req.params.id
          },
          order: [
            ['id', 'DESC'],
          ]
        })
        var storyReturnFormat = {}
        var storyVersionReturnFormat = []
        console.log(story)
        if(story != null && story.length > 0){
          console.log("Stories found.")
          story.forEach(async element => {
            console.log(storyCount)
            console.log(story.length)
            console.log(element.dataValues)
  
            // clear vlaues on each loop
            storyReturnFormat = {}
            storyVersionReturnFormat = []
  
            var storyversions = await StoryVersionControl.findAll({
              attributes: ['storyTitle', 'storyId', 'storyVersion', 'storyPrompt', 'StoryResponse', 'characterName', 'characterRole', 'setting', 'country', 'language', 'genre', 'wordCount', 'id'],
              where: {
                storyId: element.dataValues.id
              },
              order: [
                ['storyVersion', 'ASC'],
              ]
            })
            if(storyversions != null && storyversions.length > 0){
              storyVersionReturnFormat = []
              storyversions.forEach(element1 => {
                element1.dataValues.StoryResponse = element1.dataValues.StoryResponse.toString('utf8')
                storyVersionReturnFormat.push(element1.dataValues)
              });
              storyReturnFormat = {
                id:element.dataValues.id,
                storyTitle:element.dataValues.storyTitle,
                userID:element.dataValues.userID,
                versions: storyVersionReturnFormat
              }
  
              returnAry.push(storyReturnFormat)
              console.log(returnAry[0].id)
              console.log("push.")
              //res.send({response: returnAry})
              storyCount++
            }
            if(storyCount == story.length){
            console.log(story.length)
            resolve(returnAry)
            }
          })
        }
        else{
          res.send({status:false, response: "No Stories found"})
        }
      }).then((returnAry)=>{
        res.send({status:true, response: returnAry})
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Some issue occured while saving story.'
      })
    }
  },
  async addStoryVersion (req,res) {
    var storyversions = await StoryVersionControl.findOne({
      attributes: ['storyVersion'],
      where: {
        storyId: req.body.storyId
      },
      order: [
        ['storyVersion', 'DESC'],
      ]
    })
    if(storyversions != null){
      console.log(storyversions.dataValues.storyVersion)

      console.log("Story version Create.")
        const storyVersion = await StoryVersionControl.create({
          storyTitle: req.body.title,
          storyId: req.body.storyId,
          storyVersion: storyversions.dataValues.storyVersion + 1,
          storyPrompt: req.body.storyPrompt,
          StoryResponse: req.body.StoryResponse,
          characterName: req.body.characterName,
          characterRole: req.body.characterRole,
          setting: req.body.setting,
          country: req.body.country,
          language: req.body.language,
          genre: req.body.genre,
          wordCount: req.body.wordCount,
        })
        if(storyVersion){
          console.log("Story Version control Create.")
          res.send(storyVersion.toJSON())
        }
    }
  },
  async deleteStoryVersion (req, res) {
    try {
      const storyVersionControl = await StoryVersionControl.destroy({
        where: { id: req.params.id}
      })
      console.log("Deleted Story")
      res.send({status: "Success", deletedUser: storyVersionControl})
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete User: ' + err
      })
    }
  }
}
