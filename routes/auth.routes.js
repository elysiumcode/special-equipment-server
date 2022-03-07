const Router = require('express')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/auth.middleware')
const authController = require('../controllers/authController')
const router = new Router()

router.post('/registration',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({min: 3, max: 12})
    ],
    authController.registration
    )

router.post('/login', authController.login)

router.get('/auth', authMiddleware, authController.auth)


module.exports = router