import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/Blogform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [likes, setLikes] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification ] = useState(null)


  const currentUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
  const blogFormRef = React.createRef()
  useEffect(() => {

    blogService.getAll().then(blogs =>
      setBlogs( blogs ),
    console.log(blogs)
    )
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 8000)
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

/*   const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: likes,
      user: username
    }
    console.log(blogObject)

    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notifyWith(`a new blog ${newTitle} ${newAuthor} added`)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setUser('')
      }).catch(error => {
        notifyWith(`${error.response.data.error} `, 'error')
        console.log(error.response.data.error)
      })
  } */

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.create(newBlog, user)
      setBlogs(blogs.concat(blog))
      notifyWith(`New blog by ${user.username} added`)


   // blogFormRef.current.toggleVisibility()
    
    } catch (error) {
      notifyWith(`${error.message}`, error)
      console.log(error.message)
    }

  }
  const increaseLikes = id => {
try{
    const blog = blogs.find(n => n.id === id)
    const changedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user 
    }
    blogService
      .update(id, changedBlog)
      .then(setBlogs(blogs.map(b => (b.id !== id ? b : { ...b, likes: b.likes + 1 }))))
  } catch (error){
    console.log(error.message)
  }

  }
  const removeBlog = id => {
    const blog = blogs.find(n => n.id === id)
    const ok = window.confirm(`Delete ${blog.title}`)
    if(ok){
      blogService.
        remove(blog)
        .then(setBlogs(blogs.filter(b => b.id !== id)))
    }
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
  const handleLikeChange = (event) => {
    setLikes(event.target.value)
  }

  const blogForm = () => (
    <Togglable buttonLabel="new blog"  ref={blogFormRef}>
      <NewBlog
        onSubmit={addBlog}
/*         title={newTitle}
        handleTitleChange={handleTitleChange}
        author={newAuthor}
        handleAuthorChange={handleAuthorChange}
        url = {newUrl}
        handleUrlChange={handleUrlChange}
        likes = {likes}
        handleLikeChange = {handleLikeChange} */
       // toggleVisibility = {blogFormRef.current.toggleVisibility()}
        toggleVisibility = {Togglable.toggleVisibility}
        username = {user.username}
      />
    </Togglable>
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
    } catch(error) {
      notifyWith('wrong username or password ', 'error')
      console.log(error.message)
    }
  }

  /*   const loginForm=  () =>{
    <Togglable buttonLabel='login'>
    <LoginForm
    username={username}
    password={password}
    handleUsernameChange={({ target }) => setUsername(target.value)}
    handlePasswordChange={({ target }) => setPassword(target.value)}
    handleSubmit={handleLogin}
  />
    </Togglable>
  } */
  const handleLogOut = async (event) => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <Notification notification={notification} />
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
        <h2>blogs</h2>
        <Notification notification={notification} />
        <p>{user.name} logged in</p>
        <button onClick= {handleLogOut}>logout</button>
        <p></p>
        {blogForm()}
        {blogs.sort((a, b) => b.likes - a.likes).map(b => (
          <Blog
            key={b.id}
            blog={b}
            user = {user}
            removeBlog={removeBlog}
            removeBlog={removeBlog}
            increaseLikes={increaseLikes}
          />
        ))}
{/*         {blogs.sort((a, b) => b.likes - a.likes).map(blog => ( <Blog
          key={blog.id}
          blog={blog}
          user = {user}
          removeBlog={removeBlog}
          increaseLikes = {increaseLikes(blog.id)} */}
        />
        ))}
      </div>
    </div>
  )
}
export default App