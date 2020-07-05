import commentService from  '../services/comments'

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


export const createComment = (blog, comment) => {
  return async dispatch => {
    try {
      const commentToDispatch = await commentService.create(blog.id, comment)

      dispatch({
        type: 'CREATE_COMMENT',
        data: commentToDispatch
      })
    }
    catch (error) {
      console.log(error.message)
    }
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