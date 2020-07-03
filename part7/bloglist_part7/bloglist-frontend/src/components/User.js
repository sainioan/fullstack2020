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
  console.log('user component username', user.name)
  const blogs = allblogs.filter(blog => blog.user.id === user.id)
  //const blogs = allblogs.filter(blog => blog.user_id === user.id)
  if(blogs.length===0) {
    return (
      <div>
             <h3>{user.name}</h3>
      <div>
        <p> has not created any blogs </p>
        </div>
      </div>
    )
  }
  return (
    <div>
      <h2>{user.name}</h2>
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