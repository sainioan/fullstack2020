import React from 'react'


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
}
const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      render here notification...
    </div>
  )
}

export default Notification