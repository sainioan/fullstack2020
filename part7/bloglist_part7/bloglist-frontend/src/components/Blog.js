import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeComments } from '../reducers/commentReducer'
import { likeBlog, deleteBlog, updateBlogs } from '../reducers/blogReducer'
import Comment from './Comment'
import CommentForm from './CommentForm'

const Blog = ({ blog }) => {

  const dispatch = useDispatch()

  const [viewEverything, setViewEverything] = useState(false)
 
  const comments = useSelector (state => state.comments)
  console.log(comments)
 
  if(!blog){
    return null
  }
  console.log(blog.id)

  const blogComments = comments.filter(comment => comment.blogId === blog.id)
  console.log('blogComments', blogComments)

  const increaseLikes = async () => {
    dispatch(likeBlog(blog))
    dispatch(updateBlogs())
  }

  const removeBlog = async(blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(deleteBlog(blog))
      setTimeout(() => {
        dispatch(updateBlogs())
      }, 5000)
    }

  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (viewEverything) {
    return (
      <div  key={blog.id} style={blogStyle}>
        <div className="blogPost">
          <p>
          Title: {blog.title}{' '}
            <button onClick={() => setViewEverything(!viewEverything)}>
              {viewEverything ? 'hide' : 'view'}
            </button>
          </p>
          <div>
            <p>Url: {blog.url}</p>
            <p>Author: {blog.author}</p>
            <div>
            Likes: {blog.likes}{' '}
              <button onClick={() => increaseLikes(blog)}>Like</button>
            </div>
          </div>
      <div className="content">
        <ul>
          { blogComments.map(comment =>
            <Comment key={blog.id}
              comment={comment} />)}
        </ul>
      </div>
      <CommentForm blog={blog} />
    </div>
          <div>
            <button onClick={() => removeBlog(blog)}>Remove</button>
          </div>
        </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div className="blogPost">
          <p>
          Title: {blog.title}{' '}
            <button onClick={() => setViewEverything(!viewEverything)}>
              {viewEverything ? 'Hide' : 'View'}
            </button>
          </p>
          <p>Author: {blog.author}</p>
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    })
  })
}

export default Blog
