const mongoose = require('mongoose')


const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    minlength: 3,
    required: true,
  },  
  born: {
    type: Number,
  },
   books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
})

/* authorSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
}) */

module.exports = mongoose.model('Author', authorSchema)
