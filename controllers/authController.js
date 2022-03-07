const {validationResult} = require('express-validator')
const authService = require('../services/authService')

class UserController {
    async registration(req,  res) {
        try {
            const errors = validationResult(req.body)
            if(!errors.isEmpty()) {
                return res.status(401).json({message: 'Incorrect request', errors})
            }

            const {email, password} = req.body
            const user = await authService.create(email, password)
            console.log('user ', user)
    
            if(!user) {
                return res.status(402).json({message: 'user already exists'})
            }
    
            return res.json({message: 'user was created', user})
        }
        catch (e) {
            console.log(e)
            res.send({message: 'server error'})
        }
    }

    async login(req,  res) {
        try {

            console.log(req.body)

            const {email, password} = req.body
            const {isPassValid, user, token} = await authService.login(email, password)
            console.log(user)

            if(!user) {
                return res.status(401).json({message: 'user doesnt exists'})
            }

            if(!isPassValid) {
                return res.status(402).json({message: 'invalid password'})
            }

            return res.json({
                token,
                user
            })
        }
        catch (e) {
            console.log(e)
            res.send({message: 'server error'})
        }
    }

    async auth (req,  res) {
        try {
            console.log(req.user.id)
            const user = await authService.findUserById(req.user.id)
            if(!user) return res.status(400).json({message: 'token error'})
            return res.json({
                token: req.token,
                user
            })
        }
        catch (e) {
            console.log(e)
            res.send({message: 'server error'})
        }
    }
}

module.exports = new UserController()