import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog, updateBlogs } from '../reducers/blogReducer'

const Blog = ({ blog }) => {

  const [viewEverything, setViewEverything] = useState(false)
  const dispatch = useDispatch()

  if(!blog){
    return null
  }
  const increaseLikes = async () => {
    dispatch(likeBlog(blog))
    dispatch(updateBlogs())
  }

  const removeBlog = async(blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      dispatch(deleteBlog(blog))
      setTimeout(() => {
        //   dispatch(emptyAction())
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
          {/*           <h3>comments</h3>
      <Comment blog={blog}/>
      <ul>
        {blog.comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
      </ul> */}
          <div>
            <button onClick={() => removeBlog(blog)}>Remove</button>
          </div>
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
