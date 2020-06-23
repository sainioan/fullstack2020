
//const initialState = ''
const notificationReducer = (state='', action) => {
  switch (action.type){
    case 'SET_NOTIFICATION' :
      return action.notification
    default :
    return state
  }
}

export const notify = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
} 


export const clear = () => {
  return {
      type: 'CLEAR',
      data: ''
  }
}

export default notificationReducer
