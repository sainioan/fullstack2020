import React from 'react'
import { useSelector } from 'react-redux'/* 

export const displayNotification = (payload) => {
  return {
    type: 'SET_NOTIFICATION',
    payload,
  }
}

export const removeNotification = (payload) => {
    return {
        type: 'REMOVE_NOTIFICATION',
        payload
    }
} */
const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification