const express = require('express')
const app = express()
const dotenv = require('dotenv')
const authenticationRoutes = require('./routes/authenticationRoutes')

dotenv.config()

app.use('/', authenticationRoutes)


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
