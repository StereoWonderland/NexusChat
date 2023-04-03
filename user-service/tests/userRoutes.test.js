const supertest = require('supertest')
const sinon = require('sinon')

describe('POST /users', () => {
  test.todo('should return a 201 if user creation is successful')
  test.todo('should return a 409 if the username is taken')
  test.todo('should return a 400 if the username or password is invalid')
})

describe('GET /users/:id', () => {
  test.todo('should return a 200 along with the id a username if the user exists')
  test.todo('should return a 404 if the user does not exist')
  test.todo('should return a 400 if the id is invalid')
})

describe('GET /users', () => {
  test.todo('should return a 200 along with a list of all ids and usernames')
})
