const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// Route to get all users
router.get('/users', userController.getAllUsers)

// Route to get a single user
router.get('/users/:id', async (req, res, next) => {
  const id = req.params.id
  req.body.userId = id
  next()
}, userController.getUser)

// Route to create a user
router.post('/users', userController.createUser)

module.exports = router
