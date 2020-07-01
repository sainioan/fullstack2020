import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import NewBlog from './components/Blogform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/Loginform'
import { useField } from './hooks/index'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import Bloglist from './components/bloglist'
import storage from './utils/storage'
import { initializeUsers, login, setUser, logOut } from './reducers/userReducer'

const App = () => {

  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers)
  },[dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(currentUser))
      setUser(currentUser)
    }
  }, [dispatch])

  
  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [dispatch])

  const notifyWith = (message, type='success') => {

    dispatch(setNotification(message, 10, type))
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  const blogForm = () => (
    <Togglable id= 'New Blog' buttonLabel= 'New Blog'  ref={blogFormRef}>
      <NewBlog
        toggleVisibility = {Togglable.toggleVisibility}
        username = {user.username}
      />
    </Togglable>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = dispatch(login({username: username.value, password: password.value }))
      storage.saveUser(user)
      setUser(user)
      notifyWith(`${username} welcome back!`)
  
   //   username.reset()
   //   password.reset()

    } catch(error) {
      notifyWith(`${error.message}`, error)
      console.log(error.message)
    }
  }
  const handleLogOut = async (event) => {
    window.localStorage.clear()
 
    dispatch(logOut())
    username.reset()
    password.reset()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          password={password}
        />
      </div>
    )
  }
  return (
    <div>
      <div>
        <h2>Blogs</h2>
        <Notification />
        <p>{JSON.stringify(user.name)} logged in</p>
        <button onClick= {handleLogOut}>Logout</button>
        <p></p>
        {blogForm()}
        <div><Bloglist  user = {storage.loadUser()} /> </div>
      </div>
    </div>
  )
}
export default App