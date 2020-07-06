import React from 'react'
import  { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createComment } from '../reducers/commentReducer'
import { Form, Button } from 'react-bootstrap'



const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const content = useField('text')
  console.log(content)
  const handleSubmit = (e) => {

    e.preventDefault()

    const comment = {
      content:content.value,
      blogId:blog.id
    }

    dispatch(createComment(blog.id, comment))


    content.reset()
}
  return (
    <div className='commentForm'>
      <h4>Comments</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Text</Form.Label>
          <Form.Control id="content" type={content.type} value={content.value} onChange = {content.onChange} 
          />
        </Form.Group>
        <Button variant='primary' type='submit'>Add Comment</Button>
      </Form>
    </div>
  )
}

export default CommentForm