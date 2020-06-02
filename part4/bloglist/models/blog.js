const mongoose = require('mongoose')
//mongoose.set('useFindAndModify', false)

const blogSchema = new mongoose.Schema({

  title: {
    type: String,
    minlength: 5,
  },
  author: {
    type: String,
  }, url: {
    type: String,
  },  likes: {
    type:  Number,
  },

})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)