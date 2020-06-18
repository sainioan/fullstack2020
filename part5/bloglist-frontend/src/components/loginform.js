import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form__ctrl">
          <label htmlFor="username">Username: </label>
          <input id="username" type="text" value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="login-form__ctrl">
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm