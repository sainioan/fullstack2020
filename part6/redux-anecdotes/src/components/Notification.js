import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
 // const notification = useSelector(state => state.notification)
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
 /*    border: 'solid',
    padding: 10,
    borderWidth: 1 */
  }
  if(notification === null || notification === '') {
    return (
        <div></div>
    )
}
else
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification