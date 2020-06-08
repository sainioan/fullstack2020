const Blog = require('../models/blog')
const User = require('../models/user')
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
const initialUsers = [
  {
   
    username: 'Sunday1',
    name: 'TestUser',
    password: 'asecret'
  },
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
const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}