import React from 'react'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
//  const notification = useSelector(state => state.notification)

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
/* 
export default Notification */