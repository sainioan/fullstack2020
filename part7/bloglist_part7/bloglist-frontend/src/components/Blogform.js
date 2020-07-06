import React from 'react'
import { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'
const BlogForm = () => {
  const dispatch = useDispatch()


  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const likes = useField('number')


  const handleSubmit = (e) => {

    e.preventDefault()
    if( title.value ==='' || author.value==='' || url.value ==='' ){
      dispatch(setNotification('information missing', 10, 'error'))
      console.log('ERROR in module:blogform, method:createBlog')
    }
    else {
      const blog = {
        title: title.value,
        author: author.value,
        url: url.value,
        likes: likes.value || 0, }

      dispatch(createBlog(blog))
      dispatch(setNotification(`New blog '${blog.title}' by ${blog.author} added`,10, 'success'))
    }
    title.reset()
    author.reset()
    url.reset()
    likes.reset()

  }
  return (
    <div>
      <h3>Create a new blog</h3>
      <Form  onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control id="title" type={title.type} value={title.value} onChange = {title.onChange}  />
          <Form.Label>author</Form.Label>
          <Form.Control id="author" type={author.type} value={author.value} onChange = {author.onChange}  />
          <Form.Label>url</Form.Label>
          <Form.Control id="url" type={url.type} value={url.value} onChange = {url.onChange}  />
          <Form.Label>Likes</Form.Label>
          <Form.Control id="likes" type={likes.type} value={likes.value} onChange = {likes.onChange}  />
          <Button variant='primary' type='submit'>Create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm


