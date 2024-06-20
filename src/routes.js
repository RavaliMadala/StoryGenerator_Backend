const AuthenticationController = require('./controllers/AuthenticationController')
const StoryController = require('./controllers/StoryController')
const ParameterController = require('./controllers/ParameterController')
const { authSessionRoute} = require('./controllers/sessionController')
var router = require("express").Router();

module.exports=(app) => {
    router.post('/register', AuthenticationController.register)
    router.post('/login', AuthenticationController.login)
    router.get('/users', AuthenticationController.getAllUsers)
    router.get('/user/:id', AuthenticationController.getuser)
    router.delete('/user/:id', AuthenticationController.deleteUser)
    router.patch('/user', AuthenticationController.updateUser)

    router.post('/saveStory', [authSessionRoute], StoryController.saveStory)
    router.get('/Stories/:id', StoryController.getUserStories)
    router.post('/StoryVersion', [authSessionRoute], StoryController.addStoryVersion)
    router.delete('/storyVersion/:id', StoryController.deleteStoryVersion)
    
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

    router.delete('/role/:id', ParameterController.deleteRole)
    router.delete('/country/:id', ParameterController.deleteCountry)
    router.delete('/genre/:id', ParameterController.deleteGenre)
    router.delete('/language/:id', ParameterController.deleteLanguage)
    router.delete('/setting/:id', ParameterController.deleteSetting)

    app.use("/", router)
}
