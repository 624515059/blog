const User = require('./db').User

module.exports = {

    login(user){
        return User.findOne(user)
    }

}