const express = require('express')
const app = express()
const authenticationRoutes = require('./routes/authenticationRoutes')


app.use('/', authenticationRoutes)


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
