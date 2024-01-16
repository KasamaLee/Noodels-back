const express = require('express')

const app = express();
const router = express.Router();

const authController = require('../controllers/auth-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/googleLogin', authController.googleLogin)
router.patch('/update/profile', authenticateMiddleware, authController.updateProfile)
router.patch('/update/password', authenticateMiddleware, authController.updatePassword)
router.get('/me', authenticateMiddleware, authController.getMe)

module.exports = router;