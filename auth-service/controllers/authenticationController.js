const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios')

const databaseUrl = process.env.DATABASE_MICROSERVICE_URL
const jwtSecret = process.env.JWT_SECRET

const login = async (req, res) => {
  try {
    const { username, password } = req.body

    // Call the database microservice to retrieve the user's password
    const response = await axios.get(`${databaseUrl}/users/login?email=${email}`)
    const user = response.data

    // Check if user exists and the password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    // Generate a JWT token and send it to the client
    const token = jwt.sign({ userId: user._id }, jwtSecret)
    res.json({ token })

  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const verifyToken = async (req, res) => {
  try {
    const decoded = jwt.verify(token, jwtSecret)
    return decoded
  } catch (err) {
    res.status(400).json({ message: 'Malformed token' })
  }
}
