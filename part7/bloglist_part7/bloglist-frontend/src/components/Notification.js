import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if(!notification){
    return null
  }

/*   const style = {
    background: 'lightgrey',
    color: notification.type === 'error' ? 'red' : 'green',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10

  } */

  if(notification)
    return (
      <div className="container">
        <Alert variant="primary" show={true}>
          {notification}
        </Alert>
      </div>
    )
  else {
    return (
      <div></div>
    )
  }
}

export default Notification