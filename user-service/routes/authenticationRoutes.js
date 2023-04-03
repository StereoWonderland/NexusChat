const express = require('express')
const router = express.Router()
const authenticationController = require('../controllers/authenticationController')

// Route for user login
router.post('/login', authenticationController.login)

// Route for verifying access token
router.post('/verifyToken', authenticationController.verifyToken)

module.exports = router
