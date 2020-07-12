const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    minlength: 3,
    required: true,
  },
  published: {
    type: Number
  },
   author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres:[{type: String
  }]
})

module.exports = mongoose.model('Book', bookSchema)