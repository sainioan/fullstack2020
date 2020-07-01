import React from 'react'
import { addUser, setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'


export const User = () => {
const dispatch = useDispatch()
 /*  const add = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    event.target.username.value = ''
    dispatch(setUser(username))
    dispatch(setNotification(`user '${username}' logged in`, 5))
  } */

  return (
    <div>
      <h2>users</h2>
      <div>
        <input name="user"/>
        <p> username</p>
      </div>
      <button>create</button>

    </div>
  )
}

export default User