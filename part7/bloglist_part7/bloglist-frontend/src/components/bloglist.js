
import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
const BlogList = ({ user }) => {

  const blogs = useSelector(state => state.blogs)

  return blogs ? (
    <div>
      {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          // user ={user.username===blog.user.username}
          user = {user}
        />
      )}
      <div>  </div>
    </div>

  ) : null
}

export default BlogList