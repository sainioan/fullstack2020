
const listHelper = require('../utils/list_helper')
const _ = require('lodash')

const listWithManyBlogs = [ {
  _id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  __v: 0
},
{
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
},
{
  _id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
  __v: 0
},
{
  _id: '5a422b891b54a676234d17fa',
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10,
  __v: 0
},
{
  _id: '5a422ba71b54a676234d17fb',
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 0,
  __v: 0
},
{
  _id: '5a422bc61b54a676234d17fc',
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
  __v: 0
}
]
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const emptyList = []
test('dummy returns one', () => {


  const result = listHelper.dummy(listWithManyBlogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('total of many blogs', () => {
    const res = listHelper.totalLikes(listWithManyBlogs)
    expect(res).toBe(36)
  })
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('total of empty list is zero',() => {
    const res = listHelper.totalLikes([])
    expect(res).toBe(0)
  })
})

describe('favorite blog', () => {

  test('of many blogs', () => {
    const res = listHelper.favoriteBlog(listWithManyBlogs)
    expect(res).toEqual(listWithManyBlogs[2])
  })
  test('of a list containing only one blog is the blog itself', () => {
    const res = listHelper.favoriteBlog(listWithOneBlog)
    expect(res).toEqual(listWithOneBlog[0])
  })
  test('of an empty list returns null', () => {
    const res = listHelper.favoriteBlog(emptyList)
    expect(res).toEqual(null)
  })
})

describe('most blogs', () => {

  test('of many blogs', () => {
    const res = listHelper.mostBlogs(listWithManyBlogs)
    expect(res).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
  test('of one blog', () => {
    const res = listHelper.mostBlogs(listWithOneBlog)
    expect(res).toEqual({
      author:'Edsger W. Dijkstra',
      blogs: 1 
    })
  })
  test('of an empty list is null', () => {
    const res = listHelper.mostBlogs(emptyList)
    expect(res).toBe(null)
  })
})

describe('most likes', () =>{
  test('of many blogs', () => {
    const res = listHelper.mostLikes(listWithManyBlogs)
    expect(res).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
  test('of one blog', () => {
    const res = listHelper.mostLikes(listWithOneBlog)
    expect(res).toEqual({
      author:'Edsger W. Dijkstra',
      likes: 5 
    })
  })
  test('of an empty list is null', () => {
    const res = listHelper.mostLikes(emptyList)
    expect(res).toBe(null)
  })
})