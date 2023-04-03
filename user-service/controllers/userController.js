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
  }
}
