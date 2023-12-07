const express = require('express')

const app = express();
const router = express.Router();

const authController = require('../controllers/auth-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/me', authenticateMiddleware, authController.getMe)

module.exports = router;