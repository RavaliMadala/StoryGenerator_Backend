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
          }
        })
        var storyReturnFormat = {}
        var storyVersionReturnFormat = []
        if(story != []){
          console.log("Stories found.")
          story.forEach(async element => {
            console.log(storyCount)
            console.log(story.length)
            console.log(element.dataValues)
  
            // clear vlaues on each loop
            storyReturnFormat = {}
            storyVersionReturnFormat = []
  
            var storyversions = await StoryVersionControl.findAll({
              attributes: ['storyTitle', 'storyId', 'storyVersion', 'storyPrompt', 'StoryResponse', 'characterName', 'characterRole', 'setting', 'country', 'language', 'genre', 'wordCount'],
              where: {
                storyId: element.dataValues.id
              }
            })
            if(storyversions != []){
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


      }).then((returnAry)=>{
        res.send({response: returnAry})
      })
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Some issue occured while saving story.'
      })
    }
  },
}