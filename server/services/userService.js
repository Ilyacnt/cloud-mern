const jwt = require('jsonwebtoken')
const config = require('config')

class UserService {

    generateUserToken(user) {
        const token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: config.get('tokenExpiresIn')})
        return token
    }
}

module.exports = new UserService()