import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import NewBlog from './components/Blogform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import Bloglist from './components/bloglist'
import storage from './utils/storage'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const currentUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
  const blogFormRef = React.createRef()


  const dispatch = useDispatch()

       useEffect(() => {
         dispatch(initializeBlogs())  
       },[dispatch]) 

  const notifyWith = (message, type='success') => {
   // const notifyWith = (message) => {
        dispatch(setNotification(message, 10))
        setTimeout(() => {
          setNotification(null)
        }, 10000)
      }
  

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.create(newBlog, user)
      setBlogs(blogs.concat(blog))
      notifyWith(`New blog by ${user.username} added`)

    } catch (error) {
      notifyWith(`${error.message}`, error)
      console.log(error.message)
    }

  }

  const removeBlog = id => {
    const blog = blogs.find(n => n.id === id)
    const ok = window.confirm(`Delete ${blog.title}`)
    if(ok){
      blogService
        .remove(blog)
        .then(setBlogs(blogs.filter(b => b.id !== id)))
    }
  }
  const blogForm = () => (
    <Togglable id= 'New Blog' buttonLabel= 'New Blog'  ref={blogFormRef}>
      <NewBlog
        onSubmit={addBlog}
        toggleVisibility = {Togglable.toggleVisibility}
        username = {user.username}
      />
    </Togglable>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

  /*     window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token) */
   
      setUsername('')
      setPassword('')
      setUser(user)
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

        <Notification />
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              id = 'username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              id = 'password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h2>Blogs</h2>
        <Notification />
        <p>{user.name} logged in</p>
        <button onClick= {handleLogOut}>Logout</button>
        <p></p>
        {blogForm()}
        <div><Bloglist  user = {user} /> </div>
      </div>
    </div>
  )
}
export default App