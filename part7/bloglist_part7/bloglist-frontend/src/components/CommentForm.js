import React, {useState} from 'react'
import  { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createComment } from '../reducers/commentReducer'
import { makeComment } from '../reducers/blogReducer'
const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const content = useField('text')
  console.log(content)
  const handleSubmit = (e) => {

    e.preventDefault()
  /*   {
      "content": "Reading Rocks-- a big shout out to reading blogs! ", "blogId": "5ee25a61cc9ed0b2a451ca30"
      } */
    const comment = {
      content:content.value,
       blogId:blog.id
  }

  console.log(comment)
      dispatch(createComment(blog.id, comment))


      content.reset()
} 
  return (

    <div className='commentForm'>
      <h4>Comments</h4>
      <form onSubmit={handleSubmit}>
        <div>
        text
          <input  id="content" type={content.type} value={content.value} onChange = {content.onChange} 
          />
        </div>
        <button id="login-button" type="submit">add comment</button>
      </form>
    </div>
  )
}

export default CommentForm