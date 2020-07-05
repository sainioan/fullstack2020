
import React from 'react'
import { useSelector } from 'react-redux'
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
    </div>

  ) : null
}

export default UserList