const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, _id: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog
      .findById(request.params.id)
      .populate('user', { username: 1, name: 1, _id: 1 })
    if (blog) {
      response.status(200).json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    console.log(error.message)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  try {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    const user = await User.findById(decodedToken.id)
    //const user = (await User.find({}))[0]
    body.user = user._id
    console.log('body:', body)

    const blog = new Blog(body)
    if (blog.likes === undefined) {
      blog.likes = 0
    }

    if (blog.title === undefined) {
      console.log('title missing')
      return response.status(400).json({ error: 'title missing' })
    }
    if (blog.url === undefined) {
      console.log('url missing')
      return response.status(400).json({ error: 'url missing' })
    }

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(200).json(savedBlog)
  } catch (error) {
    console.log(error)
    response.status(500).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const blog = {
      url: request.body.url,
      likes: request.body.likes
    }
    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true })
    if (updatedBlog) {
      console.log('Updated blog:', updatedBlog)
      response.status(200).json(updatedBlog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    console.log(error.message)
    response.status(500).json({ error: error.message })
  }
})
blogsRouter.delete('/:id', async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === decodedToken.id.toString()) {
      await blog.remove()
      response.status(204).end()
    } else {
      response.status(401).end()
    }
  } catch (exception) {
    next(exception)
  }
})
/* blogsRouter.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findByIdAndDelete(request.params.id)
    console.log('Deleting ', blog)
    response.status(204).end()
  } catch (error) {
    console.log(error.message)
  }
}) */
module.exports = blogsRouter

