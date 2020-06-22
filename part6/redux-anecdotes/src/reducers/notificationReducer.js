
const initialState = ''

export const notify = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

const notificationReducer = (state=initialState, action) => {
  switch (action.type){
    case 'SET_NOTIFICATION' :
      return action.notification
    default :
    return state
  }
}
export const clear = () => {
  return {
      type: 'CLEAR',
      data: ''
  }
}

export default notificationReducer
