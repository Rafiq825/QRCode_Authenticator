const Datastore = require('nedb-promises');
const jwt = require('jsonwebtoken')

const userInvalidTokens = Datastore.create('UserInvalidTokens.db')

const config = require('../config/config')

const ensureAuthenticated=async(req, res, next)=>{
    const accessToken = req.headers.authorization

    if (!accessToken) {
        return res.status(401).json({ message: 'Access token not found' })
    }

    if (await userInvalidTokens.findOne({ accessToken })) {
        return res.status(401).json({ message: 'Access token invalid', code: 'AccessTokenInvalid' })
    }

    try {
        const decodedAccessToken = jwt.verify(accessToken, config.accessTokenSecret)

        req.accessToken = { value: accessToken, exp: decodedAccessToken.exp }
        req.user = { id: decodedAccessToken.userId }

        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: 'Access token expired', code: 'AccessTokenExpired' })
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Access token invalid', code: 'AccessTokenInvalid' })
        } else {
            return res.status(500).json({ message: error.message })
        }
    }
};

module.exports=ensureAuthenticated