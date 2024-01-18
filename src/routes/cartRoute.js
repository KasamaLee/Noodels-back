const express = require('express')

const router = express.Router();

const cartController = require('../controllers/cart-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

router.post('/add', authenticateMiddleware,cartController.addToCart)
router.get('/get', authenticateMiddleware, cartController.getCart)
router.patch('/update/:id', authenticateMiddleware, cartController.updateQuantity)
router.delete('/delete/:id', authenticateMiddleware, cartController.deleteCart)

module.exports = router;