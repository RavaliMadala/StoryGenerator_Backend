const {User, Session} = require('../models')

module.exports = {
  async register (req, res) {
    try {
      console.log(req.body)
      const exUser = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      console.log(exUser)

      if (exUser != null && exUser.dataValues != null) {
      console.log(exUser)

        return res.send({
          status: "NotOK",
          error: 'Account with this email already exist.'
        })
      }

      const user = await User.create(req.body)
      res.send({
        status: "OK",
        data: user.toJSON()})
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

      let expireTime = new Date();
      expireTime.setDate(expireTime.getDate() + 1);
      console.log("ex time" + expireTime)
      const session = await Session.create({
        email: user.email,
        expirationDate: expireTime
      })
      console.log("Session after")

      if(session){
        console.log("return" + session)
        res.send({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          permission: user.permission,
          sessionId: session.id
        })
      }
      else{
        res.status(500).send({
          error: 'Failed to create New Session'
        })
      }

      
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  },
  async getAllUsers (req, res) {
    try {
      const user = await User.findAll({
        where: { permission : "User"},
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
        where: { email: req.params.id}
      })
      console.log("Deleted User")
      res.send({status: "Success", deletedUser: user})
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete User: ' + err
      })
    }
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOne({
        where: { email: req.body.email}
      })
      if(user != null){
        console.log("found User")
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.phoneNumber = req.body.phoneNumber
        user.gender = req.body.gender
        if(req.body.password != null && req.body.password != ""){
          user.password = req.body.password
        }
        console.log("set User")
        await user.save()
        console.log("Update User")
        res.send({status: "Success", updatedUser: user})
      }
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to update User: ' + err
      })
    }
  },
  async getuser (req,res) {
    try {
      const user = await User.findOne({
        where: {
          email: req.params.id
        }
      })
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured'
      })
    }
  }
}
