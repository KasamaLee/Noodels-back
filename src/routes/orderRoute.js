const express = require('express')

const router = express.Router();

const orderController = require('../controllers/order-controller')
const uploadMiddleware = require('../middlewares/upload')
const authenticateMiddleware = require('../middlewares/authenticate')

router.post('/create', authenticateMiddleware, uploadMiddleware.single('image'), orderController.createOrder)
router.get('/get', authenticateMiddleware, orderController.getOrder)

module.exports = router;