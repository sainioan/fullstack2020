const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const  User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users.map(user => user.toJSON()))
})

userRouter.get('/:id', async (request, response) => {

  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user.toJSON())
  } else {
    response.status(404).end()
  }
})

userRouter.post('/', async (request, response) => {
  const body = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    age: body.age,
    passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser.toJSON())


})

userRouter.delete('/:id', async (request, response) => {

  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

userRouter.put('/:id', async (request, response) => {
  const body = request.body

  const user = {
    username: body.username,
    name: body.name,
    age: body.age,

  }

  const updateUser = await User.findByIdAndUpdate(request.params.id, user, { new: true })

  response.status(200).json(updateUser.toJSON())
})

module.exports = userRouter