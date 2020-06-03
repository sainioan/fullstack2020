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

  const blogArray = ( _(blogs).countBy('author')
    .entries()
    .max())
  return blogs.length === 0
    ? null : { author: blogArray[0], blogs: blogArray[1] }
}

const mostLikes = (blogs) => {

  const blogArray = (_(blogs)

    .chain(blogs)
    .groupBy('author')
    .map((likes, author) => ({ 'author': author, 'likes': _.sumBy(likes, 'likes') }))
    .sortBy('likes')
    .last()
    .value())
  return blogs.length === 0
    ? null: blogArray
}
module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
