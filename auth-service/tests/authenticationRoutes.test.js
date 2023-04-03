const supertest = require('supertest')
const sinon = require('sinon')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const axios = require('axios')
const app = require('../app')
const authController = require('../controllers/authenticationController')

const api = supertest(app)

let fakeUser
let getStub

beforeAll(() => {
  fakeUser = {
    _id: '1234',
    username: 'testuser',
    password: 'testpassword',
  }
})

beforeEach(() => {
  getStub = sinon.stub(axios, 'get')
})

afterEach(() => {
  getStub.restore()
})

describe('POST /login', () => {
  it('should return a 200 with a jwt token after a successful login', async () => {
    const hashedPassword = await bcrypt.hash(fakeUser.password, 10)
    const getData = { ...fakeUser, password: hashedPassword }
    getStub.resolves({ data: getData })

    const res = await api
          .post('/login')
          .send(fakeUser)

    expect(res.statusCode).toEqual(200)
    expect(res.body.token).toBeDefined()
  })

  it('should return a 401 when a user is not found in the database', async () => {
    getStub.resolves({ data: null })
    const res = await api
          .post('/login')
          .send(fakeUser)

    expect(res.statusCode).toEqual(401)
  })

  it('should return a 401 when the user exists but the password is wrong', async () => {
    const hashedPassword = await bcrypt.hash('differentpassword', 10)
    const getData = { ...fakeUser, password: hashedPassword }
    getStub.resolves({ data: getData })

    const res = await api
          .post('/login')
          .send(fakeUser)

    expect(res.statusCode).toEqual(401)
  })
})

describe('POST /verifyToken', () => {
  it('should return a 200 and the user id if a token is valid', async () => {
    const hashedPassword = await bcrypt.hash(fakeUser.password, 10)
    const getData = { ...fakeUser, password: hashedPassword }
    getStub.resolves({ data: getData })

    const loginRes = await api
          .post('/login')
          .send(fakeUser)

    const { token } = loginRes.body

    const res = await api
          .post('/verifyToken')
          .send({ token })

    expect(res.statusCode).toEqual(200)
    expect(res.body.decodedToken.userId).toEqual(fakeUser._id)
  })

  it('should return a 400 for a malformed token', async () => {
    const malformedToken = 'token'

    const res = await api
          .post('/verifyToken')
          .send({ token: malformedToken })

    expect(res.statusCode).toEqual(400)
  })
})
