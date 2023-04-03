const axios = require('axios')

const databaseUrl = process.env.DATABASE_SERVICE_URL

const getUser = async (req, res) => {
  try {
    const { userId } = req.body

    if (typeof userId != 'number' || userId < 0) {
      return res.status(400)
    }

    const response = await axios.get(`${databaseUrl}/users/${userId}`)
    const user = response.data

    if (!user) {
      return res.status(404)
    }

    return res.status(201).json({ userId: user._id, username: user.username })
  } catch(err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const response = await axios.get(`${databaseUrl}/users/`)
    const users = response.data.map(user => { userId: user._id, username: user.username })

    return res.status(200).json(users)
  } catch(err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password || username.length < 3 || password.length < 3) {
      return res.status(400).json({ message: 'Invalid username or password' })
    }

    const response = await axios.post(`${databaseUrl}/users?username=${username}&password=${password}`)
    const user = response.data
  } catch(err) {
    if (err.response && err.response.status === 409) {
      res.status(409).json({ message: 'Username is taken' })
    } else {
      console.error(err)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
}

module.exports = {
  getUser,
  getAllUsers,
  createUser,
}
