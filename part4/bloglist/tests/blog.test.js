const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
test('blogss are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
const initialBlogs = [
  {
    'title': 'HappyCodingBlog',
    'author': 'Carlie the Coder',
    'url': 'http://happycoders.com',
    'likes': 550000
  },
  {
    'title': 'HappyRunningBlog',
    'author': 'Rita the Runner',
    'url': 'http://happyrunners.com',
    'likes': 1110000
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})
afterAll(() => {
  mongoose.connection.close()
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(titles).toContain(
    'HappyRunningBlog'
  )
})