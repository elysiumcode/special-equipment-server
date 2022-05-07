const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next()
    }

    try {
        console.log(req.query)
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(411).json({message: 'auth error'})
        }
        user = jwt.verify(token, config.get('secretKey'))
        console.log(token, user)
        req.user = user
        req.token = token
        next()
    }
    catch(e) {
        return res.status(401).json({message: 'auth error'})
    }
}