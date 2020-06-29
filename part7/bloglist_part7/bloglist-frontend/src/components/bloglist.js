
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
const BlogList = ({ user }) => {


  const blogs = useSelector(state => state.blogs)

  return blogs ? (
    <div>
      {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user ={user.username===blog.user.username}

        />
      )}
      <div>  </div>
    </div>

  ) : null
}

export default BlogList