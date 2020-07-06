import commentService from  '../services/comments'
import { setNotification } from './notificationReducer'
const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_COMMENTS':
    return action.data
  case 'CREATE_COMMENT':
    return [...state, action.data]
  default:
    return state
  }
}

export const createComment = (id, comment) => {
  return async dispatch => {
    const newComment = await commentService.create(id, comment)
    dispatch({
      type: 'CREATE_COMMENT',
      data: newComment
    })

  }
}

export const initializeComments = () => {
  return async dispatch => {
    const comments = await commentService.getAll()
    dispatch({
      type: 'INIT_COMMENTS',
      data: comments
    })
  }
}



export default reducer