const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  const likes = () => blogs.map(blog => blog.likes)
  const reducer = (accumulator, currentValue) => accumulator + currentValue


  return blogs.length === 0
    ? 0
    : likes().reduce(reducer)
}

const favoriteBlog = (blogs) => {

  const favorite = blogs.reduce((a,b) => 
    a === null|| b.likes > a.likes ? b:a, null)
  return favorite
}

const mostBlogs = (blogs) => {

  const entryArray = ( _(blogs).countBy('author')
    .entries()
    .max())
  return blogs.length === 0
    ? null : { author: entryArray[0], blogs: entryArray[1] }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}
