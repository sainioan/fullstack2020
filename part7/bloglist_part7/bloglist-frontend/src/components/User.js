import React from 'react'
import { addUser, setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'


export const User = ({ user }) => {


  const allblogs = useSelector(state => state.blogs)

  if(!allblogs) {
    return null
  }
  console.log(allblogs)
  if(!user) {
    return null
  }
  const blogs = allblogs.filter(blog => blog.user_id === user.id)

  return (
    <div>
      <h2>{user.username}</h2>
      <div>
        <p> blogs added </p>
        <ul>
          {blogs.map(blog =>
            <li key={user.id}>{blog.title}</li>)}
        </ul>

      </div>
    </div>
  )

}

export default User