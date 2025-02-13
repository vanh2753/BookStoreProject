const express = require('express')
const router = express.Router();
const { getAllUsers, createUser, getUserById } = require('../controllers/userController')
const { handleRegister, handleLogin } = require('../controllers/authController')
const authToken = require('../middlewares/token')

//router.use(authToken(['admin'])) //áp dụng authToken cho tất cả router

router.get('/users', authToken('admin'), getAllUsers)
router.get('/users/:id', getUserById)
router.post('/users/register', handleRegister)
router.post('/users/login', handleLogin)
module.exports = router;