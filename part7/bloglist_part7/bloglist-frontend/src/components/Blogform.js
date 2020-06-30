import React, { useState } from 'react'
import  { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
 
   
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')
    const likes = useField('number')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const blog = {
        title: title.value, 
        author: author.value, 
        url: url.value, 
        likes: likes.value || 0,}
     dispatch(createBlog(blog))
     // history.push('/')
     dispatch(setNotification((`New blog '${blog.title}' by ${blog.author} added`),10))
    
  }

  return (
    <div className="formDiv">
      <div>
        <h3>Create a new blog</h3>
        <form  onSubmit={handleSubmit}>
          <p className="formDiv">
            Title:
            <input id="title" type={title.type} value={title.value} onChange = {title.onChange}  />
          </p>
          <p className="formDiv">
            Author:
            <input id="author" type={author.type} value={author.value} onChange = {author.onChange}  />
          </p>
          <p className="formDiv">
           Url:
           
           <input id="url" type={url.type} value={url.value} onChange = {url.onChange}  />
          </p>
          <p className="formDiv">
            Likes:   
            <input id="likes" type={likes.type} value={likes.value} onChange = {likes.onChange}  />
          </p>
          <p>
            <button id="createButton">Create</button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default BlogForm


