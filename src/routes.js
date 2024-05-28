const AuthenticationController = require('./controllers/AuthenticationController')

module.exports=(app) => {
    app.post('/register', 
        AuthenticationController.register)
    app.post('/login',
        AuthenticationController.login)
    app.get('/users',
        AuthenticationController.getAllUsers)
    app.delete('/user/:id',
        AuthenticationController.deleteUser)
}
