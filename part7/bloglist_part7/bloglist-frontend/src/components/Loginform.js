import PropTypes from 'prop-types'
import React from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleSubmit, username, password }) => {

  return (

    <div className='loginForm'>
      <h2>Log into application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username: </Form.Label>
          <Form.Control
            {...username}
          />
          <Form.Label>Password: </Form.Label>
          <Form.Control
            {...password}
          />
          <Button variant="primary" type="submit">Login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm