import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({notification}) => {
    return notification
})
  const style = {
    background: 'lightgrey',
    color:'green',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10

  }

 if(notification)
  return (
    <div style ={style} className={notification.type}>
      {notification}
    </div>
  )
  else {
    return (
      <div></div>
  )
  }
}

export default Notification