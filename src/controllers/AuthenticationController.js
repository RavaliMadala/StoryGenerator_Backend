const {User} = require('../models')

module.exports = {
  async register (req, res) {
    try {
      console.log(req.body)
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Account with this username already exist.'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordVaild = password === user.password
      if (!isPasswordVaild) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      res.send(user.toJSON())
      
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  },
  async getAllUsers (req, res) {
    try {
      const user = await User.findAll({
        Limit:30
      })
      console.log("Found User")
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to get user'
      })
    }
  },
  async deleteUser (req, res) {
    try {
      const user = await User.destroy({
        where: { id: req.params.id}
      })
      console.log("Deleted User")
      res.send({status: "Success", deletedUser: user})
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete User: ' + err
      })
    }
  }
}
