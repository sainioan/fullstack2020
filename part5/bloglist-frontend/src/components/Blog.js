import PropTypes from 'prop-types'
import React, { useState } from 'react'


const Blog = ({ blog, increaseLikes, removeBlog }) => {
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
              <button onClick={e => increaseLikes(blog.id)}>Like</button>
            </div>
          </div>
          <div>
            <button onClick={e => removeBlog(blog.id)}>Remove</button>
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
