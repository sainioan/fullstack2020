
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
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
      <ListGroup>
      <p></p>
      <h3>  blogs created</h3>
      <ul>{ users.map(user =>
        <ListGroup.Item key={user.id}>
          <Link to={`/users/${user.id}`}>{user.username}</Link>, has {user.blogs.length} blogs.
          </ListGroup.Item>)}</ul>
        </ListGroup>
    </div>

  ) : null
}

export default UserList