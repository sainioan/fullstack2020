
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Comment = ({comment}) => {

  if(!comment){
    return null
  }



  const commentStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 3
  }

  return (
    <div  key={comment.id} style={commentStyle}>
      <div className="content">
        <p> Comment:{' '}
        </p>
        <div>
          <p>{comment.content}</p>
        </div>
      </div>
    </div>
  )
}

export default Comment