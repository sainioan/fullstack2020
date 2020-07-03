import PropTypes from 'prop-types'
import React from 'react'


const LoginForm = ({ handleSubmit, username, password }) => {

  return (

    <div className='loginForm'>
      <h2>Log into application</h2>
      <form onSubmit={handleSubmit}>
        <div>
        username
          <input {...username}
          />
        </div>
        <div>
        password
          <input
            {...password}
          />
        </div>
        <button id="login-button" type="submit">Login</button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm