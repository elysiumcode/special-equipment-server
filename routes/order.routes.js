const Router = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const orderController = require('../controllers/orderController')
const router = new Router()

router.post('/', authMiddleware, orderController.create)
router.get('/user', authMiddleware, orderController.getUserOrders)
router.get('/all', authMiddleware, orderController.getAllOrders)
router.get('/filtered', authMiddleware, orderController.getFilteredOrders)
router.delete('/:id', authMiddleware, orderController.delete)


module.exports = router