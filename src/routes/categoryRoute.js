const express = require('express')

const categoryController = require('../controllers/category-controller');

const router = express.Router();
router.post('/add', categoryController.addCategory);
router.get('/get', categoryController.getCategory);

module.exports = router;