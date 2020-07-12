const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    minlength: 3,
    required: true,
  },
  published: {
    typer: Number
  },
   author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres:[{type: String
  }]
})

/* 
bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
 */
module.exports = mongoose.model('Book', bookSchema)