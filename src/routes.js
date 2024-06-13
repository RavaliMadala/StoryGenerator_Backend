const AuthenticationController = require('./controllers/AuthenticationController')
const StoryController = require('./controllers/StoryController')
const ParameterController = require('./controllers/ParameterController')
const { authSessionRoute} = require('./controllers/sessionController')
var router = require("express").Router();

module.exports=(app) => {
    router.post('/register', AuthenticationController.register)
    router.post('/login', AuthenticationController.login)
    router.get('/users', AuthenticationController.getAllUsers)
    router.delete('/user/:id', AuthenticationController.deleteUser)

    router.post('/saveStory', [authSessionRoute], StoryController.saveStory)
    router.get('/Stories/:id', StoryController.getUserStories)
    router.post('/StoryVersion', [authSessionRoute], StoryController.addStoryVersion)
    router.delete('/storyVersion/:id',[authSessionRoute], StoryController.deleteStoryVersion)
    
    router.get('/roles', ParameterController.getRoles)
    router.get('/countries', ParameterController.getCountries)
    router.get('/genres', ParameterController.getGenres)
    router.get('/languages', ParameterController.getLanguages)
    router.get('/settings', ParameterController.getSettings)

    router.post('/role', [authSessionRoute], ParameterController.addRole)
    router.post('/country', [authSessionRoute], ParameterController.addCountry)
    router.post('/genre', [authSessionRoute], ParameterController.addGenre)
    router.post('/language', [authSessionRoute], ParameterController.addLanguage)
    router.post('/setting', [authSessionRoute], ParameterController.addSetting)

    router.delete('/role/:id', [authSessionRoute], ParameterController.deleteRole)
    router.delete('/country/:id', [authSessionRoute], ParameterController.deleteCountry)
    router.delete('/genre/:id', [authSessionRoute], ParameterController.deleteGenre)
    router.delete('/language/:id', [authSessionRoute], ParameterController.deleteLanguage)
    router.delete('/setting/:id', [authSessionRoute], ParameterController.deleteSetting)

    app.use("/", router)
}
