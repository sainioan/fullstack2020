
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import User from './User'
import { Link } from 'react-router-dom'

const UserList = () => {
  const loggedUser = useSelector(state => state.user)
  console.log('userList loggeduser...', loggedUser)
  const users = useSelector(state => state.users)
  console.log('userList users...', users)
  const user = useSelector(state => state.user)
  if(!users){
    return null
  }
  if(!user){
    return null
  }
  console.log('users from userlist component:', users)

  return users ? (
    <div>
      <h2>Users</h2>
      <p></p>
      <h3>  blogs created</h3>
      <ul>{ users.map(user =>
        <li key={user.id}>
          <Link to={`/users/${user.id}`}>{user.username}</Link>, has {user.blogs.length} blogs.
        </li>)}</ul>

      {/*     <div>
       {users.map(user =>
        <div key={user.id}>
          <div>
            {user.username} has {user.blogs.length} blogs
          </div>



        </div>
      )} </div>  */}
    </div>

  ) : null
}

export default UserList