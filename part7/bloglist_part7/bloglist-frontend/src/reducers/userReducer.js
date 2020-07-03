import loginService from '../services/login'
import storage from '../utils/storage'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const login = ({ username, password }) => {
  return async dispatch => {
    const user = await loginService.login(({ username, password }))
    if(user.error){
      dispatch(setNotification('username/password wrong or missing', 5, 'error'))
      setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIFICATION',
        })
      }, 5000)
    }
    storage.saveUser(user)
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    await dispatch({
      type: 'SET_USER',
      data: user
    })

    dispatch(setNotification(`${user.name} welcome back`, 5, 'success'))
  }
}
/* export const setUser = (user) => {
  return async dispatch => {
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    storage.saveUser(user)
    await dispatch(  {
      type: 'SET_USER',
      data: user
    })
  } */
//}
export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
}

export const logOut = () => {
  return async dispatch => {
    window.localStorage.clear()
    await dispatch({
      type: 'LOGOUT'
    })
  }
}
export default reducer