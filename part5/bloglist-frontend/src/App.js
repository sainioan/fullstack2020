import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/CreateBlog'
import Notification from './components/Notification'
import LoginForm from './components/Loginform'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [likes, setLikes] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 
  const [users, setUsers] = useState(null)
  const [notification, setNotification ] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)


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

  const addBlog = (event) => {
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
  const handleUsernameChange = (event) => {
  setUsername(event.target.value)  
  }

  const handlePasswordChange = (event) => {
  setPassword(event.target.value)  
  }
  if(user!== null) console.log(user.username)
  const blogForm = () => (
    <Togglable buttonLabel="new blog"  ref={blogFormRef}>
      <h2>create new</h2>
      <NewBlog
        onSubmit={addBlog}
        title={newTitle}
        handleTitleChange={handleTitleChange}
        author={newAuthor}
        handleAuthorChange={handleAuthorChange}
        url = {newUrl}
        handleUrlChange={handleUrlChange}
        likes = {likes}
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
      notifyWith(`wrong username or password `, 'error')
      console.log(error.message)
    }
  }
  const increaseLikes =  (id) => { 
  
  
    const blog = blogs.find(n => n.id === id)
      const changedBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id || blog.user 
      }
      blogService.update(id, changedBlog)
      .then(returnedBlog => {
      setBlogs(blogs.map(bl=> bl.id === id ? bl: returnedBlog))
    })
      .catch((e) => {
        setNotification(
          ` '${e.message}'`, 'error'
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
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
       
        {blogs.map((blog,i) =>
        <Blog 
        key={i} 
        blog={blog} 
        blogs = {blogs} 
        user = {user} 
        blogService={blogService}
        setBlogs={setBlogs} 
        setNotification = {setNotification}  
         />
      )}
    </div>
    </div>
  )
}

export default App