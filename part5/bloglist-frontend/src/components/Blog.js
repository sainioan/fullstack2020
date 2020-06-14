import PropTypes from 'prop-types';
import React, { useState, useEffect, useReducer } from 'react'

const Blog = ({ blog, blogs, user, blogService, setBlogs, setNotification}) => {

  const deleteBlog =  () => {
    const ok = window.confirm(`Delete ${blog.title}?`)
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
    setBlogs(blogs.map(bl=> bl.id === blog.id ? bl: returnedBlog))
  })
    .catch((e) => {
      setNotification(
        ` '${e.message}'`, 'error'
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
    window.location.reload(true)
}
  const [viewEverything, setViewEverything] = useState(true)
  const blogsToView = viewEverything
  ? blogs
  : blogs.map(blog => blog.title)
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
     <div> title: {blog.title} <button onClick={() => setViewEverything(!viewEverything)}>
         {viewEverything ? 'hide' : 'view' }
        </button> 
        </div>      
      </div>
  )   
      if(viewEverything)
  
      return (
        <div style={blogStyle}>
        <div> title: {blog.title} <button onClick={() => setViewEverything(!viewEverything)}>
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

export default Blog
