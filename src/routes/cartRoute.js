const express = require('express')

const router = express.Router();

const cartController = require('../controllers/cart-controller')

router.add('/add', cartController.addToCart)

module.exports = router;