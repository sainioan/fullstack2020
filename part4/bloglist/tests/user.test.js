const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
//...

const initalUsers = [
  {
    name: 'TestUser',
    username: 'testuser',
    passwordHash: 'asecret'
  },
  {
    name: 'TestUser2',
    username: 'testuser2',
    passwordHash: 'asecret'
  }
]
describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const usersArray = initalUsers.map(user => new User(user))
    const promiseArray = usersArray.map(user => user.save())

    await Promise.all(promiseArray)
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'somebody',
      name: 'Joe Smith',
      password: 'secret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})
afterAll(() => {
  mongoose.connection.close()
})

