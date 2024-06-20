const {Session} = require('../models')

module.exports = {
    async authSessionRoute  (req, res, next) {
        var session =  await Session.findOne(
            { where: { id: req.body.sessionId } 
        })

        if (session != null) {
            console.log(session.dataValues.expirationDate);
            console.log(session.dataValues.expirationDate >= Date.now());
            console.log(Date.now());
            if (session.dataValues.expirationDate >= Date.now()) {
                next();
                return;
            } else {
                return res.status(401).send({
                    message: "Unauthorized! Expired Token, Logout and Login again",
                });
            }
        } else {
            return res.status(401).send({
            message: "Unauthorized! Expired Token, Logout and Login again",
            });
        }
    }
}
