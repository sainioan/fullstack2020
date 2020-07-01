import userService from '../services/users'
import loginService from '../services/login'
import blogService from '../services/blogs'
import storage from '../utils/storage'
import { setNotification } from './notificationReducer'

const reducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_USER':
    return  { ...state, user: action.data }
  case 'INIT':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const data = await userService.getAll()
    dispatch({
      type: 'INIT',
      data
    })
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
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
  //  blogService.getConfig()
    await dispatch({
      type: 'SET_USER',
      data: user
    })

    dispatch(setNotification(`${user.name} welcome back`, 5, 'success'))
  }
}
export const setUser = (user) => {
  return async dispatch => {
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    storage.saveUser(user)
    await dispatch(  {
      type: 'SET_USER',
      data: user
    })
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