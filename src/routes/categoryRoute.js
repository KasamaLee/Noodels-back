const express = require('express')

const categoryController = require('../controllers/category-controller');

const router = express.Router();
router.post('/add', categoryController.addCategory);
router.get('/get', categoryController.getCategory);
router.patch('/update/:id', categoryController.updateCategory);
router.delete('/delete/:id', categoryController.deleteCategory);

module.exports = router;