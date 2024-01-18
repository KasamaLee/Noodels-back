const express = require('express')

const router = express.Router();

const orderController = require('../controllers/order-controller')
const uploadMiddleware = require('../middlewares/upload')
const authenticateMiddleware = require('../middlewares/authenticate')
const authenticatedUser = require('../middlewares/authenticatedUser')
const authenticatedAdmin = require('../middlewares/authenticatedAdmin')

router.post('/create', authenticateMiddleware, authenticatedUser, uploadMiddleware.single('image'), orderController.createOrder)
router.get('/get', authenticateMiddleware, authenticatedUser, orderController.getOrder)

router.get('/getAll', authenticateMiddleware, authenticatedAdmin, orderController.getAllOrders)
router.patch('/updateStatus', authenticateMiddleware, authenticatedAdmin, orderController.updateStatus)

module.exports = router;