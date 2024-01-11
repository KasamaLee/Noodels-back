const express = require('express')

const router = express.Router();

const cartController = require('../controllers/cart-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

router.post('/add', authenticateMiddleware,cartController.addToCart)
router.get('/get', authenticateMiddleware, cartController.getCart)
router.delete('/delete/:id', authenticateMiddleware, cartController.deleteCart)
router.patch('/update/:id', authenticateMiddleware, cartController.updateQuantity)

module.exports = router;