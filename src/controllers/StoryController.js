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
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Some issue occured while saving story.'
      })
    }
  }
}
