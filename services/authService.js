const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('config')


class authService {
    async create(email, password) {
        const exists = await User.findOne({email})
        if(!exists) {
            const hashPassword = await bcrypt.hash(password, 8)
            const user = await new User({email, password: hashPassword})
            await user.save()
            console.log('reg', user)

            return user
        }
        else return false
    }

    async login(email, password) {
        const user = await User.findOne({email})
        console.log(user, password)
        let isPassValid
        let token
        if(user) {
            isPassValid = bcrypt.compare(password, user.password)
            token = jwt.sign({id: user.id}, config.get('secretKey'), {expiresIn: '1h'})   
        }

        return {isPassValid, user, token}
    }

    async findUserById(id) {
        return User.findOne({_id: id})
    }
}

module.exports =  new authService()