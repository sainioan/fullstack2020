
import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
const BlogList = ({ user }) => {
  // console.log('bloglist line 6 user: ', JSON.stringify(user))
  const loggedUser = useSelector(state => state.user)

  console.log( loggedUser[0])

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