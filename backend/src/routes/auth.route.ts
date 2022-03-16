import express from 'express';
const router = express.Router()

const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/login', authController.showLogin)
router.post('/login', authController.login)
router.get('/register', authController.showRegister)
router.post('/register',authMiddleware.checkDuplicateEmail, authController.register)
// router.post('/refresh-token',authController.requestRefreshToken)

module.exports = router