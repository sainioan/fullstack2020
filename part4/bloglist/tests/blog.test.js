const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(titles).toContain(
      'HappyRunningBlog'
    )
  })
})
describe('addition of a new blog', () => {
  test('a blog without authorization cannot be added ', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }
 

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer' + '$2b$10$UABR.rHdqjKIDcUqUWPjh.YYXomggr7tJbNzL/jN9gfn72QKOY1iK')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }
    const toBeLoggedIn = {
      username: 'Monday1',
      password: 'asecret'
    }
       
    const getToken = async () => {
       await api
      .post('/api/users ')
      .send(toBeLoggedIn )

      const response = await api
        .post('/api/login')
        .send(toBeLoggedIn)
      return response.body
    }
    const token= await getToken()
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token.token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'HappyCodingBlog'
    )
  })

  test('a blog with no likes has default value 0 ', async () => {
    const newBlog = {
      'title': 'newBlog',
      'author': 'Rookie Blogger',
      'url': 'http://MyFirstBlog.com',
    }
    const toBeLoggedIn = {
      username: 'Monday2',
      password: 'asecret'
    }
    const getToken = async () => {
      await api
     .post('/api/users ')
     .send(toBeLoggedIn )

     const response = await api
       .post('/api/login')
       .send(toBeLoggedIn)
     return response.body
   }
 const token = await getToken()  
 await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token.token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const likes = blogs.map(n => n.likes)
    expect(likes[likes.length-1]).toBe(0)
  })
  test('a blog has id ', async () => {
    const newBlog = {
      'title': 'newBlog2',
      'author': 'a Blogger',
      'url': 'http://MySecondBlog.com',
      likes:5
    }
    const toBeLoggedIn = {
      username: 'Monday3',
      password: 'asecret'
    }
    const getToken = async () => {
      await api
     .post('/api/users ')
     .send(toBeLoggedIn )

     const response = await api
       .post('/api/login')
       .send(toBeLoggedIn)
     return response.body
   }
 const token = await getToken()  

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token.token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const ids = blogs.map(n => n.id)
    const thisID = ids[ids.length-1]
    expect(thisID).toBeDefined()
  })
  test('blog without title is not added', async () => {
    const newBlog = {
      likes: 5
    }
    const toBeLoggedIn = {
      username: 'Monday4',
      password: 'asecret'
    }
    const getToken = async () => {
      await api
     .post('/api/users ')
     .send(toBeLoggedIn )

     const response = await api
       .post('/api/login')
       .send(toBeLoggedIn)
     return response.body
   }
 const token = await getToken()  

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer ' + token.token)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('viewing a specific blog', () => {
  test('a specific blog can be viewed', async () => {
    const blogAtStart = await helper.blogsInDb()

    const blogToView = blogAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {

 const newBlog = {
  'title': 'newBlog2',
  'author': 'Rookie2 Blogger',
  'url': 'http://MyDraftBlog.com',
}
const toBeLoggedIn = {
  username: 'Monday5',
  password: 'asecret'
}
const getToken = async () => {
  await api
 .post('/api/users ')
 .send(toBeLoggedIn )

 const response = await api
   .post('/api/login')
   .send(toBeLoggedIn)
 return response.body
}
const token = await getToken()  
await api
  .post('/api/blogs')
  .set('Authorization', 'bearer ' + token.token)
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

   const blogs = await helper.blogsInDb()
   const blogToDelete = blogs[blogs.length-1]
    await api
      .delete(`/api/blogs/${blogs[blogs.length-1].id}`)
      .set('Authorization', 'bearer ' + token.token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('PUT requests', () => {
  test('succeeds with valid data', async () => {
   
    const updatedBlog = {
      'title': 'Carefree Coding',
      'author': 'Anonymous',
      'url': 'www.cafefreecoding.com',
      'likes': 5
    }

    const blogsAtStart = await helper.blogsInDb()
    await api
      .put(`/api/blogs/${blogsAtStart[0].id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(n => n.likes)
    expect(likes[0]).toBe(5)
  })
})
afterAll(() => {
  mongoose.connection.close()
})