import PropTypes from 'prop-types'
import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, user, blogService, setBlogs, setNotification }) => {
  const [viewEverything, setViewEverything] = useState(false)
  const deleteBlog =  (e) => {
    e.preventDefault()
    const ok = window.confirm(`Delete ${blog.title} by ${blog.author}?`)
    if(ok)
      blogService.remove(blog).then(
        setBlogs(blogs.filter(b => b.id !== blog.id)))
  }
  const increaseLikes =  () => {
  
    const changedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user
    }
    blogService.update(blog.id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(bl => bl.id === blog.id ? bl: returnedBlog))
      })
      .catch((e) => {
        setNotification(
          ` '${e.message}'`, 'error'
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  //setViewEverything(true)  
   window.location.reload(true)
  // setViewEverything(true)  
  }
  

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if(!viewEverything)
    return (

      <div style={blogStyle}>
        <div> title: { blog.title } <button onClick={() => setViewEverything(!viewEverything)}>
          {viewEverything ? 'hide' : 'view' }
        </button>
        <p>author: {blog.author}</p>
        </div>
      </div>
    )
  if(viewEverything)

    return (
      <div style={blogStyle}>
        <div> title: {blog.title}  <button onClick={() => setViewEverything(!viewEverything)}>
          {viewEverything ? 'hide' : 'view' }
        </button>
        </div>
        <div>
          <div></div>url: {blog.url}
          <div></div> author: {blog.author}
          <div> likes: {blog.likes}   <button
            onClick=
              {increaseLikes}
          >like</button></div>
          <div></div> user: {user.name}
        </div>
        <div>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    })
  }),
  setNotification: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogService: PropTypes.any.isRequired
}

export default Blog
