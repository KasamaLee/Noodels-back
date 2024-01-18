const express = require("express");

const router = express.Router();

const productController = require('../controllers/product-controller')
const uploadMiddleware = require('../middlewares/upload')
const authenticateMiddleware = require('../middlewares/authenticate')
const authenticatedUser = require('../middlewares/authenticatedUser')
const authenticatedAdmin = require('../middlewares/authenticatedAdmin')

router.get('/get', productController.getProduct)
router.post('/add', authenticateMiddleware, authenticatedAdmin, uploadMiddleware.single('image'), productController.addProduct)
router.patch('/update/:id', authenticateMiddleware, authenticatedAdmin, uploadMiddleware.single('image'), productController.updateProduct)
router.delete('/delete/:id', authenticateMiddleware, authenticatedAdmin, productController.deleteProduct)


module.exports = router;