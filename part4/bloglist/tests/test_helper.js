const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}