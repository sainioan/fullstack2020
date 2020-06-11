import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 
  const [errorMessage, setErrorMessage] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs ),
      console.log(blogs)
    )  
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
     title: newTitle,
     author: newAuthor,
     url: newUrl
  
    }
    console.log(blogObject)
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
      console.log(blogs)
  }
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  
  }
  const handleAuthorChange = (event) => {
   setNewAuthor(event.target.value)
  
  }
  const handleUrlChange = (event) => {
 
    setNewUrl(event.target.value)
   
   }

  const blogForm = () => (
    <div buttonLabel="new blog">
      <NewBlog
        onSubmit={addBlog}
        title={newTitle}

        handleTitleChange={handleTitleChange}
        author={newAuthor}
        handleAuthorChange={handleAuthorChange}
        url = {newUrl}
        handleUrlChange={handleUrlChange}
      />
    </div>
  )
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
     console.log(exception.message)
     setErrorMessage(`wrong username or password`)
     setTimeout(() => {
       setErrorMessage(null)
     }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    window.localStorage.clear()
    setUser(null)
  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </div>
    )
  }

  return (
    <div>
       <div>
        <p>{user.name} logged in</p>
        <button onClick= {handleLogOut}>logout</button>
        <p></p>
        {blogForm()}
       </div>
      <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    </div>
  )

}

export default App