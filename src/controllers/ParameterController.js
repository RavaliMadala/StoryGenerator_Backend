const {CharacterRole, Country, Genre, Language, Setting} = require('../models')
const {authSessionRoute} = require('./sessionController')

module.exports = {

    async getRoles (req, res){
        try {
            const roles = await CharacterRole.findAll({
                Limit:30
              })
            res.send(roles)
        } 
        catch (err) {
            res.status(500).send({
                error: 'An error has occured.'
            })
        }
    },
    async getCountries (req, res){
        try {
            const countries = await Country.findAll()
            res.send(countries)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured.'
            })
        }
    },
    async getGenres (req, res){
        try {
            const genres = await Genre.findAll()
            res.send(genres)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured.'
            })
        }
    },
    async getLanguages (req, res){
        try {
            const languages = await Language.findAll()
            res.send(languages)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured.'
            })
        }
    },
    async getSettings (req, res){
        try {
            const settings = await Setting.findAll()
            res.send(settings)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured.'
            })
        }
    },


    async addRole (req, res) {
      try {
            console.log(req.body)
            const characterRole = await CharacterRole.create({
                name: req.body.name
            })
            res.send(characterRole.toJSON())
        } catch (err) {
            console.log(err)
            res.status(400).send({
            error: 'Account with this username already exist.'
            })
        }
    },
    async addCountry (req, res) {
        try {
            console.log(req.body)
            const country = await Country.create({
                name: req.body.name
            })
            res.send(country.toJSON())
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: 'country already exist.'
            })
        }
    },
    async addGenre (req, res) {
        try {
            console.log(req.body)
            const genre = await Genre.create({
                name: req.body.name
            })
            res.send(genre.toJSON())
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: 'Genre already exist.'
            })
        }
    },
    async addLanguage (req, res) {
        try {
            console.log(req.body)
            const language = await Language.create({
                name: req.body.name
            })
            res.send(language.toJSON())
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: 'Language already exist.'
            })
        }
    },
    async addSetting (req, res) {
        try {
            console.log(req.body)
            const setting = await Setting.create({
                name: req.body.name
            })
            res.send(setting.toJSON())
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: 'Setting already exist.'
            })
        }
    },


    async deleteRole (req, res) {
      try {
        const role = await CharacterRole.destroy({
          where: { id: req.params.id}
        })
        console.log("Deleted")
        res.send({status: "Success", deleted: role})
      } catch (err) {
        res.status(500).send({
          error: 'An error has occured: ' + err
        })
      }
    },
    async deleteCountry (req, res) {
        try {
            const country = await Country.destroy({
                where: { id: req.params.id}
            })
            console.log("Deleted")
            res.send({status: "Success", deleted: country})
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured: ' + err
            })
        }
    },
    async deleteGenre (req, res) {
        try {
          const genre = await Genre.destroy({
            where: { id: req.params.id}
          })
          console.log("Deleted")
          res.send({status: "Success", deleted: genre})
        } catch (err) {
          res.status(500).send({
            error: 'An error has occured: ' + err
          })
        }
    },
    async deleteLanguage (req, res) {
        try {
            const language = await Language.destroy({
                where: { id: req.params.id}
            })
            console.log("Deleted")
            res.send({status: "Success", deleted: language})
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured: ' + err
            })
        }
    },
    async deleteSetting (req, res) {
        try {
            const setting = await Setting.destroy({
                 where: { id: req.params.id}
            })
            console.log("Deleted")
            res.send({status: "Success", deleted: setting})
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured: ' + err
            })
        }
    },
  }
  