const express = require("express");

const router = express.Router();

const productController = require('../controllers/product-controller')
const uploadMiddleware = require('../middlewares/upload')

router.get('/get', productController.getProduct)
router.post('/add',uploadMiddleware.single('image'), productController.addProduct)
router.patch('/update/:id',uploadMiddleware.single('image'), productController.updateProduct)


module.exports = router;