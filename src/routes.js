const AuthenticationController = require('./controllers/AuthenticationController')
const StoryController = require('./controllers/StoryController')

module.exports=(app) => {
    app.post('/register', 
        AuthenticationController.register)
    app.post('/login',
        AuthenticationController.login)
    app.get('/users',
        AuthenticationController.getAllUsers)
    app.delete('/user/:id',
        AuthenticationController.deleteUser)
    app.post('/saveStory', 
        StoryController.saveStory)
    app.get('/Stories/:id', 
        StoryController.getUserStories)
    app.post('/StoryVersion', 
        StoryController.addStoryVersion)
}
