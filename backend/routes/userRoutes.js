const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe, logout, refreshTokenUser} = require('../controllers/userController')
const {protect} = require("../middlewares/authMiddleware");

router.post('/registration', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.post('/logout', logout)
router.get('/refresh', refreshTokenUser)


module.exports = router
