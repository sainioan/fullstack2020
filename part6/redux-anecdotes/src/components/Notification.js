import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {


  const style = {
    background: 'lightgrey',
    color:'green',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10

  }
  if(props.notification) 

  return (
    <div style={style}>
      {props.notification}
    </div>
  ) 
  else 
  return (
    <div></div>
)
}

const mapStateToProps = (state) => {
  return { notification: state.notification }
}

export default connect(mapStateToProps)(Notification)
