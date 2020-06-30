import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {

  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const increaseLikes = async () => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = async(blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
    dispatch(deleteBlog(blog))
    }
}
  const [viewEverything, setViewEverything] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (viewEverything) {
    return (
      <div style={blogStyle}>
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
              <button onClick={e => increaseLikes(blog)}>Like</button>
            </div>
          </div>
          <div>
            <button onClick={e => removeBlog(blog)}>Remove</button>
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
