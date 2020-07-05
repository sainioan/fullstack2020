import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NewBlog from './components/Blogform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/Loginform'
import { useField } from './hooks/index'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import Bloglist from './components/bloglist'
import UserList from './components/userList'
import User from './components/User'
import Blog from './components/Blog'
import SingleBlog from './components/SingleBlog'
import storage from './utils/storage'
import { login, setUser, logOut } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return(
    <div>
      <h4>Menu</h4>
      <p></p>
      <Link style={padding} to="/blogs">blogs</Link>
      <Link style={padding} to="/users">users</Link>
    </div>
  )
}
const App = () => {

  const dispatch = useDispatch()
  const username = useField('text')
  const password = useField('password')

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  },[dispatch])

let user = useSelector(({ user }) => {
    return user
})
  //const user useSelector(state => state.user)
  if(user){
    console.log('line 54, user.user', user.name)
  }
  const users = useSelector(({ users }) => {
    return users
  })


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(currentUser))
      console.log('line 40, currentuser', currentUser.username)
   //   setThisUser(currentUser.username)
    }
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
      const user = dispatch(login({ username: username.value, password: password.value }))
      console.log('line 74, user, ',JSON.stringfy(user))
      storage.saveUser(user)

      dispatch(setUser(user))
      notifyWith(`${username} welcome back!`)

        username.reset()
        password.reset()

    } catch(error) {
      notifyWith(`${error.message}`, error)
      notifyWith('wrong username or password', 'error')
      console.log(error.message)
    }
  }
  const handleLogOut = async (event) => {
    window.localStorage.clear()

    dispatch(logOut())
    storage.logoutUser()
    username.reset()
    password.reset()
  //  setThisUser(null)
  }

  const match = useRouteMatch('/users/:id')
  const bloguser = match ? users.find(user => user.id === match.params.id) : null
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const match2 = useRouteMatch('/blogs/:id')
  const blog = match2 ? blogs.find(b => b.id === match2.params.id) : null

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
        <Menu/>
         <Notification />
        <p>{user.username} logged in</p>
        <button onClick= {handleLogOut}>Logout</button>
        <p></p>
        {blogForm()}
{/*         <p></p>
        {blogForm()}
        <div><Bloglist  user = {user} /> </div>  */}
{/*         <div><User user = {user}/> </div>
        <div><UserList/></div> */}
        <Switch>

          <Route path="/users/:id">
            <User user={bloguser} />
          </Route>
          <Route path="/users">
            <UserList user = {user} users = {users}/>
          </Route>
          <Route exact path='/blogs/:id'>
          <Blog blog={blog}/>
        </Route>
          <Route path="/blogs">
            <Bloglist   user = {user} />
          </Route>

       
         
        </Switch>
      </div>
    </div>
  )
}
export default App