const express = require('express')
const app = express()
const dotenv = require('dotenv')
const authenticationRoutes = require('./routes/authenticationRoutes')

dotenv.config()
app.use(express.json())

app.use('/', authenticationRoutes)


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`)
})

module.exports = app
