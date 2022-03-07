const Router = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const orderController = require('../controllers/orderController')
const router = new Router()

router.post('/', authMiddleware, orderController.create)
router.get('/user', authMiddleware, orderController.getUserOrders)
router.get('/all', authMiddleware, orderController.getAllOrders)
router.delete('/:id', authMiddleware, orderController.delete)


module.exports = router